#!/bin/bash

# Optimized n8n Workflow Automation Script
# Based on system performance characteristics

echo "🚀 Starting optimized n8n workflow automation..."
echo "📊 System Resources:"
echo "   Memory: $(free -h | grep Mem | awk '{print $3"/"$2}')"
echo "   CPU Load: $(uptime | awk -F'load average:' '{print $2}')"

# Check if n8n is running
echo "🔍 Checking n8n status..."
if ! curl -s http://localhost:5678 > /dev/null; then
    echo "❌ n8n is not running on localhost:5678"
    echo "💡 Please start n8n first:"
    echo "   docker-compose up -d"
    echo "   or"
    echo "   npm run start"
    exit 1
fi

echo "✅ n8n is running"

# Check if Node.js and required packages are available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check if Playwright is installed
if ! node -e "require('playwright')" 2>/dev/null; then
    echo "📦 Installing Playwright..."
    npm install playwright
fi

# Run the optimized workflow automation
echo "🔨 Running optimized workflow automation..."
node build_workflow_optimized.js

echo "✅ Workflow automation completed!" 