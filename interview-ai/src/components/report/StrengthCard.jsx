const strengthsList = [
  "Excellent reasoning on trade-offs between vector indices",
  "Strong architecture design for distributed hybrid search",
  "Clear, structured communication with code & Markdown examples",
  "Good debugging approach for LLM token budget leaks",
];

const StrengthCard = () => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/60">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Key Strengths
          </h3>
          <p className="text-xs text-slate-400">Verified core technical competencies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {strengthsList.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300 flex items-start gap-2.5 shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
              ✓
            </span>
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrengthCard;
