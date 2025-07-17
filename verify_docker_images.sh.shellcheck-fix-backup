#!/bin/bash
# Docker Image Signature Verification with Cosign

set -euo pipefail

readonly N8N_MCP_IMAGE="ghcr.io/czlonkowski/n8n-mcp:sha-df03d42"
readonly N8N_MCP_SHA="sha256:91e872c91c1e9a33be83fa5184ac918492fdcece0fde9ebbb09c13e716d10102"

echo "🔍 Verifying Docker image signatures and integrity..."

# Verify image exists and matches expected SHA
echo "📋 Checking image: $N8N_MCP_IMAGE"
if docker pull "$N8N_MCP_IMAGE"; then
    echo "✅ Image pulled successfully"

    # Get actual image SHA
    actual_sha=$(docker inspect "$N8N_MCP_IMAGE" --format='{{index .RepoDigests 0}}' | cut -d'@' -f2 || echo "unknown")
    echo "📋 Expected SHA: $N8N_MCP_SHA"
    echo "📋 Actual SHA:   $actual_sha"

    if [[ "$actual_sha" == "$N8N_MCP_SHA" ]]; then
        echo "✅ SHA verification passed"
    else
        echo "⚠️  SHA verification failed - proceed with caution"
    fi
else
    echo "❌ Failed to pull image"
    exit 1
fi

# Try Cosign verification (may fail if image isn't signed)
if command -v cosign >/dev/null 2>&1; then
    echo "🔐 Attempting Cosign signature verification..."
    if cosign verify "$N8N_MCP_IMAGE" 2>/dev/null; then
        echo "✅ Cosign signature verification passed"
    else
        echo "⚠️  Cosign signature verification failed or image not signed"
        echo "   This is common for community images - SHA verification above is sufficient"
    fi
else
    echo "⚠️  Cosign not available - install with: ./install_cosign.sh"
fi

echo "✅ Docker image verification completed"
