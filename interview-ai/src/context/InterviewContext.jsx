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
  accuracy: 0,
  reasoning: 0,
  communication: 0,
  problemSolving: 0,
  confidence: 0,
};

const INITIAL_NOTES = [];

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
  // EVALUATION
  // ============================================================

  const [liveScores, setLiveScores] =
    useState(DEFAULT_SCORES);

  const [scoreHistory, setScoreHistory] =
    useState([]);

  const [interviewNotes, setInterviewNotes] =
    useState(INITIAL_NOTES);

  // ============================================================
  // TIMER
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
  // DERIVED DATA
  // ============================================================

  const effectiveRole =
    role === "Other"
      ? customRole
      : role;

  const allSelectedSkills = [
    ...selectedTopics,
    ...customSkills,
  ];

  const hasEvaluation =
    Object.keys(answers).length > 0;

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
    const resolvedRole =
      selectedRole === "Other"
        ? selectedCustomRole?.trim()
        : selectedRole;

    // Candidate
    setCandidateName(name?.trim() || "");
    setEducationLevel(selectedEducationLevel || "");
    setDegree(selectedDegree || "");
    setFieldOfStudy(selectedFieldOfStudy || "");
    setInstitution(selectedInstitution?.trim() || "");
    setGraduationYear(selectedGraduationYear || "");

    // Configuration
    setRole(selectedRole || "");
    setCustomRole(selectedCustomRole?.trim() || "");
    setDifficulty(selectedDifficulty || "Medium");

    setSelectedTopics(
      Array.isArray(topics)
        ? topics
        : []
    );

    setCustomSkills(
      Array.isArray(skills)
        ? skills
        : []
    );

    setInterviewType(
      selectedInterviewType || "recommended"
    );

    setCustomInterviewPrompt(
      selectedCustomPrompt?.trim() || ""
    );

    // Interview
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFollowUpAnswers({});
    setIsFollowUpPhase(false);
    setIsThinking(false);

    // Evaluation starts empty
    setLiveScores(DEFAULT_SCORES);
    setScoreHistory([]);
    setInterviewNotes([]);

    // Timer
    setTimeRemaining(1200);
    setIsTimerRunning(true);
    setInterviewCompleted(false);

    console.log(
      `Interview started for ${name} - ${resolvedRole}`
    );
  };

  // ============================================================
  // EVALUATION
  // ============================================================

  const generateMockScoresAndNotes = (
    questionObj,
    answerText
  ) => {
    const answer =
      answerText?.toLowerCase().trim() || "";

    const concepts =
      questionObj.expectedConcepts || [];

    const matchedConcepts =
      concepts.filter((concept) =>
        answer.includes(
          concept.toLowerCase()
        )
      );

    const conceptCoverage =
      concepts.length > 0
        ? matchedConcepts.length /
          concepts.length
        : 0;

    const answerLength =
      answer.length;

    // ----------------------------------------------------------
    // Communication
    // ----------------------------------------------------------

    let communication;

    if (answerLength < 30) {
      communication = 25;
    } else if (answerLength < 80) {
      communication = 45;
    } else if (answerLength < 150) {
      communication = 65;
    } else if (answerLength < 300) {
      communication = 80;
    } else {
      communication = 90;
    }

    // ----------------------------------------------------------
    // Accuracy
    // ----------------------------------------------------------

    const accuracy = Math.round(
      25 + conceptCoverage * 70
    );

    // ----------------------------------------------------------
    // Reasoning
    // ----------------------------------------------------------

    const hasReasoning =
      answer.includes("because") ||
      answer.includes("trade-off") ||
      answer.includes("tradeoff") ||
      answer.includes("therefore") ||
      answer.includes("however") ||
      answer.includes("since");

    const reasoning = Math.round(
      30 +
        conceptCoverage * 50 +
        (hasReasoning ? 15 : 0)
    );

    // ----------------------------------------------------------
    // Problem Solving
    // ----------------------------------------------------------

    const hasProblemSolving =
      answer.includes("alternative") ||
      answer.includes("edge case") ||
      answer.includes("scale") ||
      answer.includes("performance") ||
      answer.includes("complexity") ||
      answer.includes("latency");

    const problemSolving = Math.round(
      30 +
        conceptCoverage * 50 +
        (hasProblemSolving ? 15 : 0)
    );

    // ----------------------------------------------------------
    // Confidence
    // ----------------------------------------------------------

    const confidence = Math.round(
      35 +
        conceptCoverage * 40 +
        (answerLength >= 120 ? 15 : 0) +
        (hasReasoning ? 10 : 0)
    );

    const newScores = {
      accuracy: Math.min(100, accuracy),
      reasoning: Math.min(100, reasoning),
      communication: Math.min(100, communication),
      problemSolving: Math.min(100, problemSolving),
      confidence: Math.min(100, confidence),
    };

    // ----------------------------------------------------------
    // Dynamic note
    // ----------------------------------------------------------

    let note;

    if (
      conceptCoverage >= 0.7
    ) {
      note = {
        type: "success",
        text: `Strong coverage of ${
          matchedConcepts
            .slice(0, 2)
            .join(" and ")
        }.`,
      };
    } else if (
      conceptCoverage >= 0.35
    ) {
      const missingConcepts =
        concepts.filter(
          (concept) =>
            !matchedConcepts.includes(
              concept
            )
        );

      note = {
        type: "warning",
        text: `Partial coverage. Consider explaining ${
          missingConcepts
            .slice(0, 2)
            .join(" and ") ||
          "the remaining technical trade-offs"
        }.`,
      };
    } else {
      note = {
        type: "warning",
        text: `The response did not clearly address the core concepts expected for ${questionObj.topic}.`,
      };
    }

    return {
      newScores,

      newNoteObj: {
        id:
          Date.now() +
          Math.random(),

        type: note.type,
        text: note.text,
      },
    };
  };

  // ============================================================
  // SUBMIT MAIN ANSWER
  // ============================================================

  const submitAnswer = (answerText) => {
    if (
      !answerText?.trim() ||
      isThinking
    ) {
      return;
    }

    setIsThinking(true);
    setIsFollowUpPhase(false);

    setTimeout(() => {
      // Save answer
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]:
          answerText.trim(),
      }));

      // Evaluate answer
      const {
        newScores,
        newNoteObj,
      } =
        generateMockScoresAndNotes(
          currentQuestion,
          answerText
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

      setIsThinking(false);
      setIsFollowUpPhase(true);
    }, 1200);
  };

  // ============================================================
  // SUBMIT FOLLOW-UP
  // ============================================================

  const submitFollowUp = (
    followUpText = ""
  ) => {
    if (followUpText.trim()) {
      setFollowUpAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]:
          followUpText.trim(),
      }));
    }

    setIsFollowUpPhase(false);

    if (
      currentQuestionIndex >=
      totalQuestions - 1
    ) {
      finishInterview();
      return;
    }

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
  // FINISH
  // ============================================================

  const finishInterview = () => {
    setIsTimerRunning(false);
    setIsThinking(false);
    setIsFollowUpPhase(false);
    setInterviewCompleted(true);
  };

  // ============================================================
  // RESET
  // ============================================================

  const resetInterview = () => {
    setCandidateName("");
    setEducationLevel("");
    setDegree("");
    setFieldOfStudy("");
    setInstitution("");
    setGraduationYear("");

    setRole("");
    setCustomRole("");
    setDifficulty("Medium");

    setSelectedTopics([]);
    setCustomSkills([]);

    setInterviewType("recommended");
    setCustomInterviewPrompt("");

    setCurrentQuestionIndex(0);

    setAnswers({});
    setFollowUpAnswers({});

    setIsFollowUpPhase(false);
    setIsThinking(false);

    setLiveScores(DEFAULT_SCORES);
    setScoreHistory([]);
    setInterviewNotes([]);

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
      role: effectiveRole,
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
  // PROVIDER
  // ============================================================

  return (
    <InterviewContext.Provider
      value={{
        // Candidate
        candidateName,
        educationLevel,
        degree,
        fieldOfStudy,
        institution,
        graduationYear,

        // Configuration
        role,
        customRole,
        effectiveRole,
        difficulty,
        selectedTopics,
        customSkills,
        allSelectedSkills,
        interviewType,
        customInterviewPrompt,

        // Interview
        currentQuestionIndex,
        totalQuestions,
        currentQuestion,
        answers,
        followUpAnswers,
        isFollowUpPhase,
        isThinking,

        // Evaluation
        liveScores,
        scoreHistory,
        interviewNotes,
        hasEvaluation,

        // Timer
        timeRemaining,
        isTimerRunning,

        // Completion
        interviewCompleted,

        // Actions
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
  const context =
    useContext(InterviewContext);

  if (!context) {
    throw new Error(
      "useInterview must be used within InterviewProvider"
    );
  }

  return context;
};

export default InterviewContext;