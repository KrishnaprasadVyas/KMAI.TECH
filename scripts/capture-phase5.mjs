import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PHASE5_DIR = path.join(process.cwd(), 'tests', 'screenshots', 'phase5');

if (!fs.existsSync(PHASE5_DIR)) {
  fs.mkdirSync(PHASE5_DIR, { recursive: true });
}

async function capturePhase5() {
  console.log('Starting Phase 5 Visual Capture (About & Process)...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  {
    console.log('Capturing Desktop 1440x900 About & Process...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      isMobile: false,
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Scroll to #about
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    // 1a. About section overview & founders
    await page.screenshot({
      path: path.join(PHASE5_DIR, 'desktop-about-leadership.png'),
      fullPage: false,
    });

    // Scroll to #process
    await page.evaluate(() => {
      const el = document.getElementById('process');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    // 1b. Process methodology & sticky tracker
    await page.screenshot({
      path: path.join(PHASE5_DIR, 'desktop-process-methodology.png'),
      fullPage: false,
    });

    await context.close();
  }

  // 2. Mobile 390x844
  {
    console.log('Capturing Mobile 390x844 About & Process...');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Scroll to #about
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(PHASE5_DIR, 'mobile-about-leadership.png'),
      fullPage: false,
    });

    // Scroll to #process
    await page.evaluate(() => {
      const el = document.getElementById('process');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(PHASE5_DIR, 'mobile-process-methodology.png'),
      fullPage: false,
    });

    await context.close();
  }

  await browser.close();
  console.log(`Phase 5 visual captures successfully saved to ${PHASE5_DIR}`);
}

capturePhase5().catch((err) => {
  console.error('Fatal error capturing Phase 5:', err);
  process.exit(1);
});
