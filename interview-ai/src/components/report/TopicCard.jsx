const topicBreakdownData = [
  {
    topic: "Prompt Engineering",
    score: 92,
    status: "Excellent",
    strength: "Structured JSON schema validation & system prompts",
    weakness: "Minor token window optimization gap",
  },
  {
    topic: "RAG Architecture",
    score: 88,
    status: "Strong",
    strength: "Hybrid dense + BM25 retrieval weighting",
    weakness: "Cache eviction policy needs detail",
  },
  {
    topic: "Vector Database",
    score: 85,
    status: "Good",
    strength: "Scalar quantization (SQ8) & HNSW indexing",
    weakness: "Recall rate vs latency trade-offs",
  },
  {
    topic: "Model Context Protocol",
    score: 80,
    status: "Satisfactory",
    strength: "Clean tool definition & JSON-RPC handling",
    weakness: "Sandbox isolation security mechanics",
  },
  {
    topic: "Deployment & Infra",
    score: 72,
    status: "Needs Improvement",
    strength: "Basic Docker container setups",
    weakness: "K8s horizontal pod autoscaling under load",
  },
];

const TopicCard = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Topic Breakdown
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Detailed breakdown per technical topic domain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topicBreakdownData.map((item) => {
          const isExcellent = item.status === "Excellent" || item.status === "Strong";
          return (
            <div
              key={item.topic}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between hover:border-purple-500/40 transition duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-white">
                    {item.topic}
                  </h3>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      isExcellent
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                        : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-extrabold text-white">
                    {item.score}%
                  </span>
                  <span className="text-xs text-slate-400">Score</span>
                </div>

                <div className="space-y-2 border-t border-slate-800/60 pt-3 text-xs">
                  <div className="flex items-start gap-1.5 text-emerald-300">
                    <span className="font-bold">✓</span>
                    <span><strong className="text-slate-300">Strength:</strong> {item.strength}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-amber-300">
                    <span className="font-bold">⚠</span>
                    <span><strong className="text-slate-300">Weakness:</strong> {item.weakness}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicCard;
