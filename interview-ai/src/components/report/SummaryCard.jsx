const SummaryCard = ({
  summaryText = "You demonstrated strong architectural reasoning and system design skills. Your understanding of retrieval systems and vector databases is solid, but deployment strategies require additional practice.",
}) => {
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
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#625d54] text-sm">▣</span>

        <h2
          className="
            text-[11px]
            uppercase
            tracking-[0.15em]
            font-bold
            text-[#625d54]
          "
        >
          Executive Interview Summary
        </h2>
      </div>

      <p
        className="
          text-sm sm:text-base
          text-[#3f3b35]
          leading-relaxed
          font-medium
        "
      >
        "{summaryText}"
      </p>
    </section>
  );
};

export default SummaryCard;