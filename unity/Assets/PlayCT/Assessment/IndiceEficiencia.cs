using UnityEngine;

namespace PlayCT.Assessment
{
    /// <summary>IEE preregistrado. Ver docs/06-METRICAS.md.</summary>
    public static class IndiceEficiencia
    {
        public static float Compute(
            float excess01,
            float revisitRate01,
            float invalidRate01,
            float planMs,
            float submetas01)
        {
            var q = 1f - Clamp01(excess01);
            var r = 1f - Clamp01(revisitRate01);
            var v = 1f - Clamp01(invalidRate01);
            var p = Clamp01((planMs - 2000f) / 8000f);
            var s = Clamp01(submetas01);
            return 0.30f * q + 0.20f * r + 0.20f * v + 0.15f * p + 0.15f * s;
        }

        static float Clamp01(float x) => x < 0f ? 0f : (x > 1f ? 1f : x);
    }
}
