import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file
# Look for .env file in the backend directory
backend_dir = Path(__file__).parent.parent
env_path = backend_dir / '.env'
load_dotenv(dotenv_path=env_path)

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from . import models, database
from .services import parser
from .services.embedding import get_embedding
from .services.job_analysis import analyze_job_description
from .services.resume_matching import match_resume_with_job_openai
from .services.cover_letter import generate_cover_letter
from pydantic import BaseModel
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

print("THIS IS THE REAL main.py BEING RUN")
app = FastAPI(title="CVTweak-AI Backend", version="0.1.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your extension's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    """Initialize database on startup."""
    try:
        await database.init_db()
        print("✅ Database initialized successfully")
    except Exception as e:
        print(f"⚠️ Database initialization failed: {e}")
        print("Server will continue without database connection")

print("Registering /health")
@app.get("/health", tags=["utility"])
async def healthcheck():
    """Simple health check endpoint."""
    return {"status": "ok"}

print("Registering /resume/upload")
@app.post("/resume/upload", tags=["resume"])
async def upload_resume(
    file: UploadFile = File(...),
    name: str = Form(...),
    session: AsyncSession = Depends(database.get_session)
):
    """Accept a resume file, parse it, embed bullets, and store in database."""
    try:
        # Validate file type
        if file.content_type not in {"application/pdf", "text/plain", "application/x-latex", "application/octet-stream"}:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        # Read file content
        content = await file.read()
        
        # Parse based on content type
        if file.content_type == "application/pdf":
            text, _ = await parser.parse_pdf(content)
            bullets = await parser.extract_bullets_openai(text)
        elif file.content_type == "application/x-latex":
            text, bullets = await parser.parse_latex(content)
        else:
            text = content.decode('utf-8')
            bullets = parser.extract_bullets(text)

        # Create resume record
        resume = models.Resume(
            name=name,
            filename=file.filename,
            content_type=file.content_type,
            raw_text=text
        )
        session.add(resume)
        await session.flush()  # Get the ID

        # Create bullet records with embeddings
        bullet_count = 0
        for bullet_text in bullets:
            if bullet_text.strip():
                embedding = await get_embedding(bullet_text)
                bullet = models.Bullet(
                    resume_id=resume.id,
                    text=bullet_text,
                    embedding=embedding
                )
                session.add(bullet)
                bullet_count += 1

        await session.commit()
        
        return JSONResponse({
            "resume_id": resume.id,
            "bullet_count": bullet_count
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@app.get("/resumes/{resume_id}", tags=["resume"], response_model=models.ResumeRead)
async def get_resume(resume_id: int, session: AsyncSession = Depends(database.get_session)):
    """Retrieve a resume and its bullets by ID."""
    result = await session.execute(
        select(models.Resume)
        .options(selectinload(models.Resume.bullets))
        .filter(models.Resume.id == resume_id)
    )
    resume = result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume

@app.get("/resumes", response_model=List[models.ResumeRead])
async def list_resumes(session: AsyncSession = Depends(database.get_session)):
    """List all resumes with their basic information (useful for debugging or future features)"""
    result = await session.execute(
        select(models.Resume)
        .options(selectinload(models.Resume.bullets))
    )
    resumes = result.scalars().all()
    return resumes

@app.delete("/resumes/{resume_id}")
async def delete_resume(resume_id: int, session: AsyncSession = Depends(database.get_session)):
    """Delete a resume and all its associated bullets from the database"""
    try:
        # First, get the resume to make sure it exists
        result = await session.execute(
            select(models.Resume).where(models.Resume.id == resume_id)
        )
        resume = result.scalar_one_or_none()
        
        if not resume:
            raise HTTPException(status_code=404, detail="Resume not found")
        
        # Delete the resume (bullets will be deleted automatically due to cascade)
        await session.delete(resume)
        await session.commit()
        
        return {"message": "Resume deleted successfully", "resumeId": resume_id}
    
    except HTTPException:
        raise
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting resume: {str(e)}")

class MatchRequest(BaseModel):
    resume_text: str
    job_description: str

print("Registering /resume/match")
@app.post('/resume/match', tags=["resume"])
async def match_resume(request: MatchRequest):
    """
    Analyzes a resume against a job description and returns improvement tips.
    """
    try:
        tips = await match_resume_with_job_openai(
            resume_text=request.resume_text,
            job_description=request.job_description
        )
        return {"tips": tips}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class JobDescriptionRequest(BaseModel):
    job_description: str

@app.post("/jobs/analyze", tags=["jobs"])
async def analyze_job(request: JobDescriptionRequest):
    """
    Analyzes a job description to extract skills and requirements.
    """
    try:
        analysis = await analyze_job_description(request.job_description)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class CoverLetterRequest(BaseModel):
    resume_id: int
    job_description: str
    company_name: Optional[str] = None
    hiring_manager_name: Optional[str] = None

@app.post("/cover-letter/generate", tags=["cover-letter"])
async def generate_cover_letter_endpoint(
    request: CoverLetterRequest,
    session: AsyncSession = Depends(database.get_session)
):
    """
    Generates a personalized cover letter based on a resume and job description.
    """
    try:
        # Get the resume
        result = await session.execute(
            select(models.Resume).filter(models.Resume.id == request.resume_id)
        )
        resume = result.scalars().first()
        if not resume:
            raise HTTPException(status_code=404, detail="Resume not found")
        
        # Generate the cover letter
        cover_letter_data = await generate_cover_letter(
            resume_text=resume.raw_text,
            job_description=request.job_description,
            company_name=request.company_name,
            hiring_manager_name=request.hiring_manager_name
        )
        
        return cover_letter_data
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Create tables on startup
@app.on_event("startup")
async def startup_event():
    # Create tables if they don't exist
    async with database.engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)
    
    # Test database connection
    try:
        async with database.engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        print("✅ Database connection successful")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 