import { useInterview } from "../../context/InterviewContext";

const EvaluationPanel = () => {
  const {
    liveScores,
    interviewNotes,
    hasEvaluation,
    isThinking,
  } = useInterview();

  const evaluationMetrics = [
    {
      label: "Technical Accuracy",
      score: liveScores.accuracy,
      color: "bg-purple-500",
    },
    {
      label: "Reasoning",
      score: liveScores.reasoning,
      color: "bg-indigo-500",
    },
    {
      label: "Communication",
      score: liveScores.communication,
      color: "bg-violet-500",
    },
    {
      label: "Problem Solving",
      score: liveScores.problemSolving,
      color: "bg-cyan-500",
    },
    {
      label: "Confidence",
      score: liveScores.confidence,
      color: "bg-amber-500",
    },
  ];

  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-4">
      {/* ========================================================
          LIVE EVALUATION
      ========================================================= */}

      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Live Evaluation
            </h3>

            <p className="text-xs text-slate-500 mt-0.5">
              Real-time rubric scoring
            </p>
          </div>

          <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isThinking
                  ? "bg-amber-400 animate-pulse"
                  : hasEvaluation
                  ? "bg-purple-400 animate-pulse"
                  : "bg-slate-600"
              }`}
            />

            {isThinking
              ? "Analyzing"
              : hasEvaluation
              ? "Live Sync"
              : "Waiting"}
          </span>
        </div>

        {/* Waiting State */}

        {!hasEvaluation && !isThinking && (
          <div className="mb-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800/70">
            <p className="text-xs text-slate-500 leading-relaxed">
              Submit your first technical response
              to begin evaluation.
            </p>
          </div>
        )}

        {/* Thinking State */}

        {isThinking && (
          <div className="mb-4 p-3 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

              <p className="text-xs text-purple-300">
                AI is analyzing your response...
              </p>
            </div>
          </div>
        )}

        {/* Metrics */}

        <div className="space-y-3.5">
          {evaluationMetrics.map((item) => (
            <div
              key={item.label}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-300">
                  {item.label}
                </span>

                <span className="font-mono font-bold text-white">
                  {hasEvaluation
                    ? `${item.score}%`
                    : "—"}
                </span>
              </div>

              <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-700 ease-out`}
                  style={{
                    width: hasEvaluation
                      ? `${item.score}%`
                      : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          INTERVIEW NOTES
      ========================================================= */}

      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <h3 className="text-sm font-semibold text-white">
          Interview Notes
        </h3>

        <p className="text-xs text-slate-500 mt-0.5 mb-4">
          AI observations from your responses
        </p>

        {interviewNotes.length === 0 ? (
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/70">
            <p className="text-xs text-slate-500">
              No observations yet. Your responses
              will be analyzed here.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {interviewNotes
              .slice(0, 4)
              .map((note) => (
                <div
                  key={note.id}
                  className={`p-3 rounded-xl border text-xs ${
                    note.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/10 border-amber-500/20 text-amber-300"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold flex-shrink-0">
                      {note.type === "success"
                        ? "✓"
                        : "⚠"}
                    </span>

                    <span className="leading-relaxed">
                      {note.text}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default EvaluationPanel;