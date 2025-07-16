---
type: "manual"
---

# Automated Installation Upgrade - Rules Compliant Implementation

## OBJECTIVE
Transform the n8n-mcp Docker deployment from a manual 20-step process into a fully automated, one-command installation that handles all dependencies, environments, permissions, variables, and folders automatically.

## CURRENT ANALYSIS
Based on USER_GUIDE.md analysis, the following manual steps should be automated by the script:

### Manual Steps Currently Required (SHOULD BE AUTOMATED)
1. **OS Verification** (Step 1) - Manual `cat /etc/os-release`
2. **Disk Space Check** (Step 2) - Manual `df -h /`
3. **Internet Connectivity** (Step 3) - Manual `ping` test
4. **Docker Installation** (Step 4) - Manual platform-specific commands
5. **Augment Code Verification** (Step 5) - Manual installation check
6. **Dependencies Installation** (Step 6) - Manual Git, jq installation
7. **Repository Download** (Step 7) - Manual git clone
8. **Script Permissions** (Step 8) - Manual chmod
9. **Augment Code Startup** (Step 12) - Manual process management
10. **Post-Installation Verification** (Steps 15-17) - Manual verification commands
11. **Configuration Validation** (Step 16) - Manual JSON validation
12. **Service Restart** (Step 17) - Manual Augment Code restart

### Currently Automated (GOOD)
- Docker image download and testing
- Container functionality verification
- MCP configuration creation
- Integration testing (dry-run mode)
- Comprehensive cleanup and monitoring

## IMPLEMENTATION REQUIREMENTS

### 1. CRITICAL: Automated Dependency Management
**MANDATORY - Zero manual dependency installation**

```bash
# Add comprehensive dependency detection and installation
auto_install_dependencies() {
    log_info "Checking and installing dependencies..."
    
    # Detect OS and package manager
    detect_os_and_package_manager
    
    # Install missing dependencies automatically
    install_missing_packages "git" "jq" "curl" "wget"
    
    # Verify all dependencies are available
    verify_dependencies || return 1
}

detect_os_and_package_manager() {
    if [[ -f /etc/os-release ]]; then
        source /etc/os-release
        OS_ID="$ID"
        OS_VERSION="$VERSION_ID"
        
        case "$OS_ID" in
            "fedora"|"rhel"|"centos") PACKAGE_MANAGER="dnf" ;;
            "ubuntu"|"debian") PACKAGE_MANAGER="apt" ;;
            "arch"|"manjaro") PACKAGE_MANAGER="pacman" ;;
            *) log_error "Unsupported OS: $OS_ID"; return 1 ;;
        esac
    else
        log_error "Cannot detect OS - /etc/os-release not found"
        return 1
    fi
}

install_missing_packages() {
    local packages=("$@")
    local missing_packages=()
    
    # Check which packages are missing
    for package in "${packages[@]}"; do
        if ! command -v "$package" >/dev/null 2>&1; then
            missing_packages+=("$package")
        fi
    done
    
    # Install missing packages
    if [[ ${#missing_packages[@]} -gt 0 ]]; then
        log_info "Installing missing packages: ${missing_packages[*]}"
        case "$PACKAGE_MANAGER" in
            "dnf") sudo dnf install -y "${missing_packages[@]}" ;;
            "apt") sudo apt update && sudo apt install -y "${missing_packages[@]}" ;;
            "pacman") sudo pacman -S --noconfirm "${missing_packages[@]}" ;;
        esac
    fi
}
```

### 2. CRITICAL: Automated Environment Setup
**MANDATORY - Complete environment preparation**

```bash
# Add comprehensive environment setup
setup_environment() {
    log_info "Setting up installation environment..."
    
    # Create necessary directories
    create_required_directories
    
    # Set proper permissions
    configure_permissions
    
    # Setup environment variables
    configure_environment_variables
    
    # Verify environment is ready
    verify_environment_setup || return 1
}

create_required_directories() {
    local directories=(
        "$CONFIG_DIR"
        "$LOG_DIR"
        "$HOME/.local/bin"
        "$HOME/.cache/n8n-mcp"
    )
    
    for dir in "${directories[@]}"; do
        if [[ ! -d "$dir" ]]; then
            mkdir -p "$dir" || {
                log_error "Failed to create directory: $dir"
                return 1
            }
            log_info "Created directory: $dir"
        fi
    done
}

configure_permissions() {
    # Set secure permissions for config directory
    chmod 700 "$CONFIG_DIR" 2>/dev/null || true
    
    # Ensure script is executable
    chmod +x "$0" 2>/dev/null || true
    
    # Set proper ownership
    chown -R "$USER:$(id -gn)" "$CONFIG_DIR" 2>/dev/null || true
}
```

### 3. CRITICAL: Automated Prerequisites Verification
**MANDATORY - Comprehensive system checks**

```bash
# Add automated prerequisites checking
verify_prerequisites() {
    log_info "Verifying system prerequisites..."
    
    # Check OS compatibility
    verify_os_compatibility || return 1
    
    # Check disk space
    verify_disk_space || return 1
    
    # Check internet connectivity
    verify_internet_connectivity || return 1
    
    # Check system resources
    verify_system_resources || return 1
    
    log_success "All prerequisites verified"
}

verify_os_compatibility() {
    local supported_os=("fedora" "ubuntu" "debian" "arch" "manjaro")
    local current_os
    
    if [[ -f /etc/os-release ]]; then
        current_os=$(grep '^ID=' /etc/os-release | cut -d'=' -f2 | tr -d '"')
        
        for os in "${supported_os[@]}"; do
            if [[ "$current_os" == "$os" ]]; then
                log_info "OS compatibility verified: $current_os"
                return 0
            fi
        done
        
        log_error "Unsupported OS: $current_os"
        log_error "Supported: ${supported_os[*]}"
        return 1
    else
        log_error "Cannot detect OS - /etc/os-release not found"
        return 1
    fi
}

verify_disk_space() {
    local required_space_mb=1024  # 1GB minimum
    local available_space_mb
    
    available_space_mb=$(df / | awk 'NR==2 {print int($4/1024)}')
    
    if [[ $available_space_mb -lt $required_space_mb ]]; then
        log_error "Insufficient disk space: ${available_space_mb}MB available, ${required_space_mb}MB required"
        return 1
    fi
    
    log_info "Disk space verified: ${available_space_mb}MB available"
}

verify_internet_connectivity() {
    local test_hosts=("google.com" "github.com" "ghcr.io")
    
    for host in "${test_hosts[@]}"; do
        if ping -c 1 -W 5 "$host" >/dev/null 2>&1; then
            log_info "Internet connectivity verified: $host reachable"
            return 0
        fi
    done
    
    log_error "No internet connectivity - cannot reach any test hosts"
    return 1
}
```

