#!/bin/bash

# Script to import n8n workflow and open browser
# This script imports the workflow JSON and opens n8n in the browser

set -euo pipefail

# Configuration
N8N_URL="http://localhost:5678"
WORKFLOW_FILE="n8n_workflow_example.json"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if n8n container is running
check_n8n_status() {
    log_info "🔍 Checking n8n container status..."
    
    if docker ps --format "{{.Names}}" | grep -q "^n8n$"; then
        log_success "✅ n8n container is running"
        return 0
    else
        log_error "❌ n8n container is not running"
        return 1
    fi
}

# Wait for n8n to be ready
wait_for_n8n() {
    log_info "⏳ Waiting for n8n to be ready..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$N8N_URL" > /dev/null 2>&1; then
            log_success "✅ n8n is ready and accessible"
            return 0
        fi
        
        log_info "⏳ Attempt $attempt/$max_attempts - n8n not ready yet..."
        sleep 2
        ((attempt++))
    done
    
    log_error "❌ n8n did not become ready within expected time"
    return 1
}

# Import workflow using n8n API
import_workflow() {
    log_info "📥 Importing workflow into n8n..."
    
    if [ ! -f "$WORKFLOW_FILE" ]; then
        log_error "❌ Workflow file $WORKFLOW_FILE not found"
        return 1
    fi
    
    # Import workflow using curl
    local response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d @"$WORKFLOW_FILE" \
        "$N8N_URL/rest/workflows" 2>/dev/null)
    
    if echo "$response" | grep -q '"id"'; then
        log_success "✅ Workflow imported successfully"
        return 0
    else
        log_warn "⚠️ Could not import workflow via API (this is normal for first-time setup)"
        log_info "💡 You can manually import the workflow from the n8n web interface"
        return 0
    fi
}

# Open browser
open_browser() {
    log_info "🌐 Opening n8n in browser..."
    
    # Try different browser commands
    if command -v xdg-open >/dev/null 2>&1; then
        xdg-open "$N8N_URL" &
        log_success "✅ Browser opened with xdg-open"
    elif command -v firefox >/dev/null 2>&1; then
        firefox "$N8N_URL" &
        log_success "✅ Browser opened with Firefox"
    elif command -v google-chrome >/dev/null 2>&1; then
        google-chrome "$N8N_URL" &
        log_success "✅ Browser opened with Chrome"
    elif command -v chromium-browser >/dev/null 2>&1; then
        chromium-browser "$N8N_URL" &
        log_success "✅ Browser opened with Chromium"
    else
        log_warn "⚠️ No browser command found. Please manually open: $N8N_URL"
        echo "🌐 Please open this URL in your browser: $N8N_URL"
    fi
}

# Display workflow information
show_workflow_info() {
    log_info "📋 Workflow Information:"
    echo "   📄 File: $WORKFLOW_FILE"
    echo "   🌐 n8n URL: $N8N_URL"
    echo "   📊 Workflow Name: Comprehensive n8n Workflow Example"
    echo ""
    echo "📋 Workflow Features:"
    echo "   ✅ HTTP API integration (fetches sample data)"
    echo "   ✅ Data processing and transformation"
    echo "   ✅ Conditional logic and branching"
    echo "   ✅ Error handling and validation"
    echo "   ✅ MCP tool integration information"
    echo "   ✅ Comprehensive logging and statistics"
    echo ""
}

# Display manual import instructions
show_manual_import() {
    log_info "📋 Manual Import Instructions:"
    echo ""
    echo "If the automatic import didn't work, follow these steps:"
    echo ""
    echo "1. 🌐 Open n8n in your browser: $N8N_URL"
    echo "2. 📝 Click 'Create Workflow'"
    echo "3. 📤 Click the three dots menu (⋮) in the top right"
    echo "4. 📥 Select 'Import from file'"
    echo "5. 📁 Choose the file: $WORKFLOW_FILE"
    echo "6. ✅ Click 'Import'"
    echo "7. 🚀 Click 'Execute Workflow' to test it"
    echo ""
}

# Main function
main() {
    echo "🚀 n8n Workflow Import and Browser Launch"
    echo "=========================================="
    echo ""
    
    # Check n8n status
    if ! check_n8n_status; then
        log_error "❌ Please start n8n first using: ./start-n8n.sh"
        exit 1
    fi
    
    # Wait for n8n to be ready
    if ! wait_for_n8n; then
        log_error "❌ n8n is not responding. Please check the container logs."
        exit 1
    fi
    
    # Show workflow information
    show_workflow_info
    
    # Try to import workflow
    import_workflow
    
    # Open browser
    open_browser
    
    # Show manual instructions
    show_manual_import
    
    log_success "🎉 Setup complete! n8n should now be open in your browser."
    echo ""
    echo "💡 Tips:"
    echo "   • The workflow demonstrates HTTP requests, data processing, and MCP integration"
    echo "   • You can modify the workflow nodes to experiment with different features"
    echo "   • Check the execution logs to see the workflow in action"
    echo "   • Use the MCP tools in Cursor for programmatic workflow management"
    echo ""
}

# Run main function
main "$@" 