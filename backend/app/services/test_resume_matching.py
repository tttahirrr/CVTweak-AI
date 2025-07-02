from resume_matching import match_resume_with_job_openai

# Sample resume text for testing
sample_resume_text = """
Tahir Tuzun
Computer Science Student
tahirtuzun1@gmail.com | 631-316-9994

EDUCATION
Stony Brook University
Bachelor of Science in Computer Science

SKILLS
Programming: Python, Java, C, JavaScript
Frameworks: React, Node.js, TensorFlow
Tools: Git, Docker, VS Code
"""

# Sample job description for testing
sample_job_description = """
We are looking for a Software Engineer with experience in Python and JavaScript.
The ideal candidate should have a Bachelor's degree in Computer Science and at least 3 years of experience.
Knowledge of React and Node.js is a plus.
"""

# Call the function to match the resume with the job description
tips = match_resume_with_job_openai(sample_resume_text, sample_job_description)

# Print the tips
print('Tips for Resume Improvement:', tips) 