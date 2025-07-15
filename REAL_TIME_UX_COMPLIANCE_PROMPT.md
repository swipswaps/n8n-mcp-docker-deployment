# REAL-TIME UX COMPLIANCE PROMPT - CRITICAL STALLING RESOLUTION

## 🚨 **MANDATORY COMPLIANCE - AUGMENT RULES IMPLEMENTATION**

**This prompt REQUIRES immediate compliance with Augment Rules: Official Documentation and Verified Source Requirements. The script MUST display real-time event, error, system and application messages to prevent user confusion and stalling.**

---

## 📊 **CRITICAL UX FAILURES IDENTIFIED**

### **1. SILENT STALLING DURING OPERATIONS**
```bash
# FAILURE EVIDENCE:
[2025-07-15 14:42:33] [INFO] 📥 Downloading and installing Augment Code...
curl: (22) The requested URL returned error: 404
# [LONG DELAY WITH NO USER FEEDBACK]

# COMPLIANCE VIOLATION: No real-time progress indication
# USER IMPACT: Confusion about script state, appears stalled
```

### **2. HIDDEN PROCESS MESSAGES**
```bash
# FAILURE EVIDENCE:
curl: (28) Failed to connect to releases.augmentcode.com port 443 after 133860 ms
# [HIDDEN SYSTEM MESSAGES NOT DISPLAYED]

# COMPLIANCE VIOLATION: Critical system messages hidden from user
# USER IMPACT: No visibility into what's actually happening
```

### **3. ABRUPT TERMINATION WITHOUT EXPLANATION**
```bash
# FAILURE EVIDENCE:
Looking for matches…
# [SCRIPT STOPS WITHOUT CLEAR RESOLUTION]

# COMPLIANCE VIOLATION: No clear completion status or next steps
# USER IMPACT: User left uncertain about script state
```

---

## ⚡ **MANDATORY COMPLIANCE REQUIREMENTS**

### **REQUIREMENT 1: REAL-TIME PROGRESS DISPLAY**
```bash
# ✅ REQUIRED: All operations must show real-time progress
# ❌ FORBIDDEN: Silent operations that appear to stall

IMPLEMENTATION MANDATE:
- Every curl/wget operation must show progress
- All background processes must display status updates
- Timeout operations must show countdown timers
- Long-running operations must show activity indicators

EXAMPLE COMPLIANCE:
show_real_time_progress() {
    local operation="$1"
    local timeout="${2:-30}"
    
    echo -n "🔄 $operation"
    for ((i=1; i<=timeout; i++)); do
        echo -n "."
        sleep 1
        if [[ $((i % 10)) -eq 0 ]]; then
            echo -n " (${i}s/${timeout}s)"
        fi
    done
    echo
}
```

### **REQUIREMENT 2: COMPREHENSIVE MESSAGE DISPLAY**
```bash
# ✅ REQUIRED: All system, error, and application messages visible
# ❌ FORBIDDEN: Hidden processes or silent failures

IMPLEMENTATION MANDATE:
- All curl operations with -v flag for verbose output
- All background processes with real-time output streaming
- All error messages immediately displayed to user
- All system messages captured and shown

EXAMPLE COMPLIANCE:
execute_with_real_time_feedback() {
    local command="$1"
    local description="$2"
    
    log_info "🔄 Executing: $description"
    log_info "📋 Command: $command"
    
    # Show real-time output
    if eval "$command" 2>&1 | while IFS= read -r line; do
        echo "   📤 $line"
    done; then
        log_success "✅ $description completed"
        return 0
    else
        log_error "❌ $description failed"
        return 1
    fi
}
```

### **REQUIREMENT 3: AUGMENT RULES COMPLIANCE**
```bash
# ✅ REQUIRED: Official documentation and verified sources only
# ❌ FORBIDDEN: Placeholder URLs or unverified installation methods

IMPLEMENTATION MANDATE:
- Research actual Augment Code installation methods
- Use only official documentation sources
- Implement verified GitHub repository methods
- Provide reputable forum post alternatives

EXAMPLE COMPLIANCE:
# Based on official documentation research:
AUGMENT_OFFICIAL_SOURCES=(
    "https://docs.augmentcode.com/installation"
    "https://github.com/augmentcode/augment/releases"
    "https://community.augmentcode.com/installation-guide"
)
```

---

## 🎯 **IMMEDIATE IMPLEMENTATION ACTIONS**

### **ACTION 1: Implement Real-Time Progress Display**
```bash
# IMMEDIATE FIX REQUIRED:
# Replace all silent operations with real-time feedback

SPECIFIC FIXES:
1. Add progress indicators to all curl operations
2. Show real-time output from all commands
3. Implement timeout countdowns with visual feedback
4. Display background process status updates
```

### **ACTION 2: Research Actual Augment Code Installation**
```bash
# IMMEDIATE RESEARCH REQUIRED:
# Find official Augment Code installation methods

RESEARCH TASKS:
1. Visit official Augment Code documentation
2. Check GitHub repositories for installation scripts
3. Find community forum installation guides
4. Verify working installation URLs
```

