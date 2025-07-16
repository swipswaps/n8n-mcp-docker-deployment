---
type: "manual"
---

# Install and Test n8n-mcp Docker Deployment

Following Augment Rules for official documentation and verified source requirements, create a comprehensive script to install and test n8n-mcp using Docker deployment option #2.

## Critical Augment Rules Compliance Requirements

**MANDATORY**: This script must comply with ALL Augment Settings - Rules and User Guidelines:

### Required Elements (Non-Negotiable)
- **Cleanup Functions**: Comprehensive cleanup with trap handlers for EXIT, INT, TERM
- **Testing Protocol**: Script must be linted and tested before release (`bash -n`, `shellcheck`)
- **Error Handling**: Proper error handling with `set -euo pipefail` and logging
- **Documentation**: Comprehensive comments and usage instructions
- **Security**: Input validation and authentication checks
- **Memory Persistence**: Use `remember()` function to save significant achievements

### Coding Standards
- **Bash**: `#!/bin/bash`, `set -euo pipefail`, functions for reusable code
- **Variables**: Use `readonly` for constants, `local` for function variables
- **Logging**: Implement proper logging with timestamps and levels

## Requirements
Based on the official GitHub repository (https://github.com/czlonkowski/n8n-mcp), implement the following verified deployment steps:

### 1. Docker Installation Verification
- Check if Docker is installed and running
- If not installed, provide platform-specific installation instructions from official Docker documentation
- Verify Docker daemon is accessible
- **MANDATORY**: Implement proper error handling for Docker installation failures

### 2. n8n-mcp Docker Image Deployment
- Pull the official image: `ghcr.io/czlonkowski/n8n-mcp:latest`
- Verify image integrity and size (~280MB as documented)
- Test basic container functionality
- **MANDATORY**: Track Docker containers and images for cleanup

### 3. Augment Code MCP Configuration
- **CRITICAL**: Augment Code uses different MCP configuration than Claude Desktop
- Research and implement proper Augment Code MCP server integration
- **NOTE**: The provided JSON configurations are for Claude Desktop - these need adaptation for Augment Code
- Handle platform-specific config file locations for Augment Code
- **MANDATORY**: Verify Augment Code MCP client compatibility
### 4. Configuration Options Research and Implementation
**CRITICAL REQUIREMENT**: Research actual Augment Code MCP configuration format

The following configurations are from Claude Desktop documentation and may NOT work with Augment Code:

#### Claude Desktop Basic Configuration (REFERENCE ONLY):
```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e", "MCP_MODE=stdio",
        "-e", "LOG_LEVEL=error",
        "-e", "DISABLE_CONSOLE_OUTPUT=true",
        "ghcr.io/czlonkowski/n8n-mcp:latest"
      ]
    }
  }
}
```

#### Claude Desktop Full Configuration (REFERENCE ONLY):
```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e", "MCP_MODE=stdio",
        "-e", "LOG_LEVEL=error",
        "-e", "DISABLE_CONSOLE_OUTPUT=true",
        "-e", "N8N_API_URL=https://your-n8n-instance.com",
        "-e", "N8N_API_KEY=your-api-key",
        "ghcr.io/czlonkowski/n8n-mcp:latest"
      ]
    }
  }
}
```

**MANDATORY TASK**: Research and implement proper Augment Code MCP configuration format

### 5. Testing Requirements (MANDATORY AUGMENT COMPLIANCE)
- **MANDATORY**: Test container startup and MCP protocol communication
- Verify available tools match documentation (25+ documentation tools, optional management tools)
- Test core functionality like `tools_documentation()` and `get_node_essentials()`
- Validate that the `-i` flag requirement is properly implemented
- Test cleanup with `--rm` flag
- **CRITICAL**: Verify integration with Augment Code's MCP client (not Claude Desktop)
- **MANDATORY**: Implement comprehensive test suite with `bash -n` and `shellcheck`
- **REQUIRED**: Test all error conditions and cleanup scenarios

### 6. Troubleshooting & Validation (AUGMENT RULES COMPLIANCE)
- **MANDATORY**: Implement error handling for common Docker issues with proper logging
- Verify the ultra-optimized image size claim (~280MB)
- Test that the image contains no n8n dependencies (as documented: "82% smaller than typical n8n images")
- **CRITICAL**: Validate MCP stdio communication works properly with Augment Code (not Claude Desktop)
- **MANDATORY**: Test Augment Code's ability to discover and use the MCP tools
- **REQUIRED**: Implement comprehensive error logging and debugging capabilities
### 7. Documentation Compliance (AUGMENT RULES MANDATORY)
- **MANDATORY**: Include all safety warnings from official documentation
- **REQUIRED**: Reference the official repository and documentation with verified sources
- **MANDATORY**: Provide exact commands and configurations as specified
- Include the tip about using `http://host.docker.internal:5678` for local n8n instances
- **CRITICAL**: Ensure compatibility with Augment Code's MCP implementation (not Claude Desktop)
- **REQUIRED**: Comprehensive inline documentation and comments throughout script

### 8. Script Requirements (AUGMENT RULES COMPLIANCE)
- **MANDATORY**: Create a comprehensive bash script with `#!/bin/bash` and `set -euo pipefail`
- **REQUIRED**: Handle all platforms (Linux, macOS, Windows/WSL)
- **MANDATORY**: Include proper error handling and validation with logging
- **REQUIRED**: Provide clear success/failure indicators with colored output
- **CRITICAL**: Include comprehensive cleanup procedures with trap handlers
- **MANDATORY**: Add logging for troubleshooting with timestamps and levels
- **REQUIRED**: Test integration with Augment Code specifically (not Claude Desktop)
- **MANDATORY**: Verify that Augment Code can successfully connect to and use the n8n-mcp server
- **REQUIRED**: Use `readonly` for constants, `local` for function variables
### 9. Augment Code Integration Testing (CRITICAL REQUIREMENT)
- **MANDATORY**: Test that Augment Code can discover the MCP server
- **REQUIRED**: Verify tool availability and functionality through Augment Code
- **MANDATORY**: Test workflow creation capabilities using Augment Code + n8n-mcp
- **REQUIRED**: Validate that all documented MCP tools are accessible via Augment Code
- **CRITICAL**: Verify Augment Code MCP client compatibility (different from Claude Desktop)

### 10. Mandatory Augment Rules Implementation
- **CLEANUP**: Implement comprehensive cleanup functions with trap handlers for EXIT, INT, TERM
- **TESTING**: Script must pass `bash -n script.sh` and `shellcheck script.sh` before release
- **ERROR HANDLING**: Use `set -euo pipefail` and proper error logging throughout
- **SECURITY**: Implement input validation and authentication checks
- **MEMORY PERSISTENCE**: Use `remember()` function to save significant achievements
- **DOCUMENTATION**: Comprehensive comments and usage instructions

### 11. Quality Gates and Compliance Verification
- **MANDATORY**: All temporary files and Docker resources must be tracked and cleaned
- **REQUIRED**: Background processes properly terminated with cleanup
- **MANDATORY**: Test cleanup on normal exit and interruption scenarios
- **REQUIRED**: Static analysis with shellcheck and syntax validation
- **MANDATORY**: Dynamic testing to verify cleanup works under all exit conditions
- **REQUIRED**: Resource monitoring to confirm no leaks during execution

### 12. Missing Critical Augment Rules Requirements

#### Production Environment Testing (MANDATORY)
- **REQUIRED**: Test in actual production-like conditions with visible, verifiable results
- **MANDATORY**: Provide screenshot evidence of functionality where applicable
- **REQUIRED**: Test cross-platform compatibility on actual target distributions
- **MANDATORY**: Validate user-visible functionality, not just hidden processes

#### Script Structure Requirements (MANDATORY)
- **REQUIRED**: Include `usage()` function with comprehensive help text
- **MANDATORY**: Implement version information and script metadata
- **REQUIRED**: Add configuration validation functions
- **MANDATORY**: Include backup and rollback procedures for critical operations
- **REQUIRED**: Implement atomic operations with rollback capability

#### System State Verification (MANDATORY)
- **REQUIRED**: Use real-time system state verification (not assumptions)
- **MANDATORY**: Implement current process state checks using `$$`, `tty`, `pwd`
- **REQUIRED**: Verify environment variables (`XDG_*`, `DISPLAY`, `WAYLAND_*`)
- **MANDATORY**: Use anti-assumption validation patterns

#### Background Process Management (MANDATORY)
- **REQUIRED**: Check for background processes after testing (`jobs` command)
- **MANDATORY**: Implement post-test verification script
- **REQUIRED**: Monitor system resources (CPU, memory, file descriptors)
- **MANDATORY**: Audit and cleanup automation tool processes

#### Additional Script Standards (MANDATORY)
- **REQUIRED**: Implement proper function organization and reusable code
- **MANDATORY**: Add comprehensive logging with timestamps and levels
- **REQUIRED**: Include input validation and sanitization
- **MANDATORY**: Implement secure deletion for sensitive data
- **REQUIRED**: Add automated tests for all functionality

## Final Requirements Summary

The script must be **production-ready**, follow **ALL official documentation requirements**, provide a **complete end-to-end installation and testing solution** for the Docker deployment option, ensure **seamless integration with Augment Code's MCP client capabilities**, and **FULLY COMPLY** with all Augment Settings - Rules and User Guidelines including:

- **Mandatory cleanup, testing, error handling, documentation, and security requirements**
- **Production environment testing with visible, verifiable results**
- **Complete script structure with usage functions, version info, and help text**
- **System state verification and anti-assumption validation**
- **Background process management and resource monitoring**
- **Backup and rollback procedures for critical operations**
- **Comprehensive logging, input validation, and secure operations**

## Mandatory Script Template Structure

The script must follow this exact structure to comply with Augment Rules:

```bash
#!/bin/bash
# Script: install-test-n8n-mcp-docker.sh
# Description: Install and test n8n-mcp Docker deployment with Augment Code integration
# Version: 1.0.0
# Author: Generated via Augment Code
# Date: $(date +%Y-%m-%d)

set -euo pipefail

# Script metadata
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT_VERSION="1.0.0"
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Global variables for cleanup tracking
declare -a TEMP_FILES=()
declare -a TEMP_DIRS=()
declare -a DOCKER_CONTAINERS=()
declare -a DOCKER_IMAGES=()
declare -a BACKGROUND_PIDS=()

# Logging functions
log() {
    local level="$1"
    shift
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*" >&2
}

# Usage function (MANDATORY)
usage() {
    cat << EOF
Usage: $SCRIPT_NAME [OPTIONS]

Install and test n8n-mcp Docker deployment with Augment Code integration

OPTIONS:
    -h, --help          Show this help message
    -v, --version       Show version information
    -c, --config FILE   Use custom configuration file
    -t, --test-only     Run tests only (skip installation)
    --cleanup           Run cleanup only
    --verbose           Enable verbose logging

EXAMPLES:
    $SCRIPT_NAME                    # Full installation and testing
    $SCRIPT_NAME --test-only        # Run tests only
    $SCRIPT_NAME --cleanup          # Cleanup resources

EOF
}

# Version function (MANDATORY)
version() {
    echo "$SCRIPT_NAME version $SCRIPT_VERSION"
}

# Cleanup function (MANDATORY)
cleanup() {
    log "INFO" "Starting cleanup process..."

    # Kill background processes
    for pid in "${BACKGROUND_PIDS[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
            log "INFO" "Terminating background process: $pid"
            kill "$pid" 2>/dev/null || true
        fi
    done

    # Remove temporary files
    for file in "${TEMP_FILES[@]}"; do
        if [[ -f "$file" ]]; then
            log "INFO" "Removing temporary file: $file"
            rm -f "$file"
        fi
    done

    # Remove temporary directories
    for dir in "${TEMP_DIRS[@]}"; do
        if [[ -d "$dir" ]]; then
            log "INFO" "Removing temporary directory: $dir"
            rm -rf "$dir"
        fi
    done

    # Stop and remove Docker containers
    for container in "${DOCKER_CONTAINERS[@]}"; do
        if docker ps -q -f name="$container" | grep -q .; then
            log "INFO" "Stopping Docker container: $container"
            docker stop "$container" >/dev/null 2>&1 || true
            docker rm "$container" >/dev/null 2>&1 || true
        fi
    done

    log "INFO" "Cleanup completed"
}

# Trap handlers (MANDATORY)
trap cleanup EXIT INT TERM QUIT

# Main function structure (MANDATORY)
main() {
    # Parse command line arguments
    # Validate environment
    # Install Docker if needed
    # Deploy n8n-mcp
    # Configure Augment Code integration
    # Run comprehensive tests
    # Generate report
}

# Execute main function
main "$@"
```

This template structure is MANDATORY and must be implemented in the final script.

## Final Missing Critical Requirements

### 13. CI/CD Integration and Automated Testing (MANDATORY)
- **REQUIRED**: Include GitHub Actions workflow template for automated testing
- **MANDATORY**: Implement automated linting pipeline with shellcheck
- **REQUIRED**: Add automated syntax validation (`bash -n`)
- **MANDATORY**: Include security scanning integration
- **REQUIRED**: Multi-platform testing automation (Linux, macOS, Windows/WSL)

#### Required CI/CD Template:
```yaml
name: n8n-mcp Docker Deployment Testing
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install ShellCheck
        run: sudo apt-get install -y shellcheck
      - name: Lint Script
        run: shellcheck install-test-n8n-mcp-docker.sh
      - name: Test Syntax
        run: bash -n install-test-n8n-mcp-docker.sh
      - name: Test Docker Integration
        run: ./install-test-n8n-mcp-docker.sh --test-only
```

### 14. Performance Monitoring and Resource Management (MANDATORY)
- **REQUIRED**: Implement comprehensive system resource monitoring
- **MANDATORY**: Add CPU and memory usage tracking during operations
- **REQUIRED**: Monitor file descriptor usage and prevent leaks
- **MANDATORY**: Track Docker resource consumption
- **REQUIRED**: Implement performance benchmarking and reporting

### 15. Security Validation and Compliance (MANDATORY)
- **REQUIRED**: Implement secure file deletion for sensitive data (`shred -vfz -n 3`)
- **MANDATORY**: Add ownership validation for all file operations
- **REQUIRED**: Implement input sanitization and validation
- **MANDATORY**: Add authentication checks for Docker and Augment Code access
- **REQUIRED**: Validate all external dependencies and sources

### 16. Comprehensive Monitoring and Logging (MANDATORY)
- **REQUIRED**: Implement system monitoring during script execution
- **MANDATORY**: Add kernel message monitoring (`dmesg -w`)
- **REQUIRED**: Monitor desktop environment logs (`~/.xsession-errors`)
- **MANDATORY**: Track hardware events (`udevadm monitor`)
- **REQUIRED**: Implement comprehensive log aggregation and analysis

### 17. Quality Gates and Compliance Thresholds (MANDATORY)
- **REQUIRED**: Implement minimum compliance score of 70% (as per Augment Rules)
- **MANDATORY**: Enforce critical requirements: cleanup and testing
- **REQUIRED**: Validate high-priority requirements: error handling and security
- **REQUIRED**: Check medium-priority requirements: documentation and performance
- **REQUIRED**: Generate compliance reports with scoring

### 18. Tool Installation and Environment Setup (MANDATORY)
- **REQUIRED**: Auto-install required linting tools (shellcheck, etc.)
- **MANDATORY**: Verify and install Docker if not present
- **REQUIRED**: Set up proper development environment
- **REQUIRED**: Configure all necessary dependencies
- **REQUIRED**: Validate tool versions and compatibility

### 19. Final Compliance Verification Checklist (MANDATORY)
Before script completion, verify ALL of the following:
- [ ] Comprehensive cleanup functions with trap handlers implemented
- [ ] Script passes `bash -n` syntax validation
- [ ] Script passes `shellcheck` linting without errors
- [ ] All temporary files and Docker resources tracked for cleanup
- [ ] Background processes properly managed and terminated
- [ ] Error handling with `set -euo pipefail` implemented
- [ ] Comprehensive logging with timestamps implemented
- [ ] Input validation and security checks implemented
- [ ] Memory persistence with `remember()` function used
- [ ] Production environment testing with visible results
- [ ] System state verification and anti-assumption patterns
- [ ] Performance monitoring and resource management
- [ ] Security validation and compliance checks
- [ ] CI/CD integration template provided
- [ ] Quality gates and compliance scoring implemented

**CRITICAL**: The script will be REJECTED if any of these compliance requirements are missing or incomplete.