using UnityEngine;

namespace PlayCT.Tasks.Hanoi
{
    public sealed class HanoiPeg : MonoBehaviour
    {
        [Tooltip("0 Origen, 1 Apoyo, 2 Destino")]
        public int index;
        public Transform snapPoint;
    }
}
