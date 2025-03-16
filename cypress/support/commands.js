Cypress.Commands.add("login", (email, password) => {
  cy.get('[name="email"]').type(email);
  cy.get('[name="password"]').type(password);
  cy.contains("button", "Entrar").click();
});

Cypress.Commands.add(
  "loginRequest",
  (email, password, staySignedIn = false) => {
    return cy.request({
      method: "POST",
      url: "/ws/account/login",
      failOnStatusCode: false,
      body: {
        email,
        password,
        staySignedIn,
      },
    });
  }
);
