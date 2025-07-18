const puppeteer = require('puppeteer');

async function buildSimpleWorkflow() {
    console.log('🚀 Starting simple n8n workflow builder...');
    
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    
    try {
        const page = await browser.newPage();
        
        // Navigate to n8n
        console.log('🌐 Navigating to n8n...');
        await page.goto('http://localhost:5678', { waitUntil: 'networkidle2' });
        
        // Wait for page to load
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Check if we need to login
        console.log('🔍 Checking for login form...');
        const loginForm = await page.$('form');
        if (loginForm) {
            console.log('🔐 Found login form, attempting to login...');
            
            // Try different selectors for username and password
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
                usernameField = await page.$(selector);
                if (usernameField) {
                    console.log(`✅ Found username field with selector: ${selector}`);
                    break;
                }
            }
            
            // Find password field
            for (const selector of passwordSelectors) {
                passwordField = await page.$(selector);
                if (passwordField) {
                    console.log(`✅ Found password field with selector: ${selector}`);
                    break;
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
                    'button:contains("Submit")'
                ];
                
                for (const selector of submitSelectors) {
                    const submitButton = await page.$(selector);
                    if (submitButton) {
                        await submitButton.click();
                        console.log('✅ Clicked submit button');
                        break;
                    }
                }
                
                await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
                console.log('⚠️ Could not find login fields, proceeding anyway...');
            }
        }
        
        // Wait for main interface
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Try to navigate to create workflow
        console.log('📝 Attempting to create new workflow...');
        
        // Try different approaches to create workflow
        const createWorkflowSelectors = [
            'button:contains("Create Workflow")',
            'a[href*="workflow/new"]',
            '[data-test-id="workflow-create-button"]',
            'button[data-testid="workflow-create-button"]'
        ];
        
        let workflowCreated = false;
        for (const selector of createWorkflowSelectors) {
            try {
                const createButton = await page.$(selector);
                if (createButton) {
                    await createButton.click();
                    console.log(`✅ Clicked create workflow button with selector: ${selector}`);
                    workflowCreated = true;
                    break;
                }
            } catch (error) {
                console.log(`❌ Failed with selector: ${selector}`);
            }
        }
        
        if (!workflowCreated) {
            console.log('⚠️ Could not find create workflow button, trying direct navigation...');
            await page.goto('http://localhost:5678/workflow/new', { waitUntil: 'networkidle2' });
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
        // Wait for workflow editor to load
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        console.log('🎉 Workflow editor should now be open!');
        console.log('📋 Manual steps to complete the workflow:');
        console.log('');
        console.log('1. 🔗 Add HTTP Request node:');
        console.log('   - Click the + button');
        console.log('   - Search for "HTTP Request"');
        console.log('   - Configure URL: https://jsonplaceholder.typicode.com/posts/1');
        console.log('   - Set method to GET');
        console.log('');
        console.log('2. 💻 Add Code node:');
        console.log('   - Click the + button');
        console.log('   - Search for "Code"');
        console.log('   - Add this JavaScript:');
        console.log('     const data = $input.first().json;');
        console.log('     return [{ json: { processed: data, timestamp: new Date().toISOString() } }];');
        console.log('');
        console.log('3. 🔀 Add IF node:');
        console.log('   - Click the + button');
        console.log('   - Search for "IF"');
        console.log('   - Set condition: {{ $json.processed.title.length > 20 }}');
        console.log('');
        console.log('4. 📤 Add another HTTP Request node:');
        console.log('   - Click the + button');
        console.log('   - Search for "HTTP Request"');
        console.log('   - Configure URL: https://httpbin.org/post');
        console.log('   - Set method to POST');
        console.log('   - Enable "Send Body"');
        console.log('   - Add body parameter: workflow_result = {{ $json }}');
        console.log('');
        console.log('5. 💾 Save the workflow');
        console.log('6. 🚀 Execute the workflow');
        console.log('');
        console.log('🔍 Browser will remain open for you to complete these steps manually.');
        console.log('📖 Check the WORKFLOW_USAGE_GUIDE.md for detailed instructions.');
        
        // Keep browser open for manual completion
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute
        
    } catch (error) {
        console.error('❌ Error during automation:', error);
    } finally {
        await browser.close();
    }
}

// Run the automation
buildSimpleWorkflow().catch(console.error); 