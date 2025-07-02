// API Configuration - Update this after deploying your backend
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000' 
    : 'https://your-app-name.railway.app'; // Replace with your actual deployment URL

// Cyberpunk sound effects (using Web Audio API for synthetic sounds)
class CyberSounds {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playBeep(frequency = 800, duration = 100) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    playError() {
        this.playBeep(200, 300);
        setTimeout(() => this.playBeep(150, 300), 100);
    }

    playSuccess() {
        this.playBeep(600, 150);
        setTimeout(() => this.playBeep(800, 150), 100);
        setTimeout(() => this.playBeep(1000, 150), 200);
    }

    playClick() {
        this.playBeep(1200, 50);
    }

    playStartup() {
        this.playBeep(400, 200);
        setTimeout(() => this.playBeep(600, 200), 200);
        setTimeout(() => this.playBeep(800, 200), 400);
        setTimeout(() => this.playBeep(1000, 300), 600);
    }
}

const sounds = new CyberSounds();

// Quick futuristic static loader
class BrutalistLoader {
    static createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'brutalist-loader';
        loader.innerHTML = `
            <div class="static-overlay"></div>
            <div class="tv-static"></div>
        `;
        
        const loaderStyles = `
            #brutalist-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0d0d0d;
                z-index: 9999;
                animation: staticFade 0.5s ease-out forwards;
            }
            
            .static-overlay {
                width: 100%;
                height: 100%;
                background: 
                    radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.8) 0%, transparent 50%),
                    radial-gradient(circle at 70% 30%, rgba(255, 0, 255, 0.8) 0%, transparent 50%),
                    radial-gradient(circle at 50% 10%, rgba(255, 255, 0, 0.6) 0%, transparent 40%),
                    radial-gradient(circle at 10% 50%, rgba(255, 20, 147, 0.7) 0%, transparent 45%),
                    repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 1px,
                        rgba(0, 255, 255, 0.4) 1px,
                        rgba(0, 255, 255, 0.4) 2px
                    ),
                    repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 1px,
                        rgba(255, 0, 255, 0.3) 1px,
                        rgba(255, 0, 255, 0.3) 2px
                    ),
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 1px,
                        rgba(255, 255, 0, 0.2) 1px,
                        rgba(255, 255, 0, 0.2) 2px
                    );
                animation: staticNoise 0.08s linear infinite;
            }
            
            @keyframes staticNoise {
                0% { 
                    opacity: 1;
                    transform: translateX(0) translateY(0) scale(1);
                }
                25% { 
                    opacity: 0.7;
                    transform: translateX(1px) translateY(-1px) scale(1.01);
                }
                50% { 
                    opacity: 0.9;
                    transform: translateX(-1px) translateY(1px) scale(0.99);
                }
                75% { 
                    opacity: 0.8;
                    transform: translateX(1px) translateY(0) scale(1.01);
                }
                100% { 
                    opacity: 1;
                    transform: translateX(0) translateY(-1px) scale(1);
                }
            }
            
            .tv-static {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: 
                    repeating-linear-gradient(
                        0deg,
                        transparent 0px,
                        rgba(255, 255, 255, 0.03) 1px,
                        transparent 2px
                    ),
                    repeating-linear-gradient(
                        90deg,
                        transparent 0px,
                        rgba(255, 255, 255, 0.03) 1px,
                        transparent 2px
                    );
                opacity: 0.8;
                animation: tvStatic 0.08s steps(8, end) infinite;
                mix-blend-mode: screen;
            }
            
            .tv-static::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(circle at 10% 20%, rgba(0, 255, 255, 0.9) 1px, transparent 1px),
                    radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.9) 1px, transparent 1px),
                    radial-gradient(circle at 40% 40%, rgba(255, 255, 0, 0.8) 1px, transparent 1px),
                    radial-gradient(circle at 20% 80%, rgba(255, 20, 147, 0.8) 1px, transparent 1px),
                    radial-gradient(circle at 80% 20%, rgba(0, 255, 127, 0.7) 1px, transparent 1px),
                    radial-gradient(circle at 60% 20%, rgba(255, 69, 0, 0.8) 1px, transparent 1px);
                background-size: 16px 16px, 24px 24px, 12px 12px, 18px 18px, 14px 14px, 20px 20px;
                opacity: 0.4;
                animation: staticNoise 0.06s linear infinite;
            }
            
            .tv-static::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(circle at 30% 60%, rgba(0, 255, 255, 1) 0.5px, transparent 0.5px),
                    radial-gradient(circle at 70% 30%, rgba(255, 0, 255, 1) 0.5px, transparent 0.5px),
                    radial-gradient(circle at 90% 70%, rgba(255, 255, 0, 0.9) 0.5px, transparent 0.5px),
                    radial-gradient(circle at 50% 90%, rgba(255, 20, 147, 0.8) 0.5px, transparent 0.5px),
                    radial-gradient(circle at 15% 15%, rgba(57, 255, 20, 0.9) 0.5px, transparent 0.5px),
                    radial-gradient(circle at 85% 15%, rgba(255, 69, 0, 0.8) 0.5px, transparent 0.5px);
                background-size: 8px 8px, 12px 12px, 6px 6px, 10px 10px, 5px 5px, 7px 7px;
                opacity: 0.6;
                animation: staticFlicker 0.04s linear infinite;
            }
            
            @keyframes tvStatic {
                0% { transform: translateX(0) translateY(0); }
                12.5% { transform: translateX(-1px) translateY(1px); }
                25% { transform: translateX(1px) translateY(0); }
                37.5% { transform: translateX(0) translateY(-1px); }
                50% { transform: translateX(-1px) translateY(-1px); }
                62.5% { transform: translateX(1px) translateY(1px); }
                75% { transform: translateX(0) translateY(1px); }
                87.5% { transform: translateX(-1px) translateY(0); }
                100% { transform: translateX(1px) translateY(-1px); }
            }
            
            @keyframes staticNoise {
                0% { 
                    background-position: 0px 0px, 4px 4px, 8px 0px, 2px 6px, 6px 2px, 10px 8px;
                    opacity: 0.4;
                }
                25% { 
                    background-position: 2px 1px, 6px 3px, 1px 7px, 9px 1px, 3px 9px, 7px 5px;
                    opacity: 0.6;
                }
                50% { 
                    background-position: 1px 3px, 8px 1px, 5px 5px, 3px 8px, 7px 2px, 2px 6px;
                    opacity: 0.3;
                }
                75% { 
                    background-position: 3px 2px, 1px 6px, 9px 3px, 5px 9px, 8px 1px, 4px 7px;
                    opacity: 0.5;
                }
                100% { 
                    background-position: 4px 4px, 2px 8px, 6px 1px, 8px 5px, 1px 3px, 9px 9px;
                    opacity: 0.4;
                }
            }
            
            @keyframes staticFlicker {
                0% { 
                    background-position: 0px 0px, 3px 3px, 6px 1px, 2px 4px;
                    opacity: 0.8;
                }
                33% { 
                    background-position: 1px 2px, 4px 1px, 2px 5px, 5px 2px;
                    opacity: 0.4;
                }
                66% { 
                    background-position: 2px 1px, 1px 4px, 4px 2px, 3px 5px;
                    opacity: 0.7;
                }
                100% { 
                    background-position: 3px 3px, 2px 2px, 5px 4px, 1px 1px;
                    opacity: 0.5;
                }
            }
            
            @keyframes staticFade {
                0% { 
                    opacity: 1;
                }
                80% { 
                    opacity: 1;
                }
                100% { 
                    opacity: 0;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = loaderStyles;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(loader);
        
        // Quick removal after 0.25 seconds
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
            if (styleSheet.parentNode) {
                styleSheet.parentNode.removeChild(styleSheet);
            }
        }, 250);
    }
}

// Enhanced UI animations
class CyberUI {
    static showThinkingAnimation(element, text = 'PROCESSING...') {
        element.classList.add('loading');
        element.textContent = text;
        
        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            element.textContent = text + '.'.repeat(dots);
        }, 500);
        
        return interval;
    }

    static hideThinkingAnimation(element, interval) {
        element.classList.remove('loading');
        clearInterval(interval);
    }

    static glitchEffect(element, duration = 1000) {
        element.classList.add('error');
        setTimeout(() => {
            element.classList.remove('error');
        }, duration);
    }

    static typewriterEffect(element, text, speed = 1) {
        element.textContent = '';
        let i = 0;
        
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                if (Math.random() > 0.98) sounds.playBeep(1000 + Math.random() * 500, 15);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }

    static pulseButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    static showSystemMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `system-message ${type}`;
        messageDiv.textContent = message;
        
        const messageStyles = `
            .system-message {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 10px 15px;
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                z-index: 1000;
                border-radius: 0;
                animation: messageSlide 0.3s ease-out;
                max-width: 200px;
                word-wrap: break-word;
            }
            
