using PlayCT.Data;
using PlayCT.Guide;
using UnityEngine;

namespace PlayCT.Tasks.Hanoi
{
    /// <summary>
    /// Orquesta presentaciones 3 → 4 → 5. El visor llama <see cref="TryPlace"/>.
    /// </summary>
    public sealed class HanoiPuzzle : MonoBehaviour
    {
        [SerializeField] int[] presentaciones = { 3, 4, 5 };
        [SerializeField] GuideMachine guia;

        HanoiState _state;
        int _index;
        int _trial;
        int _moves;

        public HanoiState State => _state;
        public int PresentationIndex => _index;

        public void Begin()
        {
            _index = 0;
            StartPresentation();
        }

        public void StartPresentation()
        {
            var disks = presentaciones[Mathf.Clamp(_index, 0, presentaciones.Length - 1)];
            _state = new HanoiState(disks);
            _trial++;
            _moves = 0;
            EventLogger.Instance?.BeginTask("hanoi_p" + disks, _trial);
            EventLogger.Instance?.Emit("task_start", "", true, "", _state.Serialize());
        }

        /// <summary>
        /// Intento de colocar el disco que está al tope de <paramref name="fromPeg"/>
        /// sobre <paramref name="toPeg"/>. Si es ilegal, el disco no se mueve.
        /// </summary>
        public bool TryPlace(int fromPeg, int toPeg)
        {
            var before = _state.Serialize();
            var disk = _state.Top(fromPeg);
            var objectId = disk == null ? "" : "disco_" + disk;
            var ok = _state.TryMove(fromPeg, toPeg);
            var after = _state.Serialize();

            EventLogger.Instance?.Emit(
                ok ? "place" : "reject",
                objectId,
                ok,
                before,
                after,
                "{\"from\":" + fromPeg + ",\"to\":" + toPeg + "}");

            if (!ok)
            {
                guia?.OnMaterialRejected();
                return false;
            }

            _moves++;
            guia?.OnValidAction();

            if (_state.IsSolved())
            {
                EventLogger.Instance?.Emit("task_end", "", true, after, after, "{\"moves\":" + _moves + "}");
                if (_index < presentaciones.Length - 1)
                {
                    _index++;
                    StartPresentation();
                }
            }

            return true;
        }
    }
}
