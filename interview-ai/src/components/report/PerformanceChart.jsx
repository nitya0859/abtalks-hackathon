const PerformanceChart = ({
  metrics = {},
}) => {
  const performanceMetrics = [
    {
      label: "Technical Accuracy",
      score: Number(metrics.accuracy) || 0,
      color: "from-purple-500 to-indigo-500",
      text: "text-purple-400",
    },
    {
      label: "Reasoning",
      score: Number(metrics.reasoning) || 0,
      color: "from-indigo-500 to-violet-500",
      text: "text-indigo-400",
    },
    {
      label: "Communication",
      score: Number(metrics.communication) || 0,
      color: "from-violet-500 to-purple-400",
      text: "text-violet-400",
    },
    {
      label: "Problem Solving",
      score: Number(metrics.problemSolving) || 0,
      color: "from-cyan-500 to-blue-500",
      text: "text-cyan-400",
    },
    {
      label: "Confidence",
      score: Number(metrics.confidence) || 0,
      color: "from-amber-500 to-orange-500",
      text: "text-amber-400",
    },
  ];

  const hasMetrics = performanceMetrics.some(
    (item) => item.score > 0
  );

  return (
    <section
      className="
        bg-slate-900/60
        backdrop-blur-xl
        border
        border-slate-800/80
        rounded-2xl
        p-5
        sm:p-6
        shadow-xl
      "
    >
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white">
            Performance Summary
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Evaluated across core engineering competency dimensions
          </p>
        </div>

        <span
          className="
            hidden
            sm:inline-flex
            px-2.5
            py-1
            rounded-lg
            bg-purple-500/10
            border
            border-purple-500/20
            text-[10px]
            font-semibold
            text-purple-300
          "
        >
          5 Metric Dimensions
        </span>
      </div>

      {/* ====================================================
          NO EVALUATION STATE
      ==================================================== */}

      {!hasMetrics ? (
        <div
          className="
            p-4
            rounded-xl
            bg-slate-950/50
            border
            border-slate-800
          "
        >
          <p className="text-xs text-slate-500">
            No evaluated responses are available yet.
          </p>
        </div>
      ) : (
        /* ==================================================
           METRICS
        ================================================== */

        <div className="space-y-4">
          {performanceMetrics.map((item) => (
            <div
              key={item.label}
              className="space-y-1.5"
            >
              {/* LABEL + SCORE */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-xs
                  sm:text-sm
                "
              >
                <span className="font-medium text-slate-200">
                  {item.label}
                </span>

                <span
                  className={`
                    font-mono
                    font-bold
                    ${item.text}
                  `}
                >
                  {item.score}%
                </span>
              </div>

              {/* PROGRESS BAR */}

              <div
                className="
                  w-full
                  bg-slate-950/80
                  h-2.5
                  rounded-full
                  overflow-hidden
                  border
                  border-slate-800
                "
              >
                <div
                  className={`
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    ${item.color}
                    transition-all
                    duration-1000
                    ease-out
                    shadow-[0_0_12px_rgba(168,85,247,0.3)]
                  `}
                  style={{
                    width: `${item.score}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ====================================================
          SCORE INTERPRETATION
      ==================================================== */}

      {hasMetrics && (
        <div
          className="
            mt-6
            pt-4
            border-t
            border-slate-800/70
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <p className="text-[11px] text-slate-500">
            Scores are calculated only from evaluated responses.
          </p>

          <span className="text-[10px] text-slate-600">
            Unanswered questions excluded
          </span>
        </div>
      )}
    </section>
  );
};

export default PerformanceChart;