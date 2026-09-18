import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PHASE3_DIR = path.join(process.cwd(), 'tests', 'screenshots', 'phase3');

if (!fs.existsSync(PHASE3_DIR)) {
  fs.mkdirSync(PHASE3_DIR, { recursive: true });
}

async function capturePhase3() {
  console.log('Starting Phase 3 Visual Capture...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  {
    console.log('Capturing Desktop 1440x900 Selected Work...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      isMobile: false,
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Scroll to #work
    await page.evaluate(() => {
      const el = document.getElementById('work');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    // 1a. Flagship card
    await page.screenshot({
      path: path.join(PHASE3_DIR, 'desktop-work-flagship.png'),
      fullPage: false,
    });

    // Scroll down to the editorial list
    await page.evaluate(() => {
      window.scrollBy({ top: 600, behavior: 'instant' });
    });
    await page.waitForTimeout(1000);

    // 1b. Hover over a project item to trigger Dennis Snellenberg floating preview
    const projectItem = page.locator('.group.cursor-pointer').filter({ hasText: 'MAVT' }).first();
    if (await projectItem.count() > 0) {
      const box = await projectItem.boundingBox();
      if (box) {
        // Move mouse to hover
        await page.mouse.move(box.x + 300, box.y + box.height / 2);
        await page.waitForTimeout(800);
      }
    }

    await page.screenshot({
      path: path.join(PHASE3_DIR, 'desktop-work-hover-preview.png'),
      fullPage: false,
    });

    // 1c. Click on project to open CaseStudyModal
    if (await projectItem.count() > 0) {
      await projectItem.click();
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(PHASE3_DIR, 'desktop-case-study-modal.png'),
        fullPage: false,
      });

      // Press Escape to test closing
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }

    await context.close();
  }

  // 2. Mobile 390x844
  {
    console.log('Capturing Mobile 390x844 Selected Work...');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Scroll to #work
    await page.evaluate(() => {
      const el = document.getElementById('work');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(PHASE3_DIR, 'mobile-work-flagship.png'),
      fullPage: false,
    });

    // Scroll down to see mobile project cards
    await page.evaluate(() => {
      window.scrollBy({ top: 750, behavior: 'instant' });
    });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(PHASE3_DIR, 'mobile-work-cards.png'),
      fullPage: false,
    });

    // Tap on a project to open modal on mobile
    const mobileProject = page.locator('.group.cursor-pointer').filter({ hasText: 'MAVT' }).first();
    if (await mobileProject.count() > 0) {
      await mobileProject.click();
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(PHASE3_DIR, 'mobile-case-study-modal.png'),
        fullPage: false,
      });
    }

    await context.close();
  }

  await browser.close();
  console.log(`Phase 3 visual captures successfully saved to ${PHASE3_DIR}`);
}

capturePhase3().catch((err) => {
  console.error('Fatal error capturing Phase 3:', err);
  process.exit(1);
});
