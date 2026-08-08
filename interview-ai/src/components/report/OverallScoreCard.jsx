const OverallScoreCard = ({
  score = 87,
  recommendation = "Strong Hire",
  candidateName = "Alex Rivera",
  role = "AI Engineer",
  date = "August 8, 2026",
}) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const recommendationStyles = {
    "Strong Hire": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    Hire: "bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    Borderline: "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    "No Hire": "bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  };

  const badgeStyle = recommendationStyles[recommendation] || recommendationStyles["Strong Hire"];

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Background glow ambient - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="space-y-3 flex-1 w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Interview Assessment Complete
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Candidate Evaluation Report
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed mx-auto sm:mx-0">
          Comprehensive AI technical evaluation for <span className="text-slate-200 font-semibold">{candidateName}</span> applying for the position of <span className="text-purple-300 font-semibold">{role}</span>.
        </p>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 pt-2">
          <div className="text-xs text-slate-400">
            Assessment Date: <span className="text-slate-200 font-medium">{date}</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Recommendation:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${badgeStyle}`}
            >
              {recommendation}
            </span>
          </div>
        </div>
      </div>

      {/* Large Circular Score */}
      <div className="flex flex-col items-center justify-center flex-shrink-0">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-slate-800/80"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-purple-500 transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {score}%
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-purple-300 mt-0.5">
              Overall Score
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallScoreCard;
