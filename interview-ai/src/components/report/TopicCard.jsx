const TopicCard = ({ topics = [] }) => {
  const topicData = Array.isArray(topics)
    ? topics
    : [];

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
      <div className="mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-[#302d28]">
          Topic Breakdown
        </h2>

        <p className="text-xs text-[#817a70] mt-1">
          Detailed breakdown based only on answered questions
        </p>
      </div>

      {topicData.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#f5f2ec] border border-[#e2dcd2]">
          <p className="text-xs text-[#817a70]">
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
                  bg-[#f6f3ed]
                  border border-[#ded8ce]
                  rounded-2xl
                  p-5
                  space-y-3
                  flex flex-col
                  justify-between
                  hover:border-[#c9c2b6]
                  transition-all duration-200
                "
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-sm text-[#302d28] truncate">
                      {item.topic || "Technical"}
                    </h3>

                    <span
                      className={`
                        flex-shrink-0
                        text-[9px]
                        font-bold
                        uppercase
                        px-2 py-1
                        rounded-full
                        border
                        ${
                          isStrong
                            ? "bg-[#e8efe5] text-[#52634f] border-[#cbd8c6]"
                            : "bg-[#f0e8dc] text-[#806f58] border-[#dfd0bb]"
                        }
                      `}
                    >
                      {item.status || "Developing"}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-[#25231f]">
                      {item.score || 0}%
                    </span>

                    <span className="text-xs text-[#817a70]">
                      Score
                    </span>
                  </div>

                  <div className="space-y-3 border-t border-[#e1dbd1] pt-3 text-xs">
                    <div className="flex items-start gap-2 text-[#52634f]">
                      <span className="font-bold">✓</span>

                      <span className="leading-relaxed">
                        <strong className="text-[#4d4942]">
                          Strength:
                        </strong>{" "}
                        {item.strength ||
                          "No specific strength recorded."}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-[#806f58]">
                      <span className="font-bold">⚠</span>

                      <span className="leading-relaxed">
                        <strong className="text-[#4d4942]">
                          Weakness:
                        </strong>{" "}
                        {item.weakness ||
                          "No specific improvement area recorded."}
                      </span>
                    </div>
                  </div>
                </div>

                {item.feedback && (
                  <div className="pt-3 border-t border-[#e1dbd1]">
                    <p className="text-[11px] text-[#817a70] leading-relaxed">
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