const skillCategories = {
  "Core CS": [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Operating Systems",
    "Computer Networks",
    "DBMS",
    "Computer Architecture",
    "Software Engineering",
  ],

  "Web Development": [
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "REST APIs",
    "GraphQL",
  ],

  "AI / ML": [
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Generative AI",
    "LLMs",
    "Prompt Engineering",
    "RAG",
    "Vector Databases",
    "AI Agents",
    "MCP",
  ],

  Engineering: [
    "System Design",
    "Distributed Systems",
    "Microservices",
    "Cloud",
    "DevOps",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ],

  Programming: [
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "Go",
    "Rust",
  ],
};

const FocusSelector = ({
  selectedTopics = [],
  onToggle,
  customSkills = [],
  onAddCustomSkill,
  onRemoveCustomSkill,
}) => {
  const handleAddCustomSkill = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    const skill = e.target.value.trim();

    if (!skill) {
      return;
    }

    if (
      selectedTopics.includes(skill) ||
      customSkills.includes(skill)
    ) {
      e.target.value = "";
      return;
    }

    onAddCustomSkill?.(skill);

    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300">
          Interview Focus
        </label>

        <span className="text-xs text-slate-500">
          Select one or more
        </span>
      </div>

      {/* Skill Categories */}
      <div className="space-y-4">
        {Object.entries(skillCategories).map(
          ([category, skills]) => (
            <div
              key={category}
              className="space-y-2"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                {category}
              </p>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const isSelected =
                    selectedTopics.includes(skill);

                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() =>
                        onToggle(skill)
                      }
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600/20 border-indigo-500/80 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                          : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12l4 4L19 7"
                          />
                        </svg>
                      )}

                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>

      {/* Custom Skills */}
      <div className="space-y-2 pt-1">
        <label className="block text-xs font-medium text-slate-400">
          Add a custom skill
        </label>

        <input
          type="text"
          onKeyDown={handleAddCustomSkill}
          placeholder="Type a skill and press Enter..."
          className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
        />

        {/* Custom Skill Chips */}
        {customSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {customSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-purple-600/15 border border-purple-500/50 text-purple-300 flex items-center gap-2"
              >
                {skill}

                <button
                  type="button"
                  onClick={() =>
                    onRemoveCustomSkill?.(skill)
                  }
                  className="text-purple-400 hover:text-white transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Selected Count */}
      <div className="text-[11px] text-slate-500">
        {selectedTopics.length +
          customSkills.length}{" "}
        skill
        {selectedTopics.length +
          customSkills.length ===
        1
          ? ""
          : "s"}{" "}
        selected
      </div>
    </div>
  );
};

export default FocusSelector;