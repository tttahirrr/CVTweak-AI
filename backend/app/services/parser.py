import re
from typing import List, Tuple
import pdfplumber
from io import BytesIO
import os
from openai import AsyncOpenAI
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Set up OpenAI client
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_bullets(text: str) -> List[str]:
    """Extract bullet points from text using common patterns."""
    # Common bullet point patterns
    patterns = [
        r'•\s*(.*?)(?=\n•|\n\n|$)',  # • bullet
        r'[-–—]\s*(.*?)(?=\n[-–—]|\n\n|$)',  # - or – or — bullet
        r'\*\s*(.*?)(?=\n\*|\n\n|$)',  # * bullet
        r'\d+\.\s*(.*?)(?=\n\d+\.|\n\n|$)',  # 1. numbered
    ]
    
    bullets = []
    for pattern in patterns:
        matches = re.finditer(pattern, text, re.MULTILINE | re.DOTALL)
        for match in matches:
            bullet_text = match.group(1).strip()
            if bullet_text and len(bullet_text) > 5:  # Filter out very short or empty bullets
                bullets.append(bullet_text)
    
    return bullets

async def extract_bullets_openai(text: str) -> List[str]:
    """Use OpenAI API to extract bullet points from resume text."""
    prompt = (
        "Extract all the resume bullet points from the following text. "
        "Return only the bullet points as a numbered list.\n\n" + text
    )
    response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that extracts bullet points from resumes."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=512,
        temperature=0.0,
    )
    content = response.choices[0].message.content
    if not content:
        return []
    # Parse the response into a list of bullet points
    bullets = []
    for line in content.split('\n'):
        line = line.strip()
        if line and (line[0].isdigit() and (line[1] == '.' or line[1] == ')')):
            bullet = line[2:].strip(" .-)")
            if bullet:
                bullets.append(bullet)
        elif line.startswith('•'):
            bullet = line[1:].strip()
            if bullet:
                bullets.append(bullet)
    return bullets

async def parse_pdf(file_content: bytes) -> Tuple[str, List[str]]:
    """Parse PDF content into raw text and bullet points."""
    try:
        with pdfplumber.open(BytesIO(file_content)) as pdf:
            # Extract text from all pages
            text = ""
            for page in pdf.pages:
                # Extract text without layout preservation
                page_text = page.extract_text(layout=False)
                if page_text:
                    text += page_text + "\n"
                else:
                    # Fallback: extract words and reconstruct text
                    words = page.extract_words()
                    if words:
                        text += " ".join(word["text"] for word in words) + "\n"
            
            # Log the extracted text for debugging
            logger.info("Extracted text from PDF: %s", text)
            
            # Clean up the text
            text = re.sub(r'\s+', ' ', text)  # Normalize whitespace
            text = re.sub(r'•\s*', '• ', text)  # Normalize bullet points
            
            # Extract bullet points
            bullets = extract_bullets(text)
            
            return text, bullets
    except Exception as e:
        raise ValueError(f"Failed to parse PDF: {str(e)}")

async def parse_latex(file_content: bytes) -> Tuple[str, List[str]]:
    """Parse LaTeX content into raw text and bullet points."""
    try:
        # Convert bytes to string
        text = file_content.decode('utf-8')
        
        # Remove LaTeX commands (basic cleanup)
        text = re.sub(r'\\[a-zA-Z]+(\{[^}]*\})?', '', text)
        text = re.sub(r'\\[a-zA-Z]+', '', text)
        
        # Extract bullet points
        bullets = extract_bullets(text)
        
        return text, bullets
    except Exception as e:
        raise ValueError(f"Failed to parse LaTeX: {str(e)}") 