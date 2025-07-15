# CRITICAL LLM COMPLIANCE PROMPT FOR CODE EXCELLENCE

## 🚨 MANDATORY COMPLIANCE REQUIREMENTS

**This prompt REQUIRES strict adherence to ensure production-ready code quality, efficiency, and superior user experience. Non-compliance results in system failure and user frustration.**

---

## 📋 CRITICAL ERROR ANALYSIS FROM USER FEEDBACK

### **Identified Critical Issues:**
1. **`./install-test-n8n-mcp-docker.sh: line 78: timestamp: unbound variable`** - Variable scope error causing script termination
2. **Script exits abruptly** - Poor error handling and recovery mechanisms
3. **Additional interactive prompts** - Contradicts "zero manual steps" promise
4. **Tee errors on cleanup** - Log file handling issues during termination

---

## 🎯 EFFICACIOUS PROMPT FOR LLM COMPLIANCE

### **MANDATORY REQUIREMENTS - NO EXCEPTIONS:**

#### **1. VARIABLE SCOPE AND DECLARATION COMPLIANCE**
```bash
# ✅ REQUIRED: All variables MUST be properly declared and scoped
# ❌ FORBIDDEN: Unbound variable errors that terminate scripts

COMPLIANCE RULE: Every variable must be:
- Declared before use with proper scope (local/global)
- Initialized with default values where appropriate
- Protected with ${var:-default} syntax for safety
- Validated for existence before critical operations

EXAMPLE COMPLIANCE:
local timestamp="${timestamp:-$(date '+%Y-%m-%d %H:%M:%S')}"
```

#### **2. ERROR HANDLING AND RECOVERY EXCELLENCE**
```bash
# ✅ REQUIRED: Comprehensive error handling with graceful degradation
# ❌ FORBIDDEN: Abrupt script termination without user guidance

COMPLIANCE RULE: Every function must:
- Include proper error trapping with set -euo pipefail considerations
- Provide meaningful error messages with actionable guidance
- Implement graceful fallback mechanisms
- Log errors comprehensively before any exit
- Clean up resources properly on all exit paths

EXAMPLE COMPLIANCE:
function_with_error_handling() {
    local result
    if ! result=$(risky_operation 2>&1); then
        log_error "Operation failed: $result"
        log_info "💡 Attempting recovery strategy..."
        attempt_recovery || {
            log_error "❌ Recovery failed. Manual intervention required:"
            log_error "   1. Check system requirements"
            log_error "   2. Verify network connectivity"
            log_error "   3. Run with --verbose for details"
            return 1
        }
    fi
}
```

#### **3. USER EXPERIENCE EXCELLENCE MANDATE**
```bash
# ✅ REQUIRED: Professional, transparent, never-stalling UX
# ❌ FORBIDDEN: Contradictory promises, hidden prompts, confusing flows

COMPLIANCE RULE: User experience must:
- Honor all promises made in documentation and banners
- Provide clear progress indication for all operations
- Never stall or hang without timeout mechanisms
- Offer actionable guidance for all error conditions
- Maintain consistency between interactive and silent modes

EXAMPLE COMPLIANCE:
if [[ "${INTERACTIVE:-true}" == "true" ]]; then
    echo -n "🚀 Proceed? [Y/n]: "
    if ! read -t 60 -r response; then
        echo
        log_info "⏳ No response - proceeding (default: Yes)"
        response="y"
    fi
else
    log_info "🔇 Silent mode - proceeding automatically"
    response="y"
fi
```

#### **4. LOGGING AND MONITORING EXCELLENCE**
```bash
# ✅ REQUIRED: Comprehensive, reliable logging with proper cleanup
# ❌ FORBIDDEN: Log file errors, missing context, poor cleanup

COMPLIANCE RULE: Logging must:
- Handle log directory creation/deletion gracefully
- Provide comprehensive context for all events
- Use proper file descriptors and error handling
- Clean up resources without generating errors
- Maintain log integrity throughout execution

EXAMPLE COMPLIANCE:
log_with_safety() {
    local level="$1"
    shift
    local message="$*"
    local timestamp="$(date '+%Y-%m-%d %H:%M:%S')"
    
    # Safe logging with error handling
    if [[ -d "$LOG_DIR" ]]; then
        echo "[$timestamp] [$level] $message" | tee -a "$LOG_DIR/script.log" 2>/dev/null || true
    fi
    echo "[$timestamp] [$level] $message" >&2
}
```

