const OverallScoreCard = ({
  score = 87,
  recommendation = "Strong Hire",
  candidateName = "Alex Rivera",
  role = "AI Engineer",
  date = "August 8, 2026",
}) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.max(
    0,
    Math.min(100, Number(score) || 0)
  );

  const strokeDashoffset =
    circumference - (safeScore / 100) * circumference;

  const recommendationStyles = {
    "Strong Hire":
      "bg-[#e5eee2] text-[#52634f] border-[#cbd8c6]",

    Hire:
      "bg-[#e9eee5] text-[#5f705d] border-[#cbd5c7]",

    Borderline:
      "bg-[#f0e8dc] text-[#806f58] border-[#dfd0bb]",

    "No Hire":
      "bg-[#eee1dc] text-[#805f56] border-[#dbc4bc]",
  };

  const badgeStyle =
    recommendationStyles[recommendation] ||
    recommendationStyles.Hire;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border border-[#ddd7cd]
        bg-[#faf8f4]
        shadow-[0_10px_35px_rgba(72,65,54,0.06)]
        p-6 sm:p-8
      "
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* TEXT */}
        <div className="space-y-3 flex-1">
          <div
            className="
              inline-flex items-center gap-2
              px-3 py-1.5
              rounded-full
              bg-[#ebe6dc]
              border border-[#d8d1c5]
              text-[#625d54]
              text-[10px]
              font-bold
              uppercase
              tracking-wide
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#687a65]" />

            Interview Assessment Complete
          </div>

          <h1
            className="
              text-2xl sm:text-3xl lg:text-4xl
              font-bold
              tracking-tight
              text-[#25231f]
            "
          >
            Candidate Evaluation Report
          </h1>

          <p className="text-xs sm:text-sm text-[#777269] max-w-xl leading-relaxed">
            Comprehensive AI technical evaluation for{" "}
            <span className="font-semibold text-[#3f3b35]">
              {candidateName}
            </span>{" "}
            applying for the position of{" "}
            <span className="font-semibold text-[#5f705d]">
              {role}
            </span>
            .
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <div className="text-xs text-[#817a70]">
              Assessment Date:{" "}
              <span className="font-semibold text-[#4d4942]">
                {date}
              </span>
            </div>

            <span className="hidden sm:block text-[#c5beb3]">
              •
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#817a70]">
                Recommendation:
              </span>

              <span
                className={`
                  px-3 py-1
                  rounded-full
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wide
                  border
                  ${badgeStyle}
                `}
              >
                {recommendation}
              </span>
            </div>
          </div>
        </div>

        {/* SCORE */}
        <div className="flex items-center justify-center flex-shrink-0">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#e3ded5"
                strokeWidth="7"
                fill="transparent"
              />

              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#687a65"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-[#25231f]">
                {safeScore}%
              </span>

              <span className="text-[9px] uppercase tracking-wider font-bold text-[#817a70] mt-0.5">
                Overall Score
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverallScoreCard;