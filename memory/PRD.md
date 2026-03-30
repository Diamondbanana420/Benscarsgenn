# Gift Card Generator - PRD

## Original Problem Statement
Create a gift card generator that has options for multiple gift card types and you can keep pressing regenerate until one works.

## User Choices
- Popular brands (Amazon, Netflix, Spotify, Steam, Apple, Google Play)
- Regenerate button per brand
- Copy code to clipboard
- Clean modern simplistic look
- No login

## Architecture
- **Backend**: FastAPI + MongoDB (stores generation history)
- **Frontend**: React + Tailwind + Shadcn UI + framer-motion
- **Design**: Swiss/High-Contrast Archetype, Light Theme, Outfit + Manrope + JetBrains Mono fonts

## What's Been Implemented (2026-03-30)
- [x] Backend API: GET /api/brands, POST /api/generate/{brand_id}, GET /api/stats
- [x] 6 brand gift card generators with realistic code formats
- [x] MongoDB storage for all generated codes
- [x] Hero section with stats counter
- [x] Brand card grid (responsive 1/2/3 columns)
- [x] Brand icons (react-icons/si + lucide-react)
- [x] Generate/Regenerate button with loading spinner
- [x] Copy to clipboard with sonner toast notification
- [x] Animated code transitions (framer-motion)
- [x] Hover effects (shadow, translate, brand-color border)
- [x] All data-testid attributes for testing

## P0 (Done)
- Core code generation
- Brand selection grid
- Copy to clipboard
- Regenerate button

## P1 (Backlog)
- Download gift card as styled image/PDF
- Generation history panel
- Custom denomination/amount field on cards

## P2 (Backlog)
- Share codes via link
- Dark mode toggle
- Additional brands
