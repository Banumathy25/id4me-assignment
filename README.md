
# ID4me Signup Form - Playwright Automation

This project automates form validation tests for the signup page at [https://signup.id4me.me/account/signup](https://signup.id4me.me/account/signup) using **Playwright** with **JavaScript**.

It covers both positive and negative test cases, dynamic field behavior, and responsiveness across desktop and mobile devices.

## Project Structure

```
id4me-assignment/
│
├── tests/                  # All test specs (positive, negative, dynamic)
│   ├── signup.positive.spec.js
│   ├── signup.negative.spec.js
│   └── signup.dynamicFields.spec.js
│
├── pages/                  # Page Object Model files
│   ├── BasePage.js
│   └── SignupPage.js
│
├── .env                    # Contains BASE_URL
├── playwright.config.js    # Playwright configuration
├── package.json
└── README.md               # You're here!
```

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
- Visibility checks for form fields
- Checks form behavior on user interaction

### Cross-device Responsiveness
- Tests run with both **desktop** and **mobile** viewports (375x667 for mobile)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Banumathy25/id4me-assignment.git
cd id4meAutomationAssignment
```

### 2. Install dependencies

```bash
npm install
npm init playwright@latest
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Set up Environment Variables

Create a `.env` file in the root folder by copying the contents from `.env.example`:

```bash
# Copy contents manually or run this command:
cp .env.example .env
```

Then update the `.env` file as needed (for example, `BASE_URL`, `PASSWORD`).

## Running the Tests

### Run all tests:

```bash
npx playwright test
```

### Run specific test file:

```bash
npx playwright test tests/signup.positive.spec.js
```

### Run with UI (headed mode):

```bash
npx playwright test --headed
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

- Validation errors appear immediately after field blur or submit.
- Form is embedded inside an iframe and handled via `frameLocator`.
- The error messages match static strings (e.g., `"Your passwords do not match"`).

## Known Limitations

- No country dropdown exists on the current form (as of latest test).
- Some animations or third-party form scripts may delay element visibility slightly.
- CAPTCHA or rate-limiting is not handled in automation (none observed yet).

## Tools Used

- [Playwright](https://playwright.dev/)
- JavaScript (ES6)
- Node.js
- Page Object Model (POM) design
- Dotenv for environment variables
