// docs/swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = process.env.PORT || 80;
// Sätt gärna en env för publikt base URL i prod, annars localhost:
const serverUrl = process.env.SWAGGER_SERVER_URL || `http://localhost:${port}`;

const swaggerOptions = {
  // I nyare swagger-jsdoc heter detta "definition" (swaggerDefinition funkar men är deprecated)
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API for Air Quality Monitoring",
    },
    servers: [
      { url: serverUrl }, // ex: http://localhost:80
    ],
  },
  apis: ["./docs/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  // (valfritt) rå JSON:
  app.get("/api-docs.json", (_req, res) => res.json(swaggerDocs));
};

export default setupSwagger;
