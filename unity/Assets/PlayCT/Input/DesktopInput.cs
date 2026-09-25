using PlayCT.Interaction;
using PlayCT.Tasks.Gabinete;
using PlayCT.Tasks.Hanoi;
using UnityEngine;
using UnityEngine.InputSystem;

namespace PlayCT.Input
{
    /// <summary>
    /// Ratón en el editor: tomar el tope y soltarlo. R gira 90° una pieza del gabinete.
    /// </summary>
    public sealed class DesktopInput : MonoBehaviour
    {
        [SerializeField] Camera camara;
        [SerializeField] InputAdapter adapter;
        [SerializeField] SnapPlace snap;
        [SerializeField] Vector3 vista = new Vector3(0f, 1.58f, 0f);
        [SerializeField] Vector3 mira = new Vector3(0f, 0.9f, 0.7f);

        Transform _sujeto;
        float _altura;

        void LateUpdate()
        {
            if (camara == null) return;
            camara.transform.position = vista;
            camara.transform.rotation = Quaternion.LookRotation(mira - vista, Vector3.up);
        }

        void Update()
        {
            var mouse = Mouse.current;
            if (camara == null || mouse == null) return;
            var ray = camara.ScreenPointToRay(mouse.position.ReadValue());

            if (mouse.leftButton.wasPressedThisFrame)
                IntentarTomar(ray);

            if (_sujeto != null && mouse.leftButton.isPressed)
            {
                var plano = new Plane(Vector3.up, new Vector3(0f, _altura, 0f));
                if (plano.Raycast(ray, out var distancia))
                    _sujeto.position = ray.GetPoint(distancia);
                if (Keyboard.current != null && Keyboard.current.rKey.wasPressedThisFrame)
                    _sujeto.GetComponent<DiscreteRotate90>()?.Girar();
            }

            if (mouse.leftButton.wasReleasedThisFrame)
                Soltar();
        }

        void IntentarTomar(Ray ray)
        {
            if (!Physics.Raycast(ray, out var hit, 8f)) return;
            var disco = hit.collider.GetComponentInParent<HanoiDisk>();
            if (disco != null)
            {
                _sujeto = disco.transform;
                _altura = Mathf.Max(disco.transform.position.y, 0.95f);
                if (adapter != null) adapter.ObjetoSujeto = _sujeto;
                return;
            }

            var pieza = hit.collider.GetComponentInParent<PiezaForma>();
            if (pieza != null && !pieza.Encajada)
            {
                _sujeto = pieza.transform;
                _altura = Mathf.Max(pieza.transform.position.y, 0.95f);
                if (adapter != null) adapter.ObjetoSujeto = _sujeto;
            }
        }

        void Soltar()
        {
            if (_sujeto == null) return;
            var disco = _sujeto.GetComponent<HanoiDisk>();
            var pieza = _sujeto.GetComponent<PiezaForma>();
            if (disco != null) snap?.SoltarDisco(disco);
            else if (pieza != null) snap?.SoltarPieza(pieza);
            _sujeto = null;
            if (adapter != null) adapter.ObjetoSujeto = null;
        }
    }
}
