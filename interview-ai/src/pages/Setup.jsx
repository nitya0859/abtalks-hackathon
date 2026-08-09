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
// SETUP
// ============================================================

const Setup = () => {
  const navigate = useNavigate();
  const { setupInterview } = useInterview();

  // Candidate
  const [candidateName, setCandidateName] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  // Resume
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");

  // Interview configuration
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);
  const [interviewType, setInterviewType] = useState("");
  const [customInterviewPrompt, setCustomInterviewPrompt] =
    useState("");

  // UI
  const [errorMsg, setErrorMsg] = useState("");
  const [profileExtracted, setProfileExtracted] =
    useState(false);

  // ==========================================================
  // RESUME ANALYSIS
  // ==========================================================

  const handleResumeTextExtracted = (text) => {
    setResumeText(text || "");

    if (!text?.trim()) {
      setProfileExtracted(false);
      return;
    }

    try {
      const profile = analyzeResume(text);

      console.log("EVOKE PROFILE AUTOFILL");
      console.log(profile);

      if (profile.candidateName?.trim()) {
        setCandidateName(profile.candidateName);
      }

      if (profile.educationLevel) {
        setEducationLevel(profile.educationLevel);
      }

      if (profile.degree) {
        setDegree(profile.degree);
      }

      if (profile.fieldOfStudy) {
        setFieldOfStudy(profile.fieldOfStudy);
      }

      if (profile.institution?.trim()) {
        setInstitution(profile.institution);
      }

      if (profile.graduationYear) {
        setGraduationYear(
          String(profile.graduationYear)
        );
      }

      if (profile.suggestedRole) {
        setRole(profile.suggestedRole);
      }

      if (Array.isArray(profile.skills)) {
        setSelectedTopics(profile.skills);
      }

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

  // ==========================================================
  // RESUME CHANGE
  // ==========================================================

  const handleResumeChange = (file) => {
    setResumeFile(file);

    if (file) {
      setResumeText("");
      setProfileExtracted(false);
      setErrorMsg("");
      return;
    }

    setResumeText("");
    setProfileExtracted(false);
    setErrorMsg("");
  };

  // ==========================================================
  // TOPICS
  // ==========================================================

  const handleTopicToggle = (topic) => {
    setSelectedTopics((previous) =>
      previous.includes(topic)
        ? previous.filter((item) => item !== topic)
        : [...previous, topic]
    );

    setErrorMsg("");
  };

  // ==========================================================
  // CUSTOM SKILLS
  // ==========================================================

  const handleAddCustomSkill = (skill) => {
    const trimmedSkill = skill.trim();

    if (!trimmedSkill) return;

    setCustomSkills((previous) => {
      const exists = previous.some(
        (item) =>
          item.toLowerCase() ===
          trimmedSkill.toLowerCase()
      );

      if (exists) return previous;

      return [...previous, trimmedSkill];
    });

    setErrorMsg("");
  };

  const handleRemoveCustomSkill = (skill) => {
    setCustomSkills((previous) =>
      previous.filter((item) => item !== skill)
    );
  };

  // ==========================================================
  // START INTERVIEW
  // ==========================================================

  const handleStartInterview = (event) => {
    event.preventDefault();

    if (!candidateName.trim()) {
      setErrorMsg(
        "Please enter your candidate name."
      );
      return;
    }

    if (!resumeFile) {
      setErrorMsg(
        "Please upload your resume before starting the interview."
      );
      return;
    }

    if (!resumeText.trim()) {
      setErrorMsg(
        "Please wait for your resume to finish analyzing."
      );
      return;
    }

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

    if (!difficulty) {
      setErrorMsg(
        "Please select a difficulty level."
      );
      return;
    }

    if (
      selectedTopics.length === 0 &&
      customSkills.length === 0
    ) {
      setErrorMsg(
        "Please select at least one interview skill."
      );
      return;
    }

    if (!interviewType) {
      setErrorMsg(
        "Please select an interview type."
      );
      return;
    }

    if (
      interviewType === "custom" &&
      !customInterviewPrompt.trim()
    ) {
      setErrorMsg(
        "Please describe what you want the interviewer to focus on."
      );
      return;
    }

    setErrorMsg("");

    setupInterview({
      candidateName: candidateName.trim(),

      educationLevel,
      degree,
      fieldOfStudy,
      institution: institution.trim(),
      graduationYear,

      resumeFile,
      resumeText,

      role,
      customRole: customRole.trim(),

      difficulty,

      selectedTopics,
      customSkills,

      interviewType,

      customInterviewPrompt:
        customInterviewPrompt.trim(),
    });

    navigate("/interview");
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="evoke-setup-page">

      {/* Architectural background */}
      <div className="evoke-setup-grid" />

      <div className="evoke-setup-glow evoke-glow-one" />
      <div className="evoke-setup-glow evoke-glow-two" />

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="evoke-setup-header">
        <Logo />

        <div className="evoke-step-indicator">
          <span className="evoke-step-active">
            01
          </span>

          <span className="evoke-step-divider">
            /
          </span>

          <span>03</span>

          <span className="evoke-step-label">
            Configure interview
          </span>
        </div>
      </header>

      {/* ======================================================
          INTRO STRIP
      ====================================================== */}

      <div className="evoke-intro">
        <div>
          <span className="evoke-intro-kicker">
            EVOKE / INTERVIEW STUDIO
          </span>

          <p>
            Build an interview that feels like
            yours.
          </p>
        </div>

        <span className="evoke-intro-index">
          2026
        </span>
      </div>

      {/* ======================================================
          WORKSPACE
      ====================================================== */}

      <main className="evoke-workspace">

        {/* ====================================================
            LEFT — PROFILE
        ==================================================== */}

        <section className="evoke-panel evoke-profile-panel">

          <div className="evoke-panel-heading">
            <div>
              <span className="evoke-overline">
                01 — PROFILE
              </span>

              <h1>
                Tell us about
                <br />
                <span>yourself.</span>
              </h1>
            </div>

            <span className="evoke-panel-number">
              A
            </span>
          </div>

          {/* Candidate */}
          <div className="evoke-section">
            <span className="evoke-section-label">
              Candidate
            </span>

            <CandidateInput
              value={candidateName}
              onChange={setCandidateName}
              educationLevel={educationLevel}
              onEducationLevelChange={
                setEducationLevel
              }
              degree={degree}
              onDegreeChange={setDegree}
              fieldOfStudy={fieldOfStudy}
              onFieldOfStudyChange={
                setFieldOfStudy
              }
              institution={institution}
              onInstitutionChange={
                setInstitution
              }
              graduationYear={graduationYear}
              onGraduationYearChange={
                setGraduationYear
              }
            />
          </div>

          {/* Resume */}
          <div className="evoke-section evoke-resume-section">

            <div className="evoke-section-header">
              <div>
                <span className="evoke-section-label">
                  Resume
                </span>

                <span className="evoke-required">
                  REQUIRED
                </span>
              </div>

              {profileExtracted && (
                <span className="evoke-success">
                  ✓ Profile extracted
                </span>
              )}
            </div>

            <div className="evoke-folder">
              <div className="evoke-folder-tab">
                RESUME / 01
              </div>

              <div className="evoke-folder-body">
                <ResumeUpload
                  file={resumeFile}
                  onChange={handleResumeChange}
                  onTextExtracted={
                    handleResumeTextExtracted
                  }
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="evoke-error">
              <span className="evoke-error-icon">
                !
              </span>

              <span>{errorMsg}</span>
            </div>
          )}
        </section>

        {/* ====================================================
            RIGHT — CONFIGURATION
        ==================================================== */}

        <section className="evoke-panel evoke-config-panel">

          <div className="evoke-panel-heading">
            <div>
              <span className="evoke-overline">
                02 — INTERVIEW
              </span>

              <h2>
                Shape your
                <br />
                <span>experience.</span>
              </h2>
            </div>

            <span className="evoke-panel-number">
              B
            </span>
          </div>

          <form
            onSubmit={handleStartInterview}
            className="evoke-config-form"
          >

            {/* Role */}
            <div className="evoke-config-block">
              <div className="evoke-block-heading">
                <span>Interview Role</span>

                <span className="evoke-block-hint">
                  What are you preparing for?
                </span>
              </div>

              <RoleSelect
                value={role}
                onChange={setRole}
                customRole={customRole}
                onCustomRoleChange={
                  setCustomRole
                }
              />
            </div>

            {/* Difficulty */}
            <div className="evoke-config-block">
              <div className="evoke-block-heading">
                <span>Difficulty</span>

                <span className="evoke-block-hint">
                  Adjust the challenge
                </span>
              </div>

              <DifficultySelector
                selected={difficulty}
                onSelect={setDifficulty}
              />
            </div>

            {/* Focus */}
            <div className="evoke-config-block">
              <div className="evoke-block-heading">
                <span>Interview Focus</span>

                <span className="evoke-block-hint">
                  Select one or more
                </span>
              </div>

              <FocusSelector
                selectedTopics={selectedTopics}
                onToggle={handleTopicToggle}
                customSkills={customSkills}
                onAddCustomSkill={
                  handleAddCustomSkill
                }
                onRemoveCustomSkill={
                  handleRemoveCustomSkill
                }
              />
            </div>

            {/* Interview type */}
            <div className="evoke-config-block">
              <div className="evoke-block-heading">
                <span>Interview Type</span>

                <span className="evoke-block-hint">
                  Choose your experience
                </span>
              </div>

              <div className="evoke-type-grid">
                {interviewTypes.map(
                  (type, index) => {
                    const isSelected =
                      interviewType === type.id;

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
                          evoke-type-card
                          ${
                            isSelected
                              ? "evoke-type-selected"
                              : ""
                          }
                          ${
                            index % 3 === 1
                              ? "evoke-note-tilt-left"
                              : ""
                          }
                          ${
                            index % 3 === 2
                              ? "evoke-note-tilt-right"
                              : ""
                          }
                        `}
                      >
                        <div className="evoke-type-top">
                          <span className="evoke-type-label">
                            {type.label}
                          </span>

                          {type.id ===
                            "recommended" && (
                            <span className="evoke-recommended">
                              ✦ RECOMMENDED
                            </span>
                          )}
                        </div>

                        <p>
                          {type.description}
                        </p>
                      </button>
                    );
                  }
                )}
              </div>

              {interviewType === "custom" && (
                <div className="evoke-custom-prompt">
                  <label>
                    What should the interviewer
                    focus on?
                  </label>

                  <textarea
                    value={customInterviewPrompt}
                    onChange={(event) =>
                      setCustomInterviewPrompt(
                        event.target.value
                      )
                    }
                    rows={3}
                    placeholder="Focus on React performance, system design, debugging..."
                  />
                </div>
              )}
            </div>

            {/* Action */}
            <div className="evoke-action-area">

              <div className="evoke-duration">
                <span className="evoke-duration-icon">
                  ◷
                </span>

                <div>
                  <span>
                    Estimated duration
                  </span>

                  <strong>
                    ~20 minutes
                  </strong>
                </div>
              </div>

              <button
                type="submit"
                className="evoke-start-button"
              >
                <span>
                  Start Interview
                </span>

                <span className="evoke-arrow">
                  →
                </span>
              </button>
            </div>

          </form>
        </section>
      </main>
    </div>
  );
};

export default Setup;