using UnityEngine;

namespace PlayCT.UI
{
    /// <summary>Etiqueta de la mesa. El texto sale de <see cref="StringsEs"/>.</summary>
    public sealed class EtiquetaEspanol : MonoBehaviour
    {
        public enum Clave { Origen, Apoyo, Destino }

        [SerializeField] Clave clave = Clave.Origen;
        [SerializeField] TextMesh texto;

        void Awake()
        {
            if (texto == null) texto = GetComponent<TextMesh>();
            if (texto == null) return;
            switch (clave)
            {
                case Clave.Apoyo: texto.text = StringsEs.Apoyo; break;
                case Clave.Destino: texto.text = StringsEs.Destino; break;
                default: texto.text = StringsEs.Origen; break;
            }
        }
    }
}
