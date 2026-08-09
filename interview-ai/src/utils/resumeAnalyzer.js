// src/utils/resumeAnalyzer.js

// ============================================================
// RESUME ANALYZER
// ============================================================
// Converts extracted resume text into a structured candidate
// profile that Setup.jsx can use for autofill.
//
// No API / backend required.
// ============================================================


// ============================================================
// NORMALIZATION
// ============================================================

const normalizeText = (text = "") => {
  return String(text)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const cleanLine = (line = "") => {
  return line
    .replace(/[|•●▪◦]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const getLines = (text = "") => {
  return text
    .split("\n")
    .map(cleanLine)
    .filter(Boolean);
};


// ============================================================
// HELPERS
// ============================================================

const normalizeForMatch = (value = "") => {
  return value
    .toLowerCase()
    .replace(/[^\w\s+#./&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const containsAny = (text, keywords = []) => {
  const lower = text.toLowerCase();

  return keywords.some((keyword) =>
    lower.includes(keyword.toLowerCase())
  );
};

const cleanExtractedValue = (value = "") => {
  return value
    .replace(/^[\s:–—-]+/, "")
    .replace(/[\s|]+$/, "")
    .trim();
};


// ============================================================
// NAME DETECTION
// ============================================================

const isProbablyName = (value = "") => {
  const name = cleanExtractedValue(value);

  if (!name) {
    return false;
  }

  const lower = name.toLowerCase();

  // Obvious non-name content
  const blockedWords = [
    "resume",
    "curriculum vitae",
    "cv",
    "portfolio",
    "linkedin",
    "github",
    "email",
    "phone",
    "contact",
    "objective",
    "summary",
    "profile",
    "education",
    "experience",
    "skills",
    "projects",
    "project",
    "certifications",
    "certificate",
    "achievements",
    "activities",
    "interests",
    "references",
    "address",
    "objective",
    "developer",
    "engineer",
    "student",
    "software",
    "computer",
    "technology",
    "university",
    "college",
    "institute",
  ];

  if (
    blockedWords.some((word) =>
      lower.includes(word)
    )
  ) {
    return false;
  }

  // Email / URL / phone
  if (
    name.includes("@") ||
    /https?:\/\//i.test(name) ||
    /www\./i.test(name) ||
    /\+?\d[\d\s().-]{7,}/.test(name)
  ) {
    return false;
  }

  // Names usually contain 2–5 words
  const words = name.split(/\s+/);

  if (
    words.length < 2 ||
    words.length > 5
  ) {
    return false;
  }

  // Don't accept extremely long "names"
  if (name.length > 60) {
    return false;
  }

  return words.every((word) =>
    /^[A-Za-z.'-]+$/.test(word)
  );
};


// ============================================================
// NAME DETECTION
// ============================================================

const extractCandidateName = (text) => {
  const lines = getLines(text);

  // ----------------------------------------------------------
  // 1. Explicit name labels
  // ----------------------------------------------------------

  const explicitPatterns = [
    /^(?:full\s*name|candidate\s*name|name)\s*[:\-]\s*(.+)$/i,
    /^candidate\s*[:\-]\s*(.+)$/i,
  ];

  for (const line of lines) {
    for (const pattern of explicitPatterns) {
      const match = line.match(pattern);

      if (match?.[1]) {
        const candidate = cleanExtractedValue(
          match[1]
        );

        if (isProbablyName(candidate)) {
          return candidate;
        }
      }
    }
  }

  // ----------------------------------------------------------
  // 2. Name before contact information
  // ----------------------------------------------------------

  const contactIndex = lines.findIndex((line) =>
    /@|linkedin|github|\+?\d[\d\s().-]{7,}/i.test(
      line
    )
  );

  if (contactIndex > 0) {
    const candidates = lines.slice(
      Math.max(0, contactIndex - 5),
      contactIndex
    );

    for (let i = candidates.length - 1; i >= 0; i--) {
      if (isProbablyName(candidates[i])) {
        return candidates[i];
      }
    }
  }

  // ----------------------------------------------------------
  // 3. First useful lines of resume
  // ----------------------------------------------------------

  for (const line of lines.slice(0, 12)) {
    if (isProbablyName(line)) {
      return line;
    }
  }

  return "";
};


// ============================================================
// EDUCATION LEVEL
// ============================================================

const extractEducationLevel = (text) => {
  const lower = text.toLowerCase();

  if (
    /\b(ph\.?\s*d|phd|doctorate|doctoral)\b/.test(
      lower
    )
  ) {
    return "Doctorate";
  }

  if (
    /\b(master'?s|m\.?\s*tech|m\.?\s*e\.|mca|mba|m\.?\s*sc|postgraduate)\b/.test(
      lower
    )
  ) {
    return "Postgraduate";
  }

  if (
    /\b(b\.?\s*tech|b\.?\s*e\.?|bca|b\.?\s*sc|bba|bachelor'?s|undergraduate)\b/.test(
      lower
    )
  ) {
    return "Undergraduate";
  }

  if (
    /\b(diploma|polytechnic)\b/.test(
      lower
    )
  ) {
    return "Diploma";
  }

  return "";
};


// ============================================================
// DEGREE
// ============================================================

const extractDegree = (text) => {
  const patterns = [
    {
      regex: /\bb\.?\s*tech\b/i,
      value: "B.Tech",
    },
    {
      regex: /\bb\.?\s*e\.?\b/i,
      value: "B.E.",
    },
    {
      regex: /\bm\.?\s*tech\b/i,
      value: "M.Tech",
    },
    {
      regex: /\bm\.?\s*e\.?\b/i,
      value: "M.E.",
    },
    {
      regex: /\bbca\b/i,
      value: "BCA",
    },
    {
      regex: /\bmca\b/i,
      value: "MCA",
    },
    {
      regex: /\bmba\b/i,
      value: "MBA",
    },
    {
      regex: /\bb\.?\s*sc\b/i,
      value: "B.Sc",
    },
    {
      regex: /\bm\.?\s*sc\b/i,
      value: "M.Sc",
    },
    {
      regex: /\bbba\b/i,
      value: "BBA",
    },
    {
      regex: /\bph\.?\s*d\b/i,
      value: "Ph.D",
    },
    {
      regex: /\bdiploma\b/i,
      value: "Diploma",
    },
  ];

  for (const item of patterns) {
    if (item.regex.test(text)) {
      return item.value;
    }
  }

  return "";
};


// ============================================================
// FIELD OF STUDY
// ============================================================

const extractFieldOfStudy = (text) => {
  const lower = text.toLowerCase();

  const fields = [
    {
      keywords: [
        "computer science and engineering",
        "computer science & engineering",
        "computer science",
        "computer engineering",
        "computer technology",
        "cse",
      ],
      value: "Computer Science",
    },

    {
      keywords: [
        "information technology",
        "information systems",
        "information science",
        "it engineering",
      ],
      value: "Information Technology",
    },

    {
      keywords: [
        "electronics and communication",
        "electronics & communication",
        "electronics communication",
        "electronics engineering",
        "ece",
      ],
      value: "Electronics & Communication",
    },

    {
      keywords: [
        "electrical engineering",
        "electrical and electronics",
        "eee",
      ],
      value: "Electrical Engineering",
    },

    {
      keywords: [
        "mechanical engineering",
        "mechanical",
      ],
      value: "Mechanical Engineering",
    },

    {
      keywords: [
        "civil engineering",
        "civil",
      ],
      value: "Civil Engineering",
    },

    {
      keywords: [
        "data science",
        "data analytics",
      ],
      value: "Data Science",
    },

    {
      keywords: [
        "artificial intelligence and machine learning",
        "artificial intelligence & machine learning",
        "artificial intelligence",
        "ai & ml",
        "aiml",
      ],
      value: "Artificial Intelligence",
    },

    {
      keywords: [
        "biotechnology",
        "bio technology",
      ],
      value: "Biotechnology",
    },

    {
      keywords: [
        "chemical engineering",
      ],
      value: "Chemical Engineering",
    },

    {
      keywords: [
        "aerospace engineering",
      ],
      value: "Aerospace Engineering",
    },
  ];

  for (const field of fields) {
    if (
      field.keywords.some((keyword) =>
        lower.includes(keyword)
      )
    ) {
      return field.value;
    }
  }

  return "";
};


// ============================================================
// INSTITUTION
// ============================================================

const isValidInstitution = (value = "") => {
  const institution = cleanExtractedValue(
    value
  );

  if (
    institution.length < 5 ||
    institution.length > 180
  ) {
    return false;
  }

  const lower =
    institution.toLowerCase();

  // Reject obvious section labels
  if (
    [
      "education",
      "experience",
      "skills",
      "projects",
      "certifications",
      "achievements",
      "summary",
      "profile",
    ].includes(lower)
  ) {
    return false;
  }

  // An institution should normally contain one
  // of these indicators OR look like a formal name.
  const hasInstitutionKeyword =
    /university|college|institute|school|academy|technology|engineering|campus/i.test(
      institution
    );

  return hasInstitutionKeyword;
};

const extractInstitution = (text) => {
  const lines = getLines(text);

  // ----------------------------------------------------------
  // 1. Explicit labels
  // ----------------------------------------------------------

  const explicitPatterns = [
    /^(?:college|university|institution|school)\s*[:\-]\s*(.+)$/i,

    /^(?:college\/university)\s*[:\-]\s*(.+)$/i,

    /^(?:education|educational institution)\s*[:\-]\s*(.+)$/i,

    /(?:studying|pursuing|enrolled|currently studying|currently pursuing).*?(?:at|from)\s+(.+)/i,

    /(?:graduated|graduating|degree).*?(?:from|at)\s+(.+)/i,
  ];

  for (const line of lines) {
    for (const pattern of explicitPatterns) {
      const match = line.match(pattern);

      if (match?.[1]) {
        const value = cleanExtractedValue(
          match[1]
        );

        if (isValidInstitution(value)) {
          return value;
        }
      }
    }
  }

  // ----------------------------------------------------------
  // 2. Search for institution-looking lines
  // ----------------------------------------------------------

  for (const line of lines) {
    if (
      isValidInstitution(line)
    ) {
      // Avoid URLs and contact lines
      if (
        line.includes("@") ||
        /https?:\/\//i.test(line) ||
        /linkedin|github/i.test(line)
      ) {
        continue;
      }

      return line;
    }
  }

  // ----------------------------------------------------------
  // 3. Handle lines where degree and institution
  //    appear together.
  //
  // Example:
  // B.Tech Computer Science
  // ABES Engineering College, Ghaziabad
  // ----------------------------------------------------------

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (
      /\bb\.?\s*tech\b|\bb\.?\s*e\.?\b|\bm\.?\s*tech\b|\bm\.?\s*e\.?\b|\bbca\b|\bmca\b|\bmba\b/i.test(
        line
      )
    ) {
      const nextLine =
        lines[i + 1];

      if (
        nextLine &&
        isValidInstitution(nextLine)
      ) {
        return nextLine;
      }
    }
  }

  return "";
};


// ============================================================
// GRADUATION YEAR
// ============================================================

const extractGraduationYear = (text) => {
  // ----------------------------------------------------------
  // 1. Explicit graduation patterns
  // ----------------------------------------------------------

  const explicitPatterns = [
    /(?:expected\s+graduation|expected\s+to\s+graduate|graduation\s+year|graduating\s+year|graduating|graduation|passing\s+year|completion\s+year)[^\d]{0,40}(20\d{2})/i,

    /(?:class\s+of|batch\s+of)[^\d]{0,15}(20\d{2})/i,

    /(?:20\d{2})\s*[-–—]\s*(?:present|current)/i,
  ];

  for (const pattern of explicitPatterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  // ----------------------------------------------------------
  // 2. Look for academic date ranges
  // Example: 2023 - 2027
  // ----------------------------------------------------------

  const ranges = [
    ...text.matchAll(
      /\b(20\d{2})\s*[-–—]\s*(20\d{2})\b/g
    ),
  ];

  if (ranges.length > 0) {
    const possibleYears = [];

    for (const match of ranges) {
      const start = Number(match[1]);
      const end = Number(match[2]);

      if (
        start >= 2000 &&
        end >= start &&
        end <= 2035
      ) {
        possibleYears.push(end);
      }
    }

    if (possibleYears.length > 0) {
      return String(
        Math.max(...possibleYears)
      );
    }
  }

  // ----------------------------------------------------------
  // 3. General recent-year detection
  // ----------------------------------------------------------

  const years = [
    ...text.matchAll(
      /\b(20[2-3]\d)\b/g
    ),
  ].map((match) =>
    Number(match[1])
  );

  const validYears =
    years.filter(
      (year) =>
        year >= 2024 &&
        year <= 2035
    );

  if (validYears.length > 0) {
    return String(
      Math.max(...validYears)
    );
  }

  return "";
};


// ============================================================
// SKILL DATABASE
// ============================================================

const SKILL_DATABASE = [
  // ----------------------------------------------------------
  // CORE CS
  // ----------------------------------------------------------

  {
    label: "Data Structures & Algorithms",
    keywords: [
      "data structures",
      "algorithms",
      "dsa",
      "problem solving",
      "competitive programming",
    ],
  },

  {
    label: "Object-Oriented Programming",
    keywords: [
      "object oriented",
      "object-oriented",
      "oop",
      "oops",
    ],
  },

  {
    label: "Operating Systems",
    keywords: [
      "operating systems",
      "os concepts",
      "process scheduling",
      "deadlock",
    ],
  },

  {
    label: "Computer Networks",
    keywords: [
      "computer networks",
      "networking",
      "tcp/ip",
      "http",
      "dns",
    ],
  },

  {
    label: "DBMS",
    keywords: [
      "dbms",
      "database management",
      "sql",
      "mysql",
      "postgresql",
      "mongodb",
      "database",
    ],
  },

  {
    label: "Computer Architecture",
    keywords: [
      "computer architecture",
      "computer organization",
      "cpu",
      "memory architecture",
    ],
  },

  {
    label: "Software Engineering",
    keywords: [
      "software engineering",
      "software development",
      "software lifecycle",
      "agile",
      "scrum",
    ],
  },

  // ----------------------------------------------------------
  // WEB DEVELOPMENT
  // ----------------------------------------------------------

  {
    label: "HTML/CSS",
    keywords: [
      "html",
      "html5",
      "css",
      "css3",
      "responsive design",
      "bootstrap",
      "tailwind",
    ],
  },

  {
    label: "JavaScript",
    keywords: [
      "javascript",
      "ecmascript",
    ],
  },

  {
    label: "TypeScript",
    keywords: [
      "typescript",
    ],
  },

  {
    label: "React",
    keywords: [
      "react.js",
      "reactjs",
      "react",
      "jsx",
    ],
  },

  {
    label: "Next.js",
    keywords: [
      "next.js",
      "nextjs",
    ],
  },

  {
    label: "Node.js",
    keywords: [
      "node.js",
      "nodejs",
      "node",
    ],
  },

  {
    label: "REST APIs",
    keywords: [
      "rest api",
      "restful api",
      "rest apis",
      "api development",
    ],
  },

  {
    label: "GraphQL",
    keywords: [
      "graphql",
    ],
  },

  // ----------------------------------------------------------
  // AI / ML
  // ----------------------------------------------------------

  {
    label: "Machine Learning",
    keywords: [
      "machine learning",
      "scikit-learn",
      "sklearn",
    ],
  },

  {
    label: "Deep Learning",
    keywords: [
      "deep learning",
      "neural networks",
      "tensorflow",
      "pytorch",
    ],
  },

  {
    label: "NLP",
    keywords: [
      "natural language processing",
      "nlp",
      "text classification",
      "language models",
    ],
  },

  {
    label: "Computer Vision",
    keywords: [
      "computer vision",
      "opencv",
      "image processing",
    ],
  },

  {
    label: "Generative AI",
    keywords: [
      "generative ai",
      "genai",
      "generative artificial intelligence",
    ],
  },

  {
    label: "LLMs",
    keywords: [
      "llm",
      "llms",
      "large language model",
      "large language models",
      "gpt",
      "gemini",
      "claude",
    ],
  },

  {
    label: "Prompt Engineering",
    keywords: [
      "prompt engineering",
      "prompt design",
    ],
  },

  {
    label: "RAG",
    keywords: [
      "rag",
      "retrieval augmented generation",
    ],
  },

  {
    label: "Vector Databases",
    keywords: [
      "vector database",
      "vector databases",
      "pinecone",
      "chroma",
      "weaviate",
      "faiss",
    ],
  },

  {
    label: "AI Agents",
    keywords: [
      "ai agents",
      "ai agent",
      "autonomous agents",
      "agentic ai",
    ],
  },

  {
    label: "MCP",
    keywords: [
      "model context protocol",
      "mcp",
    ],
  },

  // ----------------------------------------------------------
  // ENGINEERING
  // ----------------------------------------------------------

  {
    label: "System Design",
    keywords: [
      "system design",
      "architecture design",
      "software architecture",
    ],
  },

  {
    label: "Distributed Systems",
    keywords: [
      "distributed systems",
      "distributed system",
    ],
  },

  {
    label: "Microservices",
    keywords: [
      "microservices",
      "microservice architecture",
    ],
  },

  {
    label: "Cloud",
    keywords: [
      "aws",
      "azure",
      "gcp",
      "cloud computing",
      "cloud",
    ],
  },

  {
    label: "DevOps",
    keywords: [
      "devops",
      "continuous integration",
      "continuous deployment",
    ],
  },

  {
    label: "Docker",
    keywords: [
      "docker",
      "containerization",
      "containers",
    ],
  },

  {
    label: "Kubernetes",
    keywords: [
      "kubernetes",
      "k8s",
    ],
  },

  {
    label: "CI/CD",
    keywords: [
      "ci/cd",
      "cicd",
      "github actions",
      "jenkins",
      "continuous integration",
    ],
  },

  // ----------------------------------------------------------
  // PROGRAMMING
  // ----------------------------------------------------------

  {
    label: "C++",
    keywords: [
      "c++",
      "cpp",
    ],
  },

  {
    label: "Java",
    keywords: [
      "java",
    ],
  },

  {
    label: "Python",
    keywords: [
      "python",
    ],
  },

  {
    label: "JavaScript",
    keywords: [
      "javascript",
      "ecmascript",
    ],
  },

  {
    label: "Go",
    keywords: [
      "golang",
      "go language",
    ],
  },

  {
    label: "Rust",
    keywords: [
      "rust programming",
      "rust language",
    ],
  },
];


// ============================================================
// SKILL EXTRACTION
// ============================================================

const extractSkills = (text) => {
  const lower = normalizeForMatch(text);

  const detectedSkills = [];

  for (const skill of SKILL_DATABASE) {
    const found =
      skill.keywords.some((keyword) => {
        const normalizedKeyword =
          normalizeForMatch(keyword);

        // Exact phrase matching
        if (
          lower.includes(
            normalizedKeyword
          )
        ) {
          return true;
        }

        return false;
      });

    if (found) {
      // Prevent duplicate labels
      if (
        !detectedSkills.includes(
          skill.label
        )
      ) {
        detectedSkills.push(
          skill.label
        );
      }
    }
  }

  // Keep the UI useful without
  // overwhelming it.
  return detectedSkills.slice(0, 15);
};


// ============================================================
// PROJECT EXTRACTION
// ============================================================

const extractProjects = (text) => {
  const lines = getLines(text);

  const projects = [];

  let insideProjects = false;

  const projectHeaders = [
    "projects",
    "project",
    "academic projects",
    "academic project",
    "personal projects",
    "personal project",
  ];

  const stopHeaders = [
    "experience",
    "work experience",
    "professional experience",
    "education",
    "skills",
    "technical skills",
    "certifications",
    "achievements",
    "activities",
    "interests",
    "references",
  ];

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (
      projectHeaders.includes(lower)
    ) {
      insideProjects = true;
      continue;
    }

    if (
      insideProjects &&
      stopHeaders.includes(lower)
    ) {
      insideProjects = false;
      continue;
    }

    if (
      insideProjects &&
      line.length >= 5 &&
      line.length <= 180
    ) {
      if (
        !lower.includes("github") &&
        !lower.includes("linkedin") &&
        !lower.includes("email")
      ) {
        projects.push(line);
      }
    }
  }

  return projects.slice(0, 8);
};


// ============================================================
// EXPERIENCE EXTRACTION
// ============================================================

const extractExperience = (text) => {
  const lines = getLines(text);

  const experience = [];

  let insideExperience = false;

  const experienceHeaders = [
    "experience",
    "work experience",
    "professional experience",
    "internships",
    "internship",
  ];

  const stopHeaders = [
    "education",
    "projects",
    "project",
    "skills",
    "technical skills",
    "certifications",
    "achievements",
    "activities",
    "interests",
    "references",
  ];

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (
      experienceHeaders.includes(lower)
    ) {
      insideExperience = true;
      continue;
    }

    if (
      insideExperience &&
      stopHeaders.includes(lower)
    ) {
      insideExperience = false;
      continue;
    }

    if (
      insideExperience &&
      line.length >= 5 &&
      line.length <= 180
    ) {
      experience.push(line);
    }
  }

  return experience.slice(0, 10);
};


// ============================================================
// ROLE DETECTION
// ============================================================

const extractSuggestedRole = (
  text,
  skills = []
) => {
  const lower = text.toLowerCase();

  // ----------------------------------------------------------
  // Explicit role titles
  // ----------------------------------------------------------

  const explicitRoles = [
    {
      keywords: [
        "full stack developer",
        "full-stack developer",
        "full stack engineer",
        "full-stack engineer",
      ],
      role: "Full Stack Developer",
    },

    {
      keywords: [
        "frontend developer",
        "front-end developer",
        "frontend engineer",
        "front end engineer",
      ],
      role: "Frontend Developer",
    },

    {
      keywords: [
        "backend developer",
        "back-end developer",
        "backend engineer",
        "back end engineer",
      ],
      role: "Backend Developer",
    },

    {
      keywords: [
        "software engineer",
        "software developer",
      ],
      role: "Software Engineer",
    },

    {
      keywords: [
        "machine learning engineer",
        "ml engineer",
      ],
      role: "ML Engineer",
    },

    {
      keywords: [
        "ai engineer",
        "artificial intelligence engineer",
      ],
      role: "AI Engineer",
    },

    {
      keywords: [
        "data scientist",
      ],
      role: "Data Scientist",
    },

    {
      keywords: [
        "data engineer",
      ],
      role: "Data Engineer",
    },

    {
      keywords: [
        "devops engineer",
      ],
      role: "DevOps Engineer",
    },

    {
      keywords: [
        "cloud engineer",
      ],
      role: "Cloud Engineer",
    },
  ];

  for (const item of explicitRoles) {
    if (
      item.keywords.some((keyword) =>
        lower.includes(keyword)
      )
    ) {
      return item.role;
    }
  }

  // ----------------------------------------------------------
  // Infer role from skills
  // ----------------------------------------------------------

  const hasReact =
    skills.includes("React");

  const hasNode =
    skills.includes("Node.js");

  const hasWeb =
    skills.includes("HTML/CSS") ||
    skills.includes("JavaScript");

  const hasML =
    skills.includes("Machine Learning");

  const hasAI =
    skills.includes("Generative AI") ||
    skills.includes("LLMs") ||
    skills.includes("AI Agents");

  const hasCloud =
    skills.includes("Cloud") ||
    skills.includes("Docker") ||
    skills.includes("Kubernetes");

  if (
    hasReact &&
    hasNode
  ) {
    return "Full Stack Developer";
  }

  if (
    hasAI &&
    !hasML
  ) {
    return "AI Engineer";
  }

  if (hasML) {
    return "ML Engineer";
  }

  if (
    hasReact ||
    hasWeb
  ) {
    return "Frontend Developer";
  }

  if (hasCloud) {
    return "DevOps Engineer";
  }

  if (
    skills.includes(
      "Data Structures & Algorithms"
    )
  ) {
    return "Software Engineer";
  }

  return "";
};


// ============================================================
// MAIN ANALYZER
// ============================================================

export const analyzeResume = (
  extractedText = ""
) => {
  const text =
    normalizeText(extractedText);

  // Empty resume
  if (!text) {
    return {
      candidateName: "",
      educationLevel: "",
      degree: "",
      fieldOfStudy: "",
      institution: "",
      graduationYear: "",
      skills: [],
      projects: [],
      experience: [],
      suggestedRole: "",
      rawText: "",
    };
  }

  const skills =
    extractSkills(text);

  const profile = {
    candidateName:
      extractCandidateName(text),

    educationLevel:
      extractEducationLevel(text),

    degree:
      extractDegree(text),

    fieldOfStudy:
      extractFieldOfStudy(text),

    institution:
      extractInstitution(text),

    graduationYear:
      extractGraduationYear(text),

    skills,

    projects:
      extractProjects(text),

    experience:
      extractExperience(text),

    suggestedRole:
      extractSuggestedRole(
        text,
        skills
      ),

    rawText: text,
  };

  console.log(
    "===================================="
  );

  console.log(
    "RESUME ANALYSIS RESULT"
  );

  console.log(
    "===================================="
  );

  console.log(
    "Name:",
    profile.candidateName
  );

  console.log(
    "Education:",
    profile.educationLevel
  );

  console.log(
    "Degree:",
    profile.degree
  );

  console.log(
    "Field:",
    profile.fieldOfStudy
  );

  console.log(
    "Institution:",
    profile.institution
  );

  console.log(
    "Graduation:",
    profile.graduationYear
  );

  console.log(
    "Skills:",
    profile.skills
  );

  console.log(
    "Suggested Role:",
    profile.suggestedRole
  );

  console.log(
    "===================================="
  );

  return profile;
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default analyzeResume;