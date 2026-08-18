using System.Collections.Generic;

namespace PlayCT.Tasks.PatioCarga
{
    /// <summary>
    /// Block Relocation: solo el tope de cada pila se mueve.
    /// Línea B. No usar como near transfer del grupo Hanói.
    /// </summary>
    public sealed class PatioCargaState
    {
        readonly List<int>[] _stacks;
        readonly Queue<int> _order;
        int _relocations;
        int _futureBlocks;

        public PatioCargaState(IList<IList<int>> stacks, IEnumerable<int> retrieveOrder)
        {
            _stacks = new List<int>[stacks.Count];
            for (var i = 0; i < stacks.Count; i++)
                _stacks[i] = new List<int>(stacks[i]);
            _order = new Queue<int>(retrieveOrder);
            _relocations = 0;
            _futureBlocks = 0;
        }

        public int StackCount => _stacks.Length;
        public int Relocations => _relocations;
        public int FutureBlockingErrors => _futureBlocks;
        public int? NextTarget => _order.Count == 0 ? (int?)null : _order.Peek();
        public bool IsSolved => _order.Count == 0;
        public IReadOnlyList<int> Stack(int i) => _stacks[i];

        int? Top(int stack)
        {
            var s = _stacks[stack];
            if (s.Count == 0) return null;
            return s[s.Count - 1];
        }

        public bool CanMove(int from, int to)
        {
            if (from == to) return false;
            if (from < 0 || from >= _stacks.Length || to < 0 || to >= _stacks.Length) return false;
            return Top(from) != null;
        }

        /// <returns>false si no hay caja en el tope de origen.</returns>
        public bool TryMove(int from, int to)
        {
            if (!CanMove(from, to)) return false;
            var box = _stacks[from][_stacks[from].Count - 1];
            _stacks[from].RemoveAt(_stacks[from].Count - 1);

            if (NextTarget.HasValue && box == NextTarget.Value)
            {
                _order.Dequeue();
                return true;
            }

            _relocations++;
            if (NextTarget.HasValue)
            {
                foreach (var below in _stacks[to])
                {
                    if (below < box && _order.Contains(below))
                    {
                        _futureBlocks++;
                        break;
                    }
                }
            }

            _stacks[to].Add(box);
            return true;
        }

        public string Serialize()
        {
            var parts = new List<string>();
            for (var i = 0; i < _stacks.Length; i++)
                parts.Add((char)('A' + i) + ":[" + string.Join(",", _stacks[i]) + "]");
            var next = NextTarget.HasValue ? NextTarget.Value.ToString() : "-";
            return string.Join(" ", parts) + " next:" + next;
        }
    }
}
