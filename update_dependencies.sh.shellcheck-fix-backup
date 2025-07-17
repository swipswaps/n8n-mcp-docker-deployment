#!/bin/bash
# Update dependencies to resolve vulnerabilities

set -euo pipefail

echo "📦 Updating dependencies to resolve vulnerabilities..."

# Update Docker base images
echo "🐳 Updating Docker images..."
docker pull ghcr.io/czlonkowski/n8n-mcp:sha-df03d42

# Update system packages (if running in container)
if command -v apt-get >/dev/null 2>&1; then
    echo "📦 Updating apt packages..."
    apt-get update && apt-get upgrade -y
elif command -v dnf >/dev/null 2>&1; then
    echo "📦 Updating dnf packages..."
    dnf update -y
fi

# Update Node.js dependencies if package.json exists
if [[ -f "package.json" ]]; then
    echo "📦 Updating Node.js dependencies..."
    npm audit fix || echo "⚠️  Some vulnerabilities require manual review"
fi

# Update Python dependencies if requirements.txt exists
if [[ -f "requirements.txt" ]]; then
    echo "📦 Updating Python dependencies..."
    pip install --upgrade -r requirements.txt
fi

echo "✅ Dependency updates completed"
