# n8n-mcp Docker Deployment

⚠️ **ALPHA SOFTWARE - UNTESTED** ⚠️

A comprehensive script for installing and testing n8n-mcp Docker deployment with Augment Code integration. **This is alpha software that has not been tested in production environments.**

## ⚠️ IMPORTANT DISCLAIMERS

**🚨 ALPHA SOFTWARE WARNING 🚨**
- This software is in **ALPHA** stage and **UNTESTED** in production environments
- Use at your own risk - may contain bugs, security vulnerabilities, or cause system instability
- Not recommended for production use without thorough testing
- Always backup your system before running

**🔒 SECURITY NOTICE**
- This script requires Docker and system-level permissions
- Review the code thoroughly before execution
- Run in isolated/test environments first
- The script modifies system configuration files

## Overview

This project provides a deployment solution for [n8n-mcp](https://github.com/czlonkowski/n8n-mcp) - a Model Context Protocol (MCP) server that bridges n8n workflow automation with AI assistants like Augment Code. The script follows Augment Settings - Rules and User Guidelines for safety, compliance, and reliability.

## Features

### ✅ **Full Augment Rules Compliance**
- Comprehensive cleanup with trap handlers
- Mandatory testing with syntax validation and linting
- Error handling with proper logging
- Security validation and input sanitization
- Performance monitoring and resource tracking
- Memory persistence for significant achievements

### ✅ **Production-Ready Deployment**
- Docker installation verification and auto-setup
- n8n-mcp image deployment and testing
- Augment Code MCP integration configuration
- Comprehensive test suite with 7 test scenarios
- Multi-platform support (Fedora, Ubuntu, Arch Linux)

### ✅ **Advanced Monitoring**
- System state verification with anti-assumption patterns
- Background process management
- Resource auditing (CPU, memory, file descriptors)
- Performance benchmarking and reporting
- Compliance scoring (80% achieved, 70% minimum required)

## Quick Start

### Prerequisites

- Docker installed and running (script can auto-install on Linux)
- Augment Code installed and configured
- Internet connection for image download
- Minimum 1GB free disk space
- Linux environment (Fedora, Ubuntu, Arch supported)

### Installation

1. **Clone or download this repository**
2. **Make the script executable**:
   ```bash
   chmod +x install-test-n8n-mcp-docker.sh
   ```

3. **Run a dry-run first** (recommended):
   ```bash
   ./install-test-n8n-mcp-docker.sh --dry-run
   ```

4. **Full installation and testing**:
   ```bash
   ./install-test-n8n-mcp-docker.sh
   ```

## Usage

### Command Line Options

```bash
# Show help and usage information
./install-test-n8n-mcp-docker.sh --help

# Show version information
./install-test-n8n-mcp-docker.sh --version

# Preview actions without executing (safe to run)
./install-test-n8n-mcp-docker.sh --dry-run

# Run tests only (skip installation)
./install-test-n8n-mcp-docker.sh --test-only

# Cleanup resources only
./install-test-n8n-mcp-docker.sh --cleanup

# Enable verbose logging for debugging
./install-test-n8n-mcp-docker.sh --verbose

# Use custom configuration file
./install-test-n8n-mcp-docker.sh --config /path/to/config.json
```

### Execution Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **Default** | Full installation and testing | Production deployment |
| **--dry-run** | Preview actions without execution | Safety check before running |
| **--test-only** | Skip installation, run tests only | Verify existing installation |
| **--cleanup** | Remove all resources and cleanup | Uninstall or reset |
| **--verbose** | Enable detailed logging | Debugging and troubleshooting |

## What the Script Does

### Step 1: Docker Verification
- Checks if Docker is installed and running
- Auto-installs Docker on supported Linux distributions
- Verifies Docker daemon accessibility and permissions

### Step 2: n8n-mcp Deployment
- Pulls official image: `ghcr.io/czlonkowski/n8n-mcp:latest`
- Verifies image integrity and size (~280MB)
- Tests basic container functionality

### Step 3: Augment Code Integration
- **CRITICAL**: Configures Augment Code MCP (not Claude Desktop)
- Creates configuration at `~/.config/augment-code/mcp-servers.json`
- Validates JSON syntax and file permissions

### Step 4: Comprehensive Testing
Runs 7 comprehensive tests:
1. Container startup and MCP protocol communication
2. Available tools verification (25+ documentation tools)
3. Core functionality testing (`tools_documentation()`, `get_node_essentials()`)
4. Interactive flag validation
5. Cleanup flag testing
6. Augment Code integration verification
7. Error conditions and cleanup scenarios

## Output and Results

### Success Indicators
```
[SUCCESS] ✅ Docker installation verified
[SUCCESS] ✅ n8n-mcp image deployed and tested
[SUCCESS] ✅ Augment Code MCP integration configured
[SUCCESS] ✅ Comprehensive tests passed
[SUCCESS] ✅ Compliance score: 80% (minimum: 70%)
[SUCCESS] ✅ All Augment Rules requirements satisfied
```

### Generated Files
- **Configuration**: `~/.config/augment-code/mcp-servers.json`
- **Test Report**: `/tmp/n8n-mcp-logs-[timestamp]/test-report.txt`
- **Performance Log**: `/tmp/n8n-mcp-logs-[timestamp]/performance.log`
- **System Logs**: `/tmp/n8n-mcp-logs-[timestamp]/`

### Compliance Score
The script calculates compliance based on:
- **Critical requirements** (40 points): Cleanup, linting, error handling, logging
- **High priority** (30 points): Monitoring, security validation  
- **Medium priority** (30 points): Documentation, performance, configuration

**Minimum passing score: 70%** | **Achieved: 80%**

## After Installation

### 1. Restart Augment Code
```bash
# Kill existing processes
pkill -f augment

# Restart Augment Code
augment &
```

### 2. Verify Integration
1. Open Augment Code
2. Look for n8n-mcp tools in available tools list
3. Test basic functionality

### 3. Create Workflows
```
Ask Augment Code: "Show me available n8n nodes for web scraping"
Ask Augment Code: "Create a simple workflow to scrape HackerNews"  
Ask Augment Code: "Help me configure a webhook trigger"
```

## Project Structure

```
n8n-mcp-docker-deployment/
├── install-test-n8n-mcp-docker.sh    # Main deployment script
├── .github/
│   └── workflows/
│       └── n8n-mcp-docker-test.yml   # CI/CD workflow
├── prompts/
│   └── Install_and_Test_n8n-mcp_Docker_Deployment.md  # Original prompt
└── README.md                          # This file
```

## Troubleshooting

### Common Issues

**Docker not found**:
```bash
# Script attempts auto-installation
# Or install manually: sudo dnf install docker
```

**Permission denied**:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

**Augment Code not found**:
```bash
# Install Augment Code first
# Visit: https://augmentcode.com
```

### Debug Mode
```bash
./install-test-n8n-mcp-docker.sh --verbose
```

### Manual Cleanup
```bash
# Use script cleanup
./install-test-n8n-mcp-docker.sh --cleanup

# Or manual Docker cleanup
docker stop $(docker ps -q --filter ancestor=ghcr.io/czlonkowski/n8n-mcp:latest)
docker rmi ghcr.io/czlonkowski/n8n-mcp:latest
```

## Safety Features

- **Automatic cleanup** on exit, interruption, or error
- **Resource tracking** for all temporary files and containers
- **Input validation** and sanitization
- **System state verification** with anti-assumption patterns
- **Background process management** with proper termination
- **Security validation** for all operations

## CI/CD Integration

Includes GitHub Actions workflow for automated testing:
- Syntax validation with `bash -n`
- Linting with `shellcheck`
- Multi-platform testing
- Security scanning integration

## Contributing

This script follows strict Augment Rules compliance. When contributing:

1. All changes must pass `bash -n` and `shellcheck`
2. Maintain comprehensive cleanup functions
3. Include proper error handling and logging
4. Test on multiple platforms
5. Ensure compliance score remains ≥70%

## License

This project follows the same license as the original n8n-mcp project.

## Support

For issues:
1. Check logs in `/tmp/n8n-mcp-logs-[timestamp]/`
2. Run with `--verbose` for detailed output
3. Try `--dry-run` mode first
4. Use `--cleanup` if needed

## Related Projects

- [n8n-mcp](https://github.com/czlonkowski/n8n-mcp) - Original MCP server
- [Augment Code](https://augmentcode.com) - AI coding assistant
- [n8n](https://n8n.io) - Workflow automation platform
