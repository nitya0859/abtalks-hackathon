import { useState } from "react";

const AnswerInput = ({ onSubmitAnswer, isSubmitting = false }) => {
  const [answerText, setAnswerText] = useState(
    `For indexing 100k+ technical documentation pages, I would recommend a dynamic chunking approach:

1. **Chunking & Overlap**: Use semantic sliding windows (512 tokens with 64-token overlap) based on header Markdown boundaries to preserve code block context.
2. **Hybrid Search**: Combine Dense Embeddings (OpenAI text-embedding-3-large) for semantic intent with Sparse BM25 (Anserini/Pyserini) for exact keyword matches (APIs, function names, error codes).
3. **Re-ranking**: Pass top 50 retrieval candidates through Cohere Rerank v3 cross-encoder to balance precision vs latency (sub-80ms target).`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answerText.trim() && onSubmitAnswer) {
      onSubmitAnswer(answerText);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl focus-within:border-indigo-500/80 focus-within:ring-1 focus-within:ring-indigo-500/80 transition-all duration-200">
        {/* Editor Toolbar Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/60 text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <svg
                className="w-3.5 h-3.5 text-indigo-400"
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
              Candidate Workspace
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-500">Markdown & Pseudocode Supported</span>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 rounded">
              <span>⌘</span>
              <span>Enter</span>
            </kbd>
          </div>
        </div>

        {/* Textarea Input */}
        <textarea
          rows={7}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Structure your answer clearly. Explain trade-offs, architecture decisions, and code snippets..."
          className="w-full p-4 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-xs sm:text-sm font-mono leading-relaxed resize-y"
        />

        {/* Action Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/60 border-t border-slate-800/60">
          <span className="text-[11px] text-slate-500">
            {answerText.length} characters • {answerText.split(/\s+/).filter(Boolean).length} words
          </span>

          <button
            type="submit"
            disabled={isSubmitting || !answerText.trim()}
            className="py-2.5 px-6 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50 transition cursor-pointer flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
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
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AnswerInput;
