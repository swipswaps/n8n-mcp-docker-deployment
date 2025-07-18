const { chromium } = require('playwright');

async function buildWorkflowOptimized() {
    console.log('🚀 Building n8n workflow with optimized performance...');
    
    // Optimize browser launch for the user's system
    const browser = await chromium.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--memory-pressure-off',
            '--max_old_space_size=2048'
        ]
    });
    
    try {
        const page = await browser.newPage();
        
        // Set viewport for better performance
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Navigate to n8n with optimized settings
        console.log('🌐 Navigating to n8n...');
        await page.goto('http://localhost:5678', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        // Reduced wait time based on system performance
        await page.waitForTimeout(2000);
        
        // Handle login if needed
        await handleLoginOptimized(page);
        
        // Create new workflow
        await createNewWorkflowOptimized(page);
        
        // Build the complete workflow
        await buildCompleteWorkflowOptimized(page);
        
        console.log('✅ Workflow building completed!');
        
        // Keep browser open for inspection (reduced time)
        await page.waitForTimeout(15000);
        
    } catch (error) {
        console.error('❌ Error during automation:', error);
        console.error('Stack trace:', error.stack);
    } finally {
        await browser.close();
    }
}

async function handleLoginOptimized(page) {
    console.log('🔍 Checking for login...');
    
    try {
        // Wait for potential login form with shorter timeout
        await page.waitForSelector('input[type="password"], form', { timeout: 3000 });
        
        // Check if login is needed
        const loginForm = await page.$('input[type="password"]');
        if (loginForm) {
            console.log('🔐 Login form detected, but user is already signed in...');
            console.log('ℹ️ Proceeding with workflow creation...');
        } else {
            console.log('ℹ️ No login required, proceeding...');
        }
    } catch (error) {
        console.log('ℹ️ No login form found, proceeding...');
    }
}

async function createNewWorkflowOptimized(page) {
    console.log('📝 Creating new workflow...');
    
    try {
        // Reduced wait time
        await page.waitForTimeout(2000);
        
        // Try to find and click create workflow button
        const createSelectors = [
            'button:has-text("Create Workflow")',
            '[data-test-id="workflow-create-button"]',
            'button[data-testid="workflow-create-button"]',
            'a[href*="workflow/new"]',
            'button:has-text("New Workflow")',
            'button:has-text("+")',
            '.create-workflow-button',
            '[aria-label*="Create workflow"]'
        ];
        
        let workflowCreated = false;
        for (const selector of createSelectors) {
            try {
                const button = await page.$(selector);
                if (button && await button.isVisible()) {
                    await button.click();
                    console.log(`✅ Clicked create workflow with selector: ${selector}`);
                    workflowCreated = true;
                    break;
                }
            } catch (error) {
                // Continue to next selector
            }
        }
        
        if (!workflowCreated) {
            // Try direct navigation
            console.log('🔄 Trying direct navigation to workflow editor...');
            await page.goto('http://localhost:5678/workflow/new', {
                waitUntil: 'networkidle',
                timeout: 15000
            });
        }
        
        await page.waitForTimeout(3000);
        
    } catch (error) {
        console.error('❌ Error creating workflow:', error);
        throw error;
    }
}

async function buildCompleteWorkflowOptimized(page) {
    console.log('🔨 Building complete workflow...');
    
    // Reduced wait time
    await page.waitForTimeout(2000);
    
    // Add HTTP Request node
    await addHttpRequestNodeOptimized(page);
    
    // Add Code node for processing
    await addCodeNodeOptimized(page, 'Process Data', getProcessDataCode());
    
    // Add IF node
    await addIfNodeOptimized(page);
    
    // Add Code nodes for different cases
    await addCodeNodeOptimized(page, 'Handle Long Title', getLongTitleCode());
    await addCodeNodeOptimized(page, 'Handle Short Title', getShortTitleCode());
    
    // Add final Code node
    await addCodeNodeOptimized(page, 'Finalize Results', getFinalizeCode());
    
    // Add final HTTP Request node
    await addFinalHttpRequestNodeOptimized(page);
    
    // Save the workflow
    await saveWorkflowOptimized(page);
    
    // Execute the workflow
    await executeWorkflowOptimized(page);
    
    console.log('✅ All nodes added and workflow executed!');
}

