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

      onChange(selectedFile);

      if (onTextExtracted) {
        onTextExtracted("");
      }

      const extractedText =
        await extractResumeText(
          selectedFile
        );

      if (!extractedText?.trim()) {
        throw new Error(
          "No readable text found."
        );
      }

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

      onChange(null);

      if (onTextExtracted) {
        onTextExtracted("");
      }

      event.target.value = "";
    } finally {
      setIsExtracting(false);
    }
  };

  const removeFile = () => {
    onChange(null);

    if (onTextExtracted) {
      onTextExtracted("");
    }

    setError("");
  };

  return (
    <div className="evoke-resume-upload">

      {!file ? (
        <label className="evoke-upload-empty">

          <div className="evoke-upload-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12 16V4"
                strokeLinecap="round"
              />
              <path
                d="M8 8l4-4 4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 20h14"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="evoke-upload-copy">
            <strong>
              Drop your resume here
            </strong>

            <span>
              or click to browse
            </span>
          </div>

          <div className="evoke-upload-meta">
            <span>PDF</span>
            <span>DOCX</span>
            <span>TEXT EXTRACTED LOCALLY</span>
          </div>

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="evoke-resume-file">

          <div className="evoke-file-paper">

            <div className="evoke-file-corner" />

            <div className="evoke-file-lines">
              <span />
              <span />
              <span />
            </div>

            <span className="evoke-file-type">
              {file.name
                .split(".")
                .pop()
                ?.toUpperCase()}
            </span>
          </div>

          <div className="evoke-file-details">
            <strong>
              {file.name}
            </strong>

            <span>
              {isExtracting
                ? "Reading and analysing..."
                : "Resume analysed successfully"}
            </span>
          </div>

          {!isExtracting && (
            <button
              type="button"
              onClick={removeFile}
              className="evoke-remove-file"
            >
              Remove
            </button>
          )}

          {isExtracting && (
            <div className="evoke-extraction-loader">
              <span />
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="evoke-upload-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default ResumeUpload;