const ThinkingCard = ({
  followUpText = "How would your partition strategy change if 80% of query traffic targets vectors updated within the last 24 hours?",
}) => {
  return (
    <div className="space-y-4">
      {/* Thinking State Card */}
      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-xl flex items-center gap-3 text-xs text-purple-300 shadow-xl">
        <div className="w-5 h-5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-purple-200 block">
            AI is analyzing your response...
          </span>
          <span className="text-[11px] text-purple-400">
            Evaluating memory footprint, query latency, and index trade-offs
          </span>
        </div>
      </div>

      {/* Follow-up Question Placeholder */}
      <div className="p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl flex items-start gap-3 text-xs text-slate-300">
        <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0 mt-0.5">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div>
          <span className="text-xs font-semibold text-purple-300 block mb-1">
            Follow-up Probe:
          </span>
          <p className="text-slate-300 leading-relaxed">{followUpText}</p>
        </div>
      </div>
    </div>
  );
};

export default ThinkingCard;
