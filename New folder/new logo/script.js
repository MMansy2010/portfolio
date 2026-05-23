/* ============================================================
   JUMUIKA SCREENSHOT STUDIO — script.js
   All rendering logic, platform switching, and export controls
   ============================================================ */

// ── SCREEN DATA ─────────────────────────────────────────────────
const SCREENS = [
  {
    id: 'screen-01',
    name: 'Find Your Dream Home',
    headline: 'Find Your\nDream Home',
    headlineHighlight: 'In Kenya',
    subheadline: 'Kenya\'s #1 Property Marketplace',
    bullets: ['Browse 1,000+ Verified Listings', 'Homes, Land & Commercial', 'Buy, Rent or Lease', '100% Free Forever'],
    appScreenImg: 'assets/Screenshot 2026-05-23 030241.png',
  },
  {
    id: 'screen-02',
    name: 'Browse Properties',
    headline: 'Browse\nProperties',
    headlineHighlight: 'Your Way',
    subheadline: 'Search across every Kenyan county',
    bullets: ['Featured Local Listings', 'Filter by Property Type', 'Browse by County & Estate', 'Bookmark Favourites'],
    appScreenImg: 'assets/Screenshot 2026-05-23 030249.png',
  },
  {
    id: 'screen-03',
    name: 'Video Property Tours',
    headline: 'Watch Property',
    headlineHighlight: 'Video Tours',
    subheadline: 'Immersive virtual viewings from your phone',
    bullets: ['Agent Video Reels', 'Virtual Property Walk-Throughs', 'Follow Top Local Agents', 'Share Instantly with Family'],
    appScreenImg: 'assets/Screenshot 2026-05-23 030300.png',
  },
  {
    id: 'screen-04',
    name: 'Every Detail',
    headline: 'Every Detail',
    headlineHighlight: 'At Your Fingertips',
    subheadline: 'Full specs, photos, and agent contact',
    bullets: ['Complete Photo Galleries', 'Specs & Full Amenities', 'Property Map Views', 'Contact Agent Instantly'],
    appScreenImg: 'assets/Screenshot 2026-05-23 030307.png',
  },
  {
    id: 'screen-05',
    name: 'Smart Search & Filters',
    headline: 'Search Smarter',
    headlineHighlight: 'Find Faster',
    subheadline: 'Pinpoint your perfect location in seconds',
    bullets: ['Advanced Filters & Tags', 'Price Range Selector', 'Location-Based Search', 'Save Search Alerts'],
    appScreenImg: 'assets/Screenshot 2026-05-23 030315.png',
  },
  {
    id: 'screen-06',
    name: 'Mortgage Calculator',
    headline: 'Calculate &\nPlan',
    headlineHighlight: 'Affordably',
    subheadline: 'Know your monthly repayments before you commit',
    bullets: ['Interactive Mortgage Calculator', 'Custom Interest & Deposit Rates', 'Free Financial Insights', 'Plan Your Property Budget'],
    appScreenImg: 'assets/Screenshot 2026-05-23 030327.png',
  },
  {
    id: 'screen-07',
    name: 'Compare Properties',
    headline: 'Compare &\nDecide',
    headlineHighlight: 'With Confidence',
    subheadline: 'Side-by-side property comparison tool',
    bullets: ['Compare Up to 4 Properties', 'Highlight Key Differences', 'Track Price Changes', 'Save Favourites & Alerts'],
    appScreenImg: 'assets/Screenshot 2026-05-23 030333.png',
  },
  {
    id: 'screen-08',
    name: 'Connect With Agents',
    headline: 'Connect\nInstantly',
    headlineHighlight: 'With Agents',
    subheadline: 'Secure direct communication with verified agents',
    bullets: ['One-Click WhatsApp Chat', 'Direct Calls & Emails', 'Verified Agent Profiles', 'Secure In-App Enquiries'],
    appScreenImg: 'assets/Screenshot 2026-05-23 030339.png',
  },
];

// ── WATCH SCREENS (4 simplified glance screens) ─────────────────
const WATCH_SCREENS = [
  { id: 'watch-01', title: 'Find Home', sub: 'Kenya', stat: '1000+\nListings' },
  { id: 'watch-02', title: 'Browse', sub: 'Properties', stat: '47\nCounties' },
  { id: 'watch-03', title: 'Video Tours', sub: 'Watch Live', stat: 'HD\nReels' },
  { id: 'watch-04', title: 'Calculator', sub: 'Mortgage', stat: 'Free\nTool' },
  { id: 'watch-05', title: 'Compare', sub: 'Properties', stat: 'Up to\n4' },
  { id: 'watch-06', title: 'Connect', sub: 'Agents Now', stat: '24/7\nOnline' },
];

// ── PLATFORM CONFIG ─────────────────────────────────────────────
const PLATFORMS = {
  phone:   { label: 'Android Phone',  dims: '1080 × 1920 px', ratio: '9:16', w: 1080, h: 1920, type: 'phone' },
  tablet7: { label: '7" Android Tablet', dims: '1200 × 1920 px', ratio: '9:16', w: 1200, h: 1920, type: 'tablet' },
  tablet10:{ label: '10" Android Tablet', dims: '1600 × 2560 px', ratio: '9:16', w: 1600, h: 2560, type: 'tablet' },
  iphone:  { label: 'iPhone 6.5"',    dims: '1284 × 2778 px', ratio: '9:19.5', w: 1284, h: 2778, type: 'phone' },
  ipad:    { label: 'iPad 13"',       dims: '2048 × 2732 px', ratio: '3:4', w: 2048, h: 2732, type: 'ipad' },
  watch:   { label: 'Apple Watch',    dims: '410 × 502 px',   ratio: 'sq', w: 410, h: 502, type: 'watch' },
};

// ── STATE ───────────────────────────────────────────────────────
let currentPlatform = 'phone';
let currentScreen   = 0;

// ── INIT ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Parse URL params for headless/Puppeteer mode
  const params = new URLSearchParams(window.location.search);
  if (params.has('platform')) {
    const p = params.get('platform');
    if (PLATFORMS[p]) currentPlatform = p;
  }
  if (params.has('screen')) {
    const s = parseInt(params.get('screen'), 10);
    if (!isNaN(s)) currentScreen = s;
  }
  // In headless mode, hide sidebar chrome and controls for clean capture
  if (params.get('headless') === '1') {
    document.querySelector('.dashboard-header').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'none';
    document.querySelector('.canvas-controls').style.display = 'none';
    document.getElementById('mainCanvas').style.padding = '0';
    document.getElementById('mainCanvas').style.background = 'none';
    document.getElementById('mainCanvas').style.overflow = 'visible';
    document.getElementById('mainCanvas').style.alignItems = 'flex-start';
    document.getElementById('screenshotPreviewWrap').style.margin = '0';
  }
  buildSidebarTabs();
  render();
  if (params.get('headless') !== '1') {
    window.addEventListener('resize', scaleCanvas);
  }
});

// ── SIDEBAR SCREEN TABS ─────────────────────────────────────────
function buildSidebarTabs() {
  const list = document.getElementById('screenTabsList');
  const isWatch = currentPlatform === 'watch';
  const data = isWatch ? WATCH_SCREENS : SCREENS;
  list.innerHTML = '';
  data.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'screen-tab-btn' + (i === currentScreen ? ' active' : '');
    btn.innerHTML = `<span class="tab-num">${i + 1}</span>${s.name || s.title}`;
    btn.onclick = () => { currentScreen = i; updateSidebarActive(); render(); };
    list.appendChild(btn);
  });
}

function updateSidebarActive() {
  document.querySelectorAll('.screen-tab-btn').forEach((b, i) => {
    b.classList.toggle('active', i === currentScreen);
  });
}

