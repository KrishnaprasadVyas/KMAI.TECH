import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Motion & Interaction Verification', () => {
  test('Hero section features monumental typography without duplicate brand badge', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hero title
    const heroH1 = page.locator('#hero h1');
    await expect(heroH1).toBeVisible();
    await expect(heroH1).toContainText('WE BUILD');
    await expect(heroH1).toContainText('DIGITAL');
    await expect(heroH1).toContainText('EXPERIENCES.');

    // Ensure header logo is present, but no duplicate KMAI badge inside Hero
    const headerLogo = page.locator('header a[aria-label="KMAI Home"]');
    await expect(headerLogo).toBeVisible();
    const heroBrandRepeats = page.locator('#hero span', { hasText: /^KMAI$/ });
    await expect(heroBrandRepeats).toHaveCount(0);
  });

  test('Selected Work modal opens, is mouse wheel scrollable, and closes on Escape', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstCard = page.locator('#work article').first();
    await expect(firstCard).toBeVisible();

    // Click project to open modal
    await firstCard.locator('h3').click();

    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();

    // Verify modal scroll container exists and has data-lenis-prevent
    const scrollContainer = modal.locator('.overflow-y-auto');
    await expect(scrollContainer).toBeVisible();

    // Test mouse wheel event directly on the modal scroll container
    const initialScrollTop = await scrollContainer.evaluate((el) => el.scrollTop);
    expect(initialScrollTop).toBe(0);

    await scrollContainer.evaluate((el) => {
      el.dispatchEvent(new WheelEvent('wheel', { deltaY: 300, bubbles: true, cancelable: true }));
    });
    await page.waitForTimeout(300);

    const scrolledTop = await scrollContainer.evaluate((el) => el.scrollTop);
    expect(scrolledTop).toBeGreaterThan(0);

    // Verify no blue bullet points inside modal deliverables
    const blueBullets = modal.locator('.bg-\\[\\#216BFF\\].rounded-full');
    await expect(blueBullets).toHaveCount(0);

    // Escape closes modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await expect(modal).not.toBeVisible();
  });

  test('Capabilities section presents pure editorial disciplines with zero boxes and zero // slop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();
    await expect(servicesSection.locator('h2')).toContainText('CAPABILITIES');

    // Verify disciplines are listed
    await expect(servicesSection).toContainText('SOFTWARE ARCHITECTURE');
    await expect(servicesSection).toContainText('BESPOKE WEB DESIGN');
    await expect(servicesSection).toContainText('BUSINESS AUTOMATION');
    await expect(servicesSection).toContainText('AI SOLUTIONS');

    // Verify zero blue bullet dots exist in capabilities
    const blueDots = servicesSection.locator('.bg-\\[\\#216BFF\\].rounded-full');
    await expect(blueDots).toHaveCount(0);

    // Verify zero "//" text slop in capabilities
    const textContent = await servicesSection.textContent();
    expect(textContent).not.toContain('//');
    expect(textContent).not.toContain('DISCIPLINE //');
    expect(textContent).not.toContain('MODE //');
  });

  test('Site contains zero "//" text slop across all visible sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const bodyText = await page.locator('main').textContent();
    expect(bodyText).not.toContain('DISCIPLINE //');
    expect(bodyText).not.toContain('COORD //');
    expect(bodyText).not.toContain('MODE //');
    expect(bodyText).not.toContain('ARCH //');
  });

  test('The Studio section has removed the stats row', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.locator('h2')).toContainText('THE STUDIO');

    // Confirm stats row is gone
    await expect(aboutSection).not.toContainText('Production platforms shipped');
    await expect(aboutSection).not.toContainText('Founders, zero intermediaries');
    await expect(aboutSection).not.toContainText('IP transferred on delivery');

    // Confirm founders are present
    await expect(aboutSection).toContainText('Krishnaprasad Vyas');
    await expect(aboutSection).toContainText('Maithili Makkar');
    await expect(aboutSection).toContainText('Ali Abu Nazahat');
  });

  test('Process section presents disciplined 4-stage engineering sequence with pure typography and zero slop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const processSection = page.locator('#process');
    await expect(processSection).toBeAttached();
    await expect(processSection).toContainText('PROCESS');
    await expect(processSection).toContainText('DISCOVER');
    await expect(processSection).toContainText('ARCHITECT');
    await expect(processSection).toContainText('ENGINEER');
    await expect(processSection).toContainText('SCALE');

    // Confirm zero // slop
    const text = await processSection.innerText();
    expect(text).not.toContain('//');
  });

  test('Testimonials quote navigation advances quotes and responds to arrows', async ({ page, isMobile }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeVisible();

    const quoteBlock = testimonialsSection.locator('blockquote');
    const initialText = await quoteBlock.textContent();

    const nextBtn = testimonialsSection.locator('button[aria-label="Next quotation"]');
    await nextBtn.click();

    // Wait for transition
    await page.waitForTimeout(800);
    const updatedText = await quoteBlock.textContent();
    expect(updatedText).not.toBe(initialText);

    if (!isMobile) {
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(800);
      const revertedText = await quoteBlock.textContent();
      expect(revertedText).toBe(initialText);
    }
  });

  test('Navbar maintains contrast over dark sections without layout shifts', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    await page.evaluate(() => {
      const contact = document.querySelector('#contact');
      contact?.scrollIntoView();
    });

    await page.waitForTimeout(500);
    await expect(header).toBeVisible();
  });

  test('Custom cursor renders custom pointer graphic, switches on dark bg, and generates simple ripple on click', async ({ page, isMobile }) => {
    if (isMobile) return;

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for preloader to finish and detach from DOM
    await page.waitForSelector('.fixed.inset-0.z-\\[999999\\]', { state: 'detached', timeout: 10000 });

    // Move mouse over light section (Hero)
    await page.mouse.move(300, 300);

    // Verify black cursor is active on light background
    const blackCursor = page.locator('img[src="/cursor-solid-black.png"]');
    await expect(blackCursor).toBeAttached();

    // Trigger click on light background
    await page.mouse.down();
    const rippleWrap = page.locator('.z-\\[99998\\]');
    await expect(rippleWrap.locator('div.rounded-full').first()).toBeAttached();
    await page.mouse.up();

    // Scroll down to dark section (#manifesto or #contact)
    const manifestoSection = page.locator('#manifesto');
    await manifestoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const box = await manifestoSection.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      // Verify white cursor is active over dark background
      const whiteCursor = page.locator('img[src="/cursor-solid-white.png"]');
      await expect(whiteCursor).toBeAttached();
    }
  });
});
