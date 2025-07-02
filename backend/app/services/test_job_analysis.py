from job_analysis import analyze_job_description

# Sample job description for testing
sample_job_description = """
We are looking for a Software Engineer with experience in Python and JavaScript.
The ideal candidate should have a Bachelor's degree in Computer Science and at least 3 years of experience.
Knowledge of React and Node.js is a plus.
"""

# Call the function to analyze the job description
result = analyze_job_description(sample_job_description)

# Print the extracted skills and requirements
print('Extracted Skills:', result['skills'])
print('Extracted Requirements:', result['requirements']) 