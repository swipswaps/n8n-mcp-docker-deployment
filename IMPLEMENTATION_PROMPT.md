# PRODUCTION-READY n8n-mcp Implementation Prompt

## OBJECTIVE
Transform the current alpha n8n-mcp Docker deployment script into a production-ready, immediately usable tool that integrates seamlessly with Augment Code for workflow automation.

## CURRENT STATUS
- ✅ **Alpha script tested locally** - core functionality works
- ✅ **Docker integration verified** - image pulls and runs correctly  
- ✅ **22 n8n tools available** - with 499 indexed documentation entries
- ❌ **21 ShellCheck warnings** - blocking production use
- ❌ **No real integration testing** - only dry-run mode works
- ❌ **Poor user experience** - no progress feedback or clear guidance

## IMPLEMENTATION REQUIREMENTS

### 1. CRITICAL: Fix All Code Quality Issues
**MANDATORY - Zero tolerance for warnings**

```bash
# Fix all 21 SC2155 warnings - separate declarations from assignments
# BEFORE (problematic):
local current_tty="$(tty 2>/dev/null || echo 'unknown')"

# AFTER (compliant):
local current_tty
current_tty="$(tty 2>/dev/null || echo 'unknown')"

# Apply this pattern to ALL instances in the script
```

**Specific fixes required:**
- Lines 117, 118, 314, 318, 322, 326, 332, 375, 439, 499, 661, 854, 855, 856, 880, 881, 882, 886, 1124: Fix SC2155 warnings
- Line 830: Remove unused `max_score` variable
- Line 947: Fix conditional logic pattern
- Lines 1050, 1161-1223: Remove unreachable code or make reachable

### 2. CRITICAL: Implement Real Integration Testing
**Current limitation: Only --dry-run works properly**

```bash
# Add comprehensive integration testing function
test_augment_integration() {
    log_info "Testing Augment Code integration..."
    
    # 1. Verify Augment Code is installed and accessible
    if ! command -v augment >/dev/null 2>&1; then
        log_error "Augment Code not found - please install first"
        return 1
    fi
    
    # 2. Check if Augment Code is running
    if ! pgrep -f "augment" >/dev/null; then
        log_warn "Augment Code not running - please start it first"
        log_info "Run: augment &"
        return 1
    fi
    
    # 3. Create and validate MCP configuration
    create_mcp_config || return 1
    
    # 4. Test n8n-mcp container connectivity
    log_info "Testing n8n-mcp container..."
    if ! timeout 30s docker run --rm "$N8N_MCP_IMAGE" >/dev/null 2>&1; then
        log_error "n8n-mcp container failed to start"
        return 1
    fi
    
    # 5. Verify configuration is valid JSON
    if ! jq empty "$CONFIG_DIR/mcp-servers.json" 2>/dev/null; then
        log_error "Invalid MCP configuration JSON"
        return 1
    fi
    
    log_success "Integration testing completed successfully"
    return 0
}
```

### 3. ESSENTIAL: User-Friendly Experience
**Add interactive installation with progress feedback**

```bash
# Interactive installation wizard
interactive_install() {
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                n8n-mcp Docker Installation                   ║"
    echo "║          Augment Code Workflow Automation Setup             ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo
    
    # Pre-installation checks
    echo "🔍 Performing pre-installation checks..."
    check_prerequisites || exit 1
    
    # Confirm installation
    echo
    read -p "📦 Install n8n-mcp Docker integration? [Y/n]: " confirm
    [[ $confirm =~ ^[Nn] ]] && { echo "Installation cancelled."; exit 0; }
    
    echo
    echo "🚀 Starting installation..."
}

# Progress indicator function
show_progress() {
    local pid=$1
    local message=$2
    local spin='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    local i=0
    
    while kill -0 $pid 2>/dev/null; do
        i=$(( (i+1) % 10 ))
        printf "\r$message ${spin:$i:1}"
        sleep 0.1
    done
    printf "\r$message ✅\n"
}
```

### 4. ESSENTIAL: Comprehensive Verification
**Post-installation testing suite**

