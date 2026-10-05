const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const items = fs.readdirSync(baseDir);
const results = [];

for (const item of items) {
  const fullPath = path.join(baseDir, item);
  if (fs.statSync(fullPath).isDirectory() && item !== '.git' && item !== '.github' && item !== 'scratch') {
    const hasGit = fs.existsSync(path.join(fullPath, '.git'));
    const hasPkg = fs.existsSync(path.join(fullPath, 'package.json'));
    const hasIndex = fs.existsSync(path.join(fullPath, 'index.html'));
    const hasDistIndex = fs.existsSync(path.join(fullPath, 'dist', 'index.html'));
    const hasBuildIndex = fs.existsSync(path.join(fullPath, 'build', 'index.html'));
    const hasPublicIndex = fs.existsSync(path.join(fullPath, 'public', 'index.html'));

    let framework = null;
    let scripts = null;
    if (hasPkg) {
      try {
        const pkgData = JSON.parse(fs.readFileSync(path.join(fullPath, 'package.json'), 'utf-8'));
        const deps = { ...(pkgData.dependencies || {}), ...(pkgData.devDependencies || {}) };
        scripts = pkgData.scripts || {};
        if (deps['react']) framework = 'React';
        else if (deps['vue']) framework = 'Vue';
        else if (deps['vite']) framework = 'Vite';
        else framework = 'Node/npm';
      } catch (e) {
        framework = 'Error parsing pkg';
      }
    }

    results.push({
      folder: item,
      hasGit,
      hasPkg,
      framework,
      scripts,
      hasIndex,
      hasDistIndex,
      hasBuildIndex,
      hasPublicIndex
    });
  }
}

console.log(JSON.stringify(results, null, 2));
