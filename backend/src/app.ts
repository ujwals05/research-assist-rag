import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "RAG API is running",
    });
});

export default app;