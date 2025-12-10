FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# # Copy source code
COPY . .

# Copy only necessary source files
# COPY src/ ./src/
# COPY public/ ./public/
# COPY index.html ./
# COPY vite.config.js ./
# COPY .env ./

# # Copy .env file to make environment variables available during build
# COPY .env .env

# Build the application with environment variables
RUN npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Serve the built application with disabled clipboard
CMD ["serve", "-s", "dist", "-l", "5173", "--no-clipboard"]