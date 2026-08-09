import CandidateCard from "./CandidateCard";
import TopicTimeline from "./TopicTimeline";
import TimerCard from "./TimerCard";

const ProgressSidebar = () => {
  return (
    <div className="flex flex-col gap-4">

      {/* ==================================================
          CANDIDATE
      ================================================== */}

      <CandidateCard />

      {/* ==================================================
          TOPICS
      ================================================== */}

      <div
        className="
          rounded-2xl
          bg-[#faf8f3]
          border
          border-[#25231f]/10
          p-5
          shadow-[0_18px_45px_rgba(66,58,47,0.07)]
        "
      >
        <TopicTimeline />
      </div>

      {/* ==================================================
          TIMER
      ================================================== */}

      <TimerCard />

    </div>
  );
};

export default ProgressSidebar;