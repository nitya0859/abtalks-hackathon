import { useState, useEffect } from "react";

const Timer = ({ initialSeconds = 1200 }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300">
      <svg
        className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow"
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
      <span>{formatTime(secondsLeft)}</span>
      <span className="text-[10px] text-slate-500 uppercase tracking-wide">
        rem
      </span>
    </div>
  );
};

export default Timer;
