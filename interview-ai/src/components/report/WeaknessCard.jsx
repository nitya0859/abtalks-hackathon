const WeaknessCard = ({ weaknesses = [] }) => {
  const visibleWeaknesses = Array.isArray(weaknesses)
    ? weaknesses.filter(Boolean)
    : [];

  return (
    <section
      className="
        rounded-[22px]
        border border-[#ddd7cd]
        bg-[#faf8f4]
        p-5 sm:p-6
        shadow-[0_8px_30px_rgba(72,65,54,0.05)]
      "
    >
      <div className="mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-[#302d28]">
          Areas to Improve
        </h2>

        <p className="text-xs text-[#817a70] mt-1">
          Targeted growth areas identified from your responses
        </p>
      </div>

      {visibleWeaknesses.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#f5f2ec] border border-[#e2dcd2]">
          <p className="text-xs text-[#817a70]">
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
                p-4
                rounded-xl
                bg-[#f0e8dc]
                border border-[#dfd0bb]
                text-xs
                font-medium
                text-[#806f58]
                flex items-start
                gap-2.5
              "
            >
              <span
                className="
                  w-5 h-5
                  rounded-full
                  bg-[#e6d8c5]
                  text-[#806f58]
                  flex items-center justify-center
                  font-bold
                  text-[10px]
                  flex-shrink-0
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