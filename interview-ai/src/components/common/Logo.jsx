import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3 justify-center mb-6 group cursor-pointer"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-purple-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
        <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
          <svg
            className="w-5 h-5 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-200 transition-colors">
          Interview<span className="text-indigo-400">AI</span>
        </span>
        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          PRO
        </span>
      </div>
    </Link>
  );
};

export default Logo;
