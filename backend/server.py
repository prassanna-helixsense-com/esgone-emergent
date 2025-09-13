from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
import jwt
import bcrypt
import uuid
from pathlib import Path
from dotenv import load_dotenv
import logging
import random
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Settings
JWT_SECRET = "your-secret-key-here"
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DELTA = timedelta(days=7)

# Create the main app without a prefix
app = FastAPI(title="ESGone Platform API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Pydantic Models
class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    email: str
    password: str
    name: str
    company: Optional[str] = None

class User(BaseModel):
    id: str
    email: str
    name: str
    company: Optional[str] = None
    role: str = "user"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Asset(BaseModel):
    id: str
    name: str
    category: str
    status: str  # operational, maintenance, critical
    condition: str  # excellent, good, fair, poor
    location: str
    repair_cost: float
    replacement_cost: float
    co2_impact: float
    efficiency: int
    last_maintenance: str
    next_maintenance: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    status: str  # planning, in-progress, completed, on-hold
    priority: str  # high, medium, low
    progress: int = 0
    budget: float
    spent: float = 0
    start_date: str
    end_date: str
    team: List[str] = []
    category: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MonitoringData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # energy, water, temperature, air_quality
    value: float
    unit: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    location: str
    device_id: str

class SustainabilityGoal(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    target: str
    progress: int
    status: str  # on-track, ahead, at-risk
    description: str
    metrics: List[Dict[str, Any]] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Report(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # performance, environmental, social, governance
    framework: str  # GRI, TCFD, SASB, SDG
    frequency: str  # weekly, monthly, quarterly, annual
    status: str  # ready, generating, draft, error
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    data: Dict[str, Any] = {}
    file_path: Optional[str] = None

# Helper functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_jwt_token(user_id: str) -> str:
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + JWT_EXPIRATION_DELTA
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await db.users.find_one({"_id": user_id})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Initialize sample data
async def initialize_sample_data():
    # Check if data already exists
    if await db.assets.count_documents({}) > 0:
        return
    
    # Sample assets
    sample_assets = [
        {
            "_id": "HVAC-001",
            "name": "HVAC System - Building A",
            "category": "HVAC",
            "status": "operational",
            "condition": "good",
            "location": "Building A - Floor 3",
            "repair_cost": 15000,
            "replacement_cost": 85000,
            "co2_impact": 25000,
            "efficiency": 82,
            "last_maintenance": "2024-01-15",
            "next_maintenance": "2024-04-15",
            "created_at": datetime.utcnow()
        },
        {
            "_id": "PUMP-002",
            "name": "Water Circulation Pump",
            "category": "Water Systems",
            "status": "maintenance",
            "condition": "fair",
            "location": "Basement - Mechanical Room",
            "repair_cost": 8500,
            "replacement_cost": 35000,
            "co2_impact": 12000,
            "efficiency": 75,
            "last_maintenance": "2024-02-10",
            "next_maintenance": "2024-03-10",
            "created_at": datetime.utcnow()
        },
        {
            "_id": "LED-003",
            "name": "LED Lighting Array",
            "category": "Lighting",
            "status": "operational",
            "condition": "excellent",
            "location": "Building B - All Floors",
            "repair_cost": 2500,
            "replacement_cost": 18000,
            "co2_impact": 5500,
            "efficiency": 95,
            "last_maintenance": "2024-01-20",
            "next_maintenance": "2024-07-20",
            "created_at": datetime.utcnow()
        },
        {
            "_id": "BOILER-004",
            "name": "Industrial Boiler",
            "category": "Heating",
            "status": "critical",
            "condition": "poor",
            "location": "Building C - Basement",
            "repair_cost": 45000,
            "replacement_cost": 180000,
            "co2_impact": 75000,
            "efficiency": 65,
            "last_maintenance": "2023-12-01",
            "next_maintenance": "2024-02-01",
            "created_at": datetime.utcnow()
        }
    ]
    
    await db.assets.insert_many(sample_assets)
    
    # Sample sustainability goals
    sample_goals = [
        {
            "_id": str(uuid.uuid4()),
            "title": "Carbon Neutral Operations",
            "target": "2025",
            "progress": 75,
            "status": "on-track",
            "description": "Achieve net-zero carbon emissions across all facilities",
            "metrics": [
                {"name": "Energy Efficiency", "value": 78, "target": 85},
                {"name": "Renewable Energy", "value": 62, "target": 80},
                {"name": "Carbon Offset", "value": 45, "target": 60}
            ],
            "created_at": datetime.utcnow()
        },
        {
            "_id": str(uuid.uuid4()),
            "title": "Waste Reduction Initiative",
            "target": "2024",
            "progress": 90,
            "status": "ahead",
            "description": "Reduce operational waste by 50%",
            "metrics": [
                {"name": "Recycling Rate", "value": 85, "target": 75},
                {"name": "Waste Diversion", "value": 92, "target": 80},
                {"name": "Circular Economy", "value": 68, "target": 70}
            ],
            "created_at": datetime.utcnow()
        }
    ]
    
    await db.sustainability_goals.insert_many(sample_goals)

# Authentication endpoints
@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_jwt_token(user["_id"])
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["_id"],
            "email": user["email"],
            "name": user["name"],
            "company": user.get("company")
        }
    }

@api_router.post("/auth/register")
async def register(user_data: UserRegister):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user_data.password)
    
    user_doc = {
        "_id": user_id,
        "email": user_data.email,
        "name": user_data.name,
        "company": user_data.company,
        "password_hash": hashed_password,
        "role": "user",
        "created_at": datetime.utcnow()
    }
    
    await db.users.insert_one(user_doc)
    
    token = create_jwt_token(user_id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user_data.email,
            "name": user_data.name,
            "company": user_data.company
        }
    }

