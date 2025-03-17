import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Locators
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Check if cart page is loaded
   * @returns Boolean indicating if cart page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await this.isVisible(this.cartList);
  }

  /**
   * Get number of items in cart
   * @returns Number of items in cart
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get cart item names
   * @returns Array of item names
   */
  async getItemNames(): Promise<string[]> {
    const count = await this.cartItems.count();
    const names: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
      if (name) {
        names.push(name);
      }
    }
    
    return names;
  }

  /**
   * Check if cart contains a T-Shirt
   * @returns Boolean indicating if cart contains a T-Shirt
   */
  async containsTShirt(): Promise<boolean> {
    const itemNames = await this.getItemNames();
    return itemNames.some(name => name.includes('T-Shirt'));
  }

  /**
   * Proceed to checkout
   */
  async checkout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  /**
   * Continue shopping
   */
  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }
} 