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

  test('manifesto section uses asymmetric editorial grid with zero card containers or neon drop-shadows', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3500);

    const manifesto = page.locator('#manifesto');
    await expect(manifesto).toBeVisible();

    // Verify manifesto contains core statement
    await expect(manifesto).toContainText('ARCHITECT');

    // Verify no card containers exist within manifesto (zero .rounded-lg, .rounded-2xl with borders)
    const cards = await page.$$('#manifesto .rounded-lg.border, #manifesto .rounded-2xl.border, #manifesto .rounded-3xl.border');
    expect(cards.length).toBe(0);

    // Verify no neon drop-shadow exists on words
    const neonDrops = await page.$$('#manifesto [class*="drop-shadow-"]');
    expect(neonDrops.length).toBe(0);
  });

  test('flagship case study 01 features architectural plate without card box styling or AI sparkles', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3500);

    const workSection = page.locator('#work');
    await expect(workSection).toBeVisible();

    // Verify flagship project title exists
    await expect(workSection).toContainText('Shri Gurudev Ashram');

    // Verify no AI sparkles icons or round card borders
    const sparkles = await page.$$('#work svg.lucide-sparkles');
    expect(sparkles.length).toBe(0);

    // Verify flagship container does not have heavy card container styling
    const roundedCard = await page.$$('#work [data-flagship="true"].rounded-2xl, #work [data-flagship="true"].rounded-3xl');
    expect(roundedCard.length).toBe(0);

    // Verify modal trigger functionality is preserved
    const caseStudyBtn = page.locator('#work button:has-text("CASE STUDY"), #work button:has-text("EXPLORE CASE STUDY")').first();
    await expect(caseStudyBtn).toBeVisible();
    await caseStudyBtn.click();

    // Case study modal should open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Shri Gurudev Ashram');

    // Close modal
    const closeBtn = page.locator('button[aria-label="Close modal"]');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });
});

