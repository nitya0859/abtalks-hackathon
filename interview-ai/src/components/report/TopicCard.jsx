const TopicCard = ({ topics = [] }) => {
  const topicData = Array.isArray(topics) ? topics : [];

  return (
    <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header */}

      <div className="mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          Topic Breakdown
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Detailed breakdown based only on answered questions
        </p>
      </div>

      {topicData.length === 0 ? (
        <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/70">
          <p className="text-xs text-slate-500">
            No answered questions are available for topic analysis.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicData.map((item, index) => {
            const isStrong =
              item.status === "Excellent" ||
              item.status === "Strong";

            return (
              <div
                key={item.id || `${item.topic}-${index}`}
                className="
                  bg-slate-950/60
                  border
                  border-slate-800/80
                  rounded-2xl
                  p-5
                  shadow-xl
                  space-y-3
                  flex
                  flex-col
                  justify-between
                  hover:border-purple-500/40
                  transition
                  duration-200
                "
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm text-white truncate">
                      {item.topic || "Technical"}
                    </h3>

                    <span
                      className={`
                        flex-shrink-0
                        text-[10px]
                        font-bold
                        uppercase
                        px-2
                        py-0.5
                        rounded-full
                        border
                        ${
                          isStrong
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                            : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                        }
                      `}
                    >
                      {item.status || "Developing"}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-extrabold text-white">
                      {item.score || 0}%
                    </span>

                    <span className="text-xs text-slate-400">
                      Score
                    </span>
                  </div>

                  <div className="space-y-2 border-t border-slate-800/60 pt-3 text-xs">
                    <div className="flex items-start gap-1.5 text-emerald-300">
                      <span className="font-bold">✓</span>

                      <span>
                        <strong className="text-slate-300">
                          Strength:
                        </strong>{" "}
                        {item.strength ||
                          "No specific strength recorded."}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5 text-amber-300">
                      <span className="font-bold">⚠</span>

                      <span>
                        <strong className="text-slate-300">
                          Weakness:
                        </strong>{" "}
                        {item.weakness ||
                          "No specific improvement area recorded."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Feedback */}

                {item.feedback && (
                  <div className="pt-3 border-t border-slate-800/60">
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {item.feedback}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TopicCard;