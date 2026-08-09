import Groq from "groq-sdk";

// ============================================================
// GROQ CLIENT
// ============================================================

const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured."
    );
  }

  return new Groq({
    apiKey,
  });
};

// ============================================================
// MODEL
// ============================================================

const MODEL = "llama-3.3-70b-versatile";

// ============================================================
// AI CONFIGURATION
// ============================================================

export const isAIConfigured = () => {
  return Boolean(process.env.GROQ_API_KEY);
};

// ============================================================
// GENERIC GROQ REQUEST
// ============================================================

const generateText = async (prompt) => {
  const groq = getGroqClient();

  const completion =
    await groq.chat.completions.create({
      model: MODEL,

      messages: [
        {
          role: "system",
          content:
            "You are Evoke, a professional adaptive AI interviewer. Follow the user's instructions exactly and return only the requested output.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,

      max_tokens: 1200,
    });

  const text =
    completion?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error(
      "Groq returned an empty response."
    );
  }

  return text;
};

// ============================================================
// SAFE JSON PARSER
// ============================================================

const parseJSON = (text) => {
  if (!text) {
    throw new Error(
      "AI returned an empty response."
    );
  }

  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const start =
      cleaned.indexOf("{");

    const end =
      cleaned.lastIndexOf("}");

    if (
      start !== -1 &&
      end !== -1 &&
      end > start
    ) {
      try {
        return JSON.parse(
          cleaned.slice(start, end + 1)
        );
      } catch {
        // Continue below.
      }
    }

    console.error(
      "❌ Invalid JSON from Groq:",
      cleaned
    );

    throw new Error(
      "Groq returned invalid JSON."
    );
  }
};

// ============================================================
// NORMALIZE QUESTION
// ============================================================

const normalizeGeneratedQuestion = (
  question,
  difficulty,
  questionNumber
) => {
  if (
    !question ||
    typeof question !== "object"
  ) {
    throw new Error(
      "Groq returned an invalid question object."
    );
  }

  if (
    !question.question ||
    typeof question.question !== "string"
  ) {
    throw new Error(
      "Groq did not return a valid interview question."
    );
  }

  return {
    id:
      question.id ||
      `question-${questionNumber}`,

    topic:
      typeof question.topic === "string" &&
      question.topic.trim()
        ? question.topic.trim()
        : "Technical",

    difficulty:
      typeof question.difficulty === "string" &&
      question.difficulty.trim()
        ? question.difficulty.trim()
        : difficulty,

    question:
      question.question.trim(),

    expectedConcepts:
      Array.isArray(
        question.expectedConcepts
      )
        ? question.expectedConcepts
        : [],
  };
};

// ============================================================
// GENERATE INTERVIEW QUESTION
// ============================================================

