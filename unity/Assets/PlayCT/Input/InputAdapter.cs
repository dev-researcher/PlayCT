using UnityEngine;
using UnityEngine.InputSystem.XR;
using UnityEngine.XR;

namespace PlayCT.Input
{
    /// <summary>
    /// Elige escritorio o visor. La lógica de los materiales no depende de XR.
    /// </summary>
    public sealed class InputAdapter : MonoBehaviour
    {
        public enum Modo { Auto, Desktop, Xr }

        [SerializeField] Modo modo = Modo.Auto;
        [SerializeField] DesktopInput desktop;
        [SerializeField] XrInput xr;
        [SerializeField] TrackedPoseDriver[] seguimiento;
        [SerializeField] GameObject[] interactores;

        public bool UsaXr { get; private set; }
        public Transform ObjetoSujeto { get; set; }

        void Awake()
        {
            UsaXr = modo == Modo.Xr || (modo == Modo.Auto && DispositivoActivo());
            if (desktop != null) desktop.enabled = !UsaXr;
            if (xr != null) xr.enabled = UsaXr;
            if (seguimiento != null)
            {
                foreach (var driver in seguimiento)
                {
                    if (driver != null) driver.enabled = UsaXr;
                }
            }

            if (interactores != null)
            {
                foreach (var go in interactores)
                {
                    if (go != null) go.SetActive(UsaXr);
                }
            }
        }

        static bool DispositivoActivo()
        {
            var displays = new System.Collections.Generic.List<XRDisplaySubsystem>();
            SubsystemManager.GetSubsystems(displays);
            foreach (var display in displays)
            {
                if (display.running) return true;
            }

            return XRSettings.isDeviceActive;
        }
    }
}
