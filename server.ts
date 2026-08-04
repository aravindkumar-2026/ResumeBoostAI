import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { analyzeResumeWithGemini, generateCoverLetterWithGemini } from "./src/server/geminiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middleware with large payload limit for PDF base64 strings
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ limit: "20mb", extended: true }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", appName: "ResumeBoost AI", environment: process.env.NODE_ENV || "development" });
  });

  app.post("/api/analyze-resume", async (req, res) => {
    try {
      const { pdfBase64, resumeText, fileName, fileSize, targetRole } = req.body;

      if (!pdfBase64 && !resumeText) {
        return res.status(400).json({ error: "Either PDF base64 file or resume text is required." });
      }

      const result = await analyzeResumeWithGemini(
        pdfBase64,
        resumeText,
        fileName || "Uploaded_Resume.pdf",
        fileSize || 1024 * 250,
        targetRole || "Software Engineer"
      );

      return res.json(result);
    } catch (error: any) {
      console.error("API error during resume analysis:", error);
      return res.status(500).json({
        error: "Failed to analyze resume.",
        details: error.message || String(error)
      });
    }
  });

  app.post("/api/generate-cover-letter", async (req, res) => {
    try {
      const { resumeText, targetRole, targetCompany } = req.body;

      if (!resumeText) {
        return res.status(400).json({ error: "Resume text is required to generate cover letter." });
      }

      const result = await generateCoverLetterWithGemini(
        resumeText,
        targetRole || "Software Engineer",
        targetCompany || "Target Company"
      );

      return res.json(result);
    } catch (error: any) {
      console.error("API error during cover letter generation:", error);
      return res.status(500).json({
        error: "Failed to generate cover letter.",
        details: error.message || String(error)
      });
    }
  });

  // Vite middleware in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serving compiled static files in production
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 ResumeBoost AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
