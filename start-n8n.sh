#!/bin/bash

# n8n Application Startup Script
# Provides full n8n web interface accessible at http://localhost:5678

set -euo pipefail

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Configuration
readonly CONTAINER_NAME="n8n"
readonly PORT="5678"
readonly ADMIN_USER="admin"
readonly ADMIN_PASSWORD="password"

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        log_error "Docker is not running"
        log_info "Please start Docker and try again"
        exit 1
    fi
    log_success "Docker is running"
}

# Stop existing container
stop_existing() {
    if docker ps -a --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        log_info "Stopping existing n8n container..."
        docker stop "${CONTAINER_NAME}" >/dev/null 2>&1 || true
        docker rm "${CONTAINER_NAME}" >/dev/null 2>&1 || true
        log_success "Existing container stopped"
    fi
}

# Start n8n application
start_n8n() {
    log_info "Starting n8n application..."
    
    docker run -d \
        --name "${CONTAINER_NAME}" \
        --restart unless-stopped \
        -p "${PORT}:5678" \
        -e N8N_BASIC_AUTH_ACTIVE=true \
        -e N8N_BASIC_AUTH_USER="${ADMIN_USER}" \
        -e N8N_BASIC_AUTH_PASSWORD="${ADMIN_PASSWORD}" \
        -e N8N_HOST=localhost \
        -e N8N_PORT=5678 \
        -e N8N_PROTOCOL=http \
        -e WEBHOOK_URL="http://localhost:${PORT}/" \
        -e GENERIC_TIMEZONE=UTC \
        -v n8n_data:/home/node/.n8n \
        n8nio/n8n:latest
    
    if docker-compose up -d; then
        log_success "n8n container started successfully"
    else
        log_error "Failed to start n8n container"
        exit 1
    fi
}

# Wait for n8n to be ready
wait_for_n8n() {
    log_info "Waiting for n8n to be ready..."
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -s "http://localhost:${PORT}" >/dev/null 2>&1; then
            log_success "n8n is ready!"
            return 0
        fi
        
        log_info "Attempt $attempt/$max_attempts - n8n not ready yet..."
        sleep 2
        ((attempt++))
    done
    
    log_error "n8n failed to start within expected time"
    return 1
}

# Show status information
show_status() {
    log_success "n8n Application Started Successfully!"
    echo
    echo "📊 Status Information:"
    echo "   🐳 Container: ${CONTAINER_NAME}"
    echo "   🌐 Web Interface: http://localhost:${PORT}"
    echo "   👤 Username: ${ADMIN_USER}"
    echo "   🔑 Password: ${ADMIN_PASSWORD}"
    echo
    echo "🚀 Next Steps:"
    echo "   1. Open your browser and go to: http://localhost:${PORT}"
    echo "   2. Login with username: ${ADMIN_USER} and password: ${ADMIN_PASSWORD}"
    echo "   3. Start creating your workflows!"
    echo
    echo "📋 Useful Commands:"
    echo "   • View logs: docker logs ${CONTAINER_NAME}"
    echo "   • Stop n8n: docker stop ${CONTAINER_NAME}"
    echo "   • Restart n8n: docker restart ${CONTAINER_NAME}"
    echo "   • Remove n8n: docker rm -f ${CONTAINER_NAME}"
}

# Main function
main() {
    log_info "🚀 Starting n8n Application Setup..."
    
    check_docker
    stop_existing
    start_n8n
    wait_for_n8n
    show_status
}

# Handle command line arguments
case "${1:-}" in
    "stop")
        log_info "Stopping n8n application..."
        docker stop "${CONTAINER_NAME}" >/dev/null 2>&1 || true
        docker rm "${CONTAINER_NAME}" >/dev/null 2>&1 || true
        log_success "n8n application stopped"
        ;;
    "restart")
        log_info "Restarting n8n application..."
        docker restart "${CONTAINER_NAME}" >/dev/null 2>&1 || true
        log_success "n8n application restarted"
        ;;
    "logs")
        docker logs -f "${CONTAINER_NAME}"
        ;;
    "status")
        if docker ps --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
            log_success "n8n is running"
            echo "Web Interface: http://localhost:${PORT}"
        else
            log_error "n8n is not running"
        fi
        ;;
    "help"|"-h"|"--help")
        cat << 'EOF'
n8n Application Management Script

Usage: ./start-n8n.sh [COMMAND]

Commands:
  (no args)  Start n8n application
  stop       Stop n8n application
  restart    Restart n8n application
  logs       Show n8n logs
  status     Check n8n status
  help       Show this help message

Examples:
  ./start-n8n.sh              # Start n8n
  ./start-n8n.sh stop         # Stop n8n
  ./start-n8n.sh logs         # View logs
EOF
        ;;
    *)
        main
        ;;
esac 