# Manual n8n Workflow Building Guide

## 🎯 Current Status

✅ **n8n is running** at http://localhost:5678  
✅ **Browser is open** with the workflow editor  
✅ **Ready to build** the comprehensive workflow  

## 📋 Step-by-Step Workflow Building

### Step 1: Add HTTP Request Node (Data Source)

1. **Click the + button** in the workflow editor
2. **Search for "HTTP Request"** in the node search
3. **Click on "HTTP Request"** to add it
4. **Configure the node:**
   - **URL**: `https://jsonplaceholder.typicode.com/posts/1`
   - **Method**: `GET`
   - **Name**: `Fetch Sample Data`
5. **Click "Save"** to save the node

### Step 2: Add Code Node (Data Processing)

1. **Click the + button** again
2. **Search for "Code"** in the node search
3. **Click on "Code"** to add it
4. **Configure the node:**
   - **Name**: `Process Data`
   - **JavaScript Code**:
   ```javascript
   // Process the fetched data
   const data = $input.first().json;
   
   // Add timestamp and processing info
   const processedData = {
     originalData: data,
     processedAt: new Date().toISOString(),
     workflowInfo: {
       name: 'Comprehensive n8n Workflow Example',
       description: 'Demonstrates HTTP requests, data processing, and MCP integration',
       features: [
         'HTTP API calls',
         'Data transformation',
         'Conditional logic',
         'Error handling',
         'MCP integration'
       ]
     },
     statistics: {
       titleLength: data.title ? data.title.length : 0,
       bodyLength: data.body ? data.body.length : 0,
       userId: data.userId || 'unknown'
     }
   };
   
   return [{ json: processedData }];
   ```
5. **Click "Save"** to save the node

### Step 3: Add IF Node (Conditional Logic)

1. **Click the + button** again
2. **Search for "IF"** in the node search
3. **Click on "IF"** to add it
4. **Configure the node:**
   - **Name**: `Check Title Length`
   - **Condition 1**:
     - **Left Value**: `={{ $json.statistics.titleLength }}`
     - **Operator**: `Greater Than`
     - **Right Value**: `20`
5. **Click "Save"** to save the node

### Step 4: Add Code Node (Handle Long Title)

1. **Click the + button** again
2. **Search for "Code"** in the node search
3. **Click on "Code"** to add it
4. **Configure the node:**
   - **Name**: `Handle Long Title`
   - **JavaScript Code**:
   ```javascript
   // Handle long title case
   const data = $input.first().json;
   
   const result = {
     ...data,
     analysis: {
       status: 'LONG_TITLE',
       message: 'Title is longer than 20 characters',
       recommendation: 'Consider shortening the title for better UX',
       titlePreview: data.originalData.title.substring(0, 50) + '...'
     }
   };
   
   return [{ json: result }];
   ```
5. **Click "Save"** to save the node

### Step 5: Add Code Node (Handle Short Title)

1. **Click the + button** again
2. **Search for "Code"** in the node search
3. **Click on "Code"** to add it
4. **Configure the node:**
   - **Name**: `Handle Short Title`
   - **JavaScript Code**:
   ```javascript
   // Handle short title case
   const data = $input.first().json;
   
   const result = {
     ...data,
     analysis: {
       status: 'SHORT_TITLE',
       message: 'Title is 20 characters or less',
       recommendation: 'Title length is optimal',
       titlePreview: data.originalData.title
     }
   };
   
   return [{ json: result }];
   ```
5. **Click "Save"** to save the node

### Step 6: Add Code Node (Finalize Results)

