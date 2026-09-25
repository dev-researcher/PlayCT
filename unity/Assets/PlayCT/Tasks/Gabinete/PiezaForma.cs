using PlayCT.Interaction;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

namespace PlayCT.Tasks.Gabinete
{
    /// <summary>
    /// Sólido del gabinete. Al soltar llama a <see cref="GabinetePuzzle.TryPlace"/>.
    /// </summary>
    public sealed class PiezaForma : MonoBehaviour
    {
        public string piezaId = "pieza";
        public string formaId = "forma";
        public GabinetePuzzle puzzle;

        Vector3 _reposo;
        Quaternion _rotacionReposo;
        bool _reposoListo;

        public bool Encajada { get; private set; }

        void Awake() => RecordarReposo();

        public void RecordarReposo()
        {
            _reposo = transform.position;
            _rotacionReposo = transform.rotation;
            _reposoListo = true;
        }

        public void Volver()
        {
            if (!_reposoListo) RecordarReposo();
            GetComponent<DiscreteRotate90>()?.Reiniciar();
            transform.SetPositionAndRotation(_reposo, _rotacionReposo);
        }

        public bool Intentar(HuecoForma hueco)
        {
            if (hueco == null || puzzle == null)
            {
                Volver();
                return false;
            }

            var giro = GetComponent<DiscreteRotate90>();
            var orientacion = hueco.pasosRequeridos < 0 || giro == null || giro.Alineado(hueco.pasosRequeridos);
            var coincide = !hueco.Ocupado && formaId == hueco.formaId && orientacion;
            if (!puzzle.TryPlace(piezaId, hueco.huecoId, coincide))
            {
                Volver();
                return false;
            }

            var anclaje = hueco.snap != null ? hueco.snap : hueco.transform;
            transform.SetPositionAndRotation(anclaje.position, anclaje.rotation);
            Encajada = true;
            hueco.Ocupar();
            var collider = GetComponent<Collider>();
            if (collider != null) collider.enabled = false;
            var grab = GetComponent<XRGrabInteractable>();
            if (grab != null) grab.enabled = false;
            return true;
        }

        public void Reiniciar()
        {
            Encajada = false;
            var collider = GetComponent<Collider>();
            if (collider != null) collider.enabled = true;
            var grab = GetComponent<XRGrabInteractable>();
            if (grab != null) grab.enabled = true;
            Volver();
        }
    }
}
