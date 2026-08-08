const metricsConfig = [
  {
    key: "accuracy",
    label: "Technical Accuracy",
    score: 88,
    color: "from-emerald-500 to-teal-400",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    desc: "Correct terminology & API contracts",
  },
  {
    key: "reasoning",
    label: "Reasoning & Trade-offs",
    score: 92,
    color: "from-indigo-500 to-violet-400",
    text: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    desc: "Identified dense vs sparse trade-offs",
  },
  {
    key: "communication",
    label: "Communication Clarity",
    score: 78,
    color: "from-violet-500 to-purple-400",
    text: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    desc: "Structured bullet points & code snippets",
  },
  {
    key: "problemSolving",
    label: "Problem Solving",
    score: 85,
    color: "from-cyan-500 to-blue-400",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    desc: "Hybrid search scaling solution",
  },
  {
    key: "confidence",
    label: "Confidence Score",
    score: 90,
    color: "from-amber-500 to-orange-400",
    text: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    desc: "Decisive architectural selections",
  },
];

const EvaluationPanel = ({ overallScore = 87 }) => {
  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-4">
      {/* Overall Score Badge */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Live AI Evaluation
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Real-time rubric scoring</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-extrabold text-white tracking-tight">
            {overallScore}
          </span>
          <span className="text-sm font-semibold text-slate-400">/ 100</span>
          <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Strong Alignment
          </span>
        </div>

        <div className="w-full bg-slate-950/80 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-emerald-500 via-indigo-500 to-violet-500 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>

      {/* Metrics Breakdown Card */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl flex-1 space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Skill Dimension Breakdown
        </h4>

        <div className="space-y-3.5">
          {metricsConfig.map((metric) => (
            <div key={metric.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-300">
                  {metric.label}
                </span>
                <span className={`font-mono font-bold ${metric.text}`}>
                  {metric.score}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-700 ease-out shadow-sm`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-500 leading-tight">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live Feedback Snippet */}
        <div className="pt-4 border-t border-slate-800/60">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 2.438a3.75 3.75 0 000-7.5m-7.5 0a3.75 3.75 0 000 7.5" />
              </svg>
              <span>Key Feedback</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Excellent grasp of chunking boundaries. Expand on re-ranker candidate caching strategies to push score above 90%.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EvaluationPanel;
