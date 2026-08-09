import { useInterview } from "../../context/InterviewContext";

const TimerCard = () => {
  const {
    timeRemaining,
    isThinking,
    interviewCompleted,
  } = useInterview();

  const TOTAL_TIME = 1200;

  const minutes = Math.floor(
    timeRemaining / 60
  );

  const seconds = timeRemaining % 60;

  const formattedTime = `${String(
    minutes
  ).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const elapsedPercent =
    ((TOTAL_TIME - timeRemaining) /
      TOTAL_TIME) *
    100;

  const remainingPercent =
    (timeRemaining / TOTAL_TIME) *
    100;

  const isCritical =
    timeRemaining <= 120;

  const isWarning =
    timeRemaining <= 300 &&
    timeRemaining > 120;

  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        shadow-[0_18px_45px_rgba(66,58,47,0.07)]
        ${
          isCritical
            ? "bg-[#a04e45]/5 border-[#a04e45]/20"
            : isWarning
            ? "bg-[#625d55]/5 border-[#625d55]/15"
            : "bg-[#faf8f3] border-[#25231f]/10"
        }
      `}
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex items-center justify-between">
        <div>
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.15em]
              font-bold
              text-[#aaa399]
            "
          >
            Session Time
          </p>

          <p
            className={`
              text-[10px]
              mt-1
              ${
                isCritical
                  ? "text-[#a04e45]"
                  : isWarning
                  ? "text-[#625d55]"
                  : "text-[#777269]"
              }
            `}
          >
            {interviewCompleted
              ? "Interview complete"
              : isThinking
              ? "AI is evaluating"
              : "Time remaining"}
          </p>
        </div>

        <div
          className={`
            w-8
            h-8
            rounded-lg
            flex
            items-center
            justify-center
            border
            ${
              isCritical
                ? "bg-[#a04e45]/10 border-[#a04e45]/15 text-[#a04e45]"
                : "bg-[#25231f]/5 border-[#25231f]/10 text-[#625d55]"
            }
          `}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <circle
              cx="12"
              cy="12"
              r="8"
            />

            <path
              strokeLinecap="round"
              d="M12 8v4l2.5 1.5"
            />
          </svg>
        </div>
      </div>

      {/* ==================================================
          TIMER
      ================================================== */}

      <div className="mt-5">
        <div
          className={`
            text-4xl
            sm:text-5xl
            font-semibold
            tracking-[-0.06em]
            font-mono
            ${
              isCritical
                ? "text-[#a04e45]"
                : isWarning
                ? "text-[#625d55]"
                : "text-[#25231f]"
            }
          `}
        >
          {formattedTime}
        </div>
      </div>

      {/* ==================================================
          PROGRESS
      ================================================== */}

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-[#aaa399] uppercase tracking-wider">
            Session progress
          </span>

          <span className="text-[9px] text-[#777269]">
            {Math.round(elapsedPercent)}%
          </span>
        </div>

        <div
          className="
            w-full
            h-1.5
            rounded-full
            bg-[#25231f]/8
            overflow-hidden
          "
        >
          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-1000
              ${
                isCritical
                  ? "bg-[#a04e45]"
                  : "bg-[#292621]"
              }
            `}
            style={{
              width: `${Math.max(
                0,
                Math.min(
                  100,
                  elapsedPercent
                )
              )}%`,
            }}
          />
        </div>
      </div>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[9px] text-[#aaa399]">
          20 min session
        </span>

        <span
          className={`
            text-[9px]
            font-semibold
            ${
              isCritical
                ? "text-[#a04e45]"
                : isWarning
                ? "text-[#625d55]"
                : "text-[#536451]"
            }
          `}
        >
          {remainingPercent > 0
            ? `${Math.round(
                remainingPercent
              )}% remaining`
            : "Time ended"}
        </span>
      </div>
    </div>
  );
};

export default TimerCard;