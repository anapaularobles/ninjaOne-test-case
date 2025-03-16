import "cypress-axe";

describe("Accessibility Tests", () => {
  beforeEach(() => {
    cy.visit("https://app.ninjarmm.com/auth/#/login");
    cy.injectAxe();
  });

  it("should have no accessibility violations", () => {
    cy.checkA11y(null, null, (violations) => {
      if (violations.length > 0) {
        const violationDetails = violations.map(
          ({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            elements: nodes.map((node) => node.target),
          })
        );

        // Explicitly throw an error (clearly visible in Cypress UI)
        throw new Error(
          `Accessibility violations found:\n${JSON.stringify(
            violationDetails,
            null,
            2
          )}`
        );
      }

      expect(violations).to.be.empty;
    });
  });
});
