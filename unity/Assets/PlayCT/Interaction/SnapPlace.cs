using PlayCT.Tasks.Gabinete;
using PlayCT.Tasks.Hanoi;
using UnityEngine;

namespace PlayCT.Interaction
{
    /// <summary>
    /// Al soltar, acerca la pieza al poste o hueco y deja que el material acepte o devuelva.
    /// </summary>
    public sealed class SnapPlace : MonoBehaviour
    {
        [SerializeField] float radioPoste = 0.16f;
        [SerializeField] float radioHueco = 0.1f;
        [SerializeField] HanoiPeg[] postes;
        [SerializeField] HuecoForma[] huecos;

        public void SoltarDisco(HanoiDisk disco)
        {
            if (disco == null) return;
            var poste = BuscarPoste(disco.transform.position);
            if (poste == null || poste.index == disco.currentPeg)
            {
                disco.ReturnHome();
                return;
            }

            disco.OnReleasedOver(poste);
        }

        public void SoltarPieza(PiezaForma pieza)
        {
            if (pieza == null) return;
            var hueco = BuscarHueco(pieza.transform.position);
            if (hueco == null)
            {
                pieza.Volver();
                return;
            }

            pieza.Intentar(hueco);
        }

        public HanoiPeg BuscarPoste(Vector3 posicion)
        {
            HanoiPeg mejor = null;
            var mejorDistancia = radioPoste;
            if (postes == null) return null;
            foreach (var poste in postes)
            {
                if (poste == null) continue;
                var punto = poste.snapPoint != null ? poste.snapPoint.position : poste.transform.position;
                var distancia = DistanciaPlano(posicion, punto);
                if (distancia <= mejorDistancia)
                {
                    mejorDistancia = distancia;
                    mejor = poste;
                }
            }

            return mejor;
        }

        public HuecoForma BuscarHueco(Vector3 posicion)
        {
            HuecoForma mejor = null;
            var mejorDistancia = radioHueco;
            if (huecos == null) return null;
            foreach (var hueco in huecos)
            {
                if (hueco == null || !hueco.gameObject.activeInHierarchy) continue;
                var punto = hueco.snap != null ? hueco.snap.position : hueco.transform.position;
                var distancia = DistanciaPlano(posicion, punto);
                if (distancia <= mejorDistancia)
                {
                    mejorDistancia = distancia;
                    mejor = hueco;
                }
            }

            return mejor;
        }

        static float DistanciaPlano(Vector3 a, Vector3 b)
        {
            a.y = 0f;
            b.y = 0f;
            return Vector3.Distance(a, b);
        }
    }
}
