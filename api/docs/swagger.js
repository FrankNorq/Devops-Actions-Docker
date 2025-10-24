import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = process.env.PORT || 80;
const serverUrl = process.env.SWAGGER_SERVER_URL || `http://localhost:${port}`;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API for Air Quality Monitoring",
      license: { name: "MIT" },
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      { url: process.env.SWAGGER_SERVER_URL || "https://api.example.com" },
    ],
    security: [],
  },
  apis: ["./docs/*.js"],
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));
};

export default setupSwagger;
