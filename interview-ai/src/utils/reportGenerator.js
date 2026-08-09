// ============================================================
// EVOKE — AI INTERVIEW REPORT GENERATOR
// ============================================================
// Generates the final report from the ACTUAL interview session.
//
// IMPORTANT BEHAVIOR
// ------------------------------------------------------------
// - Only MAIN questions are included in scoring.
// - Follow-up questions are excluded from independent scoring.
// - Only evaluated answers contribute to the score.
// - Unanswered questions do NOT become zero-score questions.
// - Topic breakdown groups evaluated questions by topic.
// - Timeline contains only answered + evaluated questions.
// - Roadmap is based on actual AI improvements.
// - Early completion is explicitly recorded.
// - Time-limit completion is explicitly recorded.
// ============================================================


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
// HELPERS
// ============================================================

const clamp = (
  value,
  min = 0,
  max = 100
) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(
    min,
    Math.min(
      max,
      Math.round(number)
    )
  );
};


const average = (values = []) => {
  const validValues = values
    .map(Number)
    .filter(Number.isFinite);

  if (validValues.length === 0) {
    return 0;
  }

  return Math.round(
    validValues.reduce(
      (sum, value) =>
        sum + value,
      0
    ) / validValues.length
  );
};


// ============================================================
// NORMALIZE EVALUATION SCORES
// ============================================================

const getEvaluationScores = (
  evaluation
) => {
  const scores =
    evaluation?.scores ||
    evaluation ||
    {};

  return {
    accuracy: clamp(
      scores.accuracy ??
        scores.technicalAccuracy ??
        scores.technical_accuracy
    ),

    reasoning: clamp(
      scores.reasoning ??
        scores.reasoningAbility ??
        scores.reasoning_ability
    ),

    communication: clamp(
      scores.communication ??
        scores.clarity
    ),

    problemSolving: clamp(
      scores.problemSolving ??
        scores.problem_solving ??
        scores.problemSolvingAbility
    ),

    confidence: clamp(
      scores.confidence
    ),
  };
};


// ============================================================
// CALCULATE OVERALL SCORE
// ============================================================

const calculateOverallScore = (
  metrics
) => {
  if (!metrics) {
    return 0;
  }

  return clamp(
    metrics.accuracy * 0.30 +
      metrics.reasoning * 0.25 +
      metrics.problemSolving * 0.20 +
      metrics.communication * 0.15 +
      metrics.confidence * 0.10
  );
};


// ============================================================
// RECOMMENDATION
// ============================================================

const getRecommendation = (
  score,
  evaluatedCount
) => {
  if (evaluatedCount <= 0) {
    return "Insufficient Data";
  }

  if (score >= 85) {
    return "Strong Hire";
  }

  if (score >= 75) {
    return "Hire";
  }

  if (score >= 65) {
    return "Borderline";
  }

  return "Needs Improvement";
};


// ============================================================
// METRIC STATUS
// ============================================================

const getMetricStatus = (
  score
) => {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 80) {
    return "Strong";
  }

  if (score >= 70) {
    return "Good";
  }

  if (score >= 60) {
    return "Developing";
  }

  return "Needs Improvement";
};


// ============================================================
// BUILD METRICS
// ============================================================
// Only ACTUAL evaluated MAIN questions contribute.
//
// Example:
//
// 2 evaluated out of 6
//
// Score is based on those 2 evaluations.
// The remaining 4 are NOT treated as zero.
// ============================================================

