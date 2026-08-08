export const generateInterviewReport = ({
  candidateName = "Alex Rivera",
  role = "AI Engineer",
  difficulty = "Medium",
  liveScores = {
    accuracy: 88,
    reasoning: 92,
    communication: 78,
    problemSolving: 85,
    confidence: 90,
  },
  scoreHistory = [],
  answers = {},
  followUpAnswers = {},
  questions = [],
  notes = [],
}) => {
  // Calculate average scores from score history or fallback to liveScores
  let accuracy = liveScores.accuracy;
  let reasoning = liveScores.reasoning;
  let communication = liveScores.communication;
  let problemSolving = liveScores.problemSolving;
  let confidence = liveScores.confidence;

  if (scoreHistory.length > 0) {
    const total = scoreHistory.reduce(
      (acc, s) => ({
        accuracy: acc.accuracy + s.accuracy,
        reasoning: acc.reasoning + s.reasoning,
        communication: acc.communication + s.communication,
        problemSolving: acc.problemSolving + s.problemSolving,
        confidence: acc.confidence + s.confidence,
      }),
      { accuracy: 0, reasoning: 0, communication: 0, problemSolving: 0, confidence: 0 }
    );
    const count = scoreHistory.length;
    accuracy = Math.round(total.accuracy / count);
    reasoning = Math.round(total.reasoning / count);
    communication = Math.round(total.communication / count);
    problemSolving = Math.round(total.problemSolving / count);
    confidence = Math.round(total.confidence / count);
  }

  // Weighted overall score
  const overallScore = Math.round(
    accuracy * 0.3 + reasoning * 0.25 + problemSolving * 0.2 + communication * 0.15 + confidence * 0.1
  );

  // Hiring recommendation logic
  let recommendation = "Strong Hire";
  if (overallScore >= 85) {
    recommendation = "Strong Hire";
  } else if (overallScore >= 75) {
    recommendation = "Hire";
  } else if (overallScore >= 65) {
    recommendation = "Borderline";
  } else {
    recommendation = "No Hire";
  }

  // Topic breakdown generation based on answered questions
  const topicBreakdown = questions.slice(0, Math.max(Object.keys(answers).length, 5)).map((q, idx) => {
    const hasAnswered = answers[q.id];
    const baseScore = Math.min(
      98,
      Math.max(65, Math.round(overallScore + (idx % 2 === 0 ? 5 : -4)))
    );
    let status = "Good";
    if (baseScore >= 90) status = "Excellent";
    else if (baseScore >= 82) status = "Strong";
    else if (baseScore >= 75) status = "Satisfactory";
    else status = "Needs Improvement";

    return {
      topic: q.topic,
      score: baseScore,
      status: status,
      strength: q.expectedConcepts[0] || "Clear conceptual understanding",
      weakness: q.expectedConcepts[2] || "Deeper trade-off analysis recommended",
    };
  });

  // Dynamic Strengths based on highest metrics
  const strengthsMap = [
    { key: "reasoning", val: reasoning, text: "Excellent reasoning on trade-offs & system architecture" },
    { key: "accuracy", val: accuracy, text: "High technical accuracy in API contracts & schema enforcement" },
    { key: "problemSolving", val: problemSolving, text: "Strong problem solving for hybrid search & caching" },
    { key: "communication", val: communication, text: "Clear, structured communication with pseudocode & diagrams" },
    { key: "confidence", val: confidence, text: "Decisive architectural selections during high concurrency probes" },
  ];
  strengthsMap.sort((a, b) => b.val - a.val);
  const strengths = strengthsMap.slice(0, 4).map((s) => s.text);

  // Dynamic Weaknesses based on lowest metrics
  const weaknessesMap = [
    { key: "communication", val: communication, text: "Communication could include more explicit code snippets" },
    { key: "problemSolving", val: problemSolving, text: "Missed edge-case trade-offs during high-throughput re-ranking" },
    { key: "accuracy", val: accuracy, text: "Needs deeper deployment knowledge for K8s pod autoscaling" },
    { key: "reasoning", val: reasoning, text: "Quantization recall rate calculations could be more detailed" },
  ];
  weaknessesMap.sort((a, b) => a.val - b.val);
  const weaknesses = weaknessesMap.slice(0, 3).map((w) => w.text);

  // Learning Roadmap
  const roadmap = [
    {
      action: "Review",
      topic: "Prompt Engineering",
      desc: "Brush up on structured schema enforcement & Pydantic validation",
      color: "bg-purple-500/10 border-purple-500/20 text-purple-300",
    },
    {
      action: "Practice",
      topic: "Vector Databases",
      desc: "Hands-on tuning of HNSW indexing parameters & SQ8 quantization",
      color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
    },
    {
      action: "Study",
      topic: "Model Context Protocol",
      desc: "Deep dive into JSON-RPC security sandboxing & tool calling",
      color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
    },
    {
      action: "Complete",
      topic: "Deployment Module",
      desc: "Master Kubernetes HPA scaling & production LLM load balancing",
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    },
  ];

  // Timeline rating array
  const timeline = questions.slice(0, 5).map((q, idx) => {
    const ratings = ["Good", "Excellent", "Good", "Excellent", "Needs Improvement"];
    const colors = [
      "text-purple-400 border-purple-500/20 bg-purple-500/10",
      "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      "text-purple-400 border-purple-500/20 bg-purple-500/10",
      "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      "text-amber-400 border-amber-500/20 bg-amber-500/10",
    ];

    return {
      id: q.id,
      title: q.title,
      topic: q.topic,
      rating: ratings[idx % ratings.length],
      color: colors[idx % colors.length],
    };
  });

  // Executive summary text
  const executiveSummary = `Candidate ${candidateName} demonstrated strong technical reasoning and system architecture skills for the ${role} position. Understanding of ${
    questions[1]?.topic || "RAG"
  } and ${
    questions[2]?.topic || "Vector Databases"
  } is solid (${overallScore}% overall rating), with clear explanation of trade-offs. Minor refinement recommended in ${
    weaknesses[0] ? weaknesses[0].toLowerCase() : "deployment strategies"
  }.`;

  return {
    candidateName,
    role,
    difficulty,
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    overallScore,
    recommendation,
    metrics: { accuracy, reasoning, communication, problemSolving, confidence },
    topicBreakdown,
    strengths,
    weaknesses,
    timeline,
    roadmap,
    executiveSummary,
  };
};
