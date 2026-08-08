const performanceMetrics = [
  { label: "Technical Accuracy", score: 88, color: "from-purple-500 to-indigo-500", text: "text-purple-400" },
  { label: "Reasoning", score: 92, color: "from-indigo-500 to-violet-500", text: "text-indigo-400" },
  { label: "Communication", score: 78, color: "from-violet-500 to-purple-400", text: "text-violet-400" },
  { label: "Problem Solving", score: 85, color: "from-cyan-500 to-blue-500", text: "text-cyan-400" },
  { label: "Confidence", score: 90, color: "from-amber-500 to-orange-500", text: "text-amber-400" },
];

const PerformanceChart = () => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Performance Summary
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluated across core engineering competency dimensions
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
          5 Metric Dimensions
        </span>
      </div>

      <div className="space-y-4">
        {performanceMetrics.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-slate-200">{item.label}</span>
              <span className={`font-mono font-bold ${item.text}`}>{item.score}%</span>
            </div>

            <div className="w-full bg-slate-950/80 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(168,85,247,0.3)]`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
