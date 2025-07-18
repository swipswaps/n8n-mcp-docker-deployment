# n8n MCP Docker Deployment

A comprehensive automation toolkit for deploying and managing n8n workflows with Model Context Protocol (MCP) integration, optimized for performance and reliability.

## 🚀 Features

### Core Functionality
- **Automated n8n Deployment**: Docker-based deployment with optimized configurations
- **Workflow Automation**: Playwright-based workflow creation and management
- **Performance Monitoring**: Real-time system resource monitoring and optimization
- **MCP Integration**: Ready for Model Context Protocol tools and APIs
- **Error Handling**: Comprehensive error detection and recovery mechanisms

### Performance Optimizations
- **System Resource Management**: Automatic memory and CPU optimization
- **Browser Performance**: Optimized Playwright configurations for workflow automation
- **Timing Optimizations**: Reduced wait times and faster element detection
- **Error Recovery**: Enhanced retry mechanisms and fallback strategies

### Development Tools
- **Logging System**: Comprehensive logging with real-time monitoring
- **Debugging Tools**: Performance inspection and troubleshooting utilities
- **Shell Script Validation**: ShellCheck compliance and best practices
- **Documentation**: Extensive guides and troubleshooting resources

## 📋 Prerequisites

- **Docker & Docker Compose**: For containerized deployment
- **Node.js**: Version 14 or higher
- **Linux Environment**: Tested on Fedora 42
- **System Resources**: Minimum 4GB RAM, 2GB free disk space

## 🛠️ Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd n8n-mcp-docker-deployment
```

### 2. Start n8n
```bash
# Using Docker Compose
./start-n8n.sh

# Or manually
docker-compose up -d
```

### 3. Run Workflow Automation
```bash
# Run optimized workflow automation
./run_optimized_workflow.sh

# Or use the direct version
node build_workflow_direct.js
```

### 4. Monitor Performance
```bash
# View system performance
./system_performance_resolver.sh

# Monitor logs
./view-logs.sh
```

## 📁 Project Structure

```
n8n-mcp-docker-deployment/
├── docker-compose.yml          # Docker configuration
├── build_workflow_*.js         # Workflow automation scripts
├── run_optimized_workflow.sh   # Optimized execution script
├── start-n8n.sh               # n8n startup script
├── system_performance_resolver.sh # Performance monitoring
├── view-logs.sh               # Log viewing utility
├── logs/                      # Log directory
├── prompts/                   # Documentation and guides
└── README.md                  # This file
```

## 🔧 Configuration

### Docker Configuration
The `docker-compose.yml` file includes:
- n8n container with optimized settings
- Volume mounts for persistence
- Network configuration
- Environment variables

### Performance Settings
- **Memory Limits**: Optimized for systems with 4-8GB RAM
- **CPU Allocation**: Balanced performance settings
- **Browser Optimization**: Reduced memory usage and faster execution
- **Timing Adjustments**: Optimized wait times for better reliability

## 📊 Monitoring and Debugging

### System Performance
```bash
# Check system resources
./system_performance_resolver.sh

# Monitor in real-time
htop
```

### Log Management
```bash
# View all logs
./view-logs.sh

# Follow specific log types
./view-logs.sh --follow installation
./view-logs.sh --follow errors
```

### Workflow Automation
```bash
# Run with monitoring
./run_optimized_workflow.sh

# Debug mode
DEBUG=1 node build_workflow_optimized.js
```

## 🎯 Workflow Components

The automation creates comprehensive workflows with:

1. **HTTP Request Nodes**: External API integration
2. **Code Nodes**: Data processing and transformation
3. **IF Nodes**: Conditional logic and branching
4. **MCP Integration**: Model Context Protocol tools
5. **Error Handling**: Comprehensive error management
6. **Performance Monitoring**: Resource usage tracking

## 🔍 Troubleshooting

### Common Issues

#### n8n Not Starting
```bash
# Check Docker status
docker ps -a

# View container logs
docker-compose logs n8n

# Restart containers
docker-compose down && docker-compose up -d
```

#### Performance Issues
```bash
# Check system resources
./system_performance_resolver.sh

# Monitor memory usage
free -h

# Check for resource hogs
ps aux --sort=-%cpu | head -10
```

#### Automation Failures
```bash
# Check browser automation
node build_workflow_optimized.js

# Verify n8n accessibility
curl http://localhost:5678

# Review logs
./view-logs.sh --errors
```

### Debug Commands
```bash
# System diagnostics
./system_performance_resolver.sh --verbose

# Workflow automation debug
DEBUG=1 node build_workflow_optimized.js

# Log analysis
./view-logs.sh --analyze
```

## 📈 Performance Metrics

### Expected Performance
- **Deployment Time**: 2-3 minutes
- **Workflow Creation**: 1-2 minutes
- **Memory Usage**: ~200MB additional
- **CPU Usage**: Moderate during automation
- **Success Rate**: >95% with optimizations

### Optimization Features
- **Memory Management**: Automatic cleanup and optimization
- **Browser Performance**: Optimized Chrome flags and settings
- **Timing Adjustments**: Reduced wait times for faster execution
- **Error Recovery**: Automatic retry mechanisms

## 🔮 Future Enhancements

### Planned Features
1. **Parallel Processing**: Multiple workflow creation
2. **Template System**: Reusable workflow templates
3. **Advanced Monitoring**: Real-time performance analytics
4. **MCP Integration**: Direct API calls to n8n
5. **Cloud Deployment**: AWS/Azure integration

### Customization Options
- Modify workflow configurations
- Add custom code snippets
- Adjust performance parameters
- Custom selector strategies

## 🤝 Contributing

### Development Guidelines
1. **Shell Scripts**: Follow ShellCheck guidelines
2. **JavaScript**: Use ESLint and Prettier
3. **Documentation**: Update README and guides
4. **Testing**: Test on multiple environments

### Code Quality
- All shell scripts pass ShellCheck validation
- JavaScript files follow best practices
- Comprehensive error handling
- Extensive logging and monitoring

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review logs with `./view-logs.sh`
3. Run system diagnostics with `./system_performance_resolver.sh`
4. Check GitHub issues for known problems

## 📊 Project Status

- ✅ **Core Functionality**: Complete and tested
- ✅ **Performance Optimization**: Implemented and validated
- ✅ **Error Handling**: Comprehensive coverage
- ✅ **Documentation**: Extensive guides and examples
- 🔄 **MCP Integration**: In development
- 🔄 **Cloud Deployment**: Planned

---

**Note**: This project is optimized for Linux environments and includes comprehensive monitoring and debugging tools for reliable n8n workflow automation.
