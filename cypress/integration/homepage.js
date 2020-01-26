context('Home Page', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('should display the title text', () => {
    cy.getById('title-text').should('contain', 'TRT Bicycles');
  });
});
