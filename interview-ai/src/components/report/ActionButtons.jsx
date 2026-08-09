import { useNavigate } from "react-router-dom";
import { useInterview } from "../../context/InterviewContext";

const ActionButtons = () => {
  const navigate = useNavigate();

  const { resetInterview } = useInterview();

  // ==========================================================
  // DOWNLOAD / PRINT REPORT
  // ==========================================================

  const handleDownload = () => {
    window.print();
  };

  // ==========================================================
  // RETAKE INTERVIEW
  // ==========================================================

  const handleRetake = () => {
    resetInterview();
    navigate("/setup");
  };

  // ==========================================================
  // DASHBOARD
  // ==========================================================

  const handleDashboard = () => {
    resetInterview();
    navigate("/");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">

      {/* ====================================================
          LEFT ACTIONS
      ==================================================== */}

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

        {/* Download */}
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto py-3 px-6 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition cursor-pointer flex items-center justify-center gap-2"
        >
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
              d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14"
            />
          </svg>

          <span>
            Download Report
          </span>
        </button>

        {/* Retake */}
        <button
          onClick={handleRetake}
          className="w-full sm:w-auto py-3 px-6 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 transition shadow-lg shadow-purple-900/30 cursor-pointer flex items-center justify-center gap-2"
        >
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <span>
            Retake Interview
          </span>
        </button>

      </div>

      {/* ====================================================
          DASHBOARD
      ==================================================== */}

      <button
        onClick={handleDashboard}
        className="w-full sm:w-auto py-3 px-6 rounded-xl font-semibold text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>
          Back to Dashboard
        </span>

        <span>
          →
        </span>
      </button>

    </div>
  );
};

export default ActionButtons;