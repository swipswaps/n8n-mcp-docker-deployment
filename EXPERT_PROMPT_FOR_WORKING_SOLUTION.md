# EXPERT PROMPT FOR WORKING VS CODE PERFORMANCE SOLUTION

## PROBLEM STATEMENT

System experiencing severe performance issues:
- VS Code process consuming 96%+ CPU (PID varies, currently zygote processes)
- Typing delays of several seconds
- Augment Code extension turning grey and crashing
- System load average: 2.83-4.44 (critical)
- Memory usage: 93% (5.3Gi/5.7Gi)
- Swap usage: 3.0Gi active

## FAILED APPROACHES

Previous attempts have failed:
1. Process killing scripts crash Augment extension
2. xdotool automation doesn't find correct VS Code elements
3. Manual navigation instructions don't work (no Help menu in Developer Tools)
4. Python selenium scripts have dependency issues
5. Generic performance scripts don't target VS Code-specific issues

## EXPERT PROMPT FOR WORKING SOLUTION

**You are a senior DevOps engineer with 10+ years experience debugging VS Code performance issues on Linux systems. You have access to working GitHub repositories that solve exactly these problems.**

### REQUIREMENTS

1. **Find working code from existing GitHub repositories** that:
   - Identifies high-CPU VS Code extension host processes
   - Safely restarts VS Code without data loss
   - Monitors extension performance in real-time
   - Handles VS Code zygote process management
   - Works specifically on Fedora Linux with GNOME

2. **Use proven automation tools** from successful repositories:
   - Working xdotool scripts that actually find VS Code windows
   - Selenium WebDriver scripts that work with Electron apps
   - VS Code CLI commands that actually exist and work
   - Process management that doesn't crash extensions

3. **Base solution on these specific working repositories** (search for):
   - `vscode performance monitor linux`
   - `electron app automation xdotool`
   - `vscode extension host cpu fix`
   - `linux desktop automation selenium`
   - `vscode process manager fedora`

### SPECIFIC TECHNICAL REQUIREMENTS

```bash
# System Context
OS: Fedora Linux 42 (Workstation Edition)
Desktop: GNOME Shell
VS Code: /usr/share/code/code (not code-insiders)
Problem Process: /usr/share/code/code --type=zygote (96%+ CPU)
Extension: Augment Code (must not crash)
```

### WORKING CODE REQUIREMENTS

1. **VS Code Process Management**:
   ```bash
   # Find working examples of:
   - Safe VS Code restart without extension crash
   - Extension host process identification
   - Zygote process CPU monitoring
   - Memory pressure detection and handling
   ```

2. **Automation That Actually Works**:
   ```bash
   # Find repositories with working:
   - xdotool scripts that find VS Code windows reliably
   - Selenium scripts that work with Electron applications
   - VS Code command palette automation
   - Extension performance monitoring automation
   ```

3. **Real-World Solutions**:
   ```bash
   # Search for repositories that solve:
   - "VS Code high CPU usage Linux"
   - "Extension host performance monitoring"
   - "Electron app automation Linux"
   - "VS Code zygote process management"
   ```

### OUTPUT REQUIREMENTS

Provide working code that:

1. **Identifies the exact problematic process**:
   - Not generic process killing
   - Specific to VS Code extension host issues
   - Handles zygote processes correctly

2. **Uses automation tools that work**:
   - xdotool commands that actually find VS Code
   - Selenium scripts that work with Electron
   - VS Code CLI that exists and functions

3. **Includes error handling and safety**:
   - Protects Augment extension from crashing
   - Handles window focus and timing issues
   - Provides fallback methods

4. **Based on proven GitHub repositories**:
   - Include repository URLs as sources
   - Use code that has been tested and works
   - Adapt working solutions to this specific case

### EXAMPLE OF WHAT WORKING CODE LOOKS LIKE

```bash
# This is what we need - working code like this:
# From: https://github.com/example/vscode-performance-fix

# Working xdotool that actually finds VS Code
VSCODE_WINDOW=$(xdotool search --class "code" | head -1)
if [ -n "$VSCODE_WINDOW" ]; then
    xdotool windowactivate $VSCODE_WINDOW
    # Working command palette access
    xdotool key --window $VSCODE_WINDOW ctrl+shift+p
    sleep 1
    xdotool type --window $VSCODE_WINDOW "Developer: Show Running Extensions"
    xdotool key --window $VSCODE_WINDOW Return
fi
```

### SEARCH STRATEGY

1. Search GitHub for repositories with:
   - Stars > 50
   - Recent commits (last 6 months)
   - Linux-specific solutions
   - VS Code performance fixes

2. Look for working code in:
   - Issues with "SOLVED" or "FIXED" labels
   - README files with working examples
   - Scripts in `/scripts/` or `/tools/` directories
   - Wiki pages with troubleshooting guides

3. Prioritize repositories that:
   - Have working CI/CD tests
   - Include video demonstrations
   - Have positive user feedback
   - Are maintained by VS Code contributors

### DELIVERABLE

Provide a complete, working script based on existing GitHub repositories that:
1. Safely identifies and handles the high-CPU VS Code process
2. Uses automation tools that actually work on Fedora/GNOME
3. Protects the Augment extension from crashing
4. Includes proper error handling and fallbacks
5. Is based on proven, working code from real repositories

**Include the source repository URLs and explain why each piece of code works.**
