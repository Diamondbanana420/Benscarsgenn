from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import random
import string
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

BRANDS = {
    "amazon": {
        "id": "amazon",
        "name": "Amazon",
        "format": "XXXX-XXXXXX-XXXX",
        "color": "#FF9900",
        "prefix": "AMZ"
    },
    "netflix": {
        "id": "netflix",
        "name": "Netflix",
        "format": "XXXX-XXXX-XXXX-XXXX",
        "color": "#E50914",
        "prefix": "NFX"
    },
    "spotify": {
        "id": "spotify",
        "name": "Spotify",
        "format": "XXXXXXXXXXXX",
        "color": "#1DB954",
        "prefix": "SPT"
    },
    "steam": {
        "id": "steam",
        "name": "Steam",
        "format": "XXXXX-XXXXX-XXXXX",
        "color": "#171A21",
        "prefix": "STM"
    },
    "apple": {
        "id": "apple",
        "name": "Apple",
        "format": "XXXXXXXXXXXXXXXX",
        "color": "#000000",
        "prefix": "APL"
    },
    "google_play": {
        "id": "google_play",
        "name": "Google Play",
        "format": "XXXX-XXXX-XXXX-XXXX-XXXX",
        "color": "#414141",
        "prefix": "GPY"
    },
    "uber_eats": {
        "id": "uber_eats",
        "name": "Uber Eats",
        "format": "XXXX-XXXX-XXXX-XXXX",
        "color": "#06C167",
        "prefix": "UBE"
    },
    "coles": {
        "id": "coles",
        "name": "Coles",
        "format": "XXXX-XXXX-XXXX-XXXX",
        "color": "#E01A22",
        "prefix": "COL"
    },
    "woolworths": {
        "id": "woolworths",
        "name": "Woolworths",
        "format": "XXXX-XXXX-XXXX-XXXX",
        "color": "#125F2A",
        "prefix": "WOW"
    },
    "seven_eleven": {
        "id": "seven_eleven",
        "name": "7-Eleven",
        "format": "XXXX-XXXX-XXXX",
        "color": "#F47321",
        "prefix": "7EL"
    },
    "shein": {
        "id": "shein",
        "name": "Shein",
        "format": "XXXX-XXXX-XXXX-XXXX",
        "color": "#000000",
        "prefix": "SHN"
    },
    "cotton_on": {
        "id": "cotton_on",
        "name": "Cotton On",
        "format": "XXXXX-XXXXX-XXXXX",
        "color": "#1A1A1A",
        "prefix": "CON"
    },
    "forever_new": {
        "id": "forever_new",
        "name": "Forever New",
        "format": "XXXX-XXXX-XXXX-XXXX",
        "color": "#C8A96E",
        "prefix": "FNW"
    }
}

class GeneratedCode(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    brand_id: str
    code: str
    timestamp: str

class StatsResponse(BaseModel):
    total_generations: int

def generate_code(format_str: str) -> str:
    chars = string.ascii_uppercase + string.digits
    result = []
    for ch in format_str:
        if ch == 'X':
            result.append(random.choice(chars))
        else:
            result.append(ch)
    return ''.join(result)

@api_router.get("/")
async def root():
    return {"message": "Negged CardGen API"}

@api_router.get("/brands")
async def get_brands():
    return list(BRANDS.values())

@api_router.post("/generate/{brand_id}")
async def generate_gift_card(brand_id: str):
    brand = BRANDS.get(brand_id)
    if not brand:
        return {"error": "Brand not found"}
    
    code = generate_code(brand["format"])
    
    doc = {
        "id": str(uuid.uuid4()),
        "brand_id": brand_id,
        "code": code,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    await db.generations.insert_one(doc)
    
    return {"brand_id": brand_id, "code": code, "id": doc["id"], "timestamp": doc["timestamp"]}

@api_router.get("/stats")
async def get_stats():
    count = await db.generations.count_documents({})
    return {"total_generations": count}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Serve frontend static files in production (Railway)
static_dir = ROOT_DIR / "static"
if static_dir.exists():
    app.mount("/static", StaticFiles(directory=str(static_dir / "static")), name="static-assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = static_dir / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(str(file_path))
        return FileResponse(str(static_dir / "index.html"))
