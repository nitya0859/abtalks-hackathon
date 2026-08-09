import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

import Logo from "../components/common/Logo";
import CandidateInput from "../components/setup/CandidateInput";
import ResumeUpload from "../components/setup/ResumeUpload";
import RoleSelect from "../components/setup/RoleSelect";
import DifficultySelector from "../components/setup/DifficultySelector";
import FocusSelector from "../components/setup/FocusSelector";

import { analyzeResume } from "../utils/resumeAnalyzer";


// ============================================================
// INTERVIEW TYPES
// ============================================================

const interviewTypes = [
  {
    id: "recommended",
    label: "Recommended",
    description:
      "AI-generated interview based on your profile, role and skills.",
  },

  {
    id: "technical-deep-dive",
    label: "Technical Deep Dive",
    description:
      "Go deeper into the technical skills you selected.",
  },

  {
    id: "dsa",
    label: "DSA & Problem Solving",
    description:
      "Focus on algorithms, data structures and problem solving.",
  },

  {
    id: "system-design",
    label: "System Design",
    description:
      "Focus on architecture, scalability and trade-offs.",
  },

  {
    id: "project",
    label: "Project-Based",
    description:
      "Discuss projects, implementation decisions and challenges.",
  },

  {
    id: "rapid",
    label: "Rapid Technical Screening",
    description:
      "A shorter interview covering multiple technical areas.",
  },

  {
    id: "custom",
    label: "Custom",
    description:
      "Tell the interviewer exactly what you want to be evaluated on.",
  },
];


// ============================================================
// SETUP COMPONENT
// ============================================================

