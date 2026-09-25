using PlayCT.Interaction;
using PlayCT.Tasks.Gabinete;
using PlayCT.Tasks.Hanoi;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

namespace PlayCT.Input
{
    /// <summary>
    /// Visor: el SelectExited de XRI pregunta al material si acepta la pieza.
    /// El gatillo (activate) gira 90°.
    /// </summary>
    public sealed class XrInput : MonoBehaviour
    {
        [SerializeField] InputAdapter adapter;
        [SerializeField] SnapPlace snap;

        XRGrabInteractable[] _agarrables;

        void OnEnable()
        {
            _agarrables = FindObjectsByType<XRGrabInteractable>(FindObjectsInactive.Include, FindObjectsSortMode.None);
            foreach (var grab in _agarrables)
            {
                grab.throwOnDetach = false;
                grab.movementType = XRBaseInteractable.MovementType.Instantaneous;
                grab.selectEntered.AddListener(AlTomar);
                grab.selectExited.AddListener(AlSoltar);
                grab.activated.AddListener(AlActivar);
            }
        }

        void OnDisable()
        {
            if (_agarrables == null) return;
            foreach (var grab in _agarrables)
            {
                if (grab == null) continue;
                grab.selectEntered.RemoveListener(AlTomar);
                grab.selectExited.RemoveListener(AlSoltar);
                grab.activated.RemoveListener(AlActivar);
            }
        }

        void AlTomar(SelectEnterEventArgs args)
        {
            if (adapter != null) adapter.ObjetoSujeto = args.interactableObject.transform;
        }

        void AlSoltar(SelectExitEventArgs args)
        {
            var t = args.interactableObject.transform;
            var disco = t.GetComponent<HanoiDisk>();
            if (disco != null) snap?.SoltarDisco(disco);
            else
            {
                var pieza = t.GetComponent<PiezaForma>();
                if (pieza != null) snap?.SoltarPieza(pieza);
            }
            if (adapter != null && adapter.ObjetoSujeto == t) adapter.ObjetoSujeto = null;
        }

        void AlActivar(ActivateEventArgs args)
        {
            args.interactableObject.transform.GetComponent<DiscreteRotate90>()?.Girar();
        }
    }
}
