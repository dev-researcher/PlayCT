using PlayCT.Data;
using UnityEngine;

namespace PlayCT.Core
{
    /// <summary>Al quitar el visor, copia el JSONL con <see cref="SessionExporter"/>.</summary>
    public sealed class SesionCierre : MonoBehaviour
    {
        [SerializeField] ProtocolController protocolo;
        [SerializeField] SessionExporter exportador;

        bool _exportado;

        void Update()
        {
            if (_exportado || protocolo == null || protocolo.Current != ProtocolController.Phase.QuitarVisor) return;
            _exportado = true;
            exportador?.Export();
        }
    }
}
