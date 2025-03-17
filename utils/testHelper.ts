import { Page, TestInfo } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Take a screenshot and attach it to the test report
 * @param page - Playwright page
 * @param testInfo - Test information
 * @param name - Screenshot name
 */
export async function takeScreenshot(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  const screenshotPath = path.join(testInfo.outputDir, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach(`${name}`, { path: screenshotPath, contentType: 'image/png' });
}

/**
 * Generate a unique test ID
 * @returns Unique test ID
 */
export function generateTestId(): string {
  return `test_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

/**
 * Create directory if it doesn't exist
 * @param dirPath - Directory path
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Format date for reporting
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString().replace(/:/g, '-').replace(/\..+/, '');
} 