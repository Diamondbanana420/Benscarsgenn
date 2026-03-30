# Negged CardGen

A gift card code generator for 13 popular brands. Generate random codes, copy to clipboard, and keep regenerating.

## Brands Supported

Amazon, Netflix, Spotify, Steam, Apple, Google Play, Uber Eats, Coles, Woolworths, 7-Eleven, Shein, Cotton On, Forever New

## Tech Stack

- **Frontend**: React, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB running locally
- Yarn

### Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Create .env file
echo 'MONGO_URL="mongodb://localhost:27017"' > .env
echo 'DB_NAME="negged_cardgen"' >> .env
echo 'CORS_ORIGINS="*"' >> .env

# Run
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Setup
```bash
cd frontend
yarn install

# Create .env file
echo 'REACT_APP_BACKEND_URL=http://localhost:8001' > .env

# Run
yarn start
```

The frontend runs on `http://localhost:3000` and the backend on `http://localhost:8001`.

## Deploy to Railway

### One-Click Deploy
1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) and create a new project
3. Select "Deploy from GitHub repo"
4. Add a **MongoDB** service from the Railway marketplace
5. Set these environment variables on the backend service:
   - `MONGO_URL` — use the MongoDB connection string from Railway (e.g., `mongodb://mongo:****@...`)
   - `DB_NAME` — `negged_cardgen`
   - `CORS_ORIGINS` — `*`
   - `PORT` — Railway sets this automatically
6. Deploy

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `DB_NAME` | Database name | `negged_cardgen` |
| `CORS_ORIGINS` | Allowed CORS origins | `*` |
| `PORT` | Server port (set by Railway) | `8001` |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Health check |
| GET | `/api/brands` | List all 13 brands |
| POST | `/api/generate/{brand_id}` | Generate a code for a brand |
| GET | `/api/stats` | Get total generation count |

## Project Structure
```
├── backend/
│   ├── server.py          # FastAPI app + static file serving
│   ├── requirements.txt   # Python dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main app
│   │   ├── components/
│   │   │   ├── HomePage.js    # Main page
│   │   │   ├── BrandCard.js   # Brand card component
│   │   │   └── BrandLogos.js  # Custom SVG brand logos
│   │   └── ...
│   ├── package.json
│   └── .env
├── Dockerfile             # Production Docker build
├── railway.json           # Railway deployment config
└── README.md
```

## License

MIT
