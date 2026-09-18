import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PHASE6_DIR = path.join(process.cwd(), 'tests', 'screenshots', 'phase6');
const ARTIFACTS_DIR = 'C:\\Users\\abuna\\.gemini\\antigravity\\brain\\778c894e-cf6f-4f7f-af7b-0580001a9212\\screenshots';

if (!fs.existsSync(PHASE6_DIR)) {
  fs.mkdirSync(PHASE6_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

function saveScreenshot(sourcePath, fileName) {
  const targetPath = path.join(ARTIFACTS_DIR, fileName);
  fs.copyFileSync(sourcePath, targetPath);
}

async function capturePhase6() {
  console.log('Starting Phase 6 Visual Capture (Testimonials, Contact Dock, Footer)...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  {
    console.log('Capturing Desktop 1440x900 Phase 6 sections...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      isMobile: false,
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Scroll to #testimonials
    await page.evaluate(() => {
      const el = document.getElementById('testimonials');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    // 1a. Testimonials editorial pull-quote
    const pTestimonials = path.join(PHASE6_DIR, 'desktop-testimonials-editorial.png');
    await page.screenshot({ path: pTestimonials, fullPage: false });
    saveScreenshot(pTestimonials, 'desktop-testimonials-editorial.png');

    // Scroll down to Trust & Partners
    await page.evaluate(() => {
      window.scrollBy({ top: 500, behavior: 'instant' });
    });
    await page.waitForTimeout(1000);

    const pTrust = path.join(PHASE6_DIR, 'desktop-trust-partners.png');
    await page.screenshot({ path: pTrust, fullPage: false });
    saveScreenshot(pTrust, 'desktop-trust-partners.png');

    // Scroll to #contact
    await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 40;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    // 1b. Contact Commission Dock initial state
    const pContact = path.join(PHASE6_DIR, 'desktop-contact-commission-dock.png');
    await page.screenshot({ path: pContact, fullPage: false });
    saveScreenshot(pContact, 'desktop-contact-commission-dock.png');

    // Interact with form: select pills, type sample info, submit
    await page.click('button:has-text("Software Architecture")');
    await page.click('button:has-text("₹5L – ₹15L")');
    await page.fill('input[placeholder="e.g. Rahul Mehta"]', 'Vikramaditya Singhania');
    await page.fill('input[placeholder="rahul@company.com"]', 'vikram@enterprise-matrix.io');
    await page.fill('input[placeholder*="Acme Health"]', 'Singhania Logistics Group');
    await page.fill('textarea[placeholder*="bottleneck"]', 'Need high-throughput warehouse tracking systems with real-time telematics dashboard.');
    await page.click('button:has-text("TRANSMIT COMMISSION BRIEF")');
    await page.waitForTimeout(600);
    await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 40;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(800);

    // 1c. Contact Commission Dock compiled state
    const pContactCompiled = path.join(PHASE6_DIR, 'desktop-contact-compiled.png');
    await page.screenshot({ path: pContactCompiled, fullPage: false });
    saveScreenshot(pContactCompiled, 'desktop-contact-compiled.png');

    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    });
    await page.waitForTimeout(1500);

    // 1d. Studio Footer
    const pFooter = path.join(PHASE6_DIR, 'desktop-studio-footer.png');
    await page.screenshot({ path: pFooter, fullPage: false });
    saveScreenshot(pFooter, 'desktop-studio-footer.png');

    await context.close();
  }

  // 2. Mobile 390x844 (iPhone 14)
  {
    console.log('Capturing Mobile 390x844 Phase 6 sections...');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Scroll to #testimonials
    await page.evaluate(() => {
      const el = document.getElementById('testimonials');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    const pMobTestimonials = path.join(PHASE6_DIR, 'mobile-testimonials-editorial.png');
    await page.screenshot({ path: pMobTestimonials, fullPage: false });
    saveScreenshot(pMobTestimonials, 'mobile-testimonials-editorial.png');

    // Scroll to #contact
    await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);

    const pMobContact = path.join(PHASE6_DIR, 'mobile-contact-commission-dock.png');
    await page.screenshot({ path: pMobContact, fullPage: false });
    saveScreenshot(pMobContact, 'mobile-contact-commission-dock.png');

    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    });
    await page.waitForTimeout(1500);

    const pMobFooter = path.join(PHASE6_DIR, 'mobile-studio-footer.png');
    await page.screenshot({ path: pMobFooter, fullPage: false });
    saveScreenshot(pMobFooter, 'mobile-studio-footer.png');

    await context.close();
  }

  await browser.close();
  console.log('Phase 6 Visual Capture successfully completed!');
}

capturePhase6().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
