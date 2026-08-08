import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import ProgressSidebar from "../components/interview/ProgressSidebar";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerInput from "../components/interview/AnswerInput";
import EvaluationPanel from "../components/interview/EvaluationPanel";

const questionsData = {
  1: {
    id: 1,
    title: "Prompt Engineering & Structured Outputs",
    topic: "Prompt Engineering",
    difficulty: "Easy",
    questionText:
      "How do you enforce deterministic JSON output schemas from LLMs in production applications to prevent downstream parsing failures?",
    codeContext: `// Target Schema
const OutputSchema = z.object({
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  tags: z.array(z.string()),
});`,
    followUpText: "Consider JSON mode vs Function Calling / Structured Outputs API guarantees.",
  },
  2: {
    id: 2,
    title: "RAG Architecture & Vector Indexing",
    topic: "RAG",
    difficulty: "Medium",
    questionText:
      "Compare Dense Vector Retrieval vs Sparse BM25 Search. When is hybrid search necessary, and how do you calculate the hybrid weighting parameter (alpha)?",
    codeContext: `// Hybrid Query Formulation
const hybridScore = (alpha * denseScore) + ((1 - alpha) * bm25Score);`,
    followUpText: "How do you handle score normalization between Cosine similarity and BM25 scores?",
  },
  3: {
    id: 3,
    title: "Hybrid Search & Chunking Strategy",
    topic: "RAG & Vector Search",
    difficulty: "Medium",
    questionText:
      "How would you optimize chunk size and overlap strategy when indexing 100k+ technical documentation pages for a retrieval-augmented generation (RAG) system using hybrid search (Dense + Sparse BM25)?",
    codeContext: `// Example Schema Context
const vectorStoreConfig = {
  embeddingModel: "text-embedding-3-large",
  dimensions: 1536,
  distanceMetric: "cosine",
  hybridAlpha: 0.7, // Dense vs Sparse weight
  chunkSizeTokens: 512,
  chunkOverlapTokens: 64,
};`,
    followUpText: "How do you prevent latency spikes during high-throughput re-ranking with Cross-Encoders?",
  },
  4: {
    id: 4,
    title: "Model Context Protocol (MCP) Tools",
    topic: "MCP",
    difficulty: "Hard",
    questionText:
      "Explain how Model Context Protocol (MCP) standardizes context retrieval and tool execution between AI hosts and local development environments.",
    codeContext: `// MCP Server Handler Definition
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{ name: "run_query", description: "Execute SQL Query" }]
}));`,
    followUpText: "What security measures do you put in place when exposing local file system tools to LLM agents?",
  },
};

const Interview = () => {
  const navigate = useNavigate();

  const [currentQuestionId, setCurrentQuestionId] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const activeQuestion = questionsData[currentQuestionId] || questionsData[3];

  const handleSubmitAnswer = (answerText) => {
    setIsSubmitting(true);
    setIsThinking(true);

    // Simulate AI thinking and advancing to next step after brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsThinking(false);
      if (currentQuestionId < 4) {
        setCurrentQuestionId((prev) => prev + 1);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header Bar */}
      <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">
              Live Session: AI Engineer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/report")}
            className="py-1.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition shadow-md shadow-indigo-600/20 cursor-pointer flex items-center gap-1.5"
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

      {/* Main Content Area - 3 Column Layout */}
      <main className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row gap-6 overflow-x-hidden">
        {/* Left Column - Progress & Candidate Info */}
        <ProgressSidebar
          candidateName="Alex Rivera"
          role="AI Engineer"
          difficulty="Medium"
          currentQuestionId={currentQuestionId}
          onSelectQuestion={(id) => questionsData[id] && setCurrentQuestionId(id)}
          onFinishEarly={() => navigate("/report")}
        />

        {/* Center Column - AI Question & Workspace Answer Input */}
        <section className="flex-1 flex flex-col gap-6 min-w-0">
          <QuestionCard
            questionNumber={activeQuestion.id}
            topic={activeQuestion.topic}
            difficulty={activeQuestion.difficulty}
            questionTitle={activeQuestion.title}
            questionText={activeQuestion.questionText}
            codeContext={activeQuestion.codeContext}
            isThinking={isThinking}
            followUpText={activeQuestion.followUpText}
          />

          <AnswerInput
            onSubmitAnswer={handleSubmitAnswer}
            isSubmitting={isSubmitting}
          />
        </section>

        {/* Right Column - Live AI Evaluation Panel */}
        <EvaluationPanel overallScore={87} />
      </main>
    </div>
  );
};

export default Interview;