# Dashboard endpoints
@api_router.get("/dashboard/summary")
async def get_dashboard_summary(current_user = Depends(get_current_user)):
    # Get assets summary
    assets = await db.assets.find().to_list(1000)
    
    total_repair_cost = sum(asset["repair_cost"] for asset in assets)
    total_replacement_cost = sum(asset["replacement_cost"] for asset in assets)
    total_co2_avoided = sum(asset["co2_impact"] for asset in assets if asset["status"] != "critical")
    
    return {
        "total_repair_cost": total_repair_cost,
        "total_replacement_cost": total_replacement_cost,
        "total_co2_avoided": total_co2_avoided,
        "assets_count": len(assets),
        "operational_assets": len([a for a in assets if a["status"] == "operational"]),
        "maintenance_assets": len([a for a in assets if a["status"] == "maintenance"]),
        "critical_assets": len([a for a in assets if a["status"] == "critical"])
    }

# Asset Management endpoints
@api_router.get("/assets")
async def get_assets(current_user = Depends(get_current_user)):
    assets = await db.assets.find().to_list(1000)
    return assets

@api_router.post("/assets")
async def create_asset(asset: Asset, current_user = Depends(get_current_user)):
    asset_dict = asset.dict()
    asset_dict["_id"] = asset_dict.pop("id")
    result = await db.assets.insert_one(asset_dict)
    return {"id": str(result.inserted_id)}

@api_router.put("/assets/{asset_id}")
async def update_asset(asset_id: str, asset: Asset, current_user = Depends(get_current_user)):
    asset_dict = asset.dict()
    asset_dict.pop("id", None)
    result = await db.assets.update_one({"_id": asset_id}, {"$set": asset_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Asset not found")
    return {"message": "Asset updated successfully"}

# Planning endpoints
@api_router.get("/planning/goals")
async def get_sustainability_goals(current_user = Depends(get_current_user)):
    goals = await db.sustainability_goals.find().to_list(1000)
    return goals

@api_router.post("/planning/goals")
async def create_goal(goal: SustainabilityGoal, current_user = Depends(get_current_user)):
    goal_dict = goal.dict()
    goal_dict["_id"] = goal_dict.pop("id")
    result = await db.sustainability_goals.insert_one(goal_dict)
    return {"id": str(result.inserted_id)}

# Implementation endpoints
@api_router.get("/implementation/projects")
async def get_projects(current_user = Depends(get_current_user)):
    projects = await db.projects.find().to_list(1000)
    return projects

@api_router.post("/implementation/projects")
async def create_project(project: Project, current_user = Depends(get_current_user)):
    project_dict = project.dict()
    project_dict["_id"] = project_dict.pop("id")
    result = await db.projects.insert_one(project_dict)
    return {"id": str(result.inserted_id)}

# Monitoring endpoints
@api_router.get("/monitoring/realtime")
async def get_realtime_data(current_user = Depends(get_current_user)):
    # Generate simulated real-time data
    return {
        "energy_consumption": {
            "current": random.uniform(2800, 2900),
            "unit": "kWh",
            "change": random.uniform(-10, -2),
            "status": "good"
        },
        "water_usage": {
            "current": random.uniform(1200, 1300),
            "unit": "L/hr", 
            "change": random.uniform(-10, -5),
            "status": "excellent"
        },
        "temperature": {
            "current": random.uniform(21, 24),
            "unit": "°C",
            "change": random.uniform(-2, 3),
            "status": "normal"
        },
        "air_quality": {
            "current": random.randint(80, 90),
            "unit": "AQI",
            "change": random.uniform(-5, 2),
            "status": "good"
        }
    }

@api_router.get("/monitoring/alerts")
async def get_alerts(current_user = Depends(get_current_user)):
    return [
        {
            "id": 1,
            "type": "warning",
            "message": "Energy consumption spike detected in Building A",
            "timestamp": "2 minutes ago",
            "severity": "medium"
        },
        {
            "id": 2,
            "type": "info",
            "message": "Water recycling system maintenance completed",
            "timestamp": "15 minutes ago",
            "severity": "low"
        }
    ]

# Reporting endpoints
@api_router.get("/reports")
async def get_reports(current_user = Depends(get_current_user)):
    reports = await db.reports.find().to_list(1000)
    return reports

@api_router.post("/reports/generate")
async def generate_report(report_type: str, framework: str, current_user = Depends(get_current_user)):
    report_id = str(uuid.uuid4())
    report_data = {
        "_id": report_id,
        "name": f"{framework} {report_type} Report",
        "type": report_type,
        "framework": framework,
        "frequency": "on-demand",
        "status": "ready",
        "generated_at": datetime.utcnow(),
        "data": {"generated": True},
        "file_path": None
    }
    
    await db.reports.insert_one(report_data)
    return {"id": report_id, "message": "Report generated successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    await initialize_sample_data()
    logger.info("ESGone Platform API started successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()