const TimelineCard = ({ timeline = [] }) => {
  const timelineData = Array.isArray(timeline)
    ? timeline
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
          AI Interview Timeline
        </h2>

        <p className="text-xs text-[#817a70] mt-1">
          Question-by-question evaluation history
        </p>
      </div>

      {timelineData.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#f5f2ec] border border-[#e2dcd2]">
          <p className="text-xs text-[#817a70]">
            No evaluated questions are available yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {timelineData.map((item, index) => {
            const score = Number(item.score) || 0;

            const statusStyle =
              score >= 80
                ? "text-[#52634f] bg-[#e8efe5] border-[#cbd8c6]"
                : score >= 65
                ? "text-[#625d54] bg-[#ebe6dc] border-[#d8d1c5]"
                : "text-[#806f58] bg-[#f0e8dc] border-[#dfd0bb]";

            return (
              <div
                key={item.id || index}
                className="
                  p-4
                  rounded-xl
                  bg-[#f6f3ed]
                  border border-[#ded8ce]
                  space-y-3
                  flex flex-col
                  justify-between
                  min-h-[155px]
                "
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#817a70]">
                      Q{item.questionNumber || index + 1}
                    </span>

                    <span className="text-[10px] text-[#999188] truncate">
                      {item.topic || "Technical"}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-[#302d28] leading-snug line-clamp-3">
                    {item.question ||
                      item.title ||
                      `Question ${index + 1}`}
                  </h4>

                  <p className="text-xl font-bold text-[#25231f] mt-3">
                    {score}%
                  </p>
                </div>

                <span
                  className={`
                    inline-block
                    w-full
                    text-center
                    text-[9px]
                    font-bold
                    uppercase
                    px-2 py-1.5
                    rounded-lg
                    border
                    ${statusStyle}
                  `}
                >
                  {item.rating ||
                    item.status ||
                    "Developing"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TimelineCard;