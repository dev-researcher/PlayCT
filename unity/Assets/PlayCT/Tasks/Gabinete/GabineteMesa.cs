using UnityEngine;

namespace PlayCT.Tasks.Gabinete
{
    /// <summary>
    /// Muestra 4, 6 u 8 piezas según la presentación del <see cref="GabinetePuzzle"/>.
    /// </summary>
    public sealed class GabineteMesa : MonoBehaviour
    {
        [SerializeField] GabinetePuzzle puzzle;
        [SerializeField] PiezaForma[] piezas;
        [SerializeField] HuecoForma[] huecos;

        int _visto = -1;

        void LateUpdate()
        {
            if (puzzle == null || puzzle.Target <= 0) return;
            if (_visto == puzzle.Target) return;
            _visto = puzzle.Target;
            if (piezas != null)
            {
                foreach (var pieza in piezas)
                    pieza?.Reiniciar();
            }

            if (huecos != null)
            {
                foreach (var hueco in huecos)
                    hueco?.Liberar();
            }

            AplicarVisibilidad();
        }

        void AplicarVisibilidad()
        {
            var n = puzzle.Target;
            if (piezas != null)
            {
                for (var i = 0; i < piezas.Length; i++)
                {
                    if (piezas[i] != null) piezas[i].gameObject.SetActive(i < n);
                }
            }

            if (huecos != null)
            {
                for (var i = 0; i < huecos.Length; i++)
                {
                    if (huecos[i] != null) huecos[i].gameObject.SetActive(i < n);
                }
            }
        }
    }
}
