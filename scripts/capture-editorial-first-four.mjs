import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/abuna/.gemini/antigravity/brain/778c894e-cf6f-4f7f-af7b-0580001a9212/screenshots';

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900, isMobile: false },
  { name: 'tablet-768', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: 'mobile-390', width: 390, height: 844, isMobile: true, hasTouch: true },
];

async function run() {
  console.log('Capturing First Four Areas with full settling...');
  const browser = await chromium.launch({ headless: true });

  const consoleLogs = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      deviceScaleFactor: vp.isMobile ? 2 : 1.5,
    });

    const page = await context.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleLogs.push(`[${vp.name}] ${msg.type()}: ${msg.text()}`);
      }
    });

    try {
      await page.addInitScript(() => {
        sessionStorage.setItem('kmai_visited', 'true');
      });

      await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 20000 });
      // Wait for preloader and all entrance animations to completely settle
      await page.waitForTimeout(4500);

      // 1. Header & Hero above the fold (top: 0)
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      const heroPath = path.join(ARTIFACTS_DIR, `editorial-01-hero-${vp.name}.png`);
      await page.screenshot({ path: heroPath, fullPage: false });
      console.log(`Saved: ${heroPath}`);

      // 2. Scroll to Selected Work Intro
      const introSection = page.locator('#work-intro');
      if (await introSection.count() > 0) {
        await introSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const introPath = path.join(ARTIFACTS_DIR, `editorial-02-work-intro-${vp.name}.png`);
        await page.screenshot({ path: introPath, fullPage: false });
        console.log(`Saved: ${introPath}`);
      }

      // 3. Scroll to Flagship Project 01 plate
      const flagship = page.locator('[data-flagship="true"]');
      if (await flagship.count() > 0) {
        await flagship.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const flagshipPath = path.join(ARTIFACTS_DIR, `editorial-03-project01-${vp.name}.png`);
        await page.screenshot({ path: flagshipPath, fullPage: false });
        console.log(`Saved: ${flagshipPath}`);
      }

    } catch (err) {
      console.error(`Error on ${vp.name}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();

  console.log('\n--- Console Logs ---');
  if (consoleLogs.length === 0) {
    console.log('Zero console errors or warnings!');
  } else {
    console.log(consoleLogs.join('\n'));
  }
}

run().catch(console.error);
