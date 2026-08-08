import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

import Logo from "../components/common/Logo";
import CandidateInput from "../components/setup/CandidateInput";
import RoleSelect from "../components/setup/RoleSelect";
import DifficultySelector from "../components/setup/DifficultySelector";
import FocusSelector from "../components/setup/FocusSelector";

const Setup = () => {
  const navigate = useNavigate();
  const { setupInterview } = useInterview();

  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("AI Engineer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [selectedTopics, setSelectedTopics] = useState([
    "Prompt Engineering",
    "RAG",
    "System Design",
  ]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTopicToggle = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleStartInterview = (e) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setErrorMsg("Candidate Name is required to begin the interview.");
      return;
    }
    if (!role) {
      setErrorMsg("Please select an interview role.");
      return;
    }
    if (selectedTopics.length === 0) {
      setErrorMsg("Please select at least one interview focus topic.");
      return;
    }

    setErrorMsg("");
    setupInterview({ candidateName, role, difficulty, selectedTopics });
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Subtle Background Glows */}
      <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md md:max-w-2xl relative z-10 my-auto py-6">
        {/* Project Logo / Brand */}
        <Logo />

        {/* Glassmorphism Card */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-5 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-1.5">
              Setup Your Interview
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Configure your interview before you begin.
            </p>
          </div>

          {/* Validation Error Alert */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <svg className="w-4 h-4 text-rose-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleStartInterview} className="space-y-5 sm:space-y-6">
            {/* Candidate Name */}
            <CandidateInput value={candidateName} onChange={setCandidateName} />

            {/* Interview Role */}
            <RoleSelect value={role} onChange={setRole} />

            {/* Difficulty Level */}
            <DifficultySelector
              selected={difficulty}
              onSelect={setDifficulty}
            />

            {/* Interview Focus */}
            <FocusSelector
              selectedTopics={selectedTopics}
              onToggle={handleTopicToggle}
            />

            {/* Estimated Duration */}
            <div className="flex flex-row items-center justify-between p-3.5 bg-slate-950/40 border border-slate-800/60 rounded-xl text-xs gap-2">
              <div className="flex items-center gap-2 text-slate-400">
                <svg
                  className="w-4 h-4 text-purple-400 flex-shrink-0"
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
                <span>Estimated Duration</span>
              </div>
              <span className="font-semibold text-slate-200 text-right">
                Approximately 20 minutes
              </span>
            </div>

            {/* Primary Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Start Interview</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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
