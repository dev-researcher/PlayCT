using UnityEngine;

namespace PlayCT.Interaction
{
    /// <summary>
    /// La pieza solo se detiene en múltiplos de 90°. Sirve al gabinete y, en fase 2, al cubo.
    /// </summary>
    public sealed class DiscreteRotate90 : MonoBehaviour
    {
        [SerializeField] int pasos;

        public int Pasos => pasos;

        public void Girar()
        {
            pasos = (pasos + 1) & 3;
            Aplicar();
        }

        public void Reiniciar()
        {
            pasos = 0;
            Aplicar();
        }

        public bool Alineado(int requerido)
        {
            if (requerido < 0) return true;
            var objetivo = ((requerido % 4) + 4) % 4;
            return pasos == objetivo;
        }

        void Aplicar()
        {
            transform.localRotation = Quaternion.Euler(0f, pasos * 90f, 0f);
        }
    }
}
