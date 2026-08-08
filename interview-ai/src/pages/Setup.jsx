import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import CandidateInput from "../components/setup/CandidateInput";
import RoleSelect from "../components/setup/RoleSelect";
import DifficultySelector from "../components/setup/DifficultySelector";
import FocusSelector from "../components/setup/FocusSelector";

const Setup = () => {
  const navigate = useNavigate();

  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("AI Engineer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [selectedTopics, setSelectedTopics] = useState([
    "Prompt Engineering",
    "RAG",
    "System Design",
  ]);

  const handleTopicToggle = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleStartInterview = (e) => {
    e.preventDefault();
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Subtle Background Glows & Grids */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-violet-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-xl relative z-10 my-auto">
        {/* Project Logo / Brand */}
        <Logo />

        {/* Glassmorphism Card */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-slate-950/80">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Setup Your Interview
            </h1>
            <p className="text-slate-400 text-sm">
              Configure your interview before you begin.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleStartInterview} className="space-y-6">
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
            <div className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-800/60 rounded-xl text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <svg
                  className="w-4 h-4 text-indigo-400"
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
              <span className="font-semibold text-slate-200">
                Approximately 20 minutes
              </span>
            </div>

            {/* Primary Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
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
