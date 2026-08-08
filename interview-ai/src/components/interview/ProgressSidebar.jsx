import CandidateCard from "./CandidateCard";
import TopicTimeline from "./TopicTimeline";
import TimerCard from "./TimerCard";

const ProgressSidebar = ({
  candidateName = "Alex Rivera",
  role = "AI Engineer",
  difficulty = "Medium",
  currentQuestion = 3,
  totalQuestions = 8,
}) => {
  const progressPercent = Math.round((currentQuestion / totalQuestions) * 100);
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <aside className="w-full lg:w-[22%] flex-shrink-0 flex flex-col gap-4">
      {/* Candidate Profile Card */}
      <CandidateCard name={candidateName} role={role} difficulty={difficulty} />

      {/* Progress Ring Card */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Interview Progress
        </h4>

        <div className="flex items-center gap-4">
          {/* SVG Progress Ring */}
          <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
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
              <span className="text-sm font-bold text-white leading-none">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-white block">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              37.5% Completed
            </p>
          </div>
        </div>
      </div>

      {/* Topic Timeline */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">
        <TopicTimeline />
      </div>

      {/* Timer Card */}
      <TimerCard initialSeconds={1200} />
    </aside>
  );
};

export default ProgressSidebar;
