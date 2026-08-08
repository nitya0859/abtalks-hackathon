export const interviewQuestions = [
  // ============================================================
  // PYTHON
  // ============================================================

  {
    id: "python-01",
    topic: "Python",
    skills: ["Python", "Programming"],
    roles: [
      "AI Engineer",
      "ML Engineer",
      "Backend AI Engineer",
      "Software Engineer",
    ],
    difficulty: "Easy",
    type: "conceptual",

    title: "Python Data Structures",

    question:
      "You are building a backend service that receives thousands of requests per second. Explain the differences between lists, tuples, sets, and dictionaries in Python. When would you choose each one?",

    expectedConcepts: [
      "mutability",
      "hashing",
      "lookup complexity",
      "use cases",
    ],

    followUp:
      "Suppose your dictionary contains millions of entries and you frequently need membership checks. What would you consider about memory usage and lookup performance?",

    tags: ["python", "data-structures"],
  },

  {
    id: "python-02",
    topic: "Python",
    skills: ["Python", "Programming"],
    roles: [
      "AI Engineer",
      "ML Engineer",
      "Backend AI Engineer",
      "Software Engineer",
    ],
    difficulty: "Medium",
    type: "problem-solving",

    title: "Python Performance",

    question:
      "A Python API is becoming slow as the amount of data increases. How would you identify the performance bottleneck before changing the implementation?",

    expectedConcepts: [
      "profiling",
      "complexity",
      "memory",
      "I/O",
      "benchmarking",
    ],

    followUp:
      "Imagine profiling shows that 80% of the execution time is spent inside a nested loop. What would you investigate next before rewriting the algorithm?",

    tags: ["python", "performance"],
  },

  // ============================================================
  // RAG
  // ============================================================

  {
    id: "rag-01",
    topic: "RAG",
    skills: ["RAG", "LLM", "AI"],
    roles: [
      "AI Engineer",
      "ML Engineer",
      "Backend AI Engineer",
    ],
    difficulty: "Medium",
    type: "system-design",

    title: "Designing a RAG Pipeline",

    question:
      "Design a Retrieval-Augmented Generation pipeline for a company that wants an LLM to answer questions using its internal documentation. Walk through the major components and explain why each is needed.",

    expectedConcepts: [
      "chunking",
      "embeddings",
      "vector database",
      "retrieval",
      "reranking",
      "generation",
    ],

    followUp:
      "Suppose the system retrieves five documents, but only one actually contains the answer. How would you improve retrieval quality without simply increasing the number of retrieved documents?",

    tags: ["rag", "retrieval", "llm"],
  },

  {
    id: "rag-02",
    topic: "RAG",
    skills: ["RAG", "LLM", "AI"],
    roles: [
      "AI Engineer",
      "ML Engineer",
    ],
    difficulty: "Hard",
    type: "architecture",

    title: "RAG at Scale",

    question:
      "Your RAG application now has 500 million document embeddings. Design an architecture that keeps retrieval latency low while allowing documents to be updated continuously.",

    expectedConcepts: [
      "indexing",
      "sharding",
      "partitioning",
      "approximate nearest neighbor search",
      "caching",
      "incremental updates",
    ],

    followUp:
      "Suppose 80% of queries target documents updated during the last 24 hours. How would you change your architecture to exploit that access pattern?",

    tags: ["rag", "scaling", "vector-search"],
  },

  // ============================================================
  // VECTOR DATABASES
  // ============================================================

  {
    id: "vector-01",
    topic: "Vector Databases",
    skills: [
      "Vector Databases",
      "RAG",
      "AI",
    ],
    roles: [
      "AI Engineer",
      "ML Engineer",
      "Backend AI Engineer",
    ],
    difficulty: "Medium",
    type: "architecture",

    title: "Vector Search",

    question:
      "Explain how approximate nearest-neighbor search works in a vector database and why it is generally preferred over brute-force comparison at large scale.",

    expectedConcepts: [
      "embeddings",
      "distance metrics",
      "ANN",
      "HNSW",
      "latency",
      "recall",
    ],

    followUp:
      "If you increase the search parameters to improve recall, what trade-offs might you introduce in latency and resource consumption?",

    tags: ["vectors", "ann", "hnsw"],
  },

  // ============================================================
  // SYSTEM DESIGN
  // ============================================================

  {
    id: "system-01",
    topic: "System Design",
    skills: [
      "System Design",
      "Backend",
      "Architecture",
    ],
    roles: [
      "AI Engineer",
      "Backend AI Engineer",
      "Backend Engineer",
      "Software Engineer",
      "Startup Engineer",
    ],
    difficulty: "Medium",
    type: "system-design",

    title: "Scalable API",

    question:
      "Design a backend API that needs to handle a rapidly growing number of users. Explain how you would approach scalability, reliability, caching, and failure handling.",

    expectedConcepts: [
      "load balancing",
      "horizontal scaling",
      "caching",
      "database",
      "queues",
      "fault tolerance",
    ],

    followUp:
      "Your service suddenly receives ten times its normal traffic. Which component do you expect to fail first, and how would you protect the rest of the system?",

    tags: ["system-design", "backend"],
  },

  {
    id: "system-02",
    topic: "System Design",
    skills: [
      "System Design",
      "Distributed Systems",
      "Backend",
    ],
    roles: [
      "Backend Engineer",
      "Backend AI Engineer",
      "Software Engineer",
      "AI Engineer",
    ],
    difficulty: "Hard",
    type: "architecture",

    title: "Distributed Architecture",

    question:
      "Design a distributed service where multiple components process requests asynchronously. How would you handle retries, duplicate messages, failures, and consistency?",

    expectedConcepts: [
      "message queues",
      "idempotency",
      "retries",
      "dead-letter queues",
      "eventual consistency",
    ],

    followUp:
      "If a message is successfully processed but the acknowledgement is lost, how would your system prevent the operation from being performed twice?",

    tags: ["distributed-systems", "architecture"],
  },

  // ============================================================
  // REACT
  // ============================================================

  {
    id: "react-01",
    topic: "React",
    skills: [
      "React",
      "JavaScript",
      "Frontend",
    ],
    roles: [
      "Frontend Engineer",
      "Full Stack Engineer",
      "Software Engineer",
      "Startup Engineer",
    ],
    difficulty: "Medium",
    type: "conceptual",

    title: "React State Management",

    question:
      "Explain how React state and props differ. When would you use local component state, Context, or another state management solution?",

    expectedConcepts: [
      "state",
      "props",
      "component ownership",
      "context",
      "rerendering",
    ],

    followUp:
      "Suppose changing one Context value causes hundreds of components to rerender. How would you diagnose and reduce unnecessary renders?",

    tags: ["react", "frontend"],
  },

  {
    id: "react-02",
    topic: "React",
    skills: [
      "React",
      "JavaScript",
      "Frontend",
    ],
    roles: [
      "Frontend Engineer",
      "Full Stack Engineer",
      "Software Engineer",
    ],
    difficulty: "Hard",
    type: "problem-solving",

    title: "React Performance",

    question:
      "A React application becomes noticeably slow when rendering a large list. Walk through the steps you would take to identify and solve the performance problem.",

    expectedConcepts: [
      "profiling",
      "memoization",
      "virtualization",
      "keys",
      "unnecessary renders",
    ],

    followUp:
      "If memoization does not improve the performance, what would you investigate next?",

    tags: ["react", "performance"],
  },

  // ============================================================
  // DSA
  // ============================================================

  {
    id: "dsa-01",
    topic: "DSA",
    skills: [
      "DSA",
      "Algorithms",
      "Data Structures",
    ],
    roles: [
      "Software Engineer",
      "Backend Engineer",
      "Frontend Engineer",
      "AI Engineer",
    ],
    difficulty: "Medium",
    type: "problem-solving",

    title: "Hashing",

    question:
      "Given an array of integers and a target value, explain how you would find two numbers whose sum equals the target. Discuss both a brute-force solution and an optimized approach.",

    expectedConcepts: [
      "nested loops",
      "hash map",
      "time complexity",
      "space complexity",
    ],

    followUp:
      "What changes if the input array is already sorted and you are not allowed to use additional memory proportional to the input size?",

    tags: ["dsa", "hashing", "arrays"],
  },

  {
    id: "dsa-02",
    topic: "DSA",
    skills: [
      "DSA",
      "Algorithms",
      "Data Structures",
    ],
    roles: [
      "Software Engineer",
      "Backend Engineer",
      "AI Engineer",
    ],
    difficulty: "Hard",
    type: "problem-solving",

    title: "Algorithmic Trade-offs",

    question:
      "You have an algorithm with O(n²) time complexity that works well for small inputs. How would you determine whether optimizing it is actually necessary?",

    expectedConcepts: [
      "constraints",
      "benchmarking",
      "complexity",
      "input size",
      "trade-offs",
    ],

    followUp:
      "If the input size suddenly grows from 10,000 to 10 million elements, how would the feasibility of your solution change?",

    tags: ["dsa", "complexity"],
  },

  // ============================================================
  // MACHINE LEARNING
  // ============================================================

  {
    id: "ml-01",
    topic: "Machine Learning",
    skills: [
      "Machine Learning",
      "ML",
      "AI",
    ],
    roles: [
      "ML Engineer",
      "AI Engineer",
      "Data Scientist",
    ],
    difficulty: "Medium",
    type: "conceptual",

    title: "Overfitting",

    question:
      "What is overfitting in machine learning? Explain how you would detect it and describe several techniques for reducing it.",

    expectedConcepts: [
      "training error",
      "validation error",
      "regularization",
      "cross-validation",
      "data augmentation",
    ],

    followUp:
      "Suppose your training accuracy is 99% but validation accuracy is 72%. What experiments would you run to determine the root cause?",

    tags: ["ml", "overfitting"],
  },

  // ============================================================
  // DEPLOYMENT
  // ============================================================

  {
    id: "deployment-01",
    topic: "Deployment",
    skills: [
      "Deployment",
      "DevOps",
      "Cloud",
    ],
    roles: [
      "AI Engineer",
      "Backend Engineer",
      "DevOps Engineer",
      "Startup Engineer",
    ],
    difficulty: "Medium",
    type: "architecture",

    title: "Production Deployment",

    question:
      "You have developed an AI-powered web application locally. Explain how you would take it from development to production while keeping deployments reliable and reversible.",

    expectedConcepts: [
      "CI/CD",
      "containers",
      "environment variables",
      "monitoring",
      "logging",
      "rollback",
    ],

    followUp:
      "A deployment passes all automated tests but causes production latency to double. How would you detect, investigate, and safely roll back the release?",

    tags: ["deployment", "devops"],
  },

  // ============================================================
  // AI AGENTS / MCP
  // ============================================================

  {
    id: "agents-01",
    topic: "AI Agents",
    skills: [
      "AI Agents",
      "LLM",
      "MCP",
    ],
    roles: [
      "AI Engineer",
      "ML Engineer",
      "Backend AI Engineer",
    ],
    difficulty: "Medium",
    type: "architecture",

    title: "AI Agent Architecture",

    question:
      "Design an AI agent that can reason about a task, choose tools, execute actions, and use the results to continue solving the task. What components would you include?",

    expectedConcepts: [
      "LLM",
      "tool calling",
      "planning",
      "memory",
      "execution",
      "feedback",
    ],

    followUp:
      "What happens if the agent repeatedly chooses the wrong tool? How would you design safeguards against infinite or incorrect tool usage?",

    tags: ["agents", "llm", "mcp"],
  },

  // ============================================================
  // SECURITY
  // ============================================================

  {
    id: "security-01",
    topic: "AI Security",
    skills: [
      "AI Security",
      "LLM",
      "Cybersecurity",
    ],
    roles: [
      "AI Engineer",
      "Backend AI Engineer",
      "Security Engineer",
    ],
    difficulty: "Hard",
    type: "security",

    title: "Prompt Injection",

    question:
      "An LLM application retrieves untrusted documents before generating an answer. Explain how prompt injection could occur and how you would design the system to reduce the risk.",

    expectedConcepts: [
      "untrusted input",
      "instruction hierarchy",
      "input isolation",
      "tool permissions",
      "validation",
    ],

    followUp:
      "If an injected instruction attempts to make the model call a privileged tool, what architectural boundary should prevent that action?",

    tags: ["security", "llm", "prompt-injection"],
  },
];