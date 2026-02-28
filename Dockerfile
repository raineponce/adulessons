# Use Node 20 Alpine for a small, production-ready image
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --production

# Copy application source
COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]
