using System;
using System.IO;
using System.Reflection;
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;
using UnityEditor.XR.Management;
using UnityEditor.XR.Management.Metadata;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.XR.Management;
using UnityEngine.XR.OpenXR;

namespace PlayCT.EditorTools
{
    /// <summary>
    /// Ajustes de laboratorio: IL2CPP, ARM64, OpenXR Meta Quest. No pide copiar scripts a otro proyecto.
    /// </summary>
    public static class QuestBuildSetup
    {
        const string Escena = "Assets/Scenes/MesaPreparada.unity";
        const string Loader = "UnityEngine.XR.OpenXR.OpenXRLoader";
        const string AjustesXr = "Assets/XR/XRGeneralSettingsPerBuildTarget.asset";

        [MenuItem("PlayCT/Configurar Quest 3")]
        public static void Configurar()
        {
            AplicarPlayerSettings();
            AsegurarEscena();
            AsegurarOpenXR();
            AssetDatabase.SaveAssets();
            Debug.Log("PlayCT: ajustes de Quest 3 aplicados (IL2CPP, ARM64, min SDK 32, OpenXR).");
        }

        [InitializeOnLoadMethod]
        static void Auto()
        {
            EditorApplication.delayCall += () =>
            {
                if (EditorApplication.isPlayingOrWillChangePlaymode) return;
                if (SessionState.GetBool("PlayCT.QuestSetup", false)) return;
                SessionState.SetBool("PlayCT.QuestSetup", true);
                try
                {
                    Configurar();
                }
                catch (Exception e)
                {
                    Debug.LogWarning("PlayCT: configuración XR pendiente. Menú PlayCT/Configurar Quest 3. " + e.Message);
                }
            };
        }

        public static void BuildApk()
        {
            Configurar();
            EditorUserBuildSettings.SwitchActiveBuildTarget(NamedBuildTarget.Android, BuildTarget.Android);
            Directory.CreateDirectory("Build");
            var report = BuildPipeline.BuildPlayer(new[] { Escena }, "Build/PlayCT.apk", BuildTarget.Android, BuildOptions.None);
            EditorApplication.Exit(report.summary.result == BuildResult.Succeeded ? 0 : 1);
        }

        static void AplicarPlayerSettings()
        {
            PlayerSettings.productName = "PlayCT";
            PlayerSettings.companyName = "Universidad Cenfotec";
            PlayerSettings.bundleVersion = "0.1.0";
            PlayerSettings.colorSpace = ColorSpace.Linear;
            PlayerSettings.defaultInterfaceOrientation = UIOrientation.LandscapeLeft;
            PlayerSettings.SetScriptingBackend(NamedBuildTarget.Android, ScriptingImplementation.IL2CPP);
            PlayerSettings.SetApplicationIdentifier(NamedBuildTarget.Android, "com.cenfotec.playct");
            PlayerSettings.Android.minSdkVersion = AndroidSdkVersions.AndroidApiLevel32;
            PlayerSettings.Android.targetSdkVersion = AndroidSdkVersions.AndroidApiLevel32;
            PlayerSettings.Android.targetArchitectures = AndroidArchitecture.ARM64;
            PlayerSettings.SetUseDefaultGraphicsAPIs(BuildTarget.Android, false);
            PlayerSettings.SetGraphicsAPIs(BuildTarget.Android, new[] { GraphicsDeviceType.Vulkan });
            PlayerSettings.stereoRenderingPath = StereoRenderingPath.Instancing;
            PlayerSettings.SetMobileMTRendering(NamedBuildTarget.Android, true);
            try
            {
                PlayerSettings.Android.applicationEntry = AndroidApplicationEntry.GameActivity;
            }
            catch (Exception)
            {
                // Unity anterior a GameActivity: el manifiesto de OpenXR sigue siendo válido.
            }

            ForzarInputSystem();
        }

