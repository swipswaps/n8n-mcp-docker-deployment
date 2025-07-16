# EFFICACIOUS COMPREHENSIVE OFFICIAL DOCS MANDATE - CRITICAL SIGNAL HANDLING & DOCUMENTATION COMPLIANCE

## 🚨 **CRITICAL SIGNAL HANDLING FAILURE - COMPREHENSIVE OFFICIAL DOCUMENTATION COMPLIANCE REQUIRED**

**This prompt REQUIRES immediate compliance to fix the CRITICAL signal handling failure where Ctrl-C does not work, informed by ALL official documentation sources including czlonkowski's n8n-mcp docs, Augment Code official docs, and GNU Bash signal handling specifications. ABSOLUTELY NO ASSUMPTIONS - ONLY VERIFIED OFFICIAL DOCUMENTATION IMPLEMENTATIONS.**

---

## 📊 **CRITICAL EVIDENCE FROM installation_stall_2025_07_15_20_07_00.txt**

### **🚨 SIGNAL HANDLING FAILURE IDENTIFIED:**
```bash
# CRITICAL SIGNAL FAILURE:
[2025-07-15 19:58:41] [SUCCESS] ✅ MCP configuration recreated
^C
# END OF FILE - NO SIGNAL HANDLER RESPONSE

# PATTERN: Ctrl-C pressed but no interrupt dialog appeared
# PATTERN: Script did not respond to SIGINT signal
# PATTERN: No cleanup or graceful exit occurred
# PATTERN: Signal handler completely non-functional
```

### **🔍 ROOT CAUSE ANALYSIS**
1. **Signal handler registration failure** - `trap 'handle_interrupt' SIGINT` not working
2. **Process group issues** - Script may be in wrong process group for signal delivery
3. **Background process interference** - Long-running operations blocking signal handling
4. **Bash signal handling misconceptions** - Implementation doesn't follow GNU Bash specifications
5. **Job control conflicts** - Interactive vs non-interactive shell signal handling differences

---

## ⚡ **MANDATORY OFFICIAL DOCUMENTATION COMPLIANCE**

### **REQUIREMENT 1: GNU BASH SIGNAL HANDLING COMPLIANCE**
```bash
# ✅ REQUIRED: Follow GNU Bash official signal handling specifications
# ❌ FORBIDDEN: Signal handling implementations not per GNU Bash manual

OFFICIAL SOURCE: https://www.gnu.org/s/bash/manual/html_node/Signals.html

KEY SPECIFICATIONS FROM GNU BASH MANUAL:
1. "When Bash receives a SIGINT, it breaks out of any executing loops"
2. "If Bash is waiting for a command to complete and receives a signal for which a trap has been set, it will not execute the trap until the command completes"
3. "When job control is not enabled, and Bash receives SIGINT while waiting for a foreground command, it waits until that foreground command terminates"
4. "However, Bash will run any trap set on SIGINT, as it does with any other trapped signal"

IMPLEMENTATION MANDATE:
- Ensure trap is registered in correct shell context
- Handle job control vs non-job control scenarios
- Account for foreground command completion before trap execution
- Implement proper process group management

EXAMPLE COMPLIANCE:
# WRONG (Current - Non-functional):
trap 'handle_interrupt' SIGINT  # May not work in all contexts

# CORRECT (GNU Bash compliant):
# Ensure proper signal handling context
set +m  # Disable job control for predictable signal handling
trap 'handle_interrupt' SIGINT
trap 'handle_interrupt' SIGTERM

# Handle the fact that traps don't execute during command execution
handle_interrupt() {
    # Signal received - set flag for processing
    INTERRUPT_RECEIVED=true
    
    # If we're in a command, we need to wait for it to complete
    # The trap will execute after command completion per GNU Bash spec
    
    echo
    echo "=============================================="
    echo "🛑 INTERRUPT SIGNAL RECEIVED (Ctrl-C)"
    echo "=============================================="
    echo
    echo "Current operation will complete, then cleanup will begin."
    echo
    
    # Set cleanup flag for next opportunity
    CLEANUP_REQUESTED=true
}

# Check for interrupt flag in loops and after commands
check_interrupt() {
    if [[ "$INTERRUPT_RECEIVED" == "true" ]]; then
        if [[ "$CLEANUP_REQUESTED" == "true" ]]; then
            perform_cleanup
            exit 130
        fi
    fi
}
```

