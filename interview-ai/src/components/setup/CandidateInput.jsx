const CandidateInput = ({
  value,
  onChange,

  educationLevel = "",
  onEducationLevelChange,

  degree = "",
  onDegreeChange,

  fieldOfStudy = "",
  onFieldOfStudyChange,

  institution = "",
  onInstitutionChange,

  graduationYear = "",
  onGraduationYearChange,
}) => {
  return (
    <div className="space-y-5">
      {/* Candidate Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">
          Candidate Name
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your name"
            className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Education */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-300">
          Education
        </label>

        {/* Education Level + Degree */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={educationLevel}
            onChange={(e) =>
              onEducationLevelChange(e.target.value)
            }
            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          >
            <option value="">Education Level</option>
            <option value="High School">High School</option>
            <option value="Diploma">Diploma</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={degree}
            onChange={(e) =>
              onDegreeChange(e.target.value)
            }
            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          >
            <option value="">Degree / Program</option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.E.">B.E.</option>
            <option value="BCA">BCA</option>
            <option value="B.Sc">B.Sc</option>
            <option value="MCA">MCA</option>
            <option value="M.Tech">M.Tech</option>
            <option value="M.E.">M.E.</option>
            <option value="M.Sc">M.Sc</option>
            <option value="MBA">MBA</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Field of Study */}
        <select
          value={fieldOfStudy}
          onChange={(e) =>
            onFieldOfStudyChange(e.target.value)
          }
          className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="">Field of Study</option>
          <option value="Computer Science">
            Computer Science
          </option>
          <option value="Information Technology">
            Information Technology
          </option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Data Science">
            Data Science
          </option>
          <option value="Electronics & Communication">
            Electronics & Communication
          </option>
          <option value="Electrical Engineering">
            Electrical Engineering
          </option>
          <option value="Mechanical Engineering">
            Mechanical Engineering
          </option>
          <option value="Civil Engineering">
            Civil Engineering
          </option>
          <option value="Other">Other</option>
        </select>

        {/* Institution */}
        <input
          type="text"
          value={institution}
          onChange={(e) =>
            onInstitutionChange(e.target.value)
          }
          placeholder="College / University"
          className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
        />

        {/* Graduation Year */}
        <select
          value={graduationYear}
          onChange={(e) =>
            onGraduationYearChange(e.target.value)
          }
          className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="">Graduation Year</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default CandidateInput;