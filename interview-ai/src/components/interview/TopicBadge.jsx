const TopicBadge = ({ topic = "RAG & Vector Search", variant = "indigo" }) => {
  const colorMap = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  const style = colorMap[variant] || colorMap.indigo;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {topic}
    </span>
  );
};

export default TopicBadge;
