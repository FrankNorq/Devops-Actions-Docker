#  Build Stage 
FROM node:18-alpine AS builder

WORKDIR /app

COPY  package*.json ./

RUN npm ci

COPY . . 

RUN npm run build || echo "No build script found"

# Production Stage
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY  --from=builder /app ./

EXPOSE 80
CMD [ "node","server.js" ]

