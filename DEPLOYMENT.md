# CVTweak-AI Deployment Guide

## 🚀 Publishing Your Chrome Extension

### Prerequisites
- Chrome Developer account ($5 one-time fee)
- Deployed backend server
- OpenAI API key

---

## 📡 Step 1: Deploy Backend

### Option A: Railway (Recommended)
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Navigate to backend: `cd backend`
4. Deploy: `railway up`
5. Add environment variables in Railway dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DATABASE_URL`: `sqlite+aiosqlite:///./cvtweak.db`

### Option B: Render
1. Connect your GitHub repo to [Render](https://render.com)
2. Create new Web Service
3. Use these settings:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DATABASE_URL`: `sqlite+aiosqlite:///./cvtweak.db`

### Option C: Heroku
```bash
# Install Heroku CLI
heroku create cvtweak-ai-backend
heroku config:set OPENAI_API_KEY=your_key_here
heroku config:set DATABASE_URL=sqlite+aiosqlite:///./cvtweak.db
git subtree push --prefix backend heroku main
```

---

## 🔧 Step 2: Update Extension Configuration

1. **Update API URL** in `chrome-extension/src/popup.js`:
   ```javascript
   const API_BASE_URL = 'https://your-deployed-backend.railway.app';
   ```

2. **Update manifest.json** host permissions:
   ```json
   "host_permissions": [
     "https://your-deployed-backend.railway.app/*"
   ]
   ```

3. **Update author info** in `manifest.json`:
   ```json
   "author": "Your Name",
   "homepage_url": "https://github.com/yourusername/CVTweak-AI"
   ```

---

## 📦 Step 3: Package Extension

Run the packaging script:
```bash
./package-extension.sh
```

This creates `cvtweak-ai-extension.zip` ready for Chrome Web Store.

---

## 🏪 Step 4: Chrome Web Store Submission

### 4.1 Create Developer Account
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Pay $5 one-time registration fee
3. Complete developer profile

### 4.2 Submit Extension
1. Click "Add new item"
2. Upload `cvtweak-ai-extension.zip`
3. Fill out store listing:

**Suggested Store Listing:**

**Title:** CVTweak-AI - Resume Optimizer & Cover Letter Generator

**Summary:** AI-powered resume optimization and cover letter generation. Get personalized feedback and improvements for any job application.

**Description:**
```
🚀 Transform your job applications with AI-powered resume optimization!

CVTweak-AI analyzes your resume against specific job descriptions and provides brutal, actionable feedback to maximize your interview chances.

✨ KEY FEATURES:
• Resume Analysis: Get percentage match scores and specific improvement suggestions
• Cover Letter Generation: Create tailored, powerful cover letters in seconds
• Keyword Optimization: Identify missing keywords and skills from job descriptions
• Multiple Resume Management: Store and switch between different resume versions
• Cyberpunk UI: Futuristic interface that makes optimization fun

🎯 HOW IT WORKS:
1. Upload your resume (PDF/text)
2. Paste any job description
3. Get instant, no-BS feedback on what to improve
4. Generate a custom cover letter
5. Copy optimized content and land more interviews

💡 PERFECT FOR:
• Job seekers wanting to optimize their applications
• Career changers targeting new industries
• Students applying for internships
• Professionals seeking better opportunities

🔐 PRIVACY: Your resume data is processed securely and not stored permanently.

Start getting more interviews today with CVTweak-AI!
```

**Category:** Productivity
**Language:** English

### 4.3 Screenshots & Assets
Create these promotional images:
- 1280x800 screenshot of the extension in action
- 440x280 small promotional tile
- 920x680 marquee image (optional)

### 4.4 Privacy & Permissions
- Explain why you need each permission
- Create privacy policy if collecting data

---

## 🌐 Alternative Distribution Methods

### GitHub Releases
For developer audience:
```bash
git tag v1.0.0
git push origin v1.0.0
# Create release on GitHub with extension zip
```

### Direct Installation Instructions
Users can install unpacked extension:
1. Download source code
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select `chrome-extension/src` folder

### Your Own Website
Create landing page with:
- Demo video
- Installation instructions
- Feature explanations
- Chrome Web Store link

---

## 📊 Post-Launch

### Analytics
- Monitor Chrome Web Store analytics
- Track user reviews and ratings
- Monitor backend API usage

### Updates
- Version bump in `manifest.json`
- Re-package and upload to store
- Updates auto-push to users

### Marketing
- Social media posts
- Product Hunt launch
- Tech blog articles
- Reddit communities (r/jobs, r/resumes)

---

## 🔧 Troubleshooting

**Common Issues:**
- CORS errors: Ensure backend allows extension origins
- API failures: Check backend logs and API key
- Manifest errors: Validate JSON syntax
- Permission denied: Update host_permissions

**Testing:**
- Test with different resume formats
- Test with various job descriptions
- Test on different websites
- Test offline behavior

---

## 💰 Monetization Ideas (Future)

- Premium features (advanced analysis)
- API rate limiting for free users
- White-label solutions for recruiting companies
- Integration with job boards
- Resume templates marketplace

---

Need help? Check the logs or create an issue on GitHub! 