1. **Click the + button** again
2. **Search for "Code"** in the node search
3. **Click on "Code"** to add it
4. **Configure the node:**
   - **Name**: `Finalize Results`
   - **JavaScript Code**:
   ```javascript
   // Combine and finalize results
   const data = $input.first().json;
   
   // Add MCP integration information
   const finalResult = {
     ...data,
     mcpIntegration: {
       available: true,
       tools: [
         'n8n.workflow.list',
         'n8n.workflow.create',
         'n8n.workflow.execute',
         'n8n.node.list',
         'n8n.execution.list',
         'n8n.credential.list',
         'n8n.webhook.list',
         'n8n.user.list',
         'n8n.tag.list',
         'n8n.variable.list',
         'n8n.workflow.activate',
         'n8n.workflow.deactivate',
         'n8n.workflow.delete',
         'n8n.workflow.duplicate',
         'n8n.workflow.export',
         'n8n.workflow.import',
         'n8n.workflow.update',
         'n8n.execution.get',
         'n8n.execution.delete',
         'n8n.credential.create',
         'n8n.credential.update',
         'n8n.credential.delete'
       ],
       description: 'This workflow demonstrates integration with n8n MCP tools for programmatic workflow management'
     },
     summary: {
       totalSteps: 6,
       features: [
         'HTTP API integration',
         'Data processing and transformation',
         'Conditional logic and branching',
         'Error handling and validation',
         'MCP tool integration',
         'Comprehensive logging'
       ],
       executionTime: new Date().toISOString()
     }
   };
   
   return [{ json: finalResult }];
   ```
5. **Click "Save"** to save the node

### Step 7: Add HTTP Request Node (Send Results)

1. **Click the + button** again
2. **Search for "HTTP Request"** in the node search
3. **Click on "HTTP Request"** to add it
4. **Configure the node:**
   - **Name**: `Send Results`
   - **URL**: `https://httpbin.org/post`
   - **Method**: `POST`
   - **Send Body**: ✅ (check this box)
   - **Body Parameters**:
     - **Name**: `workflow_result`
     - **Value**: `={{ $json }}`
5. **Click "Save"** to save the node

## 🔗 Connecting the Nodes

### Automatic Connection
n8n should automatically connect the nodes in the correct order. If not, manually connect them:

1. **Fetch Sample Data** → **Process Data**
2. **Process Data** → **Check Title Length**
3. **Check Title Length** → **Handle Long Title** (IF TRUE)
4. **Check Title Length** → **Handle Short Title** (IF FALSE)
5. **Handle Long Title** → **Finalize Results**
6. **Handle Short Title** → **Finalize Results**
7. **Finalize Results** → **Send Results**

### Manual Connection (if needed)
- **Drag** from the output dot of one node to the input dot of the next node
- **IF node** has two outputs: TRUE and FALSE - connect them appropriately

## 💾 Save the Workflow

1. **Click "Save"** in the top toolbar
2. **Enter a name**: `Comprehensive n8n Workflow Example`
3. **Click "Save"** to save the workflow

## 🚀 Execute the Workflow

1. **Click "Execute Workflow"** in the top toolbar
2. **Watch the execution** flow through each node
3. **Check the results** in the final node

## 📊 Expected Results

When executed, you should see:

1. **Fetch Sample Data**: Retrieves JSON data from JSONPlaceholder
2. **Process Data**: Transforms the data and adds metadata
3. **Check Title Length**: Evaluates if title is > 20 characters
4. **Handle Long/Short Title**: Processes based on title length
5. **Finalize Results**: Combines all data with MCP integration info
6. **Send Results**: Posts the final result to httpbin.org

## 🔍 Monitoring Execution

- **Click on any node** to see its input/output data
- **Check the execution log** for any errors
- **View the final result** in the "Send Results" node

## 🎯 Success Indicators

✅ **All nodes are connected** in the correct order  
✅ **Workflow executes without errors**  
✅ **Final result shows MCP integration information**  
✅ **Data is successfully posted to httpbin.org**  

## 🛠️ Troubleshooting

### Common Issues

1. **Node not found**: Make sure you're searching for the exact node name
2. **Connection failed**: Check that nodes are properly connected
3. **Execution error**: Review the node configuration and data format
4. **Save failed**: Check that all required fields are filled

### Getting Help

- **Check node documentation** in n8n
- **Review execution logs** for error details
- **Test individual nodes** to isolate issues
- **Use the n8n community** for additional support

## 🎉 Next Steps

Once the workflow is built and working:

1. **Experiment** with different data sources
2. **Modify** the processing logic
3. **Add** more conditional branches
4. **Integrate** with your own APIs
5. **Use MCP tools** in Cursor for programmatic control

The workflow is now ready to demonstrate the full power of n8n with both web interface and MCP integration! 