import { test } from '@playwright/test';
import path from 'path';

const artifactDir = 'C:\\Users\\abuna\\.gemini\\antigravity\\brain\\15d0db9d-c576-4bfc-ab09-1eb2af73acb2';

test.describe('Cinematic Opening & Scroll Experience Visual Captures', () => {
  test('Capture all milestones on Desktop (1440x900)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto('/');
    await page.waitForTimeout(1000);

    const mountInfo = await page.evaluate(() => {
      const contact = document.querySelector('#contact');
      const content = document.querySelector('div.will-change-transform');
      return {
        contactOffsetTop: (contact as HTMLElement)?.offsetTop,
        contentScrollHeight: content?.scrollHeight,
        contactRectTop: contact?.getBoundingClientRect().top,
        contentRectTop: content?.getBoundingClientRect().top,
        diff: contact && content ? contact.getBoundingClientRect().top - content.getBoundingClientRect().top : null,
      };
    });
    console.log('MOUNT INFO:', JSON.stringify(mountInfo, null, 2));

    // 1. Initial Load — Full-screen monumental K, Navbar hidden
    await page.screenshot({ path: path.join(artifactDir, 'visual-01-k-opening-load.png') });

    // 2. Scroll begins — K scaling outward through aperture, Hero emerging
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(1200, { immediate: true });
      } else {
        window.scrollTo({ top: 1200, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, 'visual-02-hero-emerging.png') });

    // 3. Lower sections reveal in real document layout (Selected Work)
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(4800, { immediate: true });
      } else {
        window.scrollTo({ top: 4800, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, 'visual-03-work-revealed.png') });

    // 4. Climax reached at Contact — pinned composition unlocks seamlessly into normal document
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(14000, { immediate: true });
      } else {
        window.scrollTo({ top: 14000, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1000);
    const scrollPos = await page.evaluate(() => ({
      scrollY: window.scrollY,
      lenisScroll: (window as unknown as { __lenis?: { scroll: number } }).__lenis?.scroll,
      contactTop: document.querySelector('#contact')?.getBoundingClientRect().top,
      heroTop: document.querySelector('#hero')?.getBoundingClientRect().top,
      completed: sessionStorage.getItem('kmai_intro_completed'),
    }));
    console.log('SCROLL POS AT VISUAL-04:', scrollPos);
    await page.screenshot({ path: path.join(artifactDir, 'visual-04-contact-unlocked.png') });

    // 5. Scroll back up to Hero in normal webpage mode — verify complete intact layout and Navbar
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string | number, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(artifactDir, 'visual-05-normal-page-hero.png') });
  });

  test('Capture Mobile (390x844) Opening Load', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(artifactDir, 'visual-06-mobile-k-opening.png') });
  });

  test('Capture Tablet (768x1024) Opening Load', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.addInitScript(() => sessionStorage.clear());
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(artifactDir, 'visual-07-tablet-k-opening.png') });
  });
});
