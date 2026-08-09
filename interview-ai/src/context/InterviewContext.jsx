/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { generateInterviewReport } from "../utils/reportGenerator";

const InterviewContext = createContext(null);

// ============================================================
// CONFIG
// ============================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001";

// ============================================================
// DEFAULTS
// ============================================================

const DEFAULT_SCORES = {
  accuracy: 0,
  reasoning: 0,
  communication: 0,
  problemSolving: 0,
  confidence: 0,
};

const EMPTY_QUESTION = {
  id: "loading-question",
  topic: "Interview",
  difficulty: "Medium",
  question: "",
  expectedConcepts: [],
};

const MAIN_QUESTION_LIMIT = 6;

// ============================================================
// API HELPER
// ============================================================

const apiRequest = async (endpoint, body) => {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The AI server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        `AI request failed with status ${response.status}.`
    );
  }

  if (data?.success === false) {
    throw new Error(
      data?.error ||
        "AI request failed."
    );
  }

  return data;
};

// ============================================================
// QUESTION NORMALIZER
// ============================================================

const normalizeQuestion = (
  rawQuestion,
  index = 0
) => {
  if (!rawQuestion) {
    return {
      ...EMPTY_QUESTION,
      id: `question-${index + 1}`,
    };
  }

  // AI returned a plain string
  if (typeof rawQuestion === "string") {
    return {
      id: `question-${index + 1}`,
      topic: "Technical",
      difficulty: "Medium",
      question: rawQuestion,
      expectedConcepts: [],
    };
  }

  return {
    id:
      rawQuestion.id ||
      `question-${index + 1}`,

    topic:
      rawQuestion.topic ||
      rawQuestion.skill ||
      "Technical",

    difficulty:
      rawQuestion.difficulty ||
      "Medium",

    question:
      rawQuestion.question ||
      rawQuestion.text ||
      rawQuestion.prompt ||
      "",

    expectedConcepts:
      Array.isArray(
        rawQuestion.expectedConcepts
      )
        ? rawQuestion.expectedConcepts
        : [],
  };
};

// ============================================================
// SCORE NORMALIZER
// ============================================================

const normalizeScores = (
  evaluation
) => {
  if (!evaluation) {
    return {
      ...DEFAULT_SCORES,
    };
  }

  const scores =
    evaluation.scores ||
    evaluation;

  const getScore = (...keys) => {
    for (const key of keys) {
      const value =
        Number(scores?.[key]);

      if (
        Number.isFinite(value)
      ) {
        return Math.max(
          0,
          Math.min(
            100,
            Math.round(value)
          )
        );
      }
    }

    return 0;
  };

  return {
    accuracy: getScore(
      "accuracy",
      "technicalAccuracy",
      "technical_accuracy"
    ),

    reasoning: getScore(
      "reasoning",
      "reasoningAbility",
      "reasoning_ability"
    ),

    communication: getScore(
      "communication",
      "clarity"
    ),

    problemSolving: getScore(
      "problemSolving",
      "problem_solving",
      "problemSolvingAbility"
    ),

    confidence: getScore(
      "confidence"
    ),
  };
};

// ============================================================
// EVALUATION NOTE
// ============================================================

const createEvaluationNote = (
  evaluation,
  question
) => {
  const feedback =
    evaluation?.feedback ||
    evaluation?.overallFeedback ||
    evaluation?.summary ||
    evaluation?.comment;

  const strengths =
    Array.isArray(
      evaluation?.strengths
    )
      ? evaluation.strengths
      : [];

  const improvements =
    Array.isArray(
      evaluation?.improvements
    )
      ? evaluation.improvements
      : [];

  let text = "";

  if (feedback) {
    text = feedback;
  } else if (
    strengths.length > 0
  ) {
    text = `Strong points: ${strengths.join(
      ", "
    )}`;
  } else if (
    improvements.length > 0
  ) {
    text = `Areas to improve: ${improvements.join(
      ", "
    )}`;
  } else {
    text = `Answer evaluated for ${
      question?.topic ||
      "the current topic"
    }.`;
  }

  const scores =
    normalizeScores(evaluation);

  const scoreValues =
    Object.values(scores);

  const average =
    scoreValues.length > 0
      ? scoreValues.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / scoreValues.length
      : 0;

  return {
    id:
      Date.now() +
      Math.random(),

    type:
      average >= 75
        ? "success"
        : average >= 50
        ? "info"
        : "warning",

    text,
  };
};

