import { useEffect, useState } from "react";
import { useInterview } from "../../context/InterviewContext";

const AnswerBox = () => {
  const {
    currentQuestionIndex,
    isThinking,
    isFollowUpPhase,
    currentQuestion,
    submitAnswer,
    submitFollowUp,
  } = useInterview();

  const [text, setText] = useState("");

  // Clear the input whenever the question or interview phase changes
  useEffect(() => {
    setText("");
  }, [currentQuestionIndex, isFollowUpPhase]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || isThinking) return;

    if (isFollowUpPhase) {
      submitFollowUp(text);
    } else {
      submitAnswer(text);
    }

    setText("");
  };

  const placeholder = isFollowUpPhase
    ? "Answer the follow-up question. Explain your reasoning clearly..."
    : "Type your response here... Include architecture details, trade-offs, and design patterns.";

  const buttonText = isThinking
    ? "Analyzing..."
    : isFollowUpPhase
      ? "Submit Follow-up"
      : "Submit Answer";

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h10"
              />
            </svg>

            <span className="text-xs font-semibold text-slate-300">
              {isFollowUpPhase
                ? "Follow-up Response"
                : "Candidate Response Workspace"}
            </span>
          </div>

          <span className="text-[10px] text-slate-500">
            Markdown enabled
          </span>
        </div>

        {/* Follow-up indicator */}
        {isFollowUpPhase && (
          <div className="px-4 py-2 bg-purple-500/5 border-b border-purple-500/10">
            <span className="text-[11px] font-semibold text-purple-300">
              Follow-up Probe
            </span>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              {currentQuestion.followUp}
            </p>
          </div>
        )}

        {/* Textarea */}
        <textarea
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isThinking}
          placeholder={placeholder}
          className="w-full p-4 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-xs sm:text-sm font-mono leading-relaxed resize-y disabled:opacity-50"
        />

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/60 border-t border-slate-800/60">

          <span className="text-[11px] text-slate-500 font-mono">
            {text.length} / 2000 characters
          </span>

          <button
            type="submit"
            disabled={!text.trim() || isThinking}
            className="py-2.5 px-6 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 active:scale-[0.98] transition cursor-pointer flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isThinking && (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            <span>{buttonText}</span>

            {!isThinking && (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AnswerBox;