            .system-message.info {
                background: linear-gradient(45deg, #00FFFF, #0080FF);
                color: #0d0d0d;
                box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            }
            
            .system-message.success {
                background: linear-gradient(45deg, #39FF14, #CCFF00);
                color: #0d0d0d;
                box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
            }
            
            .system-message.error {
                background: linear-gradient(45deg, #FF073A, #FF4500);
                color: white;
                box-shadow: 0 0 20px rgba(255, 7, 58, 0.5);
            }
            
            @keyframes messageSlide {
                0% {
                    transform: translateX(100%);
                    opacity: 0;
                }
                100% {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        if (!document.getElementById('system-message-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'system-message-styles';
            styleSheet.textContent = messageStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(messageDiv);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
}

// Enhanced error handling with cyberpunk styling
function showError(message, element = null) {
    const errorText = `❌ SYSTEM ERROR: ${message}`;
    
    if (element) {
        element.textContent = errorText;
        CyberUI.glitchEffect(element);
    } else {
        document.getElementById('results').textContent = errorText;
        CyberUI.glitchEffect(document.getElementById('results'));
    }
    
    CyberUI.showSystemMessage(message, 'error');
    sounds.playError();
    console.error('CVTweak Error:', message);
}

// Enhanced success feedback
function showSuccess(message, element = null) {
    const successText = `✅ OPERATION COMPLETE: ${message}`;
    
    if (element) {
        CyberUI.typewriterEffect(element, successText);
    }
    
    CyberUI.showSystemMessage(message, 'success');
    sounds.playSuccess();
}

// Resume management with enhanced UI
async function loadResumes() {
    try {
        CyberUI.showSystemMessage('LOADING RESUME VAULT...', 'info');
        
        const response = await fetch(`${API_BASE_URL}/resumes`);
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);
        
        const resumes = await response.json();
        const selector = document.getElementById('resume-selector');
        
        // Clear existing options with animation
        selector.style.opacity = '0.5';
        setTimeout(() => {
            selector.innerHTML = '<option value="">SELECT RESUME...</option>';
            
            if (resumes.length === 0) {
                selector.innerHTML += '<option value="" disabled>NO RESUMES FOUND</option>';
            } else {
                resumes.forEach(resume => {
                    const option = document.createElement('option');
                    option.value = resume.id;
                    option.textContent = resume.name;
                    selector.appendChild(option);
                });
            }
            
            selector.innerHTML += '<option value="upload-new">+ UPLOAD NEW RESUME</option>';
            selector.style.opacity = '1';
        }, 200);

        // Load from local storage if available
        const savedResumes = JSON.parse(localStorage.getItem('cvtweak_resumes') || '[]');
        savedResumes.forEach(resume => {
            if (!resumes.find(r => r.id === resume.id)) {
                const option = document.createElement('option');
                option.value = resume.id;
                option.textContent = resume.name;
                option.style.opacity = '0.7';
                selector.appendChild(option);
            }
        });

        CyberUI.showSystemMessage('RESUME VAULT LOADED', 'success');

    } catch (error) {
        showError(`Failed to load resume vault: ${error.message}`);
        document.getElementById('resume-selector').innerHTML = '<option value="">CONNECTION FAILED</option>';
    }
}

// Enhanced file upload with progress indication
function setupFileUpload() {
    const fileInput = document.getElementById('resume-file');
    const filenameDiv = document.getElementById('filename');
    const uploadSection = document.getElementById('upload-new-section');

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            sounds.playClick();
            filenameDiv.textContent = `SELECTED: ${file.name}`;
            filenameDiv.style.color = 'var(--neon-cyan)';
            uploadSection.classList.add('active');
            
            // Animate the filename appearance
            filenameDiv.style.transform = 'translateX(-10px)';
            setTimeout(() => {
                filenameDiv.style.transform = 'translateX(0)';
            }, 100);
            
            CyberUI.showSystemMessage('FILE SELECTED', 'success');
        } else {
            filenameDiv.textContent = 'NO FILE SELECTED';
            filenameDiv.style.color = 'var(--acid-yellow)';
            uploadSection.classList.remove('active');
        }
    });
}

// Enhanced resume selector with animations
function setupResumeSelector() {
    const selector = document.getElementById('resume-selector');
    const uploadSection = document.getElementById('upload-new-section');
    const deleteBtn = document.getElementById('delete-resume-btn');

    selector.addEventListener('change', function() {
        sounds.playClick();
        CyberUI.pulseButton(selector);
        
        if (this.value === 'upload-new') {
            uploadSection.style.display = 'block';
            uploadSection.style.opacity = '0';
            uploadSection.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                uploadSection.style.opacity = '1';
                uploadSection.style.transform = 'translateY(0)';
            }, 100);
            
            deleteBtn.disabled = true;
            CyberUI.showSystemMessage('UPLOAD MODE ACTIVATED', 'info');
        } else {
            uploadSection.style.opacity = '0';
            setTimeout(() => {
                uploadSection.style.display = 'none';
            }, 300);
            
            deleteBtn.disabled = !this.value;
            if (this.value) {
                CyberUI.showSystemMessage(`RESUME ${this.value} SELECTED`, 'info');
            }
        }
    });
}

// Enhanced upload with cyberpunk feedback
async function uploadResume() {
    const fileInput = document.getElementById('resume-file');
    const nameInput = document.getElementById('resume-name');
    const resultsDiv = document.getElementById('results');

    if (!fileInput.files[0]) {
        showError('NO FILE SELECTED FOR UPLOAD');
        return null;
    }

    if (!nameInput.value.trim()) {
        showError('RESUME CODENAME REQUIRED');
        nameInput.focus();
        CyberUI.glitchEffect(nameInput);
        return null;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('name', nameInput.value.trim());

    try {
        // Show enhanced loading animation
        const thinkingInterval = CyberUI.showThinkingAnimation(resultsDiv, 'UPLOADING TO SECURE SERVER');
        CyberUI.showSystemMessage('INITIATING UPLOAD...', 'info');
        
        const response = await fetch(`${API_BASE_URL}/resume/upload`, {
            method: 'POST',
            body: formData
        });

        CyberUI.hideThinkingAnimation(resultsDiv, thinkingInterval);

        if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`);
        }

        const result = await response.json();
        
        // Save to local storage with enhanced data
        const resumeData = {
            id: result.resume_id,
            name: nameInput.value.trim(),
            filename: fileInput.files[0].name,
            uploadDate: new Date().toISOString()
        };
        
        const savedResumes = JSON.parse(localStorage.getItem('cvtweak_resumes') || '[]');
        savedResumes.push(resumeData);
        localStorage.setItem('cvtweak_resumes', JSON.stringify(savedResumes));

        showSuccess(`RESUME "${nameInput.value}" UPLOADED SUCCESSFULLY`, resultsDiv);
        
        // Reset form with animation
        setTimeout(() => {
            nameInput.value = '';
            fileInput.value = '';
            document.getElementById('filename').textContent = 'NO FILE SELECTED';
            document.getElementById('upload-new-section').classList.remove('active');
            loadResumes();
        }, 1500);

        return result.resume_id;

    } catch (error) {
        CyberUI.hideThinkingAnimation(resultsDiv, thinkingInterval);
        showError(`Upload failed: ${error.message}`, resultsDiv);
        return null;
    }
}

// Enhanced analysis with dramatic animations
async function analyzeResume() {
    const selector = document.getElementById('resume-selector');
    const jobDescription = document.getElementById('job-description').value.trim();
    const resultsDiv = document.getElementById('results');
    const analyzeBtn = document.getElementById('analyze-button');

    if (!jobDescription) {
        showError('TARGET DESCRIPTION REQUIRED FOR ANALYSIS');
        document.getElementById('job-description').focus();
        CyberUI.glitchEffect(document.getElementById('job-description'));
        return;
    }

    let resumeId = selector.value;

    // Handle new upload
    if (selector.value === 'upload-new') {
        resumeId = await uploadResume();
        if (!resumeId) return;
    }

    if (!resumeId) {
        showError('NO RESUME SELECTED FOR ANALYSIS');
        CyberUI.glitchEffect(selector);
        return;
    }

    try {
        // Dramatic button animation
        analyzeBtn.style.background = 'linear-gradient(45deg, var(--warning-red), var(--hot-pink))';
        analyzeBtn.textContent = 'ANALYZING RESUME...';
        analyzeBtn.disabled = true;
        
        // Enhanced thinking animation
        const thinkingInterval = CyberUI.showThinkingAnimation(resultsDiv, 'NEURAL NETWORK PROCESSING');
        CyberUI.showSystemMessage('ANALYSIS IN PROGRESS...', 'info');

        // First, fetch the resume text
        const resumeResponse = await fetch(`${API_BASE_URL}/resumes/${resumeId}`);
        if (!resumeResponse.ok) {
            throw new Error(`Failed to fetch resume with status ${resumeResponse.status}`);
        }
        const resumeData = await resumeResponse.json();

        // Now analyze with the resume text
        const response = await fetch(`${API_BASE_URL}/resume/match`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                resume_text: resumeData.raw_text,
                job_description: jobDescription
            })
        });

        CyberUI.hideThinkingAnimation(resultsDiv, thinkingInterval);

        if (!response.ok) {
            throw new Error(`Analysis failed with status ${response.status}`);
        }

        const result = await response.json();
        
        // Typewriter effect for results - use 'tips' not 'analysis'
        CyberUI.typewriterEffect(resultsDiv, result.tips);
        
        showSuccess('ANALYSIS COMPLETE');

    } catch (error) {
        CyberUI.hideThinkingAnimation(resultsDiv, thinkingInterval);
        showError(`Analysis failed: ${error.message}`, resultsDiv);
    } finally {
        // Reset button
        setTimeout(() => {
            analyzeBtn.style.background = '';
            analyzeBtn.textContent = 'ANALYZE RESUME';
            analyzeBtn.disabled = false;
        }, 2000);
    }
}

// Enhanced cover letter generation
async function generateCoverLetter() {
    const selector = document.getElementById('resume-selector');
    const jobDescription = document.getElementById('job-description').value.trim();
    const coverLetterDiv = document.getElementById('cover-letter-results');
    const generateBtn = document.getElementById('cover-letter-button');

    if (!jobDescription) {
        showError('JOB DESCRIPTION REQUIRED FOR COVER LETTER');
        return;
    }

    let resumeId = selector.value;
    if (selector.value === 'upload-new') {
        resumeId = await uploadResume();
        if (!resumeId) return;
    }

    if (!resumeId) {
        showError('NO RESUME SELECTED');
        return;
    }

    try {
        // Show cover letter panel with animation
        coverLetterDiv.style.display = 'block';
        coverLetterDiv.style.opacity = '0';
        coverLetterDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            coverLetterDiv.style.opacity = '1';
            coverLetterDiv.style.transform = 'translateY(0)';
        }, 100);

        // Button animation
        generateBtn.style.background = 'linear-gradient(45deg, var(--neon-cyan), var(--electric-blue))';
        generateBtn.textContent = 'GENERATING COVER LETTER...';
        generateBtn.disabled = true;

        const coverLetterContent = document.getElementById('cover-letter-content');
        const thinkingInterval = CyberUI.showThinkingAnimation(coverLetterContent, 'AI WRITING ASSISTANT ACTIVE');
        CyberUI.showSystemMessage('GENERATING COVER LETTER...', 'info');

        const response = await fetch(`${API_BASE_URL}/cover-letter/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                resume_id: parseInt(resumeId),
                job_description: jobDescription
            })
        });

        CyberUI.hideThinkingAnimation(coverLetterContent, thinkingInterval);

        if (!response.ok) {
            throw new Error(`Cover letter generation failed with status ${response.status}`);
        }

        const result = await response.json();
        CyberUI.typewriterEffect(coverLetterContent, result.cover_letter);
        showSuccess('COVER LETTER GENERATED');

    } catch (error) {
        CyberUI.hideThinkingAnimation(coverLetterContent, thinkingInterval);
        showError(`Cover letter generation failed: ${error.message}`, coverLetterContent);
    } finally {
        setTimeout(() => {
            generateBtn.style.background = '';
            generateBtn.textContent = 'GENERATE COVER LETTER';
            generateBtn.disabled = false;
        }, 2000);
    }
}

