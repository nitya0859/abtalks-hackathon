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

  // =========================================================
  // CLEAR ANSWER WHEN QUESTION / PHASE CHANGES
  // =========================================================

  useEffect(() => {
    setAnswer("");
  }, [currentQuestion?.id, isFollowUpPhase]);

  // =========================================================
  // SUBMIT
  // =========================================================

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

  // =========================================================
  // CMD / CTRL + ENTER
  // =========================================================

  const handleKeyDown = (e) => {
    if (
      (e.metaKey || e.ctrlKey) &&
      e.key === "Enter"
    ) {
      handleSubmit(e);
    }
  };

  const isDisabled =
    !answer.trim() || isThinking;

  const wordCount = answer
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="bg-[#faf8f4]">

      {/* =====================================================
          FOLLOW-UP QUESTION
      ===================================================== */}

      {isFollowUpPhase && followUpQuestion && (
        <div className="px-5 sm:px-6 py-4 bg-[#f1ede5] border-b border-[#e1dbd1]">

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.15em]
              font-bold
              text-[#81776a]
              mb-1.5
            "
          >
            Follow-up
          </p>

          <p className="text-sm text-[#4d4942] leading-relaxed">
            {followUpQuestion}
          </p>

        </div>
      )}


      {/* =====================================================
          FORM
      ===================================================== */}

      <form onSubmit={handleSubmit}>

        {/* ===================================================
            EDITOR HEADER
        =================================================== */}

        <div
          className="
            h-[55px]
            flex
            items-center
            justify-between
            px-5
            sm:px-6
            border-b
            border-[#e2ddd4]
          "
        >

          {/* Left */}

          <div className="flex items-center gap-2.5">

            <div
              className="
                w-7
                h-7
                rounded-full
                border
                border-[#d8d2c8]
                bg-[#f0ede7]
                flex
                items-center
                justify-center
                text-[#625d54]
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h10"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <span
              className="
                text-sm
                font-semibold
                text-[#38352f]
              "
            >
              {isFollowUpPhase
                ? "Follow-up Response"
                : "Your Response"}
            </span>

          </div>


          {/* Right */}

          <span
            className="
              hidden
              sm:block
              text-[10px]
              sm:text-[11px]
              text-[#8a8379]
              font-medium
            "
          >
            Markdown & pseudocode supported
          </span>

        </div>


        {/* ===================================================
            TEXT AREA
        =================================================== */}

        <textarea
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={isThinking}
          maxLength={2000}
          rows={8}
          placeholder={
            isThinking
              ? "Evoke is analyzing your response..."
              : isFollowUpPhase
              ? "Answer the follow-up question. Explain your reasoning clearly..."
              : "Type your response here... Explain your approach, reasoning, trade-offs, and technical decisions."
          }
          className="
            w-full
            min-h-[220px]
            sm:min-h-[270px]
            resize-none
            bg-transparent
            px-5
            sm:px-6
            py-5
            text-sm
            text-[#35322d]
            placeholder-[#aaa49a]
            leading-relaxed
            outline-none
            disabled:opacity-60
          "
        />


        {/* ===================================================
            FOOTER
        =================================================== */}

        <div
          className="
            min-h-[58px]
            flex
            items-center
            justify-between
            gap-4
            px-5
            sm:px-6
            py-3
            border-t
            border-[#e2ddd4]
          "
        >

          {/* Character count */}

          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#8b847a]">

            <span className="font-mono">
              {answer.length} / 2000
            </span>

            <span className="text-[#c0bab0]">
              •
            </span>

            <span>
              {wordCount} words
            </span>

          </div>


          {/* Submit side */}

          <div className="flex items-center gap-3">

            {/* Shortcut */}

            <span
              className="
                hidden
                sm:block
                text-[10px]
                text-[#a09a91]
              "
            >
              ⌘ Enter
            </span>


            {/* Submit */}

            <button
              type="submit"
              disabled={isDisabled}
              className={`
                flex
                items-center
                gap-2
                px-4
                sm:px-5
                py-2.5
                rounded-full
                text-xs
                sm:text-sm
                font-semibold
                transition-all
                duration-200

                ${
                  isDisabled
                    ? `
                      bg-[#e0ddd7]
                      text-[#aaa69f]
                      cursor-not-allowed
                    `
                    : `
                      bg-[#d5d2cb]
                      hover:bg-[#c7c3bb]
                      text-[#514d46]
                      active:scale-[0.98]
                    `
                }
              `}
            >

              {isThinking ? (
                <>
                  <span
                    className="
                      w-3.5
                      h-3.5
                      border-2
                      border-[#8e897f]
                      border-t-transparent
                      rounded-full
                      animate-spin
                    "
                  />

                  <span>
                    Evaluating...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {isFollowUpPhase
                      ? "Submit Follow-up"
                      : "Submit Answer"}
                  </span>

                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 12h14"
                      strokeLinecap="round"
                    />

                    <path
                      d="m13 6 6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default AnswerBox;