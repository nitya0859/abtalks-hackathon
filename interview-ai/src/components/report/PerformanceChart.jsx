const PerformanceChart = ({ metrics = {} }) => {
  const performanceMetrics = [
    {
      label: "Technical Accuracy",
      score: Number(metrics.accuracy) || 0,
    },
    {
      label: "Reasoning",
      score: Number(metrics.reasoning) || 0,
    },
    {
      label: "Communication",
      score: Number(metrics.communication) || 0,
    },
    {
      label: "Problem Solving",
      score: Number(metrics.problemSolving) || 0,
    },
    {
      label: "Confidence",
      score: Number(metrics.confidence) || 0,
    },
  ];

  const hasMetrics = performanceMetrics.some(
    (item) => item.score > 0
  );

  return (
    <section
      className="
        rounded-[22px]
        border border-[#ddd7cd]
        bg-[#faf8f4]
        p-5 sm:p-6 lg:p-7
        shadow-[0_8px_30px_rgba(72,65,54,0.05)]
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-[#302d28]">
            Performance Summary
          </h2>

          <p className="text-xs text-[#817a70] mt-1">
            Evaluated across core engineering competency dimensions
          </p>
        </div>

        <span
          className="
            hidden sm:inline-flex
            px-2.5 py-1
            rounded-full
            bg-[#ebe6dc]
            border border-[#d8d1c5]
            text-[10px]
            font-semibold
            text-[#625d54]
          "
        >
          5 Metric Dimensions
        </span>
      </div>

      {/* EMPTY */}
      {!hasMetrics ? (
        <div
          className="
            p-4
            rounded-xl
            bg-[#f5f2ec]
            border border-[#e2dcd2]
          "
        >
          <p className="text-xs text-[#817a70]">
            No evaluated responses are available yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {performanceMetrics.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-[#4d4942]">
                  {item.label}
                </span>

                <span className="font-mono font-bold text-[#302d28]">
                  {item.score}%
                </span>
              </div>

              <div
                className="
                  w-full
                  h-2
                  rounded-full
                  bg-[#e7e2d9]
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#687a65]
                    transition-all
                    duration-1000
                    ease-out
                  "
                  style={{
                    width: `${item.score}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMetrics && (
        <div className="mt-6 pt-4 border-t border-[#e1dbd1] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] text-[#817a70]">
            Scores are calculated only from evaluated responses.
          </p>

          <span className="text-[10px] text-[#999188]">
            Unanswered questions excluded
          </span>
        </div>
      )}
    </section>
  );
};

export default PerformanceChart;