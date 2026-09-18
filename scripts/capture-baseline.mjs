import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASELINE_DIR = path.join(process.cwd(), 'tests', 'screenshots', 'baseline');

if (!fs.existsSync(BASELINE_DIR)) {
  fs.mkdirSync(BASELINE_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900, isMobile: false },
  { name: 'desktop-1024x768', width: 1024, height: 768, isMobile: false },
  { name: 'tablet-768x1024', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: 'mobile-390x844', width: 390, height: 844, isMobile: true, hasTouch: true },
];

async function captureBaseline() {
  console.log('Starting Visual Baseline Capture...');
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\nCapturing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      deviceScaleFactor: vp.isMobile ? 2 : 1.5,
    });

    const page = await context.newPage();

    // Navigate to local Vite dev server
    try {
      await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      // Allow preloader to finish (2s progress + split curtain exit)
      await page.waitForTimeout(3500);

      // 1. Full page baseline screenshot
      const fullPath = path.join(BASELINE_DIR, `${vp.name}-full.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      console.log(`Saved full page: ${fullPath}`);

      // 2. Above-the-fold viewport screenshot
      const viewportPath = path.join(BASELINE_DIR, `${vp.name}-viewport.png`);
      await page.screenshot({ path: viewportPath, fullPage: false });
      console.log(`Saved viewport: ${viewportPath}`);

    } catch (err) {
      console.error(`Error capturing ${vp.name}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log('\nAll visual baseline screenshots successfully saved to tests/screenshots/baseline/');
}

captureBaseline().catch((err) => {
  console.error('Fatal error capturing baseline:', err);
  process.exit(1);
});
