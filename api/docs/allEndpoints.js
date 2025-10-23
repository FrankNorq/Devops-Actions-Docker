// docs/allEndpoints.js

/**
 * @openapi
 * components:
 *   schemas:
 *     HealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: ok
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Något gick fel
 *     CreateMessageRequest:
 *       type: object
 *       required: [message]
 *       properties:
 *         message:
 *           type: string
 *           example: Hej från klienten!
 *     CreateMessageResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 42
 *         status:
 *           type: string
 *           example: success
 */

/**
 * @openapi
 * /api/ok:
 *   get:
 *     summary: Hälsokontroll
 *     description: Returnerar status **ok** och loggar ett meddelande på servern.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Tjänsten svarar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */

/**
 * @openapi
 * /api/error:
 *   get:
 *     summary: Avsiktligt fel för loggtest
 *     description: Skickar ett svar med 500 och loggar ett fel (Uppgift1).
 *     tags: [System]
 *     responses:
 *       500:
 *         description: Avsiktligt serverfel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               default:
 *                 value:
 *                   status: error
 *                   message: Uppgift1: Avsiktligt fel för Log Stream
 */

/**
 * @openapi
 * /api/crash:
 *   get:
 *     summary: Simulerat serverkrasch
 *     description: Kastar ett undantag för att trigga 500 i din global error handler (Uppgift2).
 *     tags: [System]
 *     responses:
 *       500:
 *         description: Simulerat serverfel (kastat undantag)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/data:
 *   post:
 *     summary: Spara ett meddelande i databasen
 *     description: Skapar tabellen `messages` om den inte finns och sparar `message`.
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMessageRequest'
 *     responses:
 *       200:
 *         description: Meddelandet sparades
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateMessageResponse'
 *       500:
 *         description: Fel vid sparning
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
