const puppeteer = require('puppeteer');

async function buildRobustWorkflow() {
    console.log('🚀 Starting robust n8n workflow builder...');
    
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--disable-dev-shm-usage'
        ]
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
        await handleLoginRobust(page);
        
        // Create new workflow
        await createNewWorkflowRobust(page);
        
        // Build the workflow step by step
        await buildWorkflowStepByStep(page);
        
        console.log('✅ Workflow building completed!');
        console.log('🔍 Browser will remain open for inspection.');
        console.log('📖 Check the workflow in the browser and execute it manually.');
        
        // Keep browser open for inspection
        await new Promise(resolve => setTimeout(resolve, 180000)); // Wait 3 minutes
        
    } catch (error) {
        console.error('❌ Error during automation:', error);
    } finally {
        await browser.close();
    }
}

async function handleLoginRobust(page) {
    console.log('🔍 Checking for login...');
    
    try {
        // Wait a bit for the page to fully load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Check for various login indicators
        const loginIndicators = [
            'input[type="password"]',
            'input[name="password"]',
            'form',
            'button[type="submit"]'
        ];
        
        let loginFound = false;
        for (const indicator of loginIndicators) {
            try {
                const element = await page.$(indicator);
                if (element) {
                    loginFound = true;
                    break;
                }
            } catch (error) {
                // Continue to next indicator
            }
        }
        
        if (loginFound) {
            console.log('🔐 Login form detected, attempting to login...');
            
            // Try to find username and password fields with multiple selectors
            const usernameSelectors = [
                'input[name="username"]',
                'input[type="text"]',
                'input[placeholder*="user"]',
                'input[placeholder*="User"]',
                'input[id*="username"]',
                'input[id*="user"]'
            ];
            
            const passwordSelectors = [
                'input[name="password"]',
                'input[type="password"]',
                'input[placeholder*="pass"]',
                'input[placeholder*="Pass"]',
                'input[id*="password"]',
                'input[id*="pass"]'
            ];
            
            let usernameField = null;
            let passwordField = null;
            
            // Find username field
            for (const selector of usernameSelectors) {
                try {
                    usernameField = await page.$(selector);
                    if (usernameField) {
                        console.log(`✅ Found username field with selector: ${selector}`);
                        break;
                    }
                } catch (error) {
                    // Continue to next selector
                }
            }
            
            // Find password field
            for (const selector of passwordSelectors) {
                try {
                    passwordField = await page.$(selector);
                    if (passwordField) {
                        console.log(`✅ Found password field with selector: ${selector}`);
                        break;
                    }
                } catch (error) {
                    // Continue to next selector
                }
            }
            
            if (usernameField && passwordField) {
                await usernameField.type('admin');
                await passwordField.type('password');
                
                // Find and click submit button
                const submitSelectors = [
                    'button[type="submit"]',
                    'input[type="submit"]',
                    'button:contains("Login")',
                    'button:contains("Sign In")',
                    'button:contains("Submit")',
                    'button:contains("Log in")'
                ];
                
                for (const selector of submitSelectors) {
                    try {
                        const submitButton = await page.$(selector);
                        if (submitButton) {
                            await submitButton.click();
                            console.log('✅ Clicked submit button');
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            break;
                        }
                    } catch (error) {
                        // Continue to next selector
                    }
                }
            } else {
                console.log('⚠️ Could not find login fields, proceeding anyway...');
            }
        } else {
            console.log('ℹ️ No login form found, proceeding...');
        }
    } catch (error) {
        console.log('ℹ️ No login required, proceeding...');
    }
}

