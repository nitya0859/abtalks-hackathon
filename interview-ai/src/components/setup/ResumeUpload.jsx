import { useState } from "react";
import { extractResumeText } from "../../utils/resumeParser";

const ResumeUpload = ({
  file,
  onChange,
  onTextExtracted,
}) => {
  const [isExtracting, setIsExtracting] =
    useState(false);

  const [error, setError] = useState("");

  const handleFileChange = async (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) return;

    setError("");

    // ----------------------------------------------------------
    // Supported formats
    // ----------------------------------------------------------

    const allowedExtensions = [
      ".pdf",
      ".docx",
    ];

    const fileName =
      selectedFile.name.toLowerCase();

    const isValid =
      allowedExtensions.some((extension) =>
        fileName.endsWith(extension)
      );

    if (!isValid) {
      setError(
        "Please upload a PDF or DOCX file."
      );

      event.target.value = "";
      return;
    }

    try {
      setIsExtracting(true);

      // --------------------------------------------------------
      // Store file immediately
      // --------------------------------------------------------

      onChange(selectedFile);

      // Clear previous extracted text
      if (onTextExtracted) {
        onTextExtracted("");
      }

      // --------------------------------------------------------
      // Extract raw text
      // --------------------------------------------------------

      const extractedText =
        await extractResumeText(
          selectedFile
        );

      console.log(
        "Resume extracted successfully:"
      );

      console.log(extractedText);

      // --------------------------------------------------------
      // Make sure text actually exists
      // --------------------------------------------------------

      if (!extractedText?.trim()) {
        throw new Error(
          "No readable text found."
        );
      }

      // --------------------------------------------------------
      // Send text to Setup.jsx
      //
      // Setup.jsx will then call:
      //
      // analyzeResume(extractedText)
      // --------------------------------------------------------

      if (onTextExtracted) {
        onTextExtracted(
          extractedText
        );
      }

      setError("");
    } catch (err) {
      console.error(
        "Resume extraction failed:",
        err
      );

      setError(
        "Could not read this resume. Please upload a text-based PDF or DOCX file."
      );

      // Reset file
      onChange(null);

      // Reset extracted text
      if (onTextExtracted) {
        onTextExtracted("");
      }

      event.target.value = "";
    } finally {
      setIsExtracting(false);
    }
  };

  // ------------------------------------------------------------
  // Remove resume
  // ------------------------------------------------------------

  const removeFile = () => {
    onChange(null);

    if (onTextExtracted) {
      onTextExtracted("");
    }

    setError("");
  };

  return (
    <div className="space-y-2">

      {/* ======================================================
          LABEL
      ====================================================== */}

      <div className="flex items-center justify-between">

        <label className="block text-sm font-medium text-slate-300">
          Resume
        </label>

        {!file && (
          <span className="text-xs text-slate-500">
            Required
          </span>
        )}

      </div>

      {/* ======================================================
          UPLOAD STATE
      ====================================================== */}

      {!file ? (
        <label
          className="
            flex flex-col items-center justify-center
            w-full min-h-[140px]
            px-4 py-6
            rounded-xl
            border border-dashed border-slate-700
            bg-slate-950/40
            hover:border-purple-500/60
            hover:bg-slate-900/40
            transition-all duration-200
            cursor-pointer
          "
        >

          <svg
            className="w-7 h-7 text-purple-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0L8 8m4-4l4 4M5 20h14"
            />
          </svg>

          <span className="text-sm text-slate-300">
            Upload your resume
          </span>

          <span className="text-xs text-slate-500 mt-1">
            PDF or DOCX
          </span>

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

        </label>
      ) : (

        /* ====================================================
           FILE UPLOADED STATE
        ==================================================== */

        <div
          className="
            p-4
            rounded-xl
            bg-slate-950/50
            border border-purple-500/30
          "
        >

          <div className="flex items-center justify-between gap-3">

            {/* File information */}

            <div className="flex items-center gap-3 min-w-0">

              {/* File icon */}

              <div
                className="
                  w-9 h-9
                  rounded-lg
                  bg-purple-500/10
                  border border-purple-500/20
                  flex items-center justify-center
                  flex-shrink-0
                "
              >

                <svg
                  className="w-4 h-4 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 3h7l4 4v14H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 3v5h5"
                  />
                </svg>

              </div>

              {/* File name */}

              <div className="min-w-0">

                <p className="text-sm text-slate-200 truncate">
                  {file.name}
                </p>

                <p className="text-xs mt-0.5">

                  {isExtracting ? (
                    <span className="text-purple-400">
                      Reading resume...
                    </span>
                  ) : (
                    <span className="text-emerald-400">
                      Resume analyzed ✓
                    </span>
                  )}

                </p>

              </div>

            </div>

            {/* Remove */}

            {!isExtracting && (
              <button
                type="button"
                onClick={removeFile}
                className="
                  text-xs
                  text-slate-500
                  hover:text-rose-400
                  transition-colors
                  flex-shrink-0
                "
              >
                Remove
              </button>
            )}

          </div>

          {/* ==================================================
              EXTRACTION PROGRESS
          ================================================== */}

          {isExtracting && (
            <div
              className="
                mt-3
                h-1
                rounded-full
                bg-slate-800
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  w-1/2
                  bg-gradient-to-r
                  from-purple-500
                  to-indigo-500
                  animate-pulse
                  rounded-full
                "
              />

            </div>
          )}

        </div>
      )}

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <p className="text-xs text-rose-400">
          {error}
        </p>
      )}

    </div>
  );
};

export default ResumeUpload;