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
  console.log('Starting full site visual audit across viewports...');
  const browser = await chromium.launch({ headless: true });

  const consoleLogs = [];

  for (const vp of VIEWPORTS) {
    console.log(`\nCapturing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
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
      await page.waitForTimeout(4000); // allow preloader and entrance animations to settle

      // 1. Hero
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      const heroPath = path.join(ARTIFACTS_DIR, `site-01-hero-${vp.name}.png`);
      await page.screenshot({ path: heroPath, fullPage: false });
      console.log(`Saved: ${heroPath}`);

      // 2. Manifesto
      const manifesto = page.locator('#manifesto');
      if (await manifesto.count() > 0) {
        await manifesto.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        const manifestoPath = path.join(ARTIFACTS_DIR, `site-02-manifesto-${vp.name}.png`);
        await page.screenshot({ path: manifestoPath, fullPage: false });
        console.log(`Saved: ${manifestoPath}`);
      }

      // 3. Selected Work
      const work = page.locator('#work');
      if (await work.count() > 0) {
        await work.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        const workPath = path.join(ARTIFACTS_DIR, `site-03-work-${vp.name}.png`);
        await page.screenshot({ path: workPath, fullPage: false });
        console.log(`Saved: ${workPath}`);
      }

      // 4. Services
      const services = page.locator('#services');
      if (await services.count() > 0) {
        await services.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        const servicesPath = path.join(ARTIFACTS_DIR, `site-04-services-${vp.name}.png`);
        await page.screenshot({ path: servicesPath, fullPage: false });
        console.log(`Saved: ${servicesPath}`);
      }

      // 5. Studio / About
      const about = page.locator('#about');
      if (await about.count() > 0) {
        await about.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        const aboutPath = path.join(ARTIFACTS_DIR, `site-05-about-${vp.name}.png`);
        await page.screenshot({ path: aboutPath, fullPage: false });
        console.log(`Saved: ${aboutPath}`);
      }

      // 6. Process
      const processSec = page.locator('#process');
      if (await processSec.count() > 0) {
        await processSec.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        const processPath = path.join(ARTIFACTS_DIR, `site-06-process-${vp.name}.png`);
        await page.screenshot({ path: processPath, fullPage: false });
        console.log(`Saved: ${processPath}`);
      }

      // 7. Client Voices / Testimonials
      const testimonials = page.locator('#testimonials');
      if (await testimonials.count() > 0) {
        await testimonials.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        const testPath = path.join(ARTIFACTS_DIR, `site-07-testimonials-${vp.name}.png`);
        await page.screenshot({ path: testPath, fullPage: false });
        console.log(`Saved: ${testPath}`);
      }

      // 8. Contact & Footer
      const contact = page.locator('#contact');
      if (await contact.count() > 0) {
        await contact.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        const contactPath = path.join(ARTIFACTS_DIR, `site-08-contact-${vp.name}.png`);
        await page.screenshot({ path: contactPath, fullPage: false });
        console.log(`Saved: ${contactPath}`);
      }

    } catch (err) {
      console.error(`Error on ${vp.name}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();

  console.log('\n--- Console Audit ---');
  if (consoleLogs.length === 0) {
    console.log('Zero console errors or warnings!');
  } else {
    console.log(consoleLogs.join('\n'));
  }
}

run().catch(console.error);
