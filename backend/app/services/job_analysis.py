import re
import os
from openai import AsyncOpenAI
import json

client = AsyncOpenAI()

def extract_skills(job_description):
    # Example regex to extract skills (can be expanded)
    skills_pattern = r'\b(?:Python|Java|JavaScript|C\+\+|React|Node\.js|TensorFlow|Git|Docker|VS Code)\b'
    skills = re.findall(skills_pattern, job_description)
    return skills

def extract_requirements(job_description):
    # Example regex to extract requirements (can be expanded)
    requirements_pattern = r'\b(?:Bachelor|Master|PhD|experience|years|skills|knowledge)\b'
    requirements = re.findall(requirements_pattern, job_description)
    return requirements

async def extract_skills_with_openai(job_description):
    response = await client.chat.completions.create(model="gpt-3.5-turbo",
    response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
        {"role": "user", "content": f"Extract the skills from the following job description and return them as a JSON array of strings in a key named 'skills'. Job description: {job_description}"}
    ])
    content = response.choices[0].message.content
    try:
        skills = json.loads(content).get("skills", []) if content else []
    except json.JSONDecodeError:
        skills = []
    return skills

async def extract_requirements_with_openai(job_description):
    response = await client.chat.completions.create(model="gpt-3.5-turbo",
    response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
        {"role": "user", "content": f"Extract the requirements from the following job description and return them as a JSON array of strings in a key named 'requirements'. Job description: {job_description}"}
    ])
    content = response.choices[0].message.content
    try:
        requirements = json.loads(content).get("requirements", []) if content else []
    except json.JSONDecodeError:
        requirements = []
    return requirements

async def analyze_job_description(job_description):
    skills = await extract_skills_with_openai(job_description)
    requirements = await extract_requirements_with_openai(job_description)
    return {'skills': skills, 'requirements': requirements} 