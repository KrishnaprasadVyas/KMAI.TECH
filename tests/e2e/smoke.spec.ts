import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Redline Spec-Sheet Smoke Verification', () => {
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

    // Wait for initial render
    await page.waitForTimeout(1000);

    // Filter out expected environment notices if any
    const fatalErrors = consoleErrors.filter(
      (msg) => !msg.includes('React DevTools') && !msg.includes('favicon')
    );
    expect(fatalErrors).toEqual([]);
  });

  test('all Redline spec-sheet sections are attached in the DOM', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const sections = [
      '#hero',
      '#work',
      '#capabilities',
      '#personnel',
      '#contact',
    ];

    for (const selector of sections) {
      const section = page.locator(selector);
      await expect(section).toBeAttached();
    }
  });

  test('page background adheres to Paper palette (#F3EFE7)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // rgb(243, 239, 231) is #F3EFE7
    expect(bgColor).toBe('rgb(243, 239, 231)');
  });

  test('conversational intake progresses through all 3 steps to stamped receipt', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    // Step 1: Fill name and email using the actual placeholders in Contact.tsx
    const nameInput = contactSection.locator('input[placeholder="Your Name & Organization"]');
    const emailInput = contactSection.locator('input[placeholder="engineer@company.com"]');
    await nameInput.fill('Dr. Alan Turing');
    await emailInput.fill('alan@bletchley.ac.uk');

    const step1Btn = contactSection.locator('button:has-text("PROCEED TO SYSTEM SCOPE")');
    await step1Btn.click();

    // Step 2: Select a discipline and advance
    await expect(contactSection.locator('text=What system discipline are we architecting?')).toBeVisible();
    const step2Btn = contactSection.locator('button:has-text("PROCEED TO ALLOCATION")');
    await step2Btn.click();

    // Step 3: View budget selection and submit stamped approval
    await expect(contactSection.locator('text=Expected investment & deployment target:')).toBeVisible();
    const submitBtn = contactSection.locator('button[type="submit"]');
    await expect(submitBtn).toContainText('APPROVED FOR TRANSMISSION');
    await submitBtn.click();

    // Receipt verification
    await expect(contactSection.locator('text=SPECIFICATION TRANSMITTED')).toBeVisible();
    await expect(contactSection.locator('text=Redline Spec Received.')).toBeVisible();
    await expect(contactSection.locator('text=STAMP: APPROVED')).toBeVisible();
  });
});
