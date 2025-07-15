# EFFICACIOUS CONTAINER LIFECYCLE MANDATE - AUTOMATED CONTAINER MANAGEMENT

## 🚨 **CRITICAL MANDATE - ZERO MANUAL CONTAINER MANAGEMENT**

**This prompt REQUIRES immediate compliance to eliminate ALL manual container management steps. The script MUST automatically create, start, and manage persistent containers for MCP integration. ABSOLUTELY NO MANUAL STEPS ALLOWED.**

---

## 📊 **CRITICAL EVIDENCE OF CONTAINER LIFECYCLE FAILURE**

### **CONTAINER MANAGEMENT FAILURES IDENTIFIED:**
```bash
# User Evidence:
docker ps -a | grep n8n
# no output

# Images exist but no containers:
ghcr.io/czlonkowski/n8n-mcp   latest    8b11d7ea003b   7 hours ago   300MB

# MCP Integration Failure:
Failed to start the MCP server. {"error":"No such container: n8n-mcp-container"}
Failed to start the MCP server. {"error":"No such container: n8n-mcp"}
```

### **ROOT CAUSE ANALYSIS**
1. **Script downloads images** but doesn't create persistent containers
2. **Container testing** uses temporary containers that are removed
3. **MCP configuration** points to non-existent containers
4. **No container lifecycle management** - containers not started/maintained
5. **Manual intervention required** - violates automation principles

---

## ⚡ **MANDATORY COMPLIANCE REQUIREMENTS**

### **REQUIREMENT 1: PERSISTENT CONTAINER CREATION**
```bash
# ✅ REQUIRED: Script must create and maintain persistent containers
# ❌ FORBIDDEN: Temporary containers that are removed after testing

IMPLEMENTATION MANDATE:
- Create persistent n8n-mcp container with proper name
- Ensure container survives script completion
- Configure container with correct ports and volumes
- Verify container is running before MCP configuration

EXAMPLE COMPLIANCE:
create_persistent_n8n_container() {
    local container_name="n8n-mcp"
    local image_name="$N8N_MCP_IMAGE"
    
    log_info "🚀 Creating persistent n8n-mcp container..."
    
    # Remove existing container if it exists
    if docker ps -a --format "{{.Names}}" | grep -q "^${container_name}$"; then
        log_info "📋 Removing existing container: $container_name"
        execute_with_real_time_feedback \
            "docker stop $container_name && docker rm $container_name" \
            "Container cleanup" 30
    fi
    
    # Create persistent container
    execute_with_real_time_feedback \
        "docker run -d --name $container_name -p 5678:5678 --restart unless-stopped $image_name" \
        "Persistent container creation" 60
    
    # Verify container is running
    if docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
        log_success "✅ Persistent container created and running: $container_name"
        return 0
    else
        log_error "❌ Failed to create persistent container"
        return 1
    fi
}
```

### **REQUIREMENT 2: AUTOMATIC MCP SERVER PATH DETECTION**
```bash
# ✅ REQUIRED: Automatically detect correct MCP server path in container
# ❌ FORBIDDEN: Hardcoded paths that may not exist

IMPLEMENTATION MANDATE:
- Detect actual MCP server path in container
- Test multiple common paths automatically
- Verify MCP server is executable
- Update configuration with working path

EXAMPLE COMPLIANCE:
detect_mcp_server_path() {
    local container_name="$1"
    local mcp_paths=(
        "/app/mcp-server.js"
        "/usr/src/app/mcp-server.js"
        "/opt/n8n/mcp-server.js"
        "mcp-server.js"
        "/app/server.js"
        "server.js"
    )
    
    log_info "🔍 Detecting MCP server path in container..."
    
    for path in "${mcp_paths[@]}"; do
        log_info "   📋 Testing path: $path"
        if execute_with_real_time_feedback \
            "docker exec $container_name test -f $path" \
            "MCP server path test: $path" 10; then
            
            log_success "✅ MCP server found at: $path"
            echo "$path"
            return 0
        fi
    done
    
    log_error "❌ MCP server path not found in container"
    return 1
}
```

