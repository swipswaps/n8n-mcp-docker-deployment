# 🎯 EXPERT PROMPT: CREATE BULLETPROOF N8N-MCP DOCKER DEPLOYMENT

**Context**: The current `/home/owner/Documents/6869bb09-1dcc-8008-99da-27a686609b2b/n8n-mcp-docker-deployment` repository has failed consistently with multiple issues. Create a completely new, working solution based on proven GitHub repositories.

## 📋 REQUIREMENTS - BASED ON WORKING CODE

**Primary Sources to Use:**
1. **n8n-io/n8n-hosting** (748 stars, official) - https://github.com/n8n-io/n8n-hosting
2. **woakes070048/n8n-docker** (working docker-compose setup)
3. **n8n-io/n8n official docker examples** - proven production patterns

## 🔧 CORE ISSUES TO RESOLVE

**From Failed Repository Analysis:**
1. **Test 4/12 timeout failures** - n8n-mcp container testing approach is fundamentally wrong
2. **Complex testing framework** - 12 tests are overcomplicated and unreliable
3. **MCP server integration issues** - Wrong Docker exec commands vs stdio mode
4. **System performance problems** - Scripts cause high CPU usage and crashes
5. **Augment Code extension crashes** - Process killing breaks VS Code extensions

## ✅ SOLUTION ARCHITECTURE - PROVEN PATTERNS

**Base on Official n8n-io/n8n-hosting Structure:**

```
n8n-production-deployment/
├── docker-compose.yml          # Based on official n8n-hosting
├── .env.example               # Environment configuration
├── init-setup.sh             # Simple, reliable setup script
├── mcp-integration/           # MCP server integration
│   ├── docker-compose.mcp.yml
│   └── claude-config.json
├── scripts/
│   ├── install.sh            # Single, reliable installation
│   ├── backup.sh             # Data backup
│   └── update.sh             # Update management
└── docs/
    ├── README.md
    └── troubleshooting.md
```

## 🎯 SPECIFIC IMPLEMENTATION REQUIREMENTS

### 1. Docker Compose (Use Official Pattern)
```yaml
# Base on n8n-io/n8n-hosting/docker-compose/docker-compose.yml
version: '3.8'
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    # Use EXACT configuration from official repository
    # Include PostgreSQL, Redis, proper networking
```

### 2. MCP Integration (Fix the Core Issue)
```bash
# CORRECT MCP server usage (not docker exec):
docker run -i --rm -e MCP_MODE=stdio ghcr.io/czlonkowski/n8n-mcp:latest

# NOT: docker exec -i n8n-mcp node /app/mcp-server.js (this file doesn't exist)
```

### 3. Simple Installation Script (Replace 12-Test Framework)
```bash
#!/bin/bash
# install.sh - Based on woakes070048/n8n-docker/install_docker_compose.sh

# 1. Check prerequisites (Docker, Docker Compose)
# 2. Create directories and set permissions
# 3. Copy configuration files
# 4. Start services with docker-compose up -d
# 5. Verify services are running (simple health checks)
# 6. Provide access URLs and next steps

# NO complex testing framework - just working deployment
```

### 4. MCP Server Integration (Separate Service)
```yaml
# mcp-server service in docker-compose
mcp-server:
  image: ghcr.io/czlonkowski/n8n-mcp:latest
  environment:
    - MCP_MODE=stdio
    - LOG_LEVEL=error
  # Proper networking and volume configuration
```

## 🚫 WHAT NOT TO INCLUDE (LESSONS FROM FAILURES)

1. **No complex testing framework** - The 12-test system is unreliable
2. **No process killing scripts** - They crash Augment Code extension
3. **No sudo operations** - Keep everything user-level where possible
4. **No custom timeout handling** - Use Docker's built-in mechanisms
5. **No overcomplicated logging** - Simple, clear output only

## 📚 CODE SOURCES TO LEVERAGE

### From n8n-io/n8n-hosting:
- `docker-compose/docker-compose.yml` - Production-ready n8n setup
- Environment variable patterns
- Volume and network configuration
- PostgreSQL integration

### From woakes070048/n8n-docker:
- `install_docker_compose.sh` - Simple installation approach
- `.env.example` - Configuration template
- `init-data.sh` - Data initialization

### From Official n8n Documentation:
- Docker deployment best practices
- Environment configuration
- Security recommendations

## 🎯 SUCCESS CRITERIA

1. **Single command deployment**: `./install.sh` and it works
2. **No testing framework failures** - Simple health checks only
3. **MCP integration works** - Proper stdio mode configuration
4. **No system performance issues** - Lightweight, efficient scripts
5. **Augment Code safe** - No process killing or system interference
6. **Production ready** - Based on official, proven patterns

## 📝 DELIVERABLES

1. **Complete new repository** replacing the failed one
2. **Working docker-compose.yml** based on official n8n-hosting
3. **Simple installation script** that actually works
4. **MCP integration** using correct stdio mode
5. **Clear documentation** with troubleshooting guide
6. **No complex testing** - just working deployment

## 🔍 VALIDATION APPROACH

Instead of 12 complex tests:

1. **Docker services running**: `docker-compose ps`
2. **n8n accessible**: `curl http://localhost:5678`
3. **MCP server responsive**: Simple stdio test
4. **Data persistence**: Database connection check

**Create a bulletproof, production-ready n8n deployment with MCP integration based on proven, working GitHub repositories. Focus on simplicity, reliability, and official patterns rather than complex custom solutions.**

---

This prompt leverages the proven patterns from official repositories while avoiding all the issues that caused the current repository to fail consistently.