import { useInterview } from "../../context/InterviewContext";

const TimerCard = () => {
  const {
    timeRemaining,
    isTimerRunning,
  } = useInterview();

  const mins = Math.floor(
    timeRemaining / 60
  );

  const secs = timeRemaining % 60;

  const formatted = `${mins
    .toString()
    .padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;

  const isLowTime =
    timeRemaining <= 120;

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
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
                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
              />
            </svg>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Time Remaining
            </p>

            <p className="text-[10px] text-slate-600 mt-0.5">
              {isTimerRunning
                ? "Interview in progress"
                : "Timer paused"}
            </p>
          </div>
        </div>

        <div
          className={`font-mono text-xl font-bold tracking-wider bg-slate-950/80 px-3 py-1.5 rounded-xl border shadow-inner ${
            isLowTime
              ? "text-rose-400 border-rose-500/30"
              : "text-purple-300 border-slate-800"
          }`}
        >
          {formatted}
        </div>
      </div>
    </div>
  );
};

export default TimerCard;