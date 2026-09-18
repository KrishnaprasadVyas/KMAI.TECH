import { chromium } from 'playwright';
import path from 'path';

async function main() {
  const browser = await chromium.launch();
  const baseDir = path.join(
    process.env.USERPROFILE || 'C:\\Users\\abuna',
    '.gemini\\antigravity\\brain\\778c894e-cf6f-4f7f-af7b-0580001a9212\\screenshots'
  );

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    console.log(`Auditing viewport: ${vp.name}...`);
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Capture Hero
    const heroPath = path.join(baseDir, `redline-hero-${vp.name}.png`);
    const heroEl = await page.$('#hero');
    if (heroEl) {
      await heroEl.screenshot({ path: heroPath });
      console.log(`Saved: ${heroPath}`);
    }

    // Capture Work Section (and hover/mouse over thumbnail on desktop to test mask reveal)
    if (vp.name === 'desktop-1440') {
      const inspectable = await page.$('[data-mask-reveal="true"]');
      if (inspectable) {
        const box = await inspectable.boundingBox();
        if (box) {
          // Move mouse to center of thumbnail
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.waitForTimeout(300);
        }
      }
    }

    const workPath = path.join(baseDir, `redline-work-${vp.name}.png`);
    const workEl = await page.$('#work');
    if (workEl) {
      await workEl.screenshot({ path: workPath });
      console.log(`Saved: ${workPath}`);
    }

    // Capture Capabilities
    const capPath = path.join(baseDir, `redline-capabilities-${vp.name}.png`);
    const capEl = await page.$('#capabilities');
    if (capEl) {
      await capEl.screenshot({ path: capPath });
      console.log(`Saved: ${capPath}`);
    }

    // Capture Personnel
    const persPath = path.join(baseDir, `redline-personnel-${vp.name}.png`);
    const persEl = await page.$('#personnel');
    if (persEl) {
      await persEl.screenshot({ path: persPath });
      console.log(`Saved: ${persPath}`);
    }

    // Capture Contact
    const contactPath = path.join(baseDir, `redline-contact-${vp.name}.png`);
    const contactEl = await page.$('#contact');
    if (contactEl) {
      await contactEl.screenshot({ path: contactPath });
      console.log(`Saved: ${contactPath}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('Redline audit captures completed.');
}

main().catch(console.error);
