const TimelineCard = ({ timeline = [] }) => {
  const timelineData = Array.isArray(timeline)
    ? timeline
    : [];

  return (
    <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header */}

      <div className="mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          AI Interview Timeline
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Question-by-question evaluation history
        </p>
      </div>

      {timelineData.length === 0 ? (
        <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/70">
          <p className="text-xs text-slate-500">
            No evaluated questions are available yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {timelineData.map((item, index) => {
            const score = Number(item.score) || 0;

            const color =
              score >= 80
                ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                : score >= 65
                ? "text-purple-400 border-purple-500/20 bg-purple-500/10"
                : "text-amber-400 border-amber-500/20 bg-amber-500/10";

            return (
              <div
                key={item.id || index}
                className="
                  p-4
                  rounded-2xl
                  bg-slate-950/60
                  border
                  border-slate-800/80
                  space-y-2
                  flex
                  flex-col
                  justify-between
                  min-h-[145px]
                "
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-400 mb-1">
                    <span>
                      Q{item.questionNumber || index + 1}
                    </span>

                    <span className="text-slate-500 truncate">
                      {item.topic || "Technical"}
                    </span>
                  </div>

                  <h4 className="text-xs font-medium text-white leading-snug line-clamp-3">
                    {item.question ||
                      item.title ||
                      `Question ${index + 1}`}
                  </h4>

                  <p className="text-lg font-bold text-white mt-3">
                    {score}%
                  </p>
                </div>

                <span
                  className={`
                    inline-block
                    w-full
                    text-center
                    text-[10px]
                    font-bold
                    uppercase
                    px-2
                    py-1
                    rounded-lg
                    border
                    ${color}
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