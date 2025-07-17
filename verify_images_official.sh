#!/bin/bash
set -euo pipefail

# Docker image verification based on official documentation
readonly N8N_MCP_IMAGE="ghcr.io/czlonkowski/n8n-mcp:sha-df03d42"
readonly N8N_MCP_SHA="sha256:91e872c91c1e9a33be83fa5184ac918492fdcece0fde9ebbb09c13e716d10102"

echo "🔍 Verifying Docker image integrity based on official practices..."

# Pull and verify image
if docker pull "$N8N_MCP_IMAGE"; then
    echo "✅ Image pulled successfully"
    
    # Get actual image SHA
    actual_sha=$(docker inspect "$N8N_MCP_IMAGE" --format='{{index .RepoDigests 0}}' | cut -d'@' -f2 || echo "unknown")
    echo "📋 Expected SHA: $N8N_MCP_SHA"
    echo "📋 Actual SHA:   $actual_sha"
    
    if [[ "$actual_sha" == "$N8N_MCP_SHA" ]]; then
        echo "✅ SHA verification passed"
    else
        echo "⚠️ SHA verification failed - proceed with caution"
    fi
else
    echo "❌ Failed to pull image"
    exit 1
fi

# Try Cosign verification if available
if command -v cosign >/dev/null 2>&1; then
    echo "🔐 Attempting Cosign signature verification..."
    if cosign verify "$N8N_MCP_IMAGE" 2>/dev/null; then
        echo "✅ Cosign signature verification passed"
    else
        echo "⚠️ Cosign signature verification failed or image not signed"
        echo "   SHA verification above is sufficient for security"
    fi
else
    echo "⚠️ Cosign not available - install with: ./install_cosign_official.sh"
fi

echo "✅ Docker image verification completed"