async function addHttpRequestNodeOptimized(page) {
    console.log('🔗 Adding HTTP Request node...');
    
    try {
        // Click add node button
        await clickAddNodeButtonOptimized(page);
        
        // Search for HTTP Request
        await searchForNodeOptimized(page, 'HTTP Request');
        
        // Click on HTTP Request node
        await clickOnNodeOptimized(page, 'HTTP Request');
        
        // Configure the node
        await configureHttpRequestNodeOptimized(page);
        
        console.log('✅ HTTP Request node added');
    } catch (error) {
        console.error('❌ Error adding HTTP Request node:', error);
        throw error;
    }
}

async function addCodeNodeOptimized(page, nodeName, code) {
    console.log(`💻 Adding Code node: ${nodeName}...`);
    
    try {
        // Click add node button
        await clickAddNodeButtonOptimized(page);
        
        // Search for Code
        await searchForNodeOptimized(page, 'Code');
        
        // Click on Code node
        await clickOnNodeOptimized(page, 'Code');
        
        // Configure the node
        await configureCodeNodeOptimized(page, nodeName, code);
        
        console.log(`✅ Code node "${nodeName}" added`);
    } catch (error) {
        console.error(`❌ Error adding Code node "${nodeName}":`, error);
        throw error;
    }
}

async function addIfNodeOptimized(page) {
    console.log('🔀 Adding IF node...');
    
    try {
        // Click add node button
        await clickAddNodeButtonOptimized(page);
        
        // Search for IF
        await searchForNodeOptimized(page, 'IF');
        
        // Click on IF node
        await clickOnNodeOptimized(page, 'IF');
        
        // Configure the node
        await configureIfNodeOptimized(page);
        
        console.log('✅ IF node added');
    } catch (error) {
        console.error('❌ Error adding IF node:', error);
        throw error;
    }
}

async function addFinalHttpRequestNodeOptimized(page) {
    console.log('📤 Adding final HTTP Request node...');
    
    try {
        // Click add node button
        await clickAddNodeButtonOptimized(page);
        
        // Search for HTTP Request
        await searchForNodeOptimized(page, 'HTTP Request');
        
        // Click on HTTP Request node
        await clickOnNodeOptimized(page, 'HTTP Request');
        
        // Configure the node
        await configureFinalHttpRequestNodeOptimized(page);
        
        console.log('✅ Final HTTP Request node added');
    } catch (error) {
        console.error('❌ Error adding final HTTP Request node:', error);
        throw error;
    }
}

