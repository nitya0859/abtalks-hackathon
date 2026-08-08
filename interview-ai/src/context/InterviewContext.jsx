import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

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
  {
    id: 1,
    type: "success",
    text: "Candidate initialized interview session",
  },
];

export const InterviewProvider = ({ children }) => {
  // ============================================================
  // CANDIDATE PROFILE
  // ============================================================

  const [candidateName, setCandidateName] = useState("");

  const [educationLevel, setEducationLevel] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  // ============================================================
  // INTERVIEW CONFIGURATION
  // ============================================================

  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");

  const [difficulty, setDifficulty] = useState("Medium");

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);

  const [interviewType, setInterviewType] =
    useState("recommended");

  const [customInterviewPrompt, setCustomInterviewPrompt] =
    useState("");

  // ============================================================
  // INTERVIEW STATE
  // ============================================================

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [answers, setAnswers] = useState({});
  const [followUpAnswers, setFollowUpAnswers] = useState({});

  const [isFollowUpPhase, setIsFollowUpPhase] =
    useState(false);

  const [isThinking, setIsThinking] = useState(false);

  // ============================================================
  // EVALUATION STATE
  // ============================================================

  const [liveScores, setLiveScores] =
    useState(DEFAULT_SCORES);

  const [scoreHistory, setScoreHistory] =
    useState([DEFAULT_SCORES]);

  const [interviewNotes, setInterviewNotes] =
    useState(INITIAL_NOTES);

  // ============================================================
  // TIMER STATE
  // ============================================================

  const [timeRemaining, setTimeRemaining] =
    useState(1200);

  const [isTimerRunning, setIsTimerRunning] =
    useState(false);

  const [interviewCompleted, setInterviewCompleted] =
    useState(false);

  // ============================================================
  // QUESTION DATA
  // ============================================================

  const totalQuestions = interviewQuestions.length;

  const currentQuestion =
    interviewQuestions[currentQuestionIndex] ||
    interviewQuestions[0];

  // ============================================================
  // TIMER
  // ============================================================

  useEffect(() => {
    if (
      !isTimerRunning ||
      timeRemaining <= 0 ||
      interviewCompleted
    ) {
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setIsTimerRunning(false);
          setInterviewCompleted(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isTimerRunning,
    timeRemaining,
    interviewCompleted,
  ]);

  // ============================================================
  // SETUP INTERVIEW
  // ============================================================

  const setupInterview = ({
    candidateName: name,
    educationLevel: selectedEducationLevel,
    degree: selectedDegree,
    fieldOfStudy: selectedFieldOfStudy,
    institution: selectedInstitution,
    graduationYear: selectedGraduationYear,

    role: selectedRole,
    customRole: selectedCustomRole,

    difficulty: selectedDifficulty,

    selectedTopics: topics,
    customSkills: skills,

    interviewType: selectedInterviewType,
    customInterviewPrompt: selectedCustomPrompt,
  }) => {
    // ----------------------------------------------------------
    // Candidate profile
    // ----------------------------------------------------------

    setCandidateName(name?.trim() || "");

    setEducationLevel(
      selectedEducationLevel || ""
    );

    setDegree(selectedDegree || "");

    setFieldOfStudy(
      selectedFieldOfStudy || ""
    );

    setInstitution(
      selectedInstitution?.trim() || ""
    );

    setGraduationYear(
      selectedGraduationYear || ""
    );

    // ----------------------------------------------------------
    // Interview configuration
    // ----------------------------------------------------------

    setRole(selectedRole || "");

    setCustomRole(
      selectedCustomRole?.trim() || ""
    );

    setDifficulty(
      selectedDifficulty || "Medium"
    );

    setSelectedTopics(
      Array.isArray(topics) ? topics : []
    );

    setCustomSkills(
      Array.isArray(skills) ? skills : []
    );

    setInterviewType(
      selectedInterviewType || "recommended"
    );

    setCustomInterviewPrompt(
      selectedCustomPrompt?.trim() || ""
    );

    // ----------------------------------------------------------
    // Reset interview state
    // ----------------------------------------------------------

    setCurrentQuestionIndex(0);

    setAnswers({});
    setFollowUpAnswers({});

    setIsFollowUpPhase(false);
    setIsThinking(false);

    // ----------------------------------------------------------
    // Reset evaluation
    // ----------------------------------------------------------

    setLiveScores(DEFAULT_SCORES);
    setScoreHistory([DEFAULT_SCORES]);

    setInterviewNotes([
      {
        id: Date.now(),
        type: "success",
        text: `Session configured for ${
          name?.trim() || "candidate"
        } (${selectedRole || "technical role"})`,
      },
    ]);

    // ----------------------------------------------------------
    // Reset timer
    // ----------------------------------------------------------

    setTimeRemaining(1200);
    setIsTimerRunning(true);

    setInterviewCompleted(false);
  };

  // ============================================================
  // MOCK EVALUATION
  //
  // This is intentionally local for now.
  // Gemini / backend evaluation can replace this later.
  // ============================================================

  const generateMockScoresAndNotes = (
    questionObj,
    answerLength
  ) => {
    const delta = (value) =>
      Math.min(
        98,
        Math.max(
          70,
          value + Math.floor(Math.random() * 9) - 4
        )
      );

    const newScores = {
      accuracy: delta(liveScores.accuracy),

      reasoning: delta(liveScores.reasoning),

      communication: Math.min(
        96,
        Math.max(
          72,
          liveScores.communication +
            (answerLength > 150 ? 3 : -2)
        )
      ),

      problemSolving: delta(
        liveScores.problemSolving
      ),

      confidence: delta(
        liveScores.confidence
      ),
    };

    const notesPool = [
      {
        type: "success",
        text: `Strong explanation of ${
          questionObj.expectedConcepts?.[0] ||
          "core concepts"
        }`,
      },

      {
        type: "success",
        text: `Good reasoning for ${questionObj.topic}`,
      },

      {
        type: "warning",
        text: `Could explain ${
          questionObj.expectedConcepts?.[1] ||
          "trade-offs"
        } in more detail`,
      },

      {
        type: "warning",
        text: `Consider discussing edge cases in ${questionObj.topic}`,
      },
    ];

    const randomNote =
      notesPool[
        Math.floor(
          Math.random() * notesPool.length
        )
      ];

    return {
      newScores,
      newNoteObj: {
        id: Date.now() + Math.random(),
        type: randomNote.type,
        text: randomNote.text,
      },
    };
  };

  // ============================================================
  // SUBMIT MAIN ANSWER
  //
  // Flow:
  //
  // Answer
  //   ↓
  // Thinking
  //   ↓
  // Follow-up
  // ============================================================

  const submitAnswer = (answerText) => {
    if (
      !answerText?.trim() ||
      isThinking
    ) {
      return;
    }

    // Start AI analysis
    setIsThinking(true);

    // Explicitly hide follow-up during analysis
    setIsFollowUpPhase(false);

    setTimeout(() => {
      // --------------------------------------------------------
      // Save answer
      // --------------------------------------------------------

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answerText,
      }));

      // --------------------------------------------------------
      // Generate mock evaluation
      // --------------------------------------------------------

      const {
        newScores,
        newNoteObj,
      } = generateMockScoresAndNotes(
        currentQuestion,
        answerText.length
      );

      setLiveScores(newScores);

      setScoreHistory((prev) => [
        ...prev,
        newScores,
      ]);

      setInterviewNotes((prev) => [
        newNoteObj,
        ...prev,
      ]);

      // --------------------------------------------------------
      // Analysis finished
      // --------------------------------------------------------

      setIsThinking(false);

      // Now show follow-up
      setIsFollowUpPhase(true);
    }, 1200);
  };

  // ============================================================
  // SUBMIT FOLLOW-UP
  //
  // Flow:
  //
  // Follow-up
  //   ↓
  // Save answer
  //   ↓
  // Next question
  //
  // Final question:
  //   ↓
  // Finish interview
  // ============================================================

  const submitFollowUp = (
    followUpText = ""
  ) => {
    if (followUpText.trim()) {
      setFollowUpAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: followUpText,
      }));
    }

    // Hide follow-up
    setIsFollowUpPhase(false);

    // Final question
    if (
      currentQuestionIndex >=
      totalQuestions - 1
    ) {
      finishInterview();
      return;
    }

    // Move to next question
    setCurrentQuestionIndex(
      (prev) => prev + 1
    );
  };

  // ============================================================
  // JUMP TO QUESTION
  // ============================================================

  const jumpToQuestion = (index) => {
    if (
      index >= 0 &&
      index < totalQuestions
    ) {
      setCurrentQuestionIndex(index);

      setIsFollowUpPhase(false);
      setIsThinking(false);
    }
  };

  // ============================================================
  // FINISH INTERVIEW
  // ============================================================

  const finishInterview = () => {
    setIsTimerRunning(false);

    setIsThinking(false);
    setIsFollowUpPhase(false);

    setInterviewCompleted(true);
  };

  // ============================================================
  // RESET INTERVIEW
  // ============================================================

  const resetInterview = () => {
    // Candidate profile
    setCandidateName("");

    setEducationLevel("");
    setDegree("");
    setFieldOfStudy("");
    setInstitution("");
    setGraduationYear("");

    // Interview configuration
    setRole("");
    setCustomRole("");

    setDifficulty("Medium");

    setSelectedTopics([]);
    setCustomSkills([]);

    setInterviewType("recommended");
    setCustomInterviewPrompt("");

    // Interview state
    setCurrentQuestionIndex(0);

    setAnswers({});
    setFollowUpAnswers({});

    setIsFollowUpPhase(false);
    setIsThinking(false);

    // Evaluation
    setLiveScores(DEFAULT_SCORES);
    setScoreHistory([DEFAULT_SCORES]);

    setInterviewNotes(INITIAL_NOTES);

    // Timer
    setTimeRemaining(1200);

    setIsTimerRunning(false);

    setInterviewCompleted(false);
  };

  // ============================================================
  // REPORT
  // ============================================================

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

  // ============================================================
  // CONTEXT PROVIDER
  // ============================================================

  return (
    <InterviewContext.Provider
      value={{
        // ------------------------------------------------------
        // Candidate profile
        // ------------------------------------------------------

        candidateName,

        educationLevel,
        degree,
        fieldOfStudy,
        institution,
        graduationYear,

        // ------------------------------------------------------
        // Interview configuration
        // ------------------------------------------------------

        role,
        customRole,

        difficulty,

        selectedTopics,
        customSkills,

        interviewType,
        customInterviewPrompt,

        // ------------------------------------------------------
        // Interview state
        // ------------------------------------------------------

        currentQuestionIndex,
        totalQuestions,
        currentQuestion,

        answers,
        followUpAnswers,

        isFollowUpPhase,
        isThinking,

        // ------------------------------------------------------
        // Evaluation
        // ------------------------------------------------------

        liveScores,
        scoreHistory,
        interviewNotes,

        // ------------------------------------------------------
        // Timer
        // ------------------------------------------------------

        timeRemaining,
        isTimerRunning,

        // ------------------------------------------------------
        // Completion
        // ------------------------------------------------------

        interviewCompleted,

        // ------------------------------------------------------
        // Actions
        // ------------------------------------------------------

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

// ============================================================
// CUSTOM HOOK
// ============================================================

export const useInterview = () => {
  const context = useContext(
    InterviewContext
  );

  if (!context) {
    throw new Error(
      "useInterview must be used within InterviewProvider"
    );
  }

  return context;
};

export default InterviewContext;