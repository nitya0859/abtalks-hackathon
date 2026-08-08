import Logo from "../components/common/Logo";
import OverallScoreCard from "../components/report/OverallScoreCard";
import PerformanceChart from "../components/report/PerformanceChart";
import TopicCard from "../components/report/TopicCard";
import StrengthCard from "../components/report/StrengthCard";
import WeaknessCard from "../components/report/WeaknessCard";
import TimelineCard from "../components/report/TimelineCard";
import LearningRoadmap from "../components/report/LearningRoadmap";
import SummaryCard from "../components/report/SummaryCard";
import ActionButtons from "../components/report/ActionButtons";

const Report = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      {/* Top Bar Header */}
      <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-50">
        <Logo />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300">
            Assessment Report Ready
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1400px] w-full mx-auto space-y-6 sm:space-y-8 my-2 sm:my-4">
        {/* Top Section: Overall Score & Hiring Recommendation */}
        <OverallScoreCard
          score={87}
          recommendation="Strong Hire"
          candidateName="Alex Rivera"
          role="AI Engineer"
          date="August 8, 2026"
        />

        {/* Section 1: Executive Summary */}
        <SummaryCard
          summaryText="You demonstrated strong architectural reasoning and system design skills. Your understanding of retrieval systems and vector databases is solid, but deployment strategies require additional practice."
        />

        {/* Section 2: Performance Summary Chart */}
        <PerformanceChart />

        {/* Section 3 & 4: Strengths & Areas to Improve Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StrengthCard />
          <WeaknessCard />
        </div>

        {/* Section 5: Topic Breakdown */}
        <TopicCard />

        {/* Section 6: AI Interview Timeline */}
        <TimelineCard />

        {/* Section 7: Learning Roadmap */}
        <LearningRoadmap />

        {/* Bottom Actions */}
        <ActionButtons />
      </main>
    </div>
  );
};

export default Report;
