import { useNavigate } from "react-router-dom";
import { useInterview } from "../../context/InterviewContext";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { resetInterview } = useInterview();

  const handleDownload = () => {
    window.print();
  };

  const handleRetake = () => {
    resetInterview();
    navigate("/setup");
  };

  const handleDashboard = () => {
    resetInterview();
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* LEFT ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {/* DOWNLOAD */}
        <button
          type="button"
          onClick={handleDownload}
          className="
            w-full sm:w-auto
            inline-flex items-center justify-center gap-2
            px-5 py-3
            rounded-xl
            border border-[#d7d1c6]
            bg-[#faf8f4]
            text-[#4d4942]
            text-xs font-semibold
            hover:bg-[#eeeae2]
            hover:border-[#c9c2b6]
            transition-all duration-200
            cursor-pointer
          "
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

          Download Report
        </button>

        {/* RETAKE */}
        <button
          type="button"
          onClick={handleRetake}
          className="
            w-full sm:w-auto
            inline-flex items-center justify-center gap-2
            px-5 py-3
            rounded-xl
            bg-[#292722]
            text-[#faf8f4]
            text-xs font-semibold
            hover:bg-[#3a3731]
            shadow-sm
            transition-all duration-200
            cursor-pointer
          "
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

          Retake Interview
        </button>
      </div>

      {/* DASHBOARD */}
      <button
        type="button"
        onClick={handleDashboard}
        className="
          w-full sm:w-auto
          inline-flex items-center justify-center gap-1.5
          px-3 py-2
          text-xs font-semibold
          text-[#746e64]
          hover:text-[#292722]
          transition-colors
          cursor-pointer
        "
      >
        Back to Dashboard
        <span className="text-sm">→</span>
      </button>
    </div>
  );
};

export default ActionButtons;