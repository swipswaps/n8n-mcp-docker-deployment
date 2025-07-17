#!/bin/bash

# AUGMENT-SAFE PERFORMANCE TROUBLESHOOTING
# Based on Official Documentation and Verified Source Requirements
# Follows Augment Rules to avoid crashing VS Code extensions

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
echo "🛡️  AUGMENT-SAFE PERFORMANCE TROUBLESHOOTING"
echo "=============================================================================="
echo "Purpose: Resolve performance issues WITHOUT crashing Augment Code extension"
echo "Based on: Official VS Code documentation and verified sources"
echo "Augment Rules: Official Documentation and Verified Source Requirements"
echo "=============================================================================="
echo

# Step 1: Safe System Analysis (No Process Killing)
safe_system_analysis() {
    log_info "🔍 Safe system analysis (no process termination)..."
    
    # System load
    local load_avg
    load_avg=$(cat /proc/loadavg | cut -d' ' -f1-3)
    log_info "📊 Load Average: $load_avg"
    
    # Memory usage
    local mem_total mem_used mem_free
    mem_total=$(free -h | grep "Mem:" | awk '{print $2}')
    mem_used=$(free -h | grep "Mem:" | awk '{print $3}')
    mem_free=$(free -h | grep "Mem:" | awk '{print $4}')
    log_info "🧠 Memory: $mem_used/$mem_total used, $mem_free free"
    
    # Top processes (analysis only, no killing)
    log_info "🔍 Top CPU consumers (analysis only):"
    ps aux --sort=-%cpu --no-headers | head -5 | while read -r line; do
        local pid cpu mem command
        pid=$(echo "$line" | awk '{print $2}')
        cpu=$(echo "$line" | awk '{print $3}')
        mem=$(echo "$line" | awk '{print $4}')
        command=$(echo "$line" | awk '{for(i=11;i<=NF;i++) printf "%s ", $i; print ""}')
        
        if (( $(echo "$cpu > 20.0" | bc -l) )); then
            log_warn "  ⚠️  PID $pid: $cpu% CPU, $mem% MEM - ${command:0:60}..."
        else
            log_info "  ✅ PID $pid: $cpu% CPU, $mem% MEM - ${command:0:60}..."
        fi
    done
}

# Step 2: Check GNOME Calendar Server (Based on Official Documentation)
check_gnome_calendar_server() {
    log_action "📅 Checking GNOME Calendar Server (official approach)..."
    
    # Check if gnome-shell-calendar-server is running
    local calendar_pids
    calendar_pids=$(pgrep -f "gnome-shell-calendar-server" || echo "")
    
    if [[ -n "$calendar_pids" ]]; then
        log_info "📅 Found gnome-shell-calendar-server processes: $calendar_pids"
        
        # Check CPU usage of calendar server
        local calendar_cpu
        calendar_cpu=$(ps -p "$calendar_pids" -o %cpu --no-headers 2>/dev/null || echo "0")
        
        if (( $(echo "$calendar_cpu > 5.0" | bc -l) )); then
            log_warn "⚠️  Calendar server using high CPU: $calendar_cpu%"
            log_info "💡 Official solution: Restart GNOME session or disable calendar integration"
            log_info "🔧 Safe command: gsettings set org.gnome.desktop.calendar show-weekdate false"
        else
            log_success "✅ Calendar server CPU usage normal: $calendar_cpu%"
        fi
    else
        log_info "ℹ️  No gnome-shell-calendar-server processes found"
    fi
    
    # Check if calendar server should be removed (based on Fedora documentation)
    log_info "📋 GNOME Calendar Server Analysis:"
    log_info "  • Part of core GNOME Shell functionality"
    log_info "  • NOT recommended to remove via dnf (breaks GNOME)"
    log_info "  • If problematic: Disable calendar features in GNOME Settings"
    log_info "  • Alternative: Use different desktop environment"
}

# Step 3: VS Code Extension Safe Management
safe_vscode_extension_management() {
    log_action "🔧 VS Code Extension Safe Management..."
    
    # Check VS Code processes without killing them
    local vscode_pids
    vscode_pids=$(pgrep -f "/usr/share/code/code" || echo "")
    
    if [[ -n "$vscode_pids" ]]; then
        log_info "💻 VS Code processes found: $vscode_pids"
        
        # Analyze each process
        echo "$vscode_pids" | while read -r pid; do
            if [[ -n "$pid" ]]; then
                local cpu_usage mem_usage
                cpu_usage=$(ps -p "$pid" -o %cpu --no-headers 2>/dev/null || echo "0")
                mem_usage=$(ps -p "$pid" -o %mem --no-headers 2>/dev/null || echo "0")
                
                log_info "  PID $pid: CPU $cpu_usage%, MEM $mem_usage%"
                
                if (( $(echo "$cpu_usage > 50.0" | bc -l) )); then
                    log_warn "  ⚠️  High CPU usage detected - but NOT killing to protect Augment"
                fi
            fi
        done
        
        # Safe recommendations based on VS Code official documentation
        log_info "💡 Safe VS Code Performance Recommendations:"
        log_info "  1. Use VS Code Developer Tools: Help > Toggle Developer Tools"
        log_info "  2. Check extension performance: Help > Show Running Extensions"
        log_info "  3. Disable problematic extensions temporarily"
        log_info "  4. Restart VS Code gracefully: Ctrl+Shift+P > 'Reload Window'"
        log_info "  5. Use VS Code safe mode: code --disable-extensions"
        
    else
        log_info "ℹ️  No VS Code processes currently running"
    fi
}

