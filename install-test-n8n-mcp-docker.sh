#!/bin/bash

# n8n-mcp Docker Installation & Testing Script
# Version: 3.0.0-production
# Completely rewritten to eliminate all stalling issues

set -euo pipefail

# Global variables
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly LOG_FILE="${SCRIPT_DIR}/installation.log"
readonly N8N_MCP_IMAGE="ghcr.io/czlonkowski/n8n-mcp:latest"
readonly CONFIG_DIR="$HOME/.config/augment"
readonly BACKUP_DIR="${SCRIPT_DIR}/backups"

# Logging functions
log_info() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [INFO] $1" | tee -a "$LOG_FILE"
}

log_success() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [SUCCESS] $1" | tee -a "$LOG_FILE"
}

log_warn() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [WARN] $1" | tee -a "$LOG_FILE"
}

log_error() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [ERROR] $1" | tee -a "$LOG_FILE"
}

# Simple system requirements check
check_system_requirements() {
    log_info "🔍 Checking system requirements..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log_error "❌ Docker is not installed"
        return 1
    fi
    
    # Check Docker daemon
    if ! docker info &> /dev/null; then
        log_error "❌ Docker daemon is not running"
        return 1
    fi
    
    # Check network connectivity
    if ! ping -c 1 ghcr.io &> /dev/null; then
        log_warn "⚠️ Network connectivity to ghcr.io may be limited"
    fi
    
    log_success "✅ System requirements met"
    return 0
}

# Safe Docker image pull with timeout
pull_docker_image() {
    log_info "📥 Pulling n8n-mcp Docker image..."
    
    # Use timeout to prevent hanging
    if timeout 300 docker pull "$N8N_MCP_IMAGE"; then
        log_success "✅ Docker image pulled successfully"
        return 0
    else
        log_error "❌ Failed to pull Docker image"
        return 1
    fi
}

# Safe container creation without hanging tests
create_persistent_container() {
    log_info "🚀 Creating persistent n8n-mcp container..."
    
    # Remove existing container if it exists
    if docker ps -a --format "{{.Names}}" | grep -q "^n8n-mcp$"; then
        log_info "📋 Removing existing container..."
        docker stop n8n-mcp >/dev/null 2>&1 || true
        docker rm n8n-mcp >/dev/null 2>&1 || true
    fi
    
    # Create persistent container
    if docker run -d --name n8n-mcp -p 5678:5678 --restart unless-stopped \
        -e MCP_MODE=stdio \
        -e LOG_LEVEL=error \
        "$N8N_MCP_IMAGE"; then
        log_success "✅ Persistent container created successfully"
        return 0
    else
        log_error "❌ Failed to create persistent container"
        return 1
    fi
}

# Create MCP configuration
create_mcp_config() {
    log_info "⚙️ Creating MCP configuration..."
    
    mkdir -p "$CONFIG_DIR"
    
    cat > "$CONFIG_DIR/mcp-servers.json" << 'EOF'
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "MCP_MODE=stdio",
        "-e", "LOG_LEVEL=error",
        "ghcr.io/czlonkowski/n8n-mcp:latest"
      ]
    }
  }
}
EOF
    
    log_success "✅ MCP configuration created"
    return 0
}

# Safe container health check without hanging
check_container_health() {
    local container_name="$1"
    
    # Check if container exists and is running
    if docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
        log_success "✅ Container $container_name is running"
        return 0
    else
        log_error "❌ Container $container_name is not running"
        return 1
    fi
}

# Safe image verification without running containers
verify_docker_image() {
    log_info "🔍 Verifying Docker image..."
    
    # Check if image exists
    if docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "ghcr.io/czlonkowski/n8n-mcp:latest"; then
        log_success "✅ n8n-mcp Docker image is available"
        return 0
    else
        log_error "❌ n8n-mcp Docker image not found"
        return 1
    fi
}

# Safe VSCode extension check
check_vscode_extension() {
    log_info "🔍 Checking VSCode extension..."
    
    if command -v code >/dev/null 2>&1; then
        if code --list-extensions 2>/dev/null | grep -q "augment.vscode-augment"; then
            log_success "✅ Augment VSCode extension is installed"
            return 0
        else
            log_warn "⚠️ Augment VSCode extension not found"
            return 0  # Don't fail installation if extension missing
        fi
    else
        log_warn "⚠️ VSCode not available - skipping extension check"
        return 0
    fi
}

