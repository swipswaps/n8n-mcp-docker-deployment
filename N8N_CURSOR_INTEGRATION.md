# 🚀 n8n + Cursor Integration Guide

## ✅ **Two n8n Solutions Available**

You now have **two powerful n8n solutions** running:

### **1. Full n8n Web Application**
- **URL:** http://localhost:5678
- **Username:** `admin`
- **Password:** `password`
- **Purpose:** Visual workflow builder with web interface

### **2. n8n-mcp Tools for Cursor**
- **Container:** `ghcr.io/czlonkowski/n8n-mcp:latest`
- **Purpose:** Programmatic workflow management via Cursor
- **Tools:** 22 workflow automation tools available

---

## 🎯 **How to Use Both Solutions**

### **Option 1: Visual Workflow Builder (Recommended for Beginners)**

**Access the web interface:**
1. Open browser to **http://localhost:5678**
2. Login with `admin`/`password`
3. Click **"Create Workflow"** (correct button name)
4. Build workflows visually with drag-and-drop

**Perfect for:**
- Learning n8n concepts
- Visual workflow design
- Testing and debugging
- Real-time workflow execution

### **Option 2: Programmatic Workflow Management (Advanced)**

**Use n8n-mcp tools in Cursor:**
- Create workflows programmatically
- Manage workflows via code
- Integrate with development workflows
- Automate workflow creation

**Perfect for:**
- Developers who prefer code
- Automated workflow deployment
- CI/CD integration
- Bulk workflow management

---

## 🚀 **Quick Start: Visual Workflow Builder**

### **Step 1: Access the Interface**
```bash
# Open in browser
http://localhost:5678
```

### **Step 2: Create Your First Workflow**
1. **Click "Create Workflow"** (not "Add Workflow")
2. **Choose "Start from scratch"**
3. **Add a Manual Trigger** (starting point)
4. **Add an HTTP Request** node
5. **Connect the nodes** by dragging

### **Step 3: Configure the HTTP Request**
- **Method:** GET
- **URL:** `https://httpbin.org/json`
- **Click "Save"**

### **Step 4: Test the Workflow**
- **Click "Execute Workflow"**
- **Check the results** in the output panel

---

## 🔧 **Official n8n Workflow Examples**

### **Example 1: Simple API Data Fetch**
```
Manual Trigger → HTTP Request → Code (Process) → Email
```

**Steps:**
1. Add **Manual Trigger**
2. Add **HTTP Request**:
   - Method: GET
   - URL: `https://api.github.com/users/octocat`
3. Add **Code** node:
```javascript
// Process GitHub user data
const user = items[0].json;
return [{
  json: {
    name: user.name,
    location: user.location,
    followers: user.followers,
    message: `User ${user.name} has ${user.followers} followers`
  }
}];
```
4. Add **Email** node to send results

### **Example 2: Web Scraping Workflow**
```
Manual Trigger → HTTP Request → HTML Extract → Code → Email
```

**Steps:**
1. Add **Manual Trigger**
2. Add **HTTP Request**:
   - Method: GET
   - URL: `https://example.com`
3. Add **HTML Extract**:
   - CSS Selector: `h1`
   - Return Array: false
4. Add **Code** node for processing
5. Add **Email** node for results

### **Example 3: File Processing Pipeline**
```
Webhook Trigger → Read Binary Files → CSV → Code → Write Binary Files
```

**Steps:**
1. Add **Webhook Trigger**
2. Add **Read Binary Files**
3. Add **CSV** node for parsing
4. Add **Code** node for processing
5. Add **Write Binary Files** for output

---

## 📊 **Available Node Categories**

### **Core Nodes (Most Used)**
- **Manual Trigger** - Start workflow manually
- **Schedule Trigger** - Run on schedule (cron)
- **Webhook Trigger** - Receive webhooks
- **HTTP Request** - Make API calls
- **Code** - Custom JavaScript processing
- **Set** - Transform and set data
- **IF** - Conditional logic
- **Merge** - Combine data streams

