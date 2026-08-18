using System;
using System.IO;
using PlayCT.Core;
using UnityEngine;

namespace PlayCT.Data
{
    /// <summary>
    /// Append-only JSONL. Un archivo por participante. Nunca el nombre real.
    /// </summary>
    public sealed class EventLogger : MonoBehaviour
    {
        public static EventLogger Instance { get; private set; }

        string _path;
        string _participantId;
        string _condition;
        float _sessionStart;
        float _trialStart;
        string _taskId = "";
        int _trialId;
        int _hintLevel;

        void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }

            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public void BeginSession(string participantId, ConditionId condition)
        {
            _participantId = participantId;
            _condition = condition.ToLogToken();
            _sessionStart = Time.realtimeSinceStartup;
            var dir = Path.Combine(Application.persistentDataPath, "playct");
            Directory.CreateDirectory(dir);
            _path = Path.Combine(dir, participantId + ".jsonl");
            Emit("session_start", "", true, "", "");
        }

        public void BeginTask(string taskId, int trialId)
        {
            _taskId = taskId;
            _trialId = trialId;
            _trialStart = Time.realtimeSinceStartup;
            _hintLevel = 0;
            Emit("task_start", "", true, "", "");
        }

        public void SetHintLevel(int level) => _hintLevel = Mathf.Max(0, level);

        public int HintLevel => _hintLevel;

        public long SessionMs => (long)((Time.realtimeSinceStartup - _sessionStart) * 1000f);

        public long TrialMs => (long)((Time.realtimeSinceStartup - _trialStart) * 1000f);

        public void Emit(
            string actionType,
            string objectId,
            bool valid,
            string fromState,
            string toState,
            string extraJson = "")
        {
            if (string.IsNullOrEmpty(_path))
            {
                Debug.LogWarning("EventLogger: sesión no iniciada.");
                return;
            }

            var e = new PuzzleActionEvent
            {
                timestamp = DateTimeOffset.Now.ToString("o"),
                sessionMs = SessionMs,
                participantId = _participantId,
                condition = _condition,
                taskId = _taskId,
                trialId = _trialId,
                actionType = actionType,
                objectId = objectId ?? "",
                fromState = fromState ?? "",
                toState = toState ?? "",
                valid = valid,
                hintLevel = _hintLevel,
                elapsedTrialMs = TrialMs,
                extraJson = extraJson ?? ""
            };

            var line = JsonUtility.ToJson(e);
            File.AppendAllText(_path, line + "\n");
        }

        public string LogPath => _path;
    }
}