        static void ForzarInputSystem()
        {
            var assets = AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/ProjectSettings.asset");
            if (assets == null || assets.Length == 0) return;
            var so = new SerializedObject(assets[0]);
            var prop = so.FindProperty("activeInputHandler");
            if (prop == null) return;
            prop.intValue = 1;
            so.ApplyModifiedProperties();
        }

        static void AsegurarEscena()
        {
            if (!File.Exists(Escena)) return;
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(Escena, true) };
        }

        static void AsegurarOpenXR()
        {
            var grupo = BuildTargetGroup.Android;
            var per = ObtenerAjustes();
            if (per == null) return;
            if (!per.HasSettingsForBuildTarget(grupo))
                per.CreateDefaultSettingsForBuildTarget(grupo);
            if (!per.HasManagerSettingsForBuildTarget(grupo))
                per.CreateDefaultManagerSettingsForBuildTarget(grupo);

            var general = per.SettingsForBuildTarget(grupo);
            if (general != null && general.Manager != null && !XRPackageMetadataStore.IsLoaderAssigned(Loader, grupo))
                XRPackageMetadataStore.AssignLoader(general.Manager, Loader, grupo);

            EditorApplication.delayCall += HabilitarMetaQuest;
        }

        static XRGeneralSettingsPerBuildTarget ObtenerAjustes()
        {
            var existente = XRGeneralSettingsPerBuildTarget.XRGeneralSettingsForBuildTarget(BuildTargetGroup.Android);
            if (existente != null)
            {
                var found = AssetDatabase.FindAssets("t:XRGeneralSettingsPerBuildTarget");
                if (found.Length > 0)
                    return AssetDatabase.LoadAssetAtPath<XRGeneralSettingsPerBuildTarget>(AssetDatabase.GUIDToAssetPath(found[0]));
            }

            var cargado = AssetDatabase.LoadAssetAtPath<XRGeneralSettingsPerBuildTarget>(AjustesXr);
            if (cargado != null)
            {
                EditorBuildSettings.AddConfigObject(XRGeneralSettings.settingsKey, cargado, true);
                return cargado;
            }

            Directory.CreateDirectory("Assets/XR");
            var creado = ScriptableObject.CreateInstance<XRGeneralSettingsPerBuildTarget>();
            AssetDatabase.CreateAsset(creado, AjustesXr);
            EditorBuildSettings.AddConfigObject(XRGeneralSettings.settingsKey, creado, true);
            return creado;
        }

        static void HabilitarMetaQuest()
        {
            var settings = OpenXRSettings.GetSettingsForBuildTargetGroup(BuildTargetGroup.Android);
            if (settings == null)
            {
                Debug.LogWarning("PlayCT: abra XR Plug-in Management y vuelva a usar PlayCT/Configurar Quest 3 si OpenXR no quedó activo.");
                return;
            }

            RefrescarFeatures();
            settings = OpenXRSettings.GetSettingsForBuildTargetGroup(BuildTargetGroup.Android);
            if (settings == null || settings.features == null) return;
            foreach (var feature in settings.features)
            {
                if (feature == null) continue;
                var nombre = feature.GetType().Name;
                if (nombre == "MetaQuestFeature"
                    || nombre == "MetaQuestTouchPlusControllerProfile"
                    || nombre == "OculusTouchControllerProfile")
                {
                    feature.enabled = true;
                }
            }

            EditorUtility.SetDirty(settings);
            AssetDatabase.SaveAssets();
        }

        static void RefrescarFeatures()
        {
            foreach (var asm in AppDomain.CurrentDomain.GetAssemblies())
            {
                var tipo = asm.GetType("UnityEditor.XR.OpenXR.Features.FeatureHelpers");
                if (tipo == null) continue;
                var metodo = tipo.GetMethod("RefreshFeatures", BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static);
                if (metodo == null) continue;
                var parametros = metodo.GetParameters();
                if (parametros.Length == 1)
                    metodo.Invoke(null, new object[] { BuildTargetGroup.Android });
            }
        }
    }
}
