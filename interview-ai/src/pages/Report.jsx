import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

import Logo from "../components/common/Logo";
import OverallScoreCard from "../components/report/OverallScoreCard";
import PerformanceChart from "../components/report/PerformanceChart";
import StrengthCard from "../components/report/StrengthCard";
import WeaknessCard from "../components/report/WeaknessCard";
import TimelineCard from "../components/report/TimelineCard";
import LearningRoadmap from "../components/report/LearningRoadmap";
import SummaryCard from "../components/report/SummaryCard";
import ActionButtons from "../components/report/ActionButtons";

const Report = () => {
  const navigate = useNavigate();

  const {
    interviewCompleted,
    getReport,
  } = useInterview();

  // ============================================================
  // GENERATE REPORT DATA
  // ============================================================

  const report = getReport();

  // ============================================================
  // SAFETY
  // ============================================================

  useEffect(() => {
    if (!interviewCompleted) {
      navigate("/setup", {
        replace: true,
      });
    }
  }, [
    interviewCompleted,
    navigate,
  ]);

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          </div>

          <p className="text-sm text-slate-400">
            Generating your interview report...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col">

      {/* ======================================================
          TOP BAR
      ====================================================== */}

      <header
        className="
          h-[72px]
          flex
          items-center
          justify-between
          px-4
          sm:px-6
          border-b
          border-slate-800/70
          bg-slate-950/90
          backdrop-blur-xl
          flex-shrink-0
        "
      >
        <Logo />

        <div className="flex items-center gap-2">

          <div
            className="
              hidden
              sm:flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-lg
              bg-emerald-500/10
              border
              border-emerald-500/20
              text-[10px]
              font-semibold
              text-emerald-300
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

            Assessment Report Ready
          </div>

        </div>
      </header>


      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

      <main
        className="
          flex-1
          p-4
          sm:p-6
          md:p-8
          max-w-[1400px]
          w-full
          mx-auto
          space-y-6
          sm:space-y-8
          my-2
          sm:my-4
        "
      >

        {/* ====================================================
            COMPLETION NOTICE — EARLY
        ==================================================== */}

        {report.completion?.finishedEarly && (
          <div
            className="
              p-4
              rounded-2xl
              bg-purple-500/10
              border
              border-purple-500/20
            "
          >
            <div className="flex items-start gap-3">

              <div
                className="
                  w-8
                  h-8
                  rounded-lg
                  bg-purple-500/10
                  border
                  border-purple-500/20
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <span className="text-purple-300">
                  ✓
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-purple-200">
                  Interview completed early
                </p>

                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Your report is based on{" "}
                  <span className="text-slate-200 font-medium">
                    {report.completion.evaluatedQuestions}
                  </span>{" "}
                  evaluated responses. Unanswered
                  questions were not included in your
                  performance score.
                </p>
              </div>

            </div>
          </div>
        )}


        {/* ====================================================
            COMPLETION NOTICE — TIME LIMIT
        ==================================================== */}

        {report.completion?.reachedTimeLimit && (
          <div
            className="
              p-4
              rounded-2xl
              bg-amber-500/10
              border
              border-amber-500/20
            "
          >
            <div className="flex items-start gap-3">

              <div
                className="
                  w-8
                  h-8
                  rounded-lg
                  bg-amber-500/10
                  border
                  border-amber-500/20
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <span className="text-amber-300">
                  !
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-200">
                  Time limit reached
                </p>

                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  The interview ended when the time
                  limit was reached. Your score is based
                  only on the{" "}
                  <span className="text-slate-200 font-medium">
                    {report.completion.evaluatedQuestions}
                  </span>{" "}
                  responses that were evaluated.
                </p>
              </div>

            </div>
          </div>
        )}


        {/* ====================================================
            OVERALL SCORE
        ==================================================== */}

        <OverallScoreCard
          score={
            report.overallScore
          }

          recommendation={
            report.recommendation
          }

          candidateName={
            report.candidateName
          }

          role={
            report.role
          }

          date={
            report.date
          }
        />


        {/* ====================================================
            EXECUTIVE SUMMARY
        ==================================================== */}

        <SummaryCard
          summaryText={
            report.executiveSummary
          }
        />


        {/* ====================================================
            PERFORMANCE SUMMARY
        ==================================================== */}

        <PerformanceChart
          metrics={
            report.metrics
          }
        />


        {/* ====================================================
            STRENGTHS & WEAKNESSES
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >

          <StrengthCard
            strengths={
              report.strengths
            }
          />

          <WeaknessCard
            weaknesses={
              report.weaknesses
            }
          />

        </div>


        {/* ====================================================
            AI INTERVIEW TIMELINE
        ==================================================== */}

        <TimelineCard
          timeline={
            report.timeline
          }
        />


        {/* ====================================================
            LEARNING ROADMAP
        ==================================================== */}

        <LearningRoadmap
          roadmap={
            report.roadmap
          }
        />


        {/* ====================================================
            BOTTOM ACTIONS
        ==================================================== */}

        <ActionButtons />

      </main>
    </div>
  );
};

export default Report;