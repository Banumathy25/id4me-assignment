/*
The below id4me test will check the following negative scenarios:
- Submitting the form with empty required fields
- Invalid email format triggers error
- Mismatched passwords show validation error
- Password field highlights on invalid input
*/

const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage.js');
const { BasePage } = require('../pages/BasePage.js');
require('dotenv').config();

test.describe('Signup Form - Negative Scenarios', () => {
    let signupPage;
    let basePage;
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        signupPage = new SignupPage(page);
        await basePage.openMerchant();
    });
    test('password field should highlight if the user submits empty form', async ({ }) => {
        await signupPage.checkInvalidClasses();
        console.log("Hence when we hit the submit button directly, the password filed gets highlighted with error");
    });

    test('should show error if the user clicks empty fields', async ({ }) => {
        const list_errors = await signupPage.clickEmptyFields();
        await signupPage.checkListLength(list_errors);
        console.log("Hence when we click on the empty fields one by one, we get more than 1 error message");
    });
    test('should show error if the email format is incorrect', async ({ }) => {
        await signupPage.enterincorrectEmail();
        console.log("Hence when we enter random string in the email field, we get the error message above");
    });

    test('should show error if the password fields dont have the same password', async ({ }) => {
        await signupPage.checkPassConfPass();
        console.log("Hence when we enter random string in the email field, we get the error message above");
    });

});
