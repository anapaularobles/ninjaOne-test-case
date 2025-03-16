const { defineConfig } = require("cypress");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  e2e: {
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // regular UI tests
      "cypress/api/**/*.cy.{js,jsx,ts,tsx}", // dedicated API tests
      "cypress/accessibility/**/*.cy.{js,jsx,ts,tsx}", // accessibility tests
    ],
    setupNodeEvents(on, config) {
      // Register logging task
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Properly setup mochawesome plugin
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
