import { test, expect } from '../fixtures/testFixture';
import { TestData } from '../data/testData';
import { takeScreenshot } from '../utils/testHelper';

test.describe('Add to Cart Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Navigate to login page and login with valid credentials
    await loginPage.navigateToLoginPage();
    await loginPage.login(TestData.validCredentials.username, TestData.validCredentials.password);
  });

  test('should add T-Shirt product to cart', async ({ inventoryPage, cartPage, page }, testInfo) => {
    // Verify inventory page is loaded
    const isInventoryLoaded = await inventoryPage.isLoaded();
    expect(isInventoryLoaded).toBeTruthy();
    
    // Get T-Shirt products
    const tShirtProducts = await inventoryPage.getTShirtProducts();
    expect(tShirtProducts.length).toBeGreaterThan(0);
    
    // Take screenshot of inventory page
    await takeScreenshot(page, testInfo, 'inventory-page');
    
    // Add first T-Shirt product to cart
    await inventoryPage.addProductToCart(tShirtProducts[0]);
    
    // Verify cart count increased
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBeGreaterThan(0);
    
    // Take screenshot after adding to cart
    await takeScreenshot(page, testInfo, 'product-added-to-cart');
    
    // Go to shopping cart
    await inventoryPage.goToShoppingCart();
    
    // Verify cart page is loaded
    const isCartLoaded = await cartPage.isLoaded();
    expect(isCartLoaded).toBeTruthy();
    
    // Verify cart contains a T-Shirt
    const containsTShirt = await cartPage.containsTShirt();
    expect(containsTShirt).toBeTruthy();
    
    // Take screenshot of cart page
    await takeScreenshot(page, testInfo, 'cart-page');
  });
}); 