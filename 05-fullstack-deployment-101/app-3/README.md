# Northstar

A lightweight task workspace built with Go, React, SQLite, and Docker.

## Stack

- **Web app:** React + Vite + TypeScript
- **API:** Golang + Gin
- **Storage:** SQLite
- **Runtime:** Docker + Docker Compose

## Features

- List items
- View one item
- Create item
- Delete item
- Health check endpoint
- CORS support
- SQLite persistence with Docker volume

## Structure

```txt
app-3/
├── frontend/
├── backend/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Run Locally

### API

```bash
cd backend
go run .
```

### Web app

```bash
cd frontend
npm install
npm run dev
```

## Run with Docker

```bash
docker compose up --build
```

Open:

- App: `http://localhost:3000`
- Health check: `http://localhost:8080/health`

## Environment

Copy the example env file before running Compose:

```bash
cp .env.example .env
```

## Useful Compose Commands

```bash
docker compose up --build
docker compose up -d --build
docker compose down
docker compose logs -f
docker compose ps
```

## Deploy to VPS

1. Install Docker and Docker Compose.
2. Copy this project to the server.
3. Create `.env` from `.env.example`.
4. Run `docker compose up -d --build`.
5. Open the ports in your firewall.

If you want a single public entrypoint, place a reverse proxy like Nginx in front of the stack.

## Notes

- SQLite data is stored in a Docker volume.
- The app is intentionally small and easy to explain.
- The API is exposed under `/api`.
