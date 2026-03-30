FROM python:3.11-slim

# Install Node.js for building frontend
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Install frontend dependencies and build
COPY frontend/package.json frontend/yarn.lock frontend/
RUN cd frontend && yarn install --frozen-lockfile

COPY frontend/ frontend/
RUN cd frontend && yarn build

# Copy backend
COPY backend/ backend/

# Copy built frontend to backend static directory
RUN cp -r frontend/build backend/static

EXPOSE 8001

WORKDIR /app/backend

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001} --workers 2"]
