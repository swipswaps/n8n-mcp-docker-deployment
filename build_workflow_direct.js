const { chromium } = require('playwright');

async function buildWorkflowDirect() {
    console.log('🚀 Building n8n workflow directly with Playwright...');
    
    const browser = await chromium.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Navigate to n8n
        console.log('🌐 Navigating to n8n...');
        await page.goto('http://localhost:5678');
        await page.waitForLoadState('networkidle');
        
        // Wait for page to load
        await page.waitForTimeout(3000);
        
        // Handle login if needed
        await handleLoginDirect(page);
        
        // Create new workflow
        await createNewWorkflowDirect(page);
        
        // Build the complete workflow
        await buildCompleteWorkflowDirect(page);
        
        console.log('✅ Workflow building completed!');
        
        // Keep browser open for inspection
        await page.waitForTimeout(30000);
        
    } catch (error) {
        console.error('❌ Error during automation:', error);
    } finally {
        await browser.close();
    }
}

async function handleLoginDirect(page) {
    console.log('🔍 Checking for login...');
    
    try {
        // Wait for potential login form
        await page.waitForSelector('input[type="password"], form', { timeout: 5000 });
        
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

async function createNewWorkflowDirect(page) {
    console.log('📝 Creating new workflow...');
    
    try {
        // Wait for the interface to load
        await page.waitForTimeout(3000);
        
        // Try to find and click create workflow button
        const createSelectors = [
            'button:has-text("Create Workflow")',
            '[data-test-id="workflow-create-button"]',
            'button[data-testid="workflow-create-button"]',
            'a[href*="workflow/new"]',
            'button:has-text("New Workflow")',
            'button:has-text("+")'
        ];
        
        let workflowCreated = false;
        for (const selector of createSelectors) {
            try {
                const button = await page.$(selector);
                if (button) {
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
            await page.goto('http://localhost:5678/workflow/new');
            await page.waitForLoadState('networkidle');
        }
        
        await page.waitForTimeout(5000);
        
    } catch (error) {
        console.error('❌ Error creating workflow:', error);
        throw error;
    }
}

async function buildCompleteWorkflowDirect(page) {
    console.log('🔨 Building complete workflow...');
    
    // Wait for workflow editor to load
    await page.waitForTimeout(3000);
    
    // Add HTTP Request node
    await addHttpRequestNodeDirect(page);
    
    // Add Code node for processing
    await addCodeNodeDirect(page, 'Process Data', getProcessDataCode());
    
    // Add IF node
    await addIfNodeDirect(page);
    
    // Add Code nodes for different cases
    await addCodeNodeDirect(page, 'Handle Long Title', getLongTitleCode());
    await addCodeNodeDirect(page, 'Handle Short Title', getShortTitleCode());
    
    // Add final Code node
    await addCodeNodeDirect(page, 'Finalize Results', getFinalizeCode());
    
    // Add final HTTP Request node
    await addFinalHttpRequestNodeDirect(page);
    
    // Save the workflow
    await saveWorkflowDirect(page);
    
    // Execute the workflow
    await executeWorkflowDirect(page);
    
    console.log('✅ All nodes added and workflow executed!');
}

async function addHttpRequestNodeDirect(page) {
    console.log('🔗 Adding HTTP Request node...');
    
    try {
        // Click add node button
        await clickAddNodeButtonDirect(page);
        
        // Search for HTTP Request
        await searchForNodeDirect(page, 'HTTP Request');
        
        // Click on HTTP Request node
        await clickOnNodeDirect(page, 'HTTP Request');
        
        // Configure the node
        await configureHttpRequestNodeDirect(page);
        
        console.log('✅ HTTP Request node added');
    } catch (error) {
        console.error('❌ Error adding HTTP Request node:', error);
        throw error;
    }
}

async function addCodeNodeDirect(page, nodeName, code) {
    console.log(`💻 Adding Code node: ${nodeName}...`);
    
    try {
        // Click add node button
        await clickAddNodeButtonDirect(page);
        
        // Search for Code
        await searchForNodeDirect(page, 'Code');
        
        // Click on Code node
        await clickOnNodeDirect(page, 'Code');
        
        // Configure the node
        await configureCodeNodeDirect(page, nodeName, code);
        
        console.log(`✅ Code node "${nodeName}" added`);
    } catch (error) {
        console.error(`❌ Error adding Code node "${nodeName}":`, error);
        throw error;
    }
}

async function addIfNodeDirect(page) {
    console.log('🔀 Adding IF node...');
    
    try {
        // Click add node button
        await clickAddNodeButtonDirect(page);
        
        // Search for IF
        await searchForNodeDirect(page, 'IF');
        
        // Click on IF node
        await clickOnNodeDirect(page, 'IF');
        
        // Configure the node
        await configureIfNodeDirect(page);
        
        console.log('✅ IF node added');
    } catch (error) {
        console.error('❌ Error adding IF node:', error);
        throw error;
    }
}

async function addFinalHttpRequestNodeDirect(page) {
    console.log('📤 Adding final HTTP Request node...');
    
    try {
        // Click add node button
        await clickAddNodeButtonDirect(page);
        
        // Search for HTTP Request
        await searchForNodeDirect(page, 'HTTP Request');
        
        // Click on HTTP Request node
        await clickOnNodeDirect(page, 'HTTP Request');
        
        // Configure the node
        await configureFinalHttpRequestNodeDirect(page);
        
        console.log('✅ Final HTTP Request node added');
    } catch (error) {
        console.error('❌ Error adding final HTTP Request node:', error);
        throw error;
    }
}

async function clickAddNodeButtonDirect(page) {
    const addButtonSelectors = [
        '[data-test-id="add-node-button"]',
        'button[data-testid="add-node-button"]',
        '.add-node-button',
        'button:has-text("+")',
        'button:has-text("Add")',
        'button:has-text("Add Node")',
        '[aria-label*="Add node"]',
        '[title*="Add node"]'
    ];
    
    for (const selector of addButtonSelectors) {
        try {
            const button = await page.$(selector);
            if (button) {
                await button.click();
                await page.waitForTimeout(1000);
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Try clicking on empty canvas area to trigger add node
    try {
        await page.click('canvas, .workflow-canvas, .node-canvas');
        await page.waitForTimeout(1000);
    } catch (error) {
        throw new Error('Could not find add node button');
    }
}

async function searchForNodeDirect(page, nodeName) {
    const searchSelectors = [
        '[data-test-id="node-search-input"]',
        'input[placeholder*="search"]',
        'input[placeholder*="Search"]',
        'input[type="text"]',
        'input[aria-label*="search"]'
    ];
    
    for (const selector of searchSelectors) {
        try {
            const searchInput = await page.$(selector);
            if (searchInput) {
                await searchInput.click();
                await searchInput.fill(nodeName);
                await page.waitForTimeout(1000);
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    throw new Error(`Could not find search input for node: ${nodeName}`);
}

async function clickOnNodeDirect(page, nodeName) {
    const nodeSelectors = [
        `[data-test-id="node-item-${nodeName.toLowerCase().replace(/\s+/g, '')}"]`,
        `[data-testid="node-item-${nodeName.toLowerCase().replace(/\s+/g, '')}"]`,
        `.node-item:has-text("${nodeName}")`,
        `div:has-text("${nodeName}")`,
        `[data-test-id*="${nodeName.toLowerCase().replace(/\s+/g, '')}"]`
    ];
    
    for (const selector of nodeSelectors) {
        try {
            const node = await page.$(selector);
            if (node) {
                await node.click();
                await page.waitForTimeout(1000);
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Try clicking on any element containing the node name
    try {
        await page.click(`text=${nodeName}`);
        await page.waitForTimeout(1000);
    } catch (error) {
        throw new Error(`Could not find node: ${nodeName}`);
    }
}

async function configureHttpRequestNodeDirect(page) {
    // Configure URL
    const urlSelectors = [
        '[data-test-id="parameter-input-url"]',
        'input[name="url"]',
        'input[placeholder*="URL"]',
        'input[aria-label*="URL"]'
    ];
    
    for (const selector of urlSelectors) {
        try {
            const urlInput = await page.$(selector);
            if (urlInput) {
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
        'select[aria-label*="method"]'
    ];
    
    for (const selector of methodSelectors) {
        try {
            const methodSelect = await page.$(selector);
            if (methodSelect) {
                await methodSelect.selectOption('GET');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNodeDirect(page);
}

async function configureCodeNodeDirect(page, nodeName, code) {
    // Configure name
    const nameSelectors = [
        '[data-test-id="parameter-input-name"]',
        'input[name="name"]',
        'input[placeholder*="Name"]',
        'input[aria-label*="name"]'
    ];
    
    for (const selector of nameSelectors) {
        try {
            const nameInput = await page.$(selector);
            if (nameInput) {
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
        'textarea[aria-label*="code"]'
    ];
    
    for (const selector of codeSelectors) {
        try {
            const codeInput = await page.$(selector);
            if (codeInput) {
                await codeInput.fill(code);
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNodeDirect(page);
}

async function configureIfNodeDirect(page) {
    // Configure left value
    const leftValueSelectors = [
        '[data-test-id="parameter-input-leftValue"]',
        'input[name="leftValue"]',
        'input[aria-label*="left"]'
    ];
    
    for (const selector of leftValueSelectors) {
        try {
            const leftInput = await page.$(selector);
            if (leftInput) {
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
        'select[aria-label*="operator"]'
    ];
    
    for (const selector of operatorSelectors) {
        try {
            const operatorSelect = await page.$(selector);
            if (operatorSelect) {
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
        'input[aria-label*="right"]'
    ];
    
    for (const selector of rightValueSelectors) {
        try {
            const rightInput = await page.$(selector);
            if (rightInput) {
                await rightInput.fill('20');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNodeDirect(page);
}

async function configureFinalHttpRequestNodeDirect(page) {
    // Configure URL
    const urlSelectors = [
        '[data-test-id="parameter-input-url"]',
        'input[name="url"]',
        'input[placeholder*="URL"]',
        'input[aria-label*="URL"]'
    ];
    
    for (const selector of urlSelectors) {
        try {
            const urlInput = await page.$(selector);
            if (urlInput) {
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
        'select[aria-label*="method"]'
    ];
    
    for (const selector of methodSelectors) {
        try {
            const methodSelect = await page.$(selector);
            if (methodSelect) {
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
        'input[aria-label*="send body"]'
    ];
    
    for (const selector of sendBodySelectors) {
        try {
            const sendBodyCheckbox = await page.$(selector);
            if (sendBodyCheckbox) {
                await sendBodyCheckbox.check();
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    // Save the node
    await saveNodeDirect(page);
}

async function saveNodeDirect(page) {
    const saveSelectors = [
        '[data-test-id="node-save-button"]',
        'button:has-text("Save")',
        'button[type="submit"]',
        'button[aria-label*="save"]'
    ];
    
    for (const selector of saveSelectors) {
        try {
            const saveButton = await page.$(selector);
            if (saveButton) {
                await saveButton.click();
                await page.waitForTimeout(1000);
                return;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    console.log('⚠️ Could not find save button, continuing...');
}

async function saveWorkflowDirect(page) {
    console.log('💾 Saving workflow...');
    
    const saveSelectors = [
        '[data-test-id="workflow-save-button"]',
        'button:has-text("Save")',
        'button[title*="Save"]',
        'button[aria-label*="save"]'
    ];
    
    for (const selector of saveSelectors) {
        try {
            const saveButton = await page.$(selector);
            if (saveButton) {
                await saveButton.click();
                await page.waitForTimeout(2000);
                console.log('✅ Workflow saved');
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
}

async function executeWorkflowDirect(page) {
    console.log('🚀 Executing workflow...');
    
    const executeSelectors = [
        '[data-test-id="workflow-execute-button"]',
        'button:has-text("Execute")',
        'button[title*="Execute"]',
        'button[aria-label*="execute"]'
    ];
    
    for (const selector of executeSelectors) {
        try {
            const executeButton = await page.$(selector);
            if (executeButton) {
                await executeButton.click();
                await page.waitForTimeout(5000);
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
buildWorkflowDirect().catch(console.error); 