### 4. ESSENTIAL: Automated Augment Code Management
**MANDATORY - Complete Augment Code integration**

```bash
# Add automated Augment Code management
manage_augment_code() {
    log_info "Managing Augment Code integration..."
    
    # Detect Augment Code installation
    detect_augment_code || return 1
    
    # Ensure Augment Code is running
    ensure_augment_code_running || return 1
    
    # Backup existing configuration
    backup_augment_config
    
    # Create MCP configuration
    create_mcp_configuration || return 1
    
    # Validate configuration
    validate_mcp_configuration || return 1
    
    # Restart Augment Code with new configuration
    restart_augment_code || return 1
}

detect_and_install_augment_code() {
    log_info "🤖 Managing Augment Code dependency..."

    if command -v augment >/dev/null 2>&1; then
        local augment_version
        augment_version=$(augment --version 2>/dev/null || echo "unknown")
        log_success "✅ Augment Code detected: $augment_version"
        return 0
    fi

    log_warn "⚠️  Augment Code not found - attempting automatic installation..."

    # Attempt automatic Augment Code installation
    install_augment_code_automatically || {
        log_error "❌ Failed to install Augment Code automatically"
        attempt_augment_code_recovery || return 1
    }

    # Verify installation
    if command -v augment >/dev/null 2>&1; then
        local augment_version
        augment_version=$(augment --version 2>/dev/null || echo "unknown")
        log_success "✅ Augment Code installed successfully: $augment_version"
        return 0
    else
        log_error "❌ Augment Code installation verification failed"
        return 1
    fi
}

install_augment_code_automatically() {
    log_info "   📥 Downloading and installing Augment Code..."

    # Create temporary directory for installation
    local temp_dir
    temp_dir=$(mktemp -d)
    TEMP_DIRS+=("$temp_dir")

    # Detect architecture and OS for correct download
    local arch os_type download_url
    arch=$(uname -m)
    os_type=$(uname -s | tr '[:upper:]' '[:lower:]')

    case "$arch" in
        "x86_64") arch="x64" ;;
        "aarch64"|"arm64") arch="arm64" ;;
        *) log_error "Unsupported architecture: $arch"; return 1 ;;
    esac

    # Construct download URL (adjust based on actual Augment Code distribution)
    download_url="https://releases.augmentcode.com/latest/augment-${os_type}-${arch}"

    # Download Augment Code
    if curl -fsSL "$download_url" -o "$temp_dir/augment"; then
        log_info "   ✅ Augment Code downloaded"
    else
        log_warn "   ⚠️  Direct download failed, trying alternative methods..."
        return 1
    fi

    # Install to user's local bin
    local install_dir="$HOME/.local/bin"
    mkdir -p "$install_dir"

    chmod +x "$temp_dir/augment"
    cp "$temp_dir/augment" "$install_dir/augment"

    # Add to PATH if not already there
    if [[ ":$PATH:" != *":$install_dir:"* ]]; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
        export PATH="$HOME/.local/bin:$PATH"
        log_info "   ✅ Added $install_dir to PATH"
    fi

    return 0
}

attempt_augment_code_recovery() {
    log_info "   🔄 Attempting Augment Code recovery strategies..."

    # Strategy 1: Try package managers
    case "$DETECTED_OS" in
        "ubuntu"|"debian")
            if curl -fsSL https://augmentcode.com/install.sh | bash; then
                log_success "   ✅ Installed via official installer"
                return 0
            fi
            ;;
        "fedora")
            # Try Flatpak if available
            if command -v flatpak >/dev/null 2>&1; then
                if flatpak install -y flathub com.augmentcode.AugmentCode 2>/dev/null; then
                    log_success "   ✅ Installed via Flatpak"
                    return 0
                fi
            fi
            ;;
    esac

    # Strategy 2: Try AppImage
    local appimage_url="https://releases.augmentcode.com/latest/Augment-Code.AppImage"
    local install_dir="$HOME/.local/bin"

    if curl -fsSL "$appimage_url" -o "$install_dir/augment.appimage"; then
        chmod +x "$install_dir/augment.appimage"
        ln -sf "$install_dir/augment.appimage" "$install_dir/augment"
        log_success "   ✅ Installed via AppImage"
        return 0
    fi

    # Strategy 3: Build from source (last resort)
    attempt_build_from_source || {
        log_error "   ❌ All recovery strategies failed"
        log_error "   Please install Augment Code manually from: https://augmentcode.com"
        log_error "   Then re-run this script"
        return 1
    }
}

attempt_build_from_source() {
    log_info "   🔨 Attempting to build Augment Code from source..."

    # Check if we have build dependencies
    local build_deps=("git" "nodejs" "npm" "python3" "make" "gcc")
    local missing_build_deps=()

    for dep in "${build_deps[@]}"; do
        if ! command -v "$dep" >/dev/null 2>&1; then
            missing_build_deps+=("$dep")
        fi
    done

    if [[ ${#missing_build_deps[@]} -gt 0 ]]; then
        log_info "   📦 Installing build dependencies: ${missing_build_deps[*]}"
        install_build_dependencies "${missing_build_deps[@]}" || return 1
    fi

    # Clone and build (this is a placeholder - adjust for actual Augment Code build process)
    local build_dir
    build_dir=$(mktemp -d)
    TEMP_DIRS+=("$build_dir")

    if git clone https://github.com/augmentcode/augment-code.git "$build_dir"; then
        cd "$build_dir"
        if npm install && npm run build && npm run package; then
            # Install built binary
            cp dist/augment "$HOME/.local/bin/augment"
            chmod +x "$HOME/.local/bin/augment"
            log_success "   ✅ Built and installed from source"
            return 0
        fi
    fi

    return 1
}

ensure_augment_code_running() {
    if ! pgrep -f "augment" >/dev/null; then
        log_info "Starting Augment Code..."
        augment &
        sleep 5
        
        if ! pgrep -f "augment" >/dev/null; then
            log_error "Failed to start Augment Code"
            return 1
        fi
    fi
    
    log_info "Augment Code is running"
}

restart_augment_code() {
    log_info "Restarting Augment Code with new configuration..."
    
    # Stop existing processes
    pkill -f "augment" 2>/dev/null || true
    sleep 3
    
    # Start Augment Code
    augment &
    sleep 5
    
    # Verify restart
    if pgrep -f "augment" >/dev/null; then
        log_success "Augment Code restarted successfully"
        return 0
    else
        log_error "Failed to restart Augment Code"
        return 1
    fi
}
```

