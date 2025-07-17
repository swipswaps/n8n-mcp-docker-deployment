#!/bin/bash
# Install Cosign for Docker image signature verification

set -euo pipefail

    local COSIGN_VERSION="v2.4.1"  # Latest stable version
    local COSIGN_URL="https://github.com/sigstore/cosign/releases/download/"${COSIGN_VERSION}"/cosign-linux-amd64"

echo "📦 Installing Cosign "${COSIGN_VERSION}"..."

# Download and install cosign
curl -O -L "$COSIGN_URL"
chmod +x cosign-linux-amd64

# Install to system path (requires sudo)
if [[ "$EUID" -eq 0 ]]; then
    mv cosign-linux-amd64 /usr/local/bin/cosign
else
    sudo mv cosign-linux-amd64 /usr/local/bin/cosign
fi

echo "✅ Cosign installed successfully"
cosign version
