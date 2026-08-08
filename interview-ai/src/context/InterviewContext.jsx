import { createContext, useContext, useState, useEffect } from "react";
import { interviewQuestions } from "../data/questions";
import { generateInterviewReport } from "../utils/reportGenerator";

const InterviewContext = createContext(null);

const DEFAULT_SCORES = {
  accuracy: 85,
  reasoning: 88,
  communication: 80,
  problemSolving: 84,
  confidence: 86,
};

const INITIAL_NOTES = [
  { id: 1, type: "success", text: "Candidate initialized interview session" },
];

export const InterviewProvider = ({ children }) => {
  const [candidateName, setCandidateName] = useState("Alex Rivera");
  const [role, setRole] = useState("AI Engineer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [selectedTopics, setSelectedTopics] = useState([
    "Prompt Engineering",
    "RAG",
    "System Design",
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [followUpAnswers, setFollowUpAnswers] = useState({});
  const [isFollowUpPhase, setIsFollowUpPhase] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const [liveScores, setLiveScores] = useState(DEFAULT_SCORES);
  const [scoreHistory, setScoreHistory] = useState([DEFAULT_SCORES]);
  const [interviewNotes, setInterviewNotes] = useState(INITIAL_NOTES);

  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);

  const totalQuestions = interviewQuestions.length;
  const currentQuestion = interviewQuestions[currentQuestionIndex] || interviewQuestions[0];

  // Global Countdown Timer
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeRemaining > 0 && !interviewCompleted) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            finishInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemaining, interviewCompleted]);

  // Setup interview from Setup form
  const setupInterview = ({ candidateName: name, role: r, difficulty: diff, selectedTopics: topics }) => {
    setCandidateName(name.trim() || "Alex Rivera");
    setRole(r || "AI Engineer");
    setDifficulty(diff || "Medium");
    setSelectedTopics(topics.length > 0 ? topics : ["Prompt Engineering", "RAG"]);

    setCurrentQuestionIndex(0);
    setAnswers({});
    setFollowUpAnswers({});
    setIsFollowUpPhase(false);
    setIsThinking(false);
    setLiveScores(DEFAULT_SCORES);
    setScoreHistory([DEFAULT_SCORES]);
    setInterviewNotes([
      { id: Date.now(), type: "success", text: `Session configured for ${name} (${r})` },
    ]);
    setTimeRemaining(1200);
    setIsTimerRunning(true);
    setInterviewCompleted(false);
  };

  // Generate dynamic realistic mock score & note updates upon answer submission
  const generateMockScoresAndNotes = (questionObj, answerLength) => {
    const delta = (val) => Math.min(98, Math.max(70, val + Math.floor(Math.random() * 9) - 4));

    const newScores = {
      accuracy: delta(liveScores.accuracy),
      reasoning: delta(liveScores.reasoning),
      communication: Math.min(96, Math.max(72, liveScores.communication + (answerLength > 150 ? 3 : -2))),
      problemSolving: delta(liveScores.problemSolving),
      confidence: delta(liveScores.confidence),
    };

    const notesPool = [
      { type: "success", text: `Strong explanation of ${questionObj.expectedConcepts[0] || "core concepts"}` },
      { type: "success", text: `Good architectural reasoning for ${questionObj.topic}` },
      { type: "warning", text: `Missed latency trade-offs during ${questionObj.expectedConcepts[1] || "scaling"}` },
      { type: "warning", text: `Could detail error fallbacks & edge cases in ${questionObj.topic}` },
      { type: "success", text: `Clear pseudocode structure and API schema definitions` },
    ];

    const randomNote = notesPool[Math.floor(Math.random() * notesPool.length)];
    const newNoteObj = { id: Date.now() + Math.random(), type: randomNote.type, text: randomNote.text };

    return { newScores, newNoteObj };
  };

  // Candidate submits main answer
  const submitAnswer = (answerText) => {
    setIsThinking(true);

    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerText }));

      const { newScores, newNoteObj } = generateMockScoresAndNotes(currentQuestion, answerText.length);
      setLiveScores(newScores);
      setScoreHistory((prev) => [...prev, newScores]);
      setInterviewNotes((prev) => [newNoteObj, ...prev]);

      setIsThinking(false);
      setIsFollowUpPhase(true); // Enter follow-up probe phase
    }, 800);
  };

  // Candidate submits follow-up response or skips to next question
  const submitFollowUp = (followUpText = "") => {
    if (followUpText.trim()) {
      setFollowUpAnswers((prev) => ({ ...prev, [currentQuestion.id]: followUpText }));
    }

    setIsFollowUpPhase(false);

    // Advance to next question or finish interview if final question reached
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishInterview();
    }
  };

  // Jump to specific question (e.g. from sidebar step tracker)
  const jumpToQuestion = (index) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
      setIsFollowUpPhase(false);
    }
  };

  // Finish interview and stop timer
  const finishInterview = () => {
    setIsTimerRunning(false);
    setInterviewCompleted(true);
  };

  // Reset interview session
  const resetInterview = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFollowUpAnswers({});
    setIsFollowUpPhase(false);
    setIsThinking(false);
    setLiveScores(DEFAULT_SCORES);
    setScoreHistory([DEFAULT_SCORES]);
    setInterviewNotes(INITIAL_NOTES);
    setTimeRemaining(1200);
    setIsTimerRunning(false);
    setInterviewCompleted(false);
  };

  // Get generated final report
  const getReport = () => {
    return generateInterviewReport({
      candidateName,
      role,
      difficulty,
      liveScores,
      scoreHistory,
      answers,
      followUpAnswers,
      questions: interviewQuestions,
      notes: interviewNotes,
    });
  };

  return (
    <InterviewContext.Provider
      value={{
        candidateName,
        role,
        difficulty,
        selectedTopics,
        currentQuestionIndex,
        totalQuestions,
        currentQuestion,
        answers,
        followUpAnswers,
        isFollowUpPhase,
        isThinking,
        liveScores,
        scoreHistory,
        interviewNotes,
        timeRemaining,
        isTimerRunning,
        interviewCompleted,
        setupInterview,
        submitAnswer,
        submitFollowUp,
        jumpToQuestion,
        finishInterview,
        resetInterview,
        getReport,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};

export default InterviewContext;
