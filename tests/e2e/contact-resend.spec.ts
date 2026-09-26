import { test, expect } from '@playwright/test';

test.describe('Contact Form & Resend Integration Verification', () => {
  test('Contact section displays Kmai.tech.support@gmail.com and copies to clipboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Verify direct email text is Kmai.tech.support@gmail.com
    const emailButton = contactSection.locator('button:has-text("Kmai.tech.support@gmail.com")');
    await expect(emailButton).toBeVisible();

    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    // Click to copy
    await emailButton.click();

    // Verify check icon appears
    const checkIcon = emailButton.locator('svg.text-emerald-400');
    await expect(checkIcon).toBeVisible();

    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe('Kmai.tech.support@gmail.com');
  });

  test('Submitting contact form dispatches POST to /api/contact and displays confirmation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // Intercept POST /api/contact to verify payload and simulate successful Resend delivery
    let interceptedPayload: any = null;
    await page.route('**/api/contact', async (route) => {
      if (route.request().method() === 'POST') {
        interceptedPayload = route.request().postDataJSON();
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, id: 'mock-resend-id-123' }),
        });
      } else {
        await route.continue();
      }
    });

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    // Fill form fields
    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
    const messageInput = page.locator('#contact-message');
    const submitBtn = contactSection.locator('button[type="submit"]');

    await nameInput.fill('Sarah Connor');
    await emailInput.fill('sarah@cyberdyne.com');
    await messageInput.fill('Inquiring about full system architecture and automation for Q4.');

    // Submit form
    await submitBtn.click();

    // Verify intercepted payload
    expect(interceptedPayload).not.toBeNull();
    expect(interceptedPayload.name).toBe('Sarah Connor');
    expect(interceptedPayload.email).toBe('sarah@cyberdyne.com');
    expect(interceptedPayload.message).toBe('Inquiring about full system architecture and automation for Q4.');

    // Verify confirmation message
    const confirmation = page.locator('#contact h3:has-text("Inquiry received.")');
    await expect(confirmation).toBeVisible();
    await expect(page.locator('#contact')).toContainText('Thank you for reaching out, Sarah Connor.');
  });

  test('Displays graceful error state when API returns an error', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // Mock API failure
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Service temporarily unavailable' }),
      });
    });

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    await page.locator('#contact-name').fill('Alex Vance');
    await page.locator('#contact-email').fill('alex@blackmesa.org');
    await page.locator('#contact-message').fill('Need infrastructure assistance.');

    await contactSection.locator('button[type="submit"]').click();

    // Verify error banner is visible and contains fallback direct email link
    const errorBanner = contactSection.locator('text=Service temporarily unavailable');
    await expect(errorBanner).toBeVisible();

    const fallbackEmailLink = contactSection.locator('a[href="mailto:Kmai.tech.support@gmail.com"]');
    await expect(fallbackEmailLink).toBeVisible();
  });
});
