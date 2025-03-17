import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  // Locators
  readonly inventoryContainer: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryContainer = page.locator('.inventory_container');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  /**
   * Check if inventory page is loaded
   * @returns Boolean indicating if inventory page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.inventoryContainer);
  }

  /**
   * Get all products with T-Shirt in the name
   * @returns Array of product elements
   */
  async getTShirtProducts(): Promise<Locator[]> {
    const products = this.page.locator('.inventory_item');
    const count = await products.count();
    const tShirtProducts: Locator[] = [];
    
    for (let i = 0; i < count; i++) {
      const productName = await products.nth(i).locator('.inventory_item_name').textContent();
      if (productName && productName.includes('T-Shirt')) {
        tShirtProducts.push(products.nth(i));
      }
    }
    
    return tShirtProducts;
  }

  /**
   * Add a product to cart by index
   * @param product - Product locator
   */
  async addProductToCart(product: Locator): Promise<void> {
    const addToCartButton = product.locator('.btn_primary.btn_inventory');
    await this.click(addToCartButton);
  }

  /**
   * Get shopping cart count
   * @returns Number of items in cart
   */
  async getCartCount(): Promise<number> {
    if (await this.isVisible(this.shoppingCartBadge)) {
      const countText = await this.getText(this.shoppingCartBadge);
      return parseInt(countText);
    }
    return 0;
  }

  /**
   * Navigate to shopping cart
   */
  async goToShoppingCart(): Promise<void> {
    await this.click(this.shoppingCartLink);
  }
} 