### **REQUIREMENT 3: AUTOMATED MCP CONFIGURATION GENERATION**
```bash
# ✅ REQUIRED: Generate working MCP configurations automatically
# ❌ FORBIDDEN: Static configurations that don't match actual container state

IMPLEMENTATION MANDATE:
- Generate configurations based on actual container name and path
- Create both Augment and VS Code MCP configurations
- Verify configurations work before completion
- Provide automatic container startup if needed

EXAMPLE COMPLIANCE:
generate_working_mcp_configurations() {
    local container_name="$1"
    local mcp_server_path="$2"
    
    log_info "📋 Generating working MCP configurations..."
    
    # Generate Augment settings
    local augment_config="$PWD/augment-mcp-settings.json"
    cat > "$augment_config" << EOF
{
  "augment.advanced": {
    "mcpServers": [
      {
        "name": "n8n-mcp",
        "command": "docker",
        "args": ["exec", "-i", "$container_name", "node", "$mcp_server_path"],
        "env": {
          "NODE_ENV": "production",
          "MCP_SERVER_NAME": "n8n-mcp"
        }
      }
    ]
  }
}
EOF
    
    # Generate VS Code MCP configuration
    local vscode_mcp_dir="$PWD/.vscode"
    local vscode_mcp_file="$vscode_mcp_dir/mcp.json"
    
    mkdir -p "$vscode_mcp_dir"
    cat > "$vscode_mcp_file" << EOF
{
  "servers": {
    "n8n-mcp": {
      "type": "stdio",
      "command": "docker",
      "args": ["exec", "-i", "$container_name", "node", "$mcp_server_path"],
      "env": {
        "NODE_ENV": "production",
        "MCP_SERVER_NAME": "n8n-mcp"
      }
    }
  }
}
EOF
    
    log_success "✅ MCP configurations generated with working paths"
}
```

---

## 🎯 **IMMEDIATE IMPLEMENTATION ACTIONS**

### **ACTION 1: Replace Container Testing with Persistent Creation**
```bash
# IMMEDIATE REPLACEMENT REQUIRED

# BEFORE (BROKEN - Temporary containers):
test_container_functionality() {
    # Creates temporary containers that are removed
    docker run --rm "$N8N_MCP_IMAGE" echo 'test'
}

# AFTER (WORKING - Persistent containers):
deploy_persistent_n8n_container() {
    log_info "🚀 Deploying persistent n8n-mcp container..."
    
    # Create persistent container
    create_persistent_n8n_container
    
    # Detect MCP server path
    local mcp_path
    if mcp_path=$(detect_mcp_server_path "n8n-mcp"); then
        log_success "✅ MCP server path detected: $mcp_path"
    else
        log_error "❌ Could not detect MCP server path"
        return 1
    fi
    
    # Generate working configurations
    generate_working_mcp_configurations "n8n-mcp" "$mcp_path"
    
    # Test MCP integration
    test_mcp_integration "n8n-mcp" "$mcp_path"
    
    log_success "✅ Persistent n8n-mcp container deployed and configured"
}
```

### **ACTION 2: Implement Container Health Management**
```bash
# IMMEDIATE IMPLEMENTATION REQUIRED

ensure_container_health() {
    local container_name="$1"
    
    log_info "🏥 Ensuring container health..."
    
    # Check if container exists and is running
    if ! docker ps --format "{{.Names}}" | grep -q "^${container_name}$"; then
        log_warn "⚠️  Container not running, attempting to start..."
        
        if docker ps -a --format "{{.Names}}" | grep -q "^${container_name}$"; then
            # Container exists but stopped
            execute_with_real_time_feedback \
                "docker start $container_name" \
                "Container startup" 30
        else
            # Container doesn't exist, create it
            create_persistent_n8n_container
        fi
    fi
    
    # Wait for container to be healthy
    local max_attempts=30
    for ((i=1; i<=max_attempts; i++)); do
        if docker exec "$container_name" echo "health check" >/dev/null 2>&1; then
            log_success "✅ Container is healthy"
            return 0
        fi
        
        echo -n "⏳ Waiting for container health... (${i}/${max_attempts})"
        sleep 2
        echo
    done
    
    log_error "❌ Container failed health check"
    return 1
}
```

