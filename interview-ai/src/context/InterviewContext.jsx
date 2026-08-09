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
// INTERVIEW CONFIGURATION
// ============================================================

// Maximum number of MAIN questions.
// Follow-up questions do NOT count toward this limit.
const MAIN_QUESTION_LIMIT = 6;

// Minimum number of MAIN questions that must be answered
// before the candidate can manually finish.
const MINIMUM_ANSWERED_QUESTIONS = 3;

// Interview duration = 20 minutes
const INTERVIEW_DURATION = 1200;

// ============================================================
// DEFAULT SCORES
// ============================================================

const DEFAULT_SCORES = {
  accuracy: 0,
  reasoning: 0,
  communication: 0,
  problemSolving: 0,
  confidence: 0,
};

// ============================================================
// EMPTY QUESTION
// ============================================================

const EMPTY_QUESTION = {
  id: "loading-question",
  topic: "Interview",
  difficulty: "Medium",
  question: "",
  expectedConcepts: [],
  isFollowUp: false,
};

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
  index = 0,
  isFollowUp = false
) => {
  // ----------------------------------------------------------
  // NO QUESTION
  // ----------------------------------------------------------

  if (!rawQuestion) {
    return {
      ...EMPTY_QUESTION,

      id: `question-${index + 1}`,

      isFollowUp: Boolean(isFollowUp),
    };
  }

  // ----------------------------------------------------------
  // AI RETURNED A PLAIN STRING
  // ----------------------------------------------------------

  if (typeof rawQuestion === "string") {
    return {
      id: `question-${index + 1}`,

      topic: isFollowUp
        ? "Follow-up"
        : "Technical",

      difficulty: "Medium",

      question: rawQuestion,

      expectedConcepts: [],

      // IMPORTANT:
      // The frontend controls whether this is a follow-up.
      isFollowUp: Boolean(isFollowUp),
    };
  }

  // ----------------------------------------------------------
  // AI RETURNED AN OBJECT
  // ----------------------------------------------------------

  return {
    id:
      rawQuestion.id ||
      `question-${index + 1}`,

    topic:
      rawQuestion.topic ||
      rawQuestion.skill ||
      (isFollowUp
        ? "Follow-up"
        : "Technical"),

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

    // ========================================================
    // IMPORTANT FIX
    // ========================================================
    //
    // DO NOT trust rawQuestion.isFollowUp from the AI.
    //
    // The frontend explicitly decides:
    //
    // false -> MAIN QUESTION
    // true  -> FOLLOW-UP
    //
    // This prevents the first/main question from appearing
    // as "FOLLOW-UP".
    //
    isFollowUp: Boolean(isFollowUp),
  };
};

// ============================================================
// SCORE NORMALIZER
// ============================================================

