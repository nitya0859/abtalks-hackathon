const roles = [
  // Software Engineering
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

  // AI / ML
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

  // Systems / Infrastructure
  "DevOps Engineer",
  "Cloud Engineer",
  "Site Reliability Engineer",
  "Solutions Architect",
  "Systems Engineer",

  // Other
  "Startup Engineer",
  "Other",
];

const RoleSelect = ({
  value,
  onChange,
  customRole = "",
  onCustomRoleChange,
}) => {
  const isCustomRole = value === "Other";

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">
          Interview Role
        </label>

        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none transition-all duration-200 cursor-pointer"
          >
            <option
              value=""
              className="bg-slate-900 text-slate-100"
            >
              Select an interview role
            </option>

            <optgroup
              label="Software Engineering"
              className="bg-slate-900"
            >
              {roles
                .slice(0, 11)
                .map((role) => (
                  <option
                    key={role}
                    value={role}
                    className="bg-slate-900 text-slate-100"
                  >
                    {role}
                  </option>
                ))}
            </optgroup>

            <optgroup
              label="AI & Data"
              className="bg-slate-900"
            >
              {roles
                .slice(11, 22)
                .map((role) => (
                  <option
                    key={role}
                    value={role}
                    className="bg-slate-900 text-slate-100"
                  >
                    {role}
                  </option>
                ))}
            </optgroup>

            <optgroup
              label="Systems & Infrastructure"
              className="bg-slate-900"
            >
              {roles
                .slice(22, 27)
                .map((role) => (
                  <option
                    key={role}
                    value={role}
                    className="bg-slate-900 text-slate-100"
                  >
                    {role}
                  </option>
                ))}
            </optgroup>

            <option
              value="Other"
              className="bg-slate-900 text-slate-100"
            >
              Other
            </option>
          </select>

          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {isCustomRole && (
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-400">
            Your Interview Role
          </label>

          <input
            type="text"
            value={customRole}
            onChange={(e) =>
              onCustomRoleChange?.(e.target.value)
            }
            placeholder="e.g. Robotics Software Engineer"
            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>
      )}
    </div>
  );
};

export default RoleSelect;