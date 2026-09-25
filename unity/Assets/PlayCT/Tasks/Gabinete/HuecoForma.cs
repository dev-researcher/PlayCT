using UnityEngine;

namespace PlayCT.Tasks.Gabinete
{
    /// <summary>Hueco del tablero. pasosRequeridos &lt; 0 acepta cualquier giro.</summary>
    public sealed class HuecoForma : MonoBehaviour
    {
        public string huecoId = "hueco";
        public string formaId = "forma";
        public int pasosRequeridos = -1;
        public Transform snap;

        public bool Ocupado { get; private set; }

        public void Ocupar() => Ocupado = true;

        public void Liberar() => Ocupado = false;
    }
}
