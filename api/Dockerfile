#  Build Stage 
FROM node:18-alpine AS builder

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . . 

RUN npm run build || echo "No build script found"

# Production Stage
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY  --from=builder /app ./

EXPOSE 3000
CMD [ "node","server.js" ]

