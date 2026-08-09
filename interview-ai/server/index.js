// server/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "node:process";
import {
  generateFirstQuestion,
  evaluateAnswer,
  generateFollowUpQuestion,
  isAIConfigured,
} from "./services/interviewAI.js";

// ============================================================
// ENVIRONMENT
// ============================================================

dotenv.config();

// ============================================================
// APP
// ============================================================

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "2mb",
  })
);

// ============================================================
// ROOT / HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Evoke AI backend is running 🚀",
    aiConfigured: isAIConfigured(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    backend: true,
    aiConfigured: isAIConfigured(),
  });
});

// ============================================================
// GENERATE INTERVIEW QUESTION
// ============================================================

app.post("/api/interview/start", async (req, res) => {
  try {
    const {
      candidateName,
      role,
      customRole,
      difficulty,
      selectedTopics,
      customSkills,
      interviewType,
      customInterviewPrompt,
      resumeText,

      // ======================================================
      // DYNAMIC QUESTIONING CONTEXT
      // ======================================================

      previousQuestion,
      previousTopic,
      previousAnswer,
      questionNumber,
    } = req.body;

    console.log("");
    console.log("🎯 Starting AI interview...");
    console.log("Candidate:", candidateName);
    console.log("Role:", role);
    console.log("Difficulty:", difficulty);
    console.log("Skills:", selectedTopics);
    console.log("Interview type:", interviewType);
    console.log(
      "Question number:",
      questionNumber || 1
    );

    if (!isAIConfigured()) {
      return res.status(500).json({
        success: false,
        error: "OpenAI API key is not configured.",
      });
    }

    // ========================================================
    // GENERATE QUESTION
    //
    // The previous question, topic and answer are forwarded
    // so the AI can generate the next question dynamically.
    // ========================================================

    const question = await generateFirstQuestion({
      candidateName,
      role,
      customRole,
      difficulty,
      selectedTopics,
      customSkills,
      interviewType,
      customInterviewPrompt,
      resumeText,

      // Dynamic questioning context
      previousQuestion,
      previousTopic,
      previousAnswer,
      questionNumber,
    });

    console.log("✅ Question generated.");

    return res.json({
      success: true,
      question,
    });
  } catch (error) {
    console.error(
      "❌ Generate question error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Failed to generate interview question.",
    });
  }
});

// ============================================================
// EVALUATE ANSWER
// ============================================================

app.post("/api/interview/evaluate", async (req, res) => {
  try {
    const {
      candidateName,
      role,
      difficulty,
      question,
      answer,
      topic,
      expectedConcepts,
      resumeText,
      selectedTopics,
    } = req.body;

    console.log("");
    console.log("🧠 Evaluating candidate answer...");
    console.log("Topic:", topic);

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question is required.",
      });
    }

    if (!answer?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Answer is required.",
      });
    }

    if (!isAIConfigured()) {
      return res.status(500).json({
        success: false,
        error: "OpenAI API key is not configured.",
      });
    }

    const evaluation = await evaluateAnswer({
      candidateName,
      role,
      difficulty,
      question,
      answer,
      topic,
      expectedConcepts,
      resumeText,
      selectedTopics,
    });

    console.log("✅ Answer evaluated.");

    return res.json({
      success: true,
      evaluation,
    });
  } catch (error) {
    console.error(
      "❌ Evaluation error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Failed to evaluate answer.",
    });
  }
});

// ============================================================
// GENERATE FOLLOW-UP QUESTION
// ============================================================

app.post(
  "/api/interview/follow-up",
  async (req, res) => {
    try {
      const {
        role,
        question,
        answer,
        topic,
        difficulty,
      } = req.body;

      console.log("");
      console.log(
        "🔄 Generating follow-up question..."
      );

      if (!question) {
        return res.status(400).json({
          success: false,
          error: "Question is required.",
        });
      }

      if (!answer?.trim()) {
        return res.status(400).json({
          success: false,
          error: "Answer is required.",
        });
      }

      if (!isAIConfigured()) {
        return res.status(500).json({
          success: false,
          error:
            "OpenAI API key is not configured.",
        });
      }

      const followUp =
        await generateFollowUpQuestion({
          role,
          question,
          answer,
          topic,
          difficulty,
        });

      console.log("✅ Follow-up generated.");

      return res.json({
        success: true,
        followUp,
      });
    } catch (error) {
      console.error(
        "❌ Follow-up error:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          error?.message ||
          "Failed to generate follow-up.",
      });
    }
  }
);

// ============================================================
// 404
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found.",
    path: req.originalUrl,
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
  (error, req, res, next) => {
    console.error(
      "❌ Global server error:",
      error
    );

    if (res.headersSent) {
      return next(error);
    }

    return res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
);

// ============================================================
// START SERVER
// ============================================================

const server = app.listen(PORT, () => {
  console.log("");
  console.log(
    "=========================================="
  );
  console.log(
    "             EVOKE AI BACKEND"
  );
  console.log(
    "=========================================="
  );
  console.log(
    `🚀 Server: http://localhost:${PORT}`
  );
  console.log(
    `🤖 AI configured: ${
      isAIConfigured()
        ? "YES"
        : "NO"
    }`
  );
  console.log(
    "=========================================="
  );
  console.log("");
});

// ============================================================
// SERVER ERROR HANDLING
// ============================================================

server.on("error", (error) => {
  console.error("");
  console.error(
    "❌ ========================================"
  );
  console.error(
    "❌ SERVER FAILED TO START"
  );
  console.error(
    "❌ ========================================"
  );

  if (error.code === "EADDRINUSE") {
    console.error(
      `❌ Port ${PORT} is already in use.`
    );
    console.error(
      `Try: lsof -i :${PORT}`
    );
  } else {
    console.error(error);
  }

  console.error("");
});

// ============================================================
// PROCESS ERROR HANDLING
// ============================================================

process.on(
  "uncaughtException",
  (error) => {
    console.error(
      "❌ Uncaught Exception:",
      error
    );
  }
);

process.on(
  "unhandledRejection",
  (reason) => {
    console.error(
      "❌ Unhandled Promise Rejection:",
      reason
    );
  }
);