const buildMetrics = (
  scoreHistory = [],
  liveScores = DEFAULT_SCORES
) => {
  const validEvaluations =
    Array.isArray(scoreHistory)
      ? scoreHistory.filter(
          (evaluation) =>
            evaluation &&
            !evaluation.isFollowUp
        )
      : [];

  // ----------------------------------------------------------
  // NO EVALUATIONS
  // ----------------------------------------------------------

  if (
    validEvaluations.length === 0
  ) {
    return {
      accuracy: clamp(
        liveScores?.accuracy
      ),

      reasoning: clamp(
        liveScores?.reasoning
      ),

      communication: clamp(
        liveScores?.communication
      ),

      problemSolving: clamp(
        liveScores?.problemSolving
      ),

      confidence: clamp(
        liveScores?.confidence
      ),
    };
  }

  // ----------------------------------------------------------
  // NORMALIZE EACH EVALUATION
  // ----------------------------------------------------------

  const evaluations =
    validEvaluations.map(
      (evaluation) =>
        getEvaluationScores(
          evaluation
        )
    );

  // ----------------------------------------------------------
  // AVERAGE EACH METRIC
  // ----------------------------------------------------------

  return {
    accuracy: average(
      evaluations.map(
        (item) =>
          item.accuracy
      )
    ),

    reasoning: average(
      evaluations.map(
        (item) =>
          item.reasoning
      )
    ),

    communication: average(
      evaluations.map(
        (item) =>
          item.communication
      )
    ),

    problemSolving: average(
      evaluations.map(
        (item) =>
          item.problemSolving
      )
    ),

    confidence: average(
      evaluations.map(
        (item) =>
          item.confidence
      )
    ),
  };
};


// ============================================================
// COLLECT STRENGTHS
// ============================================================

const collectStrengths = (
  scoreHistory = [],
  metrics = {}
) => {
  const strengths = [];

  // ----------------------------------------------------------
  // ACTUAL AI STRENGTHS
  // ----------------------------------------------------------

  scoreHistory.forEach(
    (evaluation) => {
      if (
        evaluation?.isFollowUp
      ) {
        return;
      }

      if (
        Array.isArray(
          evaluation?.strengths
        )
      ) {
        evaluation.strengths.forEach(
          (strength) => {
            if (
              strength &&
              !strengths.includes(
                strength
              )
            ) {
              strengths.push(
                strength
              );
            }
          }
        );
      }
    }
  );

  // ----------------------------------------------------------
  // METRIC FALLBACK
  // ----------------------------------------------------------

  const metricMap = [
    {
      key: "accuracy",
      label:
        "Strong technical accuracy",
    },

    {
      key: "reasoning",
      label:
        "Strong analytical reasoning",
    },

    {
      key: "problemSolving",
      label:
        "Good problem-solving ability",
    },

    {
      key: "communication",
      label:
        "Clear technical communication",
    },

    {
      key: "confidence",
      label:
        "Confident technical responses",
    },
  ];

  metricMap
    .sort(
      (a, b) =>
        (metrics[b.key] || 0) -
        (metrics[a.key] || 0)
    )
    .forEach(
      (item) => {
        if (
          (metrics[item.key] || 0) >=
            75 &&
          !strengths.includes(
            item.label
          )
        ) {
          strengths.push(
            item.label
          );
        }
      }
    );

  return strengths.slice(
    0,
    5
  );
};


// ============================================================
// COLLECT WEAKNESSES
// ============================================================

const collectWeaknesses = (
  scoreHistory = [],
  metrics = {}
) => {
  const weaknesses = [];

  // ----------------------------------------------------------
  // ACTUAL AI IMPROVEMENTS
  // ----------------------------------------------------------

  scoreHistory.forEach(
    (evaluation) => {
      if (
        evaluation?.isFollowUp
      ) {
        return;
      }

      if (
        Array.isArray(
          evaluation?.improvements
        )
      ) {
        evaluation.improvements.forEach(
          (improvement) => {
            if (
              improvement &&
              !weaknesses.includes(
                improvement
              )
            ) {
              weaknesses.push(
                improvement
              );
            }
          }
        );
      }
    }
  );

  // ----------------------------------------------------------
  // METRIC FALLBACK
  // ----------------------------------------------------------

  const metricMap = [
    {
      key: "accuracy",
      label:
        "Improve technical accuracy",
    },

    {
      key: "reasoning",
      label:
        "Develop deeper reasoning and trade-off analysis",
    },

    {
      key: "problemSolving",
      label:
        "Practice more structured problem solving",
    },

    {
      key: "communication",
      label:
        "Make technical explanations more structured and concise",
    },

    {
      key: "confidence",
      label:
        "Build confidence when explaining technical decisions",
    },
  ];

  metricMap
    .sort(
      (a, b) =>
        (metrics[a.key] || 0) -
        (metrics[b.key] || 0)
    )
    .forEach(
      (item) => {
        if (
          (metrics[item.key] || 0) <
            75 &&
          !weaknesses.includes(
            item.label
          )
        ) {
          weaknesses.push(
            item.label
          );
        }
      }
    );

  return weaknesses.slice(
    0,
    5
  );
};


