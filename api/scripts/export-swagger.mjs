import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { swaggerSpec } from "../docs/swagger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = `${__dirname}/../docs/openapi.json`;

mkdirSync(`${__dirname}/../docs`, { recursive: true });
writeFileSync(out, JSON.stringify(swaggerSpec, null, 2));
console.log("✅ Wrote", out);
