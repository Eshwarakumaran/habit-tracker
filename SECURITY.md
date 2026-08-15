# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in Spirit of Vengeance, please email security@ignitehabits.local instead of using the issue tracker.

Please include the following in your report:
- Description of the vulnerability
- Steps to reproduce
- Impact assessment
- Suggested fix (if available)

We will acknowledge your report within 48 hours and aim to provide a fix within 7 days.

## Security Best Practices

### For Users
- Clear your browser cache regularly
- Use the export feature to back up your data
- Keep your browser and operating system up to date
- Don't share your browser session with untrusted users

### For Developers
- All data is stored locally in the browser (localStorage)
- No personal data is transmitted to external servers
- Regular dependency updates to patch security vulnerabilities
- Follow OWASP security guidelines

## Dependencies
We keep all npm dependencies up to date and regularly scan for known vulnerabilities using:
- npm audit
- GitHub Dependabot

## Compliance
- No tracking or analytics
- No third-party scripts (except React, Vite, and essential libraries)
- No cookies or persistent identifiers
- Full offline functionality

Thank you for helping keep Spirit of Vengeance secure!