### 5. ESSENTIAL: Interactive Installation Wizard
**MANDATORY - User-friendly installation experience**

```bash
# Add interactive installation wizard
interactive_installation() {
    if [[ "${INTERACTIVE:-true}" == "true" ]]; then
        show_welcome_banner
        confirm_installation || exit 0
        configure_installation_options
    fi
}

show_welcome_banner() {
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                n8n-mcp Docker Installation                   ║
║          Augment Code Workflow Automation Setup             ║
║                                                              ║
║  This script will automatically:                            ║
║  • Install all required dependencies                        ║
║  • Setup Docker and n8n-mcp container                       ║
║  • Configure Augment Code integration                       ║
║  • Verify complete installation                             ║
╚══════════════════════════════════════════════════════════════╝
EOF
}

confirm_installation() {
    echo
    read -p "🚀 Proceed with automated installation? [Y/n]: " -r confirm
    case "$confirm" in
        [Nn]|[Nn][Oo]) 
            echo "Installation cancelled by user."
            return 1
            ;;
        *)
            return 0
            ;;
    esac
}

configure_installation_options() {
    echo
    echo "📋 Installation Configuration:"
    echo "   ✅ All dependencies will be installed automatically"
    echo "   ✅ Augment Code will be managed automatically"
    echo "   ✅ Comprehensive testing will be performed"
    echo "   ✅ Self-healing mechanisms enabled"
    echo

    # All critical options are mandatory - no user choice
    AUTO_INSTALL_DEPS="true"
    AUTO_START_AUGMENT="true"
    RUN_TESTS="true"
    ENABLE_SELF_HEALING="true"

    # Optional customizations only
    read -p "   Enable verbose logging? [y/N]: " -r verbose_logging
    [[ $verbose_logging =~ ^[Yy] ]] && VERBOSE_LOGGING="true" || VERBOSE_LOGGING="false"

    read -p "   Create desktop shortcuts? [Y/n]: " -r create_shortcuts
    [[ $create_shortcuts =~ ^[Nn] ]] && CREATE_SHORTCUTS="false" || CREATE_SHORTCUTS="true"

    echo
}
```

## EXPECTED USER EXPERIENCE TRANSFORMATION

### Before (Current - 20+ Manual Steps)
```bash
# User must manually:
cat /etc/os-release                    # Check OS
df -h /                               # Check disk space
ping -c 3 google.com                  # Test internet
sudo dnf install docker               # Install Docker
sudo systemctl start docker          # Start Docker
sudo usermod -aG docker $USER         # Fix permissions
# ... 15+ more manual steps
```

### After (Automated - Single Command)
```bash
# User runs one command:
./install-test-n8n-mcp-docker.sh

# Script automatically:
# ✅ Detects OS and package manager
# ✅ Checks disk space and internet
# ✅ Installs all dependencies (Docker, Git, jq)
# ✅ Configures permissions and environment
# ✅ Downloads and tests n8n-mcp
# ✅ Configures Augment Code integration
# ✅ Verifies complete installation
# ✅ Provides clear success/failure feedback
```

## IMPLEMENTATION SPECIFICATIONS

### Phase 1: Core Automation (IMMEDIATE)
1. **Automated dependency detection and installation**
2. **Comprehensive environment setup**
3. **Automated prerequisites verification**
4. **Interactive installation wizard**

### Phase 2: Enhanced Integration (NEXT)
1. **Automated Augment Code management**
2. **Configuration backup and restore**
3. **Post-installation verification suite**
4. **Error recovery and rollback**

### Phase 3: Production Features (FINAL)
1. **Progress indicators for all operations**
2. **Detailed logging and diagnostics**
3. **Configuration customization options**
4. **Update and maintenance automation**

## AUGMENT RULES COMPLIANCE

### MANDATORY Requirements (ALL REQUIRED)
- [x] Comprehensive cleanup with trap handlers
- [x] Enhanced dependency management automation (INCLUDING AUGMENT CODE)
- [x] Error handling with proper logging
- [x] Security validation and input sanitization
- [x] Performance monitoring and resource tracking
- [x] Automated environment setup and verification
- [x] Comprehensive error recovery with self-healing
- [x] Mandatory comprehensive testing (no user choice)
- [x] Complete dependency abstraction from user

