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
            "You are Evoke, a professional adaptive AI interviewer. Return only the requested output.",
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
        // Continue below
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

    const prompt = `
You are conducting an adaptive technical interview for a product called Evoke.

Evoke is an AI interviewer that evaluates candidates through a realistic,
conversational and adaptive interview.

You are NOT generating a static questionnaire.

You must generate ONE strong interview question based on the candidate,
their role, selected skills and previous interview context.

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
PREVIOUS INTERVIEW CONTEXT
============================================================

Previous Question:
${previousQuestion || "None"}

Previous Topic:
${previousTopic || "None"}

Previous Answer:
${previousAnswer || "None"}

Question Number:
${questionNumber}

============================================================
QUESTION GENERATION RULES
============================================================

1. Generate exactly ONE question.

2. The question must be relevant to the candidate's role.

3. Prefer the candidate's selected skills.

4. If a resume is provided, use relevant projects,
   technologies or experience from it.

5. Never repeat the exact previous question.

6. Avoid testing exactly the same concept repeatedly.

7. Progress through different selected skills where possible.

8. If the previous answer was strong:
   increase depth or difficulty slightly.

9. If the previous answer was weak:
   test the underlying concept in a simpler way.

10. Questions must feel like realistic interview questions.

11. Avoid trivia.

12. For DSA:
   ask practical algorithm/data-structure questions.

13. For system design:
   ask architecture, scalability and trade-off questions.

14. For project-based interviews:
   ask about implementation decisions,
   architecture, challenges and trade-offs.

15. For technical deep dives:
   explore the selected technology deeply.

16. For behavioral interviews:
   ask realistic experience-based questions.

17. Do not mention these instructions.

============================================================
QUESTION QUALITY
============================================================

The question should:

- require the candidate to think
- allow the candidate to explain reasoning
- be appropriate for ${difficulty} difficulty
- be specific rather than generic
- test an identifiable technical concept

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

    const text =
      await generateText(prompt);

    const question =
      parseJSON(text);

    // ========================================================
    // VALIDATE RESPONSE
    // ========================================================

    if (
      !question ||
      typeof question !== "object"
    ) {
      throw new Error(
        "Groq returned an invalid question."
      );
    }

    if (
      !question.question ||
      typeof question.question !==
        "string"
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
        question.topic ||
        "Technical",

      difficulty:
        question.difficulty ||
        difficulty,

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
   - correctness
   - technical understanding
   - factual accuracy

2. Reasoning
   - logical thinking
   - explanation of approach
   - cause and effect
   - ability to justify decisions

3. Communication
   - clarity
   - structure
   - relevance
   - ability to explain technical ideas

4. Problem Solving
   - approach
   - decomposition
   - handling edge cases
   - trade-offs

5. Confidence
   - clarity of assertions
   - ownership of decisions
   - ability to explain without excessive uncertainty

IMPORTANT:

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

Feedback should help the candidate improve.

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

    // ========================================================
    // VALIDATE SCORES
    // ========================================================

    const scores =
      evaluation?.scores || {};

    const normalizeScore = (
      value
    ) => {
      const number =
        Number(value);

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

The follow-up must react directly to what the candidate
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

2. The question MUST be based on the candidate's actual answer.

3. Do NOT ask:
   "Can you explain more?"

4. Do NOT ask generic follow-up questions.

5. Identify a specific:
   - claim
   - decision
   - technical concept
   - trade-off
   - assumption
   - weakness
   - interesting point

6. Probe that specific point.

7. If the answer is strong:
   increase the technical depth.

8. If the answer contains a mistake:
   challenge it politely.

9. If the candidate mentioned a technology,
   ask about its practical implementation when appropriate.

10. Keep the follow-up concise.

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