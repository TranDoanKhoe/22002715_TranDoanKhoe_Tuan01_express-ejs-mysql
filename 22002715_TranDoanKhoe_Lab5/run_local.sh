#!/usr/bin/env bash
set -e
if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not installed. Install Docker Desktop or Docker Engine."
  exit 1
fi

echo "Starting services with Docker Compose (detached)..."
if docker compose version >/dev/null 2>&1; then
  docker compose up --build -d
else
  docker-compose up --build -d
fi

echo "Waiting for services to become ready (10s)..."
sleep 10

echo "Containers:"
docker ps --filter "name=dynamodb-local" --filter "name=node-crud-app"

echo "Testing API http://localhost:3000/api-info"
if command -v curl >/dev/null 2>&1; then
  curl -sS http://localhost:3000/api-info || echo "API test failed"
else
  echo "curl not found — open http://localhost:3000/ in a browser"
fi

echo "To follow logs interactively: docker compose logs -f"
