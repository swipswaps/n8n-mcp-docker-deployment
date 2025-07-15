# EFFICACIOUS OFFICIAL DOCS COMPLIANCE MANDATE - CRITICAL FUNCTION RESOLUTION & DOCUMENTATION ADHERENCE

## 🚨 **CRITICAL FUNCTION RESOLUTION - OFFICIAL DOCUMENTATION COMPLIANCE REQUIRED**

**This prompt REQUIRES immediate compliance to fix critical function resolution failures and ensure ALL implementations strictly follow official documentation. ABSOLUTELY NO ASSUMPTIONS OR HALLUCINATIONS - ONLY VERIFIED OFFICIAL DOCUMENTATION SOURCES.**

---

## 📊 **CRITICAL EVIDENCE FROM installation_stall_2025_07_15_19_23_00.txt**

### **FUNCTION RESOLUTION FAILURES IDENTIFIED:**
```bash
# CRITICAL FUNCTION FAILURES:
timeout: failed to run command 'test_n8n_mcp_container': No such file or directory
timeout: failed to run command 'test_augment_code_installation': No such file or directory

# AUGMENT CLI COMMAND FAILURES:
./install-test-n8n-mcp-docker.sh: line 1661: augment: command not found
❌ Process augment failed to start within 30s
❌ Augment Code recovery failed

# PATTERN: Functions exist but timeout command cannot find them
# PATTERN: Script still tries to run non-existent 'augment' CLI command
```

### **ROOT CAUSE ANALYSIS**
1. **Function resolution failure** - `timeout` command cannot find test functions in script scope
2. **Augment CLI misconception** - Script still attempts to run non-existent `augment` command
3. **Official documentation deviation** - Implementation doesn't follow Augment Code official docs
4. **Function scoping issues** - Test functions not properly accessible to timeout command
5. **Recovery mechanism failures** - Augment recovery tries CLI commands that don't exist

---

## ⚡ **MANDATORY COMPLIANCE REQUIREMENTS**

### **REQUIREMENT 1: OFFICIAL DOCUMENTATION RESEARCH & COMPLIANCE**
```bash
# ✅ REQUIRED: Research official documentation before ANY implementation
# ❌ FORBIDDEN: Making assumptions about how tools work without verification

IMPLEMENTATION MANDATE:
- Research Augment Code official documentation at docs.augmentcode.com
- Verify VSCode extension installation and configuration methods
- Confirm MCP server integration procedures from official sources
- Validate Docker container management best practices
- Cross-reference all implementations with verified documentation

RESEARCH SOURCES REQUIRED:
1. Augment Code Official Documentation: https://docs.augmentcode.com/
2. VSCode Extension API: https://code.visualstudio.com/api/
3. MCP Protocol Specification: https://modelcontextprotocol.io/
4. Docker Official Documentation: https://docs.docker.com/
5. Node.js Official Documentation: https://nodejs.org/docs/

EXAMPLE COMPLIANCE:
# BEFORE (WRONG - Assumptions):
test_augment_code_installation() {
    command -v augment >/dev/null 2>&1  # ASSUMPTION: CLI exists
}

# AFTER (CORRECT - Official docs verified):
test_augment_code_installation() {
    # Based on official docs: Augment is VSCode extension, not CLI
    if command -v code >/dev/null 2>&1; then
        code --list-extensions | grep -q "augment.vscode-augment"
    else
        return 0  # Skip if VSCode not available
    fi
}
```

### **REQUIREMENT 2: FUNCTION SCOPING & TIMEOUT COMPATIBILITY**
```bash
# ✅ REQUIRED: Fix function scoping for timeout command compatibility
# ❌ FORBIDDEN: Functions that cannot be called by timeout command

IMPLEMENTATION MANDATE:
- Ensure all test functions are properly exported or accessible
- Fix function scoping issues that prevent timeout from finding functions
- Use proper bash function declaration and export methods
- Test function accessibility before using with timeout

EXAMPLE COMPLIANCE:
# WRONG (Current - Function not accessible to timeout):
test_n8n_mcp_container() {
    # Function exists but timeout can't find it
}

# CORRECT (Fixed - Proper function accessibility):
# Method 1: Export function
export -f test_n8n_mcp_container
test_n8n_mcp_container() {
    # Function implementation
}

# Method 2: Use bash -c with function definition
run_test_with_timeout() {
    local test_function="$1"
    local timeout_seconds="$2"
    
    timeout "$timeout_seconds" bash -c "
        $(declare -f "$test_function")
        $test_function
    "
}

# Method 3: Direct execution without timeout wrapper
test_n8n_mcp_container_direct() {
    local start_time=$(date +%s)
    local timeout_seconds=10
    
    while [[ $(($(date +%s) - start_time)) -lt $timeout_seconds ]]; do
        # Test implementation with internal timeout handling
        if docker ps --format "{{.Names}}" | grep -q "^n8n-mcp$"; then
            return 0
        fi
        sleep 1
    done
    return 1
}
```