// Copy cover letter to clipboard with cyberpunk feedback
async function copyCoverLetter() {
    const coverLetterContent = document.getElementById('cover-letter-content');
    const copyBtn = document.getElementById('copy-cover-letter-btn');
    const copyText = copyBtn.querySelector('.copy-text');
    
    try {
        const text = coverLetterContent.textContent;
        
        if (!text || text.trim() === 'AWAITING COVER LETTER GENERATION...') {
            showError('NO COVER LETTER TO COPY');
            return;
        }

        // Use the modern Clipboard API
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        copyBtn.classList.add('copied');
        copyText.textContent = 'COPIED!';
        
        // Sound feedback
        sounds.playSuccess();
        
        // System message
        CyberUI.showSystemMessage('COVER LETTER COPIED TO CLIPBOARD', 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyText.textContent = 'COPY';
        }, 2000);
        
    } catch (error) {
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = coverLetterContent.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Same visual feedback as above
            copyBtn.classList.add('copied');
            copyText.textContent = 'COPIED!';
            sounds.playSuccess();
            CyberUI.showSystemMessage('COVER LETTER COPIED TO CLIPBOARD', 'success');
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyText.textContent = 'COPY';
            }, 2000);
            
        } catch (fallbackError) {
            showError('COPY FAILED - CLIPBOARD ACCESS DENIED');
            console.error('Copy failed:', fallbackError);
        }
    }
}

