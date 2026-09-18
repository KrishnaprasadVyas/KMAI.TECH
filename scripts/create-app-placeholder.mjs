import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function makePlaceholder() {
  const dir = path.join(process.cwd(), 'public', 'projects', 'gurudev-app');
  fs.mkdirSync(dir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
    },
  });

  const page = await browser.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1440px;
            height: 900px;
            background: #05070B;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #FFFFFF;
            overflow: hidden;
            position: relative;
          }
          .glow {
            position: absolute;
            width: 500px;
            height: 500px;
            background: rgba(0, 110, 255, 0.15);
            filter: blur(120px);
            border-radius: 50%;
          }
          .card {
            position: relative;
            z-index: 10;
            width: 960px;
            padding: 60px;
            background: #08111F;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.8);
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .tag {
            font-family: monospace;
            font-size: 13px;
            letter-spacing: 0.2em;
            color: #006EFF;
            text-transform: uppercase;
          }
          h1 {
            font-size: 44px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #FFFFFF;
          }
          p {
            font-size: 18px;
            color: #A0A7B1;
            line-height: 1.6;
            max-width: 700px;
          }
          .meta-box {
            margin-top: 16px;
            padding: 24px;
            background: #05070B;
            border: 1px dashed rgba(0, 110, 255, 0.4);
            border-radius: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .instruction {
            font-family: monospace;
            font-size: 13px;
            color: #38BDF8;
          }
          .badge {
            padding: 6px 14px;
            background: rgba(0, 110, 255, 0.15);
            border: 1px solid #006EFF;
            border-radius: 999px;
            font-family: monospace;
            font-size: 12px;
            color: #FFFFFF;
          }
        </style>
      </head>
      <body>
        <div class="glow"></div>
        <div class="card">
          <div class="tag">// ASSET PENDING • MOBILE APPLICATION</div>
          <h1>Shri Gurudev Ashram App</h1>
          <p>
            Native mobile ecosystem for the Shri Gurudev Ashram community featuring yatra booking, donations, profiles, and collector workflows.
          </p>
          <div class="meta-box">
            <div class="instruction">
              [ REAL APP SCREENSHOT PENDING ]<br>
              Drop actual capture into /public/projects/gurudev-app/hero.webp
            </div>
            <div class="badge">React Native • Expo • Supabase</div>
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.screenshot({ path: path.join(dir, 'hero.webp'), type: 'webp', quality: 95 });
  await page.screenshot({ path: path.join(dir, 'screenshot-01.webp'), type: 'webp', quality: 95 });
  console.log('Created clean branded placeholder in public/projects/gurudev-app/');
  await browser.close();
}

makePlaceholder().catch(console.error);