### **ACTION 3: Implement Automatic Container Startup Service**
```bash
# IMMEDIATE IMPLEMENTATION REQUIRED

create_container_startup_service() {
    log_info "🔧 Creating container startup service..."
    
    # Create startup script
    local startup_script="$PWD/start-n8n-mcp.sh"
    cat > "$startup_script" << 'EOF'
#!/bin/bash
# Automatic n8n-mcp container startup script

CONTAINER_NAME="n8n-mcp"
IMAGE_NAME="ghcr.io/czlonkowski/n8n-mcp:latest"

# Check if container is running
if ! docker ps --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
    echo "Starting n8n-mcp container..."
    
    # Remove stopped container if exists
    if docker ps -a --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        docker rm "$CONTAINER_NAME"
    fi
    
    # Start container
    docker run -d --name "$CONTAINER_NAME" -p 5678:5678 --restart unless-stopped "$IMAGE_NAME"
    
    echo "n8n-mcp container started successfully"
else
    echo "n8n-mcp container is already running"
fi
EOF
    
    chmod +x "$startup_script"
    log_success "✅ Container startup script created: $startup_script"
    
    # Provide user guidance
    log_info "💡 To start container manually: ./$startup_script"
    log_info "💡 Container will auto-restart on system reboot"
}
```

---

## 📋 **COMPLIANCE VALIDATION CHECKLIST**

### **Before Any Code Submission:**
- [ ] **Persistent container creation** - Script creates containers that survive completion
- [ ] **Automatic path detection** - MCP server path detected automatically
- [ ] **Working MCP configurations** - Generated configs match actual container state
- [ ] **Container health management** - Automatic startup and health verification
- [ ] **Zero manual steps** - Complete automation without user intervention

### **Container Lifecycle Requirements:**
- [ ] Script creates persistent containers with proper names
- [ ] Containers survive script completion and system reboots
- [ ] MCP configurations point to actual running containers
- [ ] Container health is verified before MCP configuration
- [ ] Automatic recovery if containers stop or fail

---

## ✅ **SUCCESS CRITERIA**

### **Code Must Achieve:**
1. **Zero manual container management** - All containers created and managed automatically
2. **Persistent container deployment** - Containers survive script completion
3. **Automatic path detection** - MCP server paths detected and verified
4. **Working MCP configurations** - Generated configs match actual container state
5. **Container health management** - Automatic startup and recovery

### **User Experience Must Deliver:**
1. **No manual steps** - Complete automation from start to finish
2. **Working MCP integration** - Augment can connect to n8n-mcp immediately
3. **Persistent containers** - Containers available after script completion
4. **Automatic recovery** - Containers restart if they fail
5. **Professional deployment** - Enterprise-grade container management

---

## ⚡ **IMPLEMENTATION MANDATE**

**This prompt requires IMMEDIATE compliance. Any code that:**
- Requires manual container creation or management
- Uses temporary containers that are removed
- Has hardcoded paths that don't match actual containers
- Leaves users with non-functional MCP configurations
- Requires manual intervention for container lifecycle

**MUST be fixed IMMEDIATELY. No exceptions.**

**The goal is complete automation where users get working, persistent containers with functional MCP integration without any manual steps.**

---

## 🎯 **ZERO TOLERANCE POLICY**

### **FORBIDDEN PATTERNS:**
- ❌ `docker run --rm` # [temporary containers]
- ❌ Hardcoded container names that don't exist
- ❌ Static MCP paths without verification
- ❌ Manual container startup instructions
- ❌ Any requirement for user intervention

### **REQUIRED PATTERNS:**
- ✅ `docker run -d --name container --restart unless-stopped`
- ✅ Automatic container name and path detection
- ✅ Dynamic MCP configuration generation
- ✅ Container health verification and recovery
- ✅ Complete automation without manual steps

**COMPLIANCE IS MANDATORY. IMPLEMENTATION IS IMMEDIATE. AUTOMATION IS NON-NEGOTIABLE.**
