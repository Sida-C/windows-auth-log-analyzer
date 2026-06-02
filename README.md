## How to Run

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/windows-auth-log-analyzer.git
cd windows-auth-log-analyzer
```

Install dependencies:

```bash
npm install
```

Run PowerShell as Administrator, then run the analyzer:

```bash
node src/analyzer.js
```

The generated report will be saved to:

```text
output/auth-summary.json
```

A sanitized sample report can be included at:

```text
output/sample-auth-summary.json
```
