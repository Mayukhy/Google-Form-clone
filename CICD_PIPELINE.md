# CI/CD Pipeline Documentation

## Overview

This document provides comprehensive documentation for the Continuous Integration and Continuous Deployment (CI/CD) pipeline implemented for the Google Form Clone application. The pipeline automatically builds Docker images for the frontend, backend, and MongoDB components and pushes them to Docker Hub whenever changes are made to the main/master branches.

## Table of Contents

1. [Pipeline Architecture](#pipeline-architecture)
2. [Prerequisites](#prerequisites)
3. [Workflow Configuration](#workflow-configuration)
4. [Docker Images](#docker-images)
5. [Setup Instructions](#setup-instructions)
6. [Pipeline Workflow Steps](#pipeline-workflow-steps)
7. [Tagging Strategy](#tagging-strategy)
8. [Secrets Configuration](#secrets-configuration)
9. [Usage and Deployment](#usage-and-deployment)
10. [Troubleshooting](#troubleshooting)

---

## Pipeline Architecture

The CI/CD pipeline is built using **GitHub Actions** and performs the following operations:

- **Triggers**: Automatically runs on push or pull request events to `main` or `master` branches
- **Build Process**: Builds three separate Docker images (Frontend, Backend, MongoDB)
- **Registry**: Pushes built images to Docker Hub
- **Caching**: Uses GitHub Actions cache to speed up subsequent builds

### Components

```
┌─────────────────────────────────────────────────────────┐
│                   GitHub Repository                      │
│              (Push to main/master branch)               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow                     │
│                  (deploy.yml)                           │
├─────────────────────────────────────────────────────────┤
│  1. Checkout Code                                       │
│  2. Setup Docker Buildx                                 │
│  3. Login to Docker Hub                                 │
│  4. Extract Metadata (Tags & Labels)                    │
│  5. Build Docker Images                                 │
│  6. Push to Docker Hub                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Docker Hub Registry                    │
├─────────────────────────────────────────────────────────┤
│  • gfrom-backend:latest                                 │
│  • gfrom-frontend:latest                                │
│  • gfrom-mongodb:latest                                 │
└─────────────────────────────────────────────────────────┘
```

---

## Prerequisites

Before setting up the CI/CD pipeline, ensure you have:

1. **Docker Hub Account**: Create an account at [Docker Hub](https://hub.docker.com/)
2. **GitHub Repository**: Your application code hosted on GitHub
3. **Docker Hub Access Token**: Generate a personal access token from Docker Hub for secure authentication
4. **GitHub Secrets**: Access to configure repository secrets

---

## Workflow Configuration

The pipeline is defined in `.github/workflows/deploy.yml` and uses the following configuration:

### Workflow File Location
```
.github/workflows/deploy.yml
```

### Environment Variables

The workflow uses the following environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `REGISTRY` | `docker.io` | Docker Hub registry URL |
| `BACKEND_IMAGE_NAME` | `gfrom-backend` | Name for backend Docker image |
| `FRONTEND_IMAGE_NAME` | `gfrom-frontend` | Name for frontend Docker image |
| `MONGODB_IMAGE_NAME` | `gfrom-mongodb` | Name for MongoDB Docker image |

### Trigger Events

```yaml
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
```

The pipeline triggers on:
- **Push events** to `main` or `master` branches (builds and pushes images)
- **Pull request events** to `main` or `master` branches (builds only, no push)

---

## Docker Images

The pipeline builds and manages three Docker images:

### 1. Backend Image (`gfrom-backend`)

**Purpose**: Node.js/Express backend API server

**Dockerfile Location**: `./backend/Dockerfile`

**Key Features**:
- Base Image: `node:18-alpine`
- Working Directory: `/app`
- Production dependencies only (`npm ci --only=production`)
- Non-root user for security
- Exposed Port: `5000`

**Image Tags**:
```
docker.io/<username>/gfrom-backend:latest
docker.io/<username>/gfrom-backend:main
docker.io/<username>/gfrom-backend:main-YYYYMMDD-<sha>
```

### 2. Frontend Image (`gfrom-frontend`)

**Purpose**: React/Vite frontend application

**Dockerfile Location**: `./frontend/Dockerfile`

**Key Features**:
- Base Image: `node:18-alpine`
- Working Directory: `/app`
- Build process with Vite
- Served using `serve` package
- Exposed Port: `5173`

**Image Tags**:
```
docker.io/<username>/gfrom-frontend:latest
docker.io/<username>/gfrom-frontend:main
docker.io/<username>/gfrom-frontend:main-YYYYMMDD-<sha>
```

### 3. MongoDB Image (`gfrom-mongodb`)

**Purpose**: MongoDB database with custom configuration

**Dockerfile**: Dynamically created during workflow

**Key Features**:
- Base Image: `mongo:latest`
- Default database: `test`
- Exposed Port: `27017`

**Image Tags**:
```
docker.io/<username>/gfrom-mongodb:latest
docker.io/<username>/gfrom-mongodb:main
docker.io/<username>/gfrom-mongodb:main-YYYYMMDD-<sha>
```

---

## Setup Instructions

### Step 1: Create Docker Hub Access Token

1. Log in to [Docker Hub](https://hub.docker.com/)
2. Navigate to **Account Settings** → **Security**
3. Click **New Access Token**
4. Provide a description (e.g., "GitHub Actions")
5. Copy the generated token (you won't be able to see it again!)

### Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | Used for Docker Hub authentication |
| `DOCKERHUB_TOKEN` | Your Docker Hub access token | Secure authentication token |

### Step 3: Create Workflow File

The workflow file should already exist at `.github/workflows/deploy.yml`. If not, create it with the following structure:

```yaml
name: Build and Deploy to Docker Hub
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

# ... (rest of the workflow configuration)
```

### Step 4: Commit and Push

Once the workflow file is in place and secrets are configured:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add CI/CD pipeline for Docker Hub deployment"
git push origin main
```

The pipeline will automatically trigger and start building your Docker images!

---

## Pipeline Workflow Steps

The CI/CD pipeline executes the following steps in sequence:

### 1. Checkout Repository
```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```
- Clones the repository code
- Provides access to Dockerfiles and application code

### 2. Set Up Docker Buildx
```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3
```
- Enables advanced Docker build features
- Supports multi-platform builds and caching

### 3. Log In to Docker Hub
```yaml
- name: Log in to Docker Hub
  if: github.event_name != 'pull_request'
  uses: docker/login-action@v3
  with:
    registry: ${{ env.REGISTRY }}
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```
- Authenticates with Docker Hub using stored secrets
- Only executes on push events (skipped for pull requests)

### 4. Extract Metadata
```yaml
- name: Extract metadata for backend
  id: meta-backend
  uses: docker/metadata-action@v5
  with:
    images: ${{ env.REGISTRY }}/${{ secrets.DOCKERHUB_USERNAME }}/${{ env.BACKEND_IMAGE_NAME }}
    tags: |
      type=ref,event=branch
      type=ref,event=pr
      type=sha,prefix=main-{{date 'YYYYMMDD'}}-
      type=raw,value=latest,enable={{is_default_branch}}
```
- Generates appropriate tags and labels for Docker images
- Separate metadata extraction for backend, frontend, and MongoDB
- Creates tags based on branch name, PR number, commit SHA, and date

### 5. Create MongoDB Dockerfile
```yaml
- name: Create MongoDB Dockerfile
  run: |
    mkdir -p mongodb
    cat > mongodb/Dockerfile << 'EOF'
    FROM mongo:latest
    ENV MONGO_INITDB_DATABASE=test
    EXPOSE 27017
    CMD ["mongod"]
    EOF
```
- Dynamically creates a Dockerfile for MongoDB
- Allows customization of MongoDB configuration

### 6. Build and Push Docker Images
```yaml
- name: Build and push backend Docker image
  uses: docker/build-push-action@v5
  with:
    context: ./backend
    file: ./backend/Dockerfile
    push: ${{ github.event_name != 'pull_request' }}
    tags: ${{ steps.meta-backend.outputs.tags }}
    labels: ${{ steps.meta-backend.outputs.labels }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```
- Builds Docker images from respective Dockerfiles
- Pushes to Docker Hub (only on push events, not PRs)
- Utilizes GitHub Actions cache for faster builds
- Separate steps for backend, frontend, and MongoDB

### 7. Display Image Digests
```yaml
- name: Image digest
  if: github.event_name != 'pull_request'
  run: |
    echo "Backend image digest: ${{ steps.meta-backend.outputs.digest }}"
    echo "Frontend image digest: ${{ steps.meta-frontend.outputs.digest }}"
    echo "MongoDB image digest: ${{ steps.meta-mongodb.outputs.digest }}"
```
- Outputs the digest of pushed images for verification

---

## Tagging Strategy

The pipeline uses an intelligent tagging strategy to version Docker images:

### Tag Types

1. **Latest Tag** (for default branch only)
   ```
   docker.io/username/gfrom-backend:latest
   ```
   - Always points to the most recent build from the default branch
   - Used for production deployments

2. **Branch Tag**
   ```
   docker.io/username/gfrom-backend:main
   docker.io/username/gfrom-backend:master
   ```
   - Tags images with the branch name
   - Useful for branch-specific deployments

3. **Pull Request Tag**
   ```
   docker.io/username/gfrom-backend:pr-123
   ```
   - Tags images with the PR number
   - Used for testing pull requests

4. **SHA-based Tag with Date**
   ```
   docker.io/username/gfrom-backend:main-20231215-abc1234
   ```
   - Combines branch name, date, and commit SHA
   - Provides unique, traceable image versions
   - Format: `<branch>-YYYYMMDD-<short-sha>`

### Benefits

- **Traceability**: Each image can be traced back to a specific commit
- **Rollback**: Easy to rollback to previous versions using SHA tags
- **Testing**: PR-specific tags allow testing before merging
- **Simplicity**: Latest tag simplifies production deployments

---

## Secrets Configuration

### Required Secrets

| Secret | Purpose | How to Obtain |
|--------|---------|---------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | Your Docker Hub account username |
| `DOCKERHUB_TOKEN` | Docker Hub access token | Generated from Docker Hub Account Settings → Security → New Access Token |

### Security Best Practices

1. **Never commit secrets**: Keep secrets in GitHub repository settings, never in code
2. **Use access tokens**: Use Docker Hub access tokens instead of passwords
3. **Limit token scope**: Create tokens with minimal required permissions
4. **Rotate tokens**: Regularly update access tokens for security
5. **Audit access**: Monitor who has access to repository secrets

### Verifying Secrets

To verify secrets are configured correctly:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Confirm both `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` are listed
3. Trigger the workflow and check the "Log in to Docker Hub" step succeeds

---

## Usage and Deployment

### Automatic Deployment

The pipeline automatically deploys when you push to the main/master branch:

```bash
# Make changes to your code
git add .
git commit -m "Your commit message"
git push origin main
```

The workflow will:
1. Automatically trigger
2. Build all three Docker images
3. Push them to Docker Hub with appropriate tags

### Pulling Images

Once images are pushed to Docker Hub, you can pull them:

```bash
# Pull latest images
docker pull <your-dockerhub-username>/gfrom-backend:latest
docker pull <your-dockerhub-username>/gfrom-frontend:latest
docker pull <your-dockerhub-username>/gfrom-mongodb:latest

# Pull specific version
docker pull <your-dockerhub-username>/gfrom-backend:main-20231215-abc1234
```

### Using with Docker Compose

Update your `docker-compose.yml` to use the pushed images:

```yaml
services:
  gfrom-backend:
    image: <your-dockerhub-username>/gfrom-backend:latest
    # ... other configuration

  gform-frontend:
    image: <your-dockerhub-username>/gfrom-frontend:latest
    # ... other configuration

  gform-mongodb:
    image: <your-dockerhub-username>/gfrom-mongodb:latest
    # ... other configuration
```

Then run:

```bash
docker-compose pull  # Pull latest images
docker-compose up -d  # Start services
```

### Manual Deployment

To manually trigger the workflow:

1. Go to **Actions** tab in GitHub repository
2. Select "Build and Deploy to Docker Hub" workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow** button

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Authentication Failed

**Error**: `Error: Cannot perform an interactive login from a non TTY device`

**Solution**: 
- Verify `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets are correctly set
- Regenerate Docker Hub access token if needed
- Ensure token has write permissions

#### 2. Build Failed

**Error**: Build step fails with compilation or dependency errors

**Solution**:
- Check that Dockerfiles are correctly configured
- Verify all required files are committed to the repository
- Test Docker build locally:
  ```bash
  docker build -t test-image ./backend
  docker build -t test-image ./frontend
  ```

#### 3. Push Failed

**Error**: `denied: requested access to the resource is denied`

**Solution**:
- Verify Docker Hub username matches the secret exactly
- Ensure repository exists on Docker Hub or Docker Hub will create it automatically
- Check Docker Hub account has sufficient permissions

#### 4. Cache Issues

**Error**: Builds are slow or failing due to cache

**Solution**:
- Clear GitHub Actions cache:
  - Go to **Actions** → **Caches**
  - Delete old caches
- Rebuild without cache by modifying workflow temporarily:
  ```yaml
  cache-from: type=gha
  cache-to: type=gha,mode=max
  # Remove these lines temporarily
  ```

#### 5. Workflow Not Triggering

**Solution**:
- Verify the workflow file is in `.github/workflows/` directory
- Check the branch name matches the trigger configuration (main vs master)
- Ensure workflow file has correct YAML syntax:
  ```bash
  # Install yamllint
  pip install yamllint
  
  # Validate workflow file
  yamllint .github/workflows/deploy.yml
  ```

### Viewing Workflow Logs

To debug issues:

1. Go to **Actions** tab in GitHub repository
2. Click on the failed workflow run
3. Click on the "build-and-push" job
4. Expand individual steps to view detailed logs
5. Look for red error messages

### Testing Locally

Before pushing changes, test Docker builds locally:

```bash
# Test backend build
cd backend
docker build -t test-backend .
docker run -p 5000:5000 test-backend

# Test frontend build
cd frontend
docker build -t test-frontend .
docker run -p 3000:5173 test-frontend
```

### Getting Help

If issues persist:

1. Check [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review [Docker Hub documentation](https://docs.docker.com/docker-hub/)
3. Search for similar issues on GitHub community forums
4. Check workflow syntax with GitHub Actions validator

---

## Best Practices

### 1. Version Control
- Always tag releases with semantic versioning
- Use descriptive commit messages
- Create release branches for production deployments

### 2. Security
- Regularly update base images in Dockerfiles
- Scan images for vulnerabilities using Docker Scout or similar tools
- Never commit sensitive data (passwords, API keys) to the repository
- Use environment variables for configuration

### 3. Optimization
- Leverage Docker layer caching for faster builds
- Use multi-stage builds where appropriate
- Minimize image size by using Alpine-based images
- Remove unnecessary files from Docker context with `.dockerignore`

### 4. Monitoring
- Monitor workflow execution times
- Set up notifications for failed builds
- Track image sizes over time
- Monitor Docker Hub storage usage

### 5. Documentation
- Keep this documentation updated with pipeline changes
- Document any custom configuration or secrets
- Maintain a changelog for significant pipeline updates

---

## Workflow Status Badge

Add this badge to your README.md to display the workflow status:

```markdown
![CI/CD Pipeline](https://github.com/<username>/Google-Form-clone/actions/workflows/deploy.yml/badge.svg)
```

Replace `<username>` with your GitHub username.

---

## Conclusion

This CI/CD pipeline automates the Docker image build and deployment process, ensuring consistent and reliable deployments to Docker Hub. By following this documentation, you can:

- Understand the complete pipeline architecture
- Set up the pipeline for your own fork
- Troubleshoot common issues
- Maintain and extend the pipeline as needed

For questions or improvements, please open an issue or submit a pull request to the repository.

---

**Last Updated**: December 2024  
**Maintained By**: Repository Contributors
