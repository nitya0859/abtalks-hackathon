const defaultTopics = [
  { id: 1, name: "Prompt Engineering", status: "completed" },
  { id: 2, name: "RAG", status: "completed" },
  { id: 3, name: "Vector Database", status: "active" },
  { id: 4, name: "MCP", status: "upcoming" },
  { id: 5, name: "Deployment", status: "upcoming" },
];

const TopicTimeline = ({ topics = defaultTopics }) => {
  return (
    <div className="space-y-2.5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Topic Timeline
      </h4>

      <div className="space-y-1.5 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-[1px] before:bg-slate-800/80">
        {topics.map((t) => {
          const isCompleted = t.status === "completed";
          const isActive = t.status === "active";

          return (
            <div
              key={t.id}
              className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs transition-all duration-200 relative z-10 ${
                isActive
                  ? "bg-purple-600/15 border-purple-500/80 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  : isCompleted
                  ? "bg-slate-950/40 border-slate-800/80 text-slate-300"
                  : "bg-slate-950/20 border-slate-800/40 text-slate-500"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  isActive
                    ? "bg-purple-500 text-white shadow-md shadow-purple-500/40"
                    : isCompleted
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "border border-slate-700 text-slate-600 bg-slate-900"
                }`}
              >
                {isCompleted ? "✓" : isActive ? "●" : "○"}
              </div>

              <span className={`font-medium flex-1 ${isActive ? "text-purple-200" : ""}`}>
                {t.name}
              </span>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicTimeline;
