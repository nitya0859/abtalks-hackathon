const roles = [
  "AI Engineer",
  "Backend AI Engineer",
  "ML Engineer",
  "Startup Engineer",
];

const RoleSelect = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        Interview Role
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-4 pr-10 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none transition-all duration-200 cursor-pointer"
        >
          {roles.map((role) => (
            <option key={role} value={role} className="bg-slate-900 text-slate-100">
              {role}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
