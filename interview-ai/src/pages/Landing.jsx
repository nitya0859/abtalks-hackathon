import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-slate-100 py-12 selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden relative">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl text-center relative z-10 space-y-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          AI Interview Platform
        </h1>

        <p className="text-sm sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed px-2">
          Land your dream job with AI-powered interview preparation.
        </p>

        <div className="pt-4 flex justify-center">
          <button
            onClick={() => navigate("/setup")}
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 px-8 py-3.5 font-semibold text-sm sm:text-base text-white transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 active:scale-[0.98] cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;