### **REQUIREMENT 3: AUGMENT CODE OFFICIAL INTEGRATION**
```bash
# ✅ REQUIRED: Follow official Augment Code documentation exactly
# ❌ FORBIDDEN: CLI commands or assumptions not in official docs

IMPLEMENTATION MANDATE:
- Research official Augment Code installation and configuration
- Implement VSCode extension verification per official documentation
- Configure MCP integration according to official Augment docs
- Remove all non-existent CLI command attempts

OFFICIAL DOCUMENTATION RESEARCH REQUIRED:
1. How is Augment Code actually installed? (VSCode Marketplace)
2. How is Augment Code configured? (VSCode settings or Augment panel)
3. How does MCP integration work? (settings.json or Augment settings)
4. What commands/APIs are actually available? (Extension API only)
5. How to verify installation? (VSCode extension list)

EXAMPLE COMPLIANCE:
# Research official docs first, then implement:
verify_augment_installation_official() {
    log_info "Verifying Augment Code installation per official documentation..."
    
    # Step 1: Verify VSCode is available (prerequisite per docs)
    if ! command -v code >/dev/null 2>&1; then
        log_warn "VSCode not available - Augment requires VSCode"
        return 1
    fi
    
    # Step 2: Check extension installation (per official docs method)
    if code --list-extensions | grep -q "augment.vscode-augment"; then
        log_success "Augment VSCode extension installed"
        
        # Step 3: Verify extension is enabled (if API available)
        # Research: How to check if extension is enabled vs just installed?
        
        return 0
    else
        log_error "Augment VSCode extension not found"
        return 1
    fi
}

configure_augment_mcp_official() {
    log_info "Configuring Augment MCP integration per official documentation..."
    
    # Research required: What is the official way to configure MCP?
    # Option 1: VSCode settings.json
    # Option 2: Augment settings panel
    # Option 3: Augment configuration files
    
    # Implement based on official documentation findings
}
```

### **REQUIREMENT 4: DOCKER CONTAINER MANAGEMENT BEST PRACTICES**
```bash
# ✅ REQUIRED: Follow Docker official documentation for container management
# ❌ FORBIDDEN: Non-standard container operations or assumptions

IMPLEMENTATION MANDATE:
- Research Docker official documentation for container lifecycle
- Implement proper container health checks per Docker best practices
- Use official Docker commands and patterns only
- Verify container operations against Docker documentation

OFFICIAL DOCKER RESEARCH REQUIRED:
1. Container health check best practices
2. Proper container lifecycle management
3. Container networking and port management
4. Container resource management and monitoring
5. Container cleanup and maintenance procedures

EXAMPLE COMPLIANCE:
# Research Docker docs, then implement proper container management:
manage_n8n_mcp_container_official() {
    local container_name="n8n-mcp"
    local image_name="ghcr.io/czlonkowski/n8n-mcp:latest"
    
    log_info "Managing n8n-mcp container per Docker best practices..."
    
    # Step 1: Check if container exists (Docker official method)
    if docker ps -a --format "{{.Names}}" | grep -q "^${container_name}$"; then
        log_info "Container exists, checking status..."
        
        # Step 2: Check container status (Docker official method)
        local status=$(docker inspect --format="{{.State.Status}}" "$container_name" 2>/dev/null)
        
        case "$status" in
            "running")
                log_success "Container is running"
                # Step 3: Health check (Docker official method)
                if docker exec "$container_name" echo "health" >/dev/null 2>&1; then
                    log_success "Container health check passed"
                    return 0
                else
                    log_warn "Container health check failed"
                    return 1
                fi
                ;;
            "exited")
                log_info "Container exists but stopped, starting..."
                docker start "$container_name"
                ;;
            *)
                log_warn "Container in unexpected state: $status"
                return 1
                ;;
        esac
    else
        log_info "Container doesn't exist, creating..."
        # Create container per Docker best practices
        docker run -d --name "$container_name" \
            --restart unless-stopped \
            -p 5678:5678 \
            "$image_name"
    fi
}
```

---

## 🎯 **IMMEDIATE IMPLEMENTATION ACTIONS**

### **ACTION 1: Fix Function Scoping Issues**
```bash
# IMMEDIATE FIX REQUIRED

# PROBLEM: timeout can't find functions
timeout 10s test_n8n_mcp_container  # FAILS: No such file or directory

# SOLUTION 1: Export functions
export -f test_n8n_mcp_container
export -f test_augment_code_installation
export -f test_mcp_configuration

# SOLUTION 2: Use bash -c with function definition
run_test_with_proper_timeout() {
    local test_function="$1"
    local timeout_seconds="$2"
    
    timeout "$timeout_seconds" bash -c "
        # Import all necessary functions and variables
        $(declare -f log_info log_success log_error)
        $(declare -f "$test_function")
        
        # Execute the test
        $test_function
    "
}

# SOLUTION 3: Implement internal timeout handling
test_with_internal_timeout() {
    local test_function="$1"
    local timeout_seconds="$2"
    local start_time=$(date +%s)
    
    while [[ $(($(date +%s) - start_time)) -lt $timeout_seconds ]]; do
        if "$test_function"; then
            return 0
        fi
        sleep 1
    done
    
    log_error "Test timed out after ${timeout_seconds}s"
    return 124  # timeout exit code
}
```

