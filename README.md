# SauceDemo Playwright Automation Framework

This is a Playwright automation framework for testing the SauceDemo website. The framework automates the login flow and adds T-shirt products to the cart.

## Feature Branch

This is the feature branch of the SauceDemo Playwright Automation Framework. This branch can be used for developing new features without affecting the main codebase.

## Features

- Page Object Model design pattern
- Test reporting with HTML and Allure reports
- Screenshot capture for failed tests
- TypeScript for type safety
- Parallel test execution

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Project Structure

```
├── data/                  # Test data
├── fixtures/              # Test fixtures
├── pages/                 # Page objects
├── tests/                 # Test files
├── utils/                 # Utility functions
├── global-setup.ts        # Global setup file
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

## Viewing Reports

To view the HTML report:

```bash
npm run report
```

To generate and view Allure report:

```bash
npx allure generate ./test-results/reports/allure-results -o ./test-results/reports/allure-report --clean
npx allure open ./test-results/reports/allure-report
```

## Test Cases

1. Login Tests
   - Successful login with valid credentials
   - Error message with invalid credentials

2. Add to Cart Tests
   - Add T-Shirt product to cart

## Screenshots

Screenshots are automatically captured for failed tests and attached to the test report. They are stored in the `test-results/screenshots` directory.

## CI/CD Integration

This framework can be integrated with CI/CD pipelines like GitHub Actions, Jenkins, or CircleCI. The configuration is set up to run tests in CI mode when the `CI` environment variable is set. 