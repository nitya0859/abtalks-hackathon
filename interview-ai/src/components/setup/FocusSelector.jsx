const topics = [
  "Prompt Engineering",
  "RAG",
  "Vector Databases",
  "MCP",
  "Deployment",
  "System Design",
];

const FocusSelector = ({ selectedTopics, onToggle }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300">
          Interview Focus
        </label>
        <span className="text-xs text-slate-500">Select one or more</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <button
              key={topic}
              type="button"
              onClick={() => onToggle(topic)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? "bg-indigo-600/20 border-indigo-500/80 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                  : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
              }`}
            >
              {isSelected && (
                <svg
                  className="w-3.5 h-3.5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {topic}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FocusSelector;
