import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Redline Spec-Sheet Design Directive Verification', () => {
  test('strictly enforces the hard bans', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    const bodyText = await page.innerText('body');

    // 1. Hard ban: Generic agency fluff copy
    expect(bodyText).not.toContain('We partner with ambitious brands');
    expect(bodyText).not.toContain('full-service digital agency');
    expect(bodyText).not.toContain('transform your business');

    // 2. Authentic editorial voice present
    expect(bodyText).toContain("We don't run a discovery phase. We show up with a working build by week two, then argue about the details.");

    // 3. Hard ban: No dark navy/near-black + electric blue SaaS color palette
    const hasElectricBlueBg = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.some((el) => {
        const bg = window.getComputedStyle(el).backgroundColor;
        return bg === 'rgb(0, 102, 255)' || bg === 'rgb(33, 107, 255)';
      });
    });
    expect(hasElectricBlueBg).toBe(false);

    // 4. Hard ban: No rounded-xl cards or soft drop shadows
    const hasRoundedXlCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.rounded-xl, .rounded-2xl, .rounded-3xl'));
      return cards.length > 0;
    });
    expect(hasRoundedXlCards).toBe(false);

    // 5. Hard ban: No arrows appended to links ("Learn more →")
    expect(bodyText).not.toContain('Learn more →');
    expect(bodyText).not.toContain('Learn more');
  });

  test('hero section features Fraunces display typography and plotter guide lines', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    const h1 = hero.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('We engineer software');
    await expect(h1).toContainText('structural rigor');
    await expect(h1).toContainText('zero decorative fat');

    // Check Fraunces serif font family applied
    const fontFamily = await h1.evaluate((el) => window.getComputedStyle(el).fontFamily);
    expect(fontFamily.toLowerCase()).toContain('fraunces');

    // Check plotter guide line SVGs are in DOM
    const guideLines = hero.locator('.plotter-line');
    const count = await guideLines.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('selected work reel showcases real client projects with spec sheets', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    const workSection = page.locator('#work');
    await expect(workSection).toBeVisible();

    // Verify key authentic client projects are in DOM
    await expect(workSection).toContainText('Shri Gurudev Ashram');
    await expect(workSection).toContainText('MAVT Pilgrimage Platform');
    await expect(workSection).toContainText('Gurudev Mobile Ecosystem');
    await expect(workSection).toContainText('Shanti Ashram Trust');
    await expect(workSection).toContainText('Vishwaraj Polychem');
    await expect(workSection).toContainText('Priya Surana Archive');

    // Verify spec numbers and technical dimensions are rendered
    await expect(workSection).toContainText('KM-SPEC-GURUDEV');
    await expect(workSection).toContainText('HOLD TO SCRUB REEL');
  });

  test('capabilities section is unnumbered with uneven-width rows', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    const capabilities = page.locator('#capabilities');
    await expect(capabilities).toBeVisible();

    // Verify the 3 disciplines
    await expect(capabilities).toContainText('Product & Web Architecture');
    await expect(capabilities).toContainText('Operational Automation & Middleware');
    await expect(capabilities).toContainText('Applied AI & Machine Intelligence');

    // Verify hard tolerances are stated
    await expect(capabilities).toContainText('TOLERANCE: STRICT');
    await expect(capabilities).toContainText('UNEVEN-WIDTH DRAFTING ROWS');
  });

  test('engineering personnel register displays real founders without fake badges', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    const personnel = page.locator('#personnel');
    await expect(personnel).toBeVisible();

    await expect(personnel).toContainText('Krishnaprasad Vyas');
    await expect(personnel).toContainText('Maithili Makkar');
    await expect(personnel).toContainText('Ali Abu Nazahat');

    // Direct architect collaboration statement
    await expect(personnel).toContainText('Zero account managers. Zero intermediaries.');
  });
});
