# 🚀 n8n Workflow Examples - Official Documentation Based

## ✅ **Correct Interface Elements**

You're absolutely right! The correct button is **"Create Workflow"** (not "Add Workflow").

## 🎯 **Official n8n Workflow Examples**

### **Example 1: GitHub Issue Tracker (Official Template)**

This workflow monitors GitHub issues and sends notifications when new issues are created.

#### **Workflow Steps:**
1. **GitHub Trigger** - Monitors new issues
2. **IF Node** - Checks if issue has specific labels
3. **Slack Node** - Sends notification to Slack
4. **Email Node** - Sends email notification

#### **How to Create:**
1. Click **"Create Workflow"**
2. Choose **"Start from scratch"**
3. Add nodes in this order:
   - **GitHub Trigger** (Webhook)
   - **IF** (Condition)
   - **Slack** (Send Message)
   - **Email** (Send Email)

#### **Configuration:**
```json
{
  "name": "GitHub Issue Tracker",
  "nodes": [
    {
      "type": "n8n-nodes-base.githubTrigger",
      "parameters": {
        "events": ["issues"],
        "repository": "your-repo/your-project"
      }
    },
    {
      "type": "n8n-nodes-base.if",
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.action }}",
              "operation": "equal",
              "value2": "opened"
            }
          ]
        }
      }
    },
    {
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#notifications",
        "text": "New issue: {{ $json.issue.title }}"
      }
    }
  ]
}
```

---

### **Example 2: Weather Alert System (Official Pattern)**

This workflow fetches weather data and sends alerts for extreme conditions.

#### **Workflow Steps:**
1. **Schedule Trigger** - Runs every hour
2. **HTTP Request** - Fetches weather API data
3. **Code Node** - Processes weather data
4. **IF Node** - Checks for extreme conditions
5. **Email Node** - Sends weather alerts

#### **How to Create:**
1. Click **"Create Workflow"**
2. Add **Schedule Trigger** (set to hourly)
3. Add **HTTP Request** node:
   - Method: GET
   - URL: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`
4. Add **Code** node for data processing
5. Add **IF** node for condition checking
6. Add **Email** node for alerts

#### **Code Node JavaScript:**
```javascript
// Process weather data
const weather = items[0].json;
const temp = weather.main.temp - 273.15; // Convert to Celsius
const condition = weather.weather[0].main;

return [{
  json: {
    temperature: temp,
    condition: condition,
    city: weather.name,
    alert: temp > 30 || temp < 0 || condition === 'Thunderstorm'
  }
}];
```

---

### **Example 3: File Processing Pipeline (Official Template)**

This workflow processes uploaded files and extracts data.

#### **Workflow Steps:**
1. **Webhook Trigger** - Receives file uploads
2. **Read Binary Files** - Reads uploaded file
3. **CSV Node** - Parses CSV data
4. **Code Node** - Processes data
5. **Write Binary Files** - Saves processed data

#### **How to Create:**
1. Click **"Create Workflow"**
2. Add **Webhook Trigger** node
3. Add **Read Binary Files** node
4. Add **CSV** node for parsing
5. Add **Code** node for processing
6. Add **Write Binary Files** node

#### **Webhook Configuration:**
- **HTTP Method:** POST
- **Path:** `/file-processor`
- **Response Mode:** Respond to Webhook

---

### **Example 4: API Data Aggregation (Official Pattern)**

This workflow aggregates data from multiple APIs and creates reports.

#### **Workflow Steps:**
1. **Manual Trigger** - Starts workflow
2. **HTTP Request** - Fetches data from API 1
3. **HTTP Request** - Fetches data from API 2
4. **Merge Node** - Combines data
5. **Code Node** - Processes aggregated data
6. **Email Node** - Sends report

#### **How to Create:**
1. Click **"Create Workflow"**
2. Add **Manual Trigger** node
3. Add first **HTTP Request** node:
   - Method: GET
   - URL: `https://api.example1.com/data`
4. Add second **HTTP Request** node:
   - Method: GET
   - URL: `https://api.example2.com/data`
5. Add **Merge** node to combine data
6. Add **Code** node for processing
7. Add **Email** node for reporting

---

### **Example 5: E-commerce Order Processing (Official Template)**

This workflow processes e-commerce orders and updates inventory.

#### **Workflow Steps:**
1. **Webhook Trigger** - Receives order notifications
2. **IF Node** - Validates order
3. **HTTP Request** - Updates inventory
4. **Email Node** - Sends confirmation
5. **Slack Node** - Notifies team

#### **How to Create:**
1. Click **"Create Workflow"**
2. Add **Webhook Trigger** node
3. Add **IF** node for validation
4. Add **HTTP Request** for inventory update
5. Add **Email** node for customer confirmation
6. Add **Slack** node for team notification

---

## 🔧 **Official n8n Node Categories**

### **Core Nodes (Most Used)**
- **Manual Trigger** - Start workflow manually
- **Schedule Trigger** - Run on schedule
- **Webhook Trigger** - Receive webhooks
- **HTTP Request** - Make API calls
- **Code** - Custom JavaScript
- **Set** - Set/transform data
- **IF** - Conditional logic
- **Merge** - Combine data streams

### **Data Processing**
- **HTML Extract** - Scrape web content
- **JSON** - Parse JSON data
- **CSV** - Process CSV files
- **XML** - Parse XML data
- **Date & Time** - Date operations

### **Integrations**
- **Email** - Send emails
- **Slack** - Send Slack messages
- **Discord** - Send Discord messages
- **Telegram** - Send Telegram messages
- **GitHub** - GitHub API
- **Google Sheets** - Spreadsheet operations

### **File Operations**
- **Read Binary Files** - Read files
- **Write Binary Files** - Write files
- **Move Files** - Move files
- **Delete Files** - Delete files

---

## 🚀 **How to Create Your First Workflow**

### **Step-by-Step Guide:**

1. **Click "Create Workflow"**
2. **Choose "Start from scratch"**
3. **Add your first node:**
   - Click the **"+"** button
   - Search for **"Manual Trigger"**
   - Click to add it

4. **Add a second node:**
   - Click the **"+"** button again
   - Search for **"HTTP Request"**
   - Click to add it

5. **Connect the nodes:**
   - Drag from the **output** of Manual Trigger
   - Drop on the **input** of HTTP Request

6. **Configure the HTTP Request:**
   - Set **Method** to "GET"
   - Set **URL** to "https://httpbin.org/json"
   - Click **"Save"**

7. **Test the workflow:**
   - Click **"Execute Workflow"**
   - Check the results

---

## 📚 **Official Resources**

### **Documentation**
- **n8n Docs:** https://docs.n8n.io/
- **Node Reference:** https://docs.n8n.io/integrations/
- **Workflow Templates:** https://n8n.io/templates

### **Community**
- **Forum:** https://community.n8n.io/
- **Discord:** https://discord.gg/n8n
- **GitHub:** https://github.com/n8n-io/n8n

### **Video Tutorials**
- **Getting Started:** https://www.youtube.com/watch?v=1Ih8Cjdj3YE
- **Node Tutorials:** https://www.youtube.com/c/n8n-io

---

## 🎯 **Best Practices (Official)**

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

## 🎉 **Ready to Build!**

Your n8n application is running at **http://localhost:5678** with the correct **"Create Workflow"** button. Start building powerful automation workflows using these official patterns! 