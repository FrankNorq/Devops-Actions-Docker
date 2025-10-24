import "dotenv/config";
import express from "express";
import { Pool } from "pg";
import setupSwagger from "./docs/swagger.js";

const app = express();
app.use(express.json());

// DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Routes
app.get("/api/crash", (_req, _res) => {
  throw new Error("Uppgift2: Simulerat serverfel för metrics");
});

app.get("/api/ok", (_req, res) => {
  console.log("[OK] /api/ok called");
  res.json({ status: "kkk" });
});

app.get("/api/error", (_req, res) => {
  const err = new Error("Uppgift1: Avsiktligt fel för Log Stream");
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({ status: "error", message: err.message });
});

app.post("/api/data", async (req, res) => {
  try {
    const { message } = req.body;
    await pool.query(
      "CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, text TEXT)"
    );
    const result = await pool.query(
      "INSERT INTO messages (text) VALUES ($1) RETURNING id",
      [message]
    );
    res.json({ id: result.rows[0].id, status: "success" });
  } catch (err) {
    console.error("Failed to save data:", err);
    res.status(500).json({ status: "error", message: "Failed to save data" });
  }
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(500)
    .json({ status: "error", message: err.message || "Serverfel" });
});

// Swagger UI + JSON
if (process.env.ENABLE_SWAGGER_UI !== "false") {
  setupSwagger(app); // /api-docs och /api-docs.json
}

export default app;
