#!/usr/bin/env python3

import subprocess
import time
import sys
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def log_info(message):
    print(f"[INFO] {message}")

def log_success(message):
    print(f"[SUCCESS] {message}")

def log_warn(message):
    print(f"[WARN] {message}")

def log_error(message):
    print(f"[ERROR] {message}")

def use_xdotool_vscode_navigation():
    """Use xdotool to navigate VS Code and access performance tools"""
    log_info("🔧 Using xdotool to navigate VS Code...")
    
    try:
        # Find VS Code window
        result = subprocess.run(['xdotool', 'search', '--name', 'Visual Studio Code'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0 and result.stdout.strip():
            window_id = result.stdout.strip().split('\n')[0]
            log_success(f"✅ Found VS Code window: {window_id}")
            
            # Activate VS Code window
            subprocess.run(['xdotool', 'windowactivate', window_id])
            time.sleep(1)
            
            # Open Command Palette (Ctrl+Shift+P)
            log_info("📝 Opening Command Palette...")
            subprocess.run(['xdotool', 'key', 'ctrl+shift+p'])
            time.sleep(2)
            
            # Type command to show running extensions
            log_info("🔍 Searching for 'Show Running Extensions'...")
            subprocess.run(['xdotool', 'type', 'Show Running Extensions'])
            time.sleep(1)
            
            # Press Enter to execute
            subprocess.run(['xdotool', 'key', 'Return'])
            time.sleep(2)
            
            log_success("✅ Opened Running Extensions view")
            
            # Wait a moment then open Process Explorer
            time.sleep(3)
            
            # Open Command Palette again
            subprocess.run(['xdotool', 'key', 'ctrl+shift+p'])
            time.sleep(2)
            
            # Type command for Process Explorer
            log_info("📊 Opening Process Explorer...")
            subprocess.run(['xdotool', 'type', 'Process Explorer'])
            time.sleep(1)
            
            # Press Enter
            subprocess.run(['xdotool', 'key', 'Return'])
            time.sleep(2)
            
            log_success("✅ Opened Process Explorer")
            
            return True
            
        else:
            log_warn("⚠️  VS Code window not found")
            return False
            
    except Exception as e:
        log_error(f"❌ xdotool navigation failed: {e}")
        return False

def use_xdotool_developer_tools():
    """Use xdotool to open Developer Tools in VS Code"""
    log_info("🛠️  Opening Developer Tools with xdotool...")
    
    try:
        # Find VS Code window
        result = subprocess.run(['xdotool', 'search', '--name', 'Visual Studio Code'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0 and result.stdout.strip():
            window_id = result.stdout.strip().split('\n')[0]
            
            # Activate window
            subprocess.run(['xdotool', 'windowactivate', window_id])
            time.sleep(1)
            
            # Use keyboard shortcut for Developer Tools (Ctrl+Shift+I)
            log_info("🔧 Opening Developer Tools (Ctrl+Shift+I)...")
            subprocess.run(['xdotool', 'key', 'ctrl+shift+i'])
            time.sleep(3)
            
            log_success("✅ Developer Tools should be open")
            return True
            
        else:
            log_warn("⚠️  VS Code window not found for Developer Tools")
            return False
            
    except Exception as e:
        log_error(f"❌ Developer Tools opening failed: {e}")
        return False

def check_vscode_processes():
    """Check VS Code processes and their resource usage"""
    log_info("🔍 Analyzing VS Code processes...")
    
    try:
        # Get VS Code processes with detailed info
        result = subprocess.run(['ps', 'aux'], capture_output=True, text=True)
        
        vscode_processes = []
        for line in result.stdout.split('\n'):
            if '/usr/share/code/code' in line:
                parts = line.split()
                if len(parts) >= 11:
                    pid = parts[1]
                    cpu = parts[2]
                    mem = parts[3]
                    command = ' '.join(parts[10:])
                    vscode_processes.append({
                        'pid': pid,
                        'cpu': float(cpu),
                        'mem': float(mem),
                        'command': command
                    })
        
        # Sort by CPU usage
        vscode_processes.sort(key=lambda x: x['cpu'], reverse=True)
        
        log_info(f"📊 Found {len(vscode_processes)} VS Code processes:")
        for i, proc in enumerate(vscode_processes[:10]):  # Top 10
            status = "🔥" if proc['cpu'] > 20 else "✅"
            log_info(f"  {status} PID {proc['pid']}: {proc['cpu']}% CPU, {proc['mem']}% MEM")
            if proc['cpu'] > 20:
                log_warn(f"    High CPU process: {proc['command'][:80]}...")
        
        return vscode_processes
        
    except Exception as e:
        log_error(f"❌ Process analysis failed: {e}")
        return []

def use_dogtail_inspection():
    """Use dogtail to inspect VS Code accessibility tree"""
    log_info("🐕 Using dogtail for accessibility inspection...")
    
    try:
        import dogtail.tree
        import dogtail.predicate
        
        # Find VS Code application
        try:
            vscode_app = dogtail.tree.root.application('code')
            log_success("✅ Found VS Code application via dogtail")
            
            # Try to find menu items or buttons
            try:
                # Look for menu items
                menus = vscode_app.findChildren(dogtail.predicate.GenericPredicate(roleName='menu'))
                log_info(f"📋 Found {len(menus)} menu elements")
                
                # Look for buttons that might be performance-related
                buttons = vscode_app.findChildren(dogtail.predicate.GenericPredicate(roleName='push button'))
                log_info(f"🔘 Found {len(buttons)} button elements")
                
                # Try to find text that might indicate performance tools
                for button in buttons[:10]:  # Check first 10 buttons
                    if hasattr(button, 'name') and button.name:
                        if any(keyword in button.name.lower() for keyword in ['performance', 'process', 'extension', 'developer']):
                            log_info(f"🎯 Found relevant button: {button.name}")
                
                return True
                
            except Exception as e:
                log_warn(f"⚠️  Could not inspect VS Code elements: {e}")
                return False
                
        except Exception as e:
            log_warn(f"⚠️  Could not find VS Code application: {e}")
            return False
            
    except ImportError:
        log_warn("⚠️  dogtail not available - install with: pip install dogtail")
        return False
    except Exception as e:
        log_error(f"❌ dogtail inspection failed: {e}")
        return False

def automated_vscode_inspection():
    """Main automated inspection function"""
    print("=" * 70)
    print("🤖 AUTOMATED VS CODE PERFORMANCE INSPECTION")
    print("=" * 70)
    print("Using: xdotool, dogtail, and process analysis")
    print("Purpose: Check running extensions and monitor performance")
    print("=" * 70)
    print()
    
    # Step 1: Check VS Code processes
    vscode_processes = check_vscode_processes()
    print()
    
    # Step 2: Use xdotool for navigation
    if use_xdotool_vscode_navigation():
        log_success("✅ Successfully navigated to performance tools")
    else:
        log_warn("⚠️  xdotool navigation had issues")
    print()
    
    # Step 3: Open Developer Tools
    if use_xdotool_developer_tools():
        log_success("✅ Developer Tools opened")
    else:
        log_warn("⚠️  Could not open Developer Tools")
    print()
    
    # Step 4: Use dogtail inspection
    if use_dogtail_inspection():
        log_success("✅ dogtail inspection completed")
    else:
        log_warn("⚠️  dogtail inspection had issues")
    print()
    
    # Step 5: Provide manual instructions
    print("📋 MANUAL VERIFICATION STEPS:")
    print("1. Check if 'Running Extensions' tab opened in VS Code")
    print("2. Look for 'Process Explorer' window")
    print("3. Check Developer Tools (F12) for performance tab")
    print("4. Monitor CPU usage in the opened tools")
    print()
    
    # Step 6: High CPU process recommendations
    high_cpu_processes = [p for p in vscode_processes if p['cpu'] > 20]
    if high_cpu_processes:
        print("🔥 HIGH CPU PROCESSES DETECTED:")
        for proc in high_cpu_processes:
            print(f"  PID {proc['pid']}: {proc['cpu']}% CPU")
            if 'zygote' in proc['command']:
                print("    💡 This is likely an extension host process")
                print("    🔧 Check Running Extensions to identify problematic extension")
            elif 'utility' in proc['command']:
                print("    💡 This is a utility process (possibly Node.js service)")
                print("    🔧 Check Process Explorer for details")
        print()
    
    print("=" * 70)
    print("🎯 NEXT STEPS:")
    print("1. Use the opened VS Code tools to identify problematic extensions")
    print("2. Disable high-CPU extensions temporarily")
    print("3. Monitor performance improvement")
    print("4. Re-enable extensions one by one to isolate the issue")
    print("=" * 70)

if __name__ == "__main__":
    automated_vscode_inspection()
