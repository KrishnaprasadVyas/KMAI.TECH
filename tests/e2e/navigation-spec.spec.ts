import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Precision Navigation & CTA Verification', () => {
  test('CTA button BEGIN has zero arrows and precisely frames Contact section on click', async ({ page, isMobile }) => {
    if (isMobile) return;

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish and detach from DOM
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // Locate desktop floating CTA button
    const ctaButton = page.locator('header a[aria-label="Begin project conversation"]');
    await expect(ctaButton).toBeVisible();

    // Verify arrow SVG is removed and only BEGIN text exists
    await expect(ctaButton).toContainText('BEGIN');
    const svgArrows = ctaButton.locator('svg');
    await expect(svgArrows).toHaveCount(0);

    // Click BEGIN to scroll to contact section
    await ctaButton.click();
    await page.waitForTimeout(1500);

    // Verify #contact is visible in the viewport
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    // Verify the heading LET'S BUILD SOMETHING IMPOSSIBLE is visible in the viewport
    const contactHeading = contactSection.locator('h2');
    await expect(contactHeading).toBeInViewport();

    // Verify the inquiry form is visible in the viewport
    const contactForm = contactSection.locator('form');
    await expect(contactForm).toBeInViewport();
  });

  test('Explore Selected Work button in Hero precisely scrolls to Work section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    const exploreWorkBtn = page.locator('button:has-text("Explore Selected Work")');
    await expect(exploreWorkBtn).toBeVisible();

    await exploreWorkBtn.click({ force: true });
    await page.waitForTimeout(1500);

    const workSection = page.locator('#work');
    await expect(workSection).toBeInViewport();
    await expect(workSection.locator('h2')).toBeInViewport();
  });
});
