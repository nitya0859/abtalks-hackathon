import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 text-slate-100">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
          AI Interview Platform
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
          Land your dream job with AI-powered interview preparation.
        </p>

        <button
          onClick={() => navigate("/setup")}
          className="mt-10 rounded-xl bg-indigo-600 px-8 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-[0.98] cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;