```bash
verify_installation() {
    echo
    echo "🧪 Verifying installation..."
    local tests_passed=0
    local total_tests=6
    
    # Test 1: Docker image
    echo -n "   Docker image... "
    if docker images "$N8N_MCP_IMAGE" --format "{{.Repository}}" | grep -q n8n-mcp; then
        echo "✅"
        ((tests_passed++))
    else
        echo "❌"
    fi
    
    # Test 2: Container functionality
    echo -n "   Container startup... "
    if timeout 10s docker run --rm "$N8N_MCP_IMAGE" >/dev/null 2>&1; then
        echo "✅"
        ((tests_passed++))
    else
        echo "❌"
    fi
    
    # Test 3: Configuration file
    echo -n "   MCP configuration... "
    if [[ -f "$CONFIG_DIR/mcp-servers.json" ]] && jq empty "$CONFIG_DIR/mcp-servers.json" 2>/dev/null; then
        echo "✅"
        ((tests_passed++))
    else
        echo "❌"
    fi
    
    # Test 4: Augment Code integration
    echo -n "   Augment Code integration... "
    if test_augment_integration >/dev/null 2>&1; then
        echo "✅"
        ((tests_passed++))
    else
        echo "❌"
    fi
    
    # Test 5: Tool availability
    echo -n "   n8n tools availability... "
    if verify_tools_available; then
        echo "✅"
        ((tests_passed++))
    else
        echo "❌"
    fi
    
    # Test 6: System health
    echo -n "   System health... "
    if [[ $(calculate_compliance_score) -ge 70 ]]; then
        echo "✅"
        ((tests_passed++))
    else
        echo "❌"
    fi
    
    echo
    if [[ $tests_passed -eq $total_tests ]]; then
        echo "🎉 Installation completed successfully! ($tests_passed/$total_tests tests passed)"
        show_success_message
        return 0
    else
        echo "⚠️  Installation completed with issues ($tests_passed/$total_tests tests passed)"
        show_troubleshooting_guide
        return 1
    fi
}
```

## EXPECTED USER EXPERIENCE

```bash
$ ./install-test-n8n-mcp-docker.sh

╔══════════════════════════════════════════════════════════════╗
║                n8n-mcp Docker Installation                   ║
║          Augment Code Workflow Automation Setup             ║
╚══════════════════════════════════════════════════════════════╝

🔍 Performing pre-installation checks...
   ✅ Docker installed and running
   ✅ Augment Code detected
   ✅ System requirements met
   ✅ Sufficient disk space (300MB required)

📦 Install n8n-mcp Docker integration? [Y/n]: y

🚀 Starting installation...
   📥 Downloading n8n-mcp image (300MB)... ✅
   🐳 Starting n8n-mcp container... ✅
   ⚙️  Configuring Augment Code integration... ✅
   🔗 Testing integration... ✅

🧪 Verifying installation...
   Docker image... ✅
   Container startup... ✅
   MCP configuration... ✅
   Augment Code integration... ✅
   n8n tools availability... ✅
   System health... ✅

🎉 Installation completed successfully! (6/6 tests passed)

┌─────────────────────────────────────────────────────────────┐
│                        SUCCESS!                             │
│                                                             │
│  n8n-mcp is now integrated with Augment Code               │
│  22 workflow automation tools are available                │
│                                                             │
│  Next Steps:                                                │
│  1. Restart Augment Code: pkill -f augment && augment &    │
│  2. Test integration: "Show me available n8n nodes"        │
│  3. Create workflow: "Help me create a web scraping flow"  │
│                                                             │
│  Configuration: ~/.config/augment-code/mcp-servers.json    │
│  Documentation: https://github.com/czlonkowski/n8n-mcp     │
└─────────────────────────────────────────────────────────────┘
```

## DELIVERABLE REQUIREMENTS

**Transform `install-test-n8n-mcp-docker.sh` to:**
1. ✅ **Pass all code quality checks** (0 ShellCheck warnings)
2. ✅ **Provide interactive user experience** (progress indicators, clear feedback)
3. ✅ **Test real integration** (not just dry-run)
4. ✅ **Enable immediate productivity** (working n8n tools in Augment Code)
5. ✅ **Handle errors gracefully** (rollback, troubleshooting guidance)

**Version:** Update to `0.2.0-beta` (production-ready)
**Compliance:** Maintain 80%+ Augment Rules compliance
**Quality:** Enterprise-grade reliability and user experience

**ACCEPTANCE CRITERIA:** User runs script, sees clear progress, installation succeeds without warnings, and can immediately use n8n-mcp tools in Augment Code to create workflows.
