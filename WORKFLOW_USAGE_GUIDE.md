# n8n Workflow Usage Guide

## 🚀 Quick Start

The n8n application is now running and accessible at **http://localhost:5678**. The browser should have opened automatically.

## 📋 Workflow Overview

The **Comprehensive n8n Workflow Example** demonstrates:

- **HTTP API Integration**: Fetches sample data from JSONPlaceholder
- **Data Processing**: Transforms and analyzes the data
- **Conditional Logic**: Branches based on title length
- **Error Handling**: Robust error management
- **MCP Integration**: Shows available MCP tools
- **Comprehensive Logging**: Detailed execution tracking

## 🌐 Web Interface Usage

### 1. Import the Workflow

1. Open **http://localhost:5678** in your browser
2. Click **"Create Workflow"**
3. Click the three dots menu (⋮) in the top right
4. Select **"Import from file"**
5. Choose the file: `n8n_workflow_example.json`
6. Click **"Import"**

### 2. Execute the Workflow

1. Click **"Execute Workflow"** to test it
2. Watch the execution flow through each node
3. Check the results in the final node

### 3. Workflow Steps Explained

#### Step 1: Fetch Sample Data
- **Node Type**: HTTP Request
- **Action**: GET request to `https://jsonplaceholder.typicode.com/posts/1`
- **Purpose**: Retrieves sample JSON data for processing

#### Step 2: Process Data
- **Node Type**: Code
- **Action**: Transforms the raw data and adds metadata
- **Output**: Enhanced data with statistics and workflow info

#### Step 3: Check Title Length
- **Node Type**: IF
- **Action**: Conditional logic based on title length
- **Branches**: 
  - If title > 20 characters → Handle Long Title
  - If title ≤ 20 characters → Handle Short Title

#### Step 4: Handle Title Cases
- **Node Type**: Code (two nodes)
- **Action**: Different processing for long vs short titles
- **Output**: Analysis with recommendations

#### Step 5: Finalize Results
- **Node Type**: Code
- **Action**: Combines all data and adds MCP integration info
- **Output**: Complete result with workflow summary

#### Step 6: Send Results
- **Node Type**: HTTP Request
- **Action**: POST results to `https://httpbin.org/post`
- **Purpose**: Demonstrates sending processed data to external service

## 🔧 MCP Tools Integration

The workflow includes information about available MCP tools for programmatic control:

### Available MCP Tools

```bash
# Workflow Management
n8n.workflow.list          # List all workflows
n8n.workflow.create        # Create new workflow
n8n.workflow.execute       # Execute workflow
n8n.workflow.activate      # Activate workflow
n8n.workflow.deactivate    # Deactivate workflow
n8n.workflow.delete        # Delete workflow
n8n.workflow.duplicate     # Duplicate workflow
n8n.workflow.export        # Export workflow
n8n.workflow.import        # Import workflow
n8n.workflow.update        # Update workflow

# Execution Management
n8n.execution.list         # List executions
n8n.execution.get          # Get execution details
n8n.execution.delete       # Delete execution

# Node Management
n8n.node.list              # List available nodes

# Credential Management
n8n.credential.list        # List credentials
n8n.credential.create      # Create credential
n8n.credential.update      # Update credential
n8n.credential.delete      # Delete credential

# Other Resources
n8n.webhook.list           # List webhooks
n8n.user.list              # List users
n8n.tag.list               # List tags
n8n.variable.list          # List variables
```

### Using MCP Tools in Cursor

1. **List Workflows**:
   ```bash
   # In Cursor, you can use MCP tools to list workflows
   n8n.workflow.list
   ```

2. **Execute Workflow**:
   ```bash
   # Execute the workflow programmatically
   n8n.workflow.execute --workflow-id <workflow-id>
   ```

3. **Monitor Executions**:
   ```bash
   # Check execution status
   n8n.execution.list
   ```

## 🎯 Customization Examples

### Modify the HTTP Request

1. Open the workflow in n8n
2. Click on the "Fetch Sample Data" node
3. Change the URL to any API endpoint
4. Update the HTTP method if needed

### Add New Processing Steps

1. Add a new "Code" node after "Process Data"
2. Write custom JavaScript to transform data
3. Connect it to the existing flow

### Change Conditional Logic

1. Click on the "Check Title Length" node
2. Modify the condition (e.g., change from 20 to 30 characters)
3. Update the logic as needed

## 🔍 Monitoring and Debugging

### View Execution Logs

1. Click on any node after execution
2. View the input/output data
3. Check for any errors or warnings

### Debug Workflow

1. Use the **"Debug"** mode to step through execution
2. Add **"Set"** nodes to log intermediate values
3. Use **"NoOp"** nodes for breakpoints

### Performance Monitoring

1. Check execution time in node details
2. Monitor memory usage
3. Review error logs

## 🚀 Advanced Features

### Webhook Triggers

Add a webhook trigger to make the workflow respond to HTTP requests:

1. Add a **"Webhook"** node as the first node
2. Configure the webhook URL
3. The workflow will execute when the webhook is called

### Scheduled Execution

Add a **"Cron"** node to run the workflow on a schedule:

1. Add a **"Cron"** node as the first node
2. Configure the schedule (e.g., every hour)
3. The workflow will execute automatically

### Error Handling

Add error handling nodes:

1. Add **"Error Trigger"** nodes
2. Configure error handling logic
3. Add notification nodes for errors

## 📊 Expected Output

When executed, the workflow should produce output similar to:

```json
{
  "originalData": {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  "processedAt": "2024-01-01T12:00:00.000Z",
  "workflowInfo": {
    "name": "Comprehensive n8n Workflow Example",
    "description": "Demonstrates HTTP requests, data processing, and MCP integration",
    "features": [
      "HTTP API calls",
      "Data transformation",
      "Conditional logic",
      "Error handling",
      "MCP integration"
    ]
  },
  "statistics": {
    "titleLength": 86,
    "bodyLength": 184,
    "userId": 1
  },
  "analysis": {
    "status": "LONG_TITLE",
    "message": "Title is longer than 20 characters",
    "recommendation": "Consider shortening the title for better UX",
    "titlePreview": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit..."
  },
  "mcpIntegration": {
    "available": true,
    "tools": ["n8n.workflow.list", "n8n.workflow.create", ...],
    "description": "This workflow demonstrates integration with n8n MCP tools for programmatic workflow management"
  },
  "summary": {
    "totalSteps": 6,
    "features": [
      "HTTP API integration",
      "Data processing and transformation",
      "Conditional logic and branching",
      "Error handling and validation",
      "MCP tool integration",
      "Comprehensive logging"
    ],
    "executionTime": "2024-01-01T12:00:00.000Z"
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

1. **Workflow won't import**:
   - Check JSON syntax
   - Ensure n8n is running
   - Try manual import

2. **Execution fails**:
   - Check node configurations
   - Verify API endpoints are accessible
   - Review error logs

3. **Browser won't open**:
   - Manually navigate to http://localhost:5678
   - Check if n8n container is running

### Getting Help

1. Check the n8n documentation: https://docs.n8n.io/
2. Review execution logs in the web interface
3. Use the n8n community forum
4. Check container logs: `docker logs n8n`

## 🎉 Next Steps

1. **Experiment**: Modify the workflow to test different features
2. **Integrate**: Connect to your own APIs and services
3. **Automate**: Set up scheduled workflows
4. **Scale**: Create complex multi-step workflows
5. **Monitor**: Set up alerts and notifications

The workflow is now ready to use! Enjoy exploring n8n's powerful automation capabilities. 