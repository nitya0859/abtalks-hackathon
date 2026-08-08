import InterviewNotes from "./InterviewNotes";

const evaluationMetrics = [
  { label: "Technical Accuracy", score: 88, color: "bg-purple-500" },
  { label: "Reasoning", score: 92, color: "bg-indigo-500" },
  { label: "Communication", score: 78, color: "bg-violet-500" },
  { label: "Problem Solving", score: 85, color: "bg-cyan-500" },
  { label: "Confidence", score: 90, color: "bg-amber-500" },
];

const EvaluationPanel = () => {
  return (
    <aside className="w-full lg:w-[25%] flex-shrink-0 flex flex-col gap-4">
      {/* Live Evaluation Card */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Live Evaluation
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Real-time rubric scoring</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Live Sync
          </span>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3.5">
          {evaluationMetrics.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-300">
                  {item.label}
                </span>
                <span className="font-mono font-bold text-white">
                  {item.score}%
                </span>
              </div>
              <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-700 ease-out shadow-[0_0_8px_rgba(168,85,247,0.4)]`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Notes Card */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <InterviewNotes />
      </div>
    </aside>
  );
};

export default EvaluationPanel;
