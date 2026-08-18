using System;

namespace PlayCT.Data
{
    /// <summary>
    /// Un evento de proceso. Los puzzles no escriben archivos; emiten esto.
    /// </summary>
    [Serializable]
    public sealed class PuzzleActionEvent
    {
        public string timestamp;
        public long sessionMs;
        public string participantId;
        public string condition;
        public string taskId;
        public int trialId;
        public string actionType;
        public string objectId;
        public string fromState;
        public string toState;
        public bool valid;
        public int hintLevel;
        public long elapsedTrialMs;
        public string extraJson;
    }
}