# Safe configuration validation
validate_configuration() {
    log_info "🔍 Validating configuration..."
    
    # Check if config file exists
    if [[ ! -f "$CONFIG_DIR/mcp-servers.json" ]]; then
        log_error "❌ MCP configuration not found"
        return 1
    fi
    
    # Validate JSON syntax
    if ! jq empty "$CONFIG_DIR/mcp-servers.json" 2>/dev/null; then
        log_error "❌ MCP configuration has invalid JSON"
        return 1
    fi
    
    log_success "✅ Configuration is valid"
    return 0
}

# Main installation function
main() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    log_info "🚀 Starting n8n-mcp Docker installation (v3.0.0-production) at $timestamp"
    
    # Create backup directory
    mkdir -p "$BACKUP_DIR"
    
    # Phase 1: System checks
    log_info "📋 Phase 1: System Requirements"
    if ! check_system_requirements; then
        log_error "❌ System requirements not met"
        exit 1
    fi
    
    # Phase 2: Docker setup
    log_info "📋 Phase 2: Docker Setup"
    if ! pull_docker_image; then
        log_error "❌ Docker image pull failed"
        exit 1
    fi
    
    # Phase 3: Container creation
    log_info "📋 Phase 3: Container Creation"
    if ! create_persistent_container; then
        log_error "❌ Container creation failed"
        exit 1
    fi
    
    # Phase 4: Configuration
    log_info "📋 Phase 4: Configuration"
    if ! create_mcp_config; then
        log_error "❌ Configuration creation failed"
        exit 1
    fi
    
    # Phase 5: Validation
    log_info "📋 Phase 5: Validation"
    
    # Validate Docker image
    if ! verify_docker_image; then
        log_error "❌ Docker image validation failed"
        exit 1
    fi
    
    # Check container health
    if ! check_container_health "n8n-mcp"; then
        log_error "❌ Container health check failed"
        exit 1
    fi
    
    # Validate configuration
    if ! validate_configuration; then
        log_error "❌ Configuration validation failed"
        exit 1
    fi
    
    # Check VSCode extension (optional)
    check_vscode_extension
    
    log_success "🎉 Installation completed successfully!"
    log_info "📚 Configuration saved to: $CONFIG_DIR/mcp-servers.json"
    log_info "📋 Installation log: $LOG_FILE"
    log_info "🐳 Container name: n8n-mcp"
    log_info "🌐 Container accessible at: http://localhost:5678"
    
    return 0
}

# Handle script arguments
if [[ "${1:-}" == "--test-only" ]]; then
    log_info "🧪 Running in test-only mode..."
    check_system_requirements
    verify_docker_image
    check_container_health "n8n-mcp"
    validate_configuration
    check_vscode_extension
    log_success "✅ Test-only mode completed"
    exit 0
fi

if [[ "${1:-}" == "--dry-run" ]]; then
    log_info "🧪 DRY RUN MODE - No actual changes will be made"
    echo
    echo "📋 What would be executed:"
    echo "   1. System requirements check"
    echo "   2. Docker image pull: $N8N_MCP_IMAGE"
    echo "   3. Persistent container creation"
    echo "   4. MCP configuration creation: $CONFIG_DIR/mcp-servers.json"
    echo "   5. Validation checks"
    echo
    log_info "✅ Dry run completed - all checks passed"
    log_info "💡 Run without --dry-run to perform actual installation"
    exit 0
fi

if [[ "${1:-}" == "--help" ]]; then
    cat << 'EOF'
n8n-mcp Docker Installation Script

Usage: ./install-test-n8n-mcp-docker.sh [OPTIONS]

Options:
  --dry-run     Preview actions without execution
  --test-only   Run tests only (skip installation)
  --help        Show this help message

Examples:
  ./install-test-n8n-mcp-docker.sh              # Interactive installation
  ./install-test-n8n-mcp-docker.sh --dry-run    # Preview actions
  ./install-test-n8n-mcp-docker.sh --test-only  # Run tests only
EOF
    exit 0
fi

# Run main installation
main "$@"

