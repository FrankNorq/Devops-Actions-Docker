require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/ok", (req, res) => {
  console.log("[OK] /api/ok called");
  res.json({ status: "okk" });
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

app.listen(port, "0.0.0.0", () => {
  console.log(`API is running on http://localhost:${port}`);
});

module.exports = app;
