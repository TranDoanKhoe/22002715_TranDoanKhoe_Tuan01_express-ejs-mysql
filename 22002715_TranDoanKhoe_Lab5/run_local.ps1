# Run this in PowerShell in project root to start services and test API
$ErrorActionPreference = 'Stop'
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Host 'Docker not found. Install Docker Desktop and ensure `docker` is on PATH.'
  exit 1
}

Write-Host 'Starting services with Docker Compose (detached)...'
try {
  docker compose up --build -d
} catch {
  docker-compose up --build -d
}

Write-Host 'Waiting for services to become ready (10s)...'
Start-Sleep -Seconds 10

Write-Host 'Showing running containers (filtering names)...'
docker ps --filter "name=dynamodb-local" --filter "name=node-crud-app"

Write-Host 'Testing API endpoint http://localhost:3000/api-info'
try {
  $resp = Invoke-RestMethod -Uri 'http://localhost:3000/api-info' -Method Get -TimeoutSec 5
  $resp | ConvertTo-Json -Depth 5
} catch {
  Write-Host 'API test failed. Check container logs with `docker compose logs node-crud-app` or view Docker Desktop.'
}

Write-Host 'To follow logs interactively: docker compose logs -f'
