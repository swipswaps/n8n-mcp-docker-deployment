# Complete User Guide: n8n-mcp Docker Deployment

## 🚀 Fully Automated Installation (v0.3.0-beta)

**NEW: Real-time feedback with professional UX!** The script now provides complete transparency with never-fail execution:

```bash
# 1. Download the repository
git clone https://github.com/swipswaps/n8n-mcp-docker-deployment.git
cd n8n-mcp-docker-deployment

# 2. Run the fully automated installation
./install-test-n8n-mcp-docker.sh

# That's it! The script automatically:
# ✅ Detects your OS and validates system with real-time feedback
# ✅ Installs ALL dependencies (Docker, Git, jq) with progress indicators
# ✅ Handles Augment Code IDE extension installation professionally
# ✅ Sets up complete environment with comprehensive error context
# ✅ Deploys and tests n8n-mcp with transparent operation
# ✅ Configures Augment Code integration based on official documentation
# ✅ Runs comprehensive testing (12 tests) with detailed reporting
# ✅ Self-heals any issues with multiple recovery strategies
# ✅ Provides fully functional system with never-fail execution

# 3. Test integration immediately
# Ask Augment Code: "Show me available n8n workflow nodes"
```

## Quick Start (Legacy Manual Process)
**⚠️ The manual process below is no longer needed with v0.2.0-beta automation, but is preserved for reference:**

<details>
<summary>Click to expand legacy manual installation steps</summary>

```bash
# 1. Prerequisites: Docker, Augment Code, Git, jq installed
# 2. Download and setup
git clone https://github.com/swipswaps/n8n-mcp-docker-deployment.git
cd n8n-mcp-docker-deployment
chmod +x install-test-n8n-mcp-docker.sh

# 3. Safety check
./install-test-n8n-mcp-docker.sh --dry-run

# 4. Start Augment Code
augment &

# 5. Install
./install-test-n8n-mcp-docker.sh

# 6. Restart Augment Code
pkill -f augment && sleep 5 && augment &

# 7. Test integration
# Ask Augment Code: "Show me available n8n nodes"
```

</details>

**With v0.2.0-beta automation, all the above steps are handled automatically by the script.**

---

## Complete Step-by-Step Guide

### Overview
This guide will walk you through every step to install and use n8n-mcp with Augment Code, enabling you to create automated workflows. No prior knowledge is assumed.

