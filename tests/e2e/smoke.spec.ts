import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Visual & Smoke Verification', () => {
  test('homepage loads successfully without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);

    // Title verification
    await expect(page).toHaveTitle(/KMAI\.tech/);

    // Wait for preloader transition to complete (max 3.5s)
    await page.waitForTimeout(3000);

    // Filter out expected environment notices if any
    const fatalErrors = consoleErrors.filter(
      (msg) => !msg.includes('React DevTools') && !msg.includes('favicon')
    );
    expect(fatalErrors).toEqual([]);
  });

  test('all major content sections are present in the DOM', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);

    const sections = [
      '#hero',
      '#manifesto',
      '#work',
      '#services',
      '#about',
      '#testimonials',
      '#contact',
    ];

    for (const selector of sections) {
      const section = page.locator(selector);
      await expect(section).toBeAttached();
    }
  });

  test('layout does not produce horizontal scroll overflow', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);

    const overflowInfo = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      return { docWidth, scrollWidth, hasOverflow: scrollWidth > docWidth + 2 };
    });

    expect(overflowInfo.hasOverflow).toBe(false);
  });
});
