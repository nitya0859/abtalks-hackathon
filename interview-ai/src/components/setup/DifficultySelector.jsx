const difficulties = [
  {
    id: "Easy",
    label: "Easy",
    desc: "Foundational concepts & core syntax",
  },
  {
    id: "Medium",
    label: "Medium",
    desc: "Practical application & architecture",
  },
  {
    id: "Hard",
    label: "Hard",
    desc: "Deep internals, edge cases & scale",
  },
  {
    id: "Adaptive",
    label: "Adaptive",
    desc: "Difficulty changes with your performance",
  },
];

const DifficultySelector = ({ selected, onSelect }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300">
          Difficulty Level
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {difficulties.map((level) => {
          const isSelected = selected === level.id;

          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelect(level.id)}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? "bg-purple-600/15 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                  : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-semibold text-sm ${
                    isSelected
                      ? "text-white"
                      : "text-slate-200"
                  }`}
                >
                  {level.label}
                </span>

                <div
                  className={`w-2 h-2 rounded-full ${
                    level.id === "Easy"
                      ? "bg-emerald-400"
                      : level.id === "Medium"
                      ? "bg-purple-400"
                      : level.id === "Hard"
                      ? "bg-amber-400"
                      : "bg-cyan-400"
                  }`}
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {level.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector;