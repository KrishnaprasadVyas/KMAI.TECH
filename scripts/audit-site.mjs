import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(process.cwd(), 'audit-output');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function audit() {
  console.log('Launching Chrome for site audit...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  page.on('console', (msg) => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', (err) => consoleMessages.push(`[ERROR] ${err.toString()}`));

  // 1. Desktop Audit (1440x900)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  console.log('Navigating to http://localhost:5173/ (Desktop)...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  
  // Wait for preloader to finish (2 seconds + transitions)
  await new Promise((r) => setTimeout(r, 3500));

  // Capture full page screenshot
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop-full.png'), fullPage: true });
  console.log('Captured desktop full-page screenshot.');

  // Capture specific sections
  const sections = ['hero', 'services', 'work', 'about', 'process', 'technology', 'testimonials', 'contact'];
  for (const s of sections) {
    const el = await page.$(`#${s}`);
    if (el) {
      await el.screenshot({ path: path.join(OUTPUT_DIR, `desktop-section-${s}.png`) });
      console.log(`Captured desktop section: #${s}`);
    }
  }

  // 2. Mobile Audit (390x844 - iPhone 14)
  console.log('Switching to Mobile viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile-full.png'), fullPage: true });
  console.log('Captured mobile full-page screenshot.');

  // 3. Check for horizontal overflow
  const overflowCheck = await page.evaluate(() => {
    const docWidth = document.documentElement.offsetWidth;
    const bodyWidth = document.body.offsetWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const overflowingElements = [];
    document.querySelectorAll('*').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > window.innerWidth + 2) {
        overflowingElements.push({
          tag: el.tagName,
          id: el.id,
          className: el.className,
          right: rect.right,
          windowWidth: window.innerWidth,
        });
      }
    });
    return {
      docWidth,
      bodyWidth,
      scrollWidth,
      overflowingElements: overflowingElements.slice(0, 10),
    };
  });

  console.log('Mobile overflow check:', JSON.stringify(overflowCheck, null, 2));

  // 4. Tablet Audit (768x1024 - iPad)
  console.log('Switching to Tablet viewport (768x1024)...');
  await page.setViewport({ width: 768, height: 1024, isMobile: true, hasTouch: true });
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'tablet-full.png'), fullPage: true });
  console.log('Captured tablet full-page screenshot.');

  await browser.close();

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'audit-log.json'),
    JSON.stringify({ consoleMessages, overflowCheck }, null, 2)
  );
  console.log('Audit complete! Results saved in audit-output/');
}

audit().catch((err) => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
