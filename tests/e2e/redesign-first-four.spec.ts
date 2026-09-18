import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Art-Directed Editorial Redesign (First 4 Areas)', () => {
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

  test('header features minimal editorial layout on Paper canvas without pills', async ({ page, isMobile }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    const header = page.locator('header');
    await expect(header).toBeVisible();

    if (!isMobile) {
      // Clean editorial navigation links
      const workLink = header.locator('a[href="#work"]');
      await expect(workLink).toContainText('WORK');

      // Rectangular CTA button
      const ctaBtn = header.locator('a:has-text("START A PROJECT")');
      await expect(ctaBtn).toBeVisible();
    } else {
      // Mobile menu toggle button is visible
      const menuBtn = header.locator('button[aria-label="Toggle navigation menu"]');
      await expect(menuBtn).toBeVisible();
    }

    // Verify header has clean hairline border without blurry glow pills
    const headerClasses = await header.getAttribute('class');
    expect(headerClasses).not.toContain('shadow-[0_0_25px');
  });

  test('hero section features colossal editorial typography and Paper canvas', async ({ page, isMobile }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3500);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Check colossal headline
    const h1 = hero.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('SOFTWARE');
    await expect(h1).toContainText('WITH A');
    await expect(h1).toContainText('point of view');

    if (!isMobile) {
      const fontSize = await h1.evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));
      expect(fontSize).toBeGreaterThanOrEqual(60);
    }

    // Verify zero glowing sphere blurred divs in hero
    const glowingSphere = await page.$('#hero [class*="blur-[150px]"], #hero [class*="blur-[130px]"]');
    expect(glowingSphere).toBeNull();
  });

  test('selected work intro features Paper canvas with large display heading', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3500);

    const workIntro = page.locator('#work-intro');
    await expect(workIntro).toBeVisible();

    // Verify category label and display title
    await expect(workIntro).toContainText('01 / SELECTED WORK');
    await expect(workIntro).toContainText('ARCHITECTED DIGITAL SYSTEMS');

    // Verify no card containers exist within intro
    const cards = await page.$$('#work-intro .rounded-lg.border, #work-intro .rounded-2xl.border, #work-intro .rounded-3xl.border');
    expect(cards.length).toBe(0);
  });

  test('flagship case study 01 features Navy architectural plate without card box styling or AI sparkles', async ({ page }) => {
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
  });
});
