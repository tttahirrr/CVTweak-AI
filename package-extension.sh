#!/bin/bash

# CVTweak-AI Chrome Extension Packaging Script

echo "🚀 Packaging CVTweak-AI Chrome Extension..."

# Create build directory
mkdir -p build

# Copy extension files to build directory
cp -r chrome-extension/src/* build/

# Remove any development files
rm -f build/.DS_Store
rm -rf build/node_modules

# Create ZIP file for Chrome Web Store
cd build
zip -r ../cvtweak-ai-extension.zip .
cd ..

echo "✅ Extension packaged successfully!"
echo "📦 Upload cvtweak-ai-extension.zip to Chrome Web Store"
echo ""
echo "Next steps:"
echo "1. Deploy your backend to Railway/Render/Heroku"
echo "2. Update the API_BASE_URL in popup.js with your deployed URL"
echo "3. Update manifest.json with your actual backend domain"
echo "4. Re-package and upload to Chrome Web Store" 