const Setup = () => {
  const navigate = useNavigate();

  const { setupInterview } =
    useInterview();


  // ============================================================
  // CANDIDATE PROFILE
  // ============================================================

  const [
    candidateName,
    setCandidateName,
  ] = useState("");

  const [
    educationLevel,
    setEducationLevel,
  ] = useState("");

  const [
    degree,
    setDegree,
  ] = useState("");

  const [
    fieldOfStudy,
    setFieldOfStudy,
  ] = useState("");

  const [
    institution,
    setInstitution,
  ] = useState("");

  const [
    graduationYear,
    setGraduationYear,
  ] = useState("");


  // ============================================================
  // RESUME
  // ============================================================

  const [
    resumeFile,
    setResumeFile,
  ] = useState(null);

  const [
    resumeText,
    setResumeText,
  ] = useState("");


  // ============================================================
  // INTERVIEW CONFIGURATION
  // ============================================================

  const [
    role,
    setRole,
  ] = useState("");

  const [
    customRole,
    setCustomRole,
  ] = useState("");

  const [
    difficulty,
    setDifficulty,
  ] = useState("Medium");

  const [
    selectedTopics,
    setSelectedTopics,
  ] = useState([]);

  const [
    customSkills,
    setCustomSkills,
  ] = useState([]);

  const [
    interviewType,
    setInterviewType,
  ] = useState("");

  const [
    customInterviewPrompt,
    setCustomInterviewPrompt,
  ] = useState("");


  // ============================================================
  // UI STATE
  // ============================================================

  const [
    errorMsg,
    setErrorMsg,
  ] = useState("");

  const [
    profileExtracted,
    setProfileExtracted,
  ] = useState(false);


  // ============================================================
  // RESUME ANALYSIS
  // ============================================================

  const handleResumeTextExtracted = (
    text
  ) => {
    // Always store raw resume text
    setResumeText(text || "");

    // No text
    if (!text?.trim()) {
      setProfileExtracted(false);
      return;
    }

    try {
      // --------------------------------------------------------
      // Analyze resume
      // --------------------------------------------------------

      const profile =
        analyzeResume(text);

      console.log(
        "================================"
      );

      console.log(
        "PROFILE AUTOFILL"
      );

      console.log(
        profile
      );

      console.log(
        "================================"
      );


      // --------------------------------------------------------
      // Candidate name
      // --------------------------------------------------------

      if (
        profile.candidateName?.trim()
      ) {
        setCandidateName(
          profile.candidateName
        );
      }


      // --------------------------------------------------------
      // Education
      // --------------------------------------------------------

      if (
        profile.educationLevel
      ) {
        setEducationLevel(
          profile.educationLevel
        );
      }


      // --------------------------------------------------------
      // Degree
      // --------------------------------------------------------

      if (profile.degree) {
        setDegree(
          profile.degree
        );
      }


      // --------------------------------------------------------
      // Field of study
      // --------------------------------------------------------

      if (
        profile.fieldOfStudy
      ) {
        setFieldOfStudy(
          profile.fieldOfStudy
        );
      }


      // --------------------------------------------------------
      // Institution
      // --------------------------------------------------------

      if (
        profile.institution?.trim()
      ) {
        setInstitution(
          profile.institution
        );
      }


      // --------------------------------------------------------
      // Graduation year
      // --------------------------------------------------------

      if (
        profile.graduationYear
      ) {
        setGraduationYear(
          String(
            profile.graduationYear
          )
        );
      }


      // --------------------------------------------------------
      // Suggested role
      // --------------------------------------------------------

      if (
        profile.suggestedRole
      ) {
        setRole(
          profile.suggestedRole
        );
      }


      // --------------------------------------------------------
      // Detected skills
      // --------------------------------------------------------

      if (
        Array.isArray(
          profile.skills
        )
      ) {
        setSelectedTopics(
          profile.skills
        );
      }


      // --------------------------------------------------------
      // Success
      // --------------------------------------------------------

      setProfileExtracted(true);

      setErrorMsg("");

    } catch (error) {

      console.error(
        "Resume analysis failed:",
        error
      );

      setProfileExtracted(false);

      setErrorMsg(
        "Resume was read, but the profile could not be extracted automatically. Please enter the details manually."
      );
    }
  };


  // ============================================================
  // RESUME FILE CHANGE
  // ============================================================

  const handleResumeChange = (
    file
  ) => {
    setResumeFile(file);

    // ----------------------------------------------------------
    // New file
    //
    // Clear old extracted text so the user cannot accidentally
    // start an interview using the previous resume.
    // ----------------------------------------------------------

    if (file) {
      setResumeText("");
      setProfileExtracted(false);
      setErrorMsg("");
      return;
    }

    // ----------------------------------------------------------
    // Resume removed
    // ----------------------------------------------------------

    setResumeText("");
    setProfileExtracted(false);

    setErrorMsg("");
  };


  // ============================================================
  // TOPIC TOGGLE
  // ============================================================

  const handleTopicToggle = (
    topic
  ) => {
    setSelectedTopics(
      (previous) =>
        previous.includes(topic)
          ? previous.filter(
              (item) =>
                item !== topic
            )
          : [
              ...previous,
              topic,
            ]
    );

    setErrorMsg("");
  };


  // ============================================================
  // CUSTOM SKILL
  // ============================================================

  const handleAddCustomSkill = (
    skill
  ) => {
    const trimmedSkill =
      skill.trim();

    if (!trimmedSkill) {
      return;
    }

    setCustomSkills(
      (previous) => {
        const alreadyExists =
          previous.some(
            (item) =>
              item.toLowerCase() ===
              trimmedSkill.toLowerCase()
          );

        if (alreadyExists) {
          return previous;
        }

        return [
          ...previous,
          trimmedSkill,
        ];
      }
    );

    setErrorMsg("");
  };


  // ============================================================
  // REMOVE CUSTOM SKILL
  // ============================================================

  const handleRemoveCustomSkill = (
    skill
  ) => {
    setCustomSkills(
      (previous) =>
        previous.filter(
          (item) =>
            item !== skill
        )
    );
  };


  // ============================================================
  // START INTERVIEW
  // ============================================================

  const handleStartInterview = (
    event
  ) => {
    event.preventDefault();


    // ----------------------------------------------------------
    // Candidate name
    // ----------------------------------------------------------

    if (
      !candidateName.trim()
    ) {
      setErrorMsg(
        "Please enter your candidate name."
      );

      return;
    }


    // ----------------------------------------------------------
    // Resume
    // ----------------------------------------------------------

    if (!resumeFile) {
      setErrorMsg(
        "Please upload your resume before starting the interview."
      );

      return;
    }


    // ----------------------------------------------------------
    // Resume extraction
    // ----------------------------------------------------------

    if (!resumeText.trim()) {
      setErrorMsg(
        "Please wait for your resume to finish analyzing."
      );

      return;
    }


    // ----------------------------------------------------------
    // Education
    // ----------------------------------------------------------

    if (!educationLevel) {
      setErrorMsg(
        "Please select your education level."
      );

      return;
    }

    if (!degree) {
      setErrorMsg(
        "Please select your degree or program."
      );

      return;
    }

    if (!fieldOfStudy) {
      setErrorMsg(
        "Please select your field of study."
      );

      return;
    }

    if (!institution.trim()) {
      setErrorMsg(
        "Please enter your college or university."
      );

      return;
    }

    if (!graduationYear) {
      setErrorMsg(
        "Please select your graduation year."
      );

      return;
    }


    // ----------------------------------------------------------
    // Role
    // ----------------------------------------------------------

    if (!role) {
      setErrorMsg(
        "Please select an interview role."
      );

      return;
    }

    if (
      role === "Other" &&
      !customRole.trim()
    ) {
      setErrorMsg(
        "Please enter your desired interview role."
      );

      return;
    }


    // ----------------------------------------------------------
    // Difficulty
    // ----------------------------------------------------------

    if (!difficulty) {
      setErrorMsg(
        "Please select a difficulty level."
      );

      return;
    }


    // ----------------------------------------------------------
    // Skills
    // ----------------------------------------------------------

    if (
      selectedTopics.length === 0 &&
      customSkills.length === 0
    ) {
      setErrorMsg(
        "Please select at least one interview skill."
      );

      return;
    }


    // ----------------------------------------------------------
    // Interview type
    // ----------------------------------------------------------

    if (!interviewType) {
      setErrorMsg(
        "Please select an interview type."
      );

      return;
    }


    // ----------------------------------------------------------
    // Custom instructions
    // ----------------------------------------------------------

    if (
      interviewType ===
        "custom" &&
      !customInterviewPrompt.trim()
    ) {
      setErrorMsg(
        "Please describe what you want the interviewer to focus on."
      );

      return;
    }


    // ==========================================================
    // EVERYTHING VALID
    // ==========================================================

    setErrorMsg("");


    // ==========================================================
    // SAVE TO INTERVIEW CONTEXT
    // ==========================================================

    setupInterview({

      // Candidate
      candidateName:
        candidateName.trim(),

      educationLevel,

      degree,

      fieldOfStudy,

      institution:
        institution.trim(),

      graduationYear,


      // Resume
      resumeFile,

      resumeText,


      // Role
      role,

      customRole:
        customRole.trim(),


      // Interview configuration
      difficulty,

      selectedTopics,

      customSkills,

      interviewType,

      customInterviewPrompt:
        customInterviewPrompt.trim(),
    });


    // ==========================================================
    // GO TO INTERVIEW
    // ==========================================================

    navigate("/interview");
  };


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-slate-950
        relative
        overflow-hidden
        flex
        items-center
        justify-center
        px-4
        sm:px-6
      "
    >

      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div
        className="
          absolute
          top-[-20%]
          left-[-10%]
          w-[400px]
          h-[400px]
          bg-purple-600/10
          rounded-full
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[-20%]
          right-[-10%]
          w-[400px]
          h-[400px]
          bg-indigo-600/10
          rounded-full
          blur-3xl
          pointer-events-none
        "
      />


      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          w-full
          max-w-md
          md:max-w-2xl
          relative
          z-10
          my-auto
          py-6
        "
      >

        {/* Logo */}

        <Logo />


        {/* ====================================================
            MAIN CARD
        ==================================================== */}

        <div
          className="
            bg-slate-900/60
            backdrop-blur-2xl
            border
            border-slate-800/80
            rounded-3xl
            p-5
            sm:p-8
            shadow-2xl
          "
        >

          {/* ==================================================
              HEADER
          ================================================== */}

          <div
            className="
              text-center
              mb-6
              sm:mb-8
            "
          >

            <h1
              className="
                text-xl
                sm:text-3xl
                font-bold
                tracking-tight
                text-white
                mb-1.5
              "
            >
              Setup Your Interview
            </h1>

            <p
              className="
                text-slate-400
                text-xs
                sm:text-sm
              "
            >
              Configure your interview before you begin.
            </p>

          </div>


          {/* ==================================================
              ERROR
          ================================================== */}

          {errorMsg && (
            <div
              className="
                mb-5
                p-3.5
                rounded-xl
                bg-rose-500/10
                border
                border-rose-500/20
                text-rose-300
                text-xs
                flex
                items-center
                gap-2
              "
            >

              <svg
                className="
                  w-4 h-4
                  text-rose-400
                  flex-shrink-0
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>

              <span>
                {errorMsg}
              </span>

            </div>
          )}


          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={
              handleStartInterview
            }
            className="
              space-y-5
              sm:space-y-6
            "
          >

            {/* =================================================
                CANDIDATE PROFILE
            ================================================= */}

            <CandidateInput
              value={candidateName}
              onChange={
                setCandidateName
              }

              educationLevel={
                educationLevel
              }

              onEducationLevelChange={
                setEducationLevel
              }

              degree={degree}

              onDegreeChange={
                setDegree
              }

              fieldOfStudy={
                fieldOfStudy
              }

              onFieldOfStudyChange={
                setFieldOfStudy
              }

              institution={
                institution
              }

              onInstitutionChange={
                setInstitution
              }

              graduationYear={
                graduationYear
              }

              onGraduationYearChange={
                setGraduationYear
              }
            />


            {/* =================================================
                RESUME
            ================================================= */}

            <ResumeUpload
              file={resumeFile}

              onChange={
                handleResumeChange
              }

              onTextExtracted={
                handleResumeTextExtracted
              }
            />


            {/* =================================================
                PROFILE EXTRACTED
            ================================================= */}

            {profileExtracted && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  p-3
                  rounded-xl
                  bg-emerald-500/10
                  border
                  border-emerald-500/20
                "
              >

                <svg
                  className="
                    w-4 h-4
                    text-emerald-400
                    flex-shrink-0
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <span
                  className="
                    text-xs
                    text-emerald-300
                  "
                >
                  Profile extracted from resume
                </span>

              </div>
            )}


            {/* =================================================
                ROLE
            ================================================= */}

            <RoleSelect
              value={role}
              onChange={setRole}

              customRole={
                customRole
              }

              onCustomRoleChange={
                setCustomRole
              }
            />


            {/* =================================================
                DIFFICULTY
            ================================================= */}

            <DifficultySelector
              selected={
                difficulty
              }

              onSelect={
                setDifficulty
              }
            />


            {/* =================================================
                INTERVIEW FOCUS
            ================================================= */}

            <FocusSelector
              selectedTopics={
                selectedTopics
              }

              onToggle={
                handleTopicToggle
              }

              customSkills={
                customSkills
              }

              onAddCustomSkill={
                handleAddCustomSkill
              }

              onRemoveCustomSkill={
                handleRemoveCustomSkill
              }
            />


            {/* =================================================
                INTERVIEW TYPE
            ================================================= */}

            <div className="space-y-3">

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-slate-300
                  "
                >
                  Interview Type
                </label>

                <span
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  Choose your experience
                </span>

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-3
                "
              >

                {interviewTypes.map(
                  (type) => {

                    const isSelected =
                      interviewType ===
                      type.id;

                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          setInterviewType(
                            type.id
                          );

                          setErrorMsg("");
                        }}
                        className={`
                          p-3.5
                          rounded-xl
                          border
                          text-left
                          transition-all
                          duration-200
                          cursor-pointer

                          ${
                            isSelected
                              ? "bg-purple-600/15 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                              : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/40"
                          }
                        `}
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <span
                            className={`
                              text-sm
                              font-semibold

                              ${
                                isSelected
                                  ? "text-white"
                                  : "text-slate-200"
                              }
                            `}
                          >
                            {type.label}
                          </span>


                          {type.id ===
                            "recommended" && (
                            <span
                              className="
                                text-[9px]
                                px-1.5
                                py-0.5
                                rounded-md
                                bg-purple-500/15
                                text-purple-300
                                border
                                border-purple-500/20
                              "
                            >
                              RECOMMENDED
                            </span>
                          )}

                        </div>


                        <p
                          className="
                            text-[11px]
                            text-slate-500
                            leading-relaxed
                            mt-1.5
                          "
                        >
                          {type.description}
                        </p>

                      </button>
                    );
                  }
                )}

              </div>


              {/* Custom instructions */}

              {interviewType ===
                "custom" && (
                <div
                  className="
                    space-y-2
                    pt-1
                  "
                >

                  <label
                    className="
                      block
                      text-xs
                      font-medium
                      text-slate-400
                    "
                  >
                    What should the interviewer focus on?
                  </label>

                  <textarea
                    value={
                      customInterviewPrompt
                    }

                    onChange={(event) =>
                      setCustomInterviewPrompt(
                        event.target.value
                      )
                    }

                    rows={3}

                    placeholder="e.g. Focus on React performance, system design and debugging..."

                    className="
                      w-full
                      p-4
                      bg-slate-950/60
                      border
                      border-slate-800
                      rounded-xl
                      text-slate-100
                      placeholder-slate-500
                      focus:outline-none
                      focus:border-indigo-500
                      focus:ring-1
                      focus:ring-indigo-500
                      transition-all
                      duration-200
                      text-xs
                      sm:text-sm
                      resize-y
                    "
                  />

                </div>
              )}

            </div>


            {/* =================================================
                DURATION
            ================================================= */}

            <div
              className="
                flex
                flex-row
                items-center
                justify-between
                p-3.5
                bg-slate-950/40
                border
                border-slate-800/60
                rounded-xl
                text-xs
                gap-2
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-slate-400
                "
              >

                <svg
                  className="
                    w-4 h-4
                    text-purple-400
                    flex-shrink-0
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>
                  Estimated Duration
                </span>

              </div>

              <span
                className="
                  font-semibold
                  text-slate-200
                  text-right
                "
              >
                Approximately 20 minutes
              </span>

            </div>


            {/* =================================================
                START INTERVIEW
            ================================================= */}

            <button
              type="submit"
              className="
                w-full
                py-3.5
                px-6
                rounded-xl
                font-semibold
                text-sm
                text-white
                bg-gradient-to-r
                from-purple-600
                via-indigo-600
                to-purple-600
                hover:from-purple-500
                hover:to-indigo-500
                shadow-lg
                shadow-purple-900/30
                active:scale-[0.99]
                transition-all
                duration-200
                cursor-pointer
                flex
                items-center
                justify-center
                gap-2
                group
              "
            >

              <span>
                Start Interview
              </span>

              <svg
                className="
                  w-4 h-4
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Setup;