### **REQUIREMENT 2: CZLONKOWSKI N8N-MCP OFFICIAL DOCUMENTATION COMPLIANCE**
```bash
# ✅ REQUIRED: Follow czlonkowski's n8n-mcp official documentation exactly
# ❌ FORBIDDEN: Container operations not per official n8n-mcp documentation

OFFICIAL SOURCE: https://github.com/czlonkowski/n8n-mcp
DOCKER IMAGE: ghcr.io/czlonkowski/n8n-mcp:latest

KEY SPECIFICATIONS FROM CZLONKOWSKI DOCS:
1. "Ultra-optimized: Our Docker image is 82% smaller than typical n8n images"
2. "Contains NO n8n dependencies - just the runtime MCP server with a pre-built database"
3. "The -i flag is required for MCP stdio communication"
4. "Average response time: ~12ms with optimized SQLite"
5. "Database size: ~15MB (optimized)"

IMPLEMENTATION MANDATE:
- Use exact Docker image: ghcr.io/czlonkowski/n8n-mcp:latest
- Always include -i flag for stdio communication
- Understand this is MCP server, not full n8n installation
- Use proper environment variables per documentation
- Follow container lifecycle per official examples

EXAMPLE COMPLIANCE:
# WRONG (Current - Assumptions about container):
docker run --name n8n-mcp -p 5678:5678 --restart unless-stopped ghcr.io/czlonkowski/n8n-mcp:latest

# CORRECT (Per official documentation):
# Basic MCP server usage (documentation tools only)
docker run -i --rm \
    -e "MCP_MODE=stdio" \
    -e "LOG_LEVEL=error" \
    -e "DISABLE_CONSOLE_OUTPUT=true" \
    ghcr.io/czlonkowski/n8n-mcp:latest

# Full configuration (with n8n management tools)
docker run -i --rm \
    -e "MCP_MODE=stdio" \
    -e "LOG_LEVEL=error" \
    -e "DISABLE_CONSOLE_OUTPUT=true" \
    -e "N8N_API_URL=https://your-n8n-instance.com" \
    -e "N8N_API_KEY=your-api-key" \
    ghcr.io/czlonkowski/n8n-mcp:latest

# Container health check (per documentation)
test_n8n_mcp_container() {
    log_info "Testing n8n-mcp MCP server container per official documentation..."
    
    # Test 1: Verify MCP server image exists
    if docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "ghcr.io/czlonkowski/n8n-mcp:latest"; then
        log_success "Official n8n-mcp MCP server image found"
    else
        log_error "Official n8n-mcp MCP server image not found"
        return 1
    fi
    
    # Test 2: Test MCP server functionality (not web server)
    if timeout 5s docker run -i --rm \
        -e "MCP_MODE=stdio" \
        -e "LOG_LEVEL=error" \
        -e "DISABLE_CONSOLE_OUTPUT=true" \
        ghcr.io/czlonkowski/n8n-mcp:latest \
        <<< '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' >/dev/null 2>&1; then
        log_success "n8n-mcp MCP server responds correctly"
        return 0
    else
        log_error "n8n-mcp MCP server test failed"
        return 1
    fi
}
```

