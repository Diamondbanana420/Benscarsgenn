# Negged CardGen - PRD

## Original Problem Statement
Gift card generator with 13 brands, custom brand logos, Railway/GitHub deployment ready.

## Architecture
- **Backend**: FastAPI + MongoDB + static file serving for production
- **Frontend**: React + Tailwind + Shadcn UI + framer-motion + react-icons + custom SVG logos
- **Deployment**: Dockerfile + railway.json for Railway hosting

## What's Been Implemented (2026-03-30)
- [x] 13 brand gift card generators with custom SVG logos
- [x] "Negged CardGen" branding
- [x] "How does this work?" explanation section
- [x] Generate/Regenerate/Copy to clipboard
- [x] Stats counter, animated transitions, responsive grid
- [x] Railway deployment config (Dockerfile, railway.json)
- [x] .env.production for frontend build
- [x] Backend serves built frontend static files in production
- [x] README with full deployment instructions
- [x] .gitignore and .dockerignore

## Brands
Amazon, Netflix, Spotify, Steam, Apple, Google Play, Uber Eats, Coles, Woolworths, 7-Eleven, Shein, Cotton On, Forever New

## Deployment Files
- /app/Dockerfile
- /app/railway.json
- /app/.gitignore
- /app/.dockerignore
- /app/frontend/.env.production
- /app/README.md
