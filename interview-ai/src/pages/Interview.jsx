import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import ProgressSidebar from "../components/interview/ProgressSidebar";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import ThinkingCard from "../components/interview/ThinkingCard";
import EvaluationPanel from "../components/interview/EvaluationPanel";

const Interview = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-800">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">
              Live Session: AI Engineer Interview
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/report")}
            className="py-1.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 transition shadow-md shadow-purple-900/30 cursor-pointer flex items-center gap-1.5"
          >
            <span>Finish Interview</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <main className="flex-1 p-4 sm:p-6 max-w-[1700px] w-full mx-auto flex flex-col lg:flex-row gap-6 overflow-x-hidden">
        {/* Left Sidebar (~20%) */}
        <ProgressSidebar
          candidateName="Alex Rivera"
          role="AI Engineer"
          difficulty="Medium"
          currentQuestion={3}
          totalQuestions={8}
        />

        {/* Center Main Interview Area (~55%) */}
        <section className="flex-1 flex flex-col gap-5 min-w-0">
          <QuestionCard
            questionNumber={3}
            topic="Vector Database"
            difficulty="Medium"
            questionText="How would you optimize indexing, partition strategy, and query latency when scaling a vector database (e.g. Qdrant / Pinecone / pgvector) to over 500 million high-dimensional dense embeddings with real-time updates?"
          />

          <AnswerBox />

          <ThinkingCard />
        </section>

        {/* Right Sidebar (~25%) */}
        <EvaluationPanel />
      </main>
    </div>
  );
};

export default Interview;
