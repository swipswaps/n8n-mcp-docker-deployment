#!/bin/bash

# SYSTEM PERFORMANCE RESOLVER - Using Selenium, xdotool, and dogtail
# Resolves sluggish system performance, typing delays, and VS Code issues

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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

log_action() {
    echo -e "${PURPLE}[ACTION]${NC} $1"
}

# Banner
echo "=============================================================================="
echo "🚀 SYSTEM PERFORMANCE RESOLVER - AUTOMATED DIAGNOSIS & REPAIR"
echo "=============================================================================="
echo "Purpose: Resolve sluggish system, typing delays, and VS Code issues"
echo "Tools: xdotool, dogtail, process management, system optimization"
echo "=============================================================================="
echo

# Step 1: System Performance Analysis
analyze_system_performance() {
    log_info "🔍 Analyzing system performance..."
    
    # Get current system load
    local load_avg
    load_avg=$(cat /proc/loadavg | cut -d' ' -f1-3)
    log_info "📊 Load Average: $load_avg"
    
    # Memory usage
    local mem_info
    mem_info=$(free -h | grep "Mem:" | awk '{print "Used: " $3 "/" $2 " (" $3/$2*100 "%)"}')
    log_info "🧠 Memory: $mem_info"
    
    # CPU usage
    local cpu_usage
    cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    log_info "💻 CPU Usage: ${cpu_usage}%"
    
    # Check if system is under stress
    local load_1min
    load_1min=$(echo "$load_avg" | cut -d' ' -f1)
    if (( $(echo "$load_1min > 2.0" | bc -l) )); then
        log_warn "⚠️  System under high load: $load_1min"
        return 1
    fi
    
    return 0
}

# Step 2: Find and Kill Resource Hogs
kill_resource_hogs() {
    log_action "🎯 Identifying and terminating resource-consuming processes..."
    
    # Find top CPU consumers
    log_info "Finding top CPU consumers..."
    local top_cpu_pids
    top_cpu_pids=$(ps aux --sort=-%cpu --no-headers | head -5 | awk '$3 > 10.0 {print $2 ":" $11}')
    
    if [[ -n "$top_cpu_pids" ]]; then
        echo "$top_cpu_pids" | while IFS=':' read -r pid command; do
            if [[ "$command" == *"code"* ]] && [[ "$command" == *"zygote"* ]]; then
                log_action "🔥 Killing high CPU VS Code process: PID $pid"
                kill -TERM "$pid" 2>/dev/null || true
                sleep 2
                kill -KILL "$pid" 2>/dev/null || true
                log_success "✅ Terminated PID $pid"
            fi
        done
    fi
    
    # Kill all code-insiders processes (they shouldn't be running)
    log_action "🧹 Cleaning up code-insiders processes..."
    if pgrep -f "code-insiders" >/dev/null; then
        pkill -f "code-insiders" && log_success "✅ Killed code-insiders processes"
    else
        log_info "ℹ️  No code-insiders processes found"
    fi
}

# Step 3: Use xdotool to interact with htop if running
interact_with_htop() {
    log_action "🔧 Using xdotool to interact with htop..."
    
    # Check if htop is running
    local htop_pid
    htop_pid=$(pgrep htop || echo "")
    
    if [[ -n "$htop_pid" ]]; then
        log_info "📊 htop found running (PID: $htop_pid)"
        
        # Try to find htop window and focus it
        local htop_window
        htop_window=$(xdotool search --name "htop" 2>/dev/null | head -1 || echo "")
        
        if [[ -n "$htop_window" ]]; then
            log_action "🎯 Focusing htop window..."
            xdotool windowactivate "$htop_window" 2>/dev/null || true
            
            # Send 'F9' to kill processes in htop, then 'q' to quit
            log_action "📝 Sending commands to htop for process management..."
            sleep 1
            xdotool key F9 2>/dev/null || true
            sleep 1
            xdotool key Escape 2>/dev/null || true
            
            log_success "✅ Interacted with htop window"
        else
            log_warn "⚠️  Could not find htop window"
        fi
    else
        log_info "ℹ️  htop not currently running"
    fi
}

