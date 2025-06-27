const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage.js');
const { BasePage } = require('../pages/BasePage.js');
require('dotenv').config();

test.describe('Signup Form - Positive Scenarios', () => {
    let signupPage;
    let basePage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        signupPage = new SignupPage(page);
        await basePage.openMerchant();
    });

    test('should fill out all fields and submit successfully', async () => {
        await signupPage.fillFormAllFields();
        await signupPage.checkAlertSuccess();
        console.log("Hence the id4me form is submitted successfully");
    });

    test('should load correct page and fill form with default values', async () => {
        await expect(signupPage.page).toHaveURL(process.env.BASE_URL);
        console.log("url is as expected: ", process.env.BASE_URL);
        await signupPage.checkTitle();
        await signupPage.fillForm();
        console.log("Hence the id4me form is showing the expected title and fills the respective fields");
    });

    test('should satisfy all password rules with valid input', async () => {
        await signupPage.enterCorrectPassword();
        await signupPage.enterPasswordClassChecks();
        console.log("Hence the correct password entered matches the checks criteria");
    });
});
