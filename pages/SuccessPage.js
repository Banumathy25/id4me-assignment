const { BasePage } = require("./BasePage.js");
const helpers = require('../utils/helpers.js');
const { generateRandomString } = require('../utils/helpers.js');
const { expect } = require('@playwright/test');
require('dotenv').config();
exports.SuccessPage = class SuccessPage extends BasePage {
    constructor(page) {
        super(page);
        this.alert_success = page.locator('.alert.alert-success');
    }
    async checkAlertSuccess() {
        await this.assertVisible(this.alert_success);
    }


}