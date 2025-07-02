# CVTweak-AI Chrome Extension

A powerful Chrome extension that helps job seekers optimize their resumes and generate personalized cover letters using AI.

## Features

### 🗂️ Resume Management
- **Save Multiple Resumes**: Store different versions of your resume (e.g., "Data Science Resume", "Software Engineer Resume")
- **Custom Naming**: Give meaningful names to your resumes for easy identification
- **Quick Selection**: Switch between saved resumes using a dropdown selector
- **Delete Functionality**: Remove outdated resumes with a single click
- **Persistent Storage**: Your resumes are saved locally and persist across browser sessions

### 🤖 AI-Powered Analysis
- **Resume Optimization**: Get actionable tips to improve your resume for specific job descriptions
- **ATS Compatibility**: Ensure your resume passes Applicant Tracking Systems
- **Keyword Matching**: Identify missing keywords and skills
- **Bullet Point Enhancement**: Get suggestions for more impactful resume bullets

### ✍️ Cover Letter Generation
- **Personalized Letters**: Generate tailored cover letters for each job application
- **Company-Specific**: Automatically extracts company information from job descriptions
- **Professional Tone**: Uses expert writing principles for compelling cover letters
- **Quick Generation**: Create cover letters in seconds, not hours

## Installation

1. **Clone or Download** this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. **Click "Load unpacked"** and select the `chrome-extension` folder
5. **Pin the extension** to your toolbar for easy access

## Setup

### Backend Server
The extension requires a local backend server to function:

1. Navigate to the `backend` directory
2. Install dependencies: `pip install -r requirements.txt`
3. Start the server: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
4. Ensure the server is running on `http://localhost:8000`

### Database
The backend uses PostgreSQL with pgvector extension. Use Docker Compose for easy setup:
```bash
docker-compose up -d
```

## Usage

### First Time Setup
1. **Click the extension icon** in your Chrome toolbar
2. **Select "+ Upload New Resume"** from the dropdown
3. **Enter a descriptive name** (e.g., "Data Science Resume")
4. **Choose your PDF file**
5. **Paste the job description**
6. **Click "Analyze Resume"** or "Generate Cover Letter"

### Subsequent Uses
1. **Select your saved resume** from the dropdown
2. **Paste the new job description**
3. **Click your desired action**

### Managing Resumes
- **Switch Resumes**: Use the dropdown to select different saved resumes
- **Delete Resumes**: Click the "Delete" button next to the dropdown
- **Add New Resumes**: Select "+ Upload New Resume" to add more versions

## Workflow Examples

### For Data Science Roles
1. Upload "Data Science Resume" with ML/Python focus
2. For each job application:
   - Select "Data Science Resume"
   - Paste job description
   - Get tailored analysis and cover letter

### For Software Engineering Roles
1. Upload "Software Engineer Resume" with coding/systems focus
2. For each job application:
   - Select "Software Engineer Resume"
   - Paste job description
   - Get tailored analysis and cover letter

### For Career Transitions
1. Upload both "Current Field Resume" and "Target Field Resume"
2. Use appropriate resume based on the role
3. Get specific advice for each career path

## Technical Details

### Storage
- Uses Chrome Storage API for local data persistence
- Stores resume metadata (ID, name, filename, upload date)
- Actual resume content stored in backend database

### Security
- All data processed locally or on your controlled backend
- No third-party data sharing
- Resume content never leaves your control

### Performance
- Smart caching of uploaded resumes
- Minimal API calls by reusing stored data
- Fast switching between saved resumes

## Troubleshooting

### Extension Not Working
1. Check if backend server is running on `localhost:8000`
2. Verify database is accessible
3. Check browser console for errors (F12 → Console)

### Resume Upload Issues
1. Ensure file is a valid PDF
2. Check file size (should be under 10MB)
3. Verify PDF contains extractable text (not just images)

### Analysis/Cover Letter Errors
1. Confirm job description is not empty
2. Check internet connection for OpenAI API calls
3. Verify backend server logs for detailed error messages

## Future Enhancements

- **Resume Templates**: Pre-built templates for different industries
- **Bulk Analysis**: Analyze multiple resumes against one job description
- **Export Options**: Save analysis and cover letters as PDF/Word documents
- **Integration**: Connect with job boards for automated applications
- **Analytics**: Track application success rates and resume performance

## Support

For issues, feature requests, or contributions:
1. Check the backend server logs for detailed error messages
2. Review the browser console for client-side errors
3. Ensure all dependencies are properly installed
4. Verify the database connection is working

## Privacy

Your resume data is processed locally and stored in your controlled backend database. No personal information is shared with third parties beyond the OpenAI API calls for AI processing. 