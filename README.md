# Airalo Automation Testing

This repository contains an automation testing suite for the Airalo using [Playwright](https://playwright.dev/). The tests are organized into UI and API categories. The project utilizes the PageFactory design pattern to manage and organize page objects.  

## Table of Contents

- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)

## Folder Structure

```plaintext
Airalo/
│
├── pageFactory/                # Contains locators and component folders
│   ├── components/             # Component classes for interacting with the UI.
│   │   ├── homePage.component.ts
│   │   ├── localesimPage.component.ts
│   │   └── productPage.component.ts
│   └── locators/               # JSON files with locators for different pages. 
│       ├── homePage.json
│       ├── localesimPage.json
│       └── productPage.json
│
├── tests/                      # Contains test cases
│   ├── API/                    # API-related tests
│   │   └── submitOrder.spec.ts
│   └── UI/                     # UI-related tests
│       └── esimPlan.spec.ts
│
├── utils/                      # Utility functions
│   ├── API/                    # API details and request functions
│   │   ├── apiDetails.ts
│   │   └── apiRequest.ts
│   └── common/                 # Common utility functions
│       └── navigationUtils.ts
│
├── playwright.config.ts        # Playwright configuration file
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
└── ...                         # Other configuration files
```

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or above)
- npm (comes with Node.js) or Yarn (an alternative package manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rathiankit03/Airalo.git
   cd Airalo
   ```

2. ** Install project dependencies: **

    ```bash
    npm install
    ```

3. ** Install Playwright browsers: **

    ```bash
    npx playwright install
    ```

### Running Tests

1. **To run all tests:**

    ```bash
    npx playwright test
    ```

2. **To run tests with specific tags:**

    Use the @tag syntax to run tests that are tagged with specific tags. To Run the test with UI only then pass tag @ui and to run the test with API only the pass @api

    For example, to run tests tagged with @regression:

    ```bash
    npx playwright test --grep @regression
    ```

## Test Scenarios

### UI Tests

Validate eSIM Plan: Tests the functionality of searching and selecting an eSIM plan for Japan, and verifies the details on the product page.

**Approach**:

1. **Navigation**:
   - Start by navigating to the home page of the application.
   - Handle any popups such as cookie consent and push notification alerts to ensure a clean test environment.

2. **Search and Selection**:
   - Use the search bar to look for "Japan" and select the local eSIM option from the search suggestions.
   - Click on the "Buy Now" button for the first available eSIM package.

3. **Validation**:
   - Verify that the product page displays the correct details for the selected eSIM package.
     - Check that the title matches the expected value ("Moshi Moshi").
     - Confirm the coverage area, data value, validity period, and price are as expected.

### API Tests

Submit and Retrieve Orders: Tests the end-to-end functionality of submitting an eSIM order and retrieving it to ensure consistency between submitted orders and retrieved eSIM IDs.

**Approach**:

1. **Authentication**:
   - Obtain an authentication token from the Request Access Token API. This token is required to authenticate subsequent API requests.

2. **Order Submission**:
   - Submit a specified quantity of orders for a given eSIM package using the Submit Order API.
   - Validate the response to ensure it includes the correct quantity, package ID, data amount, and price.
   - Extract and store the IDs of the submitted orders for later verification.

3. **Retrieve Orders**:
   - Use the Get eSims List API to retrieve a list of eSIMs based on the quantity of orders.
   - Validate the response to ensure it matches the expected quantity and that the IDs are sorted correctly.

4. **Comparison**:
   - Compare the IDs of the submitted orders with the IDs retrieved from the Get eSims List API.
   - Ensure that all submitted order IDs are present and match the retrieved eSIM IDs.

