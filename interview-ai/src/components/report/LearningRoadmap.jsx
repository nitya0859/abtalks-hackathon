const roadmapItems = [
  { action: "Review", topic: "Prompt Engineering", desc: "Brush up on structured schema enforcement & system prompts", color: "bg-purple-500/10 border-purple-500/20 text-purple-300" },
  { action: "Practice", topic: "Vector Databases", desc: "Hands-on tuning of HNSW indexing & quantization recall rates", color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" },
  { action: "Study", topic: "Model Context Protocol", desc: "Deep dive into JSON-RPC security sandboxing & tool calling", color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300" },
  { action: "Complete", topic: "Deployment Module", desc: "Master Kubernetes HPA scaling & production LLM load balancing", color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
];

const LearningRoadmap = () => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Personalized Learning Roadmap
          </h3>
          <p className="text-xs text-slate-400">Tailored action plan to elevate your technical rating</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roadmapItems.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border ${item.color} space-y-2 flex flex-col justify-between`}
          >
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/60 border border-slate-800 text-slate-300">
                {item.action}
              </span>
              <h4 className="text-sm font-bold text-white mt-2">
                {item.topic}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                {item.desc}
              </p>
            </div>

            <div className="pt-2 text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer">
              <span>Start Module</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningRoadmap;
