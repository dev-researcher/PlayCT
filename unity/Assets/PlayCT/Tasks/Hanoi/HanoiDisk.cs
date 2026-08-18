using UnityEngine;

namespace PlayCT.Tasks.Hanoi
{
    /// <summary>
    /// Disco agarrable. En el editor se le añade XRGrabInteractable.
    /// Al soltar, pregunta a <see cref="HanoiPuzzle"/> si el material acepta.
    /// </summary>
    public sealed class HanoiDisk : MonoBehaviour
    {
        public int size = 1;
        public HanoiPuzzle puzzle;
        public int currentPeg;

        Vector3 _home;

        void Awake() => _home = transform.position;

        public void RememberHome() => _home = transform.position;

        public void ReturnHome()
        {
            transform.position = _home;
            transform.rotation = Quaternion.identity;
        }

        /// <summary>Llamar desde el evento SelectExited de XRI con el poste bajo el disco.</summary>
        public void OnReleasedOver(HanoiPeg peg)
        {
            if (puzzle == null || peg == null)
            {
                ReturnHome();
                return;
            }

            if (puzzle.TryPlace(currentPeg, peg.index))
            {
                currentPeg = peg.index;
                if (peg.snapPoint != null)
                    transform.position = peg.snapPoint.position;
                RememberHome();
            }
            else
            {
                ReturnHome();
            }
        }
    }
}