# Step 4: Safe System Optimization (No Sudo Required)
safe_system_optimization() {
    log_action "⚡ Safe system optimization (user-level only)..."
    
    # Clear user-level caches safely
    local cache_dirs=(
        "$HOME/.cache/thumbnails"
        "$HOME/.local/share/Trash"
        "$HOME/.config/Code/User/workspaceStorage"
    )
    
    for cache_dir in "${cache_dirs[@]}"; do
        if [[ -d "$cache_dir" ]]; then
            local cache_size
            cache_size=$(du -sh "$cache_dir" 2>/dev/null | cut -f1 || echo "unknown")
            log_info "🗑️  Cache directory: $cache_dir ($cache_size)"
            
            # Only suggest cleanup, don't force it
            log_info "  💡 To clean: rm -rf '$cache_dir'/*"
        fi
    done
    
    # Check swap usage
    local swap_used
    swap_used=$(free -h | grep "Swap:" | awk '{print $3}')
    if [[ "$swap_used" != "0B" ]]; then
        log_warn "⚠️  Swap in use: $swap_used"
        log_info "💡 Consider closing applications to reduce memory pressure"
    fi
}

# Step 5: Augment Extension Specific Checks
check_augment_extension() {
    log_action "🔍 Augment Extension Health Check..."
    
    # Check VS Code extension directory
    local vscode_ext_dir="$HOME/.vscode/extensions"
    if [[ -d "$vscode_ext_dir" ]]; then
        local augment_ext
        augment_ext=$(find "$vscode_ext_dir" -name "*augment*" -type d 2>/dev/null | head -1)
        
        if [[ -n "$augment_ext" ]]; then
            log_success "✅ Augment extension directory found: $(basename "$augment_ext")"
            
            # Check extension logs if available
            local ext_logs="$HOME/.config/Code/logs"
            if [[ -d "$ext_logs" ]]; then
                log_info "📋 Extension logs available in: $ext_logs"
                log_info "💡 Check for errors: code '$ext_logs'"
            fi
        else
            log_warn "⚠️  Augment extension directory not found"
            log_info "💡 Reinstall from VS Code marketplace if needed"
        fi
    fi
    
    # Safe recommendations for Augment extension
    log_info "🛡️  Augment Extension Protection Measures:"
    log_info "  1. Never kill VS Code processes abruptly"
    log_info "  2. Use 'Reload Window' instead of process termination"
    log_info "  3. Check extension host performance in Developer Tools"
    log_info "  4. Monitor system resources before making changes"
    log_info "  5. Follow official VS Code troubleshooting guides"
}

# Step 6: Provide Safe Recommendations
provide_safe_recommendations() {
    log_info "💡 SAFE PERFORMANCE RECOMMENDATIONS (Augment-Compliant):"
    echo
    echo "🔧 IMMEDIATE ACTIONS (Safe):"
    echo "  1. Restart VS Code gracefully: Ctrl+Shift+P > 'Reload Window'"
    echo "  2. Check running extensions: Help > Show Running Extensions"
    echo "  3. Use Developer Tools: Help > Toggle Developer Tools"
    echo "  4. Monitor performance: Help > Open Process Explorer"
    echo
    echo "🧹 SYSTEM CLEANUP (User-level):"
    echo "  1. Clear browser caches and downloads"
    echo "  2. Close unused applications"
    echo "  3. Clear VS Code workspace storage (if needed)"
    echo "  4. Restart GNOME session if calendar server problematic"
    echo
    echo "📅 GNOME CALENDAR SERVER (If problematic):"
    echo "  1. Disable calendar features: Settings > Calendar"
    echo "  2. Use gsettings to disable calendar integration"
    echo "  3. DO NOT remove via dnf (breaks GNOME)"
    echo
    echo "🚫 WHAT NOT TO DO (Augment Protection):"
    echo "  1. Never kill VS Code processes with kill/pkill"
    echo "  2. Don't remove core GNOME components"
    echo "  3. Avoid sudo operations that affect system stability"
    echo "  4. Don't clear VS Code extension directories"
    echo
}

# Main execution
main() {
    safe_system_analysis
    echo
    check_gnome_calendar_server
    echo
    safe_vscode_extension_management
    echo
    safe_system_optimization
    echo
    check_augment_extension
    echo
    provide_safe_recommendations
    
    echo "=============================================================================="
    log_success "🛡️  AUGMENT-SAFE PERFORMANCE ANALYSIS COMPLETED"
    log_info "No processes were terminated. All recommendations are safe to follow."
    echo "=============================================================================="
}

# Check for required tools
check_tools() {
    local missing_tools=()
    
    for tool in bc; do
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