// ── SET PLATFORM ─────────────────────────────────────────────────
function setPlatform(btn, platform) {
  document.querySelectorAll('.platform-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentPlatform = platform;
  currentScreen = 0;
  buildSidebarTabs();
  render();
}

// ── RENDER ───────────────────────────────────────────────────────
function render() {
  const p = PLATFORMS[currentPlatform];

  // Update info panel
  document.getElementById('infoPlatform').textContent = p.label;
  document.getElementById('infoDims').textContent = p.dims;
  document.getElementById('infoRatio').textContent = p.ratio;

  const dataArr = currentPlatform === 'watch' ? WATCH_SCREENS : SCREENS;
  document.getElementById('infoScreen').textContent = `${currentScreen + 1} / ${dataArr.length}`;

  const canvas = document.getElementById('screenshotCanvas');
  canvas.style.width  = p.w + 'px';
  canvas.style.height = p.h + 'px';

  // Inject content
  if (currentPlatform === 'watch') {
    canvas.innerHTML = buildWatchContent(WATCH_SCREENS[currentScreen], p);
  } else if (currentPlatform === 'ipad') {
    canvas.innerHTML = buildIPadContent(SCREENS[currentScreen], p);
  } else {
    canvas.innerHTML = buildPhoneTabletContent(SCREENS[currentScreen], p);
  }

  // Scale the canvas to fit the viewport
  scaleCanvas();
}

// ── SCALE CANVAS ─────────────────────────────────────────────────
function scaleCanvas() {
  const canvas  = document.getElementById('screenshotCanvas');
  const wrapper = document.getElementById('screenshotScaleWrapper');
  const main    = document.getElementById('mainCanvas');

  const p = PLATFORMS[currentPlatform];
  const naturalW = p.w;
  const naturalH = p.h;

  const maxW = main.clientWidth  - 80;
  const maxH = main.clientHeight - 200;

  const scaleW = maxW / naturalW;
  const scaleH = maxH / naturalH;
  const scale  = Math.min(scaleW, scaleH, 1); // never upscale

  wrapper.style.transform = `scale(${scale})`;
  wrapper.style.width  = naturalW + 'px';
  wrapper.style.height = naturalH + 'px';

  // Adjust the preview wrapper height so it doesn't leave gap
  const previewWrap = document.getElementById('screenshotPreviewWrap');
  previewWrap.style.height = (naturalH * scale) + 'px';
  previewWrap.style.width  = (naturalW * scale) + 'px';
}

// ── BUILD PHONE/TABLET CONTENT ────────────────────────────────────
function buildPhoneTabletContent(screen, p) {
  const isPhone   = p.type === 'phone';
  const isTall    = p.h > p.w; // portrait

  // Sizing relative to canvas
  const pW = p.w;
  const pH = p.h;

  // Responsive font sizes based on width
  const baseUnit    = pW / 1080;
  const headSize    = Math.round(92 * baseUnit);
  const highlSize   = Math.round(86 * baseUnit);
  const subSize     = Math.round(38 * baseUnit);
  const bulletSize  = Math.round(36 * baseUnit);
  const dotSize     = Math.round(14 * baseUnit);
  const bulletPadV  = Math.round(18 * baseUnit);
  const bulletPadH  = Math.round(36 * baseUnit);
  const bulletGap   = Math.round(18 * baseUnit);
  const bulletRadius= Math.round(50 * baseUnit);
  const logoH       = Math.round(90 * baseUnit);
  const topPad      = Math.round(80 * baseUnit);
  const secPad      = Math.round(40 * baseUnit);
  const footerPadV  = Math.round(32 * baseUnit);
  const footerPadH  = Math.round(40 * baseUnit);
  const tagSize     = Math.round(24 * baseUnit);

  // Phone mockup sizing
  const mockupW     = Math.round(pW * 0.62);
  const mockupH     = Math.round(pH * 0.50);
  const borderR     = Math.round(48 * baseUnit);
  const screenInset = Math.round(14 * baseUnit);
  const screenR     = Math.round(38 * baseUnit);
  const notchW      = Math.round(120 * baseUnit);
  const notchH      = Math.round(34 * baseUnit);
  const notchR      = Math.round(12 * baseUnit);

  // iPad different layout — 2 column
  const phoneInnerW = mockupW - screenInset * 2;
  const phoneInnerH = mockupH - screenInset * 2;

  // Decorative circles
  const dc1Size = Math.round(600 * baseUnit);
  const dc2Size = Math.round(900 * baseUnit);

  const taglineY = topPad + logoH + Math.round(16 * baseUnit);

  return `
    <!-- Background pattern -->
    <div class="kenyan-pattern"></div>

    <!-- Decorative circles -->
    <div class="deco-circle-1" style="width:${dc1Size}px;height:${dc1Size}px;top:${Math.round(-dc1Size*0.3)}px;right:${Math.round(-dc1Size*0.3)}px;"></div>
    <div class="deco-circle-2" style="width:${dc2Size}px;height:${dc2Size}px;bottom:${Math.round(-dc2Size*0.4)}px;left:${Math.round(-dc2Size*0.2)}px;"></div>

    <!-- Gold accent top bar -->
    <div class="gold-accent-bar" style="height:${Math.round(6*baseUnit)}px;"></div>

    <!-- Brand / Logo Top -->
    <div class="sc-top-brand" style="padding-top:${topPad}px;gap:${Math.round(12*baseUnit)}px;">
      <img src="assets/jumuika-logo.png" alt="Jumuika" class="sc-logo-img"
           style="height:${logoH}px;max-width:${Math.round(pW*0.55)}px;object-fit:contain;"
           onerror="this.outerHTML='<div style=\'font-family:Outfit,sans-serif;font-size:${Math.round(64*baseUnit)}px;font-weight:900;background:linear-gradient(135deg,#e8a51e,#f5ca5c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;\'>JUMUIKA</div>'">
      <div class="sc-tagline" style="font-size:${tagSize}px;">Kenya\'s Property Marketplace</div>
    </div>

    <!-- Headline -->
    <div class="sc-headline-area" style="padding:${secPad}px ${Math.round(60*baseUnit)}px ${Math.round(20*baseUnit)}px;">
      <div class="sc-headline" style="font-size:${headSize}px;">
        ${screen.headline.replace(/\n/g, '<br>')}
      </div>
      <div class="sc-headline" style="font-size:${highlSize}px;margin-top:${Math.round(4*baseUnit)}px;">
        <em>${screen.headlineHighlight}</em>
      </div>
      <div class="sc-subheadline" style="font-size:${subSize}px;margin-top:${Math.round(24*baseUnit)}px;">
        ${screen.subheadline}
      </div>
    </div>

    <!-- Phone Mockup -->
    <div class="phone-mockup-area" style="flex:1;min-height:${mockupH}px;">
      <div class="phone-outer"
           style="width:${mockupW}px;height:${mockupH}px;border-radius:${borderR}px;padding:${screenInset}px;
                  box-shadow: 0 0 0 ${Math.round(2*baseUnit)}px #444, 0 0 0 ${Math.round(4*baseUnit)}px #222, 0 ${Math.round(40*baseUnit)}px ${Math.round(100*baseUnit)}px rgba(0,0,0,0.8), inset 0 ${Math.round(1*baseUnit)}px 0 rgba(255,255,255,0.15);">
        <div class="phone-screen-area" style="width:${phoneInnerW}px;height:${phoneInnerH}px;border-radius:${screenR}px;">
          <img src="${screen.appScreenImg}" alt="App Screenshot"
               style="width:100%;height:100%;object-fit:cover;display:block;"
               onerror="this.style.background='linear-gradient(180deg,#5c1322,#2d0810)';this.style.display='block';">
          <!-- Notch -->
          <div class="phone-notch"
               style="width:${notchW}px;height:${notchH}px;border-radius:${notchR}px;top:${Math.round(10*baseUnit)}px;"></div>
          <!-- Shine -->
          <div class="phone-shine"></div>
        </div>
      </div>
    </div>

    <!-- Feature Bullets -->
    <div class="sc-features"
         style="padding:${Math.round(30*baseUnit)}px ${Math.round(70*baseUnit)}px;gap:${bulletGap}px;">
      ${screen.bullets.map(b => `
        <div class="sc-feature-item"
             style="padding:${bulletPadV}px ${bulletPadH}px;gap:${Math.round(22*baseUnit)}px;border-radius:${bulletRadius}px;">
          <div class="sc-feature-dot" style="width:${dotSize}px;height:${dotSize}px;"></div>
          <span class="sc-feature-text" style="font-size:${bulletSize}px;">${b}</span>
        </div>
      `).join('')}
    </div>

    <!-- Footer Brand -->
    <div class="sc-footer" style="padding:${footerPadV}px ${footerPadH}px;">
      <div class="sc-footer-inner" style="padding:${Math.round(16*baseUnit)}px ${Math.round(36*baseUnit)}px;">
        <img src="assets/app-icon.png" alt="Jumuika" class="sc-footer-icon"
             style="width:${Math.round(40*baseUnit)}px;height:${Math.round(40*baseUnit)}px;border-radius:${Math.round(10*baseUnit)}px;"
             onerror="this.style.display='none'">
        <span class="sc-footer-text" style="font-size:${Math.round(26*baseUnit)}px;">JUMUIKA</span>
        <span style="font-size:${Math.round(22*baseUnit)}px;color:rgba(255,255,255,0.4);font-family:'Outfit',sans-serif;">jumuika.co.ke</span>
      </div>
    </div>
  `;
}

// ── BUILD IPAD CONTENT (landscape-friendly 2-col layout) ──────────
function buildIPadContent(screen, p) {
  const pW = p.w; // 2048
  const pH = p.h; // 2732 — still portrait
  const baseUnit = pW / 1080;

  // For iPad we use a stacked layout similar to phone but wider
  const headSize   = Math.round(100 * baseUnit);
  const highlSize  = Math.round(92 * baseUnit);
  const subSize    = Math.round(44 * baseUnit);
  const bulletSize = Math.round(40 * baseUnit);
  const logoH      = Math.round(100 * baseUnit);
  const tagSize    = Math.round(28 * baseUnit);
  const dotSize    = Math.round(16 * baseUnit);
  const bulletPadV = Math.round(22 * baseUnit);
  const bulletPadH = Math.round(48 * baseUnit);
  const bulletGap  = Math.round(20 * baseUnit);
  const bulletR    = Math.round(60 * baseUnit);

  const mockupW   = Math.round(pW * 0.55);
  const mockupH   = Math.round(pH * 0.44);
  const borderR   = Math.round(32 * baseUnit);
  const inset     = Math.round(14 * baseUnit);
  const innerR    = Math.round(24 * baseUnit);

  const topPad  = Math.round(80 * baseUnit);
  const secPad  = Math.round(40 * baseUnit);
  const footerV = Math.round(40 * baseUnit);
  const dc1Size = Math.round(900 * baseUnit);

  return `
    <div class="kenyan-pattern"></div>
    <div class="deco-circle-1" style="width:${dc1Size}px;height:${dc1Size}px;top:${Math.round(-dc1Size*0.3)}px;right:${Math.round(-dc1Size*0.25)}px;"></div>
    <div class="gold-accent-bar" style="height:${Math.round(8*baseUnit)}px;"></div>

    <div class="sc-top-brand" style="padding-top:${topPad}px;gap:${Math.round(16*baseUnit)}px;">
      <img src="assets/jumuika-logo.png" alt="Jumuika" class="sc-logo-img"
           style="height:${logoH}px;max-width:${Math.round(pW*0.5)}px;object-fit:contain;"
           onerror="this.outerHTML='<div style=\'font-family:Outfit,sans-serif;font-size:${Math.round(80*baseUnit)}px;font-weight:900;background:linear-gradient(135deg,#e8a51e,#f5ca5c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;\'>JUMUIKA</div>'">
      <div class="sc-tagline" style="font-size:${tagSize}px;">Kenya\'s Property Marketplace</div>
    </div>

    <div class="sc-headline-area" style="padding:${secPad}px ${Math.round(100*baseUnit)}px ${Math.round(20*baseUnit)}px;">
      <div class="sc-headline" style="font-size:${headSize}px;">${screen.headline.replace(/\n/g,'<br>')}</div>
      <div class="sc-headline" style="font-size:${highlSize}px;margin-top:${Math.round(6*baseUnit)}px;"><em>${screen.headlineHighlight}</em></div>
      <div class="sc-subheadline" style="font-size:${subSize}px;margin-top:${Math.round(28*baseUnit)}px;">${screen.subheadline}</div>
    </div>

    <!-- iPad mockup — wider device frame -->
    <div class="phone-mockup-area" style="flex:1;min-height:${mockupH}px;">
      <div class="tablet-outer"
           style="width:${mockupW}px;height:${mockupH}px;border-radius:${borderR}px;padding:${inset}px;
                  box-shadow: 0 0 0 ${Math.round(3*baseUnit)}px #444, 0 0 0 ${Math.round(5*baseUnit)}px #222, 0 ${Math.round(50*baseUnit)}px ${Math.round(120*baseUnit)}px rgba(0,0,0,0.8);">
        <div class="tablet-screen-area"
             style="width:${mockupW - inset*2}px;height:${mockupH - inset*2}px;border-radius:${innerR}px;">
          <img src="${screen.appScreenImg}" alt="App Screenshot"
               style="width:100%;height:100%;object-fit:cover;display:block;"
               onerror="this.style.background='linear-gradient(180deg,#5c1322,#2d0810)';this.style.display='block';">
          <div class="tablet-home-bar"
               style="width:${Math.round(140*baseUnit)}px;height:${Math.round(8*baseUnit)}px;bottom:${Math.round(14*baseUnit)}px;"></div>
        </div>
      </div>
    </div>

    <div class="sc-features" style="padding:${Math.round(36*baseUnit)}px ${Math.round(100*baseUnit)}px;gap:${bulletGap}px;">
      ${screen.bullets.map(b => `
        <div class="sc-feature-item" style="padding:${bulletPadV}px ${bulletPadH}px;gap:${Math.round(26*baseUnit)}px;border-radius:${bulletR}px;">
          <div class="sc-feature-dot" style="width:${dotSize}px;height:${dotSize}px;"></div>
          <span class="sc-feature-text" style="font-size:${bulletSize}px;">${b}</span>
        </div>
      `).join('')}
    </div>

    <div class="sc-footer" style="padding:${footerV}px;">
      <div class="sc-footer-inner" style="padding:${Math.round(20*baseUnit)}px ${Math.round(48*baseUnit)}px;">
        <img src="assets/app-icon.png" alt="" class="sc-footer-icon"
             style="width:${Math.round(50*baseUnit)}px;height:${Math.round(50*baseUnit)}px;border-radius:${Math.round(14*baseUnit)}px;"
             onerror="this.style.display='none'">
        <span class="sc-footer-text" style="font-size:${Math.round(32*baseUnit)}px;">JUMUIKA</span>
        <span style="font-size:${Math.round(26*baseUnit)}px;color:rgba(255,255,255,0.4);font-family:'Outfit',sans-serif;">jumuika.co.ke</span>
      </div>
    </div>
  `;
}

// ── BUILD WATCH CONTENT ────────────────────────────────────────────
function buildWatchContent(ws, p) {
  const pW = p.w; // 410
  const pH = p.h; // 502
  const watchBodyW = Math.round(pW * 0.84);
  const watchBodyH = Math.round(pH * 0.84);
  const watchTop   = Math.round((pH - watchBodyH) / 2);
  const watchLeft  = Math.round((pW - watchBodyW) / 2);
  const cornerR    = Math.round(watchBodyW * 0.3);
  const innerInset = 8;
  const innerR     = Math.round(cornerR - 4);

  // Crown
  const crownW = 10;
  const crownH = Math.round(watchBodyH * 0.22);
  const crownTop = Math.round(watchTop + watchBodyH * 0.35);

  return `
    <!-- Watch outer frame -->
    <div style="position:absolute;inset:0;background:linear-gradient(145deg,#1a0408,#000);"></div>

    <!-- Watch strap suggestion top -->
    <div style="position:absolute;left:50%;transform:translateX(-50%);top:0;width:${Math.round(watchBodyW*0.55)}px;height:${watchTop+8}px;background:linear-gradient(180deg,#1a1a1a,#2a2a2a);border-radius:4px 4px 0 0;"></div>
    <!-- Watch strap suggestion bottom -->
    <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:0;width:${Math.round(watchBodyW*0.55)}px;height:${watchTop+8}px;background:linear-gradient(0deg,#1a1a1a,#2a2a2a);border-radius:0 0 4px 4px;"></div>

    <!-- Watch body -->
    <div style="position:absolute;left:${watchLeft}px;top:${watchTop}px;width:${watchBodyW}px;height:${watchBodyH}px;
                border-radius:${cornerR}px;
                background:linear-gradient(145deg,#2c2c2c,#111);
                box-shadow: 0 0 0 2px #333, 0 0 0 4px #111, 0 20px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1);">

      <!-- Screen area -->
      <div style="position:absolute;inset:${innerInset}px;border-radius:${innerR}px;overflow:hidden;background:#000;">

        <!-- Watch face content -->
        <div class="watch-bg-content">
          <img src="assets/app-icon.png" class="watch-logo-icon" alt="Jumuika"
               onerror="this.style.display='none'">
          <div class="watch-gold-line"></div>
          <div class="watch-title">${ws.title}</div>
          <div class="watch-subtitle">${ws.sub}</div>
          <div class="watch-gold-line"></div>
          <div class="watch-stat" style="white-space:pre-line;">${ws.stat}</div>
          <div class="watch-subtitle" style="font-size:7px;opacity:0.4;">jumuika.co.ke</div>
        </div>

        <!-- Gold top bar on screen -->
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#c87722,#f0b832,#fae094);"></div>
      </div>
    </div>

    <!-- Crown -->
    <div style="position:absolute;right:${watchLeft - crownW}px;top:${crownTop}px;width:${crownW}px;height:${crownH}px;background:linear-gradient(180deg,#555,#333);border-radius:3px;box-shadow:-2px 0 8px rgba(0,0,0,0.4);"></div>
  `;
}

// ── EXPORT CURRENT ──────────────────────────────────────────────────
async function exportCurrent() {
  const p = PLATFORMS[currentPlatform];
  const dataArr = currentPlatform === 'watch' ? WATCH_SCREENS : SCREENS;
  const s = dataArr[currentScreen];
  const filename = buildFilename(currentPlatform, currentScreen);
  await captureAndDownload(filename, p.w, p.h);
}

// ── EXPORT ALL (via html2canvas in browser) ─────────────────────────
async function triggerExportAll() {
  showLoading('Loading html2canvas…');

  // Dynamically inject html2canvas if not already present
  if (!window.html2canvas) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
  }

  const platforms = Object.keys(PLATFORMS);
  const progress = document.getElementById('exportProgress');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  // Total screenshots
  let total = 0;
  platforms.forEach(pk => {
    total += pk === 'watch' ? WATCH_SCREENS.length : SCREENS.length;
  });

  let done = 0;
  progress.classList.add('visible');

  for (const pk of platforms) {
    const p = PLATFORMS[pk];
    const dataArr = pk === 'watch' ? WATCH_SCREENS : SCREENS;

    for (let i = 0; i < dataArr.length; i++) {
      // Switch to that platform and screen
      currentPlatform = pk;
      currentScreen = i;
      buildSidebarTabs();
      updateSidebarActive();
      render();
      await sleep(300); // allow render to settle

      const filename = buildFilename(pk, i);
      updateLoadingText(`Exporting ${filename}…`);

      await captureAndDownload(filename, p.w, p.h);
      done++;
      const pct = Math.round((done / total) * 100);
      progressFill.style.width = pct + '%';
      progressText.textContent = `${done} / ${total} exported`;
    }
  }

  hideLoading();
  alert(`✅ Done! ${done} screenshots exported.\n\nCheck your Downloads folder.`);
}

