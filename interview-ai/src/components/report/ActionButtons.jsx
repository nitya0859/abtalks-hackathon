import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800/60">
      <button
        onClick={handleDownload}
        className="w-full sm:w-auto py-3 px-6 rounded-xl font-semibold text-xs text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <span>Download Report</span>
      </button>

      <button
        onClick={() => navigate("/setup")}
        className="w-full sm:w-auto py-3 px-6 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 transition shadow-lg shadow-purple-900/30 cursor-pointer flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span>Retake Interview</span>
      </button>

      <button
        onClick={() => navigate("/")}
        className="w-full sm:w-auto py-3 px-6 rounded-xl font-semibold text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>Back to Dashboard</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default ActionButtons;
