# Negged CardGen - PRD

## Original Problem Statement
Gift card generator with 13 brands, verify button (every 5th attempt passes), custom brand logos, Railway/GitHub ready.

## Architecture
- **Backend**: FastAPI + MongoDB (generations + verify_counters collections)
- **Frontend**: React + Tailwind + Shadcn UI + framer-motion + react-icons + custom SVG logos

## What's Been Implemented (2026-03-30)
- [x] 13 brand gift card generators with custom SVG logos
- [x] Verify button per card — every 5th attempt per brand returns "verified"
- [x] Visual feedback: green ring + "Verified" or red ring + "Not valid"
- [x] Regenerating resets verify status
- [x] "How it works" section with verifier instructions (no odds/chance text)
- [x] Generate/Regenerate/Copy/Verify buttons
- [x] Railway deployment config (Dockerfile, railway.json)
- [x] Full README with deployment instructions

## API Endpoints
- GET /api/brands
- POST /api/generate/{brand_id}
- POST /api/verify/{brand_id}
- GET /api/stats