const normalizeScores = (evaluation) => {
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

      if (Number.isFinite(value)) {
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
// EVALUATION NORMALIZER
// ============================================================

const normalizeEvaluation = (
  evaluation,
  question
) => {
  const scores =
    normalizeScores(evaluation);

  return {
    questionId:
      question?.id || "",

    question:
      question?.question || "",

    topic:
      question?.topic || "Technical",

    difficulty:
      question?.difficulty || "Medium",

    isFollowUp:
      Boolean(question?.isFollowUp),

    scores,

    feedback:
      evaluation?.feedback ||
      evaluation?.overallFeedback ||
      evaluation?.summary ||
      evaluation?.comment ||
      "",

    strengths:
      Array.isArray(
        evaluation?.strengths
      )
        ? evaluation.strengths
        : [],

    improvements:
      Array.isArray(
        evaluation?.improvements
      )
        ? evaluation.improvements
        : [],

    evaluatedAt:
      new Date().toISOString(),
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
  // QUESTIONS
  // ==========================================================

  const [questions, setQuestions] =
    useState([]);

  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  // ==========================================================
  // ANSWERS
  // ==========================================================

  const [answers, setAnswers] =
    useState({});

  const [
    followUpAnswers,
    setFollowUpAnswers,
  ] = useState({});

  // ==========================================================
  // INTERVIEW STATE
  // ==========================================================

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

  /*
   * scoreHistory stores evaluations for MAIN questions only.
   *
   * Follow-ups can still receive AI evaluation and feedback,
   * but they are NOT stored as independent report evaluations.
   */

  const [scoreHistory, setScoreHistory] =
    useState([]);

  const [
    latestEvaluation,
    setLatestEvaluation,
  ] = useState(null);

  const [interviewNotes, setInterviewNotes] =
    useState([]);

  // ==========================================================
  // TIMER
  // ==========================================================

  const [timeRemaining, setTimeRemaining] =
    useState(INTERVIEW_DURATION);

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

  /*
   * Possible values:
   *
   * "completed"
   * "early"
   * "time_limit"
   */

  const [
    interviewCompletionReason,
    setInterviewCompletionReason,
  ] = useState("");

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

  // ==========================================================
  // TOTAL QUESTIONS
  // ==========================================================

  // Always six MAIN questions.
  // Follow-ups do NOT count.
  const totalQuestions =
    MAIN_QUESTION_LIMIT;

  // ==========================================================
  // CURRENT QUESTION
  // ==========================================================

  const currentQuestion =
    questions[
      currentQuestionIndex
    ] || EMPTY_QUESTION;

  // ==========================================================
  // QUESTION COUNTS
  // ==========================================================

  // Number of MAIN questions generated so far.
  const mainQuestionCount =
    questions.filter(
      (question) =>
        !question?.isFollowUp
    ).length;

  // ==========================================================
  // ANSWERED MAIN QUESTIONS
  // ==========================================================

  const answeredMainQuestionCount =
    questions.filter(
      (question) => {
        if (question?.isFollowUp) {
          return false;
        }

        const answer =
          answers?.[question.id];

        if (typeof answer === "string") {
          return answer.trim().length > 0;
        }

        if (
          answer &&
          typeof answer === "object"
        ) {
          if (
            typeof answer.answer ===
            "string"
          ) {
            return (
              answer.answer.trim().length >
              0
            );
          }

          if (
            typeof answer.text ===
            "string"
          ) {
            return (
              answer.text.trim().length >
              0
            );
          }
        }

        return false;
      }
    ).length;

  // ==========================================================
  // EVALUATED QUESTIONS
  // ==========================================================

  const evaluatedQuestionCount =
    scoreHistory.length;

  const hasEvaluation =
    evaluatedQuestionCount > 0;

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
              setIsTimerRunning(false);

              setIsThinking(false);

              setIsFollowUpPhase(false);

              setInterviewCompletionReason(
                "time_limit"
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
  // SAVE EVALUATION
  // ==========================================================

  const saveEvaluation = (
    evaluation,
    question
  ) => {
    const normalizedEvaluation =
      normalizeEvaluation(
        evaluation,
        question
      );

    // --------------------------------------------------------
    // LIVE SCORE
    // --------------------------------------------------------

    setLiveScores(
      normalizedEvaluation.scores
    );

    // --------------------------------------------------------
    // LATEST EVALUATION
    // --------------------------------------------------------

    setLatestEvaluation(
      normalizedEvaluation
    );

    // --------------------------------------------------------
    // SCORE HISTORY
    // --------------------------------------------------------

    // Follow-ups are evaluated for feedback,
    // but are NOT added to main question history.

    if (!question?.isFollowUp) {
      setScoreHistory(
        (previous) => [
          ...previous,
          normalizedEvaluation,
        ]
      );
    }

    // --------------------------------------------------------
    // NOTES
    // --------------------------------------------------------

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

    return normalizedEvaluation;
  };

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
    // --------------------------------------------------------
    // CANDIDATE
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // RESUME
    // --------------------------------------------------------

    setResumeFile(
      selectedResumeFile ||
        resume ||
        null
    );

    setResumeText(
      extractedResumeText || ""
    );

    // --------------------------------------------------------
    // CONFIGURATION
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // RESET QUESTIONS
    // --------------------------------------------------------

    setQuestions([]);

    setCurrentQuestionIndex(0);

    // --------------------------------------------------------
    // RESET ANSWERS
    // --------------------------------------------------------

    setAnswers({});

    setFollowUpAnswers({});

    // --------------------------------------------------------
    // RESET INTERVIEW STATE
    // --------------------------------------------------------

    setIsFollowUpPhase(false);

    setIsThinking(true);

    // --------------------------------------------------------
    // RESET EVALUATION
    // --------------------------------------------------------

    setLiveScores({
      ...DEFAULT_SCORES,
    });

    setScoreHistory([]);

    setLatestEvaluation(null);

    setInterviewNotes([]);

    // --------------------------------------------------------
    // RESET TIMER
    // --------------------------------------------------------

    setTimeRemaining(
      INTERVIEW_DURATION
    );

    setIsTimerRunning(true);

    // --------------------------------------------------------
    // RESET COMPLETION
    // --------------------------------------------------------

    setInterviewCompleted(false);

    setInterviewCompletionReason("");

    setInterviewError("");

    // --------------------------------------------------------
    // GENERATE FIRST QUESTION
    // --------------------------------------------------------

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

      // IMPORTANT:
      // Explicitly mark first question as MAIN.
      const generatedQuestion =
        normalizeQuestion(
          response?.question,
          0,
          false
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
          id: Date.now(),

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

      setInterviewCompleted(false);
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

    // --------------------------------------------------------
    // SAVE ANSWER
    // --------------------------------------------------------

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
      // ------------------------------------------------------
      // AI EVALUATION
      // ------------------------------------------------------

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

      // ------------------------------------------------------
      // SAVE EVALUATION
      // ------------------------------------------------------

      saveEvaluation(
        evaluation,
        question
      );

      // ------------------------------------------------------
      // GENERATE FOLLOW-UP
      // ------------------------------------------------------

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
              questions.length,
              true
            );
        }
      } catch (followUpError) {
        console.warn(
          "⚠️ Follow-up generation failed:",
          followUpError
        );
      }

      // ------------------------------------------------------
      // SHOW FOLLOW-UP
      // ------------------------------------------------------

      if (
        followUpQuestion?.question
      ) {
        const followUpIndex =
          questions.length;

        setQuestions(
          (previous) => [
            ...previous,
            followUpQuestion,
          ]
        );

        setCurrentQuestionIndex(
          followUpIndex
        );

        setIsFollowUpPhase(true);
      } else {
        // ----------------------------------------------------
        // NO FOLLOW-UP
        // ----------------------------------------------------

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
    const mainQuestions =
      questions.filter(
        (question) =>
          !question?.isFollowUp
      );

    // --------------------------------------------------------
    // ALL SIX MAIN QUESTIONS COMPLETED
    // --------------------------------------------------------

    if (
      mainQuestions.length >=
      MAIN_QUESTION_LIMIT
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

            // Main question number.
            questionNumber:
              mainQuestions.length + 1,
          }
        );

      // IMPORTANT:
      // Explicitly mark generated question as MAIN.
      const nextQuestion =
        normalizeQuestion(
          response?.question,
          questions.length,
          false
        );

      if (
        !nextQuestion.question
      ) {
        throw new Error(
          "The AI did not return the next question."
        );
      }

      const nextIndex =
        questions.length;

      setQuestions(
        (previous) => [
          ...previous,
          nextQuestion,
        ]
      );

      setCurrentQuestionIndex(
        nextIndex
      );

      setIsFollowUpPhase(false);
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
      isThinking ||
      !currentQuestion?.question
    ) {
      return;
    }

    const trimmedFollowUp =
      followUpText.trim();

    const followUpQuestion =
      currentQuestion;

    // --------------------------------------------------------
    // SAVE FOLLOW-UP ANSWER
    // --------------------------------------------------------

    setFollowUpAnswers(
      (previous) => ({
        ...previous,

        [followUpQuestion.id]:
          trimmedFollowUp,
      })
    );

    setIsThinking(true);

    setInterviewError("");

    try {
      // ------------------------------------------------------
      // EVALUATE FOLLOW-UP
      // ------------------------------------------------------

      const evaluationResponse =
        await apiRequest(
          "/api/interview/evaluate",
          {
            candidateName,

            role:
              effectiveRole,

            difficulty,

            question:
              followUpQuestion.question,

            answer:
              trimmedFollowUp,

            topic:
              followUpQuestion.topic,

            expectedConcepts:
              followUpQuestion.expectedConcepts,

            resumeText,

            selectedTopics:
              allSelectedSkills,
          }
        );

      const evaluation =
        evaluationResponse?.evaluation ||
        evaluationResponse;

      // ------------------------------------------------------
      // SAVE FOLLOW-UP EVALUATION
      // ------------------------------------------------------

      saveEvaluation(
        evaluation,
        followUpQuestion
      );

      setIsFollowUpPhase(false);

      // ------------------------------------------------------
      // CHECK MAIN QUESTION COUNT
      // ------------------------------------------------------

      const mainQuestions =
        questions.filter(
          (question) =>
            !question?.isFollowUp
        );

      if (
        mainQuestions.length >=
        MAIN_QUESTION_LIMIT
      ) {
        finishInterview();
        return;
      }

      // ------------------------------------------------------
      // GENERATE NEXT MAIN QUESTION
      // ------------------------------------------------------

      await generateNextQuestion(
        followUpQuestion,
        trimmedFollowUp
      );
    } catch (error) {
      console.error(
        "❌ Follow-up evaluation failed:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to evaluate the follow-up answer."
      );
    } finally {
      setIsThinking(false);
    }
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

    const selectedQuestion =
      questions[index];

    setIsFollowUpPhase(
      Boolean(
        selectedQuestion?.isFollowUp
      )
    );

    setIsThinking(false);

    setInterviewError("");
  };

  // ==========================================================
  // FINISH INTERVIEW
  // ==========================================================

  const finishInterview = () => {
    // --------------------------------------------------------
    // COUNT ANSWERED MAIN QUESTIONS
    // --------------------------------------------------------

    const answeredCount =
      questions.filter(
        (question) => {
          if (question?.isFollowUp) {
            return false;
          }

          const answer =
            answers?.[question.id];

          if (typeof answer === "string") {
            return (
              answer.trim().length > 0
            );
          }

          if (
            answer &&
            typeof answer === "object"
          ) {
            if (
              typeof answer.answer ===
              "string"
            ) {
              return (
                answer.answer.trim()
                  .length > 0
              );
            }

            if (
              typeof answer.text ===
              "string"
            ) {
              return (
                answer.text.trim()
                  .length > 0
              );
            }
          }

          return false;
        }
      ).length;

    // --------------------------------------------------------
    // MANDATORY MINIMUM
    // --------------------------------------------------------

    if (
      answeredCount <
      MINIMUM_ANSWERED_QUESTIONS
    ) {
      console.warn(
        `Interview requires at least ${MINIMUM_ANSWERED_QUESTIONS} answered main questions.`
      );

      return false;
    }

    // --------------------------------------------------------
    // STOP INTERVIEW
    // --------------------------------------------------------

    setIsTimerRunning(false);

    setIsThinking(false);

    setIsFollowUpPhase(false);

    // --------------------------------------------------------
    // COMPLETION REASON
    // --------------------------------------------------------

    if (
      answeredCount >=
      MAIN_QUESTION_LIMIT
    ) {
      setInterviewCompletionReason(
        "completed"
      );
    } else {
      setInterviewCompletionReason(
        "early"
      );
    }

    setInterviewCompleted(true);

    return true;
  };

  // ==========================================================
  // RESET INTERVIEW
  // ==========================================================

  const resetInterview = () => {
    // --------------------------------------------------------
    // CANDIDATE
    // --------------------------------------------------------

    setCandidateName("");

    setEducationLevel("");

    setDegree("");

    setFieldOfStudy("");

    setInstitution("");

    setGraduationYear("");

    // --------------------------------------------------------
    // RESUME
    // --------------------------------------------------------

    setResumeFile(null);

    setResumeText("");

    // --------------------------------------------------------
    // CONFIGURATION
    // --------------------------------------------------------

    setRole("");

    setCustomRole("");

    setDifficulty("Medium");

    setSelectedTopics([]);

    setCustomSkills([]);

    setInterviewType("");

    setCustomInterviewPrompt("");

    // --------------------------------------------------------
    // QUESTIONS
    // --------------------------------------------------------

    setQuestions([]);

    setCurrentQuestionIndex(0);

    // --------------------------------------------------------
    // ANSWERS
    // --------------------------------------------------------

    setAnswers({});

    setFollowUpAnswers({});

    // --------------------------------------------------------
    // INTERVIEW STATE
    // --------------------------------------------------------

    setIsFollowUpPhase(false);

    setIsThinking(false);

    // --------------------------------------------------------
    // EVALUATION
    // --------------------------------------------------------

    setLiveScores({
      ...DEFAULT_SCORES,
    });

    setScoreHistory([]);

    setLatestEvaluation(null);

    setInterviewNotes([]);

    // --------------------------------------------------------
    // TIMER
    // --------------------------------------------------------

    setTimeRemaining(
      INTERVIEW_DURATION
    );

    setIsTimerRunning(false);

    // --------------------------------------------------------
    // COMPLETION
    // --------------------------------------------------------

    setInterviewCompleted(false);

    setInterviewCompletionReason("");

    setInterviewError("");
  };

  // ==========================================================
  // REPORT
  // ==========================================================

  const getReport = () => {
    return generateInterviewReport({
      // ------------------------------------------------------
      // BASIC
      // ------------------------------------------------------

      candidateName,

      role: effectiveRole,

      difficulty,

      // ------------------------------------------------------
      // COMPLETION
      // ------------------------------------------------------

      interviewCompletionReason,

      answeredMainQuestionCount,

      // ------------------------------------------------------
      // SCORES
      // ------------------------------------------------------

      liveScores,

      scoreHistory,

      // ------------------------------------------------------
      // ANSWERS
      // ------------------------------------------------------

      answers,

      followUpAnswers,

      // ------------------------------------------------------
      // QUESTIONS
      // ------------------------------------------------------

      questions,

      // ------------------------------------------------------
      // NOTES
      // ------------------------------------------------------

      notes:
        interviewNotes,

      // ------------------------------------------------------
      // CANDIDATE PROFILE
      // ------------------------------------------------------

      educationLevel,

      degree,

      fieldOfStudy,

      institution,

      graduationYear,

      // ------------------------------------------------------
      // RESUME
      // ------------------------------------------------------

      resumeFile,

      resumeText,

      // ------------------------------------------------------
      // CONFIGURATION
      // ------------------------------------------------------

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

        mainQuestionCount,

        answeredMainQuestionCount,

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

        latestEvaluation,

        hasEvaluation,

        evaluatedQuestionCount,

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

        interviewCompletionReason,

        minimumAnsweredQuestions:
          MINIMUM_ANSWERED_QUESTIONS,

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