// ============================================================
// TOPIC BREAKDOWN
// ============================================================
// Instead of creating one giant list/card for every question,
// this groups evaluated questions by topic.
//
// Example:
//
// JavaScript
// ├── Q1
// └── Q3
//
// React
// └── Q2
//
// Only answered + evaluated MAIN questions appear.
// ============================================================

const buildTopicBreakdown = (
  questions = [],
  answers = {},
  scoreHistory = []
) => {
  // ----------------------------------------------------------
  // FIND ONLY EVALUATED MAIN QUESTIONS
  // ----------------------------------------------------------

  const evaluatedQuestions =
    questions.filter(
      (question) => {
        if (
          question?.isFollowUp
        ) {
          return false;
        }

        const answer =
          answers?.[
            question.id
          ] || "";

        const evaluation =
          scoreHistory.find(
            (item) =>
              item?.questionId ===
                question.id &&
              !item?.isFollowUp
          );

        return (
          Boolean(
            answer.trim()
          ) &&
          Boolean(
            evaluation
          )
        );
      }
    );

  // ----------------------------------------------------------
  // GROUP QUESTIONS BY TOPIC
  // ----------------------------------------------------------

  const groupedTopics = {};

  evaluatedQuestions.forEach(
    (question) => {
      const topic =
        question.topic ||
        "Technical";

      if (
        !groupedTopics[topic]
      ) {
        groupedTopics[topic] =
          [];
      }

      groupedTopics[topic].push(
        question
      );
    }
  );

  // ----------------------------------------------------------
  // CREATE TOPIC ENTRIES
  // ----------------------------------------------------------

  return Object.entries(
    groupedTopics
  ).map(
    ([topic, topicQuestions]) => {
      // ------------------------------------------------------
      // GET EVALUATIONS
      // ------------------------------------------------------

      const evaluations =
        topicQuestions
          .map(
            (question) =>
              scoreHistory.find(
                (item) =>
                  item?.questionId ===
                    question.id &&
                  !item?.isFollowUp
              )
          )
          .filter(Boolean);

      // ------------------------------------------------------
      // CALCULATE TOPIC SCORE
      // ------------------------------------------------------

      const questionScores =
        evaluations.map(
          (evaluation) =>
            calculateOverallScore(
              getEvaluationScores(
                evaluation
              )
            )
        );

      const topicScore =
        average(
          questionScores
        );

      // ------------------------------------------------------
      // COLLECT STRENGTHS
      // ------------------------------------------------------

      const strengths = [];

      evaluations.forEach(
        (evaluation) => {
          if (
            Array.isArray(
              evaluation?.strengths
            )
          ) {
            evaluation.strengths.forEach(
              (strength) => {
                if (
                  strength &&
                  !strengths.includes(
                    strength
                  )
                ) {
                  strengths.push(
                    strength
                  );
                }
              }
            );
          }
        }
      );

      // ------------------------------------------------------
      // COLLECT IMPROVEMENTS
      // ------------------------------------------------------

      const improvements = [];

      evaluations.forEach(
        (evaluation) => {
          if (
            Array.isArray(
              evaluation?.improvements
            )
          ) {
            evaluation.improvements.forEach(
              (improvement) => {
                if (
                  improvement &&
                  !improvements.includes(
                    improvement
                  )
                ) {
                  improvements.push(
                    improvement
                  );
                }
              }
            );
          }
        }
      );

      // ------------------------------------------------------
      // COLLECT FEEDBACK
      // ------------------------------------------------------

      const feedback =
        evaluations
          .map(
            (evaluation) =>
              evaluation?.feedback
          )
          .filter(Boolean);

      // ------------------------------------------------------
      // RETURN TOPIC
      // ------------------------------------------------------

      return {
        id: topic,

        topic,

        score:
          topicScore,

        status:
          getMetricStatus(
            topicScore
          ),

        questionCount:
          topicQuestions.length,

        questions:
          topicQuestions.map(
            (question) => {
              const evaluation =
                scoreHistory.find(
                  (item) =>
                    item?.questionId ===
                      question.id &&
                    !item?.isFollowUp
                );

              const score =
                evaluation
                  ? calculateOverallScore(
                      getEvaluationScores(
                        evaluation
                      )
                    )
                  : 0;

              return {
                id:
                  question.id,

                question:
                  question.question ||
                  "",

                score,

                feedback:
                  evaluation?.feedback ||
                  "",
              };
            }
          ),

        strength:
          strengths[0] ||
          "Demonstrated understanding of this topic.",

        weakness:
          improvements[0] ||
          "Continue developing depth in this area.",

        feedback:
          feedback[0] ||
          "Performance was evaluated from the answered questions in this topic.",

        answered: true,

        evaluated: true,
      };
    }
  );
};


