const { defineConfig } = require("cypress");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.ninjarmm.com",
    retries: {
      runMode: 2,
      openMode: 0,
    },
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // UI tests
      "cypress/api/**/*.cy.{js,jsx,ts,tsx}", // API tests
      "cypress/accessibility/**/*.cy.{js,jsx,ts,tsx}", // accessibility tests
    ],
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      mochawesome(on, config);

      return config;
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
