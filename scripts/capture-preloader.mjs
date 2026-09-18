import { chromium } from 'playwright';
import path from 'path';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Clear sessionStorage so preloader runs full transition
  await page.addInitScript(() => {
    sessionStorage.clear();
  });

  // Navigate to root and wait for DOM content loaded
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // Wait 700ms into the load to capture preloader in active progress
  await page.waitForTimeout(700);

  const screenshotPath = path.join(
    process.env.USERPROFILE || 'C:\\Users\\abuna',
    '.gemini\\antigravity\\brain\\778c894e-cf6f-4f7f-af7b-0580001a9212\\screenshots\\preloader-minimalist.png'
  );

  await page.screenshot({ path: screenshotPath });
  console.log(`Preloader screenshot saved: ${screenshotPath}`);

  await page.waitForTimeout(2000);
  await browser.close();
  console.log('Capture complete.');
}

main().catch(console.error);
