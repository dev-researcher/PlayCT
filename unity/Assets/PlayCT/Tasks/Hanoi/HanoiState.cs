using System.Collections.Generic;
using System.Text;

namespace PlayCT.Tasks.Hanoi
{
    /// <summary>
    /// Estado puro de Hanói. Discos: 1 = más pequeño. Listas de abajo hacia arriba.
    /// Postes: 0 Origen, 1 Apoyo, 2 Destino.
    /// </summary>
    public sealed class HanoiState
    {
        public const int Origen = 0;
        public const int Apoyo = 1;
        public const int Destino = 2;

        readonly List<int>[] _pegs;

        public int DiskCount { get; }

        public HanoiState(int diskCount)
        {
            DiskCount = diskCount;
            _pegs = new[] { new List<int>(), new List<int>(), new List<int>() };
            for (var d = diskCount; d >= 1; d--)
                _pegs[Origen].Add(d);
        }

        public IReadOnlyList<int> Peg(int index) => _pegs[index];

        public bool IsSolved()
        {
            if (_pegs[Destino].Count != DiskCount) return false;
            for (var i = 0; i < DiskCount; i++)
                if (_pegs[Destino][i] != DiskCount - i) return false;
            return true;
        }

        public int? Top(int peg)
        {
            var list = _pegs[peg];
            if (list.Count == 0) return null;
            return list[list.Count - 1];
        }

        public bool CanMove(int from, int to)
        {
            if (from == to) return false;
            if (from < 0 || from > 2 || to < 0 || to > 2) return false;
            var moving = Top(from);
            if (moving == null) return false;
            var destTop = Top(to);
            return destTop == null || destTop.Value > moving.Value;
        }

        /// <returns>false si el material rechaza el movimiento (control del error).</returns>
        public bool TryMove(int from, int to)
        {
            if (!CanMove(from, to)) return false;
            var disk = _pegs[from][_pegs[from].Count - 1];
            _pegs[from].RemoveAt(_pegs[from].Count - 1);
            _pegs[to].Add(disk);
            return true;
        }

        public static int OptimumMoves(int disks) => (1 << disks) - 1;

        public string Serialize()
        {
            var sb = new StringBuilder();
            AppendPeg(sb, "O", Origen);
            sb.Append(' ');
            AppendPeg(sb, "A", Apoyo);
            sb.Append(' ');
            AppendPeg(sb, "D", Destino);
            return sb.ToString();
        }

        void AppendPeg(StringBuilder sb, string name, int peg)
        {
            sb.Append(name).Append(":[");
            var list = _pegs[peg];
            for (var i = 0; i < list.Count; i++)
            {
                if (i > 0) sb.Append(',');
                sb.Append(list[i]);
            }
            sb.Append(']');
        }

        public HanoiState Clone()
        {
            var copy = new HanoiState(DiskCount);
            for (var p = 0; p < 3; p++)
            {
                copy._pegs[p].Clear();
                copy._pegs[p].AddRange(_pegs[p]);
            }
            return copy;
        }
    }
}
