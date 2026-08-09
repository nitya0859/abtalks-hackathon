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
    effectiveRole,
    difficulty,
    selectedTopics,
    customSkills,
    interviewType,
  } = useInterview();

  const allSelectedSkills = [
    ...(Array.isArray(selectedTopics)
      ? selectedTopics
      : []),
    ...(Array.isArray(customSkills)
      ? customSkills
      : []),
  ];

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
    <div
      className="
        rounded-2xl
        bg-[#faf8f3]
        border
        border-[#25231f]/10
        p-5
        shadow-[0_18px_45px_rgba(66,58,47,0.07)]
      "
    >
      {/* ==================================================
          CANDIDATE
      ================================================== */}

      <div className="flex items-center gap-3">
        {/* Avatar */}

        <div
          className="
            w-11
            h-11
            rounded-xl
            bg-[#292621]
            text-[#f6f1e8]
            flex
            items-center
            justify-center
            text-sm
            font-bold
            flex-shrink-0
          "
        >
          {initials}
        </div>

        {/* Name */}

        <div className="min-w-0 flex-1">
          <h3
            className="
              text-sm
              font-semibold
              text-[#25231f]
              truncate
            "
          >
            {candidateName || "Candidate"}
          </h3>

          <p
            className="
              text-[11px]
              text-[#777269]
              truncate
              mt-0.5
            "
          >
            {effectiveRole || "Technical Role"}
          </p>
        </div>

        {/* Difficulty */}

        <span
          className="
            px-2
            py-1
            rounded-lg
            bg-[#25231f]/5
            border
            border-[#25231f]/10
            text-[9px]
            font-bold
            uppercase
            tracking-wider
            text-[#625d55]
            flex-shrink-0
          "
        >
          {difficulty || "Medium"}
        </span>
      </div>

      {/* ==================================================
          EDUCATION
      ================================================== */}

      {(degree ||
        fieldOfStudy ||
        institution ||
        graduationYear) && (
        <div
          className="
            mt-5
            pt-4
            border-t
            border-[#25231f]/10
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.14em]
              font-bold
              text-[#aaa399]
              mb-2
            "
          >
            Education
          </p>

          {(degree || fieldOfStudy) && (
            <p
              className="
                text-xs
                font-medium
                text-[#403c35]
                leading-relaxed
              "
            >
              {[degree, fieldOfStudy]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}

          {institution && (
            <p
              className="
                text-[10px]
                text-[#777269]
                truncate
                mt-1
              "
            >
              {institution}

              {graduationYear
                ? ` · ${graduationYear}`
                : ""}
            </p>
          )}
        </div>
      )}

      {/* ==================================================
          INTERVIEW CONFIG
      ================================================== */}

      <div
        className="
          mt-5
          pt-4
          border-t
          border-[#25231f]/10
        "
      >
        <div className="flex items-center justify-between gap-2">
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.14em]
              font-bold
              text-[#aaa399]
            "
          >
            Interview
          </p>

          <span
            className="
              text-[9px]
              font-semibold
              text-[#625d55]
              truncate
            "
          >
            {interviewTypeLabel}
          </span>
        </div>

        {/* Skills */}

        {allSelectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {allSelectedSkills
              .slice(0, 5)
              .map((skill) => (
                <span
                  key={skill}
                  className="
                    px-2
                    py-1
                    rounded-lg
                    bg-[#25231f]/[0.035]
                    border
                    border-[#25231f]/10
                    text-[9px]
                    text-[#777269]
                  "
                >
                  {skill}
                </span>
              ))}

            {allSelectedSkills.length > 5 && (
              <span
                className="
                  px-2
                  py-1
                  rounded-lg
                  bg-[#25231f]/5
                  border
                  border-[#25231f]/10
                  text-[9px]
                  text-[#625d55]
                  font-semibold
                "
              >
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