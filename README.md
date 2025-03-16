# NinjaOne - Cypress Automation Tests

## Project Description

This repository contains end-to-end, API, and accessibility automation tests built using **Cypress** to ensure that login page maintains quality standards, delivers an good user experience, and remains accessible to all users.

## Prerequisites

- Make sure you have `node` installed on your machine (https://nodejs.org/)

## Installation

> run this command on terminal `git clone git@github.com:anapaularobles/ninjaOne-test-case.git`

## To execute

- Install dependencies: npm install

### Running Tests\*\*

- To open cypress: `npx cypress open`
- To run specific test: `npx cypress run --spec "cypress/e2e/*.cy.js"`
- To run and generate the Report: `npm run test && npm run report`

## Test Reports

After running tests, a detailed HTML report is generated in:`cypress/reports/index.html`
Open this file in your browser to clearly see test results, screenshots, and detailed logging.

## Best Practices

- **Keep tests simple, readable, and maintainable.**
- **Clearly assert expected outcomes.**
- **Use custom commands and fixtures for reusable logic.**
- **Run accessibility tests regularly.**