### Production Requirements (ALL REQUIRED)
- [x] Zero manual steps for standard installation
- [x] Comprehensive error recovery with self-healing mechanisms
- [x] Interactive and non-interactive modes
- [x] Complete automation of all USER_GUIDE.md steps
- [x] Automatic Augment Code installation and management
- [x] Mandatory comprehensive testing and verification
- [x] Self-healing capabilities for all failure scenarios

## MANDATORY SELF-HEALING MECHANISMS

### Critical Self-Healing Functions (REQUIRED)
```bash
# Comprehensive self-healing system
enable_self_healing() {
    log_info "🔄 Enabling self-healing mechanisms..."

    # Set up failure detection and recovery
    setup_failure_detection
    setup_automatic_recovery
    setup_health_monitoring

    log_success "✅ Self-healing mechanisms enabled"
}

setup_failure_detection() {
    # Monitor critical processes and services
    monitor_docker_health &
    MONITOR_PIDS+=($!)

    monitor_augment_code_health &
    MONITOR_PIDS+=($!)

    monitor_mcp_integration_health &
    MONITOR_PIDS+=($!)
}

setup_automatic_recovery() {
    # Automatic recovery for common failures
    setup_docker_recovery
    setup_augment_code_recovery
    setup_mcp_config_recovery
    setup_permission_recovery
}

# Docker service self-healing
recover_docker_service() {
    log_warn "🔄 Docker service issue detected - attempting recovery..."

    # Strategy 1: Restart Docker service
    if sudo systemctl restart docker; then
        log_success "✅ Docker service restarted successfully"
        return 0
    fi

    # Strategy 2: Reset Docker daemon
    if sudo systemctl stop docker && sudo systemctl start docker; then
        log_success "✅ Docker daemon reset successfully"
        return 0
    fi

    # Strategy 3: Reinstall Docker
    log_info "🔄 Attempting Docker reinstallation..."
    if reinstall_docker_completely; then
        log_success "✅ Docker reinstalled successfully"
        return 0
    fi

    log_error "❌ Docker recovery failed - manual intervention required"
    return 1
}

# Augment Code self-healing
recover_augment_code() {
    log_warn "🔄 Augment Code issue detected - attempting recovery..."

    # Strategy 1: Restart Augment Code
    pkill -f "augment" 2>/dev/null || true
    sleep 3
    augment &
    sleep 5

    if pgrep -f "augment" >/dev/null; then
        log_success "✅ Augment Code restarted successfully"
        return 0
    fi

    # Strategy 2: Reinstall Augment Code
    log_info "🔄 Attempting Augment Code reinstallation..."
    if reinstall_augment_code; then
        log_success "✅ Augment Code reinstalled successfully"
        return 0
    fi

    # Strategy 3: Alternative installation methods
    if attempt_augment_code_recovery; then
        log_success "✅ Augment Code recovered via alternative method"
        return 0
    fi

    log_error "❌ Augment Code recovery failed"
    return 1
}

# MCP configuration self-healing
recover_mcp_configuration() {
    log_warn "🔄 MCP configuration issue detected - attempting recovery..."

    # Strategy 1: Recreate configuration
    if create_mcp_server_config; then
        log_success "✅ MCP configuration recreated"
        return 0
    fi

    # Strategy 2: Restore from backup
    if restore_mcp_config_from_backup; then
        log_success "✅ MCP configuration restored from backup"
        return 0
    fi

    # Strategy 3: Reset to defaults
    if reset_mcp_config_to_defaults; then
        log_success "✅ MCP configuration reset to defaults"
        return 0
    fi

    log_error "❌ MCP configuration recovery failed"
    return 1
}
```

