const weaknessesList = [
  "Need deeper deployment knowledge (Kubernetes scaling & HPA config)",
  "Missed latency trade-offs during high-concurrency re-ranking",
  "Weak vector indexing explanation regarding quantization recall drop",
];

const WeaknessCard = () => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/60">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Areas to Improve
          </h3>
          <p className="text-xs text-slate-400">Targeted growth areas for your next round</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {weaknessesList.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300 flex items-start gap-2.5 shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
              ⚠
            </span>
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaknessCard;