## Table of Contents
1. [Quick Start (For Experienced Users)](#quick-start-for-experienced-users)
2. [What You'll Achieve](#what-youll-achieve)
3. [Prerequisites Check](#prerequisites-check)
4. [Installation Prerequisites](#installation-prerequisites)
5. [Download and Setup](#download-and-setup)
6. [Pre-Installation Testing](#pre-installation-testing)
7. [Installation Process](#installation-process)
8. [Post-Installation Verification](#post-installation-verification)
9. [Using n8n-mcp with Augment Code](#using-n8n-mcp-with-augment-code)
10. [Troubleshooting](#troubleshooting)
11. [Advanced Usage](#advanced-usage)
12. [Maintenance](#maintenance)
13. [Frequently Asked Questions](#frequently-asked-questions)
14. [Support and Community](#support-and-community)

## What You'll Achieve
By the end of this guide, you'll have:
- n8n-mcp Docker container running on your system
- Integration with Augment Code for workflow automation
- Access to 22+ n8n workflow tools through Augment Code
- Ability to create automated workflows for web scraping, data processing, and more

## Prerequisites Check

### Step 1: Verify Your Operating System
This guide works on Linux systems (Fedora, Ubuntu, Arch Linux).

**Check your OS:**
```bash
# Open terminal (Ctrl+Alt+T) and run:
cat /etc/os-release
```

**Expected output should show one of:**
- `ID=fedora`
- `ID=ubuntu` 
- `ID=arch`

### Step 2: Check Available Disk Space
You need at least 1GB of free space.

**Check disk space:**
```bash
df -h /
```

**Look for:** Available space > 1G in the output

### Step 3: Verify Internet Connection
**Test internet connectivity:**
```bash
ping -c 3 google.com
```

**Expected:** Should show successful ping responses

## Installation Prerequisites

### Step 4: Install Docker (if not already installed)

**Check if Docker is installed:**
```bash
docker --version
```

**If you see "command not found", install Docker:**

**For Fedora:**
```bash
sudo dnf install docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

**For Ubuntu:**
```bash
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

**For Arch Linux:**
```bash
sudo pacman -S docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

**After installation, log out and log back in, then verify:**
```bash
docker --version
docker info
```

### Step 5: Install Augment Code
**If Augment Code is not installed:**
1. Visit https://augmentcode.com
2. Download the installer for your system
3. Follow the installation instructions
4. Verify installation:
```bash
which augment
```

### Step 6: Install Required Tools

**Install Git (if not present):**
```bash
# Fedora:
sudo dnf install git

# Ubuntu:
sudo apt install git

# Arch:
sudo pacman -S git
```

**Install jq (JSON processor):**
```bash
# Fedora:
sudo dnf install jq

# Ubuntu:
sudo apt install jq

# Arch:
sudo pacman -S jq
```

## Download and Setup

### Step 7: Download the Project
**Clone the repository:**
```bash
cd ~/Documents
git clone https://github.com/swipswaps/n8n-mcp-docker-deployment.git
cd n8n-mcp-docker-deployment
```

**Verify download:**
```bash
ls -la
```

**You should see:**
- `install-test-n8n-mcp-docker.sh`
- `README.md`
- Other project files

### Step 8: Make Script Executable
```bash
chmod +x install-test-n8n-mcp-docker.sh
```

**Verify permissions:**
```bash
ls -la install-test-n8n-mcp-docker.sh
```

**Should show:** `-rwxr-xr-x` (executable permissions)

## Pre-Installation Testing

### Step 9: Run Safety Check (Dry Run)
**Always run dry-run first to see what will happen:**
```bash
./install-test-n8n-mcp-docker.sh --dry-run
```

**What to expect:**
- System checks and verification
- Preview of installation steps
- No actual changes made to your system
- Should end with "DRY RUN COMPLETED"

**If dry-run fails:**
- Read error messages carefully
- Fix any issues mentioned
- Re-run dry-run until it succeeds

### Step 10: Check Script Version
```bash
./install-test-n8n-mcp-docker.sh --version
```

**Should show:** Version 0.1.0-alpha or higher

### Step 11: Review Help Information
```bash
./install-test-n8n-mcp-docker.sh --help
```

**Review all available options before proceeding**

## Installation Process

### Step 12: Start Augment Code
**Before installation, start Augment Code:**
```bash
# Start Augment Code in background
augment &
```

**Verify it's running:**
```bash
pgrep -f augment
```

**Should show:** Process ID number(s)

### Step 13: Run Full Installation
**Execute the installation:**
```bash
./install-test-n8n-mcp-docker.sh
```

**What happens during installation:**
1. System verification checks
2. Docker image download (~300MB - may take 5-10 minutes)
3. Container testing and validation
4. Augment Code configuration creation
5. Integration testing
6. Final verification

**Expected successful output:**
```
[SUCCESS] ✅ Docker installation verified
[SUCCESS] ✅ n8n-mcp image deployed and tested
[SUCCESS] ✅ Augment Code MCP integration configured
[SUCCESS] ✅ Comprehensive tests passed
[SUCCESS] ✅ All Augment Rules requirements satisfied
```

### Step 14: Handle Installation Issues
**If installation fails:**

1. **Read error messages carefully**
2. **Check log files:**
   ```bash
   ls /tmp/n8n-mcp-logs-*/
   cat /tmp/n8n-mcp-logs-*/script.log
   ```

3. **Run cleanup if needed:**
   ```bash
   ./install-test-n8n-mcp-docker.sh --cleanup
   ```

4. **Try installation again**

## Post-Installation Verification

### Step 15: Verify Docker Container
**Check if n8n-mcp image was downloaded:**
```bash
docker images | grep n8n-mcp
```

**Should show:** `ghcr.io/czlonkowski/n8n-mcp` with size ~300MB

**Test container functionality:**
```bash
timeout 10s docker run --rm ghcr.io/czlonkowski/n8n-mcp:latest
```

**Should show:** Node.js startup and "22 tools initialized"

### Step 16: Verify Augment Code Configuration
**Check configuration file exists:**
```bash
ls -la ~/.config/augment-code/mcp-servers.json
```

**Verify configuration content:**
```bash
cat ~/.config/augment-code/mcp-servers.json
```

**Should contain:** n8n-mcp server configuration with Docker command

**Validate JSON syntax:**
```bash
jq empty ~/.config/augment-code/mcp-servers.json && echo "Valid JSON" || echo "Invalid JSON"
```

### Step 17: Restart Augment Code
**Stop current Augment Code:**
```bash
pkill -f augment
```

**Wait 5 seconds, then restart:**
```bash
sleep 5
augment &
```

**Verify restart:**
```bash
pgrep -f augment
```

## Using n8n-mcp with Augment Code

### Step 18: Test Integration
**Open Augment Code interface and test these commands:**

1. **Check available tools:**
   ```
   Show me available n8n nodes
   ```

2. **List workflow tools:**
   ```
   What n8n tools can I use for web scraping?
   ```

3. **Get node documentation:**
   ```
   Explain the HTTP Request node in n8n
   ```

### Step 19: Create Your First Workflow
**Try creating a simple workflow:**

1. **Ask Augment Code:**
   ```
   Help me create a simple n8n workflow to scrape news headlines from a website
   ```

2. **Follow the guidance provided**

3. **Ask for specific nodes:**
   ```
   Show me how to use the HTML Extract node
   ```

### Step 20: Advanced Usage Examples
**Try these workflow examples:**

1. **Web scraping workflow:**
   ```
   Create an n8n workflow that scrapes product prices from an e-commerce site
   ```

2. **Data processing workflow:**
   ```
   Help me build a workflow that processes CSV data and sends email notifications
   ```

3. **API integration workflow:**
   ```
   Create a workflow that fetches data from a REST API and saves it to a database
   ```

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Docker not found"
**Solution:**
```bash
# Install Docker (see Step 4)
# Restart terminal after installation
# Verify: docker --version
```

#### Issue 2: "Permission denied" for Docker
**Solution:**
```bash
sudo usermod -aG docker $USER
# Log out and log back in
newgrp docker
```

#### Issue 3: "Augment Code not running"
**Solution:**
```bash
pkill -f augment
sleep 5
augment &
pgrep -f augment  # Should show process ID
```

#### Issue 4: "n8n-mcp tools not visible in Augment Code"
**Solution:**
1. Check configuration file exists:
   ```bash
   ls ~/.config/augment-code/mcp-servers.json
   ```

2. Restart Augment Code:
   ```bash
   pkill -f augment && sleep 5 && augment &
   ```

3. Test container manually:
   ```bash
   docker run --rm ghcr.io/czlonkowski/n8n-mcp:latest
   ```

#### Issue 5: "Installation fails with ShellCheck warnings"
**Solution:**
```bash
# Run without strict linting (temporary workaround):
./install-test-n8n-mcp-docker.sh --dry-run
# If dry-run works, the core functionality is fine
```

### Getting Help

#### Check Logs
```bash
# Find latest log directory
ls -la /tmp/n8n-mcp-logs-*/

# View main log
cat /tmp/n8n-mcp-logs-*/script.log

# View performance log
cat /tmp/n8n-mcp-logs-*/performance.log
```

#### Run Diagnostic Commands
```bash
# System info
./install-test-n8n-mcp-docker.sh --version
docker --version
augment --version

# Test connectivity
docker pull ghcr.io/czlonkowski/n8n-mcp:latest
ping -c 3 ghcr.io
```

#### Clean Installation
```bash
# If all else fails, clean and reinstall:
./install-test-n8n-mcp-docker.sh --cleanup
./install-test-n8n-mcp-docker.sh --dry-run
./install-test-n8n-mcp-docker.sh
```

## Success Verification Checklist

**✅ Installation Complete When:**
- [ ] Docker image `ghcr.io/czlonkowski/n8n-mcp:latest` exists
- [ ] Container starts and shows "22 tools initialized"
- [ ] Configuration file `~/.config/augment-code/mcp-servers.json` exists
- [ ] Augment Code is running (`pgrep -f augment` shows process)
- [ ] Augment Code responds to "Show me available n8n nodes"
- [ ] You can ask for specific n8n node documentation
- [ ] You can create workflows through Augment Code

**🎉 You're Ready!**
You now have n8n-mcp integrated with Augment Code and can create automated workflows for web scraping, data processing, API integration, and more!

## Advanced Usage

### Working with Specific n8n Nodes

#### HTTP Request Node
**Ask Augment Code:**
```
Show me how to configure an HTTP Request node to fetch JSON data from an API
```

**Example workflow request:**
```
Create a workflow that makes a GET request to https://api.github.com/users/octocat and extracts the user's name and location
```

#### HTML Extract Node
**Ask Augment Code:**
```
How do I use the HTML Extract node to scrape specific elements from a webpage?
```

**Example workflow request:**
```
Build a workflow that scrapes all article titles from a news website using CSS selectors
```

#### Code Node
**Ask Augment Code:**
```
Show me how to use the Code node to process and transform data in n8n
```

**Example workflow request:**
```
Create a workflow that uses a Code node to calculate statistics from an array of numbers
```

### Workflow Templates

#### Template 1: Web Scraping with Data Processing
**Ask Augment Code:**
```
Create a complete n8n workflow that:
1. Scrapes product information from an e-commerce site
2. Filters products by price range
3. Formats the data as CSV
4. Sends the results via email
```

#### Template 2: API Data Integration
**Ask Augment Code:**
```
Build an n8n workflow that:
1. Fetches weather data from OpenWeatherMap API
2. Processes the data to extract key metrics
3. Stores the results in a database
4. Triggers alerts for extreme weather conditions
```

#### Template 3: File Processing Automation
**Ask Augment Code:**
```
Design a workflow that:
1. Monitors a folder for new CSV files
2. Validates and cleans the data
3. Generates summary reports
4. Archives processed files
```

### Performance Optimization

#### Monitoring Workflow Performance
**Check container resource usage:**
```bash
docker stats $(docker ps --filter ancestor=ghcr.io/czlonkowski/n8n-mcp:latest --format "{{.ID}}")
```

#### Optimizing Large Workflows
**Ask Augment Code:**
```
How can I optimize an n8n workflow that processes large datasets?
What are the best practices for handling memory-intensive operations?
```

### Security Considerations

#### Secure Configuration
**Verify configuration permissions:**
```bash
ls -la ~/.config/augment-code/mcp-servers.json
# Should show: -rw------- (600 permissions)
```

**If permissions are too open:**
```bash
chmod 600 ~/.config/augment-code/mcp-servers.json
```

#### Container Security
**Check container security:**
```bash
docker inspect ghcr.io/czlonkowski/n8n-mcp:latest | grep -A 10 "Config"
```

### Backup and Recovery

#### Backup Configuration
**Create configuration backup:**
```bash
cp ~/.config/augment-code/mcp-servers.json ~/.config/augment-code/mcp-servers.json.backup
```

#### Restore Configuration
**If configuration gets corrupted:**
```bash
cp ~/.config/augment-code/mcp-servers.json.backup ~/.config/augment-code/mcp-servers.json
pkill -f augment && sleep 5 && augment &
```

#### Complete System Backup
**Before major changes:**
```bash
# Backup Docker images
docker save ghcr.io/czlonkowski/n8n-mcp:latest > n8n-mcp-backup.tar

# Backup configuration
tar -czf augment-config-backup.tar.gz ~/.config/augment-code/
```

## Maintenance

### Regular Updates

#### Update Docker Image
**Check for updates:**
```bash
docker pull ghcr.io/czlonkowski/n8n-mcp:latest
```

**If updated, restart integration:**
```bash
pkill -f augment
sleep 5
augment &
```

#### Update Installation Script
**Get latest version:**
```bash
cd ~/Documents/n8n-mcp-docker-deployment
git pull origin main
```

#### Clean Old Resources
**Remove unused Docker resources:**
```bash
docker system prune -f
docker image prune -f
```

### Health Monitoring

#### Daily Health Check
**Create a simple health check script:**
```bash
cat > ~/check-n8n-mcp.sh << 'EOF'
#!/bin/bash
echo "=== n8n-mcp Health Check ==="

# Check Docker image
if docker images | grep -q n8n-mcp; then
    echo "✅ Docker image present"
else
    echo "❌ Docker image missing"
fi

# Check configuration
if [[ -f ~/.config/augment-code/mcp-servers.json ]]; then
    echo "✅ Configuration file exists"
    if jq empty ~/.config/augment-code/mcp-servers.json 2>/dev/null; then
        echo "✅ Configuration is valid JSON"
    else
        echo "❌ Configuration JSON is invalid"
    fi
else
    echo "❌ Configuration file missing"
fi

# Check Augment Code
if pgrep -f augment >/dev/null; then
    echo "✅ Augment Code is running"
else
    echo "❌ Augment Code is not running"
fi

# Test container
if timeout 10s docker run --rm ghcr.io/czlonkowski/n8n-mcp:latest >/dev/null 2>&1; then
    echo "✅ Container functionality verified"
else
    echo "❌ Container test failed"
fi

echo "=== Health Check Complete ==="
EOF

chmod +x ~/check-n8n-mcp.sh
```

**Run health check:**
```bash
~/check-n8n-mcp.sh
```

### Uninstallation

#### Complete Removal
**If you need to completely remove n8n-mcp:**
```bash
# Run cleanup script
cd ~/Documents/n8n-mcp-docker-deployment
./install-test-n8n-mcp-docker.sh --cleanup

# Remove Docker image
docker rmi ghcr.io/czlonkowski/n8n-mcp:latest

# Remove configuration
rm -f ~/.config/augment-code/mcp-servers.json

# Restore backup if exists
if [[ -f ~/.config/augment-code/mcp-servers.json.backup ]]; then
    mv ~/.config/augment-code/mcp-servers.json.backup ~/.config/augment-code/mcp-servers.json
fi

# Restart Augment Code
pkill -f augment && sleep 5 && augment &
```

## Frequently Asked Questions

### Q: How do I know if the installation was successful?
**A:** Run the success verification checklist in the guide. All items should be checked off.

### Q: Can I use this with other AI assistants besides Augment Code?
**A:** This integration is specifically designed for Augment Code. For other assistants, you'd need different configuration.

### Q: How much system resources does this use?
**A:** The Docker container uses approximately 300MB disk space and minimal CPU/memory during operation.

### Q: Can I run multiple n8n-mcp instances?
**A:** The current setup supports one instance. Multiple instances would require configuration modifications.

### Q: What if I encounter errors during workflow creation?
**A:** Check the troubleshooting section, verify your configuration, and ensure Augment Code is running properly.

### Q: How do I update to newer versions?
**A:** Follow the maintenance section to update the Docker image and installation script.

### Q: Is this safe for production use?
**A:** This is alpha software. Use in test environments only. Production use requires additional security and stability testing.

## Support and Community

### Getting Help
1. **Check this guide first** - most issues are covered
2. **Review project documentation** - https://github.com/swipswaps/n8n-mcp-docker-deployment
3. **Check n8n-mcp project** - https://github.com/czlonkowski/n8n-mcp
4. **Create GitHub issue** - for bugs or feature requests

### Contributing
1. **Report issues** - help improve the project
2. **Share workflows** - contribute example workflows
3. **Improve documentation** - suggest guide improvements
4. **Test on different systems** - help verify compatibility

## Next Steps
1. **Master the basics** - create simple workflows first
2. **Explore n8n documentation** - https://docs.n8n.io/
3. **Try advanced features** - complex data processing workflows
4. **Join the community** - share your automation successes
5. **Provide feedback** - help improve the integration

**🎉 Congratulations!** You now have a complete n8n workflow automation system integrated with Augment Code. Start creating powerful automations!