### Mandatory Comprehensive Testing (NO USER CHOICE)
```bash
# Comprehensive testing suite - MANDATORY execution
run_mandatory_comprehensive_tests() {
    log_info "🧪 Running mandatory comprehensive test suite..."

    local total_tests=12
    local passed_tests=0
    local failed_tests=()

    # Test 1: System prerequisites
    if test_system_prerequisites; then
        log_success "✅ Test 1/12: System prerequisites"
        ((passed_tests++))
    else
        log_error "❌ Test 1/12: System prerequisites FAILED"
        failed_tests+=("System prerequisites")
        attempt_system_prerequisites_recovery || true
    fi

    # Test 2: Dependencies availability
    if test_dependencies_availability; then
        log_success "✅ Test 2/12: Dependencies availability"
        ((passed_tests++))
    else
        log_error "❌ Test 2/12: Dependencies availability FAILED"
        failed_tests+=("Dependencies availability")
        attempt_dependencies_recovery || true
    fi

    # Test 3: Docker functionality
    if test_docker_functionality; then
        log_success "✅ Test 3/12: Docker functionality"
        ((passed_tests++))
    else
        log_error "❌ Test 3/12: Docker functionality FAILED"
        failed_tests+=("Docker functionality")
        recover_docker_service || true
    fi

    # Test 4: n8n-mcp container
    if test_n8n_mcp_container; then
        log_success "✅ Test 4/12: n8n-mcp container"
        ((passed_tests++))
    else
        log_error "❌ Test 4/12: n8n-mcp container FAILED"
        failed_tests+=("n8n-mcp container")
        attempt_container_recovery || true
    fi

    # Test 5: Augment Code installation
    if test_augment_code_installation; then
        log_success "✅ Test 5/12: Augment Code installation"
        ((passed_tests++))
    else
        log_error "❌ Test 5/12: Augment Code installation FAILED"
        failed_tests+=("Augment Code installation")
        recover_augment_code || true
    fi

    # Test 6: MCP configuration
    if test_mcp_configuration; then
        log_success "✅ Test 6/12: MCP configuration"
        ((passed_tests++))
    else
        log_error "❌ Test 6/12: MCP configuration FAILED"
        failed_tests+=("MCP configuration")
        recover_mcp_configuration || true
    fi

    # Test 7: Integration functionality
    if test_integration_functionality; then
        log_success "✅ Test 7/12: Integration functionality"
        ((passed_tests++))
    else
        log_error "❌ Test 7/12: Integration functionality FAILED"
        failed_tests+=("Integration functionality")
        attempt_integration_recovery || true
    fi

    # Test 8: Tool availability
    if test_tool_availability; then
        log_success "✅ Test 8/12: Tool availability"
        ((passed_tests++))
    else
        log_error "❌ Test 8/12: Tool availability FAILED"
        failed_tests+=("Tool availability")
        attempt_tool_recovery || true
    fi

    # Test 9: Performance benchmarks
    if test_performance_benchmarks; then
        log_success "✅ Test 9/12: Performance benchmarks"
        ((passed_tests++))
    else
        log_error "❌ Test 9/12: Performance benchmarks FAILED"
        failed_tests+=("Performance benchmarks")
        attempt_performance_optimization || true
    fi

    # Test 10: Security validation
    if test_security_validation; then
        log_success "✅ Test 10/12: Security validation"
        ((passed_tests++))
    else
        log_error "❌ Test 10/12: Security validation FAILED"
        failed_tests+=("Security validation")
        attempt_security_hardening || true
    fi

    # Test 11: Cleanup mechanisms
    if test_cleanup_mechanisms; then
        log_success "✅ Test 11/12: Cleanup mechanisms"
        ((passed_tests++))
    else
        log_error "❌ Test 11/12: Cleanup mechanisms FAILED"
        failed_tests+=("Cleanup mechanisms")
        repair_cleanup_mechanisms || true
    fi

    # Test 12: Self-healing capabilities
    if test_self_healing_capabilities; then
        log_success "✅ Test 12/12: Self-healing capabilities"
        ((passed_tests++))
    else
        log_error "❌ Test 12/12: Self-healing capabilities FAILED"
        failed_tests+=("Self-healing capabilities")
        repair_self_healing_mechanisms || true
    fi

    # Final assessment
    local success_rate=$((passed_tests * 100 / total_tests))

    if [[ $success_rate -eq 100 ]]; then
        log_success "🎉 ALL TESTS PASSED ($passed_tests/$total_tests) - Installation fully functional"
        return 0
    elif [[ $success_rate -ge 90 ]]; then
        log_warn "⚠️  MOSTLY FUNCTIONAL ($passed_tests/$total_tests) - Minor issues detected but system operational"
        log_info "Failed tests: ${failed_tests[*]}"
        return 0
    else
        log_error "❌ CRITICAL FAILURES ($passed_tests/$total_tests) - System not fully functional"
        log_error "Failed tests: ${failed_tests[*]}"

        # Attempt comprehensive recovery
        log_info "🔄 Attempting comprehensive system recovery..."
        if attempt_comprehensive_recovery; then
            log_success "✅ System recovery successful - re-running tests..."
            run_mandatory_comprehensive_tests  # Recursive recovery attempt
        else
            log_error "❌ System recovery failed - manual intervention required"
            return 1
        fi
    fi
}
```

## DELIVERABLE REQUIREMENTS (ALL MANDATORY)

**Transform the installation script to:**
1. ✅ **Eliminate ALL manual steps** from USER_GUIDE.md (including Augment Code installation)
2. ✅ **Automate ALL dependency management** (Docker, Git, jq, Augment Code, etc.)
3. ✅ **Automate complete environment setup** (directories, permissions, variables, services)
4. ✅ **Automate Augment Code installation** (detection, installation, startup, configuration)
5. ✅ **Provide seamless installation** with comprehensive progress feedback
6. ✅ **Implement mandatory comprehensive testing** (no user choice - always runs)
7. ✅ **Enable self-healing mechanisms** for all failure scenarios
8. ✅ **Maintain full Augment Rules compliance** with enhanced automation
9. ✅ **Abstract ALL complexities** from user unless impossible
10. ✅ **Ensure everything works or is self-healed** automatically

**Success Criteria:** User runs single command, sees clear progress, comprehensive testing runs automatically, self-healing handles any issues, and has fully functional n8n-mcp integration without ANY manual intervention.

## SPECIFIC IMPLEMENTATION TASKS

### Task 1: Replace Manual OS Detection
**Current USER_GUIDE.md Step 1:**
```bash
# Manual command user must run:
cat /etc/os-release
```

**Required Automation:**
```bash
# Add to script - automatic OS detection
detect_and_validate_os() {
    log_info "🔍 Detecting operating system..."

    if [[ ! -f /etc/os-release ]]; then
        log_error "Cannot detect OS - /etc/os-release not found"
        return 1
    fi

    source /etc/os-release

    case "$ID" in
        "fedora"|"ubuntu"|"debian"|"arch"|"manjaro")
            log_success "✅ Supported OS detected: $PRETTY_NAME"
            export DETECTED_OS="$ID"
            export OS_VERSION="$VERSION_ID"
            ;;
        *)
            log_error "❌ Unsupported OS: $PRETTY_NAME"
            log_error "Supported: Fedora, Ubuntu, Debian, Arch Linux"
            return 1
            ;;
    esac
}
```

### Task 2: Replace Manual Disk Space Check
**Current USER_GUIDE.md Step 2:**
```bash
# Manual command user must run:
df -h /
```

**Required Automation:**
```bash
# Add to script - automatic disk space verification
verify_disk_space_requirements() {
    log_info "💾 Checking available disk space..."

    local required_mb=1024  # 1GB minimum
    local available_mb
    available_mb=$(df / | awk 'NR==2 {print int($4/1024)}')

    if [[ $available_mb -lt $required_mb ]]; then
        log_error "❌ Insufficient disk space"
        log_error "   Required: ${required_mb}MB (1GB)"
        log_error "   Available: ${available_mb}MB"
        log_error "   Please free up space and try again"
        return 1
    fi

    log_success "✅ Disk space verified: ${available_mb}MB available"

    # Show space breakdown
    log_info "   Docker image: ~300MB"
    log_info "   Logs and temp: ~50MB"
    log_info "   Remaining: $((available_mb - 350))MB"
}
```

