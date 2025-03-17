import { test, expect } from '../fixtures/testFixture';
import { TestData } from '../data/testData';
import { takeScreenshot } from '../utils/testHelper';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Tests', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ loginPage, inventoryPage, cartPage, page }) => {
    // Initialize checkout page
    checkoutPage = new CheckoutPage(page);
    
    // Navigate to login page and login with valid credentials
    await loginPage.navigateToLoginPage();
    await loginPage.login(TestData.validCredentials.username, TestData.validCredentials.password);
    
    // Add a T-Shirt product to cart
    const tShirtProducts = await inventoryPage.getTShirtProducts();
    expect(tShirtProducts.length).toBeGreaterThan(0);
    await inventoryPage.addProductToCart(tShirtProducts[0]);
    
    // Go to shopping cart
    await inventoryPage.goToShoppingCart();
    
    // Verify cart page is loaded
    const isCartLoaded = await cartPage.isLoaded();
    expect(isCartLoaded).toBeTruthy();
  });

  test('should complete checkout process successfully', async ({ cartPage, page }, testInfo) => {
    // Proceed to checkout
    await cartPage.checkout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await takeScreenshot(page, testInfo, 'checkout-info');
    
    // Continue to purchase
    await checkoutPage.continueToPurchase();
    
    // Take screenshot of checkout summary
    await takeScreenshot(page, testInfo, 'checkout-summary');
    
    // Complete purchase
    await checkoutPage.finishPurchase();
    
    // Verify checkout is complete
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBeTruthy();
    
    // Take screenshot of checkout complete
    await takeScreenshot(page, testInfo, 'checkout-complete');
  });

  test('should show error message when checkout info is missing', async ({ cartPage, page }, testInfo) => {
    // Proceed to checkout
    await cartPage.checkout();
    
    // Try to continue without filling information
    await checkoutPage.continueToPurchase();
    
    // Verify error message is displayed
    const isErrorDisplayed = await checkoutPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Take screenshot of error
    await takeScreenshot(page, testInfo, 'checkout-error');
  });
}); 