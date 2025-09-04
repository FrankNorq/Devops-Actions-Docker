# API (Node) – enkel körbar image
FROM node:20-alpine

# 1) Arbetskatalog
WORKDIR /usr/src/app

# 2) Installera beroenden
COPY api/package*.json ./
# Ta bort --only=production om du behöver dev-deps i containern
RUN npm ci --only=production

# 3) Kopiera resten av koden
COPY api/. .

# 4) Exponera API-port och starta
EXPOSE 3000
# Anpassa om du använder npm-scripts: ["npm","start"]
CMD ["node", "server.js"]