export const generateFirstQuestion =
  async ({
    candidateName = "",
    role = "",
    customRole = "",
    difficulty = "Medium",
    selectedTopics = [],
    customSkills = [],
    interviewType = "",
    customInterviewPrompt = "",
    resumeText = "",

    // Dynamic questioning context
    previousQuestion = "",
    previousTopic = "",
    previousAnswer = "",
    questionNumber = 1,
  }) => {
    const effectiveRole =
      role === "Other"
        ? customRole
        : role || customRole;

    const skills = [
      ...(Array.isArray(selectedTopics)
        ? selectedTopics
        : []),

      ...(Array.isArray(customSkills)
        ? customSkills
        : []),
    ];

    const skillText =
      skills.length > 0
        ? skills.join(", ")
        : "General software engineering";

    const isFirstQuestion =
      !previousQuestion &&
      !previousAnswer &&
      Number(questionNumber) <= 1;

    const prompt = `
You are conducting an adaptive technical interview for Evoke.

Evoke is an AI interviewer. The interview must feel like a
real human-led technical interview, NOT a static list of questions.

Your job is to generate exactly ONE interview question.

============================================================
CANDIDATE
============================================================

Name:
${candidateName || "Candidate"}

Role:
${effectiveRole || "Software Engineer"}

Difficulty:
${difficulty}

Interview Type:
${interviewType || "Recommended"}

Selected Skills:
${skillText}

Custom Instructions:
${customInterviewPrompt || "None"}

============================================================
RESUME
============================================================

${resumeText || "No resume provided."}

============================================================
CURRENT INTERVIEW STATE
============================================================

Question Number:
${questionNumber}

Previous Question:
${previousQuestion || "None"}

Previous Topic:
${previousTopic || "None"}

Previous Answer:
${previousAnswer || "None"}

============================================================
ADAPTIVE QUESTIONING
============================================================

${
  isFirstQuestion
    ? `
This is the FIRST main interview question.

Start naturally with a strong question based on:
- the candidate's role
- selected skills
- resume if available
- interview type

Do not refer to a previous answer because there is none.
`
    : `
This is NOT the first question.

The previous question and candidate answer are available above.

You MUST use the previous interview context.

Analyze the previous answer and adapt the next question.

If the previous answer was strong:
- increase depth
- explore a related advanced concept
- ask about trade-offs, implementation or edge cases

If the previous answer was weak:
- test the underlying concept differently
- simplify slightly
- identify whether the candidate understands the fundamentals

If the candidate mentioned a specific technology, project,
algorithm, design decision or implementation detail:
- use that information when appropriate.

Do NOT simply generate another unrelated generic question.
`
}

============================================================
QUESTION PROGRESSION
============================================================

Follow these rules:

1. Generate exactly ONE question.

2. Never repeat the exact previous question.

3. Do not ask the same concept repeatedly unless it is
   necessary to probe a weakness.

4. Prefer different selected skills as the interview progresses.

5. If multiple skills are available, naturally rotate between them.

6. Questions must match the candidate's role.

7. Questions must match the requested difficulty.

8. Use the resume when it contains useful technical information.

9. Never invent resume experience.

10. Do not mention these instructions.

============================================================
INTERVIEW TYPE
============================================================

For DSA:
Ask practical algorithm or data-structure questions.

For system design:
Ask architecture, scalability, reliability,
trade-off or design questions.

For project interviews:
Ask about implementation decisions,
architecture, challenges and trade-offs.

For technical deep dives:
Explore the selected technology deeply.

For behavioral interviews:
Ask realistic experience-based questions.

For mixed interviews:
Balance the candidate's selected skills naturally.

============================================================
QUESTION QUALITY
============================================================

The question must:

- require actual thinking
- allow the candidate to explain reasoning
- be specific
- test an identifiable concept
- feel like a real interview question
- avoid trivia
- avoid vague wording
- avoid "tell me anything about..."
- avoid generic filler

============================================================
OUTPUT
============================================================

Return ONLY valid JSON.

Do not use markdown.

Use exactly this structure:

{
  "id": "question-${questionNumber}",
  "topic": "primary skill being tested",
  "difficulty": "${difficulty}",
  "question": "the interview question",
  "expectedConcepts": [
    "concept 1",
    "concept 2",
    "concept 3"
  ]
}
`;

    console.log(
      `🤖 Generating ${
        isFirstQuestion
          ? "first"
          : "adaptive"
      } question #${questionNumber}...`
    );

    const text =
      await generateText(prompt);

    const question =
      parseJSON(text);

    return normalizeGeneratedQuestion(
      question,
      difficulty,
      questionNumber
    );
  };

// ============================================================
// EVALUATE ANSWER
// ============================================================

