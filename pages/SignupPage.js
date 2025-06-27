const { BasePage } = require("./BasePage.js");
const helpers = require('../utils/helpers.js');
const { generateRandomString } = require('../utils/helpers.js');
const { expect } = require('@playwright/test');
require('dotenv').config();
exports.SignupPage = class SignupPage extends BasePage {
  constructor(page) {
    super(page);
    this.frameLocator = page.frameLocator('#hs-form-iframe-0');  // iframe locator
    // Define all form fields as locators inside the iframe
    this.fname = this.frameLocator.locator('input[name="firstname"]');
    this.lname = this.frameLocator.locator('input[name="lastname"]');
    this.email = this.frameLocator.locator('input[name="email"]');
    this.phno = this.frameLocator.locator('input[type="tel"]');
    this.password = this.frameLocator.locator('input[name="password"]');
    this.company = this.frameLocator.locator('input[name="company"]');
    this.conf_password = this.frameLocator.locator('input[name="confirmpassword"]');
    this.state = this.frameLocator.locator('select[name="state_region"]');
    this.submitButton = this.frameLocator.locator('#submit');
    this.errorMessages = this.frameLocator.locator(
      '//label[contains(text(), "required field") or contains(text(), "formatted correctly") or contains(text(), "do not match") or contains(text(), "may only contain numbers")]'
    );
    this.password_checks = this.frameLocator.locator('ul.custom-password-validator.no-list.inputs-list>li>span');
    this.password_checks2 = this.frameLocator.locator('ul.custom-password-validator.no-list.inputs-list>li>i');
    this.ref_source = this.frameLocator.locator('select[name="referral_source"]');
    this.agreement1 = this.frameLocator.locator('//span[text()="I agree to receive other communications from iD4me Find Main."]');
    this.agreement2 = this.frameLocator.locator('//*[text()="I agree to iD4me "]')
    this.alert_success = page.locator('.alert.alert-success');
    this.email_spec = 'test+id4me#user@mycompany.com';

    this.defaultValues = {
      fname: helpers.generateRandomString(7),
      lname: helpers.generateRandomString(6),
      email: helpers.generateRandomEmail(),
      phno: "413241234",
      company: helpers.generateRandomString(5),
    };
  }

  /**
* Fill the signup form fields.
* @param {Object} fields - Fields to fill. Optional.
* @param {string} fields.fname - First name.
* @param {string} fields.lname - Last name.
* @param {string} fields.email - Email address.
* @param {string} fields.phno - Phone number.
*/
  async checkTitle() {
    const title = await this.page.title();
    expect(title).toBe('Sign Up to iD4me find');
    console.log("Title of the page is as expected: ", title);
  }

  async fillForm(fields = {}) {
    const {
      fname = this.defaultValues.fname,
      lname = this.defaultValues.lname,
      email = this.defaultValues.email,
      phno = this.defaultValues.phno,
    } = fields;
    await this.waitForVisible(this.fname);
    if (fname) await this.fname.fill(fname);
    await this.waitForVisible(this.lname);
    if (lname) await this.lname.fill(lname);
    await this.waitForVisible(this.email);
    if (email) await this.email.fill(email);
    await this.waitForVisible(this.phno);
    if (phno) await this.phno.fill(phno);
  }

  async checkInvalidClasses() {
    await this.click_submit();
    const classes = await this.password.getAttribute('class');
    const hasErrorClass = classes.includes('invalid') && classes.includes('error');
    await expect(hasErrorClass).toBe(true);
  }

  async click_submit() {
    this.scrollToLocator(this.submitButton);
    await this.submitButton.click();
  }

  async getListErrorMessages(fieldName) {
    return await this.listOftextValues(this.errorMessages);
  }


  async clickEmptyFields() {
    // Simulate clicking and blurring each required field to trigger validation
    await this.fname.click();
    await this.lname.click();
    await this.email.click();
    await this.phno.click();
    await this.page.mouse.click(0, 0);
    await this.wait(500);

    // Now collect the error messages
    const list_errors = await this.getListErrorMessages();
    return list_errors;
  }
  async checkListLength(list_val) {
    expect(list_val.length).toBeGreaterThan(1);
  }

  async enterincorrectEmail() {
    await this.waitForVisible(this.email);
    await this.email.fill(helpers.generateRandomString(5));
    await this.wait(1000);
    const list_errorsEmail = await this.getListErrorMessages();
    console.log('Email errors:', list_errorsEmail);
    expect(list_errorsEmail).toContain('Email must be formatted correctly.');
  }

  async enterCorrectPassword() {
    this.scrollDown();
    this.scrollDown();
    await this.password.type(process.env.PASSWORD, { delay: 100 });
    await this.password.click();
    await this.waitForVisible(this.password_checks);
    const count_elements = await this.password_checks.count();
    const elements_array = [];
    for (let i = 0; i < count_elements; i++) {
      const text_val = await this.password_checks.nth(i).textContent();
      elements_array.push(text_val.trim());
    }
    const expected_checklist = [
      "At least 8 characters",
      "1 upper case",
      "1 lower case",
      "1 number",
      "1 special character"
    ];
    expect(elements_array).toEqual(expected_checklist);

  }

  async enterPasswordClassChecks() {
    await this.waitForVisible(this.password_checks2);
    const count_elements = await this.password_checks2.count();
    const class_array = [];
    for (let i = 0; i < count_elements; i++) {
      const class_val = await this.password_checks2.nth(i).getAttribute('class')
      class_array.push(class_val);
    }
    expect(class_array).toContain('check checked');
  }

  async fillFormAllFields(fieldsInput = {}) {
    const {
      fname = this.defaultValues.fname,
      lname = this.defaultValues.lname,
      email = this.defaultValues.email,
      phno = this.defaultValues.phno,
      company = this.defaultValues.company,
    } = fieldsInput;
    const locators = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      phno: this.phno,
      company: this.company,
    };
    const values = { fname, lname, email, phno, company };
    for (const [key, locator] of Object.entries(locators)) {
      const value = values[key];
      if (value) {
        await this.waitForVisible(locator);
        await locator.fill(value);
      }
    }
    // Scroll and select state
    await this.scrollToLocator(this.state);
    await this.state.selectOption('New South Wales (NSW)');
    // Scroll down if needed
    await this.scrollToLocator(this.password);
    this.wait(1500);
    // Enter password and confirm password with delay
    const passwordFields = [this.password, this.conf_password];
    for (const field of passwordFields) {
      await field.type(process.env.PASSWORD, { delay: 100 });
      await field.click(); // Optional: useful to trigger validation
    }
    await this.scrollToLocator(this.ref_source);
    await this.ref_source.selectOption({ index: 1 });
    await this.agreement1.click();
    await this.agreement2.click();
    this.click_submit();
  }

  async checkAlertSuccess() {
    await this.assertVisible(this.alert_success);
  }

  async checkStateFieldHidden(field_name) {
    await expect(this.state).toBeVisible();
    console.log('State option is visible');
    await this.scrollToLocator(this.state);
    await this.state.selectOption(field_name);
    const stateOptions = await this.state.locator('option').allTextContents();
    console.log('Available state options:', stateOptions);
    expect(stateOptions).toContain(field_name);
    console.log('State options contain the field name');
  }

  async checkPassConfPass() {
    await this.password.type(process.env.PASSWORD, { delay: 100 });
    await this.scrollToLocator(this.conf_password);
    this.scrollDown();
    await this.conf_password.type(process.env.PASSWORD2, { delay: 100 });
    const list_errors = await this.getListErrorMessages();
    expect(list_errors).toContain('Your password do not match');
  }

  async nonNumericCharsPhone() {
    const invalidPhoneNumbers = ['abc123', '+61abc', '123-abc', 'phone'];
    for (const invalidNumber of invalidPhoneNumbers) {
      await this.waitForVisible(this.fname);
      await this.fname.fill(this.defaultValues.fname);
      await this.waitForVisible(this.lname);
      await this.lname.fill(this.defaultValues.lname);
      await this.waitForVisible(this.email);
      await this.email.fill(this.defaultValues.email);
      await this.waitForVisible(this.phno);
      await this.phno.fill(invalidNumber);
      await this.fname.click();  // clicks another field
      await this.wait(1000);
    }
    const phoneErrors = await this.getListErrorMessages();
    expect(phoneErrors).toContain('A valid phone number may only contain numbers, +()-. or x');
  }

  async specCharInEmail() {
    await this.waitForVisible(this.email);
    await this.email.fill(this.email_spec);
    const list_errors = await this.getListErrorMessages();
    await expect(list_errors).toHaveLength(0);

  }
};