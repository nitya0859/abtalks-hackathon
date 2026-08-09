const WeaknessCard = ({ weaknesses = [] }) => {
  const visibleWeaknesses = Array.isArray(weaknesses)
    ? weaknesses.filter(Boolean)
    : [];

  return (
    <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header */}

      <div className="mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          Areas to Improve
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Targeted growth areas identified from your responses
        </p>
      </div>

      {visibleWeaknesses.length === 0 ? (
        <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/70">
          <p className="text-xs text-slate-500">
            No major improvement areas were identified.
            Keep practicing to maintain your performance.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleWeaknesses.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="
                p-3.5
                rounded-2xl
                bg-amber-500/10
                border
                border-amber-500/20
                text-xs
                font-medium
                text-amber-300
                flex
                items-start
                gap-2.5
                shadow-sm
              "
            >
              <span
                className="
                  w-4
                  h-4
                  rounded-full
                  bg-amber-500/20
                  text-amber-400
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-[10px]
                  flex-shrink-0
                  mt-0.5
                "
              >
                ⚠
              </span>

              <span className="leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WeaknessCard;