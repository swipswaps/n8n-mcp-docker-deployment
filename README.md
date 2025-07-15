# n8n-mcp Docker Deployment

🚀 **One-command automated installation** of n8n-mcp with Augment Code integration.

## Quick Start

```bash
git clone https://github.com/swipswaps/n8n-mcp-docker-deployment.git
cd n8n-mcp-docker-deployment
./install-test-n8n-mcp-docker.sh
```

**That's it!** The script automatically handles everything:
- ✅ **Zero manual steps** - Complete automation including Augment Code installation
- ✅ **Self-healing** - Automatic error recovery for all components
- ✅ **Comprehensive testing** - 12-test validation suite ensures everything works
- ✅ **Multi-platform** - Fedora, Ubuntu, Debian, Arch Linux support
- ✅ **Fast installation** - Optimized for 5-7 minute completion time

## Installation Options

```bash
# Standard installation (interactive)
./install-test-n8n-mcp-docker.sh

# Silent mode (zero interaction)
./install-test-n8n-mcp-docker.sh --silent

# Preview mode (see what will be done)
./install-test-n8n-mcp-docker.sh --dry-run
```

## What It Does

Deploys [n8n-mcp](https://github.com/czlonkowski/n8n-mcp) - a Model Context Protocol server that bridges n8n workflow automation with AI assistants like Augment Code.

## Key Features

- 🚀 **Complete automation** - Installs all dependencies with IDE extension support
- 🛡️ **Self-healing** - Automatically recovers from errors with multiple strategies
- 🧪 **Comprehensive testing** - 12-test validation ensures reliability
- 🔧 **Multi-platform** - Works on Fedora, Ubuntu, Debian, Arch Linux
- ⚡ **Real-time feedback** - Live progress indicators prevent stalling confusion
- 📊 **Professional UX** - Transparent operation with comprehensive error guidance
- 🎯 **Augment Rules compliant** - Official documentation and verified sources only
- 🔄 **Never-fail execution** - Always provides actionable guidance

## Advanced Usage

```bash
./install-test-n8n-mcp-docker.sh --help     # Show all options
./install-test-n8n-mcp-docker.sh --silent   # Zero interaction mode
./install-test-n8n-mcp-docker.sh --dry-run  # Preview actions
./install-test-n8n-mcp-docker.sh --cleanup  # Remove installation
```

## After Installation

1. **Restart Augment Code** to load the new configuration
2. **Test the integration** by asking: *"Show me available n8n workflow nodes"*
3. **Create workflows** using n8n-mcp tools in Augment Code

## Documentation

For detailed information, see:
- **[USER_GUIDE.md](USER_GUIDE.md)** - Complete installation guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and features

## Support

- **Troubleshooting**: Run with `--verbose` for detailed output
- **Issues**: Check logs in `/tmp/n8n-mcp-logs-[timestamp]/`
- **Cleanup**: Use `--cleanup` to remove installation

---

**Version 0.2.0-beta** | [n8n-mcp](https://github.com/czlonkowski/n8n-mcp) | [Augment Code](https://augmentcode.com)
