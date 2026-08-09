const roles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "React Developer",
  "JavaScript Developer",
  "TypeScript Developer",
  "Node.js Developer",
  "Python Developer",
  "Java Developer",
  "C++ Developer",

  "AI Engineer",
  "Backend AI Engineer",
  "ML Engineer",
  "Machine Learning Engineer",
  "Deep Learning Engineer",
  "Generative AI Engineer",
  "NLP Engineer",
  "Computer Vision Engineer",
  "MLOps Engineer",
  "Data Scientist",
  "Data Analyst",

  "DevOps Engineer",
  "Cloud Engineer",
  "Site Reliability Engineer",
  "Solutions Architect",
  "Systems Engineer",

  "Startup Engineer",
  "Other",
];

const RoleSelect = ({
  value,
  onChange,
  customRole = "",
  onCustomRoleChange,
}) => {
  const isCustomRole =
    value === "Other";

  return (
    <div className="evoke-role-select">

      <div className="evoke-select-wrap">

        <span className="evoke-select-prefix">
          ROLE
        </span>

        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
        >
          <option value="">
            Select an interview role
          </option>

          <optgroup label="Software Engineering">
            {roles
              .slice(0, 11)
              .map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              ))}
          </optgroup>

          <optgroup label="AI & Data">
            {roles
              .slice(11, 22)
              .map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              ))}
          </optgroup>

          <optgroup label="Systems & Infrastructure">
            {roles
              .slice(22, 27)
              .map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              ))}
          </optgroup>

          <option value="Startup Engineer">
            Startup Engineer
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <span className="evoke-select-arrow">
          ↓
        </span>
      </div>

      {isCustomRole && (
        <div className="evoke-custom-role">
          <label>
            Your Interview Role
          </label>

          <input
            type="text"
            value={customRole}
            onChange={(e) =>
              onCustomRoleChange?.(
                e.target.value
              )
            }
            placeholder="e.g. Robotics Software Engineer"
          />
        </div>
      )}
    </div>
  );
};

export default RoleSelect;