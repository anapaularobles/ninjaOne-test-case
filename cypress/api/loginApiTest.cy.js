describe("API Testing with Cypress", () => {
  it("POST - Validate login request with valid credentials", () => {
    cy.request({
      method: "POST",
      url: "https://app.ninjarmm.com/ws/account/login",
      body: {
        email: "robles.anapaula@gmail.com",
        password: "R0bles123",
        staySignedIn: false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("resultCode", "MFA_REQUIRED");
      expect(response.body)
        .to.have.property("loginToken")
        .and.to.be.a("string");
      expect(response.body).to.have.property("mfaType", "SMSOTP");
      expect(response.body)
        .to.have.property("available_mfa")
        .that.is.an("object");
      expect(response.body.available_mfa).to.have.property("SMSOTP", "0661");
    });
  });

  it("POST - Validate login request with invalid credentials", () => {
    cy.request({
      method: "POST",
      url: "https://app.ninjarmm.com/ws/account/login",
      failOnStatusCode: false,
      body: {
        email: "",
        password: "123",
        staySignedIn: false,
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body[0]).to.have.property(
        "message",
        "Email field can not be empty"
      );
      expect(response.body[0]).to.have.property("path", "login.arg1.email");
    });
  });
});