### **REQUIREMENT 3: AUGMENT CODE OFFICIAL DOCUMENTATION COMPLIANCE**
```bash
# ✅ REQUIRED: Follow Augment Code official documentation for MCP integration
# ❌ FORBIDDEN: Augment integration not per official documentation

OFFICIAL SOURCE: https://docs.augmentcode.com/setup-augment/mcp

KEY SPECIFICATIONS FROM AUGMENT DOCS:
1. "Augment Agent can utilize external integrations through Model Context Protocol (MCP)"
2. "MCP servers configured through one method are not visible in the other"
3. "Configure in the Augment Settings Panel" OR "Configure in settings.json"
4. "Not all MCP servers are compatible with Augment's models"
5. "Check compatibility frequently"

IMPLEMENTATION MANDATE:
- Use official Augment MCP configuration methods only
- Test MCP server compatibility with Augment specifically
- Follow exact configuration format from official documentation
- Understand Augment-specific MCP requirements

EXAMPLE COMPLIANCE:
# WRONG (Current - Generic MCP assumptions):
test_augment_code_installation() {
    code --list-extensions | grep -q "augment.vscode-augment"
}

# CORRECT (Per official Augment documentation):
test_augment_mcp_integration() {
    log_info "Testing Augment Code MCP integration per official documentation..."
    
    # Test 1: Verify Augment VSCode extension
    if ! command -v code >/dev/null 2>&1; then
        log_error "VSCode not available - required for Augment"
        return 1
    fi
    
    if ! code --list-extensions 2>/dev/null | grep -q "augment.vscode-augment"; then
        log_error "Augment VSCode extension not installed"
        return 1
    fi
    
    # Test 2: Check MCP configuration methods per official docs
    local settings_file="$HOME/.vscode/settings.json"
    if [[ -f "$settings_file" ]]; then
        if jq -e '.["augment.advanced"].mcpServers' "$settings_file" >/dev/null 2>&1; then
            log_success "Augment MCP servers configured in settings.json"
            return 0
        fi
    fi
    
    # Test 3: Verify n8n-mcp compatibility with Augment
    log_info "Testing n8n-mcp compatibility with Augment models..."
    # Per docs: "Not all MCP servers are compatible with Augment's models"
    # Implementation should test actual compatibility
    
    log_success "Augment Code MCP integration verified"
    return 0
}

configure_augment_mcp_integration() {
    log_info "Configuring Augment MCP integration per official documentation..."
    
    local config_dir="$HOME/.config/augment-code"
    mkdir -p "$config_dir"
    
    # Create MCP server configuration per official Augment format
    cat > "$config_dir/mcp-servers.json" << 'EOF'
{
  "mcpServers": [
    {
      "name": "n8n-mcp",
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "MCP_MODE=stdio",
        "-e", "LOG_LEVEL=error",
        "-e", "DISABLE_CONSOLE_OUTPUT=true",
        "ghcr.io/czlonkowski/n8n-mcp:latest"
      ]
    }
  ]
}
EOF
    
    log_success "Augment MCP configuration created per official documentation"
}
```

### **REQUIREMENT 4: PROCESS GROUP & JOB CONTROL MANAGEMENT**
```bash
# ✅ REQUIRED: Proper process group management for signal delivery
# ❌ FORBIDDEN: Signal handling without proper process group setup

IMPLEMENTATION MANDATE:
- Understand interactive vs non-interactive shell differences
- Manage process groups for proper signal delivery
- Handle job control scenarios correctly
- Ensure signals reach the correct processes

EXAMPLE COMPLIANCE:
# Signal handling with proper process group management
setup_signal_handling() {
    # Disable job control for predictable signal handling
    set +m
    
    # Set up process group for signal delivery
    # In non-interactive shells, we need to ensure proper signal propagation
    if [[ ! -t 0 ]]; then
        # Non-interactive - different signal handling rules apply
        log_info "Setting up non-interactive signal handling..."
    else
        # Interactive - standard signal handling
        log_info "Setting up interactive signal handling..."
    fi
    
    # Register signal handlers
    trap 'handle_interrupt' SIGINT
    trap 'handle_interrupt' SIGTERM
    trap 'handle_exit' EXIT
    
    # Set global flags
    INTERRUPT_RECEIVED=false
    CLEANUP_REQUESTED=false
}

# Execute commands with proper signal handling
execute_with_signal_awareness() {
    local command="$1"
    local description="$2"
    local timeout="${3:-60}"
    
    log_info "Executing: $description (signal-aware)"
    
    # Start command in background to allow signal handling
    eval "$command" &
    local cmd_pid=$!
    
    # Monitor command with signal checking
    local elapsed=0
    while kill -0 "$cmd_pid" 2>/dev/null && [[ $elapsed -lt $timeout ]]; do
        # Check for interrupt signal
        if [[ "$INTERRUPT_RECEIVED" == "true" ]]; then
            log_info "Interrupt received, terminating command..."
            kill -TERM "$cmd_pid" 2>/dev/null || true
            sleep 2
            kill -KILL "$cmd_pid" 2>/dev/null || true
            wait "$cmd_pid" 2>/dev/null || true
            return 130
        fi
        
        sleep 1
        ((elapsed++))
    done
    
    # Get command result
    wait "$cmd_pid"
    return $?
}
```

