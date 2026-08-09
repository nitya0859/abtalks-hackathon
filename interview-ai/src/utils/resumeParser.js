import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import mammoth from "mammoth/mammoth.browser";

// ============================================================
// PDF.JS WORKER
// ============================================================

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// ============================================================
// PDF TEXT EXTRACTION
// ============================================================

const extractPDFText = async (file) => {
  if (!file) {
    throw new Error("No PDF file provided.");
  }

  const arrayBuffer = await file.arrayBuffer();

  // Convert ArrayBuffer to Uint8Array.
  // This is more reliable with PDF.js.
  const pdfData = new Uint8Array(arrayBuffer);

  const loadingTask = pdfjsLib.getDocument({
    data: pdfData,
  });

  const pdf = await loadingTask.promise;

  let fullText = "";

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {
    const page = await pdf.getPage(pageNumber);

    const textContent =
      await page.getTextContent();

    const pageText = textContent.items
      .map((item) => {
        if (
          item &&
          typeof item.str === "string"
        ) {
          return item.str;
        }

        return "";
      })
      .join(" ");

    fullText += pageText + "\n";
  }

  const cleanedText =
    fullText
      .replace(/\s+/g, " ")
      .trim();

  if (!cleanedText) {
    throw new Error(
      "No readable text found in this PDF."
    );
  }

  return cleanedText;
};

// ============================================================
// DOCX TEXT EXTRACTION
// ============================================================

const extractDOCXText = async (file) => {
  if (!file) {
    throw new Error("No DOCX file provided.");
  }

  const arrayBuffer =
    await file.arrayBuffer();

  const result =
    await mammoth.extractRawText({
      arrayBuffer,
    });

  const cleanedText =
    result.value
      .replace(/\s+/g, " ")
      .trim();

  if (!cleanedText) {
    throw new Error(
      "No readable text found in this DOCX."
    );
  }

  return cleanedText;
};

// ============================================================
// MAIN RESUME TEXT EXTRACTOR
// ============================================================

export const extractResumeText = async (
  file
) => {
  if (!file) {
    throw new Error(
      "No resume file provided."
    );
  }

  const fileName =
    file.name.toLowerCase();

  console.log(
    "Reading resume:",
    file.name
  );

  // ==========================================================
  // PDF
  // ==========================================================

  if (fileName.endsWith(".pdf")) {
    try {
      const text =
        await extractPDFText(file);

      console.log(
        "PDF text extracted successfully."
      );

      return text;
    } catch (error) {
      console.error(
        "PDF extraction error:",
        error
      );

      throw new Error(
        "Could not read this PDF. Please make sure it contains selectable text."
      );
    }
  }

  // ==========================================================
  // DOCX
  // ==========================================================

  if (fileName.endsWith(".docx")) {
    try {
      const text =
        await extractDOCXText(file);

      console.log(
        "DOCX text extracted successfully."
      );

      return text;
    } catch (error) {
      console.error(
        "DOCX extraction error:",
        error
      );

      throw new Error(
        "Could not read this DOCX file."
      );
    }
  }

  // ==========================================================
  // OLD DOC
  // ==========================================================

  if (fileName.endsWith(".doc")) {
    throw new Error(
      "Old .doc files are not supported. Please upload a PDF or DOCX file."
    );
  }

  // ==========================================================
  // UNSUPPORTED
  // ==========================================================

  throw new Error(
    "Unsupported resume format. Please upload a PDF or DOCX file."
  );
};