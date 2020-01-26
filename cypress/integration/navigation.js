context('Home Page', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('should navigate to fit page', () => {
    cy.getById('fit-nav').click();

    cy.getById('fit-title').should('contain', 'Why Fit?');
  });

  it('should navigate to rental page', () => {
    cy.getById('rental-nav').click();

    cy.getById('rental-title').should('contain', 'Bicycle Rental');
  });

  it('should navigate to repair page', () => {
    cy.getById('repair-nav').click();

    cy.getById('tune-up-pricing').should('contain', 'Tune Up Pricing');
  });
});
