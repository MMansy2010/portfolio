const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const items = fs.readdirSync(baseDir);

const report = [];

for (const item of items) {
  const fullPath = path.join(baseDir, item);
  if (fs.statSync(fullPath).isDirectory() && !item.startsWith('.') && item !== 'scratch') {
    const files = fs.readdirSync(fullPath);
    const hasGit = files.includes('.git');
    const hasPkg = files.includes('package.json');
    const hasIndex = files.includes('index.html');
    const hasViteConfig = files.includes('vite.config.js') || files.includes('vite.config.ts');
    
    report.push({
      name: item,
      hasGit,
      hasPkg,
      hasIndex,
      hasViteConfig,
      fileCount: files.length,
      sampleFiles: files.slice(0, 10)
    });
  }
}

console.log(JSON.stringify(report, null, 2));
