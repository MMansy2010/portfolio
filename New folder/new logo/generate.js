/**
 * JUMUIKA SCREENSHOT GENERATOR — generate.js
 * 
 * Launches a local Express server, then uses Puppeteer to capture
 * each screenshot template at the exact store-required pixel dimensions.
 * Exports all flat PNGs into exports/<platform>/ directories.
 *
 * Usage:  node generate.js
 */

const http     = require('http');
const path     = require('path');
const fs       = require('fs');
const express  = require('express');
const puppeteer = require('puppeteer');

// ── CONFIG ────────────────────────────────────────────────────────
const PORT = 7654;
const BASE = path.resolve(__dirname);

const PLATFORMS = {
  phone:    { prefix: 'play-phone',    w: 1080, h: 1920,  count: 8, urlParam: 'phone'   },
  tablet7:  { prefix: 'play-tablet7',  w: 1200, h: 1920,  count: 8, urlParam: 'tablet7' },
  tablet10: { prefix: 'play-tablet10', w: 1600, h: 2560,  count: 8, urlParam: 'tablet10'},
  iphone:   { prefix: 'ios-iphone65',  w: 1284, h: 2778,  count: 8, urlParam: 'iphone'  },
  ipad:     { prefix: 'ios-ipad13',    w: 2048, h: 2732,  count: 8, urlParam: 'ipad'    },
  watch:    { prefix: 'ios-watch',     w: 410,  h: 502,   count: 6, urlParam: 'watch'   },
};

// ── START SERVER ─────────────────────────────────────────────────
async function startServer() {
  const app = express();
  app.use(express.static(BASE));
  return new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      console.log(`\n✅  Local server running at http://localhost:${PORT}\n`);
      resolve(server);
    });
  });
}

// ── ENSURE EXPORT DIRS ───────────────────────────────────────────
function ensureDirs() {
  for (const key of Object.keys(PLATFORMS)) {
    const dir = path.join(BASE, 'exports', PLATFORMS[key].prefix.split('-').slice(0,2).join('-'));
    // Map prefix to folder
  }
  const folders = [
    'exports/play-phone',
    'exports/play-tablet7',
    'exports/play-tablet10',
    'exports/ios-iphone',
    'exports/ios-ipad',
    'exports/ios-watch',
  ];
  for (const f of folders) {
    const dir = path.join(BASE, f);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

function exportDir(platformKey) {
  const map = {
    phone:    'play-phone',
    tablet7:  'play-tablet7',
    tablet10: 'play-tablet10',
    iphone:   'ios-iphone',
    ipad:     'ios-ipad',
    watch:    'ios-watch',
  };
  return path.join(BASE, 'exports', map[platformKey]);
}

// ── MAIN ─────────────────────────────────────────────────────────
(async () => {
  console.log('\n🎨  Jumuika Screenshot Generator\n');
  console.log('   Building premium App Store + Google Play screenshots…\n');

  ensureDirs();

  // Start server
  const server = await startServer();

  // Launch headless browser
  console.log('🌐  Launching headless Chromium…');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
      '--disable-font-subpixel-positioning',
    ],
  });

  const page = await browser.newPage();

  // Enable CORS / file access
  await page.setBypassCSP(true);

  let totalExported = 0;
  let totalExpected = 0;
  for (const key of Object.keys(PLATFORMS)) totalExpected += PLATFORMS[key].count;

  // ── ITERATE PLATFORMS ─────────────────────────────────────────
  for (const [platformKey, pConfig] of Object.entries(PLATFORMS)) {
    const { prefix, w, h, count, urlParam } = pConfig;
    const outDir = exportDir(platformKey);

    console.log(`\n📱  Platform: ${prefix.toUpperCase()} (${w}×${h}px) — ${count} screenshots`);
    console.log(`    Output dir: ${outDir}\n`);

    for (let i = 0; i < count; i++) {
      const screenNum = String(i + 1).padStart(2, '0');
      const filename  = `${prefix}-${screenNum}.png`;
      const outPath   = path.join(outDir, filename);

      // Set viewport to exact platform dimensions
      await page.setViewport({
        width:  w,
        height: h,
        deviceScaleFactor: 1,
      });

      // Navigate to the builder with URL params to auto-select platform & screen
      const url = `http://localhost:${PORT}/?platform=${urlParam}&screen=${i}&headless=1`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait for fonts and images
      await page.waitForSelector('#screenshotCanvas', { timeout: 10000 });
      await sleep(800); // extra wait for Google Fonts

      // Grab the screenshotCanvas element directly
      const canvasEl = await page.$('#screenshotCanvas');

      if (!canvasEl) {
        console.warn(`    ⚠️  Could not find #screenshotCanvas for ${filename}`);
        continue;
      }

      // Reset the canvas transform so it renders at full native resolution
      await page.evaluate(() => {
        const wrapper = document.getElementById('screenshotScaleWrapper');
        if (wrapper) {
          wrapper.style.transform = 'scale(1)';
          wrapper.style.transformOrigin = 'top left';
        }
        const canvas = document.getElementById('screenshotCanvas');
        if (canvas) {
          canvas.style.transform = 'none';
        }
      });

      await sleep(200);

      // Screenshot the canvas element at native resolution
      await canvasEl.screenshot({
        path: outPath,
        type: 'png',
        omitBackground: false,
      });

      totalExported++;
      const pct = Math.round((totalExported / totalExpected) * 100);
      const bar = '█'.repeat(Math.floor(pct / 5)) + '░'.repeat(20 - Math.floor(pct / 5));
      process.stdout.write(`    [${bar}] ${pct}%  ✔ ${filename}\n`);
    }
  }

  await browser.close();
  server.close();

  console.log('\n\n🎉  GENERATION COMPLETE!');
  console.log(`    ✅  ${totalExported} screenshots exported to: ${path.join(BASE, 'exports')}`);
  console.log('\n    Platform folders:');
  console.log('      exports/play-phone/       — 8 × 1080×1920 (Android Phone)');
  console.log('      exports/play-tablet7/     — 8 × 1200×1920 (7" Tablet)');
  console.log('      exports/play-tablet10/    — 8 × 1600×2560 (10" Tablet)');
  console.log('      exports/ios-iphone/       — 8 × 1284×2778 (iPhone 6.5")');
  console.log('      exports/ios-ipad/         — 8 × 2048×2732 (iPad 13")');
  console.log('      exports/ios-watch/        — 6 × 410×502   (Apple Watch)');
  console.log('\n    All files are PNG, named per store convention:');
  console.log('      play-phone-01.png … play-phone-08.png');
  console.log('      ios-iphone65-01.png … ios-iphone65-08.png');
  console.log('      ios-watch-01.png … ios-watch-06.png\n');
})();

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
