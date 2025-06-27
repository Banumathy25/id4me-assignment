/*
- Tests run with both **desktop** and **mobile** viewports (375x667 for mobile)
*/

const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage.js');
const { BasePage } = require('../pages/BasePage.js');
require('dotenv').config();

test.describe('Signup Form - check mobile view ports and desktop viewports', () => {
    let signupPage;
    let basePage;
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        signupPage = new SignupPage(page);
    });
    test('should allow filling a few fields on mobile view', async () => {
        await basePage.openMerchantMobile();
        await signupPage.fname.waitFor({ state: 'visible', timeout: 10000 });
        await signupPage.fillForm();
        console.log("Hence the id4me sign up form is filled on mobile view successfully");
    });
    test('should allow filling a few fields on desktop view', async () => {
        await basePage.openMerchantDesktop();
        await signupPage.fname.waitFor({ state: 'visible', timeout: 10000 });
        await signupPage.fillForm();
        console.log("Hence the id4me sign up form is filled on desktop view successfully");
    });

})