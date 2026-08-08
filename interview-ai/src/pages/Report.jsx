import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";

const Report = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <Logo />
      <div className="max-w-xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-3">
          Interview Report
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Detailed performance breakdown and feedback summary.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-200 font-medium hover:bg-slate-800 transition cursor-pointer text-sm"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/setup")}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 cursor-pointer text-sm"
          >
            Start New Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