### **Data Processing**
- **HTML Extract** - Scrape web content
- **JSON** - Parse and manipulate JSON
- **CSV** - Process CSV files
- **XML** - Parse XML data
- **Date & Time** - Date operations

### **Integrations**
- **Email** - Send emails
- **Slack** - Send Slack messages
- **Discord** - Send Discord messages
- **Telegram** - Send Telegram messages
- **GitHub** - GitHub API integration
- **Google Sheets** - Spreadsheet operations

### **File Operations**
- **Read Binary Files** - Read files
- **Write Binary Files** - Write files
- **Move Files** - Move files
- **Delete Files** - Delete files

---

## 🎯 **Advanced: n8n-mcp Tools for Cursor**

### **Available Tools (22 Total)**
1. **n8n-create-workflow** - Create new workflows
2. **n8n-get-workflow** - Retrieve workflow details
3. **n8n-update-workflow** - Update workflows
4. **n8n-validate-workflow** - Validate configurations
5. **n8n-list-workflows** - List all workflows
6. **n8n-delete-workflow** - Remove workflows
7. **n8n-trigger-webhook** - Execute workflows
8. **n8n-list-executions** - View execution history
9. **n8n-get-execution** - Get execution details
10. **n8n-delete-execution** - Clean up executions

### **Integration with Cursor**
```bash
# The n8n-mcp tools can be used programmatically
# to manage workflows from Cursor or other development tools
```

---

## 📋 **Management Commands**

### **Web Interface Management**
```bash
# Start n8n web application
./start-n8n.sh

# Stop n8n
./start-n8n.sh stop

# View logs
./start-n8n.sh logs

# Check status
./start-n8n.sh status
```

### **Container Management**
```bash
# View running containers
docker ps | grep n8n

# View n8n logs
docker logs n8n

# Restart n8n
docker restart n8n
```

---

## 🔍 **Troubleshooting**

### **Web Interface Issues**
1. **Can't access http://localhost:5678**
   - Check if container is running: `docker ps | grep n8n`
   - Restart container: `docker restart n8n`
   - Check logs: `docker logs n8n`

2. **Login doesn't work**
   - Username: `admin`
   - Password: `password`
   - Clear browser cache if needed

3. **Workflow execution fails**
   - Check node configuration
   - Verify API endpoints
   - Check network connectivity

### **n8n-mcp Tools Issues**
1. **Tools not available**
   - Container may need restart
   - Check MCP configuration
   - Verify Cursor integration

---

## 📚 **Learning Resources**

### **Official Documentation**
- **n8n Docs:** https://docs.n8n.io/
- **Node Reference:** https://docs.n8n.io/integrations/
- **Workflow Templates:** https://n8n.io/templates

### **Video Tutorials**
- **Getting Started:** https://www.youtube.com/watch?v=1Ih8Cjdj3YE
- **Node Tutorials:** https://www.youtube.com/c/n8n-io

### **Community**
- **Forum:** https://community.n8n.io/
- **Discord:** https://discord.gg/n8n
- **GitHub:** https://github.com/n8n-io/n8n

---

## 🎯 **Best Practices**

### **Workflow Design**
1. **Start with a Trigger** - Every workflow needs a starting point
2. **Use Descriptive Names** - Name nodes and workflows clearly
3. **Add Error Handling** - Include error handling nodes
4. **Test Incrementally** - Test each node as you build

### **Performance**
1. **Limit Data Size** - Process data in chunks
2. **Use Efficient Nodes** - Choose appropriate nodes
3. **Monitor Executions** - Track performance
4. **Clean Up** - Remove old executions

### **Security**
1. **Secure Credentials** - Use n8n credential management
2. **Validate Inputs** - Always validate external data
3. **Limit Permissions** - Use minimal required permissions
4. **Monitor Access** - Track workflow usage

---

## 🎉 **Ready to Build Amazing Workflows!**

You now have **both visual and programmatic access** to n8n:

- **Visual Builder:** http://localhost:5678 (admin/password)
- **Programmatic Tools:** Available via n8n-mcp container

**Choose the approach that works best for your workflow!** 