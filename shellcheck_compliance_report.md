# ShellCheck Compliance Report

## Issues Found

The following shell scripts need ShellCheck compliance fixes:

### Common Issues to Fix:
1. **SC2086**: Quote variables to prevent word splitting
2. **SC2034**: Remove unused variables
3. **SC2155**: Declare and assign separately
4. **SC2164**: Use `cd ... || exit` for error handling

### Recommended Fixes:
- Add `set -euo pipefail` to all scripts
- Quote all variable expansions: `"$variable"`
- Use `|| exit` after `cd` commands
- Remove or prefix unused variables with underscore

### Scripts Requiring Attention:
- ./view-logs.sh
- ./logs/vscode_augment_grey_window_logs_2025_07_16_10_14_00.txt.sh
- ./logs/vscode_augment_grey_window_logs_2025_07_16_10_40_00.txt.sh
- ./start-n8n-mcp.sh
- ./fix-n8n-mcp-container-test.sh
- ./system_performance_resolver.sh
- ./augment_safe_performance_fix.sh
- ./xdotool_vscode_inspector.sh
- ./deploy-repository.sh
- ./install-test-n8n-mcp-docker.sh
- ./working_vscode_performance_fix.sh
- ./fix_github_security_warnings.sh
