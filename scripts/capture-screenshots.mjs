import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sites = [
  {
    name: 'gurudev-ashram',
    url: 'https://shrigurudevashram.org/',
    scrollOffsets: [0, 800, 1600],
  },
  {
    name: 'shanti-ashram',
    url: 'https://shantiashramtrust.org/',
    scrollOffsets: [0, 750],
  },
  {
    name: 'mavt',
    url: 'https://mavt.in/',
    scrollOffsets: [0, 700],
  },
  {
    name: 'priya-surana',
    url: 'https://www.priyasurana.in/',
    scrollOffsets: [0, 600],
  },
  {
    name: 'vishwaraj',
    url: 'https://www.vishwarajpolychem.com/',
    scrollOffsets: [0, 800],
  },
];

async function capture() {
  console.log('Launching headless Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--hide-scrollbars'],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
    },
  });

  for (const site of sites) {
    const dir = path.join(process.cwd(), 'public', 'projects', site.name);
    fs.mkdirSync(dir, { recursive: true });

    console.log(`\nNavigating to ${site.name} (${site.url})...`);
    const page = await browser.newPage();
    
    // Set realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait extra for animations and webfonts
      await new Promise((r) => setTimeout(r, 2500));

      for (let i = 0; i < site.scrollOffsets.length; i++) {
        const offset = site.scrollOffsets[i];
        if (offset > 0) {
          await page.evaluate((y) => window.scrollTo(0, y), offset);
          await new Promise((r) => setTimeout(r, 1200));
        }

        const filename = i === 0 ? 'hero.webp' : `screenshot-0${i}.webp`;
        const filePath = path.join(dir, filename);
        await page.screenshot({ path: filePath, type: 'webp', quality: 90 });
        console.log(`Saved: ${filePath}`);
      }
    } catch (err) {
      console.error(`Error capturing ${site.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\nAll live captures completed successfully!');
}

capture().catch((e) => {
  console.error('Fatal capture error:', e);
  process.exit(1);
});
