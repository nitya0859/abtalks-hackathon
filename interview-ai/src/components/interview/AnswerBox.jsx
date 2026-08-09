import { useEffect, useState } from "react";
import { useInterview } from "../../context/InterviewContext";

const AnswerBox = () => {
  const {
    currentQuestion,
    isThinking,
    isFollowUpPhase,
    followUpQuestion,
    submitAnswer,
    submitFollowUp,
  } = useInterview();

  const [answer, setAnswer] = useState("");

  // Clear textarea whenever the question changes
  // or when switching between answer/follow-up.
  useEffect(() => {
    setAnswer("");
  }, [currentQuestion?.id, isFollowUpPhase]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!answer.trim() || isThinking) {
      return;
    }

    if (isFollowUpPhase) {
      submitFollowUp(answer);
    } else {
      submitAnswer(answer);
    }

    setAnswer("");
  };

  const isDisabled =
    !answer.trim() || isThinking;

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">

      {/* ================================
          HEADER
      ================================= */}

      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/70">

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

          <span className="text-sm font-semibold text-slate-200">
            {isFollowUpPhase
              ? "Follow-up Response"
              : "Candidate Response Workspace"}
          </span>

        </div>

        <span className="text-[11px] text-slate-500">
          Markdown enabled
        </span>

      </div>

      {/* ================================
          FOLLOW-UP QUESTION
      ================================= */}

      {isFollowUpPhase && followUpQuestion && (
        <div className="px-5 py-4 bg-purple-500/5 border-b border-purple-500/10">

          <p className="text-[11px] uppercase tracking-wider font-semibold text-purple-400 mb-2">
            Follow-up Probe
          </p>

          <p className="text-sm leading-relaxed text-slate-300">
            {followUpQuestion}
          </p>

        </div>
      )}

      {/* ================================
          TEXTAREA
      ================================= */}

      <form onSubmit={handleSubmit}>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isThinking}
          maxLength={2000}
          rows={8}
          placeholder={
            isThinking
              ? "Analyzing your response..."
              : isFollowUpPhase
              ? "Answer the follow-up question. Explain your reasoning clearly..."
              : "Type your response here... Explain your approach, reasoning, trade-offs, and technical decisions."
          }
          className="w-full min-h-[220px] resize-none bg-transparent px-5 py-5 text-sm text-slate-200 placeholder-slate-600 outline-none disabled:opacity-60"
        />

        {/* ================================
            FOOTER
        ================================= */}

        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-800/70">

          <span className="text-[11px] font-mono text-slate-500">
            {answer.length} / 2000 characters
          </span>

          <button
            type="submit"
            disabled={isDisabled}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isDisabled
                ? "bg-purple-600/30 text-purple-300/50 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 active:scale-[0.98] cursor-pointer"
            }`}
          >

            <span>
              {isThinking
                ? "Analyzing..."
                : isFollowUpPhase
                ? "Submit Follow-up"
                : "Submit Answer"}
            </span>

            {!isThinking && (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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

      </form>

    </div>
  );
};

export default AnswerBox;