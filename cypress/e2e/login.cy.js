const viewports = [
  // { device: "Mobile", width: 414, height: 896 },
  { device: "Desktop", width: 1280, height: 800 },
];

viewports.forEach((vp) => {
  describe("Login page", () => {
    beforeEach(() => {
      cy.viewport(vp.width, vp.height);
      cy.visit("https://app.ninjarmm.com/auth/#/login");
    });

    it("Ensure the login page loads", () => {
      cy.get('[name="email"]').should("be.visible");
      cy.get('[name="password"]').should("be.visible");
      cy.get("#staySignedIn").should("be.visible");
      cy.contains("label", "Mantenha-me conectado").should("be.visible");
      cy.contains("button", "Entrar").should("be.visible");
      cy.contains("a", "Esqueceu a senha?").should("be.visible");
      cy.contains("a", "Não tem uma conta?").should("be.visible");
    });

    it("should mask the password field input", () => {
      cy.get('[name="password"]').type(Cypress.env("invalidPassword"));
      cy.get('[name="password"]').should("have.attr", "type", "password");
      cy.get('[name="password"]').should(
        "have.value",
        Cypress.env("invalidPassword")
      );
    });

    it("Successful login", () => {
      cy.login(Cypress.env("user"), Cypress.env("password"));
      cy.contains("h2", "Autenticação multifator").should("be.visible");
    });

    it("Login with Password field left empty", () => {
      cy.get('[name="email"]').type(Cypress.env("user"));
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