### **ACTION 2: Remove All Non-Existent Augment CLI Commands**
```bash
# IMMEDIATE REMOVAL REQUIRED

# WRONG (Current - Non-existent commands):
augment --version                    # REMOVE: No such command
command -v augment                   # REMOVE: No such command
pgrep -f "augment"                  # REMOVE: Not how extensions work
wait_for_augment_ready()            # REMOVE: Based on wrong assumption

# CORRECT (Official docs based):
verify_augment_extension() {
    if command -v code >/dev/null 2>&1; then
        code --list-extensions | grep -q "augment.vscode-augment"
    else
        return 1
    fi
}

configure_augment_mcp() {
    # Research official docs for actual configuration method
    # Implement based on verified official documentation
}
```

### **ACTION 3: Research and Implement Official Documentation**
```bash
# IMMEDIATE RESEARCH AND IMPLEMENTATION REQUIRED

# Step 1: Research official documentation
research_official_documentation() {
    echo "REQUIRED RESEARCH BEFORE IMPLEMENTATION:"
    echo "1. Augment Code: https://docs.augmentcode.com/"
    echo "   - How is it installed?"
    echo "   - How is it configured?"
    echo "   - How does MCP integration work?"
    echo "   - What APIs/commands are available?"
    echo ""
    echo "2. VSCode Extensions: https://code.visualstudio.com/api/"
    echo "   - Extension installation verification"
    echo "   - Extension configuration methods"
    echo "   - Extension lifecycle management"
    echo ""
    echo "3. MCP Protocol: https://modelcontextprotocol.io/"
    echo "   - Server configuration"
    echo "   - Client integration"
    echo "   - Protocol implementation"
}

# Step 2: Implement based on research findings
implement_based_on_official_docs() {
    # This function should only be implemented AFTER
    # thorough research of official documentation
    # NO ASSUMPTIONS OR HALLUCINATIONS ALLOWED
}
```

---

## 📋 **COMPLIANCE VALIDATION CHECKLIST**

### **Before Any Code Submission:**
- [ ] **Official documentation researched** - All implementations based on verified sources
- [ ] **Function scoping fixed** - All functions accessible to timeout command
- [ ] **Augment CLI commands removed** - No non-existent command attempts
- [ ] **Docker best practices followed** - Container management per official docs
- [ ] **MCP integration verified** - Configuration per official specifications

### **Documentation Sources Verified:**
- [ ] Augment Code official documentation reviewed and implemented
- [ ] VSCode extension API documentation consulted
- [ ] MCP protocol specification followed
- [ ] Docker official documentation referenced
- [ ] All assumptions replaced with verified facts

---

## ✅ **SUCCESS CRITERIA**

### **Code Must Achieve:**
1. **Function resolution success** - All test functions callable by timeout
2. **Official documentation compliance** - All implementations verified against docs
3. **No CLI command failures** - Augment integration uses proper methods
4. **Proper container management** - Docker operations per best practices
5. **MCP integration working** - Configuration per official specifications

### **User Experience Must Deliver:**
1. **No function resolution errors** - All tests execute successfully
2. **Proper Augment integration** - Extension verification and configuration
3. **Working container management** - n8n-mcp container operates correctly
4. **Successful MCP setup** - Integration ready for use
5. **Professional reliability** - No errors or failed operations

---

## ⚡ **IMPLEMENTATION MANDATE**

**This prompt requires IMMEDIATE compliance. Any code that:**
- Makes assumptions without official documentation verification
- Uses non-existent CLI commands or APIs
- Has function scoping issues preventing timeout execution
- Deviates from official documentation and best practices
- Contains hallucinated functionality not verified in official sources

**MUST be fixed IMMEDIATELY. No exceptions.**

**The goal is bulletproof reliability based on official documentation and verified functionality only.**

---

## 🎯 **ZERO TOLERANCE POLICY**

### **FORBIDDEN PATTERNS:**
- ❌ `augment --version` or any CLI commands not in official docs
- ❌ Functions that timeout command cannot find or execute
- ❌ Assumptions about tool behavior without documentation verification
- ❌ Implementation patterns not found in official documentation
- ❌ Hallucinated APIs or commands not verified in official sources

### **REQUIRED PATTERNS:**
- ✅ `code --list-extensions | grep augment` (verified VSCode method)
- ✅ Exported functions or proper scoping for timeout compatibility
- ✅ Docker commands and patterns from official documentation
- ✅ MCP configuration methods from official specifications
- ✅ All implementations verified against official documentation

**COMPLIANCE IS MANDATORY. OFFICIAL DOCUMENTATION IS REQUIRED. NO ASSUMPTIONS ALLOWED.**
