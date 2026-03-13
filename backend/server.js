// server.js — Express RAG server for MANO Projects Pvt. Ltd. Chatbot
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { answerQuestion, getVectorCount } from "./rag.js";

// Load .env from the same folder as server.js (works regardless of cwd)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

// ─── App Setup ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim());

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
    })
);

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /health — liveness check + vector count
app.get("/health", async (req, res) => {
    const count = await getVectorCount();
    res.json({
        status: "ok",
        service: "MANO RAG API (Node.js)",
        vectors_indexed: count,
    });
});

// POST /chat — main chatbot endpoint
app.post("/chat", async (req, res) => {
    const { question } = req.body;

    if (!question || !question.trim()) {
        return res.status(400).json({ error: "Question cannot be empty." });
    }

    try {
        const result = await answerQuestion(question.trim());
        res.json({ answer: result.answer, sources: result.sources });
    } catch (err) {
        console.error("[CHAT ERROR]", err);
        res.status(500).json({ error: "Internal server error.", detail: err.message });
    }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n[SERVER] MANO RAG API running at http://localhost:${PORT}`);
});