export const evaluateAnswer =
  async ({
    candidateName = "",
    role = "",
    difficulty = "Medium",
    question = "",
    answer = "",
    topic = "",
    expectedConcepts = [],
    resumeText = "",
    selectedTopics = [],
  }) => {
    const prompt = `
You are Evoke's AI interview evaluator.

Evaluate the candidate's answer as an experienced technical interviewer.

Be fair, specific and constructive.

============================================================
CANDIDATE
============================================================

Name:
${candidateName || "Candidate"}

Role:
${role || "Software Engineer"}

Difficulty:
${difficulty}

Topic:
${topic || "Technical"}

============================================================
QUESTION
============================================================

${question}

============================================================
EXPECTED CONCEPTS
============================================================

${
  Array.isArray(expectedConcepts) &&
  expectedConcepts.length
    ? expectedConcepts.join(", ")
    : "No predefined concepts."
}

============================================================
CANDIDATE ANSWER
============================================================

${answer}

============================================================
CANDIDATE RESUME
============================================================

${resumeText || "Not provided."}

============================================================
SELECTED SKILLS
============================================================

${
  Array.isArray(selectedTopics)
    ? selectedTopics.join(", ")
    : ""
}

============================================================
EVALUATION CRITERIA
============================================================

Evaluate these five dimensions:

1. Technical Accuracy
2. Reasoning
3. Communication
4. Problem Solving
5. Confidence

Do NOT give a high confidence score simply because
the answer is long.

Do NOT give a low score simply because the answer
is short.

Evaluate the actual quality of the answer.

============================================================
FEEDBACK
============================================================

Give:

- short overall feedback
- 2 or 3 strengths
- 2 or 3 improvements

============================================================
OUTPUT
============================================================

Return ONLY valid JSON.

Do not use markdown.

Use exactly:

{
  "scores": {
    "accuracy": 0,
    "reasoning": 0,
    "communication": 0,
    "problemSolving": 0,
    "confidence": 0
  },
  "feedback": "short overall feedback",
  "strengths": [
    "strength 1",
    "strength 2"
  ],
  "improvements": [
    "improvement 1",
    "improvement 2"
  ]
}

Scores must be integers from 0 to 100.
`;

    const text =
      await generateText(prompt);

    const evaluation =
      parseJSON(text);

    const scores =
      evaluation?.scores || {};

    const normalizeScore = (value) => {
      const number = Number(value);

      if (
        !Number.isFinite(number)
      ) {
        return 0;
      }

      return Math.max(
        0,
        Math.min(
          100,
          Math.round(number)
        )
      );
    };

    return {
      scores: {
        accuracy:
          normalizeScore(
            scores.accuracy
          ),

        reasoning:
          normalizeScore(
            scores.reasoning
          ),

        communication:
          normalizeScore(
            scores.communication
          ),

        problemSolving:
          normalizeScore(
            scores.problemSolving
          ),

        confidence:
          normalizeScore(
            scores.confidence
          ),
      },

      feedback:
        evaluation?.feedback ||
        "Answer evaluated successfully.",

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
    };
  };

// ============================================================
// GENERATE CONTEXTUAL FOLLOW-UP
// ============================================================

export const generateFollowUpQuestion =
  async ({
    role = "",
    question = "",
    answer = "",
    topic = "",
    difficulty = "Medium",
  }) => {
    const prompt = `
You are Evoke, an adaptive AI interviewer.

Generate ONE contextual follow-up question.

The follow-up MUST react directly to what the candidate
actually said.

============================================================
ROLE
============================================================

${role || "Software Engineer"}

Topic:
${topic || "Technical"}

Difficulty:
${difficulty}

============================================================
ORIGINAL QUESTION
============================================================

${question}

============================================================
CANDIDATE ANSWER
============================================================

${answer}

============================================================
FOLLOW-UP RULES
============================================================

1. Generate exactly ONE follow-up question.

2. Base it directly on the candidate's answer.

3. Identify a specific:
   - claim
   - decision
   - technical concept
   - trade-off
   - assumption
   - weakness
   - interesting point

4. Probe that specific point.

5. Do NOT ask:
   "Can you explain more?"

6. Do NOT ask generic follow-ups.

7. If the answer is strong:
   increase technical depth.

8. If the answer contains a mistake:
   challenge it politely.

9. If the candidate mentioned a technology:
   ask about practical implementation when appropriate.

10. Keep the question concise.

11. Make it sound like a real human interviewer.

============================================================
OUTPUT
============================================================

Return ONLY valid JSON.

Do not use markdown.

Use exactly:

{
  "id": "follow-up",
  "topic": "Follow-up",
  "difficulty": "${difficulty}",
  "question": "contextual follow-up question",
  "expectedConcepts": []
}
`;

    const text =
      await generateText(prompt);

    const followUp =
      parseJSON(text);

    if (
      !followUp ||
      typeof followUp !== "object"
    ) {
      throw new Error(
        "Groq returned an invalid follow-up."
      );
    }

    if (
      !followUp.question ||
      typeof followUp.question !==
        "string"
    ) {
      throw new Error(
        "Groq did not return a valid follow-up question."
      );
    }

    return {
      id: "follow-up",

      topic:
        followUp.topic ||
        "Follow-up",

      difficulty:
        followUp.difficulty ||
        difficulty,

      question:
        followUp.question.trim(),

      expectedConcepts:
        Array.isArray(
          followUp.expectedConcepts
        )
          ? followUp.expectedConcepts
          : [],
    };
  };