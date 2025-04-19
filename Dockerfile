# Build stage
# Uses node:20-alpine for smaller image size

FROM node:20-alpine as builder

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port (adjust if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
