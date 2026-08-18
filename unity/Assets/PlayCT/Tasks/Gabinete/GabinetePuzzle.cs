using PlayCT.Data;
using PlayCT.Guide;
using UnityEngine;

namespace PlayCT.Tasks.Gabinete
{
    /// <summary>
    /// Control activo: encaje de formas. Misma guía, mismo snap, sin subproblemas.
    /// </summary>
    public sealed class GabinetePuzzle : MonoBehaviour
    {
        [SerializeField] int[] presentaciones = { 4, 6, 8 };
        [SerializeField] GuideMachine guia;

        int _index;
        int _trial;
        int _placed;
        int _target;

        public void Begin()
        {
            _index = 0;
            StartPresentation();
        }

        public void StartPresentation()
        {
            _target = presentaciones[Mathf.Clamp(_index, 0, presentaciones.Length - 1)];
            _placed = 0;
            _trial++;
            EventLogger.Instance?.BeginTask("gabinete_n" + _target, _trial);
        }

        public bool TryPlace(string piezaId, string huecoId, bool formaCoincide)
        {
            var before = _placed + "/" + _target;
            if (!formaCoincide)
            {
                EventLogger.Instance?.Emit("reject", piezaId, false, before, before, "{\"hueco\":\"" + huecoId + "\"}");
                guia?.OnMaterialRejected();
                return false;
            }

            _placed++;
            var after = _placed + "/" + _target;
            EventLogger.Instance?.Emit("place", piezaId, true, before, after, "{\"hueco\":\"" + huecoId + "\"}");
            guia?.OnValidAction();

            if (_placed >= _target && _index < presentaciones.Length - 1)
            {
                _index++;
                StartPresentation();
            }

            return true;
        }
    }
}
