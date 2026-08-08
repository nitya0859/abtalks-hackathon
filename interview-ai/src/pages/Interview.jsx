import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

import Logo from "../components/common/Logo";
import ProgressSidebar from "../components/interview/ProgressSidebar";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import ThinkingCard from "../components/interview/ThinkingCard";
import EvaluationPanel from "../components/interview/EvaluationPanel";

const Interview = () => {
  const navigate = useNavigate();

  const {
    candidateName,
    effectiveRole,
    difficulty,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isThinking,
    interviewCompleted,
    finishInterview,
  } = useInterview();

  // ============================================================
  // REDIRECT TO REPORT
  // ============================================================

  useEffect(() => {
    if (interviewCompleted) {
      navigate("/report");
    }
  }, [interviewCompleted, navigate]);

  // ============================================================
  // FINISH INTERVIEW
  // ============================================================

  const handleFinishInterview = () => {
    finishInterview();
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* =========================
          TOP NAVIGATION
      ========================== */}

      <header className="h-[72px] flex items-center justify-between px-4 sm:px-6 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl">
        {/* Logo */}

        <Logo />

        {/* Live Session Indicator */}

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />

          <span>
            Live Session:{" "}
            {effectiveRole || "Technical"} Interview
          </span>
        </div>

        {/* Finish Interview */}

        <button
          onClick={handleFinishInterview}
          className="py-2 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 transition shadow-md shadow-purple-900/30 cursor-pointer"
        >
          Finish Interview
        </button>
      </header>

      {/* =========================
          MAIN INTERVIEW LAYOUT
      ========================== */}

      <main className="flex-1 p-4 sm:p-6 max-w-[1700px] w-full mx-auto flex flex-col lg:flex-row gap-6">
        {/* =========================
            LEFT SIDEBAR
        ========================== */}

        <ProgressSidebar
          candidateName={candidateName}
          role={effectiveRole}
          difficulty={difficulty}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />

        {/* =========================
            CENTER INTERVIEW AREA
        ========================== */}

        <section className="flex-1 flex flex-col gap-5 min-w-0">
          {/* Current Question */}

          <QuestionCard
            questionNumber={
              currentQuestionIndex + 1
            }
            topic={currentQuestion.topic}
            difficulty={currentQuestion.difficulty}
            questionText={currentQuestion.question}
          />

          {/* Candidate Answer */}

          <AnswerBox />

          {/* AI Thinking State */}

          <ThinkingCard
            isThinking={isThinking}
          />
        </section>

        {/* =========================
            RIGHT EVALUATION PANEL
        ========================== */}

        <EvaluationPanel />
      </main>
    </div>
  );
};

export default Interview;