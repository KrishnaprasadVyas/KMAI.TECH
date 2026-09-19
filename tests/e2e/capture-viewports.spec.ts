import { test } from '@playwright/test';
import path from 'path';

test.describe('Viewport Visual Inspection Captures', () => {
  test('Capture Desktop (1440x900)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      sessionStorage.setItem('kmai_visited', 'true');
    });
    await page.goto('/');
    // Allow entry animation (1.2s preloader + 1.6s text reveal) to fully complete
    await page.waitForTimeout(3600);

    // Screenshot Hero
    await page.screenshot({ path: path.join('test-results', 'inspection-desktop-hero.png'), fullPage: false });

    // Scroll to Selected Work
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo('#work', { immediate: true });
      } else {
        document.querySelector('#work')?.scrollIntoView();
      }
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join('test-results', 'inspection-desktop-work.png'), fullPage: false });

    // Scroll to Services
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo('#services', { immediate: true });
      } else {
        document.querySelector('#services')?.scrollIntoView();
      }
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join('test-results', 'inspection-desktop-services.png'), fullPage: false });

    // Scroll to Studio
    await page.evaluate(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo('#about', { immediate: true });
      } else {
        document.querySelector('#about')?.scrollIntoView();
      }
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join('test-results', 'inspection-desktop-about.png'), fullPage: false });
  });

  test('Capture Tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.addInitScript(() => {
      sessionStorage.setItem('kmai_visited', 'true');
    });
    await page.goto('/');
    await page.waitForTimeout(3600);

    await page.screenshot({ path: path.join('test-results', 'inspection-tablet-hero.png'), fullPage: false });

    await page.evaluate(() => {
      document.querySelector('#work')?.scrollIntoView();
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join('test-results', 'inspection-tablet-work.png'), fullPage: false });
  });

  test('Capture Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => {
      sessionStorage.setItem('kmai_visited', 'true');
    });
    await page.goto('/');
    await page.waitForTimeout(3600);

    await page.screenshot({ path: path.join('test-results', 'inspection-mobile-hero.png'), fullPage: false });

    await page.evaluate(() => {
      document.querySelector('#work')?.scrollIntoView();
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join('test-results', 'inspection-mobile-work.png'), fullPage: false });
  });
});
