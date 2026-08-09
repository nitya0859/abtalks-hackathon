import { useInterview } from "../../context/InterviewContext";

const EvaluationPanel = () => {
  const {
    liveScores,
    scoreHistory,
    interviewNotes = [],
    isThinking,
  } = useInterview();

  const hasEvaluation =
    Array.isArray(scoreHistory) &&
    scoreHistory.length > 0;

  const latestEvaluation = hasEvaluation
    ? scoreHistory[scoreHistory.length - 1]
    : null;

  const evaluationMetrics = [
    {
      label: "Technical Accuracy",
      score: Number(liveScores?.accuracy) || 0,
    },
    {
      label: "Reasoning",
      score: Number(liveScores?.reasoning) || 0,
    },
    {
      label: "Communication",
      score: Number(liveScores?.communication) || 0,
    },
    {
      label: "Problem Solving",
      score: Number(liveScores?.problemSolving) || 0,
    },
    {
      label: "Confidence",
      score: Number(liveScores?.confidence) || 0,
    },
  ];

  return (
    <div className="space-y-4">

      {/* =====================================================
          LIVE SCORE CARD
      ===================================================== */}

      <div
        className="
          bg-[#faf8f4]
          border
          border-[#ddd7cd]
          rounded-2xl
          p-4
          shadow-[0_8px_30px_rgba(72,65,54,0.05)]
        "
      >

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-sm font-semibold text-[#35312b]">
              Performance
            </h3>

            <p className="text-[11px] text-[#8a8379] mt-0.5">
              Real-time rubric scoring
            </p>

          </div>

          <span
            className={`
              flex
              items-center
              gap-1.5
              px-2
              py-1
              rounded-lg
              text-[9px]
              font-semibold

              ${
                isThinking
                  ? "bg-[#eee6d9] text-[#806f58]"
                  : hasEvaluation
                  ? "bg-[#e5eee2] text-[#5f705d]"
                  : "bg-[#eeeae4] text-[#898278]"
              }
            `}
          >

            <span
              className={`
                w-1.5
                h-1.5
                rounded-full

                ${
                  isThinking
                    ? "bg-[#a58d6d] animate-pulse"
                    : hasEvaluation
                    ? "bg-[#687a65]"
                    : "bg-[#a9a49b]"
                }
              `}
            />

            {isThinking
              ? "Analyzing"
              : hasEvaluation
              ? "Evaluated"
              : "Waiting"}

          </span>

        </div>


        {/* WAITING */}

        {!hasEvaluation && !isThinking && (
          <div
            className="
              p-3
              rounded-xl
              bg-[#f1eee8]
              border
              border-[#e3ddd3]
            "
          >
            <p className="text-[11px] text-[#827b71] leading-relaxed">
              Submit your first response to begin
              live AI evaluation.
            </p>
          </div>
        )}


        {/* THINKING */}

        {isThinking && (
          <div
            className="
              p-3
              rounded-xl
              bg-[#f0ebe2]
              border
              border-[#dfd4c5]
            "
          >

            <div className="flex items-center gap-2">

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#a58d6d]
                  animate-pulse
                "
              />

              <p className="text-[11px] text-[#806f58]">
                Evoke is analyzing your response...
              </p>

            </div>

          </div>
        )}


        {/* METRICS */}

        <div className="mt-5 space-y-4">

          {evaluationMetrics.map((item) => (

            <div key={item.label}>

              <div className="flex items-center justify-between mb-1.5">

                <span className="text-[11px] font-medium text-[#686158]">
                  {item.label}
                </span>

                <span className="text-[11px] font-bold text-[#37332d]">
                  {hasEvaluation
                    ? `${item.score}%`
                    : "—"}
                </span>

              </div>

              <div
                className="
                  w-full
                  h-1.5
                  rounded-full
                  bg-[#e8e4dc]
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#777f70]
                    transition-all
                    duration-700
                  "
                  style={{
                    width: hasEvaluation
                      ? `${item.score}%`
                      : "0%",
                  }}
                />

              </div>

            </div>

          ))}

        </div>


        {/* FEEDBACK */}

        {hasEvaluation &&
          latestEvaluation?.feedback && (
            <div
              className="
                mt-5
                pt-4
                border-t
                border-[#e2ddd4]
              "
            >

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  font-bold
                  text-[#777f70]
                  mb-2
                "
              >
                AI Feedback
              </p>

              <p className="text-[11px] text-[#716a61] leading-relaxed">
                {latestEvaluation.feedback}
              </p>

            </div>
          )}

      </div>


      {/* =====================================================
          INTERVIEW NOTES
      ===================================================== */}

      <div
        className="
          bg-[#faf8f4]
          border
          border-[#ddd7cd]
          rounded-2xl
          p-4
          shadow-[0_8px_30px_rgba(72,65,54,0.05)]
        "
      >

        <h3 className="text-sm font-semibold text-[#35312b]">
          Interview Notes
        </h3>

        <p className="text-[11px] text-[#8a8379] mt-0.5 mb-4">
          AI observations from your responses
        </p>


        {interviewNotes.length === 0 ? (

          <div
            className="
              p-3
              rounded-xl
              bg-[#f1eee8]
              border
              border-[#e3ddd3]
            "
          >

            <p className="text-[11px] text-[#827b71]">
              No observations yet. Your responses
              will be analyzed here.
            </p>

          </div>

        ) : (

          <div className="space-y-2">

            {interviewNotes
              .slice(0, 4)
              .map((note) => {

                const isSuccess =
                  note.type === "success";

                const isWarning =
                  note.type === "warning";

                return (
                  <div
                    key={note.id}
                    className={`
                      p-3
                      rounded-xl
                      border
                      text-[11px]

                      ${
                        isSuccess
                          ? "bg-[#e8eee5] border-[#d0ddcb] text-[#61715d]"
                          : isWarning
                          ? "bg-[#f1e9dd] border-[#e3d5c1] text-[#806c53]"
                          : "bg-[#f0ede7] border-[#dfdad1] text-[#706a61]"
                      }
                    `}
                  >

                    <div className="flex items-start gap-2">

                      <span className="font-bold flex-shrink-0">
                        {isSuccess
                          ? "✓"
                          : isWarning
                          ? "⚠"
                          : "•"}
                      </span>

                      <span className="leading-relaxed">
                        {note.text}
                      </span>

                    </div>

                  </div>
                );
              })}

          </div>

        )}

      </div>

    </div>
  );
};

export default EvaluationPanel;