async function createNewWorkflowRobust(page) {
    console.log('📝 Creating new workflow...');
    
    try {
        // Wait for the main interface to load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Try multiple approaches to create a new workflow
        const createApproaches = [
            // Approach 1: Look for create workflow button
            async () => {
                const createSelectors = [
                    'button:contains("Create Workflow")',
                    '[data-test-id="workflow-create-button"]',
                    'button[data-testid="workflow-create-button"]',
                    'a[href*="workflow/new"]',
                    'button:contains("New Workflow")',
                    'button:contains("+")'
                ];
                
                for (const selector of createSelectors) {
                    try {
                        const button = await page.$(selector);
                        if (button) {
                            await button.click();
                            console.log(`✅ Clicked create workflow with selector: ${selector}`);
                            return true;
                        }
                    } catch (error) {
                        // Continue to next selector
                    }
                }
                return false;
            },
            
            // Approach 2: Direct navigation
            async () => {
                console.log('🔄 Trying direct navigation to workflow editor...');
                await page.goto('http://localhost:5678/workflow/new', { waitUntil: 'networkidle2' });
                return true;
            },
            
            // Approach 3: Look for any workflow-related button
            async () => {
                const allButtons = await page.$$('button, a');
                for (const button of allButtons) {
                    try {
                        const text = await button.evaluate(el => el.textContent);
                        if (text && (text.includes('Create') || text.includes('New') || text.includes('Workflow'))) {
                            await button.click();
                            console.log(`✅ Clicked button with text: ${text}`);
                            return true;
                        }
                    } catch (error) {
                        // Continue to next button
                    }
                }
                return false;
            }
        ];
        
        let workflowCreated = false;
        for (const approach of createApproaches) {
            try {
                workflowCreated = await approach();
                if (workflowCreated) {
                    break;
                }
            } catch (error) {
                console.log(`⚠️ Approach failed: ${error.message}`);
            }
        }
        
        if (!workflowCreated) {
            console.log('⚠️ Could not create workflow automatically');
            console.log('💡 Please create a new workflow manually in the browser');
        }
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
    } catch (error) {
        console.error('❌ Error creating workflow:', error);
    }
}

async function buildWorkflowStepByStep(page) {
    console.log('🔨 Building workflow step by step...');
    
    // Wait for workflow editor to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('📋 Manual steps to complete the workflow:');
    console.log('');
    console.log('1. 🔗 Add HTTP Request node:');
    console.log('   - Look for a + button or "Add Node" button');
    console.log('   - Search for "HTTP Request"');
    console.log('   - Configure URL: https://jsonplaceholder.typicode.com/posts/1');
    console.log('   - Set method to GET');
    console.log('');
    console.log('2. 💻 Add Code node:');
    console.log('   - Click + button again');
    console.log('   - Search for "Code"');
    console.log('   - Add this JavaScript:');
    console.log('     const data = $input.first().json;');
    console.log('     return [{ json: { processed: data, timestamp: new Date().toISOString() } }];');
    console.log('');
    console.log('3. 🔀 Add IF node:');
    console.log('   - Click + button again');
    console.log('   - Search for "IF"');
    console.log('   - Set condition: {{ $json.processed.title.length > 20 }}');
    console.log('');
    console.log('4. 📤 Add another HTTP Request node:');
    console.log('   - Click + button again');
    console.log('   - Search for "HTTP Request"');
    console.log('   - Configure URL: https://httpbin.org/post');
    console.log('   - Set method to POST');
    console.log('   - Enable "Send Body"');
    console.log('   - Add body parameter: workflow_result = {{ $json }}');
    console.log('');
    console.log('5. 💾 Save the workflow');
    console.log('6. 🚀 Execute the workflow');
    console.log('');
    console.log('🔍 The browser is now open for you to complete these steps.');
    console.log('📖 Check MANUAL_WORKFLOW_BUILD_GUIDE.md for detailed instructions.');
    
    // Try to help by taking a screenshot
    try {
        await page.screenshot({ path: 'n8n_workflow_editor.png' });
        console.log('📸 Screenshot saved as n8n_workflow_editor.png');
    } catch (error) {
        console.log('⚠️ Could not take screenshot');
    }
}

// Run the automation
buildRobustWorkflow().catch(console.error); 