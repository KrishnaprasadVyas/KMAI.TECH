import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PHASE4_DIR = path.join(process.cwd(), 'tests', 'screenshots', 'phase4');

if (!fs.existsSync(PHASE4_DIR)) {
  fs.mkdirSync(PHASE4_DIR, { recursive: true });
}

async function capturePhase4() {
  console.log('Starting Phase 4 Visual Capture (Services - 4 Core Pillars)...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  {
    console.log('Capturing Desktop 1440x900 Services...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      isMobile: false,
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Scroll to #services with navbar offset
    await page.evaluate(() => {
      const el = document.getElementById('services');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    // 1a. Services header & default active pillar (01 Software)
    await page.screenshot({
      path: path.join(PHASE4_DIR, 'desktop-services-pillar1.png'),
      fullPage: false,
    });

    // 1b. Click on 04 AI SOLUTIONS or 03 AUTOMATION to test accordion expansion
    const aiService = page.locator('#services .group.cursor-pointer').filter({ hasText: 'AI SOLUTIONS' }).first();
    if (await aiService.count() > 0) {
      await aiService.click();
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(PHASE4_DIR, 'desktop-services-pillar4-ai.png'),
        fullPage: false,
      });
    }

    await context.close();
  }

  // 2. Mobile 390x844
  {
    console.log('Capturing Mobile 390x844 Services...');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Scroll to #services with offset
    await page.evaluate(() => {
      const el = document.getElementById('services');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1000);

    // 2a. Mobile services header & default open pillar
    await page.screenshot({
      path: path.join(PHASE4_DIR, 'mobile-services-overview.png'),
      fullPage: false,
    });

    // 2b. Scroll slightly down inside services to view expanded drawer details
    await page.evaluate(() => {
      window.scrollBy({ top: 350, behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(PHASE4_DIR, 'mobile-services-expanded-drawer.png'),
      fullPage: false,
    });

    await context.close();
  }

  await browser.close();
  console.log(`Phase 4 visual captures successfully saved to ${PHASE4_DIR}`);
}

capturePhase4().catch((err) => {
  console.error('Fatal error capturing Phase 4:', err);
  process.exit(1);
});
