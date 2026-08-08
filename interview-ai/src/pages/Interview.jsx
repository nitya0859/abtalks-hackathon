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
    role,
    difficulty,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isThinking,
    isFollowUpPhase,
    interviewCompleted,
    submitAnswer,
    submitFollowUp,
    finishInterview,
  } = useInterview();

  useEffect(() => {
    if (interviewCompleted) {
      navigate("/report");
    }
  }, [interviewCompleted, navigate]);

  return (
    <div className="min-h-screen bg-[#060B1F] text-white flex flex-col">

      {/* Top Navigation */}
      <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <Logo />

        <div className="text-sm text-slate-400">
          Live Session: {role} Interview
        </div>

        <button
          onClick={finishInterview}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
        >
          Finish Interview
        </button>
      </header>

      {/* Main Interview Layout */}
      <main className="flex-1 p-4 sm:p-6 max-w-[1700px] w-full mx-auto flex flex-col lg:flex-row gap-6 overflow-x-hidden">

        {/* Left Sidebar */}
        <ProgressSidebar
          candidateName={candidateName}
          role={role}
          difficulty={difficulty}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />

        {/* Center Interview Area */}
        <section className="flex-1 flex flex-col gap-5 min-w-0">

          <QuestionCard
            questionNumber={currentQuestionIndex + 1}
            topic={currentQuestion.topic}
            difficulty={currentQuestion.difficulty}
            questionText={currentQuestion.question}
          />

          <AnswerBox
            onSubmitAnswer={submitAnswer}
            onSubmitFollowUp={submitFollowUp}
            isThinking={isThinking}
            isFollowUpPhase={isFollowUpPhase}
            followUpText={currentQuestion.followUp}
          />

          <ThinkingCard
            isThinking={isThinking}
            isFollowUpPhase={isFollowUpPhase}
            followUpText={currentQuestion.followUp}
          />

        </section>

        {/* Right Evaluation Panel */}
        <EvaluationPanel />

      </main>
    </div>
  );
};

export default Interview;