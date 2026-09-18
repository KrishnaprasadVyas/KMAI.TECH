import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Art-Directed Redesign (First 4 Areas)', () => {
  test('does not contain deprecated AI glow or noise overlays', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3000);

    // Verify noise-overlay is gone
    const noise = await page.$('.noise-overlay');
    expect(noise).toBeNull();

    // Verify no text-glow or box-glow classes exist in the DOM
    const glowElements = await page.$$('.text-glow, .box-glow, .box-glow-lg');
    expect(glowElements.length).toBe(0);
  });
});
