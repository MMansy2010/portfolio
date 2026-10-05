const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const items = fs.readdirSync(baseDir);

const removedGitDirs = [];

for (const item of items) {
  if (item === '.git' || item === 'scratch') continue;
  const fullPath = path.join(baseDir, item);
  if (fs.statSync(fullPath).isDirectory()) {
    const innerGit = path.join(fullPath, '.git');
    if (fs.existsSync(innerGit)) {
      try {
        fs.rmSync(innerGit, { recursive: true, force: true });
        removedGitDirs.push(item);
      } catch (err) {
        console.error(`Failed to remove .git in ${item}:`, err);
      }
    }
  }
}

console.log('Removed inner .git directories from:', removedGitDirs);
