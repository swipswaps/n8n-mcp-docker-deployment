# 🚀 n8n Application Guide for Cursor

## ✅ **n8n Application Successfully Deployed!**

Your n8n application is now running and ready to use with Cursor.

## 📊 **Access Information**

### **🌐 Web Interface**
- **URL:** http://localhost:5678
- **Username:** `admin`
- **Password:** `password`

### **🐳 Container Status**
- **Container Name:** `n8n`
- **Status:** Running and healthy
- **Port:** 5678 (mapped to host)

## 🎯 **How to Use n8n with Cursor**

### **Step 1: Access the Web Interface**
1. Open your web browser
2. Navigate to: **http://localhost:5678**
3. Login with:
   - Username: `admin`
   - Password: `password`

### **Step 2: Create Your First Workflow**
1. **Click "Add Workflow"** in the n8n interface
2. **Choose a template** or start from scratch
3. **Add nodes** by clicking the "+" button
4. **Connect nodes** by dragging from output to input
5. **Configure nodes** by clicking on them

### **Step 3: Common Workflow Patterns**

#### **Web Scraping Workflow**
```
HTTP Request → HTML Extract → Code (Process) → Email/Save
```

#### **API Integration Workflow**
```
HTTP Request → Set (Transform) → HTTP Request → Code (Process)
```

#### **Data Processing Workflow**
```
Manual Trigger → Code (Transform) → Email/Save
```

## 🔧 **Available Nodes (Key Categories)**

### **Core Nodes**
- **HTTP Request** - Make API calls and web requests
- **Code** - Custom JavaScript processing
- **Set** - Transform and set data
- **IF** - Conditional logic
- **Switch** - Multiple condition routing

### **Data Processing**
- **HTML Extract** - Scrape web content
- **JSON** - Parse and manipulate JSON
- **CSV** - Process CSV data
- **XML** - Parse XML data
- **Date & Time** - Date manipulation

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
- **Move Files** - Move files between locations
- **Delete Files** - Remove files

## 🚀 **Quick Start Examples**

### **Example 1: Simple Web Scraping**
1. Add **HTTP Request** node
2. Set URL to: `https://httpbin.org/json`
3. Add **Code** node
4. Add this JavaScript:
```javascript
return items.map(item => ({
  json: {
    message: "Data received: " + JSON.stringify(item.json)
  }
}));
```
5. Add **Email** node to send results

### **Example 2: API Data Processing**
1. Add **HTTP Request** node
2. Set URL to: `https://api.github.com/users/octocat`
3. Add **Set** node to extract specific fields
4. Add **Code** node for data transformation
5. Add **Email** node to send processed data

### **Example 3: File Processing**
1. Add **Manual Trigger** node
2. Add **Read Binary Files** node
3. Add **Code** node to process file content
4. Add **Write Binary Files** node to save results

## 📋 **Management Commands**

### **Start n8n**
```bash
./start-n8n.sh
```

### **Stop n8n**
```bash
./start-n8n.sh stop
```

### **Restart n8n**
```bash
./start-n8n.sh restart
```

### **View logs**
```bash
./start-n8n.sh logs
```

### **Check status**
```bash
./start-n8n.sh status
```

## 🔍 **Troubleshooting**

### **If n8n won't start:**
```bash
# Check Docker status
docker ps

# View detailed logs
docker logs n8n

# Restart the container
docker restart n8n
```

### **If you can't access the web interface:**
1. Check if port 5678 is available: `netstat -tlnp | grep 5678`
2. Verify container is running: `docker ps | grep n8n`
3. Check firewall settings
4. Try accessing from different browser

### **If login doesn't work:**
- Username: `admin`
- Password: `password`
- Make sure you're using the correct credentials

## 📚 **Learning Resources**

### **Official Documentation**
- **n8n Docs:** https://docs.n8n.io/
- **Node Reference:** https://docs.n8n.io/integrations/
- **Community Forum:** https://community.n8n.io/

### **Video Tutorials**
- **Getting Started:** https://www.youtube.com/watch?v=1Ih8Cjdj3YE
- **Node Tutorials:** https://www.youtube.com/c/n8n-io

### **Templates & Examples**
- **n8n Templates:** https://n8n.io/templates
- **Community Workflows:** https://community.n8n.io/c/workflows

## 🎯 **Best Practices**

### **Workflow Design**
1. **Start Simple** - Begin with basic workflows
2. **Use Descriptive Names** - Name workflows and nodes clearly
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

## 🚀 **Advanced Features**

### **Webhooks**
- Create webhook endpoints for external triggers
- Use webhook URLs to trigger workflows
- Configure webhook authentication

### **Scheduling**
- Set up scheduled workflow executions
- Use cron expressions for timing
- Configure timezone settings

### **Error Handling**
- Add error handling nodes
- Configure retry logic
- Set up error notifications

### **Data Storage**
- Use n8n's built-in data storage
- Connect to external databases
- Implement data persistence

---

## 🎉 **You're Ready to Build Amazing Workflows!**

Your n8n application is now running at **http://localhost:5678** and ready to use with Cursor. Start creating powerful automation workflows today! 