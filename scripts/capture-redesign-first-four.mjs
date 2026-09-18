import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const OUTPUT_DIR = 'C:/Users/abuna/.gemini/antigravity/brain/778c894e-cf6f-4f7f-af7b-0580001a9212/screenshots';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function scrollToSelectorWithOffset(page, selector, offset = 90) {
  await page.evaluate(({ sel, off }) => {
    const el = document.querySelector(sel);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - off;
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
  }, { sel: selector, off: offset });
  await page.waitForTimeout(600);
}

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // ==========================================
  // 1. DESKTOP VIEWPORT (1440x900)
  // ==========================================
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  // Set visited in sessionStorage to accelerate preloader
  await desktopPage.addInitScript(() => {
    sessionStorage.setItem('kmai_visited', 'true');
  });
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  // Wait for preloader to be removed and hero entrance animation to settle
  await desktopPage.waitForSelector('#hero', { state: 'visible' });
  await desktopPage.waitForTimeout(4500);

  // 1A. Desktop Hero
  await desktopPage.screenshot({
    path: path.join(OUTPUT_DIR, 'redesign-01-hero-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('Captured redesign-01-hero-desktop.png');

  // 1B. Desktop Manifesto
  await scrollToSelectorWithOffset(desktopPage, '#manifesto', 80);
  await desktopPage.screenshot({
    path: path.join(OUTPUT_DIR, 'redesign-02-manifesto-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('Captured redesign-02-manifesto-desktop.png');

  // 1C. Desktop Flagship Case Study
  await scrollToSelectorWithOffset(desktopPage, '[data-flagship="true"]', 90);
  await desktopPage.screenshot({
    path: path.join(OUTPUT_DIR, 'redesign-03-flagship-desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 },
  });
  console.log('Captured redesign-03-flagship-desktop.png');

  await desktopContext.close();

  // ==========================================
  // 2. MOBILE VIEWPORT (390x844)
  // ==========================================
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.addInitScript(() => {
    sessionStorage.setItem('kmai_visited', 'true');
  });
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForSelector('#hero', { state: 'visible' });
  await mobilePage.waitForTimeout(4500);

  // 2A. Mobile Hero
  await mobilePage.screenshot({
    path: path.join(OUTPUT_DIR, 'redesign-04-hero-mobile.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });
  console.log('Captured redesign-04-hero-mobile.png');

  // 2B. Mobile Manifesto
  await scrollToSelectorWithOffset(mobilePage, '#manifesto', 80);
  await mobilePage.screenshot({
    path: path.join(OUTPUT_DIR, 'redesign-05-manifesto-mobile.png'),
  });
  console.log('Captured redesign-05-manifesto-mobile.png');

  // 2C. Mobile Flagship Case Study
  await scrollToSelectorWithOffset(mobilePage, '[data-flagship="true"]', 80);
  await mobilePage.screenshot({
    path: path.join(OUTPUT_DIR, 'redesign-06-flagship-mobile.png'),
  });
  console.log('Captured redesign-06-flagship-mobile.png');

  await mobileContext.close();
  await browser.close();
  console.log('All redesigned captures completed successfully.');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