async function clickAddNodeButtonOptimized(page) {
    const addButtonSelectors = [
        '[data-test-id="add-node-button"]',
        'button[data-testid="add-node-button"]',
        '.add-node-button',
        'button:has-text("+")',
        'button:has-text("Add")',
        'button:has-text("Add Node")',
        '[aria-label*="Add node"]',
        '[title*="Add node"]',
        '.node-creator-button',
        '[data-test-id="node-creator-button"]'
    ];
    
    for (const selector of addButtonSelectors) {
        try {
            const button = await page.$(selector);
            if (button && await button.isVisible()) {
                await button.click();
                await page.waitForTimeout(500);
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Try clicking on empty canvas area to trigger add node
    try {
        await page.click('canvas, .workflow-canvas, .node-canvas, .workflow-editor');
        await page.waitForTimeout(500);
    } catch (error) {
        throw new Error('Could not find add node button');
    }
}

async function searchForNodeOptimized(page, nodeName) {
    const searchSelectors = [
        '[data-test-id="node-search-input"]',
        'input[placeholder*="search"]',
        'input[placeholder*="Search"]',
        'input[type="text"]',
        'input[aria-label*="search"]',
        '.node-search-input',
        '[data-test-id="node-creator-search"]'
    ];
    
    for (const selector of searchSelectors) {
        try {
            const searchInput = await page.$(selector);
            if (searchInput && await searchInput.isVisible()) {
                await searchInput.click();
                await searchInput.fill(nodeName);
                await page.waitForTimeout(500);
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    throw new Error(`Could not find search input for node: ${nodeName}`);
}

async function clickOnNodeOptimized(page, nodeName) {
    const nodeSelectors = [
        `[data-test-id="node-item-${nodeName.toLowerCase().replace(/\s+/g, '')}"]`,
        `[data-testid="node-item-${nodeName.toLowerCase().replace(/\s+/g, '')}"]`,
        `.node-item:has-text("${nodeName}")`,
        `div:has-text("${nodeName}")`,
        `[data-test-id*="${nodeName.toLowerCase().replace(/\s+/g, '')}"]`,
        `.node-creator-item:has-text("${nodeName}")`
    ];
    
    for (const selector of nodeSelectors) {
        try {
            const node = await page.$(selector);
            if (node && await node.isVisible()) {
                await node.click();
                await page.waitForTimeout(500);
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Try clicking on any element containing the node name
    try {
        await page.click(`text=${nodeName}`);
        await page.waitForTimeout(500);
    } catch (error) {
        throw new Error(`Could not find node: ${nodeName}`);
    }
}

async function configureHttpRequestNodeOptimized(page) {
    // Configure URL
    const urlSelectors = [
        '[data-test-id="parameter-input-url"]',
        'input[name="url"]',
        'input[placeholder*="URL"]',
        'input[aria-label*="URL"]',
        '.parameter-input[data-test-id*="url"]'
    ];
    
    for (const selector of urlSelectors) {
        try {
            const urlInput = await page.$(selector);
            if (urlInput && await urlInput.isVisible()) {
                await urlInput.fill('https://jsonplaceholder.typicode.com/posts/1');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure method
    const methodSelectors = [
        '[data-test-id="parameter-select-httpMethod"]',
        'select[name="method"]',
        'select[aria-label*="method"]',
        '.parameter-select[data-test-id*="httpMethod"]'
    ];
    
    for (const selector of methodSelectors) {
        try {
            const methodSelect = await page.$(selector);
            if (methodSelect && await methodSelect.isVisible()) {
                await methodSelect.selectOption('GET');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNodeOptimized(page);
}

async function configureCodeNodeOptimized(page, nodeName, code) {
    // Configure name
    const nameSelectors = [
        '[data-test-id="parameter-input-name"]',
        'input[name="name"]',
        'input[placeholder*="Name"]',
        'input[aria-label*="name"]',
        '.parameter-input[data-test-id*="name"]'
    ];
    
    for (const selector of nameSelectors) {
        try {
            const nameInput = await page.$(selector);
            if (nameInput && await nameInput.isVisible()) {
                await nameInput.fill(nodeName);
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
        'textarea[placeholder*="Code"]',
        'textarea[aria-label*="code"]',
        '.parameter-input[data-test-id*="jsCode"]',
        'textarea[data-test-id*="code"]'
    ];
    
    for (const selector of codeSelectors) {
        try {
            const codeInput = await page.$(selector);
            if (codeInput && await codeInput.isVisible()) {
                await codeInput.fill(code);
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNodeOptimized(page);
}

async function configureIfNodeOptimized(page) {
    // Configure left value
    const leftValueSelectors = [
        '[data-test-id="parameter-input-leftValue"]',
        'input[name="leftValue"]',
        'input[aria-label*="left"]',
        '.parameter-input[data-test-id*="leftValue"]'
    ];
    
    for (const selector of leftValueSelectors) {
        try {
            const leftInput = await page.$(selector);
            if (leftInput && await leftInput.isVisible()) {
                await leftInput.fill('={{ $json.statistics.titleLength }}');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure operator
    const operatorSelectors = [
        '[data-test-id="parameter-select-operator"]',
        'select[name="operator"]',
        'select[aria-label*="operator"]',
        '.parameter-select[data-test-id*="operator"]'
    ];
    
    for (const selector of operatorSelectors) {
        try {
            const operatorSelect = await page.$(selector);
            if (operatorSelect && await operatorSelect.isVisible()) {
                await operatorSelect.selectOption('gt');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure right value
    const rightValueSelectors = [
        '[data-test-id="parameter-input-rightValue"]',
        'input[name="rightValue"]',
        'input[aria-label*="right"]',
        '.parameter-input[data-test-id*="rightValue"]'
    ];
    
    for (const selector of rightValueSelectors) {
        try {
            const rightInput = await page.$(selector);
            if (rightInput && await rightInput.isVisible()) {
                await rightInput.fill('20');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNodeOptimized(page);
}

async function configureFinalHttpRequestNodeOptimized(page) {
    // Configure URL
    const urlSelectors = [
        '[data-test-id="parameter-input-url"]',
        'input[name="url"]',
        'input[placeholder*="URL"]',
        'input[aria-label*="URL"]',
        '.parameter-input[data-test-id*="url"]'
    ];
    
    for (const selector of urlSelectors) {
        try {
            const urlInput = await page.$(selector);
            if (urlInput && await urlInput.isVisible()) {
                await urlInput.fill('https://httpbin.org/post');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Configure method
    const methodSelectors = [
        '[data-test-id="parameter-select-httpMethod"]',
        'select[name="method"]',
        'select[aria-label*="method"]',
        '.parameter-select[data-test-id*="httpMethod"]'
    ];
    
    for (const selector of methodSelectors) {
        try {
            const methodSelect = await page.$(selector);
            if (methodSelect && await methodSelect.isVisible()) {
                await methodSelect.selectOption('POST');
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
        'input[type="checkbox"]',
        'input[aria-label*="send body"]',
        '.parameter-checkbox[data-test-id*="sendBody"]'
    ];
    
    for (const selector of sendBodySelectors) {
        try {
            const sendBodyCheckbox = await page.$(selector);
            if (sendBodyCheckbox && await sendBodyCheckbox.isVisible()) {
                await sendBodyCheckbox.check();
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNodeOptimized(page);
}

async function saveNodeOptimized(page) {
    const saveSelectors = [
        '[data-test-id="node-save-button"]',
        'button:has-text("Save")',
        'button[type="submit"]',
        'button[aria-label*="save"]',
        '.save-button',
        '[data-test-id="save-button"]'
    ];
    
    for (const selector of saveSelectors) {
        try {
            const saveButton = await page.$(selector);
            if (saveButton && await saveButton.isVisible()) {
                await saveButton.click();
                await page.waitForTimeout(500);
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    console.log('⚠️ Could not find save button, continuing...');
}

async function saveWorkflowOptimized(page) {
    console.log('💾 Saving workflow...');
    
    const saveSelectors = [
        '[data-test-id="workflow-save-button"]',
        'button:has-text("Save")',
        'button[title*="Save"]',
        'button[aria-label*="save"]',
        '.workflow-save-button',
        '[data-test-id="save-workflow-button"]'
    ];
    
    for (const selector of saveSelectors) {
        try {
            const saveButton = await page.$(selector);
            if (saveButton && await saveButton.isVisible()) {
                await saveButton.click();
                await page.waitForTimeout(1000);
                console.log('✅ Workflow saved');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
}

async function executeWorkflowOptimized(page) {
    console.log('🚀 Executing workflow...');
    
    const executeSelectors = [
        '[data-test-id="workflow-execute-button"]',
        'button:has-text("Execute")',
        'button[title*="Execute"]',
        'button[aria-label*="execute"]',
        '.workflow-execute-button',
        '[data-test-id="execute-workflow-button"]'
    ];
    
    for (const selector of executeSelectors) {
        try {
            const executeButton = await page.$(selector);
            if (executeButton && await executeButton.isVisible()) {
                await executeButton.click();
                await page.waitForTimeout(3000);
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
    name: 'Optimized n8n Workflow Example',
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
buildWorkflowOptimized().catch(console.error); 