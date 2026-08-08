import { useState, useEffect } from "react";

const TimerCard = ({ initialSeconds = 1200 }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formatted = `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <svg
            className="w-4 h-4 animate-spin-slow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
            Time Remaining
          </span>
          <span className="text-[11px] text-slate-500">20 min allocation</span>
        </div>
      </div>

      <div className="font-mono text-xl font-bold text-white tracking-wider bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner text-purple-300">
        {formatted}
      </div>
    </div>
  );
};

export default TimerCard;
