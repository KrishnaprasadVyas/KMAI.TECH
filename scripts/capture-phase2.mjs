import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PHASE2_DIR = path.join(process.cwd(), 'tests', 'screenshots', 'phase2');

if (!fs.existsSync(PHASE2_DIR)) {
  fs.mkdirSync(PHASE2_DIR, { recursive: true });
}

async function capturePhase2() {
  console.log('Starting Phase 2 Visual Capture...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  {
    console.log('Capturing Desktop 1440x900 Hero & Manifesto...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      isMobile: false,
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Let preloader and entrance animation settle
    await page.waitForTimeout(6000);

    // Hero viewport
    await page.screenshot({
      path: path.join(PHASE2_DIR, 'desktop-hero-rebuilt.png'),
      fullPage: false,
    });

    // Scroll down to Manifesto with navbar offset
    await page.evaluate(() => {
      const el = document.getElementById('manifesto');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    // Allow scroll-scrub to animate
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: path.join(PHASE2_DIR, 'desktop-manifesto-rebuilt.png'),
      fullPage: false,
    });

    await context.close();
  }

  // 2. Mobile 390x844
  {
    console.log('Capturing Mobile 390x844 Hero & Manifesto...');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(6000);

    // Mobile Hero
    await page.screenshot({
      path: path.join(PHASE2_DIR, 'mobile-hero-rebuilt.png'),
      fullPage: false,
    });

    // Scroll to Manifesto with offset
    await page.evaluate(() => {
      const el = document.getElementById('manifesto');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: path.join(PHASE2_DIR, 'mobile-manifesto-rebuilt.png'),
      fullPage: false,
    });

    await context.close();
  }

  await browser.close();
  console.log(`Phase 2 captures successfully saved to ${PHASE2_DIR}`);
}

capturePhase2().catch((err) => {
  console.error('Fatal error capturing Phase 2:', err);
  process.exit(1);
});
