const CandidateCard = ({
  name = "Alex Rivera",
  role = "AI Engineer",
  difficulty = "Medium",
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-purple-900/30 flex-shrink-0">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-white truncate">{name}</h3>
          <p className="text-xs text-slate-400 truncate">{role}</p>
        </div>
        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 flex-shrink-0">
          {difficulty}
        </span>
      </div>
    </div>
  );
};

export default CandidateCard;
