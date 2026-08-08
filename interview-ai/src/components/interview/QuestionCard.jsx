import TopicBadge from "./TopicBadge";

const QuestionCard = ({
  questionNumber = 3,
  topic = "RAG & Vector Search",
  difficulty = "Medium",
  questionTitle = "Hybrid Search & Chunking Strategy",
  questionText = "How would you optimize chunk size and overlap strategy when indexing 100k+ technical documentation pages for a retrieval-augmented generation (RAG) system using hybrid search (Dense + Sparse BM25)?",
  codeContext = `// Example Schema Context
const vectorStoreConfig = {
  embeddingModel: "text-embedding-3-large",
  dimensions: 1536,
  distanceMetric: "cosine",
  hybridAlpha: 0.7, // Dense vs Sparse weight
  chunkSizeTokens: 512,
  chunkOverlapTokens: 64,
};`,
  isThinking = false,
  followUpText = "Follow-up: How do you prevent latency spikes during high-throughput re-ranking with Cross-Encoders?",
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center shadow-md">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v1.244m4.5 0V3.104M12 3v1.244M12 18.75v1.244m-2.25 0v1.244m4.5 0v-1.244M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">
                AI Interviewer
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active Session
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Evaluating architectural depth & reasoning
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TopicBadge topic={topic} variant="indigo" />
          <span className="text-xs font-semibold uppercase px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {difficulty}
          </span>
        </div>
      </div>

      {/* Question Body */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
          <span>Question {questionNumber}</span>
          <span>•</span>
          <span>{questionTitle}</span>
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed mb-3">
          {questionText}
        </h2>

        {/* Code Context / IDE Preview */}
        {codeContext && (
          <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 overflow-hidden text-xs font-mono text-slate-300">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80 border-b border-slate-800/60 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-sans font-medium text-slate-400">
                  config_context.js
                </span>
              </span>
              <span className="uppercase text-[9px] text-slate-500">Read Only</span>
            </div>
            <pre className="p-3 overflow-x-auto text-slate-300 leading-relaxed">
              <code>{codeContext}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Thinking Animation Placeholder */}
      {isThinking && (
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3 text-xs text-indigo-300 animate-pulse">
          <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
          <span>AI Interviewer is analyzing code response and generating live metrics...</span>
        </div>
      )}

      {/* Follow-up Question Placeholder */}
      {followUpText && !isThinking && (
        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-2.5 text-xs text-slate-400">
          <svg
            className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5"
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
          <p className="leading-relaxed">
            <span className="text-slate-200 font-semibold">Pro Tip: </span>
            {followUpText}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
