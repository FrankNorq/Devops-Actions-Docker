# Frontend (React + Vite) – enkel dev-image
FROM node:20-alpine

# 1) Arbetskatalog
WORKDIR /app

# 2) Installera beroenden
#    Kopiera bara package-filer först för bättre cache
COPY frontend/package*.json ./
RUN npm ci

# 3) Kopiera resten av koden
COPY frontend/. .

# 4) Exponera Vites port och starta dev-server
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
