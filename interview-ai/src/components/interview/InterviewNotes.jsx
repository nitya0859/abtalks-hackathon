const defaultNotes = [
  { id: 1, type: "success", text: "Strong explanation of scalar quantization (SQ8) memory savings" },
  { id: 2, type: "warning", text: "Missing explicit recall rate vs latency trade-off calculation" },
  { id: 3, type: "success", text: "Good architecture for sharded cluster write-ahead logging (WAL)" },
];

const InterviewNotes = ({ notes = defaultNotes }) => {
  return (
    <div className="space-y-2.5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Interview Notes
      </h4>

      <div className="space-y-2">
        {notes.map((n) => {
          const isSuccess = n.type === "success";
          return (
            <div
              key={n.id}
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-all duration-200 ${
                isSuccess
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/10 border-amber-500/20 text-amber-300"
              }`}
            >
              <span className="font-bold flex-shrink-0 mt-0.5">
                {isSuccess ? "✓" : "⚠"}
              </span>
              <span className="leading-relaxed font-medium">{n.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewNotes;
