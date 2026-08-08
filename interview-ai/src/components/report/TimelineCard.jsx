const timelineQuestions = [
  { id: 1, title: "Prompt Engineering & JSON Schemas", rating: "Good", topic: "Prompt Engineering", color: "text-purple-400 border-purple-500/20 bg-purple-500/10" },
  { id: 2, title: "RAG Hybrid Retrieval & Weighting", rating: "Excellent", topic: "RAG", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" },
  { id: 3, title: "Vector DB Eviction & Indexing", rating: "Needs Improvement", topic: "Vector Database", color: "text-amber-400 border-amber-500/20 bg-amber-500/10" },
  { id: 4, title: "Model Context Protocol Tool Calling", rating: "Good", topic: "MCP", color: "text-purple-400 border-purple-500/20 bg-purple-500/10" },
  { id: 5, title: "System Scale & Production Load Balancer", rating: "Excellent", topic: "Deployment", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" },
];

const TimelineCard = () => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            AI Interview Timeline
          </h3>
          <p className="text-xs text-slate-400">Question-by-question evaluation history</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {timelineQuestions.map((q) => (
          <div
            key={q.id}
            className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
                <span>Q{q.id}</span>
                <span className="text-slate-500">{q.topic}</span>
              </div>
              <h4 className="text-xs font-medium text-white leading-snug line-clamp-2">
                {q.title}
              </h4>
            </div>

            <span
              className={`inline-block w-full text-center text-[10px] font-bold uppercase px-2 py-1 rounded-lg border ${q.color}`}
            >
              {q.rating}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineCard;
