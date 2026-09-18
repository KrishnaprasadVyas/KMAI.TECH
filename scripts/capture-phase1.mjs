import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PHASE1_DIR = path.join(process.cwd(), 'tests', 'screenshots', 'phase1');

if (!fs.existsSync(PHASE1_DIR)) {
  fs.mkdirSync(PHASE1_DIR, { recursive: true });
}

async function capturePhase1() {
  console.log('Capturing Phase 1 Visual Verifications...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  {
    console.log('Capturing Desktop 1440x900...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      isMobile: false,
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', (err) => console.error('BROWSER ERROR:', err));
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Allow preloader to finish (3.3s) and hero entrance animation (2.0s) to settle
    await page.waitForTimeout(6000);

    await page.screenshot({
      path: path.join(PHASE1_DIR, 'desktop-hero-viewport.png'),
      fullPage: false,
    });

    // Close-up on the hero GeometricK element if present
    const heroK = page.locator('section#hero, .geometric-k-container, svg').first();
    if (await heroK.count() > 0) {
      await heroK.screenshot({
        path: path.join(PHASE1_DIR, 'desktop-hero-k-element.png'),
      });
    }

    // Close-up on navbar
    const navbar = page.locator('nav').first();
    if (await navbar.count() > 0) {
      await navbar.screenshot({
        path: path.join(PHASE1_DIR, 'desktop-navbar.png'),
      });
    }

    await context.close();
  }

  // 2. Mobile 390x844
  {
    console.log('Capturing Mobile 390x844...');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(6000);

    await page.screenshot({
      path: path.join(PHASE1_DIR, 'mobile-hero-viewport.png'),
      fullPage: false,
    });

    await context.close();
  }

  await browser.close();
  console.log(`Phase 1 verification screenshots saved to ${PHASE1_DIR}`);
}

capturePhase1().catch((err) => {
  console.error('Fatal error capturing phase 1:', err);
  process.exit(1);
});
