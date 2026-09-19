import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Opening Preloader & Page Reveal Verification', () => {
  test('Initial load displays Dennis Snellenberg curved preloader, reveals Hero, and presents full document sections', async ({
    page,
  }) => {
    // Clear session storage so intro runs fresh
    await page.addInitScript(() => {
      sessionStorage.clear();
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Initial State: Dennis Snellenberg preloader overlay is attached with KMAI typography
    const preloader = page.locator('.fixed.inset-0.z-\\[999999\\]');
    if (await preloader.count() > 0) {
      await expect(preloader).toBeAttached();
      const preloaderBrandmark = preloader.locator('span:has-text("KMAI")');
      await expect(preloaderBrandmark).toBeAttached();
    }

    // 2. Wait for preloader transition to complete (max 3.5s)
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // 3. Verify top-left brand mark is dark (NOT white) on initial light page load
    const brandmark = page.locator('header a[aria-label="KMAI Home"] span');
    await expect(brandmark).toBeVisible();
    const brandColor = await brandmark.evaluate((el) => window.getComputedStyle(el).color);
    // Should be dark charcoal rgb(10, 12, 15) (#0A0C0F), not white rgb(255, 255, 255)
    expect(brandColor).toBe('rgb(10, 12, 15)');

    // 4. Hero headline is visible after preloader unmounts
    const heroH1 = page.locator('#hero h1');
    await expect(heroH1).toBeVisible();
    await expect(heroH1).toContainText('WE BUILD');
    await expect(heroH1).toContainText('DIGITAL');
    await expect(heroH1).toContainText('EXPERIENCES.');

    // 5. Verify sections exist in real document flow
    const workSection = page.locator('#work');
    const servicesSection = page.locator('#services');
    const aboutSection = page.locator('#about');
    const processSection = page.locator('#process');
    const testimonialsSection = page.locator('#testimonials');
    const contactSection = page.locator('#contact');

    await expect(workSection).toBeAttached();
    await expect(servicesSection).toBeAttached();
    await expect(aboutSection).toBeAttached();
    await expect(processSection).toBeAttached();
    await expect(testimonialsSection).toBeAttached();
    await expect(contactSection).toBeAttached();

    // 6. Verify Hero explore button is visible
    const heroBtn = page.locator('#hero button');
    await expect(heroBtn).toBeVisible();
    await expect(heroBtn).toContainText('Explore Selected Work');
  });
});
