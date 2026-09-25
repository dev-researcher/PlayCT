using PlayCT.Core;
using PlayCT.Guide;
using UnityEngine;

namespace PlayCT.UI
{
    /// <summary>Tarjeta de lino. Lee la frase que ya decidió <see cref="GuideMachine"/>.</summary>
    public sealed class GuiaLino : MonoBehaviour
    {
        [SerializeField] GuideMachine guia;
        [SerializeField] ProtocolController protocolo;
        [SerializeField] TextMesh texto;

        void Update()
        {
            if (texto == null) return;
            if (protocolo != null && protocolo.Current == ProtocolController.Phase.QuitarVisor)
            {
                texto.text = StringsEs.QuitarVisor;
                return;
            }

            if (guia != null && !string.IsNullOrEmpty(guia.LastPhrase))
            {
                texto.text = guia.LastPhrase;
                return;
            }

            if (protocolo == null || protocolo.Current == ProtocolController.Phase.Tutorial)
                texto.text = GuidePhrasesEs.Tutorial;
        }
    }
}
