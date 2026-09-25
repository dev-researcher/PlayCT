using PlayCT.Input;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

namespace PlayCT.Tasks.Hanoi
{
    /// <summary>
    /// Coloca los discos según <see cref="HanoiPuzzle.State"/>. Solo el tope se puede tomar.
    /// </summary>
    public sealed class HanoiMesa : MonoBehaviour
    {
        [SerializeField] HanoiPuzzle puzzle;
        [SerializeField] HanoiDisk[] discos;
        [SerializeField] HanoiPeg[] postes;
        [SerializeField] InputAdapter adapter;
        [SerializeField] float grosor = 0.022f;

        void LateUpdate()
        {
            if (puzzle == null || puzzle.State == null || discos == null) return;
            var estado = puzzle.State;
            var sujeto = adapter != null ? adapter.ObjetoSujeto : null;

            foreach (var disco in discos)
            {
                if (disco == null) continue;
                var visible = disco.size <= estado.DiskCount;
                if (disco.gameObject.activeSelf != visible)
                    disco.gameObject.SetActive(visible);
            }

            for (var p = 0; p < 3; p++)
            {
                var lista = estado.Peg(p);
                var poste = Poste(p);
                if (poste == null) continue;
                var anclaje = poste.snapPoint != null ? poste.snapPoint.position : poste.transform.position;
                for (var i = 0; i < lista.Count; i++)
                {
                    var disco = Buscar(lista[i]);
                    if (disco == null) continue;
                    disco.currentPeg = p;
                    var esTope = i == lista.Count - 1;
                    Habilitar(disco, esTope || disco.transform == sujeto);
                    if (disco.transform == sujeto) continue;
                    var y = anclaje.y + grosor * (i + 0.5f);
                    disco.transform.SetPositionAndRotation(new Vector3(anclaje.x, y, anclaje.z), Quaternion.identity);
                    disco.RememberHome();
                }
            }
        }

        HanoiPeg Poste(int index)
        {
            if (postes == null) return null;
            foreach (var poste in postes)
            {
                if (poste != null && poste.index == index) return poste;
            }

            return null;
        }

        HanoiDisk Buscar(int size)
        {
            foreach (var disco in discos)
            {
                if (disco != null && disco.size == size) return disco;
            }

            return null;
        }

        static void Habilitar(HanoiDisk disco, bool puedeTomarse)
        {
            var collider = disco.GetComponent<Collider>();
            if (collider != null) collider.enabled = puedeTomarse;
            var grab = disco.GetComponent<XRGrabInteractable>();
            if (grab != null) grab.enabled = puedeTomarse;
        }
    }
}