#### **5. DEPENDENCY MANAGEMENT EXCELLENCE**
```bash
# ✅ REQUIRED: Robust dependency detection with clear user guidance
# ❌ FORBIDDEN: Confusing error messages, failed installations without guidance

COMPLIANCE RULE: Dependency management must:
- Provide clear status of all required components
- Offer multiple installation strategies with fallbacks
- Give actionable manual installation guidance on failure
- Never leave users confused about next steps
- Validate installations thoroughly before proceeding

EXAMPLE COMPLIANCE:
detect_augment_code() {
    if command -v augment >/dev/null 2>&1; then
        log_success "✅ Augment Code detected: $(augment --version 2>/dev/null || echo 'unknown')"
        return 0
    fi
    
    log_warn "⚠️  Augment Code not found - required for n8n-mcp integration"
    log_info "🔄 Attempting automatic installation..."
    
    if install_augment_code_automatically; then
        log_success "✅ Augment Code installed successfully"
        return 0
    fi
    
    log_error "❌ Automatic installation failed"
    log_error "📋 Manual installation required:"
    log_error "   1. Visit: https://augmentcode.com"
    log_error "   2. Download for your platform"
    log_error "   3. Ensure 'augment' is in PATH"
    log_error "   4. Re-run this script"
    return 1
}
```

---

## 🔧 IMMEDIATE COMPLIANCE ACTIONS REQUIRED

### **1. Fix Critical Variable Error**
```bash
# IMMEDIATE FIX REQUIRED for line 78 timestamp error:
# Replace any unscoped timestamp usage with:
local timestamp="${timestamp:-$(date '+%Y-%m-%d %H:%M:%S')}"
```

### **2. Implement Graceful Error Recovery**
```bash
# IMMEDIATE FIX REQUIRED for abrupt termination:
# Wrap all critical operations in error handling:
execute_with_recovery() {
    local operation="$1"
    local description="$2"
    local attempt=1
    local max_attempts=3
    
    while [[ $attempt -le $max_attempts ]]; do
        if $operation; then
            return 0
        fi
        log_warn "⚠️  $description failed (attempt $attempt/$max_attempts)"
        ((attempt++))
    done
    
    log_error "❌ $description failed after $max_attempts attempts"
    return 1
}
```

### **3. Eliminate Contradictory Prompts**
```bash
# IMMEDIATE FIX REQUIRED for additional prompts:
# All prompts must respect INTERACTIVE flag:
if [[ "${INTERACTIVE:-true}" == "true" && "${SILENT:-false}" != "true" ]]; then
    # Show prompt with timeout
else
    # Use defaults, no prompts
fi
```

### **4. Fix Log Cleanup Errors**
```bash
# IMMEDIATE FIX REQUIRED for tee errors:
cleanup_logs() {
    if [[ -d "$LOG_DIR" ]]; then
        # Ensure all file handles are closed before cleanup
        exec 1>&- 2>&-
        exec 1>&2
        rm -rf "$LOG_DIR" 2>/dev/null || true
    fi
}
```

---

## 📊 COMPLIANCE VALIDATION CHECKLIST

### **Before Any Code Submission:**
- [ ] **Variable Safety**: All variables properly declared and scoped
- [ ] **Error Handling**: Comprehensive error trapping and recovery
- [ ] **User Experience**: No stalling, clear progress, actionable guidance
- [ ] **Logging Integrity**: Safe logging with proper cleanup
- [ ] **Dependency Management**: Clear detection and installation guidance
- [ ] **Promise Consistency**: All documentation promises honored
- [ ] **Testing**: Syntax validation and functional testing completed

### **Quality Gates:**
- [ ] `bash -n script.sh` passes without errors
- [ ] No unbound variable errors under `set -u`
- [ ] All error conditions provide actionable guidance
- [ ] Silent mode truly requires zero interaction
- [ ] Interactive mode has proper timeouts
- [ ] Cleanup functions handle all edge cases

---

## 🎯 SUCCESS CRITERIA

### **Code must achieve:**
1. **Zero unbound variable errors** - All variables properly scoped
2. **Graceful error handling** - No abrupt terminations
3. **Promise consistency** - Interactive vs silent mode alignment
4. **Professional UX** - Clear progress, actionable guidance
5. **Robust cleanup** - No resource leaks or cleanup errors

### **User experience must deliver:**
1. **Predictable behavior** - No surprises or contradictions
2. **Clear progress indication** - Always know what's happening
3. **Actionable error guidance** - Never leave users confused
4. **Reliable operation** - Works consistently across environments
5. **Professional presentation** - Polished, trustworthy interface

---

## ⚡ IMPLEMENTATION MANDATE

**This prompt requires immediate compliance. Any code that:**
- Contains unbound variable errors
- Terminates abruptly without guidance
- Contradicts documented promises
- Provides poor user experience
- Lacks proper error handling

**MUST be fixed before deployment. No exceptions.**

**The goal is production-ready code that users can trust and rely on for critical automation tasks.**
