const StrengthCard = ({ strengths = [] }) => {
  const visibleStrengths = Array.isArray(strengths)
    ? strengths.filter(Boolean)
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
          Key Strengths
        </h2>

        <p className="text-xs text-[#817a70] mt-1">
          Verified competencies from your interview responses
        </p>
      </div>

      {visibleStrengths.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#f5f2ec] border border-[#e2dcd2]">
          <p className="text-xs text-[#817a70]">
            No specific strengths were identified from the
            answered questions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleStrengths.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="
                p-4
                rounded-xl
                bg-[#e8efe5]
                border border-[#cbd8c6]
                text-xs
                font-medium
                text-[#52634f]
                flex
                items-start
                gap-2.5
              "
            >
              <span
                className="
                  w-5 h-5
                  rounded-full
                  bg-[#d6e2d2]
                  text-[#5f705d]
                  flex items-center justify-center
                  font-bold
                  text-[10px]
                  flex-shrink-0
                "
              >
                ✓
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

export default StrengthCard;