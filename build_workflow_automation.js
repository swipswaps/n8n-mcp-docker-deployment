const puppeteer = require('puppeteer');
const fs = require('fs');

async function buildN8nWorkflow() {
    console.log('🚀 Starting n8n workflow automation...');
    
    const browser = await puppeteer.launch({
        headless: false, // Show browser for debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Navigate to n8n
        console.log('🌐 Navigating to n8n...');
        await page.goto('http://localhost:5678', { waitUntil: 'networkidle2' });
        
        // Wait for the page to load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Check if login is required
        const loginForm = await page.$('input[type="password"]');
        if (loginForm) {
            console.log('🔐 Logging in to n8n...');
            await page.type('input[type="text"]', 'admin');
            await page.type('input[type="password"]', 'password');
            await page.click('button[type="submit"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        // Wait for the main interface to load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Click "Create Workflow" button
        console.log('📝 Creating new workflow...');
        const createButton = await page.$('button:has-text("Create Workflow")');
        if (createButton) {
            await createButton.click();
        } else {
            // Try alternative selectors
            const altCreateButton = await page.$('[data-test-id="workflow-create-button"]') || 
                                  await page.$('button[data-testid="workflow-create-button"]') ||
                                  await page.$('button:contains("Create Workflow")');
            if (altCreateButton) {
                await altCreateButton.click();
            } else {
                console.log('⚠️ Could not find Create Workflow button, trying to navigate manually...');
                await page.goto('http://localhost:5678/workflow/new', { waitUntil: 'networkidle2' });
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Add HTTP Request node
        console.log('🔗 Adding HTTP Request node...');
        await addHttpRequestNode(page);
        
        // Add Code node for processing
        console.log('💻 Adding Code node for data processing...');
        await addCodeNode(page, 'Process Data', `
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
        `);
        
        // Add IF node for conditional logic
        console.log('🔀 Adding IF node for conditional logic...');
        await addIfNode(page);
        
        // Add Code nodes for handling different cases
        console.log('📊 Adding Code nodes for different cases...');
        await addCodeNode(page, 'Handle Long Title', `
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
        `);
        
        await addCodeNode(page, 'Handle Short Title', `
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
        `);
        
        // Add final Code node
        console.log('🎯 Adding final processing node...');
        await addCodeNode(page, 'Finalize Results', `
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
        `);
        
        // Add final HTTP Request node
        console.log('📤 Adding final HTTP Request node...');
        await addFinalHttpRequestNode(page);
        
        // Connect the nodes
        console.log('🔗 Connecting nodes...');
        await connectNodes(page);
        
        // Save the workflow
        console.log('💾 Saving workflow...');
        await saveWorkflow(page);
        
        // Execute the workflow
        console.log('🚀 Executing workflow...');
        await executeWorkflow(page);
        
        console.log('✅ Workflow built and executed successfully!');
        
        // Keep browser open for inspection
        console.log('🔍 Browser will remain open for inspection. Close it manually when done.');
        await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
        
    } catch (error) {
        console.error('❌ Error during automation:', error);
    } finally {
        await browser.close();
    }
}

async function addHttpRequestNode(page) {
    // Click the + button to add a node
    await page.click('[data-test-id="add-node-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Search for HTTP Request
    await page.type('[data-test-id="node-search-input"]', 'HTTP Request');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Click on HTTP Request node
    await page.click('[data-test-id="node-item-httpRequest"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Configure the HTTP Request node
    await page.type('[data-test-id="parameter-input-url"]', 'https://jsonplaceholder.typicode.com/posts/1');
    await page.select('[data-test-id="parameter-select-httpMethod"]', 'GET');
    
    // Save the node
    await page.click('[data-test-id="node-save-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function addCodeNode(page, nodeName, code) {
    // Click the + button to add a node
    await page.click('[data-test-id="add-node-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Search for Code
    await page.type('[data-test-id="node-search-input"]', 'Code');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Click on Code node
    await page.click('[data-test-id="node-item-code"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Configure the Code node
    await page.type('[data-test-id="parameter-input-name"]', nodeName);
    await page.type('[data-test-id="parameter-input-jsCode"]', code);
    
    // Save the node
    await page.click('[data-test-id="node-save-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function addIfNode(page) {
    // Click the + button to add a node
    await page.click('[data-test-id="add-node-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Search for IF
    await page.type('[data-test-id="node-search-input"]', 'IF');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Click on IF node
    await page.click('[data-test-id="node-item-if"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Configure the IF node
    await page.type('[data-test-id="parameter-input-leftValue"]', '={{ $json.statistics.titleLength }}');
    await page.select('[data-test-id="parameter-select-operator"]', 'gt');
    await page.type('[data-test-id="parameter-input-rightValue"]', '20');
    
    // Save the node
    await page.click('[data-test-id="node-save-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function addFinalHttpRequestNode(page) {
    // Click the + button to add a node
    await page.click('[data-test-id="add-node-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Search for HTTP Request
    await page.type('[data-test-id="node-search-input"]', 'HTTP Request');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Click on HTTP Request node
    await page.click('[data-test-id="node-item-httpRequest"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Configure the HTTP Request node
    await page.type('[data-test-id="parameter-input-url"]', 'https://httpbin.org/post');
    await page.select('[data-test-id="parameter-select-httpMethod"]', 'POST');
    await page.click('[data-test-id="parameter-checkbox-sendBody"]');
    await page.type('[data-test-id="parameter-input-bodyParameters"]', 'workflow_result');
    await page.type('[data-test-id="parameter-input-bodyParametersValue"]', '={{ $json }}');
    
    // Save the node
    await page.click('[data-test-id="node-save-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function connectNodes(page) {
    // This is a simplified version - in practice, you'd need to handle the drag-and-drop
    // For now, we'll rely on n8n's auto-connection feature
    console.log('🔗 Nodes will be auto-connected by n8n');
}

async function saveWorkflow(page) {
    // Click the save button
    await page.click('[data-test-id="workflow-save-button"]');
    await new Promise(resolve => setTimeout(resolve, 2000));
}

async function executeWorkflow(page) {
    // Click the execute button
    await page.click('[data-test-id="workflow-execute-button"]');
    await new Promise(resolve => setTimeout(resolve, 5000));
}

// Run the automation
buildN8nWorkflow().catch(console.error); 