const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

        <h1 className="text-6xl font-bold text-white">
          AI Interview Platform
        </h1>

        <p className="mt-6 text-lg text-slate-400">
          Land your dream job with AI-powered interview preparation.
        </p>

        <button
          className="
          mt-10
          rounded-xl
          bg-indigo-600
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-indigo-700
        "
        >
          Get Started
        </button>

      </div>
    </div>
  );
};

export default Landing;