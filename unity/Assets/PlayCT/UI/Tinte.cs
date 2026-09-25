using UnityEngine;

namespace PlayCT.UI
{
    /// <summary>Color de taller si el material importado no tiene shader válido.</summary>
    public sealed class Tinte : MonoBehaviour
    {
        [SerializeField] Color color = new Color(0.55f, 0.36f, 0.2f, 1f);
        [SerializeField] float suavidad = 0.28f;

        void Awake() => Aplicar();

        void Aplicar()
        {
            var renderer = GetComponent<Renderer>();
            if (renderer == null) return;
            var actual = renderer.sharedMaterial;
            if (actual != null && actual.shader != null && actual.shader.name.IndexOf("Error", System.StringComparison.OrdinalIgnoreCase) < 0
                && actual.shader.name != "Hidden/InternalErrorShader")
            {
                return;
            }

            var shader = Shader.Find("Standard");
            if (shader == null) return;
            var material = new Material(shader);
            material.color = color;
            if (material.HasProperty("_Glossiness")) material.SetFloat("_Glossiness", suavidad);
            renderer.material = material;
        }
    }
}