// ── CAPTURE & DOWNLOAD ───────────────────────────────────────────────
async function captureAndDownload(filename, w, h) {
  if (!window.html2canvas) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
  }

  const canvas = document.getElementById('screenshotCanvas');
  const wrapper = document.getElementById('screenshotScaleWrapper');

  // Temporarily un-scale
  const prevTransform = wrapper.style.transform;
  wrapper.style.transform = 'scale(1)';
  canvas.style.transform  = 'none';

  await sleep(150);

  try {
    const rendered = await html2canvas(canvas, {
      width: w,
      height: h,
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = rendered.toDataURL('image/png', 1.0);
    link.click();
  } catch(e) {
    console.error('Export error:', e);
  }

  wrapper.style.transform = prevTransform;
  scaleCanvas();
}

// ── BUILD FILENAME ────────────────────────────────────────────────────
function buildFilename(platform, screenIndex) {
  const prefixMap = {
    phone:    'play-phone',
    tablet7:  'play-tablet7',
    tablet10: 'play-tablet10',
    iphone:   'ios-iphone65',
    ipad:     'ios-ipad13',
    watch:    'ios-watch',
  };
  const num = String(screenIndex + 1).padStart(2, '0');
  return `${prefixMap[platform]}-${num}.png`;
}

// ── HELPERS ──────────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function showLoading(msg) {
  const ol = document.getElementById('loadingOverlay');
  ol.classList.add('active');
  document.getElementById('loadingSubText').textContent = msg || '';
}

function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove('active');
}

function updateLoadingText(msg) {
  document.getElementById('loadingSubText').textContent = msg;
}
