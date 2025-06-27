const { expect } = require('@playwright/test');
require('dotenv').config();

class BasePage {
  constructor(page) {
    this.page = page;
  }
  // async openMerchant() {
  //   await this.page.goto(process.env.BASE_URL);
  // }
  async openMerchant(viewport = { width: 1920, height: 1080 }) {
    await this.page.goto(process.env.BASE_URL);
    await this.page.setViewportSize(viewport);

  }

  async openMerchantDesktop() {
    await this.openMerchant({ width: 1920, height: 1080 });
  }

  async openMerchantMobile() {
    await this.openMerchant({ width: 375, height: 667 });
  }
  async waitForVisible(locator, timeout = 15000) {
    const count = await locator.count();
    for (let i = 0; i < count; i++) {
      await expect(locator.nth(i)).toBeVisible({ timeout });
    }
  }
  async wait(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }
  async scrollDown(pixels = 650) {
    await this.page.evaluate((y) => window.scrollBy(0, y), pixels);
  }

  async scrollUp(pixels = 500) {
    await this.page.evaluate((y) => window.scrollBy(0, -y), pixels);
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }
  async listOftextValues(locator) {
    await this.waitForVisible(locator);
    const count_elements = await locator.count();
    const elements_array = [];
    for (let i = 0; i < count_elements; i++) {
      const text_val = await locator.nth(i).textContent();
      elements_array.push(text_val.trim());
    }
    return elements_array;
  }

  async scrollToLocator(locator) {
    await locator.scrollIntoViewIfNeeded();
    await locator.waitFor({ state: 'visible', timeout: 5000 });
  }

  async assertVisible(locator, message = 'Element not visible') {
    await expect(locator, message).toBeVisible();
  }

  async assertHidden(locator, message = 'Element should be hidden') {
    await expect(locator, message).toBeHidden();
  }
}

module.exports = { BasePage };