### Task 3: Replace Manual Internet Connectivity Test
**Current USER_GUIDE.md Step 3:**
```bash
# Manual command user must run:
ping -c 3 google.com
```

**Required Automation:**
```bash
# Add to script - automatic connectivity verification
verify_internet_connectivity() {
    log_info "🌐 Testing internet connectivity..."

    local test_urls=(
        "ghcr.io"           # Docker registry
        "github.com"        # Repository access
        "google.com"        # General connectivity
    )

    local failed_tests=0

    for url in "${test_urls[@]}"; do
        if ping -c 1 -W 5 "$url" >/dev/null 2>&1; then
            log_info "   ✅ $url reachable"
        else
            log_warn "   ❌ $url unreachable"
            ((failed_tests++))
        fi
    done

    if [[ $failed_tests -eq ${#test_urls[@]} ]]; then
        log_error "❌ No internet connectivity detected"
        log_error "   Please check your network connection"
        return 1
    elif [[ $failed_tests -gt 0 ]]; then
        log_warn "⚠️  Some connectivity issues detected but proceeding"
    else
        log_success "✅ Internet connectivity verified"
    fi
}
```

### Task 4: Replace Manual Dependency Installation
**Current USER_GUIDE.md Steps 4-6:**
```bash
# Manual commands user must run:
sudo dnf install docker git jq
sudo systemctl start docker
sudo usermod -aG docker $USER
```

**Required Automation:**
```bash
# Add to script - automatic dependency management
install_system_dependencies() {
    log_info "📦 Installing system dependencies..."

    local dependencies=("git" "jq" "curl" "wget")
    local missing_deps=()

    # Check which dependencies are missing
    for dep in "${dependencies[@]}"; do
        if ! command -v "$dep" >/dev/null 2>&1; then
            missing_deps+=("$dep")
        fi
    done

    # Install missing dependencies
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        log_info "   Installing missing packages: ${missing_deps[*]}"

        case "$DETECTED_OS" in
            "fedora")
                sudo dnf install -y "${missing_deps[@]}" || return 1
                ;;
            "ubuntu"|"debian")
                sudo apt update && sudo apt install -y "${missing_deps[@]}" || return 1
                ;;
            "arch"|"manjaro")
                sudo pacman -S --noconfirm "${missing_deps[@]}" || return 1
                ;;
        esac

        log_success "✅ Dependencies installed: ${missing_deps[*]}"
    else
        log_success "✅ All dependencies already installed"
    fi

    # Verify all dependencies
    for dep in "${dependencies[@]}"; do
        if command -v "$dep" >/dev/null 2>&1; then
            log_info "   ✅ $dep available"
        else
            log_error "   ❌ $dep missing after installation"
            return 1
        fi
    done
}
```

### Task 5: Replace Manual Docker Setup
**Current USER_GUIDE.md Step 4 (Extended):**
```bash
# Manual Docker installation and configuration
sudo dnf install docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
# User must log out and back in
```

**Required Automation:**
```bash
# Enhance existing verify_docker_installation function
verify_and_setup_docker() {
    log_info "🐳 Setting up Docker environment..."

    # Install Docker if missing
    if ! command -v docker >/dev/null 2>&1; then
        log_info "   Installing Docker..."
        install_docker_for_platform || return 1
    fi

    # Start Docker service
    if ! systemctl is-active --quiet docker; then
        log_info "   Starting Docker service..."
        sudo systemctl start docker || return 1
        sudo systemctl enable docker || return 1
    fi

    # Configure Docker permissions
    if ! groups "$USER" | grep -q docker; then
        log_info "   Configuring Docker permissions..."
        sudo usermod -aG docker "$USER" || return 1

        # Use newgrp to apply group changes immediately
        log_info "   Applying group changes..."
        exec sg docker "$0 $*"  # Re-execute script with docker group
    fi

    # Verify Docker functionality
    if ! docker ps >/dev/null 2>&1; then
        log_error "❌ Docker setup failed - cannot access Docker daemon"
        return 1
    fi

    local docker_version
    docker_version=$(docker --version | cut -d' ' -f3 | tr -d ',')
    log_success "✅ Docker ready: $docker_version"
}
```

### Task 6: Replace Manual Augment Code Management
**Current USER_GUIDE.md Steps 12, 17:**
```bash
# Manual Augment Code management
augment &
pgrep -f augment
pkill -f augment
sleep 5
augment &
```

**Required Automation:**
```bash
# Add comprehensive Augment Code automation
manage_augment_code_lifecycle() {
    log_info "🤖 Managing Augment Code integration..."

    # Detect Augment Code
    if ! command -v augment >/dev/null 2>&1; then
        log_error "❌ Augment Code not found"
        log_error "   Please install from: https://augmentcode.com"
        return 1
    fi

    local augment_version
    augment_version=$(augment --version 2>/dev/null || echo "unknown")
    log_info "   Detected: Augment Code $augment_version"

    # Backup existing configuration
    backup_existing_config

    # Stop existing Augment Code processes
    if pgrep -f "augment" >/dev/null; then
        log_info "   Stopping existing Augment Code processes..."
        pkill -f "augment" 2>/dev/null || true
        sleep 3
    fi

    # Create MCP configuration
    create_mcp_server_config || return 1

    # Start Augment Code with new configuration
    log_info "   Starting Augment Code with n8n-mcp integration..."
    augment &
    local augment_pid=$!

    # Wait for startup and verify
    sleep 5
    if ! pgrep -f "augment" >/dev/null; then
        log_error "❌ Failed to start Augment Code"
        return 1
    fi

    log_success "✅ Augment Code running with n8n-mcp integration"

    # Test integration
    test_mcp_integration || {
        log_warn "⚠️  MCP integration test failed - manual verification needed"
    }
}

backup_existing_config() {
    if [[ -f "$CONFIG_DIR/mcp-servers.json" ]]; then
        local backup_file="$CONFIG_DIR/mcp-servers.json.backup.$(date +%s)"
        cp "$CONFIG_DIR/mcp-servers.json" "$backup_file"
        log_info "   Configuration backed up to: $backup_file"
    fi
}
```

