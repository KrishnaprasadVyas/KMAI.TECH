import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Art-Directed Redesign (First 4 Areas)', () => {
  test('does not contain deprecated AI glow or noise overlays', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    // Verify noise-overlay is gone
    const noise = await page.$('.noise-overlay');
    expect(noise).toBeNull();

    // Verify no text-glow or box-glow classes exist in the DOM
    const glowElements = await page.$$('.text-glow, .box-glow, .box-glow-lg');
    expect(glowElements.length).toBe(0);
  });

  test('header features architectural layout without rounded glow pills', async ({ page, isMobile }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    const header = page.locator('header');
    await expect(header).toBeVisible();

    if (!isMobile) {
      // Navigation links use indexed editorial format
      const workLink = header.locator('a[href="#work"]');
      await expect(workLink).toContainText('01 // WORK');

      // Commission button has architectural label
      const commissionBtn = header.locator('a:has-text("COMMISSION")');
      await expect(commissionBtn).toBeVisible();
    } else {
      // Mobile menu toggle button is visible
      const menuBtn = header.locator('button[aria-label="Toggle navigation menu"]');
      await expect(menuBtn).toBeVisible();
    }

    // Verify header has clean hairline border without blurry glow pills
    const headerClasses = await header.getAttribute('class');
    expect(headerClasses).not.toContain('shadow-[0_0_25px');
  });

  test('hero section features monumental typography and structural K integration', async ({ page, isMobile }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3500);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Check monumental headline
    const h1 = hero.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('WE ARCHITECT');

    if (!isMobile) {
      const fontSize = await h1.evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));
      expect(fontSize).toBeGreaterThanOrEqual(60);
    }

    // Verify zero glowing sphere blurred divs in hero
    const glowingSphere = await page.$('#hero [class*="blur-[150px]"], #hero [class*="blur-[130px]"]');
    expect(glowingSphere).toBeNull();
  });
});
