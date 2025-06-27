const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage.js');
const { BasePage } = require('../pages/BasePage.js');
require('dotenv').config();

test.describe('Signup Form - Dynamic Field Behavior', () => {
    let signupPage;
  let basePage;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    signupPage = new SignupPage(page);
    await basePage.openMerchant();
  });
  test('should update State/Region options after selecting a State', async ()=>{
    await signupPage.checkStateFieldHidden('New South Wales (NSW)');
    console.log('it selects the state as expected');
  });
});