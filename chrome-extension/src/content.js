// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractJobDescription') {
    // Try to find job description in common locations
    const jobDescription = findJobDescription();
    sendResponse({ jobDescription });
  }
});

// Function to find job description on the page
function findJobDescription() {
  // Common selectors for job descriptions
  const selectors = [
    '[data-test="jobDescriptionText"]', // LinkedIn
    '.job-description', // Common class
    '#jobDescriptionText', // Common ID
    '[itemprop="description"]', // Schema.org
    '.description', // Generic class
  ];

  // Try each selector
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      return element.textContent.trim();
    }
  }

  // If no specific element is found, try to find the largest text block
  const paragraphs = Array.from(document.getElementsByTagName('p'));
  if (paragraphs.length > 0) {
    const largestParagraph = paragraphs.reduce((largest, current) => {
      return current.textContent.length > largest.textContent.length ? current : largest;
    });
    return largestParagraph.textContent.trim();
  }

  return '';
} 