/*
The below id4me test will check the following positive scenarios:
- Successful form submission with all required fields
- Page title and URL verification
- Password field meets all validation criteria
*/


import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage.js';
import { BasePage } from '../pages/BasePage.js';
import { SuccessPage } from '../pages/SuccessPage.js';
require('dotenv').config();

test.describe('Signup Form - Positive Scenarios', () => {
    let signupPage;
    let basePage;
    let successPage;
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        signupPage = new SignupPage(page);
        successPage = new SuccessPage(page)
        await basePage.openMerchant();
    });

    test('should fill out all fields and submit successfully', async () => {
        await signupPage.fillFormAllFields();
        await successPage.checkAlertSuccess();
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
