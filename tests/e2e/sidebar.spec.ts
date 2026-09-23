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

  test('Sidebar does not contain Start a Project and clicking Contact scrolls to contact', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // Open sidebar
    const burgerBtn = page.locator('button[aria-label="Open navigation"]');
    await burgerBtn.click();

    const drawer = page.locator('div[data-theme="dark"].fixed.top-0.right-0');
    await expect(drawer).toBeVisible();

    // Verify "Start a Project" is completely absent from navigation
    const startProjectLink = page.locator('nav a:has-text("Start a Project")');
    await expect(startProjectLink).toHaveCount(0);

    // Click "Contact"
    const contactLink = page.locator('nav a:has-text("Contact")');
    await expect(contactLink).toBeVisible();
    await contactLink.click();

    // Drawer should close
    await expect(drawer).not.toBeVisible({ timeout: 4000 });
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

  test('CTA button hides when sidebar is open and reappears when closed', async ({ page, isMobile }) => {
    if (isMobile) return; // CTA button is desktop-only (hidden md:flex)

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    const ctaBtn = page.locator('a[aria-label="Begin project conversation"]');
    await expect(ctaBtn).toBeVisible();
    await expect(ctaBtn).toHaveClass(/opacity-100/);

    // Open sidebar
    const burgerBtn = page.locator('button[aria-label="Open navigation"]');
    await burgerBtn.click();

    const drawer = page.locator('div[data-theme="dark"].fixed.top-0.right-0');
    await expect(drawer).toBeVisible();

    // CTA button should be hidden (opacity-0 and pointer-events-none)
    await expect(ctaBtn).toHaveClass(/opacity-0/);
    await expect(ctaBtn).toHaveClass(/pointer-events-none/);

    // Close sidebar by clicking burger (now labeled "Close navigation")
    const closeBtn = page.locator('button[aria-label="Close navigation"]');
    await closeBtn.click();
    await expect(drawer).not.toBeVisible({ timeout: 4000 });

    // CTA button should reappear
    await expect(ctaBtn).toHaveClass(/opacity-100/);
    await expect(ctaBtn).toHaveClass(/pointer-events-auto/);
  });
});
