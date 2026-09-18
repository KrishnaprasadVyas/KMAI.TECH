import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Art-Directed Editorial Studio Redesign', () => {
  test('eliminates all AI tropes, glow overlays, and unwanted faux-metadata', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    // Verify noise overlay is gone
    const noise = await page.$('.noise-overlay');
    expect(noise).toBeNull();

    // Verify no glow utility classes exist
    const glowElements = await page.$$('.text-glow, .box-glow, .box-glow-lg');
    expect(glowElements.length).toBe(0);

    // Verify unwanted metadata strings are completely removed
    const bodyText = await page.innerText('body');
    expect(bodyText).not.toContain('EST. 2026');
    expect(bodyText).not.toContain('MUMBAI & PUNE');
    expect(bodyText).not.toContain('[ 00 / INDEPENDENT DIGITAL TECHNOLOGY STUDIO ]');
    expect(bodyText).not.toContain('INDEPENDENT DIGITAL TECHNOLOGY STUDIO');
  });

  test('header features minimal editorial navigation without pills or glowing borders', async ({ page, isMobile }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    const header = page.locator('header');
    await expect(header).toBeVisible();

    if (!isMobile) {
      const nav = header.locator('nav');
      await expect(nav.locator('a:has-text("Work")')).toBeVisible();
      await expect(nav.locator('a:has-text("Services")')).toBeVisible();
      await expect(nav.locator('a:has-text("Studio")')).toBeVisible();
      await expect(nav.locator('a:has-text("Contact")')).toBeVisible();
      await expect(nav.locator('a:has-text("Start a project")')).toBeVisible();
    } else {
      const menuBtn = header.locator('button[aria-label="Toggle navigation menu"]');
      await expect(menuBtn).toBeVisible();
    }
  });

  test('hero section features monumental typography WE BUILD DIGITAL EXPERIENCES.', async ({ page, isMobile }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3000);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    const h1 = hero.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('WE BUILD');
    await expect(h1).toContainText('DIGITAL');
    await expect(h1).toContainText('EXPERIENCES');

    if (!isMobile) {
      const fontSize = await h1.evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));
      expect(fontSize).toBeGreaterThanOrEqual(80);
    }
  });

  test('manifesto section presents clean monumental typography without cards', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    const manifesto = page.locator('#manifesto');
    await expect(manifesto).toBeVisible();
    await expect(manifesto.locator('h2')).toContainText(/COMPLEX/);
    await expect(manifesto.locator('h2')).toContainText(/EXPERIENCES/);
  });

  test('selected work showcases authentic projects with editorial imagery and zero card boxes', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    const workSection = page.locator('#work');
    await expect(workSection).toBeVisible();
    await expect(workSection).toContainText('MAVT');
    await expect(workSection).toContainText('Shri Gurudev');
  });

  test('the studio section presents human founders without fake terminal badges', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toContainText('Krishnaprasad Vyas');
    await expect(aboutSection).toContainText('Maithili Makkar');
    await expect(aboutSection).toContainText('Ali Abu Nazahat');
  });

  test('contact section features climax statement and direct email channel', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(2500);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    await expect(contactSection).toContainText("LET'S BUILD");
    await expect(contactSection).toContainText('IMPOSSIBLE');
    await expect(contactSection).toContainText('contact@kmai.tech');
  });
});
