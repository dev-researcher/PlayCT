using System;
using System.IO;
using PlayCT.Core;
using PlayCT.Data;
using PlayCT.Guide;
using PlayCT.Tasks.Gabinete;
using PlayCT.Tasks.Hanoi;
using UnityEngine;

namespace PlayCT.Core
{
    /// <summary>
    /// Lee session.json (o campos del inspector), arranca logger, guía y material.
    /// El participante no elige condición.
    /// </summary>
    public sealed class SessionManager : MonoBehaviour
    {
        [SerializeField] string participantId = "P000";
        [SerializeField] ConditionId condition = ConditionId.Hanoi;
        [SerializeField] string sessionFileName = "session.json";
        [SerializeField] EventLogger logger;
        [SerializeField] GuideMachine guia;
        [SerializeField] HanoiPuzzle hanoi;
        [SerializeField] GabinetePuzzle gabinete;
        [SerializeField] ProtocolController protocol;

        public string ParticipantId => participantId;
        public ConditionId Condition => condition;

        void Start()
        {
            TryLoadSessionFile();
            if (logger == null) logger = GetComponent<EventLogger>() ?? gameObject.AddComponent<EventLogger>();
            logger.BeginSession(participantId, condition);

            if (guia != null)
            {
                guia.Configure(ToMaterial(condition));
            }

            protocol?.Begin(condition);

            switch (condition)
            {
                case ConditionId.Hanoi:
                    if (hanoi != null) hanoi.Begin();
                    if (gabinete != null) gabinete.gameObject.SetActive(false);
                    break;
                case ConditionId.Gabinete:
                    if (hanoi != null) hanoi.gameObject.SetActive(false);
                    if (gabinete != null) gabinete.Begin();
                    break;
                case ConditionId.Cubo:
                    Debug.LogWarning("Cubo: fase 2. En el piloto use Hanói o Gabinete.");
                    break;
            }
        }

        void TryLoadSessionFile()
        {
            var path = Path.Combine(Application.persistentDataPath, sessionFileName);
            if (!File.Exists(path)) return;
            try
            {
                var json = File.ReadAllText(path);
                var dto = JsonUtility.FromJson<SessionFile>(json);
                if (!string.IsNullOrEmpty(dto.participantId)) participantId = dto.participantId;
                if (ConditionIdExtensions.TryParseToken(dto.condition, out var c)) condition = c;
            }
            catch (Exception e)
            {
                Debug.LogWarning("No se pudo leer session.json: " + e.Message);
            }
        }

        static GuidePhrasesEs.Material ToMaterial(ConditionId c)
        {
            switch (c)
            {
                case ConditionId.Cubo: return GuidePhrasesEs.Material.Cubo;
                case ConditionId.Gabinete: return GuidePhrasesEs.Material.Gabinete;
                default: return GuidePhrasesEs.Material.Hanoi;
            }
        }

        [Serializable]
        class SessionFile
        {
            public string participantId;
            public string condition;
        }
    }
}