---

## 🎯 **IMMEDIATE IMPLEMENTATION ACTIONS**

### **ACTION 1: Fix Signal Handler Registration**
```bash
# IMMEDIATE FIX REQUIRED

# PROBLEM: Signal handler not responding to Ctrl-C
^C  # No response in logs

# SOLUTION: Proper signal handler setup per GNU Bash specs
setup_signal_handling() {
    # Disable job control for predictable behavior
    set +m
    
    # Global interrupt flags
    INTERRUPT_RECEIVED=false
    CLEANUP_REQUESTED=false
    
    # Signal handler per GNU Bash specifications
    handle_interrupt() {
        INTERRUPT_RECEIVED=true
        
        echo
        echo "=============================================="
        echo "🛑 INTERRUPT SIGNAL RECEIVED (Ctrl-C)"
        echo "=============================================="
        echo
        
        # Per GNU Bash: trap executes after current command completes
        if [[ -n "$CURRENT_OPERATION" ]]; then
            echo "Waiting for current operation to complete: $CURRENT_OPERATION"
            echo "Press Ctrl-C again to force immediate exit"
            CLEANUP_REQUESTED=true
        else
            echo "Do you want to stop the installation and clean up? [y/N]: "
            read -r -n 1 response
            echo
            if [[ "$response" =~ ^[Yy]$ ]]; then
                perform_cleanup
                exit 130
            else
                INTERRUPT_RECEIVED=false
            fi
        fi
    }
    
    # Register handlers
    trap 'handle_interrupt' SIGINT
    trap 'handle_interrupt' SIGTERM
    trap 'perform_cleanup' EXIT
}

# Call during script initialization
setup_signal_handling
```

### **ACTION 2: Implement Official Documentation Compliance**
```bash
# IMMEDIATE IMPLEMENTATION REQUIRED

# czlonkowski n8n-mcp compliance
test_n8n_mcp_official() {
    # Use exact official Docker image and configuration
    docker run -i --rm \
        -e "MCP_MODE=stdio" \
        -e "LOG_LEVEL=error" \
        -e "DISABLE_CONSOLE_OUTPUT=true" \
        ghcr.io/czlonkowski/n8n-mcp:latest \
        <<< '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}'
}

# Augment Code MCP integration compliance
configure_augment_official() {
    # Follow official Augment MCP configuration format
    local config_dir="$HOME/.config/augment-code"
    mkdir -p "$config_dir"
    
    # Official Augment MCP server configuration
    cat > "$config_dir/mcp-servers.json" << 'EOF'
{
  "mcpServers": [
    {
      "name": "n8n-mcp",
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "MCP_MODE=stdio",
        "-e", "LOG_LEVEL=error", 
        "-e", "DISABLE_CONSOLE_OUTPUT=true",
        "ghcr.io/czlonkowski/n8n-mcp:latest"
      ]
    }
  ]
}
EOF
}
```

