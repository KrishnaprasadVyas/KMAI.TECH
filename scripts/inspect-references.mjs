import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'audit-output', 'references');
const ARTIFACTS_DIR = 'C:\\Users\\abuna\\.gemini\\antigravity\\brain\\778c894e-cf6f-4f7f-af7b-0580001a9212\\screenshots';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

function saveScreenshot(sourcePath, fileName) {
  const targetPath = path.join(ARTIFACTS_DIR, fileName);
  fs.copyFileSync(sourcePath, targetPath);
}

const references = [
  { name: 'uncommon', url: 'https://uncommonstudio.com.au/' },
  { name: 'dennis', url: 'https://dennissnellenberg.com/' },
  { name: 'minhpham', url: 'https://minhpham.design/' },
  { name: 'cappen', url: 'https://cappen.com/' },
];

async function inspectSites() {
  const browser = await chromium.launch({ headless: true });
  const report = {};

  for (const ref of references) {
    console.log(`\n========================================`);
    console.log(`Inspecting ${ref.name}: ${ref.url}`);
    console.log(`========================================`);

    try {
      // 1. Desktop Context
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      });
      const page = await context.newPage();

      console.log(`Loading desktop ${ref.url}...`);
      await page.goto(ref.url, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch((e) => {
        console.warn(`Load warning for ${ref.name}: ${e.message}`);
      });
      await page.waitForTimeout(3500);

      // Capture desktop screenshot
      const desktopShot = path.join(OUT_DIR, `${ref.name}-desktop.png`);
      await page.screenshot({ path: desktopShot, fullPage: false });
      saveScreenshot(desktopShot, `ref-${ref.name}-desktop.png`);

      // Scroll down and capture second view
      await page.evaluate(() => window.scrollBy({ top: 850, behavior: 'instant' }));
      await page.waitForTimeout(1500);
      const desktopShot2 = path.join(OUT_DIR, `${ref.name}-desktop-scroll.png`);
      await page.screenshot({ path: desktopShot2, fullPage: false });
      saveScreenshot(desktopShot2, `ref-${ref.name}-desktop-scroll.png`);

      // Extract design tokens, fonts, typography, colors, layout
      const designAnalysis = await page.evaluate(() => {
        const body = document.body;
        const bodyStyle = window.getComputedStyle(body);

        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, a, span'))
          .slice(0, 80)
          .map((el) => {
            const cs = window.getComputedStyle(el);
            const text = el.innerText ? el.innerText.trim().slice(0, 60) : '';
            return {
              tag: el.tagName.toLowerCase(),
              text,
              fontSize: cs.fontSize,
              fontWeight: cs.fontWeight,
              lineHeight: cs.lineHeight,
              letterSpacing: cs.letterSpacing,
              fontFamily: cs.fontFamily,
              color: cs.color,
            };
          })
          .filter((item) => item.text.length > 3);

        const fontFamilies = Array.from(new Set(headings.map((h) => h.fontFamily)));
        const fontSizes = Array.from(
          new Set(headings.map((h) => parseFloat(h.fontSize)))
        ).sort((a, b) => b - a);

        return {
          title: document.title,
          bgColor: bodyStyle.backgroundColor,
          textColor: bodyStyle.color,
          fontFamilies,
          topFontSizesPx: fontSizes.slice(0, 8),
          sampleHeadings: headings
            .filter((h) => parseFloat(h.fontSize) >= 28)
            .slice(0, 6),
          sampleBody: headings
            .filter((h) => parseFloat(h.fontSize) >= 14 && parseFloat(h.fontSize) <= 20)
            .slice(0, 6),
          sampleMicro: headings
            .filter((h) => parseFloat(h.fontSize) <= 13)
            .slice(0, 6),
        };
      });

      report[ref.name] = designAnalysis;
      await context.close();

      // 2. Mobile Context
      const mobileContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      });
      const mobPage = await mobileContext.newPage();
      await mobPage.goto(ref.url, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch((e) => {
        console.warn(`Mobile load warning for ${ref.name}: ${e.message}`);
      });
      await mobPage.waitForTimeout(3000);

      const mobileShot = path.join(OUT_DIR, `${ref.name}-mobile.png`);
      await mobPage.screenshot({ path: mobileShot, fullPage: false });
      saveScreenshot(mobileShot, `ref-${ref.name}-mobile.png`);

      await mobileContext.close();
      console.log(`Successfully analyzed ${ref.name}!`);
    } catch (err) {
      console.error(`Error analyzing ${ref.name}:`, err.message);
      report[ref.name] = { error: err.message };
    }
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUT_DIR, 'analysis-summary.json'),
    JSON.stringify(report, null, 2),
    'utf-8'
  );
  console.log(`\nAnalysis summary saved to ${path.join(OUT_DIR, 'analysis-summary.json')}`);
}

inspectSites();
