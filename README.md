# Google-Form-clone

A full-stack Google Forms clone application with authentication, form creation, sharing, and response visualization capabilities.

## Demo
https://www.loom.com/share/b851ffbf8dca44f39940c7f9cff01af2?sid=f9d37226-194a-4972-a47c-2f6b0c236861

## Features
1. Allowing users to create forms after authenticating their account. (google auth)
2. Allowing users to complete forms.
3. Allowing the form owner to share the form to specific emails. 
4. Allowing form owners to visualize responses.
5. Allowing users to submit other media like images, URLs, and files to forms. 
6. An admin dashboard for form owners to manage their current forms.

## Technologies Used
- **Frontend**: React.js, Material UI, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions, Docker Hub

## CI/CD Pipeline

This project includes an automated CI/CD pipeline that builds and deploys Docker images to Docker Hub. The pipeline automatically triggers on every push to the main/master branch.

📖 **[View Complete CI/CD Pipeline Documentation](./CICD_PIPELINE.md)**

### Quick Overview

- **Automated Builds**: Docker images are automatically built for backend, frontend, and MongoDB
- **Docker Hub Deployment**: Images are pushed to Docker Hub with intelligent tagging
- **Caching**: Uses GitHub Actions cache for faster build times
- **Security**: Uses Docker Hub access tokens for secure authentication

For detailed information about the CI/CD pipeline, including setup instructions, workflow details, and troubleshooting, please refer to the [CI/CD Pipeline Documentation](./CICD_PIPELINE.md).

## Docker Setup

This application is fully containerized using Docker. The setup includes:
- Backend API (Node.js/Express)
- Frontend UI (React/Vite)
- MongoDB database

### Prerequisites
- Docker installed on your machine ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed ([Install Docker Compose](https://docs.docker.com/compose/install/))

### Docker Configuration Files

#### 1. Backend Dockerfile (`backend/Dockerfile`)
```dockerfile
# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001
USER backend

# Expose the port the app runs on
EXPOSE 5000

# Define environment variable
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "index.js"]
```

#### 2. Frontend Dockerfile (`frontend/Dockerfile`)
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application with environment variables
RUN npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Serve the built application with disabled clipboard
CMD ["serve", "-s", "dist", "-l", "5173", "--no-clipboard"]
```

#### 3. Docker Compose Configuration (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  gfrom-backend:
    container_name: google-form-api
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - CONNECTION_URL=mongodb+srv://dasmayukh2000:936eIP2SWazsX5Pp@cluster0.93aiybh.mongodb.net/?retryWrites=true&w=majority
      # Note: Replace the above connection string with your own MongoDB connection URL
      # For production, use environment variables instead of hardcoding credentials
    depends_on:
      - mongodb
    networks:
      - app-network

  gform-frontend:
    container_name: google-form-ui
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:5173"
    depends_on:
      - gfrom-backend
    networks:
      - app-network

  mongodb:
    image: mongo
    container_name: google-form-mongo
    ports:
      - "6000:27017"
    environment:
      - MONGO_INITDB_DATABASE=test
    volumes:
      - mongodb_data:/data/db
    networks:
      - app-network

volumes:
  mongodb_data:

networks:
  app-network:
    driver: bridge
```

### Running the Application with Docker

#### Quick Start - Run Everything with Docker Compose
```bash
# Clone the repository
git clone https://github.com/Mayukhy/Google-Form-clone.git
cd Google-Form-clone

# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:6000

#### Stop the Application
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

#### View Logs
```bash
# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs gfrom-backend
docker-compose logs gform-frontend
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f
```

#### Rebuild Specific Services
```bash
# Rebuild only backend
docker-compose build gfrom-backend
docker-compose up -d gfrom-backend

# Rebuild only frontend
docker-compose build gform-frontend
docker-compose up -d gform-frontend
```

### Individual Container Commands

#### Backend
```bash
# Build backend image
docker build -t google-form-backend ./backend

# Run backend container
docker run -p 5000:5000 --name google-form-api google-form-backend
```

#### Frontend
```bash
# Build frontend image
docker build -t google-form-frontend ./frontend

# Run frontend container
docker run -p 3000:5173 --name google-form-ui google-form-frontend
```

### Development Workflow

For development without Docker:

#### Backend
```bash
cd backend
npm install
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Notes
1. If the application is launched for the first time or after an interval of maximum 30 minutes, it takes some time (max 30 sec) to load the contents, so please be patient.
2. When the form is shared to a specific email of a specific user, the user should check their spam folder because sometimes the message can be stored in the spam folder.
3. Make sure Docker daemon is running before executing any Docker commands.
4. The MongoDB service uses a named volume to persist data across container restarts.

## Screenshots

![Your Form - Google Chrome 9_4_2023 10_23_35 PM](https://github.com/Mayukhy/Google-Form-clone/assets/107027766/04e28ebd-3dcd-4a9c-8131-ed0894ed4331)

![Your Form - Google Chrome 9_4_2023 10_26_13 PM](https://github.com/Mayukhy/Google-Form-clone/assets/107027766/961a417a-bc18-430c-987f-ebec47bdc806)

![Your Form - Google Chrome 9_4_2023 10_25_36 PM](https://github.com/Mayukhy/Google-Form-clone/assets/107027766/b6e12313-fbf9-481a-87b1-6e66b2abfd0f)

![Your Form - Google Chrome 9_4_2023 10_24_17 PM](https://github.com/Mayukhy/Google-Form-clone/assets/107027766/033648d1-8be5-4dcf-a63c-ce4b511fda1f)

![Your Form - Google Chrome 9_4_2023 10_26_01 PM](https://github.com/Mayukhy/Google-Form-clone/assets/107027766/dadbbda9-2ef5-48ce-ae98-474db64bce4a)

![Your Form - Google Chrome 9_4_2023 10_25_28 PM](https://github.com/Mayukhy/Google-Form-clone/assets/107027766/3bbae35b-d67d-46bd-a9a6-f16e0e790fbd)

![Your Form - Google Chrome 9_4_2023 10_27_15 PM](https://github.com/Mayukhy/Google-Form-clone/assets/107027766/530030e3-e0c5-418e-b212-fe53c6e4e000)