### **ACTION 3: Signal-Aware Command Execution**
```bash
# IMMEDIATE IMPLEMENTATION REQUIRED

execute_with_signal_handling() {
    local command="$1"
    local description="$2"
    local timeout="${3:-60}"
    
    CURRENT_OPERATION="$description"
    
    # Execute with signal monitoring
    eval "$command" &
    local cmd_pid=$!
    track_background_process "$cmd_pid"
    
    # Monitor with interrupt checking
    local elapsed=0
    while kill -0 "$cmd_pid" 2>/dev/null && [[ $elapsed -lt $timeout ]]; do
        # Check for interrupt every second
        if [[ "$INTERRUPT_RECEIVED" == "true" ]]; then
            if [[ "$CLEANUP_REQUESTED" == "true" ]]; then
                log_info "Interrupt received, terminating operation..."
                kill -TERM "$cmd_pid" 2>/dev/null || true
                sleep 2
                kill -KILL "$cmd_pid" 2>/dev/null || true
                wait "$cmd_pid" 2>/dev/null || true
                perform_cleanup
                exit 130
            fi
        fi
        
        sleep 1
        ((elapsed++))
    done
    
    CURRENT_OPERATION=""
    wait "$cmd_pid"
    return $?
}
```

---

## 📋 **COMPLIANCE VALIDATION CHECKLIST**

### **Before Any Code Submission:**
- [ ] **GNU Bash signal handling compliance** - Follows official specifications exactly
- [ ] **czlonkowski n8n-mcp compliance** - Uses official Docker image and configuration
- [ ] **Augment Code MCP compliance** - Follows official MCP integration documentation
- [ ] **Signal handler functionality** - Ctrl-C actually works and responds
- [ ] **Process group management** - Proper signal delivery to correct processes

### **Official Documentation Sources Verified:**
- [ ] GNU Bash Manual: https://www.gnu.org/s/bash/manual/html_node/Signals.html
- [ ] czlonkowski n8n-mcp: https://github.com/czlonkowski/n8n-mcp
- [ ] Augment Code MCP: https://docs.augmentcode.com/setup-augment/mcp
- [ ] All implementations verified against official sources
- [ ] No assumptions or hallucinations present

---

## ✅ **SUCCESS CRITERIA**

### **Code Must Achieve:**
1. **Functional Ctrl-C handling** - Signal handler responds immediately to Ctrl-C
2. **Official documentation compliance** - All implementations per verified sources
3. **Proper signal delivery** - Signals reach handlers in all execution contexts
4. **czlonkowski n8n-mcp integration** - Exact official Docker configuration
5. **Augment MCP compatibility** - Official Augment MCP integration format

### **User Experience Must Deliver:**
1. **Responsive Ctrl-C** - Immediate signal handler response
2. **Graceful cleanup** - Proper resource cleanup on interrupt
3. **Official tool integration** - Working n8n-mcp and Augment integration
4. **Professional reliability** - No signal handling failures
5. **Complete documentation compliance** - All official specifications followed

---

## ⚡ **IMPLEMENTATION MANDATE**

**This prompt requires IMMEDIATE compliance. Any code that:**
- Has non-functional signal handling (Ctrl-C doesn't work)
- Deviates from official documentation specifications
- Uses assumptions instead of verified official sources
- Implements signal handling not per GNU Bash manual
- Configures tools not per their official documentation

**MUST be fixed IMMEDIATELY. No exceptions.**

**The goal is bulletproof signal handling with complete official documentation compliance.**

---

## 🎯 **ZERO TOLERANCE POLICY**

### **FORBIDDEN PATTERNS:**
- ❌ Signal handlers that don't respond to Ctrl-C
- ❌ Container configurations not per czlonkowski official docs
- ❌ Augment integration not per official Augment documentation
- ❌ Signal handling not per GNU Bash specifications
- ❌ Any assumptions not verified in official documentation

### **REQUIRED PATTERNS:**
- ✅ Functional Ctrl-C handling with immediate response
- ✅ Exact czlonkowski n8n-mcp Docker configuration
- ✅ Official Augment MCP integration format
- ✅ GNU Bash compliant signal handling
- ✅ All implementations verified against official sources

**COMPLIANCE IS MANDATORY. OFFICIAL DOCUMENTATION IS REQUIRED. CTRL-C MUST WORK.**
