/*
- Checks the non numeric characters in phone number field
- Checks if special characters are allowed in the email first part of the string
*/
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
  test('should update State/Region options after selecting a country', async ()=>{
    await signupPage.nonNumericCharsPhone();
    console.log("Hence the id4me sign up form is showing the error message for non-numeric characters in phone");
  });
   test('Emails with uncommon but valid formats', async ()=>{
    await signupPage.specCharInEmail();
    console.log("Hence the id4me sign up form is accpeting slightly unique special characters in email");
  });
});