using System.IO;
using PlayCT.Data;
using UnityEngine;

namespace PlayCT.Data
{
    /// <summary>Copia el JSONL a una carpeta que el experimentador recoga. No lo escribe el puzzle.</summary>
    public sealed class SessionExporter : MonoBehaviour
    {
        public void Export()
        {
            var logger = EventLogger.Instance;
            if (logger == null || string.IsNullOrEmpty(logger.LogPath) || !File.Exists(logger.LogPath))
            {
                Debug.LogWarning("No hay log para exportar.");
                return;
            }

            var destDir = Path.Combine(Application.persistentDataPath, "export");
            Directory.CreateDirectory(destDir);
            var dest = Path.Combine(destDir, Path.GetFileName(logger.LogPath));
            File.Copy(logger.LogPath, dest, true);
            Debug.Log("Exportado: " + dest);
        }
    }
}
