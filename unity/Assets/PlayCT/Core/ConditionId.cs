namespace PlayCT.Core
{
    public enum ConditionId
    {
        Hanoi,
        Cubo,
        Gabinete
    }

    public static class ConditionIdExtensions
    {
        public static string ToLogToken(this ConditionId id)
        {
            switch (id)
            {
                case ConditionId.Hanoi: return "hanoi";
                case ConditionId.Cubo: return "cubo";
                case ConditionId.Gabinete: return "gabinete";
                default: return "unknown";
            }
        }

        public static bool TryParseToken(string token, out ConditionId id)
        {
            switch ((token ?? "").Trim().ToLowerInvariant())
            {
                case "hanoi":
                case "hanói":
                    id = ConditionId.Hanoi;
                    return true;
                case "cubo":
                case "rubik":
                    id = ConditionId.Cubo;
                    return true;
                case "gabinete":
                case "control":
                    id = ConditionId.Gabinete;
                    return true;
                default:
                    id = ConditionId.Hanoi;
                    return false;
            }
        }
    }
}
