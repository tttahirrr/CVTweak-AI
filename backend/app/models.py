from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from pgvector.sqlalchemy import Vector
from pydantic import BaseModel
from typing import List, Optional
import datetime
from .database import Base

class Resume(Base):
    """A resume document with its metadata and raw content."""
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # File metadata
    name = Column(String)          # Custom name given by user
    filename = Column(String)      # Original filename
    content_type = Column(String)  # PDF, LaTeX, etc.
    raw_text = Column(Text)        # Full text content
    
    # Relationships
    bullets = relationship("Bullet", back_populates="resume", cascade="all, delete-orphan")

class Bullet(Base):
    """A single bullet point from a resume, with its embedding."""
    __tablename__ = "bullets"

    id = Column(Integer, primary_key=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"))
    text = Column(Text)
    
    # Vector embedding (1536 dimensions for text-embedding-ada-002)
    embedding = Column(Vector(1536))
    
    # Relationships
    resume = relationship("Resume", back_populates="bullets")

    def __repr__(self):
        return f"<Bullet {self.id}: {self.text[:50]}...>"

# Pydantic models for API responses
class BulletRead(BaseModel):
    id: int
    text: str

    class Config:
        orm_mode = True

class ResumeRead(BaseModel):
    id: int
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None
    name: Optional[str] = None
    filename: Optional[str] = None
    content_type: Optional[str] = None
    raw_text: Optional[str] = None
    bullets: List[BulletRead] = []

    class Config:
        orm_mode = True 