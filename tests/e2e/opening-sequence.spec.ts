import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Opening Scroll Sequence Verification', () => {
  test('Initial load displays monumental geometric K dominating viewport, unmasks on scroll, reveals sections, and unlocks normal document flow at Contact', async ({
    page,
    isMobile,
  }) => {
    // Clear session storage so intro runs fresh
    await page.addInitScript(() => {
      sessionStorage.clear();
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Initial State: Full-screen monumental K overlay is visible, website is hidden
    const kOverlay = page.locator('[data-testid="monumental-k-overlay"]');
    await expect(kOverlay).toBeVisible();

    // Verify K graphic and "SCROLL TO ENTER" indicator exist
    const kGraphic = kOverlay.locator('svg[viewBox="48 22 104 154"]');
    await expect(kGraphic).toBeVisible();
    await expect(kOverlay).toContainText('SCROLL TO ENTER');

    // Verify Navbar is initially hidden during full-screen K opening
    const navbar = page.locator('#kmai-navbar');
    if (await navbar.count() > 0) {
      const navOpacity = await navbar.evaluate((el) => window.getComputedStyle(el).opacity);
      expect(parseFloat(navOpacity)).toBeLessThanOrEqual(0.1);
    }

    // 2. Scroll begins: K transforms/scales, revealing Hero and Navbar
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(500);

    // Hero headline is present and emerging
    const heroH1 = page.locator('#hero h1');
    await expect(heroH1).toBeAttached();

    // 3. Progressive Scroll: Lower sections exist in real document positions
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

    // 4. Continuous scroll through sections down to Contact
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(100);
    }

    // Scroll window to trigger completion threshold at contact
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    });

    await page.waitForTimeout(600);

    // 5. Final Reveal: Contact is reached and normal document flow is established
    await expect(contactSection).toBeVisible();
    await expect(contactSection).toContainText('SOMETHING');

    // Verify K overlay is no longer active/blocking
    const overlayCount = await page.locator('[data-testid="monumental-k-overlay"]').count();
    expect(overlayCount === 0 || !(await kOverlay.isVisible())).toBeTruthy();

    // Verify user can now scroll up freely to prior sections
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(400);

    // Hero headline, subtext, and explore button are fully viewable and intact at top of normal page
    await expect(heroH1).toBeVisible();
    const heroSubtext = page.locator('#hero p');
    await expect(heroSubtext).toBeVisible();
    await expect(heroSubtext).toContainText('independent studio');
    const heroBtn = page.locator('#hero button');
    await expect(heroBtn).toBeVisible();
    await expect(heroBtn).toContainText('Explore Selected Work');
  });
});