// Enhanced delete with confirmation
async function deleteResume() {
    const selector = document.getElementById('resume-selector');
    const resumeId = selector.value;

    if (!resumeId || resumeId === 'upload-new') {
        showError('NO RESUME SELECTED FOR DELETION');
        return;
    }

    // Cyberpunk confirmation dialog
            const confirmDelete = confirm(`DANGER ZONE\n\nPERMANENTLY DELETE RESUME ID: ${resumeId}?\n\nTHIS ACTION CANNOT BE UNDONE!`);
    
    if (!confirmDelete) {
        sounds.playClick();
        return;
    }

    try {
        const deleteBtn = document.getElementById('delete-resume-btn');
        deleteBtn.textContent = 'PURGING...';
        deleteBtn.disabled = true;
        deleteBtn.style.background = 'linear-gradient(45deg, var(--warning-red), #000)';

        CyberUI.showSystemMessage('INITIATING PURGE...', 'info');

        const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Deletion failed with status ${response.status}`);
        }

        // Remove from local storage
        const savedResumes = JSON.parse(localStorage.getItem('cvtweak_resumes') || '[]');
        const updatedResumes = savedResumes.filter(resume => resume.id != resumeId);
        localStorage.setItem('cvtweak_resumes', JSON.stringify(updatedResumes));

        showSuccess(`RESUME PURGED FROM SYSTEM`, document.getElementById('results'));
        
        // Reload the resume list
        setTimeout(() => {
            loadResumes();
            deleteBtn.textContent = 'PURGE';
            deleteBtn.disabled = true;
            deleteBtn.style.background = '';
        }, 1500);

    } catch (error) {
        showError(`Deletion failed: ${error.message}`);
        const deleteBtn = document.getElementById('delete-resume-btn');
        deleteBtn.textContent = 'PURGE';
        deleteBtn.disabled = false;
        deleteBtn.style.background = '';
    }
}

// Enhanced initialization with startup sequence
document.addEventListener('DOMContentLoaded', function() {
    // Show brutalist loading screen
    BrutalistLoader.createLoadingScreen();
    
    // Play startup sound sequence
    setTimeout(() => sounds.playStartup(), 300);
    
    // Cyberpunk startup sequence
    setTimeout(() => {
        console.log(`
        ╔═══════════════════════════════════════╗
        ║         CVTweak-AI INITIALIZED        ║
        ║         NEURAL NETWORK ONLINE         ║
        ║         SYSTEM STATUS: ACTIVE         ║
        ╚═══════════════════════════════════════╝
        `);
        
        CyberUI.showSystemMessage('SYSTEM ONLINE', 'success');
    }, 600);

    // Initialize UI components after loading screen - much faster now
    setTimeout(() => {
        setupFileUpload();
        setupResumeSelector();
        loadResumes();

        // Add click sounds to all buttons
        document.querySelectorAll('button, select, input[type="file"]').forEach(element => {
            element.addEventListener('click', () => sounds.playClick());
        });

        // Event listeners with enhanced feedback
        document.getElementById('analyze-button').addEventListener('click', () => {
            CyberUI.pulseButton(document.getElementById('analyze-button'));
            analyzeResume();
        });

        document.getElementById('cover-letter-button').addEventListener('click', () => {
            CyberUI.pulseButton(document.getElementById('cover-letter-button'));
            generateCoverLetter();
        });

        document.getElementById('delete-resume-btn').addEventListener('click', () => {
            CyberUI.pulseButton(document.getElementById('delete-resume-btn'));
            deleteResume();
        });

        document.getElementById('copy-cover-letter-btn').addEventListener('click', () => {
            CyberUI.pulseButton(document.getElementById('copy-cover-letter-btn'));
            copyCoverLetter();
        });

        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        analyzeResume();
                        sounds.playClick();
                        break;
                    case 'g':
                        e.preventDefault();
                        generateCoverLetter();
                        sounds.playClick();
                        break;
                    case 'c':
                        e.preventDefault();
                        copyCoverLetter();
                        sounds.playClick();
                        break;
                }
            }
        });

        // Add hover sound effects
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (Math.random() > 0.7) sounds.playBeep(1500, 30);
            });
        });
    }, 800);
});