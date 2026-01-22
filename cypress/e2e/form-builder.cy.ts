describe("Form Builder", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the Form Builder title", () => {
    cy.contains("h1", "Form Builder").should("be.visible");
  });

  it("should have one field by default", () => {
    cy.get(".field-row").should("have.length", 1);
  });

  it("should add a new field when clicking +", () => {
    cy.get(".field-row").should("have.length", 1);
    cy.get('button[aria-label="Add new field"]').first().click();
    cy.get(".field-row").should("have.length", 2);
  });

  it("should remove a field when clicking X and confirming", () => {
    cy.get('button[aria-label="Add new field"]').first().click();
    cy.get(".field-row").should("have.length", 2);

    cy.get('button[aria-label="Remove field"]').first().click();
    cy.get(".field-row").should("have.length", 1);
  });

  it("should update field label", () => {
    cy.get('input[placeholder="Enter field label"]').first().type("Email Address");
    cy.get('input[placeholder="Enter field label"]').first().should("have.value", "Email Address");
  });

  it("should update field placeholder", () => {
    cy.get('input[placeholder="Enter placeholder text"]').first().type("Enter your email");
    cy.get('input[placeholder="Enter placeholder text"]').first().should("have.value", "Enter your email");
  });

  it("should change field type", () => {
    cy.get("select").first().select("password");
    cy.get("select").first().should("have.value", "password");
  });

  it("should disable Save button when label is empty", () => {
    cy.contains("button", "Save").should("be.disabled");
  });

  it("should enable Save button when label is filled", () => {
    cy.get('input[placeholder="Enter field label"]').first().type("Username");
    cy.contains("button", "Save").should("not.be.disabled");
  });

  it("should switch to Generated Form view after saving", () => {
    cy.get('input[placeholder="Enter field label"]').first().type("Username");
    cy.contains("button", "Save").click();
    cy.contains("h1", "Generated Form").should("be.visible");
  });

  it("should display the configured field in Generated Form", () => {
    cy.get('input[placeholder="Enter field label"]').first().type("Username");
    cy.get('input[placeholder="Enter placeholder text"]').first().type("Enter username");

    cy.contains("button", "Save").click();
    cy.contains("label", "Username").should("be.visible");
    cy.get('input[placeholder="Enter username"]').should("be.visible");
  });

  it("should switch back to Builder when clicking Edit", () => {
    cy.get('input[placeholder="Enter field label"]').first().type("Username");
    cy.contains("button", "Save").click();
    cy.contains("button", "Edit").click();
    cy.contains("h1", "Form Builder").should("be.visible");
  });
});
