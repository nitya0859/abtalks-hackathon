import { useInterview } from "../../context/InterviewContext";

const interviewTypeLabels = {
  recommended: "Recommended",
  "technical-deep-dive": "Technical Deep Dive",
  dsa: "DSA & Problem Solving",
  "system-design": "System Design",
  project: "Project-Based",
  rapid: "Rapid Technical Screening",
  custom: "Custom Interview",
};

const CandidateCard = () => {
  const {
    candidateName,
    degree,
    fieldOfStudy,
    institution,
    graduationYear,
    role,
    customRole,
    difficulty,
    selectedTopics,
    customSkills,
    interviewType,
  } = useInterview();

  // Use custom role when "Other" is selected
  const effectiveRole =
    role === "Other"
      ? customRole
      : role;

  // Combine selected predefined skills + custom skills
  const allSelectedSkills = [
    ...(Array.isArray(selectedTopics)
      ? selectedTopics
      : []),
    ...(Array.isArray(customSkills)
      ? customSkills
      : []),
  ];

  // Candidate initials
  const initials = candidateName
    ? candidateName
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "C";

  const interviewTypeLabel =
    interviewTypeLabels[interviewType] ||
    "Technical Interview";

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">

      {/* Candidate Header */}
      <div className="flex items-center gap-3">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-purple-900/30 flex-shrink-0">
          {initials}
        </div>

        {/* Candidate Information */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-white truncate">
            {candidateName || "Candidate"}
          </h3>

          <p className="text-xs text-slate-400 truncate">
            {effectiveRole || "Technical Role"}
          </p>
        </div>

        {/* Difficulty */}
        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 flex-shrink-0">
          {difficulty || "Medium"}
        </span>
      </div>

      {/* Education */}
      {(degree ||
        fieldOfStudy ||
        institution ||
        graduationYear) && (
        <div className="mt-4 pt-3 border-t border-slate-800/70">

          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
            Education
          </p>

          {(degree || fieldOfStudy) && (
            <p className="text-xs text-slate-300">
              {[degree, fieldOfStudy]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}

          {institution && (
            <p className="text-[11px] text-slate-500 truncate mt-1">
              {institution}
              {graduationYear
                ? ` · ${graduationYear}`
                : ""}
            </p>
          )}
        </div>
      )}

      {/* Interview Configuration */}
      <div className="mt-4 pt-3 border-t border-slate-800/70">

        <div className="flex items-center justify-between gap-2">

          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Interview
          </p>

          <span className="text-[10px] text-purple-300 truncate">
            {interviewTypeLabel}
          </span>

        </div>

        {/* Skills */}
        {allSelectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">

            {allSelectedSkills
              .slice(0, 5)
              .map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-[10px] text-slate-400"
                >
                  {skill}
                </span>
              ))}

            {allSelectedSkills.length > 5 && (
              <span className="px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300">
                +{allSelectedSkills.length - 5}
              </span>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default CandidateCard;