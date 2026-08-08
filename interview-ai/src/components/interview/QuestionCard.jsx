const QuestionCard = ({
  questionNumber = 3,
  topic = "Vector Database",
  difficulty = "Medium",
  questionText = "How would you optimize indexing, partition strategy, and query latency when scaling a vector database (e.g. Qdrant / Pinecone / pgvector) to over 500 million high-dimensional dense embeddings with real-time updates?",
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* AI Interviewer Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/20">
            <svg
              className="w-5 h-5 text-white"
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
                AI Senior Architect
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Interviewer
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Evaluating technical depth & system scalability
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
            {topic}
          </span>
          <span className="text-xs font-semibold uppercase px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {difficulty}
          </span>
        </div>
      </div>

      {/* Question Details */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1.5">
          <span>Question {questionNumber}</span>
          <span>•</span>
          <span>Core Infrastructure & Architecture</span>
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
          {questionText}
        </h2>
      </div>
    </div>
  );
};

export default QuestionCard;
