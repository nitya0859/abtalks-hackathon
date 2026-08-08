import CandidateCard from "./CandidateCard";
import TopicTimeline from "./TopicTimeline";
import TimerCard from "./TimerCard";
import { useInterview } from "../../context/InterviewContext";

const ProgressSidebar = () => {
  const {
    candidateName,
    effectiveRole,
    difficulty,
    currentQuestionIndex,
    timeRemaining,
    interviewCompleted,
  } = useInterview();

  const TOTAL_TIME = 1200;

  // Progress is based on time elapsed, not question count.
  const progressPercent = interviewCompleted
    ? 100
    : Math.min(
        100,
        Math.round(
          ((TOTAL_TIME - timeRemaining) / TOTAL_TIME) *
            100
        )
      );

  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (progressPercent / 100) * circumference;

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 flex flex-col gap-4">
      {/* Candidate Profile */}
      <CandidateCard
        name={candidateName}
        role={effectiveRole}
        difficulty={difficulty}
      />

      {/* Progress Ring */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Interview Progress
        </h4>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 80 80"
            >
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />

              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-purple-500 transition-all duration-500 ease-out"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs sm:text-sm font-bold text-white leading-none">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs sm:text-sm font-semibold text-white block">
              Question {currentQuestionIndex + 1}
            </span>

            <p className="text-xs text-slate-400 mt-0.5">
              {progressPercent}% time elapsed
            </p>
          </div>
        </div>
      </div>

      {/* Topic Timeline */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">
        <TopicTimeline />
      </div>

      {/* Timer */}
      <div>
        <TimerCard />
      </div>
    </aside>
  );
};

export default ProgressSidebar;