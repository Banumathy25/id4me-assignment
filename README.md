
# ID4me Signup Form - Playwright Automation

This project automates form validation tests for the signup page at [https://signup.id4me.me/account/signup](https://signup.id4me.me/account/signup) using **Playwright** with **JavaScript**.

It covers both positive and negative test cases, dynamic field behavior, and responsiveness across desktop and mobile devices.

![image](https://github.com/user-attachments/assets/826f47ce-dfc2-4e3c-af61-eb3bf8ac9124)


## What’s Tested

### Positive Scenarios
- Successful form submission with all required fields
- Page title and URL verification
- Password field meets all validation criteria

### Negative Scenarios
- Submitting the form with empty required fields
- Invalid email format triggers error
- Mismatched passwords show validation error
- Password field highlights on invalid input

### Dynamic Behavior
- Validates state/region dropdown behavior
- Validates password is not visible and masked as dots

### Cross-device Responsiveness
- Tests run with both **desktop** and **mobile** viewports (375x667 for mobile)

### Edge Cases
- Checks the non numeric characters in phone number field
- Checks if special characters are allowed in the email first part of the string

## Getting Started

## Install node js
this is the link: https://nodejs.org/en/download

## Set path variables
For windows: Add environment variable PATH:
```
C:\Program Files\nodejs
```
Open powershell as administrator and run the below command.
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```
For MacOS: Nodejs gets installed in 
```
/usr/local/bin 
```
 check if it is there in the above path. Run node -v and npx -v and make sure you get the version as output.

## Install VS Code editor
this is the link: https://code.visualstudio.com/download

### 1. Clone the repository
Run the below command in iterm for Mac and powershell in Windows.
```bash
git clone https://github.com/Banumathy25/id4me-assignment.git
```
Launch VS Code editor and open the id4me-assignment folder.
Open terminal in VS code editor and perform the following steps.

### 2. Install Playwright
```bash
npm init playwright@latest
```
Note: It might prompt for the below options to select:

![image](https://github.com/user-attachments/assets/026feb37-54a2-4946-9122-f82588e90894)


### 2. Install dependencies

### 3. Set up Environment Variables

Create a `.env` file in the root folder by copying the contents from `.env.example`:

```bash
# Copy contents manually or run this command:
cp .env.example .env
```

Then update the `.env` file as needed (for example, `BASE_URL`, `PASSWORD`).
If a .env with the above is already existing please ignore this step.

## Running the Tests

### Run all tests:

```bash
npx playwright test

```
### Run all tests in one browser:

```bash
npx playwright test --project=chromium
```

### Run specific test file:

```bash
npx playwright test tests/signup.positive.spec.js
```


### Run specific test file sequentially: (will be slow )

```bash
npx playwright test --workers=1
```

### Run with UI (headed mode):

```bash
npx playwright test --headed
```

### Run with UI (debug mode):

```bash
npx playwright test --debug
```

### Show HTML report:

```bash
npx playwright show-report
```

## Viewport Testing

You can test both screen sizes by calling:

- `basePage.openMerchantDesktop()` – Desktop view
- `basePage.openMerchantMobile()` – Mobile view

These are already used in `signup.dynamicFields.spec.js`.

## Assumptions

- Validation errors appear immediately after the user moves away from the field (blur) or submits the form.
- The sign-up form is embedded inside an iframe, and all interactions are handled using Playwright’s frameLocator.
- Error messages shown in the UI are consistent and exactly match the static strings used in tests (e.g., "Your passwords do not match").
- Network and page load times are reasonable and don’t exceed configured timeouts.
- Form fields have unique and stable selectors used in locators.
- After successful submission, the user is redirected or shown a confirmation message.

## Known Limitations

- No country dropdown exists on the current form (as of latest test).
- Some animations or third-party form scripts may delay element visibility slightly.
- CAPTCHA or rate-limiting is not handled in automation (none observed yet).
- The form is embedded inside an iframe, which may sometimes cause locator stability issues due to dynamic content loading delays.
- Validation error messages are checked against static text; if the application changes message wording, tests will fail and require updates.
- Mobile viewport tests cover only basic screen sizes and do not include all device-specific quirks or orientations.
- Currently, only key positive and negative scenarios and few edge cases are automated; exhaustive edge cases such as internationalization or accessibility are not covered yet.
- Password strength validation is limited to predefined criteria and does not test all possible password rules or backend validation.
- Integration attempt to CI/CD has been m ade through github actions but can be treated hypothetical as of now.
- Tests assume stable network and environment; flaky tests may occur due to asynchronous form loading or slow responses.
- API/backend validations related to sign-up success are not tested; the focus is purely on front-end UI behavior.

## Tools Used

- [Playwright](https://playwright.dev/)
- JavaScript (ES6)
- Node.js
- Page Object Model (POM) design
- Dotenv for environment variables
