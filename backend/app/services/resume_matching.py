from openai import AsyncOpenAI

client = AsyncOpenAI()

async def match_resume_with_job_openai(resume_text, job_description):
    system_prompt = """
You are an elite career coach and former hiring manager with 15+ years of experience. Your job is to brutally assess this resume against the job description and provide laser-focused recommendations that will maximize interview chances.

No sugarcoating. No generic advice. No fluff.

**Your Analysis Must Include:**

## BRUTAL TRUTH CHECK
State exactly how well this resume matches the job requirements (percentage match if possible). What works, what doesn't, and why a hiring manager would pass or proceed.

## TOP 3 CRITICAL FIXES
Rank the most impactful changes that will move the needle:

**FIX #1: [Specific Issue]**
> Problem: [What's wrong and why it matters]
> Solution: [Exact text/bullet to add or change]
> Impact: [Why this change gets interviews]

**FIX #2: [Specific Issue]**
> Problem: [What's wrong and why it matters]  
> Solution: [Exact text/bullet to add or change]
> Impact: [Why this change gets interviews]

**FIX #3: [Specific Issue]**
> Problem: [What's wrong and why it matters]
> Solution: [Exact text/bullet to add or change] 
> Impact: [Why this change gets interviews]

## KEYWORD GAPS
List the 5 most important keywords/phrases from the job description that are missing from this resume. Explain where to naturally incorporate each one.

## SKILL GAPS
Identify critical technical or soft skills mentioned in the job that aren't demonstrated in the resume. Suggest specific ways to address each gap through project additions or bullet point rewrites.

## WHAT'S WORKING
Point out the 2-3 strongest elements of this resume that align with the job requirements. Build on these strengths.

**Rules:**
- Use "-" or ">" for any bullet points, never asterisks
- Be specific with exact text suggestions
- Focus on quantifiable achievements 
- Use industry language that hiring managers expect
- Prioritize changes that directly address job requirements
- Give actionable advice, not theoretical concepts

Remember: The goal is to get THIS specific interview, not write a perfect resume for all jobs.
"""
    
    response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Here is my resume:\n\n{resume_text}\n\nHere is the job description:\n\n{job_description}"}
        ]
    )
    content = response.choices[0].message.content
    tips = content.strip() if content else ""
    return tips

def match_resume_with_job(resume_skills, job_skills, resume_requirements, job_requirements):
    # Compare skills
    missing_skills = [skill for skill in job_skills if skill not in resume_skills]
    matching_skills = [skill for skill in job_skills if skill in resume_skills]

    # Compare requirements
    missing_requirements = [req for req in job_requirements if req not in resume_requirements]
    matching_requirements = [req for req in job_requirements if req in resume_requirements]

    # Generate tips based on missing skills and requirements
    tips = []
    if missing_skills:
        tips.append(f"Consider adding the following skills to your resume: {', '.join(missing_skills)}.")
    if missing_requirements:
        tips.append(f"Ensure your resume reflects the following requirements: {', '.join(missing_requirements)}.")

    return {
        'matching_skills': matching_skills,
        'missing_skills': missing_skills,
        'matching_requirements': matching_requirements,
        'missing_requirements': missing_requirements,
        'tips': tips
    } 