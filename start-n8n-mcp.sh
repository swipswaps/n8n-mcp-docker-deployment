#!/bin/bash

# n8n-mcp Container Management Script
# Simple startup and management for n8n-mcp Docker container

set -euo pipefail

# Configuration
readonly CONTAINER_NAME="n8n-mcp"
readonly IMAGE_NAME="ghcr.io/czlonkowski/n8n-mcp:latest"
readonly PORT="5678"

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

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

# Check if container is running
is_container_running() {
    docker ps --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"
}

# Check if container exists (running or stopped)
container_exists() {
    docker ps -a --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"
}

# Get container status
get_container_status() {
    if is_container_running; then
        echo "running"
    elif container_exists; then
        echo "stopped"
    else
        echo "not_found"
    fi
}

# Start the container
start_container() {
    log_info "Starting n8n-mcp container..."
    
    # Check if container already exists
    if container_exists; then
        log_info "Container exists, starting it..."
        if docker start "$CONTAINER_NAME"; then
            log_success "Container started successfully"
        else
            log_error "Failed to start existing container"
            return 1
        fi
    else
        log_info "Creating new container..."
        if docker run -d --name "$CONTAINER_NAME" -p "$PORT:$PORT" --restart unless-stopped \
            -e MCP_MODE=stdio \
            -e LOG_LEVEL=error \
            -e DISABLE_CONSOLE_OUTPUT=true \
            "$IMAGE_NAME"; then
            log_success "Container created and started successfully"
        else
            log_error "Failed to create container"
            return 1
        fi
    fi
    
    # Wait a moment for container to be ready
    sleep 2
    
    # Verify container is running
    if is_container_running; then
        log_success "Container is running and ready"
        log_info "Container accessible at: http://localhost:$PORT"
        return 0
    else
        log_error "Container failed to start properly"
        return 1
    fi
}

# Stop the container
stop_container() {
    log_info "Stopping n8n-mcp container..."
    
    if is_container_running; then
        if docker stop "$CONTAINER_NAME"; then
            log_success "Container stopped successfully"
        else
            log_error "Failed to stop container"
            return 1
        fi
    else
        log_warn "Container is not running"
    fi
}

# Remove the container
remove_container() {
    log_info "Removing n8n-mcp container..."
    
    if container_exists; then
        # Stop first if running
        if is_container_running; then
            docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || true
        fi
        
        if docker rm "$CONTAINER_NAME"; then
            log_success "Container removed successfully"
        else
            log_error "Failed to remove container"
            return 1
        fi
    else
        log_warn "Container does not exist"
    fi
}

# Show container status
show_status() {
    local status
    status=$(get_container_status)
    
    echo
    echo "=== n8n-mcp Container Status ==="
    echo "Container: $CONTAINER_NAME"
    echo "Image: $IMAGE_NAME"
    echo "Port: $PORT"
    echo "Status: $status"
    echo
    
    if [[ "$status" == "running" ]]; then
        log_success "Container is running"
        echo "Access URL: http://localhost:$PORT"
        echo
        echo "Container details:"
        docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    elif [[ "$status" == "stopped" ]]; then
        log_warn "Container exists but is stopped"
        echo "Run '$0 start' to start it"
    else
        log_warn "Container does not exist"
        echo "Run '$0 start' to create and start it"
    fi
    echo
}

# Show container logs
show_logs() {
    if container_exists; then
        log_info "Showing container logs..."
        docker logs "$CONTAINER_NAME"
    else
        log_error "Container does not exist"
        return 1
    fi
}

# Health check
health_check() {
    if is_container_running; then
        log_info "Performing health check..."
        
        # Quick container accessibility test
        if timeout 5s docker exec "$CONTAINER_NAME" echo "health_check" >/dev/null 2>&1; then
            log_success "Container is healthy and responsive"
            return 0
        else
            log_warn "Container health check inconclusive"
            return 1
        fi
    else
        log_error "Container is not running"
        return 1
    fi
}

# Main function
main() {
    local action="${1:-status}"
    
    case "$action" in
        start)
            start_container
            ;;
        stop)
            stop_container
            ;;
        restart)
            log_info "Restarting container..."
            stop_container
            sleep 2
            start_container
            ;;
        remove)
            remove_container
            ;;
        status)
            show_status
            ;;
        logs)
            show_logs
            ;;
        health)
            health_check
            ;;
        help|--help|-h)
            cat << 'EOF'
n8n-mcp Container Management Script

Usage: ./start-n8n-mcp.sh [COMMAND]

Commands:
  start     Start the n8n-mcp container
  stop      Stop the n8n-mcp container
  restart   Restart the n8n-mcp container
  remove    Remove the n8n-mcp container
  status    Show container status (default)
  logs      Show container logs
  health    Perform health check
  help      Show this help message

Examples:
  ./start-n8n-mcp.sh start    # Start the container
  ./start-n8n-mcp.sh status   # Check container status
  ./start-n8n-mcp.sh logs     # View container logs
EOF
            ;;
        *)
            log_error "Unknown command: $action"
            echo "Run '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
