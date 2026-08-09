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
  const handleAddCustomSkill = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const skill =
      event.target.value.trim();

    if (!skill) return;

    if (
      selectedTopics.includes(skill) ||
      customSkills.includes(skill)
    ) {
      event.target.value = "";
      return;
    }

    onAddCustomSkill?.(skill);

    event.target.value = "";
  };

  const totalSelected =
    selectedTopics.length +
    customSkills.length;

  return (
    <div className="evoke-focus">

      <div className="evoke-focus-categories">

        {Object.entries(
          skillCategories
        ).map(([category, skills]) => (
          <div
            key={category}
            className="evoke-skill-category"
          >
            <div className="evoke-category-title">
              <span>
                {category}
              </span>

              <span>
                {skills.length}
              </span>
            </div>

            <div className="evoke-skill-list">
              {skills.map((skill) => {
                const isSelected =
                  selectedTopics.includes(
                    skill
                  );

                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() =>
                      onToggle(skill)
                    }
                    className={`evoke-skill-pill ${
                      isSelected
                        ? "evoke-skill-selected"
                        : ""
                    }`}
                  >
                    {isSelected && (
                      <span className="evoke-skill-check">
                        ✓
                      </span>
                    )}

                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Custom */}
      <div className="evoke-custom-skill">
        <label>
          Add another skill
        </label>

        <input
          type="text"
          onKeyDown={
            handleAddCustomSkill
          }
          placeholder="Type a skill and press Enter..."
        />
      </div>

      {customSkills.length > 0 && (
        <div className="evoke-custom-chips">
          {customSkills.map((skill) => (
            <span key={skill}>
              {skill}

              <button
                type="button"
                onClick={() =>
                  onRemoveCustomSkill?.(
                    skill
                  )
                }
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="evoke-selected-count">
        <span className="evoke-count-line" />

        <span>
          {totalSelected} skill
          {totalSelected === 1
            ? ""
            : "s"}{" "}
          selected
        </span>

        <span className="evoke-count-line" />
      </div>
    </div>
  );
};

export default FocusSelector;