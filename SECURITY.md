# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| 0.3.x   | :white_check_mark: | Active development |
| 0.2.x   | :warning:          | Critical fixes only |
| < 0.2   | :x:                | No longer supported |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

### Preferred Method: GitHub Security Advisories

1. Go to the [Security tab](https://github.com/swipswaps/n8n-mcp-docker-deployment/security) of this repository
2. Click "Report a vulnerability"
3. Fill out the security advisory form with:
   - Detailed description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if known)

### Alternative Method: Email

If you prefer email reporting, contact the maintainers directly:
- Email: [Create a private issue first for contact information]
- Subject: "[SECURITY] Vulnerability Report - n8n-mcp-docker-deployment"

### What to Include

Please include as much information as possible:

- **Type of vulnerability** (e.g., code injection, privilege escalation, etc.)
- **Location** (file name, line number, function)
- **Impact** (what an attacker could achieve)
- **Reproduction steps** (detailed steps to reproduce the issue)
- **Proof of concept** (if applicable)
- **Suggested mitigation** (if you have ideas)

## Security Response Process

1. **Acknowledgment**: We will acknowledge receipt within 48 hours
2. **Investigation**: We will investigate and assess the vulnerability within 5 business days
3. **Fix Development**: Critical vulnerabilities will be addressed within 7 days
4. **Disclosure**: We will coordinate disclosure timing with the reporter
5. **Release**: Security fixes will be released as soon as possible

## Security Measures

### Current Security Implementations

- **Docker Image Scanning**: All Docker images are scanned for vulnerabilities using Trivy
- **Static Code Analysis**: Shell scripts are analyzed with ShellCheck and custom security rules
- **Secret Detection**: Automated scanning for hardcoded secrets and credentials
- **Permission Auditing**: Regular audits of file permissions and access controls
- **Dependency Monitoring**: Automated monitoring of third-party dependencies
- **Multi-Platform Testing**: Security testing across multiple Linux distributions

### Security Best Practices

This project follows these security best practices:

- **Principle of Least Privilege**: Scripts request minimal necessary permissions
- **Input Validation**: All user inputs are validated and sanitized
- **Secure Defaults**: Default configurations prioritize security over convenience
- **Regular Updates**: Dependencies are regularly updated to patch vulnerabilities
- **Audit Logging**: Security-relevant actions are logged for audit purposes

### Docker Security

- **Official Images**: Only official and verified Docker images are used
- **Image Pinning**: Docker images are pinned to specific versions when possible
- **Runtime Security**: Containers run with minimal privileges
- **Network Isolation**: Containers use appropriate network isolation
- **Volume Security**: Host volumes are mounted with appropriate permissions

### Script Security

- **Input Sanitization**: All external inputs are properly sanitized
- **Path Validation**: File paths are validated to prevent directory traversal
- **Command Injection Prevention**: Dynamic command execution is avoided
- **Privilege Escalation Protection**: Scripts avoid unnecessary privilege escalation
- **Secure Temporary Files**: Temporary files are created securely

## Security Testing

### Automated Security Testing

Our CI/CD pipeline includes:

- **Secret Scanning**: GitLeaks and custom pattern matching
- **Vulnerability Scanning**: Trivy for filesystem and container scanning
- **Static Analysis**: ShellCheck with security-focused rules
- **Permission Auditing**: Automated file permission checks
- **Dependency Auditing**: Regular dependency vulnerability scans

### Manual Security Testing

We recommend manual testing for:

- **Privilege Escalation**: Test if scripts can be exploited for privilege escalation
- **Input Validation**: Test with malicious inputs and edge cases
- **File System Security**: Test file creation, modification, and deletion
- **Network Security**: Test network communications and data transmission
- **Container Escape**: Test Docker container isolation

## Responsible Disclosure

We believe in responsible disclosure and will work with security researchers to:

- **Acknowledge** their contribution to improving security
- **Coordinate** disclosure timing to protect users
- **Credit** researchers in security advisories (with permission)
- **Provide** updates on fix development and release timeline

## Security Hall of Fame

We will recognize security researchers who responsibly disclose vulnerabilities:

<!-- Security researchers will be listed here -->
*No security reports have been received yet.*

## Contact Information

For security-related questions or concerns:

- **Security Issues**: Use GitHub Security Advisories (preferred)
- **General Security Questions**: Create a regular GitHub issue with the "security" label
- **Security Policy Questions**: Create a GitHub discussion

## Updates to This Policy

This security policy may be updated periodically. Major changes will be announced through:

- GitHub repository notifications
- Release notes
- Security advisories (if applicable)

---

**Last Updated**: 2025-07-16  
**Version**: 1.0
