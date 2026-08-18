using System;

namespace PlayCT.Core
{
    /// <summary>
    /// Asignación estratificada por programación 0–1 vs 2–3.
    /// El experimentador corre esto *antes* de la sesión y escribe session.json.
    /// </summary>
    public static class ConditionRandomizer
    {
        public static ConditionId Next(int programming0to3, int participantOrdinal, int seed = 2026)
        {
            var stratum = programming0to3 <= 1 ? 0 : 1;
            var rng = new System.Random(seed + stratum * 1000 + participantOrdinal);
            var bag = new[] { ConditionId.Hanoi, ConditionId.Cubo, ConditionId.Gabinete };
            return bag[rng.Next(0, bag.Length)];
        }
    }
}
