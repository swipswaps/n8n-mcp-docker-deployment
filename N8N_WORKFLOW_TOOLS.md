# 🚀 n8n Workflow Tools - Complete Reference

## Overview

The n8n-mcp Docker container provides **22 powerful workflow automation tools** that enable you to create, manage, and execute n8n workflows through Augment Code integration.

## 📋 Available Workflow Management Tools

### **1. Workflow Creation & Management**

#### **n8n-create-workflow**
- **Purpose**: Create new n8n workflows
- **Usage**: Define workflow structure, nodes, and connections
- **Example**: Create a web scraping workflow with HTTP Request and HTML Extract nodes

#### **n8n-get-workflow**
- **Purpose**: Retrieve complete workflow details
- **Usage**: Get full workflow configuration including all nodes and connections
- **Example**: Fetch workflow by ID to analyze structure

#### **n8n-get-workflow-details**
- **Purpose**: Get detailed workflow information
- **Usage**: Retrieve comprehensive workflow metadata and configuration
- **Example**: Get workflow details for analysis or modification

#### **n8n-get-workflow-minimal**
- **Purpose**: Get basic workflow information
- **Usage**: Retrieve essential workflow data without full details
- **Example**: Quick workflow overview for listing purposes

#### **n8n-get-workflow-structure**
- **Purpose**: Get workflow structure analysis
- **Usage**: Retrieve workflow layout and node relationships
- **Example**: Analyze workflow architecture and dependencies

### **2. Workflow Updates & Modifications**

#### **n8n-update-full-workflow**
- **Purpose**: Replace entire workflow configuration
- **Usage**: Update complete workflow with new structure
- **Example**: Replace workflow with new version or completely different design

#### **n8n-update-partial-workflow**
- **Purpose**: Update specific parts of workflow
- **Usage**: Modify individual nodes or connections without full replacement
- **Example**: Update node parameters or add new connections

### **3. Workflow Validation & Testing**

#### **n8n-validate-workflow**
- **Purpose**: Validate workflow configuration
- **Usage**: Check workflow syntax, node compatibility, and connections
- **Example**: Verify workflow before deployment or execution

### **4. Workflow Execution Management**

#### **n8n-trigger-webhook-workflow**
- **Purpose**: Trigger workflow via webhook
- **Usage**: Execute workflow through HTTP webhook endpoint
- **Example**: Trigger workflow from external systems or applications

#### **n8n-list-executions**
- **Purpose**: List workflow executions
- **Usage**: View execution history and status
- **Example**: Monitor workflow performance and success rates

#### **n8n-get-execution**
- **Purpose**: Get specific execution details
- **Usage**: Retrieve detailed information about a particular execution
- **Example**: Analyze execution results and troubleshoot issues

#### **n8n-delete-execution**
- **Purpose**: Delete execution records
- **Usage**: Remove execution history and logs
- **Example**: Clean up old execution data

### **5. Workflow Lifecycle Management**

#### **n8n-list-workflows**
- **Purpose**: List all available workflows
- **Usage**: Get overview of all workflows in the system
- **Example**: Browse available workflows for management

#### **n8n-delete-workflow**
- **Purpose**: Delete workflows
- **Usage**: Remove workflows from the system
- **Example**: Clean up unused or obsolete workflows

## 🎯 Common Workflow Patterns

### **Web Scraping Workflow**
```json
{
  "name": "Web Scraping Workflow",
  "nodes": [
    {
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://example.com",
        "method": "GET"
      }
    },
    {
      "type": "n8n-nodes-base.htmlExtract",
      "parameters": {
        "extractionValues": [
          {
            "cssSelector": "h1",
            "returnArray": false
          }
        ]
      }
    }
  ]
}
```

### **Data Processing Workflow**
```json
{
  "name": "Data Processing Workflow",
  "nodes": [
    {
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "// Process and transform data\nreturn items.map(item => ({\n  processed: item.json.data\n}));"
      }
    },
    {
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "user@example.com",
        "subject": "Processed Data",
        "text": "Data has been processed successfully"
      }
    }
  ]
}
```

