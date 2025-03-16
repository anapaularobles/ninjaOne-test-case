describe("API Login Tests", () => {
  it("should successfully initiate MFA with valid credentials", () => {
    cy.loginRequest(Cypress.env("user"), Cypress.env("password")).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include({
          resultCode: "MFA_REQUIRED",
          mfaType: "SMSOTP",
        });
        expect(response.body.loginToken).to.be.a("string");
        expect(response.body.available_mfa).to.have.property("SMSOTP", "0661");
      }
    );
  });

  it("should return error for empty email", () => {
    cy.loginRequest("", "123").then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body[0]).to.deep.include({
        message: "Email field can not be empty",
        path: "login.arg1.email",
      });
    });
  });

  it("should return unauthorized for incorrect password", () => {
    cy.loginRequest(Cypress.env("user"), "wrongPassword123").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property(
          "resultCode",
          "AUTHENTICATION_FAILURE"
        );
      }
    );
  });
});
