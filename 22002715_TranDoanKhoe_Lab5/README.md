# Node + DynamoDB (local) CRUD

Simple Node.js (Express) CRUD app using DynamoDB Local via Docker.

Quick start:

1. Build and start services:

```bash
docker-compose up --build
```

2. API endpoints (http://localhost:3000):

- GET /products
- GET /products/:id
- POST /products { name, price, url_image }
- PUT /products/:id
- DELETE /products/:id

Notes:

- Table `Products` will be created automatically on startup against the local DynamoDB.

Run scripts:

- Windows PowerShell (run in project root):

```powershell
.\run_local.ps1
```

- Linux/macOS:

```bash
./run_local.sh
```

After starting, open http://localhost:3000/ to view the UI.
