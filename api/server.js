import app from "./app.js";

const port = process.env.PORT || 80;
app.listen(port, "0.0.0.0", () => {
  console.log(`API is running on http://localhost:${port}`);
  console.log(`Swagger UI:      http://localhost:${port}/api-docs`);
  console.log(`OpenAPI JSON:    http://localhost:${port}/api-docs.json`);
});