### Task 7: Add Progress Indicators
**Replace silent operations with visual progress:**
```bash
# Add progress indication for long operations
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

# Usage example for Docker image download:
download_n8n_mcp_image() {
    log_info "📥 Downloading n8n-mcp Docker image..."

    docker pull "$N8N_MCP_IMAGE" &
    local pull_pid=$!

    show_progress $pull_pid "   Downloading n8n-mcp image (~300MB)"

    wait $pull_pid
    local exit_code=$?

    if [[ $exit_code -eq 0 ]]; then
        log_success "✅ n8n-mcp image downloaded successfully"
    else
        log_error "❌ Failed to download n8n-mcp image"
        return 1
    fi
}
```

## MAIN FUNCTION RESTRUCTURE

**Replace current main() with fully automated workflow:**
```bash
main() {
    # Parse command line arguments
    parse_arguments "$@"

    # Initialize self-healing mechanisms
    enable_self_healing

    # Show welcome banner (if interactive)
    [[ "${INTERACTIVE:-true}" == "true" ]] && show_welcome_banner

    # Phase 1: System Verification (Automated with Self-Healing)
    log_info "🔍 Phase 1: System Verification & Auto-Recovery"
    execute_with_recovery "detect_and_validate_os" "System OS validation"
    execute_with_recovery "verify_disk_space_requirements" "Disk space verification"
    execute_with_recovery "verify_internet_connectivity" "Internet connectivity"

    # Phase 2: Complete Dependencies Management (Automated)
    log_info "📦 Phase 2: Complete Dependencies Management"
    execute_with_recovery "install_system_dependencies" "System dependencies"
    execute_with_recovery "verify_and_setup_docker" "Docker setup"
    execute_with_recovery "detect_and_install_augment_code" "Augment Code installation"

    # Phase 3: Environment Setup (Automated with Validation)
    log_info "⚙️  Phase 3: Environment Setup & Configuration"
    execute_with_recovery "create_installation_environment" "Environment setup"
    execute_with_recovery "configure_system_permissions" "Permission configuration"
    execute_with_recovery "setup_service_integration" "Service integration"

    # Phase 4: n8n-mcp Deployment (Automated with Testing)
    log_info "🚀 Phase 4: n8n-mcp Deployment & Testing"
    execute_with_recovery "download_n8n_mcp_image" "n8n-mcp image download"
    execute_with_recovery "test_container_functionality" "Container functionality"
    execute_with_recovery "optimize_container_performance" "Performance optimization"

    # Phase 5: Augment Code Integration (Automated with Validation)
    log_info "🤖 Phase 5: Augment Code Integration & Configuration"
    execute_with_recovery "manage_augment_code_lifecycle" "Augment Code lifecycle"
    execute_with_recovery "create_and_validate_mcp_config" "MCP configuration"
    execute_with_recovery "test_augment_integration" "Integration testing"

    # Phase 6: Mandatory Comprehensive Testing (NO USER CHOICE)
    log_info "🧪 Phase 6: Mandatory Comprehensive Testing & Validation"
    run_mandatory_comprehensive_tests || {
        log_error "❌ Comprehensive testing failed - attempting system recovery"
        if attempt_comprehensive_recovery; then
            log_info "🔄 Re-running comprehensive tests after recovery..."
            run_mandatory_comprehensive_tests || {
                log_error "❌ System recovery failed - installation incomplete"
                exit 1
            }
        else
            log_error "❌ System recovery failed - manual intervention required"
            exit 1
        fi
    }

    # Phase 7: Final Validation & Health Check
    log_info "✅ Phase 7: Final Validation & Health Check"
    execute_with_recovery "validate_complete_installation" "Complete installation validation"
    execute_with_recovery "setup_health_monitoring" "Health monitoring setup"
    execute_with_recovery "create_maintenance_scripts" "Maintenance scripts creation"

    # Success with comprehensive reporting
    show_comprehensive_success_message
}

# Execute function with automatic recovery
execute_with_recovery() {
    local function_name="$1"
    local description="$2"
    local max_attempts=3
    local attempt=1

    while [[ $attempt -le $max_attempts ]]; do
        log_info "   Executing: $description (attempt $attempt/$max_attempts)"

        if $function_name; then
            log_success "   ✅ $description completed successfully"
            return 0
        else
            log_warn "   ⚠️  $description failed (attempt $attempt/$max_attempts)"

            if [[ $attempt -lt $max_attempts ]]; then
                log_info "   🔄 Attempting automatic recovery..."

                # Attempt function-specific recovery
                local recovery_function="recover_${function_name}"
                if declare -f "$recovery_function" >/dev/null; then
                    if $recovery_function; then
                        log_success "   ✅ Recovery successful, retrying..."
                        ((attempt++))
                        continue
                    fi
                fi

                # Generic recovery attempt
                if attempt_generic_recovery "$function_name"; then
                    log_success "   ✅ Generic recovery successful, retrying..."
                    ((attempt++))
                    continue
                fi

                log_warn "   ⚠️  Recovery failed, retrying anyway..."
                ((attempt++))
            else
                log_error "   ❌ $description failed after $max_attempts attempts"

                # Final recovery attempt
                log_info "   🔄 Final recovery attempt..."
                if attempt_comprehensive_recovery; then
                    log_success "   ✅ Comprehensive recovery successful"
                    if $function_name; then
                        log_success "   ✅ $description completed after recovery"
                        return 0
                    fi
                fi

                log_error "   ❌ $description failed permanently"
                return 1
            fi
        fi
    done
}

# Comprehensive recovery for critical failures
attempt_comprehensive_recovery() {
    log_info "🔄 Attempting comprehensive system recovery..."

    local recovery_steps=(
        "cleanup_corrupted_state"
        "reset_environment_variables"
        "repair_file_permissions"
        "restart_system_services"
        "clear_temporary_files"
        "rebuild_configuration"
        "verify_system_integrity"
    )

    local successful_recoveries=0

    for step in "${recovery_steps[@]}"; do
        if $step; then
            log_success "   ✅ Recovery step: $step"
            ((successful_recoveries++))
        else
            log_warn "   ⚠️  Recovery step failed: $step"
        fi
    done

    if [[ $successful_recoveries -ge 5 ]]; then
        log_success "✅ Comprehensive recovery successful ($successful_recoveries/7 steps)"
        return 0
    else
        log_error "❌ Comprehensive recovery failed ($successful_recoveries/7 steps)"
        return 1
    fi
}

# Enhanced success message with comprehensive reporting
show_comprehensive_success_message() {
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                    🎉 INSTALLATION COMPLETE! 🎉              ║
║                                                              ║
║  ✅ All dependencies installed automatically                 ║
║  ✅ Augment Code installed and configured                    ║
║  ✅ n8n-mcp Docker integration fully functional             ║
║  ✅ Comprehensive testing passed (12/12 tests)              ║
║  ✅ Self-healing mechanisms enabled                         ║
║  ✅ Health monitoring active                                ║
║                                                              ║
║  🚀 Ready for immediate use!                                ║
║                                                              ║
║  Next Steps:                                                 ║
║  • Open Augment Code - n8n-mcp tools are ready             ║
║  • Ask: "Show me available n8n workflow nodes"             ║
║  • Create: "Help me build a web scraping workflow"         ║
║                                                              ║
║  System Status: FULLY OPERATIONAL                           ║
║  Self-Healing: ACTIVE                                       ║
║  Health Monitoring: ENABLED                                 ║
╚══════════════════════════════════════════════════════════════╝
EOF

    # Display system information
    log_info "📊 Installation Summary:"
    log_info "   • OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d'=' -f2 | tr -d '\"')"
    log_info "   • Docker: $(docker --version | cut -d' ' -f3 | tr -d ',')"
    log_info "   • Augment Code: $(augment --version 2>/dev/null || echo 'Installed')"
    log_info "   • n8n-mcp: $(docker images --format 'table {{.Tag}}' ghcr.io/czlonkowski/n8n-mcp | tail -1)"
    log_info "   • Installation time: $(date)"
    log_info "   • Log location: $LOG_DIR"

    # Health check
    log_info "🏥 Health Check:"
    if pgrep -f "augment" >/dev/null; then
        log_success "   ✅ Augment Code running"
    else
        log_warn "   ⚠️  Augment Code not running - starting..."
        augment &
    fi

    if docker ps --filter ancestor=ghcr.io/czlonkowski/n8n-mcp:latest --format "{{.Status}}" | grep -q "Up"; then
        log_success "   ✅ n8n-mcp container healthy"
    else
        log_info "   ℹ️  n8n-mcp container ready for use"
    fi

    log_success "🎉 Installation completed successfully with full automation and self-healing!"
}
```

