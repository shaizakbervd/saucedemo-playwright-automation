import { test, expect } from '../fixtures/testFixture';
import { TestData } from '../data/testData';
import { takeScreenshot } from '../utils/testHelper';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test('should login successfully with valid credentials', async ({ loginPage, inventoryPage, page }, testInfo) => {
    // Login with valid credentials
    await loginPage.login(TestData.validCredentials.username, TestData.validCredentials.password);
    
    // Verify successful login
    const isInventoryLoaded = await inventoryPage.isLoaded();
    expect(isInventoryLoaded).toBeTruthy();
    
    // Take screenshot on success
    await takeScreenshot(page, testInfo, 'successful-login');
  });

  test('should show error message with invalid credentials', async ({ loginPage, page }, testInfo) => {
    // Login with invalid credentials
    await loginPage.login(TestData.invalidCredentials.username, TestData.invalidCredentials.password);
    
    // Verify error message
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.lockedOut);
    
    // Take screenshot on failure
    await takeScreenshot(page, testInfo, 'login-error');
  });
}); 