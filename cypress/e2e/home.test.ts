/// <reference types="Cypress" />

describe('My First Test', () => {
  it('Visits the home Page', () => {
    cy.visit('/');

    const button = cy.get('button[type="submit"]');
    const input = () => cy.get('input[type="text"]');
    const tableAfterForm = cy.get('h1:last + div');

    tableAfterForm.should('not.exist');

    input().type('june 2020');

    button.click();

    tableAfterForm.should('exist');
  });

  it('Shows error messages', () => {
    cy.visit('/');

    const button = cy.get('button[type="submit"]');
    const input = () => cy.get('input[type="text"]');
    const small = () => cy.get('small');

    button.click();

    small().should('have.text', 'required');

    input().type('december 1969');

    small().should(
      'have.text',
      'please use the format <month> <year> like in the placeholder for any date 1970 - 9999',
    );
  });
});
