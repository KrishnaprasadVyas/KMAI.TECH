import { test, expect } from '@playwright/test';

test.describe('Sidebar Navigation Interaction Verification', () => {
  test('Sidebar opens on burger click and nav links are clickable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // Find and click burger menu button
    const burgerBtn = page.locator('button[aria-label="Open navigation"]');
    await expect(burgerBtn).toBeVisible();
    await burgerBtn.click();

    // Verify sidebar drawer is visible
    const drawer = page.locator('div[data-theme="dark"].fixed.top-0.right-0');
    await expect(drawer).toBeVisible();

    // Try to click "Work" link inside sidebar
    const workLink = page.locator('nav a:has-text("Work")');
    await expect(workLink).toBeVisible();

    // Click the link
    await workLink.click({ timeout: 3000 });

    // Sidebar should close
    await expect(drawer).not.toBeVisible({ timeout: 4000 });

    // Page should scroll to #work
    await page.waitForTimeout(1000);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(300);
  });

  test('Clicking Start a Project in sidebar navigates to /start-a-project', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // Open sidebar
    const burgerBtn = page.locator('button[aria-label="Open navigation"]');
    await burgerBtn.click();

    const drawer = page.locator('div[data-theme="dark"].fixed.top-0.right-0');
    await expect(drawer).toBeVisible();

    // Click "Start a Project"
    const startProjectLink = page.locator('nav a:has-text("Start a Project")');
    await expect(startProjectLink).toBeVisible();
    await startProjectLink.click();

    // Should navigate to /start-a-project
    await expect(page).toHaveURL(/.*start-a-project/);
  });

  test('Clicking backdrop closes the sidebar', async ({ page, isMobile }) => {
    if (isMobile) return; // on mobile the drawer is full width

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // Open sidebar
    const burgerBtn = page.locator('button[aria-label="Open navigation"]');
    await burgerBtn.click();

    const drawer = page.locator('div[data-theme="dark"].fixed.top-0.right-0');
    await expect(drawer).toBeVisible();

    // Click backdrop on left side of screen (e.g. x: 100, y: 300)
    await page.mouse.click(100, 300);

    // Sidebar should close
    await expect(drawer).not.toBeVisible({ timeout: 4000 });
  });
});