// ============================================================
// PERFORMANCE TIMELINE
// ============================================================
// Only evaluated MAIN questions appear.
// Follow-ups are excluded.
// Unanswered questions are excluded.
// ============================================================

const buildTimeline = (
  questions = [],
  answers = {},
  scoreHistory = []
) => {
  const evaluatedQuestions =
    questions.filter(
      (question) => {
        if (
          question?.isFollowUp
        ) {
          return false;
        }

        const answer =
          answers?.[
            question.id
          ] || "";

        const evaluation =
          scoreHistory.find(
            (item) =>
              item?.questionId ===
                question.id &&
              !item?.isFollowUp
          );

        return (
          Boolean(
            answer.trim()
          ) &&
          Boolean(
            evaluation
          )
        );
      }
    );

  return evaluatedQuestions.map(
    (question, index) => {
      const evaluation =
        scoreHistory.find(
          (item) =>
            item?.questionId ===
              question.id &&
            !item?.isFollowUp
        );

      const scores =
        getEvaluationScores(
          evaluation
        );

      const score =
        calculateOverallScore(
          scores
        );

      return {
        id:
          question.id ||
          `question-${index + 1}`,

        questionNumber:
          index + 1,

        title:
          question.question ||
          `Question ${index + 1}`,

        topic:
          question.topic ||
          "Technical",

        rating:
          getMetricStatus(
            score
          ),

        score,

        feedback:
          evaluation?.feedback ||
          "",

        color:
          score >= 80
            ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
            : score >= 65
            ? "text-purple-400 border-purple-500/20 bg-purple-500/10"
            : "text-amber-400 border-amber-500/20 bg-amber-500/10",
      };
    }
  );
};


// ============================================================
// LEARNING ROADMAP
// ============================================================
// IMPORTANT:
//
// The roadmap should answer:
//
// "What should this candidate work on next?"
//
// It should NOT simply repeat the selected interview topics.
//
// Recommendations come from actual AI improvements.
// ============================================================

