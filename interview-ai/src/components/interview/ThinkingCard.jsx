const ThinkingCard = ({ isThinking }) => {
  // Don't show anything once analysis is finished.
  // The follow-up question is already displayed inside AnswerBox.
  if (!isThinking) {
    return null;
  }

  return (
    <div className="p-4 rounded-2xl bg-purple-950/30 backdrop-blur-xl border border-purple-500/20 shadow-xl flex items-center gap-3">

      {/* Loading icon */}
      <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
        <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>

      {/* Analysis text */}
      <div>
        <p className="text-xs font-semibold text-purple-200">
          AI is analyzing your response...
        </p>

        <p className="text-[11px] text-purple-300/60 mt-0.5">
          Evaluating technical accuracy, reasoning, and communication
        </p>
      </div>
    </div>
  );
};

export default ThinkingCard;