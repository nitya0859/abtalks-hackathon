const LearningRoadmap = ({
  roadmap = [],
}) => {
  // ============================================================
  // EMPTY STATE
  // ============================================================

  if (!Array.isArray(roadmap) || roadmap.length === 0) {
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
        <div className="flex items-start gap-3">
          <div
            className="
              w-9
              h-9
              rounded-xl
              bg-purple-500/10
              border
              border-purple-500/20
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <span className="text-purple-300 text-sm">
              ✦
            </span>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Learning Roadmap
            </h2>

            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              No specific improvement areas were identified
              from the evaluated responses.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // ROADMAP
  // ============================================================

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
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div
            className="
              w-9
              h-9
              rounded-xl
              bg-purple-500/10
              border
              border-purple-500/20
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <span className="text-purple-300 text-sm">
              ✦
            </span>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Learning Roadmap
            </h2>

            <p className="text-xs text-slate-500 mt-0.5">
              What to focus on next
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mt-4 max-w-2xl">
          These recommendations are based on the areas
          Evoke identified during your interview. They are
          intended to give you a practical next step rather
          than simply repeating the topics you selected.
        </p>
      </div>

      {/* ======================================================
          ROADMAP ITEMS
      ====================================================== */}

      <div className="space-y-3">
        {roadmap.map((item, index) => {
          const action =
            item?.action || "Practice";

          const topic =
            item?.topic ||
            "Interview Skills";

          const description =
            item?.desc ||
            "Continue practicing this area.";

          return (
            <div
              key={`${topic}-${index}`}
              className="
                relative
                p-4
                rounded-xl
                bg-slate-950/50
                border
                border-slate-800
                hover:border-slate-700
                transition
              "
            >
              <div className="flex items-start gap-4">
                {/* NUMBER */}

                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-slate-900
                    border
                    border-slate-800
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >
                  <span className="text-xs font-bold text-slate-400">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="flex-1 min-w-0">
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-2
                    "
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {topic}
                      </h3>
                    </div>

                    <span
                      className="
                        self-start
                        sm:self-auto
                        px-2.5
                        py-1
                        rounded-lg
                        text-[10px]
                        font-semibold
                        bg-purple-500/10
                        border
                        border-purple-500/20
                        text-purple-300
                        whitespace-nowrap
                      "
                    >
                      {action}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div
        className="
          mt-5
          pt-4
          border-t
          border-slate-800
          flex
          items-center
          gap-2
        "
      >
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />

        <p className="text-[11px] text-slate-500">
          Start with the first recommendation and work
          through the roadmap progressively.
        </p>
      </div>
    </section>
  );
};

export default LearningRoadmap;