### **API Integration Workflow**
```json
{
  "name": "API Integration Workflow",
  "nodes": [
    {
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://api.example.com/data",
        "method": "GET",
        "authentication": "genericCredentialType"
      }
    },
    {
      "type": "n8n-nodes-base.set",
      "parameters": {
        "values": {
          "string": [
            {
              "name": "status",
              "value": "processed"
            }
          ]
        }
      }
    }
  ]
}
```

## 🔧 Usage Examples

### **Creating a Simple Workflow**
```bash
# Ask Augment Code:
"Create a simple n8n workflow that scrapes news headlines from a website"
```

### **Modifying Existing Workflow**
```bash
# Ask Augment Code:
"Update the web scraping workflow to also extract article summaries"
```

### **Validating Workflow**
```bash
# Ask Augment Code:
"Validate my workflow and check for any configuration issues"
```

### **Triggering Workflow**
```bash
# Ask Augment Code:
"Trigger the web scraping workflow and show me the results"
```

## 📊 Workflow Categories

### **Data Collection**
- Web scraping workflows
- API data fetching
- Database queries
- File processing

### **Data Processing**
- Data transformation
- Filtering and sorting
- Aggregation and analysis
- Format conversion

### **Automation**
- Email notifications
- File operations
- System integrations
- Scheduled tasks

### **Integration**
- API connections
- Database operations
- Cloud service integration
- Third-party tool connections

## 🚀 Getting Started

### **1. Access Tools via Augment Code**
```bash
# Restart Augment Code to load n8n-mcp tools
pkill -f augment && sleep 2 && augment &
```

### **2. Test Tool Availability**
```bash
# Ask Augment Code:
"Show me available n8n workflow tools"
```

### **3. Create Your First Workflow**
```bash
# Ask Augment Code:
"Help me create a simple n8n workflow for web scraping"
```

### **4. Explore Advanced Features**
```bash
# Ask Augment Code:
"Show me how to use the n8n HTTP Request node"
```

## 📈 Best Practices

### **Workflow Design**
1. **Start Simple**: Begin with basic workflows and add complexity gradually
2. **Use Descriptive Names**: Name workflows and nodes clearly
3. **Add Error Handling**: Include error handling nodes for robustness
4. **Document Workflows**: Add comments and descriptions

### **Performance Optimization**
1. **Limit Data Size**: Process data in chunks for large datasets
2. **Use Efficient Nodes**: Choose appropriate nodes for your use case
3. **Monitor Executions**: Track performance and optimize bottlenecks
4. **Clean Up**: Regularly delete old executions and unused workflows

### **Security Considerations**
1. **Secure Credentials**: Use n8n credential management
2. **Validate Inputs**: Always validate external data
3. **Limit Permissions**: Use minimal required permissions
4. **Monitor Access**: Track workflow access and usage

## 🔍 Troubleshooting

### **Common Issues**
1. **Workflow Validation Errors**: Check node configuration and connections
2. **Execution Failures**: Verify input data and node parameters
3. **Performance Issues**: Monitor resource usage and optimize workflows
4. **Integration Problems**: Check API credentials and endpoints

### **Debugging Tips**
1. **Use Debug Nodes**: Add debug nodes to inspect data flow
2. **Check Logs**: Review execution logs for error details
3. **Test Incrementally**: Test individual nodes before full workflow
4. **Validate Data**: Ensure data format matches node expectations

## 📚 Additional Resources

- **n8n Documentation**: https://docs.n8n.io/
- **Node Reference**: https://docs.n8n.io/integrations/
- **Community Forum**: https://community.n8n.io/
- **GitHub Repository**: https://github.com/n8n-io/n8n

---

**🎉 You now have access to 22 powerful n8n workflow tools through Augment Code integration!** 