const buildRoadmap = (
  weaknesses = [],
  scoreHistory = [],
  selectedTopics = []
) => {
  const roadmap = [];

  // ----------------------------------------------------------
  // ACTUAL AI IMPROVEMENTS
  // ----------------------------------------------------------

  const actualImprovements = [];

  scoreHistory.forEach(
    (evaluation) => {
      if (
        evaluation?.isFollowUp
      ) {
        return;
      }

      if (
        Array.isArray(
          evaluation?.improvements
        )
      ) {
        evaluation.improvements.forEach(
          (improvement) => {
            if (
              improvement &&
              !actualImprovements.includes(
                improvement
              )
            ) {
              actualImprovements.push(
                improvement
              );
            }
          }
        );
      }
    }
  );

  // ----------------------------------------------------------
  // PREFER ACTUAL AI IMPROVEMENTS
  // ----------------------------------------------------------

  const recommendations =
    actualImprovements.length > 0
      ? actualImprovements
      : weaknesses;

  // ----------------------------------------------------------
  // ROADMAP STYLE
  // ----------------------------------------------------------

  const actions = [
    "Review",
    "Practice",
    "Strengthen",
    "Apply",
  ];

  const colors = [
    "bg-purple-500/10 border-purple-500/20 text-purple-300",

    "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",

    "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",

    "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
  ];

  // ----------------------------------------------------------
  // CREATE ROADMAP ITEMS
  // ----------------------------------------------------------

  recommendations
    .slice(0, 4)
    .forEach(
      (weakness, index) => {
        // Find the evaluation that produced
        // this specific improvement.

        const relatedEvaluation =
          scoreHistory.find(
            (evaluation) =>
              !evaluation?.isFollowUp &&
              Array.isArray(
                evaluation?.improvements
              ) &&
              evaluation.improvements.includes(
                weakness
              )
          );

        const topic =
          relatedEvaluation?.topic ||
          selectedTopics[index] ||
          "Interview Skills";

        roadmap.push({
          action:
            actions[index] ||
            "Practice",

          topic,

          desc:
            weakness,

          color:
            colors[index] ||
            colors[0],
        });
      }
    );

  // ----------------------------------------------------------
  // NO WEAKNESSES FOUND
  // ----------------------------------------------------------

  if (
    roadmap.length === 0
  ) {
    const fallbackTopic =
      scoreHistory[0]?.topic ||
      selectedTopics[0] ||
      "Interview Performance";

    roadmap.push({
      action: "Maintain",

      topic:
        fallbackTopic,

      desc:
        "No major weakness was identified in the evaluated responses. Continue practicing to maintain and strengthen your current performance.",

      color:
        "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    });
  }

  return roadmap;
};


// ============================================================
// EXECUTIVE SUMMARY
// ============================================================

const buildExecutiveSummary = ({
  candidateName,
  role,
  overallScore,
  recommendation,
  metrics,
  strengths,
  weaknesses,
  evaluatedCount,
  totalQuestions,
  completionReason,
}) => {
  // ----------------------------------------------------------
  // NO EVALUATIONS
  // ----------------------------------------------------------

  if (
    evaluatedCount === 0
  ) {
    return `${
      candidateName ||
      "The candidate"
    } did not complete any evaluated responses during the ${
      role ||
      "technical"
    } interview. A meaningful performance assessment could not be generated.`;
  }

  // ----------------------------------------------------------
  // STRONGEST METRIC
  // ----------------------------------------------------------

  const strongestMetric =
    Object.entries(metrics)
      .sort(
        (a, b) =>
          b[1] - a[1]
      )[0];

  // ----------------------------------------------------------
  // WEAKEST METRIC
  // ----------------------------------------------------------

  const weakestMetric =
    Object.entries(metrics)
      .sort(
        (a, b) =>
          a[1] - b[1]
      )[0];

  const metricLabels = {
    accuracy:
      "technical accuracy",

    reasoning:
      "reasoning",

    communication:
      "communication",

    problemSolving:
      "problem solving",

    confidence:
      "confidence",
  };

  const strongestLabel =
    metricLabels[
      strongestMetric?.[0]
    ] ||
    "technical performance";

  const weakestLabel =
    metricLabels[
      weakestMetric?.[0]
    ] ||
    "technical depth";

  // ----------------------------------------------------------
  // PERFORMANCE DESCRIPTION
  // ----------------------------------------------------------

  const performanceDescription =
    overallScore >= 80
      ? "strong"
      : overallScore >= 65
      ? "solid"
      : "developing";

  // ----------------------------------------------------------
  // COMPLETION DESCRIPTION
  // ----------------------------------------------------------

  let completionText = "";

  if (
    completionReason ===
    "time_limit"
  ) {
    completionText =
      ` The interview ended when the time limit was reached after ${evaluatedCount} evaluated response${
        evaluatedCount === 1
          ? ""
          : "s"
      }.`;
  } else if (
    completionReason ===
    "early"
  ) {
    completionText =
      ` The candidate completed the interview early after ${evaluatedCount} evaluated response${
        evaluatedCount === 1
          ? ""
          : "s"
      } out of a possible ${totalQuestions}.`;
  } else {
    completionText =
      ` The assessment was based on ${evaluatedCount} evaluated response${
        evaluatedCount === 1
          ? ""
          : "s"
      }.`;
  }

  return `${
    candidateName ||
    "The candidate"
  } demonstrated ${performanceDescription} performance during the ${
    role ||
    "technical"
  } interview, achieving an overall score of ${overallScore}%.${completionText} The strongest area was ${strongestLabel}, while ${weakestLabel} represents the biggest opportunity for improvement. ${
    strengths[0]
      ? `${strengths[0]}. `
      : ""
  }${
    weaknesses[0]
      ? `${weaknesses[0]}. `
      : ""
  }Based on the evaluated responses, the current recommendation is ${recommendation}.`;
};


// ============================================================
// MAIN REPORT GENERATOR
// ============================================================

export const generateInterviewReport = ({
  candidateName = "Candidate",

  role = "Software Engineer",

  difficulty = "Medium",

  liveScores = DEFAULT_SCORES,

  scoreHistory = [],

  answers = {},

  followUpAnswers = {},

  questions = [],

  notes = [],

  educationLevel = "",

  degree = "",

  fieldOfStudy = "",

  institution = "",

  graduationYear = "",

  resumeFile = null,

  resumeText = "",

  selectedTopics = [],

  customSkills = [],

  interviewType = "",

  customInterviewPrompt = "",

  completionReason = "completed",

  evaluatedQuestionCount = null,

  answeredMainQuestionCount = null,

  totalQuestions = 6,

  timeRemaining = 0,
}) => {
  // ==========================================================
  // MAIN QUESTIONS
  // ==========================================================

  const mainQuestions =
    questions.filter(
      (question) =>
        !question?.isFollowUp
    );

  // ==========================================================
  // ANSWERED MAIN QUESTIONS
  // ==========================================================

  const answeredMainQuestions =
    mainQuestions.filter(
      (question) =>
        Boolean(
          answers?.[
            question.id
          ]?.trim()
        )
    );

  // ==========================================================
  // EVALUATED MAIN QUESTIONS
  // ==========================================================

  const evaluatedMainEvaluations =
    Array.isArray(
      scoreHistory
    )
      ? scoreHistory.filter(
          (evaluation) =>
            evaluation &&
            !evaluation.isFollowUp
        )
      : [];

  // ==========================================================
  // ACTUAL COUNTS
  // ==========================================================

  const actualEvaluatedCount =
    evaluatedMainEvaluations.length;

  const actualAnsweredCount =
    answeredMainQuestions.length;

  // ==========================================================
  // METRICS
  // ==========================================================

  const metrics =
    buildMetrics(
      evaluatedMainEvaluations,
      liveScores
    );

  // ==========================================================
  // OVERALL SCORE
  // ==========================================================

  const overallScore =
    calculateOverallScore(
      metrics
    );

  // ==========================================================
  // RECOMMENDATION
  // ==========================================================

  const recommendation =
    getRecommendation(
      overallScore,
      actualEvaluatedCount
    );

  // ==========================================================
  // STRENGTHS
  // ==========================================================

  const strengths =
    collectStrengths(
      evaluatedMainEvaluations,
      metrics
    );

  // ==========================================================
  // WEAKNESSES
  // ==========================================================

  const weaknesses =
    collectWeaknesses(
      evaluatedMainEvaluations,
      metrics
    );

  // ==========================================================
  // TOPIC BREAKDOWN
  // ==========================================================

  const topicBreakdown =
    buildTopicBreakdown(
      questions,
      answers,
      evaluatedMainEvaluations
    );

  // ==========================================================
  // PERFORMANCE TIMELINE
  // ==========================================================

  const timeline =
    buildTimeline(
      questions,
      answers,
      evaluatedMainEvaluations
    );

  // ==========================================================
  // LEARNING ROADMAP
  // ==========================================================

  const roadmap =
    buildRoadmap(
      weaknesses,
      evaluatedMainEvaluations,
      [
        ...selectedTopics,
        ...customSkills,
      ]
    );

  // ==========================================================
  // EXECUTIVE SUMMARY
  // ==========================================================

  const executiveSummary =
    buildExecutiveSummary({
      candidateName,

      role,

      overallScore,

      recommendation,

      metrics,

      strengths,

      weaknesses,

      evaluatedCount:
        actualEvaluatedCount,

      totalQuestions,

      completionReason,
    });

  // ==========================================================
  // FOLLOW-UP STATISTICS
  // ==========================================================

  const followUpQuestions =
    questions.filter(
      (question) =>
        question?.isFollowUp
    );

  const followUpAnswerCount =
    Object.keys(
      followUpAnswers || {}
    ).filter(
      (key) =>
        Boolean(
          followUpAnswers?.[
            key
          ]?.trim()
        )
    ).length;

  // ==========================================================
  // COMPLETION RATE
  // ==========================================================

  const completionRate =
    totalQuestions > 0
      ? Math.round(
          (actualEvaluatedCount /
            totalQuestions) *
            100
        )
      : 0;

  // ==========================================================
  // COMPLETION LABEL
  // ==========================================================

  const completionLabels = {
    completed:
      "Interview completed",

    early:
      "Interview completed early",

    time_limit:
      "Time limit reached",

    insufficient:
      "Interview incomplete",
  };

  const completionLabel =
    completionLabels[
      completionReason
    ] ||
    "Interview completed";

  // ==========================================================
  // DATE
  // ==========================================================

  const date =
    new Date().toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

  // ==========================================================
  // FINAL REPORT
  // ==========================================================

  return {
    // ========================================================
    // BASIC
    // ========================================================

    candidateName,

    role,

    difficulty,

    date,

    // ========================================================
    // COMPLETION
    // ========================================================

    completion: {
      reason:
        completionReason,

      label:
        completionLabel,

      totalQuestions,

      answeredQuestions:
        actualAnsweredCount,

      evaluatedQuestions:
        actualEvaluatedCount,

      unansweredQuestions:
        Math.max(
          0,
          totalQuestions -
            actualAnsweredCount
        ),

      completionRate,

      timeRemaining,

      finishedEarly:
        completionReason ===
        "early",

      reachedTimeLimit:
        completionReason ===
        "time_limit",
    },

    // ========================================================
    // RECOMMENDATION
    // ========================================================

    overallScore,

    recommendation,

    // ========================================================
    // METRICS
    // ========================================================

    metrics,

    metricStatuses: {
      accuracy:
        getMetricStatus(
          metrics.accuracy
        ),

      reasoning:
        getMetricStatus(
          metrics.reasoning
        ),

      communication:
        getMetricStatus(
          metrics.communication
        ),

      problemSolving:
        getMetricStatus(
          metrics.problemSolving
        ),

      confidence:
        getMetricStatus(
          metrics.confidence
        ),
    },

    // ========================================================
    // PERFORMANCE
    // ========================================================

    strengths,

    weaknesses,

    topicBreakdown,

    timeline,

    roadmap,

    executiveSummary,

    // ========================================================
    // INTERVIEW DATA
    // ========================================================

    questions,

    answers,

    followUpAnswers,

    scoreHistory,

    notes,

    // ========================================================
    // STATISTICS
    // ========================================================

    statistics: {
      totalMainQuestions:
        totalQuestions,

      generatedMainQuestions:
        mainQuestions.length,

      answeredQuestions:
        actualAnsweredCount,

      evaluatedQuestions:
        actualEvaluatedCount,

      unansweredQuestions:
        Math.max(
          0,
          totalQuestions -
            actualAnsweredCount
        ),

      followUpQuestions:
        followUpQuestions.length,

      answeredFollowUps:
        followUpAnswerCount,

      completionRate,

      evaluatedCoverage:
        totalQuestions > 0
          ? Math.round(
              (actualEvaluatedCount /
                totalQuestions) *
                100
            )
          : 0,
    },

    // ========================================================
    // CANDIDATE PROFILE
    // ========================================================

    candidateProfile: {
      educationLevel,

      degree,

      fieldOfStudy,

      institution,

      graduationYear,
    },

    // ========================================================
    // RESUME
    // ========================================================

    resume: {
      uploaded:
        Boolean(
          resumeFile
        ),

      fileName:
        resumeFile?.name ||
        "",

      hasExtractedText:
        Boolean(
          resumeText?.trim()
        ),
    },

    // ========================================================
    // INTERVIEW CONFIGURATION
    // ========================================================

    configuration: {
      selectedTopics,

      customSkills,

      interviewType,

      customInterviewPrompt,
    },
  };
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default generateInterviewReport;