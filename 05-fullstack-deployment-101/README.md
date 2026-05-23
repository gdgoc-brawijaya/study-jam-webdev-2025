# [Shipping Your Web App: Fullstack Deployment 101]

## Workshop Overview

In this study jam, participants will learn the basic flow of shipping a web app from local development to production. The session focuses on the big picture first, then shows how to deploy with **Vercel**, how to containerize an app with **Docker**, and how to think about a simple production checklist before going live.

**Duration:** ~1.5 hours  
**Audience:** Beginners who already know basic programming

---

## What Will You Learn?

- What deployment is and why it matters
- How to deploy frontend or full-stack apps with Vercel
- How to containerize an application with Docker
- How to ship Dockerized apps to the cloud
- What to check before pushing an app to production

---

## Prerequisites

Before the workshop, make sure you have:

- A laptop with internet access
- A code editor like VS Code
- Git installed
- A Vercel account
- Docker Desktop installed

Useful links:

- [Vercel](https://vercel.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/downloads)

---

## Workshop Flow

1. Understand what deployment means
2. Learn the basic difference between frontend, backend, and full-stack deployment
3. Deploy a web app with Vercel
4. Containerize the app using Docker
5. Deploy the containerized app to a cloud platform
6. Review the production checklist

---

## Hands-on Steps

### 1. Start from a Local App

Make sure the project runs locally first.

```bash
npm install
npm run dev
```

If your app uses a different stack, run the local dev command for that project first.

### 2. Deploy with Vercel

Connect your Git repository to Vercel, then deploy the main branch.

Basic flow:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Confirm build settings
4. Click **Deploy**

### 3. Add Docker Support

Create a `Dockerfile` so your app can run inside a container.

Example flow:

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

### 4. Ship the Container to the Cloud

After the container works locally, push it to a cloud service that can run Docker images.

The idea is simple:

- build the image
- test it locally
- push it to a registry
- run it in the cloud

### 5. Production Checklist

Before going live, check these things:

- Environment variables are set correctly
- Build works without errors
- API endpoints return the expected response
- Error handling is in place
- Secrets are not committed to Git
- App is tested on the production URL

---

## Notes for Participants

- Deployment is not just “uploading code”
- Always test locally before deploying
- Start simple, then improve the setup step by step
- Keep secrets and configuration outside the code

---

## Suggested Closing

At the end of the session, participants should understand the full path from local app to live app, and know the basic tools to keep shipping safely.

