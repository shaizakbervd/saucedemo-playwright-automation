import { FullConfig } from '@playwright/test';
import { ensureDirectoryExists } from './utils/testHelper';
import path from 'path';

/**
 * Global setup function that runs before all tests
 * @param config - Playwright configuration
 */
async function globalSetup(config: FullConfig): Promise<void> {
  // Create necessary directories
  const screenshotDir = path.join(config.rootDir, 'test-results', 'screenshots');
  const reportDir = path.join(config.rootDir, 'test-results', 'reports');
  
  ensureDirectoryExists(screenshotDir);
  ensureDirectoryExists(reportDir);
  
  console.log('Global setup completed');
}

export default globalSetup; 