### **ACTION 3: Implement Comprehensive Error Display**
```bash
# IMMEDIATE FIX REQUIRED:
# Show all system and application messages

SPECIFIC FIXES:
1. Use curl -v for verbose output
2. Stream all command output in real-time
3. Display all error messages immediately
4. Show system process information
```

---

## 📋 **REAL-TIME UX IMPLEMENTATION**

### **Enhanced curl Operations**
```bash
# Before (silent and confusing):
curl -fsSL "$url" -o "$file"

# After (real-time feedback):
download_with_progress() {
    local url="$1"
    local file="$2"
    local description="${3:-Download}"
    
    log_info "🌐 $description from: $url"
    log_info "📁 Saving to: $file"
    
    if curl -L --progress-bar --connect-timeout 10 --max-time 60 \
           --verbose "$url" -o "$file" 2>&1 | while IFS= read -r line; do
        case "$line" in
            *"Connected to"*) echo "   🔗 $line" ;;
            *"HTTP/"*) echo "   📡 $line" ;;
            *"Content-Length"*) echo "   📊 $line" ;;
            *"curl: ("*) echo "   ❌ $line" ;;
            *) echo "   📤 $line" ;;
        esac
    done; then
        log_success "✅ $description completed"
        return 0
    else
        log_error "❌ $description failed"
        return 1
    fi
}
```

### **Background Process Monitoring**
```bash
# Real-time process status display
monitor_background_process() {
    local pid="$1"
    local description="$2"
    local timeout="${3:-60}"
    
    log_info "🔄 Monitoring: $description (PID: $pid)"
    
    for ((i=1; i<=timeout; i++)); do
        if kill -0 "$pid" 2>/dev/null; then
            echo -n "⏳ $description running... (${i}s/${timeout}s)"
            if [[ $((i % 5)) -eq 0 ]]; then
                echo " [Still active]"
            else
                echo -ne "\r"
            fi
            sleep 1
        else
            echo
            log_success "✅ $description completed"
            return 0
        fi
    done
    
    echo
    log_warn "⚠️  $description timeout after ${timeout}s"
    return 1
}
```

### **Comprehensive Error Context**
```bash
# Show all relevant system information during errors
show_error_context() {
    local operation="$1"
    local error_code="$2"
    
    log_error "❌ Operation failed: $operation"
    log_info "🔍 Error context:"
    log_info "   Exit code: $error_code"
    log_info "   Timestamp: $(date)"
    log_info "   User: $USER"
    log_info "   Working directory: $PWD"
    log_info "   Network status: $(ping -c 1 google.com >/dev/null 2>&1 && echo 'connected' || echo 'disconnected')"
    log_info "   Available memory: $(free -h | grep '^Mem:' | awk '{print $7}' 2>/dev/null || echo 'unknown')"
    log_info "   Disk space: $(df -h . | tail -1 | awk '{print $4}' 2>/dev/null || echo 'unknown')"
}
```

---

## 🔍 **AUGMENT CODE RESEARCH REQUIREMENTS**

### **Official Documentation Sources**
```bash
# RESEARCH MANDATE: Find actual installation methods
RESEARCH_SOURCES=(
    "https://augmentcode.com/docs"
    "https://docs.augmentcode.com"
    "https://github.com/augmentcode"
    "https://community.augmentcode.com"
)

# VERIFICATION REQUIRED:
1. Official installation script URL
2. GitHub releases download links
3. Package manager availability
4. Platform-specific installation methods
```

### **Verified Installation Methods**
```bash
# IMPLEMENTATION REQUIREMENT: Use only verified methods
implement_verified_installation() {
    # Strategy 1: Official installer (if exists)
    if verify_official_installer; then
        install_via_official_method
    fi
    
    # Strategy 2: GitHub releases (if available)
    if verify_github_releases; then
        install_via_github_releases
    fi
    
    # Strategy 3: Package managers (if supported)
    if verify_package_managers; then
        install_via_package_manager
    fi
    
    # Strategy 4: Manual guidance with official links
    provide_official_installation_guidance
}
```

---

## ✅ **SUCCESS CRITERIA**

### **Real-Time UX Requirements**
- [ ] **No silent operations** - All processes show real-time feedback
- [ ] **Visible progress** - Users always know what's happening
- [ ] **Comprehensive error display** - All messages shown immediately
- [ ] **Clear completion status** - Users know when operations finish
- [ ] **Professional presentation** - Polished, informative interface

### **Augment Rules Compliance**
- [ ] **Official documentation** - Only verified sources used
- [ ] **Working GitHub code** - Actual repository methods implemented
- [ ] **Reputable forum posts** - Community-verified approaches
- [ ] **No placeholder URLs** - All links verified and functional
- [ ] **Comprehensive research** - Thorough investigation of installation methods

---

## ⚡ **IMPLEMENTATION MANDATE**

**This prompt requires IMMEDIATE compliance. Any code that:**
- Contains silent operations without user feedback
- Uses unverified or placeholder installation URLs
- Hides system or error messages from users
- Leaves users uncertain about script status
- Violates Augment Rules requirements

**MUST be fixed IMMEDIATELY. No exceptions.**

**The goal is real-time, transparent automation that users can trust and follow, with full compliance to Augment Rules for verified source requirements.**
