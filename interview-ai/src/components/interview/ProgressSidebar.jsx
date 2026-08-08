import Timer from "./Timer";
import TopicBadge from "./TopicBadge";

const mockQuestions = [
  { id: 1, title: "Prompt Engineering & Structured Outputs", status: "completed", score: 92 },
  { id: 2, title: "RAG Architecture & Vector Indexing", status: "completed", score: 85 },
  { id: 3, title: "Hybrid Search & Re-ranking Strategies", status: "current", score: null },
  { id: 4, title: "Model Context Protocol (MCP) Tools", status: "upcoming", score: null },
  { id: 5, title: "Vector DB Eviction & HNSW Parameters", status: "upcoming", score: null },
  { id: 6, title: "LLM Cache Eviction & Token Budgets", status: "upcoming", score: null },
  { id: 7, title: "Agentic Tool Calling & Fallbacks", status: "upcoming", score: null },
  { id: 8, title: "System Scale & Production Load Balancer", status: "upcoming", score: null },
];

const ProgressSidebar = ({
  candidateName = "Alex Rivera",
  role = "AI Engineer",
  difficulty = "Medium",
  currentQuestionId = 3,
  onSelectQuestion,
  onFinishEarly,
}) => {
  const completedCount = mockQuestions.filter((q) => q.status === "completed").length;
  const completionPercentage = Math.round((completedCount / mockQuestions.length) * 100);

  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-4">
      {/* Candidate Information Card */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
              {candidateName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">{candidateName}</h3>
              <p className="text-xs text-slate-400">{role}</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {difficulty}
          </span>
        </div>

        {/* Current Topic Badge */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
          <span className="text-xs text-slate-400 font-medium">Active Focus</span>
          <TopicBadge topic="RAG Architecture" variant="violet" />
        </div>
      </div>

      {/* Progress & Tracker Card */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Timer */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Progress Tracker
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Question {currentQuestionId} of {mockQuestions.length}
              </p>
            </div>
            <Timer initialSeconds={1140} />
          </div>

          {/* Completion Percentage Bar */}
          <div className="mb-5 space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">Overall Progress</span>
              <span className="text-indigo-400 font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Questions 1-8 List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {mockQuestions.map((q) => {
              const isCurrent = q.id === currentQuestionId;
              const isCompleted = q.status === "completed";

              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion && onSelectQuestion(q.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isCurrent
                      ? "bg-indigo-600/15 border-indigo-500/80 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                      : isCompleted
                      ? "bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700"
                      : "bg-slate-950/20 border-slate-800/40 text-slate-500 hover:text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        isCurrent
                          ? "bg-indigo-500 text-white"
                          : isCompleted
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isCompleted ? "✓" : q.id}
                    </span>
                    <span className="truncate font-medium">{q.title}</span>
                  </div>

                  {isCompleted && q.score && (
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-2">
                      {q.score}%
                    </span>
                  )}
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping ml-2 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Finish Early Action */}
        <div className="pt-4 mt-4 border-t border-slate-800/60">
          <button
            onClick={onFinishEarly}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 text-xs font-medium text-slate-400 hover:text-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Finish Interview Early</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProgressSidebar;
