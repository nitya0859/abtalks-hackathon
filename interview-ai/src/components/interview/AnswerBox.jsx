import { useState } from "react";

const AnswerBox = ({ onSubmitAnswer }) => {
  const [text, setText] = useState(
    "To scale vector search for 500M+ embeddings, I would implement HNSW indexing with scalar quantization (SQ8) to fit in memory, partition datasets across sharded clusters by tenant ID, and buffer updates in a WAL before background flushing to avoid write-amplification during peak ingestion."
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitAnswer) {
      onSubmitAnswer(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl focus-within:border-purple-500/80 focus-within:ring-1 focus-within:ring-purple-500/80 transition-all duration-200">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/60 text-xs">
          <span className="font-medium text-slate-300 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Candidate Response Workspace
          </span>
          <span className="text-[11px] text-slate-500">Markdown enabled</span>
        </div>

        {/* Textarea */}
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your response here... Include architecture details, trade-offs, and design patterns."
          className="w-full p-4 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-xs sm:text-sm font-mono leading-relaxed resize-y"
        />

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/60 border-t border-slate-800/60">
          <span className="text-xs text-slate-500 font-mono">
            {text.length} / 2000 characters
          </span>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 active:scale-[0.98] transition cursor-pointer flex items-center gap-2"
          >
            <span>Submit Answer</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3 21l18-9L3 3l3 9zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AnswerBox;
