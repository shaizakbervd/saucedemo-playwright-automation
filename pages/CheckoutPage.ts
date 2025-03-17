import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly checkoutSummary: Locator;
  readonly finishButton: Locator;
  readonly checkoutComplete: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.checkoutSummary = page.locator('.checkout_summary_container');
    this.finishButton = page.locator('[data-test="finish"]');
    this.checkoutComplete = page.locator('.checkout_complete_container');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Fill checkout information
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal code
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  /**
   * Continue to next step
   */
  async continueToPurchase(): Promise<void> {
    await this.click(this.continueButton);
  }

  /**
   * Cancel checkout
   */
  async cancelCheckout(): Promise<void> {
    await this.click(this.cancelButton);
  }

  /**
   * Complete purchase
   */
  async finishPurchase(): Promise<void> {
    await this.click(this.finishButton);
  }

  /**
   * Check if checkout is complete
   * @returns Boolean indicating if checkout is complete
   */
  async isCheckoutComplete(): Promise<boolean> {
    return await this.isVisible(this.checkoutComplete);
  }

  /**
   * Return to products page
   */
  async backToHome(): Promise<void> {
    await this.click(this.backHomeButton);
  }

  /**
   * Get error message text
   * @returns Error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error message is displayed
   * @returns Boolean indicating if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
} 