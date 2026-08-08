export const interviewQuestions = [
  {
    id: 1,
    topic: "Prompt Engineering",
    difficulty: "Easy",
    title: "Prompt Engineering & Structured Outputs",
    question:
      "How do you enforce deterministic JSON output schemas from LLMs in production applications to prevent downstream parsing failures in automated agent pipelines?",
    codeContext: `// Target Output Schema
const OutputSchema = z.object({
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  actionItems: z.array(z.string()),
});`,
    expectedConcepts: [
      "JSON Schema Enforcement",
      "Pydantic / Zod Validation",
      "Function Calling / Structured Outputs API",
      "Retry & Fallback Logic",
    ],
    followUp:
      "How would you handle cases where the LLM produces valid JSON but hallucinates key schema fields under low temperature?",
  },
  {
    id: 2,
    topic: "RAG Architecture",
    difficulty: "Medium",
    title: "RAG Architecture & Hybrid Search",
    question:
      "Compare Dense Vector Retrieval vs Sparse BM25 Search. When is hybrid search necessary, and how do you calculate and tune the hybrid weighting parameter (alpha)?",
    codeContext: `// Hybrid Query Scoring Formula
const hybridScore = (alpha * denseScore) + ((1 - alpha) * bm25Score);
// Where alpha is typically tuned between 0.6 and 0.8`,
    expectedConcepts: [
      "Dense Embeddings vs Sparse BM25",
      "Semantic vs Keyword Match",
      "Reciprocal Rank Fusion (RRF)",
      "Score Normalization",
    ],
    followUp:
      "Can you explain how score normalization (e.g. Min-Max vs Z-Score) impacts hybrid search balance when dense and sparse scores operate on different scales?",
  },
  {
    id: 3,
    topic: "Vector Database",
    difficulty: "Medium",
    title: "Vector DB Indexing & Quantization",
    question:
      "How would you optimize indexing, partition strategy, and query latency when scaling a vector database (e.g. Qdrant / Pinecone / pgvector) to over 500 million high-dimensional dense embeddings with real-time updates?",
    codeContext: `// Vector Store Indexing Parameters
const indexConfig = {
  distanceMetric: "cosine",
  hnswM: 16,             // Max connections per node
  efConstruction: 128,   // Build search depth
  quantization: "SQ8",   // Scalar Quantization 8-bit
};`,
    expectedConcepts: [
      "HNSW Graphs",
      "Scalar Quantization (SQ8) & Product Quantization (PQ)",
      "Sharding & Tenant Partitioning",
      "Write-Ahead Logging (WAL) & Ingestion Buffers",
    ],
    followUp:
      "Can you explain why you selected HNSW over IVF indexing for real-time high-throughput update workloads?",
  },
  {
    id: 4,
    topic: "MCP",
    difficulty: "Hard",
    title: "Model Context Protocol (MCP) Integration",
    question:
      "Explain how Model Context Protocol (MCP) standardizes context retrieval and tool execution between AI hosts and local development environments.",
    codeContext: `// MCP Server Handler Definition
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{ 
    name: "execute_sql", 
    description: "Run SQL query on local DB",
    inputSchema: SqlQuerySchema 
  }]
}));`,
    expectedConcepts: [
      "JSON-RPC Protocol Specs",
      "Client-Server Tool Registration",
      "Sandbox Security & Permissions",
      "Local Context Discovery",
    ],
    followUp:
      "What security sandboxing measures do you implement when an MCP tool allows executing shell commands or local file system writes?",
  },
  {
    id: 5,
    topic: "LLM Caching",
    difficulty: "Medium",
    title: "KV Cache & Prompt Prefix Caching",
    question:
      "How does KV Cache acceleration work in Transformer inference, and how do you leverage Prompt Prefix Caching to reduce time-to-first-token (TTFT) and API costs for multi-turn agent conversations?",
    codeContext: `// Multi-turn System Prompt Caching Structure
const payload = {
  system_prompt: [ { type: "text", text: SYSTEM_DOCS, cache_control: { type: "ephemeral" } } ],
  messages: conversationHistory,
};`,
    expectedConcepts: [
      "KV Cache (Key-Value Attention Memory)",
      "Prefix / Radix Tree Caching",
      "TTFT Latency Reduction",
      "Token Cost Optimization",
    ],
    followUp:
      "What happens to cache hit rate when system prompts are dynamic or include timestamps per request?",
  },
  {
    id: 6,
    topic: "Agentic Tool Calling",
    difficulty: "Hard",
    title: "Agentic ReAct Loop & Error Recovery",
    question:
      "Design an autonomous AI agent loop that handles unexpected tool failures (e.g. API timeouts, rate limits, malformed tool arguments) without halting the entire workflow.",
    codeContext: `// ReAct Loop Exception Handler
try {
  const result = font await executeToolCall(toolCall);
  return result;
} catch (error) {
  // How do you format the error back to the LLM?
}`,
    expectedConcepts: [
      "ReAct (Reason + Act) Pattern",
      "Self-Correction & Exception Feedback",
      "Exponential Backoff & Rate Limits",
      "Max Step Guards & Infinite Loop Detection",
    ],
    followUp:
      "How do you prevent an agent from getting trapped in an infinite retry loop when a third-party tool continuously returns a 400 Bad Request?",
  },
  {
    id: 7,
    topic: "System Design",
    difficulty: "Hard",
    title: "System Architecture & High Concurrency",
    question:
      "Architect an end-to-end streaming AI platform capable of handling 50,000 concurrent LLM conversations with sub-100ms initial response latency.",
    codeContext: `// Streaming Gateway Architecture
Client <-> WebSocket / SSE Gateway <-> Message Queue (Kafka/Redis) <-> Worker Pool (vLLM / TensorRT-LLM)`,
    expectedConcepts: [
      "Server-Sent Events (SSE) vs WebSockets",
      "vLLM & Continuous Batching",
      "Distributed Rate Limiting & Queues",
      "Load Balancing & GPU Cluster Scaling",
    ],
    followUp:
      "How do you manage memory allocation across GPU nodes when requests have widely varying context window lengths?",
  },
  {
    id: 8,
    topic: "Deployment",
    difficulty: "Hard",
    title: "Production Deployment & Continuous Evaluation",
    question:
      "How do you establish continuous LLM evaluation (LLM-as-a-Judge + Ragas metrics) in a CI/CD pipeline to prevent regression during model upgrades?",
    codeContext: `// CI/CD Eval Assertion
const evalReport = await runEvalSuite({ dataset: "golden_eval_set.json" });
assert(evalReport.faithfulness >= 0.90);
assert(evalReport.answerRelevance >= 0.85);`,
    expectedConcepts: [
      "Faithfulness & Groundedness Metrics",
      "LLM-as-a-Judge Evaluation",
      "Golden Test Sets",
      "CI/CD Quality Gates & Canary Deployments",
    ],
    followUp:
      "How do you mitigate evaluator model bias (e.g. position bias or verbosity bias) when using GPT-4 to judge smaller fine-tuned models?",
  },
];
