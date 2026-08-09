const LearningRoadmap = ({ roadmap = [] }) => {
  if (!Array.isArray(roadmap) || roadmap.length === 0) {
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
        <div className="flex items-start gap-3">
          <div
            className="
              w-9 h-9
              rounded-xl
              bg-[#ebe6dc]
              border border-[#d9d2c6]
              flex items-center justify-center
              flex-shrink-0
            "
          >
            <span className="text-[#625d54]">✦</span>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#302d28]">
              Learning Roadmap
            </h2>

            <p className="text-xs text-[#817a70] mt-1 leading-relaxed">
              No specific improvement areas were identified
              from the evaluated responses.
            </p>
          </div>
        </div>
      </section>
    );
  }

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
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div
            className="
              w-9 h-9
              rounded-xl
              bg-[#ebe6dc]
              border border-[#d9d2c6]
              flex items-center justify-center
              flex-shrink-0
            "
          >
            <span className="text-[#625d54]">✦</span>
          </div>

          <div>
            <h2 className="text-sm sm:text-base font-semibold text-[#302d28]">
              Learning Roadmap
            </h2>

            <p className="text-xs text-[#817a70] mt-0.5">
              What to focus on next
            </p>
          </div>
        </div>

        <p className="text-xs text-[#746e64] leading-relaxed mt-4 max-w-3xl">
          These recommendations are based on the areas Evoke
          identified during your interview. They are intended
          to give you a practical next step rather than simply
          repeating the topics you selected.
        </p>
      </div>

      {/* ROADMAP */}
      <div className="space-y-3">
        {roadmap.map((item, index) => {
          const action = item?.action || "Practice";
          const topic = item?.topic || "Interview Skills";
          const description =
            item?.desc || "Continue practicing this area.";

          return (
            <div
              key={`${topic}-${index}`}
              className="
                group
                p-4 sm:p-5
                rounded-2xl
                bg-[#f6f3ed]
                border border-[#ddd7cd]
                hover:border-[#c9c2b6]
                hover:bg-[#f3f0e9]
                transition-all duration-200
              "
            >
              <div className="flex items-start gap-4">
                {/* NUMBER */}
                <div
                  className="
                    w-9 h-9
                    rounded-xl
                    bg-[#e8e3d9]
                    border border-[#d5cec2]
                    flex items-center justify-center
                    flex-shrink-0
                  "
                >
                  <span className="text-[11px] font-bold text-[#716b61]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0">
                  <div
                    className="
                      flex flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-2
                    "
                  >
                    <h3 className="text-sm font-semibold text-[#302d28]">
                      {topic}
                    </h3>

                    <span
                      className="
                        self-start
                        sm:self-auto
                        px-2.5 py-1
                        rounded-full
                        bg-[#ebe6dc]
                        border border-[#d7d0c4]
                        text-[10px]
                        font-semibold
                        text-[#625d54]
                      "
                    >
                      {action}
                    </span>
                  </div>

                  <p className="text-xs text-[#817a70] leading-relaxed mt-2">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="mt-5 pt-4 border-t border-[#e0dad0] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#687a65]" />

        <p className="text-[11px] text-[#817a70]">
          Start with the first recommendation and work through
          the roadmap progressively.
        </p>
      </div>
    </section>
  );
};

export default LearningRoadmap;