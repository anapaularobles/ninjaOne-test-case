const viewports = [
  // { device: "Mobile", width: 414, height: 896 },
  { device: "Desktop", width: 1280, height: 800 },
];

viewports.forEach((vp) => {
  describe(`Login page - ${vp.device} ${vp.width}x${vp.height}`, () => {
    beforeEach(() => {
      cy.viewport(vp.width, vp.height);
      cy.visit("/auth/#/login");
      cy.get('[name="email"]').as("emailInput");
      cy.get('[name="password"]').as("passwordInput");
      cy.get("#staySignedIn").as("staySignedInCheckbox");
    });

    it("Ensure the login page loads", () => {
      cy.get("@emailInput").should("be.visible");
      cy.get("@passwordInput").should("be.visible");
      cy.get("@staySignedInCheckbox").should("be.visible");
      cy.contains("label", "Mantenha-me conectado").should("be.visible");
      cy.contains("button", "Entrar").should("be.visible");
      cy.contains("a", "Esqueceu a senha?").should("be.visible");
      cy.contains("a", "Não tem uma conta?").should("be.visible");
    });

    it("should mask the password field input", () => {
      cy.get("@passwordInput").type(Cypress.env("invalidPassword"));
      cy.get("@passwordInput").should("have.attr", "type", "password");
      cy.get("@passwordInput").should(
        "have.value",
        Cypress.env("invalidPassword")
      );
    });

    it("Successful login", () => {
      cy.login(Cypress.env("user"), Cypress.env("password"));
      cy.contains("h2", "Autenticação multifator").should("be.visible");
    });

    it("Login with Password field left empty", () => {
      cy.get("@emailInput").type(Cypress.env("user"));
      cy.contains("button", "Entrar").click();
      cy.contains("div", "Erro durante o login").should("be.visible");
    });

    it("Login using an invalid email", () => {
      cy.login(Cypress.env("invalidUser"), Cypress.env("password"));
      cy.contains("div", "Erro durante o login").should("be.visible");
    });

    it("Should redirect to reset password page", () => {
      cy.contains("a", "Esqueceu a senha?").click();
      cy.url().should("include", "/resetPassword");
    });

    it("Should redirect to register account page", () => {
      cy.contains("a", "Não tem uma conta?").click();
      cy.url().should("include", "/register");
    });
  });
});
