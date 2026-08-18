using UnityEngine;

namespace PlayCT.Core
{
    /// <summary>Timeboxes del protocolo. El far transfer ocurre fuera del visor.</summary>
    public sealed class ProtocolController : MonoBehaviour
    {
        [SerializeField] float tutorialSec = 300f;
        [SerializeField] float materialSec = 1500f;
        [SerializeField] float correoSec = 900f;

        public enum Phase { Tutorial, Material, Correo, QuitarVisor }

        public Phase Current { get; private set; } = Phase.Tutorial;
        float _entered;

        public void Begin(ConditionId _)
        {
            Enter(Phase.Tutorial);
        }

        void Update()
        {
            var elapsed = Time.time - _entered;
            if (Current == Phase.Tutorial && elapsed >= tutorialSec) Enter(Phase.Material);
            else if (Current == Phase.Material && elapsed >= materialSec) Enter(Phase.Correo);
            else if (Current == Phase.Correo && elapsed >= correoSec) Enter(Phase.QuitarVisor);
        }

        void Enter(Phase p)
        {
            Current = p;
            _entered = Time.time;
            Debug.Log("[Protocolo] " + p);
        }
    }
}
