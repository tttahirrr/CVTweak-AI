from openai import AsyncOpenAI
import json

client = AsyncOpenAI()

async def generate_cover_letter(resume_text, job_description, company_name=None, hiring_manager_name=None):
    """
    Generate a personalized cover letter based on resume and job description.
    """
    
    system_prompt = """
You are an elite cover letter strategist and former hiring manager in the tech industry. I will provide you with a job description and a resume. Your task is to:

1. Analyze the job description to identify its top 3-5 required skills, values, and pain points.
2. Match each of those to concrete achievements from the resume - quantify results whenever possible.
3. Write a concise, persuasive cover letter (max 350 words) that:
   - Opens with a bold, attention-grabbing hook that ties experience directly to the company's goals.
   - Demonstrates understanding of the tech landscape and why this role matters.
   - Highlights the top 2-3 accomplishments (from the resume) that solve the employer's key challenges.
   - Uses strong, active language and industry terminology that resonates with tech recruiters.
   - Ends with a confident call to action asking for an interview.

Make it future-focused and innovative. Show how they'll drive measurable impact from day one. Keep it direct, no fluff.

**Critical Rules:**
- Write in natural, conversational language that sounds human
- Never use em dashes (—) anywhere in the response
- Avoid AI jargon like "I am writing to express my interest" or "I would welcome the opportunity"
- Use specific numbers, technologies, and achievements from the resume
- Make every sentence count toward getting an interview
- Sound confident but not arrogant
- Use simple punctuation: periods, commas, colons - nothing fancy

**Structure:**
Paragraph 1: Hook with immediate value proposition
Paragraph 2: Specific achievement that solves their problem
Paragraph 3: Additional relevant skills/impact potential  
Paragraph 4: Confident close with clear next step

Return only the cover letter body text. No addresses, no "Dear [Name]", no signature lines.
"""

    # Extract company name from job description if not provided
    if not company_name:
        try:
            company_extract_prompt = "Extract the company name from this job description. Return only the company name, nothing else:"
            company_response = await client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": company_extract_prompt},
                    {"role": "user", "content": job_description}
                ]
            )
            company_name = company_response.choices[0].message.content.strip() if company_response.choices[0].message.content else "this company"
        except:
            company_name = "this company"

    user_prompt = f"""
Write a compelling cover letter for this candidate applying to {company_name}.

**Resume:**
{resume_text}

**Job Description:**
{job_description}

Focus on creating a narrative that shows how this candidate's specific experiences and projects make them the perfect fit for this exact role. Be direct, be confident, and make the hiring manager excited to meet them.
"""

    response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )
    
    content = response.choices[0].message.content
    cover_letter = content.strip() if content else ""
    
    return {
        "cover_letter": cover_letter,
        "company_name": company_name
    } 