// ============================================================
// PROVIDER
// ============================================================

export const InterviewProvider = ({
  children,
}) => {
  // ==========================================================
  // CANDIDATE PROFILE
  // ==========================================================

  const [candidateName, setCandidateName] =
    useState("");

  const [educationLevel, setEducationLevel] =
    useState("");

  const [degree, setDegree] =
    useState("");

  const [fieldOfStudy, setFieldOfStudy] =
    useState("");

  const [institution, setInstitution] =
    useState("");

  const [graduationYear, setGraduationYear] =
    useState("");

  // ==========================================================
  // RESUME
  // ==========================================================

  const [resumeFile, setResumeFile] =
    useState(null);

  const [resumeText, setResumeText] =
    useState("");

  // ==========================================================
  // INTERVIEW CONFIGURATION
  // ==========================================================

  const [role, setRole] =
    useState("");

  const [customRole, setCustomRole] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [selectedTopics, setSelectedTopics] =
    useState([]);

  const [customSkills, setCustomSkills] =
    useState([]);

  const [interviewType, setInterviewType] =
    useState("");

  const [
    customInterviewPrompt,
    setCustomInterviewPrompt,
  ] = useState("");

  // ==========================================================
  // GENERATED QUESTIONS
  // ==========================================================

  const [questions, setQuestions] =
    useState([]);

  // ==========================================================
  // INTERVIEW STATE
  // ==========================================================

  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  const [answers, setAnswers] =
    useState({});

  const [
    followUpAnswers,
    setFollowUpAnswers,
  ] = useState({});

  const [
    isFollowUpPhase,
    setIsFollowUpPhase,
  ] = useState(false);

  const [isThinking, setIsThinking] =
    useState(false);

  // ==========================================================
  // EVALUATION
  // ==========================================================

  const [liveScores, setLiveScores] =
    useState({
      ...DEFAULT_SCORES,
    });

  const [scoreHistory, setScoreHistory] =
    useState([]);

  const [interviewNotes, setInterviewNotes] =
    useState([]);

  // ==========================================================
  // TIMER
  // ==========================================================

  const [timeRemaining, setTimeRemaining] =
    useState(1200);

  const [
    isTimerRunning,
    setIsTimerRunning,
  ] = useState(false);

  // ==========================================================
  // COMPLETION
  // ==========================================================

  const [
    interviewCompleted,
    setInterviewCompleted,
  ] = useState(false);

  // ==========================================================
  // ERROR
  // ==========================================================

  const [interviewError, setInterviewError] =
    useState("");

  // ==========================================================
  // DERIVED VALUES
  // ==========================================================

  const effectiveRole =
    role === "Other"
      ? customRole
      : role;

  const allSelectedSkills =
    useMemo(
      () => [
        ...(Array.isArray(
          selectedTopics
        )
          ? selectedTopics
          : []),

        ...(Array.isArray(
          customSkills
        )
          ? customSkills
          : []),
      ],
      [
        selectedTopics,
        customSkills,
      ]
    );

  // Always show six main interview questions
  const totalQuestions =
    MAIN_QUESTION_LIMIT;

  const currentQuestion =
    questions[
      currentQuestionIndex
    ] || EMPTY_QUESTION;

  // ==========================================================
  // TIMER
  // ==========================================================

  useEffect(() => {
    if (
      !isTimerRunning ||
      timeRemaining <= 0 ||
      interviewCompleted
    ) {
      return;
    }

    const interval =
      setInterval(() => {
        setTimeRemaining(
          (previous) => {
            if (previous <= 1) {
              setIsTimerRunning(
                false
              );

              setInterviewCompleted(
                true
              );

              return 0;
            }

            return previous - 1;
          }
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [
    isTimerRunning,
    timeRemaining,
    interviewCompleted,
  ]);

  // ==========================================================
  // SETUP INTERVIEW
  // ==========================================================

  const setupInterview = async ({
    candidateName: name,

    educationLevel:
      selectedEducationLevel,

    degree: selectedDegree,

    fieldOfStudy:
      selectedFieldOfStudy,

    institution:
      selectedInstitution,

    graduationYear:
      selectedGraduationYear,

    resumeFile:
      selectedResumeFile,

    resumeText:
      extractedResumeText,

    resume,

    role: selectedRole,

    customRole:
      selectedCustomRole,

    difficulty:
      selectedDifficulty,

    selectedTopics:
      topics,

    customSkills:
      skills,

    interviewType:
      selectedInterviewType,

    customInterviewPrompt:
      selectedCustomPrompt,
  }) => {
    // ========================================================
    // SAVE CANDIDATE PROFILE
    // ========================================================

    setCandidateName(
      name?.trim() || ""
    );

    setEducationLevel(
      selectedEducationLevel || ""
    );

    setDegree(
      selectedDegree || ""
    );

    setFieldOfStudy(
      selectedFieldOfStudy || ""
    );

    setInstitution(
      selectedInstitution?.trim() || ""
    );

    setGraduationYear(
      selectedGraduationYear || ""
    );

    // ========================================================
    // SAVE RESUME
    // ========================================================

    setResumeFile(
      selectedResumeFile ||
        resume ||
        null
    );

    setResumeText(
      extractedResumeText || ""
    );

    // ========================================================
    // SAVE INTERVIEW CONFIG
    // ========================================================

    setRole(
      selectedRole || ""
    );

    setCustomRole(
      selectedCustomRole?.trim() || ""
    );

    setDifficulty(
      selectedDifficulty || "Medium"
    );

    const normalizedTopics =
      Array.isArray(topics)
        ? topics
        : [];

    const normalizedSkills =
      Array.isArray(skills)
        ? skills
        : [];

    setSelectedTopics(
      normalizedTopics
    );

    setCustomSkills(
      normalizedSkills
    );

    setInterviewType(
      selectedInterviewType || ""
    );

    setCustomInterviewPrompt(
      selectedCustomPrompt?.trim() || ""
    );

    // ========================================================
    // RESET INTERVIEW
    // ========================================================

    setQuestions([]);

    setCurrentQuestionIndex(0);

    setAnswers({});

    setFollowUpAnswers({});

    setIsFollowUpPhase(false);

    setIsThinking(true);

    // ========================================================
    // RESET EVALUATION
    // ========================================================

    setLiveScores({
      ...DEFAULT_SCORES,
    });

    setScoreHistory([]);

    setInterviewNotes([]);

    // ========================================================
    // RESET TIMER
    // ========================================================

    setTimeRemaining(1200);

    setIsTimerRunning(true);

    setInterviewCompleted(false);

    setInterviewError("");

    // ========================================================
    // GENERATE FIRST AI QUESTION
    // ========================================================

    try {
      const response =
        await apiRequest(
          "/api/interview/start",
          {
            candidateName:
              name?.trim() || "",

            role:
              selectedRole || "",

            customRole:
              selectedCustomRole?.trim() ||
              "",

            difficulty:
              selectedDifficulty ||
              "Medium",

            selectedTopics:
              normalizedTopics,

            customSkills:
              normalizedSkills,

            interviewType:
              selectedInterviewType ||
              "",

            customInterviewPrompt:
              selectedCustomPrompt?.trim() ||
              "",

            resumeText:
              extractedResumeText ||
              "",
          }
        );

      const generatedQuestion =
        normalizeQuestion(
          response?.question,
          0
        );

      if (
        !generatedQuestion.question
      ) {
        throw new Error(
          "The AI did not return a valid interview question."
        );
      }

      setQuestions([
        generatedQuestion,
      ]);

      setCurrentQuestionIndex(0);

      setInterviewNotes([
        {
          id:
            Date.now(),

          type: "success",

          text:
            "Interview started. Your first question is based on your profile, resume and selected skills.",
        },
      ]);
    } catch (error) {
      console.error(
        "❌ Failed to start AI interview:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to generate the interview question."
      );

      setIsTimerRunning(false);

      setInterviewCompleted(
        false
      );
    } finally {
      setIsThinking(false);
    }
  };

  // ==========================================================
  // SUBMIT MAIN ANSWER
  // ==========================================================

  const submitAnswer = async (
    answerText
  ) => {
    if (
      !answerText?.trim() ||
      isThinking ||
      isFollowUpPhase ||
      !currentQuestion?.question
    ) {
      return;
    }

    const trimmedAnswer =
      answerText.trim();

    const question =
      currentQuestion;

    // ========================================================
    // SAVE ANSWER
    // ========================================================

    setAnswers(
      (previous) => ({
        ...previous,

        [question.id]:
          trimmedAnswer,
      })
    );

    setIsThinking(true);

    setInterviewError("");

    try {
      // ======================================================
      // AI EVALUATION
      // ======================================================

      const evaluationResponse =
        await apiRequest(
          "/api/interview/evaluate",
          {
            candidateName,

            role:
              effectiveRole,

            difficulty,

            question:
              question.question,

            answer:
              trimmedAnswer,

            topic:
              question.topic,

            expectedConcepts:
              question.expectedConcepts,

            resumeText,

            selectedTopics:
              allSelectedSkills,
          }
        );

      const evaluation =
        evaluationResponse?.evaluation ||
        evaluationResponse;

      // ======================================================
      // UPDATE SCORES
      // ======================================================

      const newScores =
        normalizeScores(
          evaluation
        );

      setLiveScores(
        newScores
      );

      setScoreHistory(
        (previous) => [
          ...previous,
          newScores,
        ]
      );

      // ======================================================
      // UPDATE NOTES
      // ======================================================

      const note =
        createEvaluationNote(
          evaluation,
          question
        );

      setInterviewNotes(
        (previous) => [
          note,
          ...previous,
        ]
      );

      // ======================================================
      // GENERATE CONTEXTUAL FOLLOW-UP
      // ======================================================

      let followUpQuestion =
        null;

      try {
        const followUpResponse =
          await apiRequest(
            "/api/interview/follow-up",
            {
              role:
                effectiveRole,

              question:
                question.question,

              answer:
                trimmedAnswer,

              topic:
                question.topic,

              difficulty,
            }
          );

        const rawFollowUp =
          followUpResponse?.followUp;

        if (rawFollowUp) {
          followUpQuestion =
            normalizeQuestion(
              rawFollowUp,
              questions.length
            );
        }
      } catch (followUpError) {
        console.warn(
          "⚠️ Follow-up generation failed:",
          followUpError
        );
      }

      // ======================================================
      // SHOW FOLLOW-UP
      // ======================================================

      if (
        followUpQuestion?.question
      ) {
        setQuestions(
          (previous) => [
            ...previous,
            followUpQuestion,
          ]
        );

        // Move to newly created follow-up
        setCurrentQuestionIndex(
          questions.length
        );

        setIsFollowUpPhase(
          true
        );
      } else {
        // No follow-up available
        // Continue to next main question
        await generateNextQuestion(
          question,
          trimmedAnswer
        );
      }
    } catch (error) {
      console.error(
        "❌ Answer evaluation failed:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to evaluate your answer."
      );
    } finally {
      setIsThinking(false);
    }
  };

  // ==========================================================
  // GENERATE NEXT MAIN QUESTION
  // ==========================================================

  const generateNextQuestion = async (
    previousQuestion,
    previousAnswerOverride = ""
  ) => {
    // ========================================================
    // CHECK LIMIT
    // ========================================================

    if (
      currentQuestionIndex >=
      MAIN_QUESTION_LIMIT - 1
    ) {
      finishInterview();
      return;
    }

    setIsThinking(true);

    setInterviewError("");

    try {
      const response =
        await apiRequest(
          "/api/interview/start",
          {
            candidateName,

            role:
              effectiveRole,

            customRole,

            difficulty,

            selectedTopics:
              allSelectedSkills,

            customSkills,

            interviewType,

            customInterviewPrompt,

            resumeText,

            previousQuestion:
              previousQuestion?.question ||
              "",

            previousTopic:
              previousQuestion?.topic ||
              "",

            previousAnswer:
              previousAnswerOverride ||
              answers[
                previousQuestion?.id
              ] ||
              followUpAnswers[
                previousQuestion?.id
              ] ||
              "",

            questionNumber:
              currentQuestionIndex + 2,
          }
        );

      const nextQuestion =
        normalizeQuestion(
          response?.question,
          questions.length
        );

      if (
        !nextQuestion.question
      ) {
        throw new Error(
          "The AI did not return the next question."
        );
      }

      // Add new main question
      setQuestions(
        (previous) => [
          ...previous,
          nextQuestion,
        ]
      );

      // Move to next question
      setCurrentQuestionIndex(
        (currentIndex) =>
          currentIndex + 1
      );

      setIsFollowUpPhase(
        false
      );
    } catch (error) {
      console.error(
        "❌ Failed to generate next question:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to generate the next question."
      );
    } finally {
      setIsThinking(false);
    }
  };

  // ==========================================================
  // SUBMIT FOLLOW-UP
  // ==========================================================

  const submitFollowUp = async (
    followUpText = ""
  ) => {
    if (
      !followUpText?.trim() ||
      isThinking
    ) {
      return;
    }

    const trimmedFollowUp =
      followUpText.trim();

    const currentId =
      currentQuestion?.id;

    // ========================================================
    // SAVE FOLLOW-UP ANSWER
    // ========================================================

    setFollowUpAnswers(
      (previous) => ({
        ...previous,

        [currentId]:
          trimmedFollowUp,
      })
    );

    setIsFollowUpPhase(false);

    setInterviewError("");

    // ========================================================
    // CHECK INTERVIEW LENGTH
    // ========================================================

    if (
      currentQuestionIndex >=
      MAIN_QUESTION_LIMIT - 1
    ) {
      finishInterview();
      return;
    }

    // ========================================================
    // GENERATE NEXT MAIN QUESTION
    // ========================================================

    const previousQuestion =
      currentQuestion;

    await generateNextQuestion(
      previousQuestion,
      trimmedFollowUp
    );
  };

  // ==========================================================
  // JUMP TO QUESTION
  // ==========================================================

  const jumpToQuestion = (
    index
  ) => {
    if (
      index < 0 ||
      index >= questions.length
    ) {
      return;
    }

    setCurrentQuestionIndex(
      index
    );

    setIsFollowUpPhase(false);

    setIsThinking(false);

    setInterviewError("");
  };

  // ==========================================================
  // FINISH INTERVIEW
  // ==========================================================

  const finishInterview = () => {
    setIsTimerRunning(false);

    setIsThinking(false);

    setIsFollowUpPhase(false);

    setInterviewCompleted(true);
  };

  // ==========================================================
  // RESET INTERVIEW
  // ==========================================================

  const resetInterview = () => {
    // Candidate
    setCandidateName("");

    setEducationLevel("");

    setDegree("");

    setFieldOfStudy("");

    setInstitution("");

    setGraduationYear("");

    // Resume
    setResumeFile(null);

    setResumeText("");

    // Configuration
    setRole("");

    setCustomRole("");

    setDifficulty("Medium");

    setSelectedTopics([]);

    setCustomSkills([]);

    setInterviewType("");

    setCustomInterviewPrompt("");

    // Questions
    setQuestions([]);

    setCurrentQuestionIndex(0);

    setAnswers({});

    setFollowUpAnswers({});

    setIsFollowUpPhase(false);

    setIsThinking(false);

    // Evaluation
    setLiveScores({
      ...DEFAULT_SCORES,
    });

    setScoreHistory([]);

    setInterviewNotes([]);

    // Timer
    setTimeRemaining(1200);

    setIsTimerRunning(false);

    // Completion
    setInterviewCompleted(false);

    setInterviewError("");
  };

  // ==========================================================
  // REPORT
  // ==========================================================

  const getReport = () => {
    return generateInterviewReport({
      candidateName,

      role: effectiveRole,

      difficulty,

      liveScores,

      scoreHistory,

      answers,

      followUpAnswers,

      questions,

      notes:
        interviewNotes,

      // Candidate
      educationLevel,

      degree,

      fieldOfStudy,

      institution,

      graduationYear,

      // Resume
      resumeFile,

      resumeText,

      // Configuration
      selectedTopics,

      customSkills,

      interviewType,

      customInterviewPrompt,
    });
  };

  // ==========================================================
  // PROVIDER VALUE
  // ==========================================================

  return (
    <InterviewContext.Provider
      value={{
        // ====================================================
        // CANDIDATE
        // ====================================================

        candidateName,

        educationLevel,

        degree,

        fieldOfStudy,

        institution,

        graduationYear,

        // ====================================================
        // RESUME
        // ====================================================

        resumeFile,

        resumeText,

        // ====================================================
        // CONFIGURATION
        // ====================================================

        role,

        customRole,

        effectiveRole,

        difficulty,

        selectedTopics,

        customSkills,

        allSelectedSkills,

        interviewType,

        customInterviewPrompt,

        // ====================================================
        // QUESTIONS
        // ====================================================

        questions,

        currentQuestionIndex,

        totalQuestions,

        currentQuestion,

        // ====================================================
        // ANSWERS
        // ====================================================

        answers,

        followUpAnswers,

        isFollowUpPhase,

        // ====================================================
        // AI STATE
        // ====================================================

        isThinking,

        interviewError,

        // ====================================================
        // EVALUATION
        // ====================================================

        liveScores,

        scoreHistory,

        interviewNotes,

        // ====================================================
        // TIMER
        // ====================================================

        timeRemaining,

        isTimerRunning,

        // ====================================================
        // COMPLETION
        // ====================================================

        interviewCompleted,

        // ====================================================
        // ACTIONS
        // ====================================================

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
    useContext(
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