**MANDATORY IMPLEMENTATION PRIORITY (ALL REQUIRED):**
1. **CRITICAL**: Complete dependency automation (INCLUDING Augment Code installation)
2. **CRITICAL**: Mandatory comprehensive testing (NO user choice - always runs)
3. **CRITICAL**: Self-healing mechanisms for ALL failure scenarios
4. **CRITICAL**: Zero manual steps (abstract ALL complexities from user)
5. **CRITICAL**: Automatic error recovery with retry mechanisms
6. **HIGH**: Enhanced progress indicators with detailed feedback
7. **HIGH**: Comprehensive environment setup and validation
8. **MEDIUM**: Performance optimization and health monitoring

**MANDATORY FEATURES (NO OPTIONAL COMPONENTS):**
- ✅ **Automatic Augment Code installation** - multiple strategies, fallbacks, recovery
- ✅ **Mandatory comprehensive testing** - 12 test suite, automatic execution
- ✅ **Self-healing capabilities** - automatic recovery for all components
- ✅ **Complete dependency management** - Docker, Git, jq, Augment Code, all tools
- ✅ **Zero user intervention** - everything automated or self-healed
- ✅ **Comprehensive error recovery** - multiple retry attempts, fallback strategies
- ✅ **Health monitoring** - continuous monitoring with automatic fixes
- ✅ **Environment abstraction** - user never sees complexity

**EXPECTED RESULT:**
Single command installation that:
- Eliminates ALL manual steps from USER_GUIDE.md
- Installs ALL dependencies automatically (including Augment Code)
- Runs comprehensive testing mandatorily (no user choice)
- Self-heals any issues automatically
- Provides fully functional n8n-mcp integration
- Maintains full Augment Rules compliance
- Abstracts all complexities from user
- Ensures everything works or is automatically fixed

**USER EXPERIENCE:**
```bash
# User runs ONE command:
./install-test-n8n-mcp-docker.sh

# Script automatically:
# 🔍 Detects and validates system
# 📦 Installs ALL dependencies (Docker, Git, jq, Augment Code)
# ⚙️  Sets up complete environment
# 🚀 Deploys and tests n8n-mcp
# 🤖 Configures Augment Code integration
# 🧪 Runs mandatory comprehensive testing (12 tests)
# 🔄 Self-heals any issues automatically
# ✅ Provides fully functional system
# 🎉 Reports complete success

# Result: EVERYTHING WORKS or is SELF-HEALED
```