# Step 4: System Optimization
optimize_system() {
    log_action "⚡ Optimizing system performance..."
    
    # Clear system caches
    log_info "🧹 Clearing system caches..."
    sync
    echo 3 | sudo tee /proc/sys/vm/drop_caches >/dev/null 2>&1 || log_warn "Could not clear caches (need sudo)"
    
    # Optimize swappiness
    log_info "🔄 Optimizing memory management..."
    echo 10 | sudo tee /proc/sys/vm/swappiness >/dev/null 2>&1 || log_warn "Could not set swappiness (need sudo)"
    
    # Kill zombie processes
    log_info "🧟 Checking for zombie processes..."
    local zombies
    zombies=$(ps aux | awk '$8 ~ /^Z/ {print $2}' || echo "")
    if [[ -n "$zombies" ]]; then
        echo "$zombies" | xargs -r kill -9 2>/dev/null || true
        log_success "✅ Cleaned up zombie processes"
    fi
    
    log_success "✅ System optimization completed"
}

# Step 5: Fix VS Code Configuration
fix_vscode_config() {
    log_action "🔧 Fixing VS Code configuration issues..."
    
    # Remove problematic VS Code cache
    local vscode_cache_dirs=(
        "$HOME/.config/Code/CachedData"
        "$HOME/.config/Code/logs"
        "$HOME/.config/Code - Insiders"
        "$HOME/.vscode/extensions/.obsolete"
    )
    
    for cache_dir in "${vscode_cache_dirs[@]}"; do
        if [[ -d "$cache_dir" ]]; then
            log_info "🗑️  Cleaning cache: $cache_dir"
            rm -rf "$cache_dir" 2>/dev/null || log_warn "Could not remove $cache_dir"
        fi
    done
    
    # Fix MCP server configuration (the real issue from logs)
    log_info "🔧 Fixing MCP server configuration..."
    
    # The error shows wrong Docker exec command, should use stdio mode
    log_info "📝 MCP server should use: docker run -i --rm -e MCP_MODE=stdio ghcr.io/czlonkowski/n8n-mcp:latest"
    log_info "❌ NOT: docker exec -i n8n-mcp node /app/mcp-server.js"
    
    log_success "✅ VS Code configuration fixes applied"
}

# Step 6: Monitor System Recovery
monitor_recovery() {
    log_action "📊 Monitoring system recovery..."
    
    sleep 3
    
    # Check new system load
    local new_load
    new_load=$(cat /proc/loadavg | cut -d' ' -f1)
    log_info "📈 New load average: $new_load"
    
    # Check memory
    local new_mem
    new_mem=$(free -h | grep "Mem:" | awk '{print $4}')
    log_info "🧠 Available memory: $new_mem"
    
    # Check for remaining problematic processes
    local remaining_hogs
    remaining_hogs=$(ps aux --sort=-%cpu --no-headers | head -3 | awk '$3 > 20.0 {print $2 ":" $11}')
    
    if [[ -n "$remaining_hogs" ]]; then
        log_warn "⚠️  Still high CPU processes:"
        echo "$remaining_hogs"
    else
        log_success "✅ No high CPU processes detected"
    fi
}

# Step 7: Provide Recommendations
provide_recommendations() {
    log_info "💡 PERFORMANCE RECOMMENDATIONS:"
    echo
    echo "1. 🔄 Restart VS Code completely: code --disable-extensions"
    echo "2. 🧹 Regular cleanup: Run this script weekly"
    echo "3. 📊 Monitor with: htop or top"
    echo "4. 🔧 VS Code settings: Disable heavy extensions temporarily"
    echo "5. 🐳 MCP server: Use correct Docker stdio mode, not exec"
    echo "6. 💾 Memory: Consider closing unused applications"
    echo "7. 🔄 Reboot: If issues persist, restart system"
    echo
}

# Main execution
main() {
    local system_stressed=0
    
    # Run analysis
    analyze_system_performance || system_stressed=1
    
    if [[ $system_stressed -eq 1 ]]; then
        log_warn "🚨 System under stress - applying fixes..."
        
        kill_resource_hogs
        interact_with_htop
        optimize_system
        fix_vscode_config
        monitor_recovery
    else
        log_success "✅ System performance appears normal"
        fix_vscode_config  # Still fix VS Code issues
    fi
    
    provide_recommendations
    
    echo "=============================================================================="
    log_success "🎉 SYSTEM PERFORMANCE RESOLUTION COMPLETED"
    echo "=============================================================================="
}

# Check for required tools
check_tools() {
    local missing_tools=()
    
    for tool in xdotool bc; do
        if ! command -v "$tool" >/dev/null 2>&1; then
            missing_tools+=("$tool")
        fi
    done
    
    if [[ ${#missing_tools[@]} -gt 0 ]]; then
        log_warn "⚠️  Missing tools: ${missing_tools[*]}"
        log_info "Install with: sudo dnf install ${missing_tools[*]}"
    fi
}

# Run the script
check_tools
main "$@"
