const puppeteer = require('puppeteer');

async function buildCompleteWorkflow() {
    console.log('🚀 Starting complete n8n workflow builder...');
    
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=VizDisplayCompositor']
    });
    
    try {
        const page = await browser.newPage();
        
        // Set viewport
        await page.setViewport({ width: 1920, height: 1080 });
        
        // Navigate to n8n
        console.log('🌐 Navigating to n8n...');
        await page.goto('http://localhost:5678', { waitUntil: 'networkidle2' });
        
        // Wait for page to load
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Handle login if needed
        await handleLogin(page);
        
        // Create new workflow
        await createNewWorkflow(page);
        
        // Build the complete workflow
        await buildWorkflowNodes(page);
        
        // Save and execute
        await saveAndExecuteWorkflow(page);
        
        console.log('✅ Workflow building completed!');
        
        // Keep browser open for inspection
        await new Promise(resolve => setTimeout(resolve, 120000)); // Wait 2 minutes
        
    } catch (error) {
        console.error('❌ Error during automation:', error);
    } finally {
        await browser.close();
    }
}

async function handleLogin(page) {
    console.log('🔍 Checking for login...');
    
    try {
        // Wait for potential login form
        await page.waitForSelector('input[type="password"], form', { timeout: 5000 });
        
        // Try to find username and password fields
        const usernameField = await page.$('input[name="username"], input[type="text"]');
        const passwordField = await page.$('input[name="password"], input[type="password"]');
        
        if (usernameField && passwordField) {
            console.log('🔐 Logging in...');
            await usernameField.type('admin');
            await passwordField.type('password');
            
            // Find and click submit button
            const submitButton = await page.$('button[type="submit"], input[type="submit"]');
            if (submitButton) {
                await submitButton.click();
                console.log('✅ Login submitted');
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } else {
            console.log('ℹ️ No login form found, proceeding...');
        }
    } catch (error) {
        console.log('ℹ️ No login required, proceeding...');
    }
}

async function createNewWorkflow(page) {
    console.log('📝 Creating new workflow...');
    
    try {
        // Try to find and click create workflow button
        const createSelectors = [
            'button:contains("Create Workflow")',
            '[data-test-id="workflow-create-button"]',
            'button[data-testid="workflow-create-button"]',
            'a[href*="workflow/new"]'
        ];
        
        let created = false;
        for (const selector of createSelectors) {
            try {
                const button = await page.$(selector);
                if (button) {
                    await button.click();
                    console.log(`✅ Clicked create workflow with selector: ${selector}`);
                    created = true;
                    break;
                }
            } catch (error) {
                // Continue to next selector
            }
        }
        
        if (!created) {
            // Try direct navigation
            console.log('🔄 Trying direct navigation to workflow editor...');
            await page.goto('http://localhost:5678/workflow/new', { waitUntil: 'networkidle2' });
        }
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
    } catch (error) {
        console.error('❌ Error creating workflow:', error);
        throw error;
    }
}

async function buildWorkflowNodes(page) {
    console.log('🔨 Building workflow nodes...');
    
    // Wait for workflow editor to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add HTTP Request node
    await addHttpRequestNode(page);
    
    // Add Code node for processing
    await addCodeNode(page, 'Process Data', getProcessDataCode());
    
    // Add IF node
    await addIfNode(page);
    
    // Add Code nodes for different cases
    await addCodeNode(page, 'Handle Long Title', getLongTitleCode());
    await addCodeNode(page, 'Handle Short Title', getShortTitleCode());
    
    // Add final Code node
    await addCodeNode(page, 'Finalize Results', getFinalizeCode());
    
    // Add final HTTP Request node
    await addFinalHttpRequestNode(page);
    
    console.log('✅ All nodes added successfully');
}

async function addHttpRequestNode(page) {
    console.log('🔗 Adding HTTP Request node...');
    
    try {
        // Click add node button
        await clickAddNodeButton(page);
        
        // Search for HTTP Request
        await searchForNode(page, 'HTTP Request');
        
        // Click on HTTP Request node
        await clickOnNode(page, 'HTTP Request');
        
        // Configure the node
        await configureHttpRequestNode(page);
        
        console.log('✅ HTTP Request node added');
    } catch (error) {
        console.error('❌ Error adding HTTP Request node:', error);
        throw error;
    }
}

async function addCodeNode(page, nodeName, code) {
    console.log(`💻 Adding Code node: ${nodeName}...`);
    
    try {
        // Click add node button
        await clickAddNodeButton(page);
        
        // Search for Code
        await searchForNode(page, 'Code');
        
        // Click on Code node
        await clickOnNode(page, 'Code');
        
        // Configure the node
        await configureCodeNode(page, nodeName, code);
        
        console.log(`✅ Code node "${nodeName}" added`);
    } catch (error) {
        console.error(`❌ Error adding Code node "${nodeName}":`, error);
        throw error;
    }
}

async function addIfNode(page) {
    console.log('🔀 Adding IF node...');
    
    try {
        // Click add node button
        await clickAddNodeButton(page);
        
        // Search for IF
        await searchForNode(page, 'IF');
        
        // Click on IF node
        await clickOnNode(page, 'IF');
        
        // Configure the node
        await configureIfNode(page);
        
        console.log('✅ IF node added');
    } catch (error) {
        console.error('❌ Error adding IF node:', error);
        throw error;
    }
}

async function addFinalHttpRequestNode(page) {
    console.log('📤 Adding final HTTP Request node...');
    
    try {
        // Click add node button
        await clickAddNodeButton(page);
        
        // Search for HTTP Request
        await searchForNode(page, 'HTTP Request');
        
        // Click on HTTP Request node
        await clickOnNode(page, 'HTTP Request');
        
        // Configure the node
        await configureFinalHttpRequestNode(page);
        
        console.log('✅ Final HTTP Request node added');
    } catch (error) {
        console.error('❌ Error adding final HTTP Request node:', error);
        throw error;
    }
}

async function clickAddNodeButton(page) {
    const addButtonSelectors = [
        '[data-test-id="add-node-button"]',
        'button[data-testid="add-node-button"]',
        '.add-node-button',
        'button:contains("+")',
        'button:contains("Add")'
    ];
    
    for (const selector of addButtonSelectors) {
        try {
            const button = await page.$(selector);
            if (button) {
                await button.click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    throw new Error('Could not find add node button');
}

async function searchForNode(page, nodeName) {
    const searchSelectors = [
        '[data-test-id="node-search-input"]',
        'input[placeholder*="search"]',
        'input[placeholder*="Search"]',
        'input[type="text"]'
    ];
    
    for (const selector of searchSelectors) {
        try {
            const searchInput = await page.$(selector);
            if (searchInput) {
                await searchInput.click();
                await searchInput.type(nodeName);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    throw new Error(`Could not find search input for node: ${nodeName}`);
}

async function clickOnNode(page, nodeName) {
    const nodeSelectors = [
        `[data-test-id="node-item-${nodeName.toLowerCase().replace(/\s+/g, '')}"]`,
        `[data-testid="node-item-${nodeName.toLowerCase().replace(/\s+/g, '')}"]`,
        `.node-item:contains("${nodeName}")`,
        `div:contains("${nodeName}")`
    ];
    
    for (const selector of nodeSelectors) {
        try {
            const node = await page.$(selector);
            if (node) {
                await node.click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    throw new Error(`Could not find node: ${nodeName}`);
}

async function configureHttpRequestNode(page) {
    // Configure URL
    const urlSelectors = [
        '[data-test-id="parameter-input-url"]',
        'input[name="url"]',
        'input[placeholder*="URL"]'
    ];
    
    for (const selector of urlSelectors) {
        try {
            const urlInput = await page.$(selector);
            if (urlInput) {
                await urlInput.type('https://jsonplaceholder.typicode.com/posts/1');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure method
    const methodSelectors = [
        '[data-test-id="parameter-select-httpMethod"]',
        'select[name="method"]'
    ];
    
    for (const selector of methodSelectors) {
        try {
            const methodSelect = await page.$(selector);
            if (methodSelect) {
                await methodSelect.select('GET');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNode(page);
}

async function configureCodeNode(page, nodeName, code) {
    // Configure name
    const nameSelectors = [
        '[data-test-id="parameter-input-name"]',
        'input[name="name"]',
        'input[placeholder*="Name"]'
    ];
    
    for (const selector of nameSelectors) {
        try {
            const nameInput = await page.$(selector);
            if (nameInput) {
                await nameInput.type(nodeName);
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure code
    const codeSelectors = [
        '[data-test-id="parameter-input-jsCode"]',
        'textarea[name="jsCode"]',
        'textarea[placeholder*="Code"]'
    ];
    
    for (const selector of codeSelectors) {
        try {
            const codeInput = await page.$(selector);
            if (codeInput) {
                await codeInput.type(code);
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNode(page);
}

async function configureIfNode(page) {
    // Configure left value
    const leftValueSelectors = [
        '[data-test-id="parameter-input-leftValue"]',
        'input[name="leftValue"]'
    ];
    
    for (const selector of leftValueSelectors) {
        try {
            const leftInput = await page.$(selector);
            if (leftInput) {
                await leftInput.type('={{ $json.statistics.titleLength }}');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure operator
    const operatorSelectors = [
        '[data-test-id="parameter-select-operator"]',
        'select[name="operator"]'
    ];
    
    for (const selector of operatorSelectors) {
        try {
            const operatorSelect = await page.$(selector);
            if (operatorSelect) {
                await operatorSelect.select('gt');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure right value
    const rightValueSelectors = [
        '[data-test-id="parameter-input-rightValue"]',
        'input[name="rightValue"]'
    ];
    
    for (const selector of rightValueSelectors) {
        try {
            const rightInput = await page.$(selector);
            if (rightInput) {
                await rightInput.type('20');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNode(page);
}

async function configureFinalHttpRequestNode(page) {
    // Configure URL
    const urlSelectors = [
        '[data-test-id="parameter-input-url"]',
        'input[name="url"]',
        'input[placeholder*="URL"]'
    ];
    
    for (const selector of urlSelectors) {
        try {
            const urlInput = await page.$(selector);
            if (urlInput) {
                await urlInput.type('https://httpbin.org/post');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure method
    const methodSelectors = [
        '[data-test-id="parameter-select-httpMethod"]',
        'select[name="method"]'
    ];
    
    for (const selector of methodSelectors) {
        try {
            const methodSelect = await page.$(selector);
            if (methodSelect) {
                await methodSelect.select('POST');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Enable send body
    const sendBodySelectors = [
        '[data-test-id="parameter-checkbox-sendBody"]',
        'input[name="sendBody"]',
        'input[type="checkbox"]'
    ];
    
    for (const selector of sendBodySelectors) {
        try {
            const sendBodyCheckbox = await page.$(selector);
            if (sendBodyCheckbox) {
                await sendBodyCheckbox.click();
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNode(page);
}

async function saveNode(page) {
    const saveSelectors = [
        '[data-test-id="node-save-button"]',
        'button:contains("Save")',
        'button[type="submit"]'
    ];
    
    for (const selector of saveSelectors) {
        try {
            const saveButton = await page.$(selector);
            if (saveButton) {
                await saveButton.click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    console.log('⚠️ Could not find save button, continuing...');
}

async function saveAndExecuteWorkflow(page) {
    console.log('💾 Saving workflow...');
    
    const saveSelectors = [
        '[data-test-id="workflow-save-button"]',
        'button:contains("Save")',
        'button[title*="Save"]'
    ];
    
    for (const selector of saveSelectors) {
        try {
            const saveButton = await page.$(selector);
            if (saveButton) {
                await saveButton.click();
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log('✅ Workflow saved');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    console.log('🚀 Executing workflow...');
    
    const executeSelectors = [
        '[data-test-id="workflow-execute-button"]',
        'button:contains("Execute")',
        'button[title*="Execute"]'
    ];
    
    for (const selector of executeSelectors) {
        try {
            const executeButton = await page.$(selector);
            if (executeButton) {
                await executeButton.click();
                await new Promise(resolve => setTimeout(resolve, 5000));
                console.log('✅ Workflow executed');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
}

function getProcessDataCode() {
    return `// Process the fetched data
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

return [{ json: processedData }];`;
}

function getLongTitleCode() {
    return `// Handle long title case
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

return [{ json: result }];`;
}

function getShortTitleCode() {
    return `// Handle short title case
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

return [{ json: result }];`;
}

function getFinalizeCode() {
    return `// Combine and finalize results
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

return [{ json: finalResult }];`;
}

// Run the automation
buildCompleteWorkflow().catch(console.error); 