using PlayCT.Data;
using UnityEngine;

namespace PlayCT.Guide
{
    /// <summary>
    /// Máquina idéntica en las tres condiciones. Ver docs/04-GUIA.md.
    /// </summary>
    public sealed class GuideMachine : MonoBehaviour
    {
        [SerializeField] float inactivityLevel2 = 20f;
        [SerializeField] float inactivityLevel3 = 40f;

        float _quiet;
        int _level;
        int _rejectsInRow;
        GuidePhrasesEs.Material _material = GuidePhrasesEs.Material.Hanoi;

        public void Configure(GuidePhrasesEs.Material material)
        {
            _material = material;
            ResetLevel();
        }

        public void OnValidAction()
        {
            _quiet = 0f;
            _rejectsInRow = 0;
            if (_level != 0)
            {
                _level = 0;
                EventLogger.Instance?.SetHintLevel(0);
            }
        }

        public void OnMaterialRejected()
        {
            _quiet = 0f;
            _rejectsInRow++;
            Show(1, GuidePhrasesEs.Nivel1);
            if (_rejectsInRow >= 2)
                Show(2, GuidePhrasesEs.Nivel2(_material));
        }

        void Update()
        {
            _quiet += Time.deltaTime;
            if (_level < 2 && _quiet >= inactivityLevel2)
                Show(2, GuidePhrasesEs.Nivel2(_material));
            else if (_level == 2 && _quiet >= inactivityLevel2 + inactivityLevel3)
                Show(3, GuidePhrasesEs.Nivel3(_material));
        }

        void Show(int level, string phrase)
        {
            if (level < _level) return;
            _level = level;
            EventLogger.Instance?.SetHintLevel(level);
            EventLogger.Instance?.Emit("hint", "guia", true, "", "", "{\"texto\":\"" + Escape(phrase) + "\"}");
            Debug.Log("[Guía n" + level + "] " + phrase);
            // La UI de lino lee GuidePhrasesEs y este nivel.
            LastPhrase = phrase;
            LastLevel = level;
        }

        public string LastPhrase { get; private set; } = "";
        public int LastLevel { get; private set; }

        void ResetLevel()
        {
            _level = 0;
            _quiet = 0f;
            _rejectsInRow = 0;
            LastPhrase = "";
            LastLevel = 0;
            EventLogger.Instance?.SetHintLevel(0);
        }

        static string Escape(string s) => (s ?? "").Replace("\\", "\\\\").Replace("\"", "\\\"");
    }
}
