const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const targetDir = path.join(baseDir, 'portfolio', '2', 'Screenshotss');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const copyMap = [
  { src: path.join(baseDir, 'Eclipse', 'black cap.png'), dest: path.join(targetDir, 'eclipse_cap.png') },
  { src: path.join(baseDir, 'Device Tracking', 'Cartoonic level device.png'), dest: path.join(targetDir, 'device_tracking.png') },
  { src: path.join(baseDir, 'AlSariqa', 'Le3bt Al3eed QR templete.png'), dest: path.join(targetDir, 'alsariqa.png') },
  { src: path.join(baseDir, 'Australia', 'screenshots', 'Screenshot 2026-05-23 202656.png'), dest: path.join(targetDir, 'australia.png') }
];

for (const item of copyMap) {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, item.dest);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.error(`Source not found: ${item.src}`);
  }
}
