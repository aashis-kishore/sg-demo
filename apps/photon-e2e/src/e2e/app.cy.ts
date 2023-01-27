import {getGreeting} from '../support/app.po';

describe('photon', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.origin('http://localhost:4200', () => {
    // cy.visit('/');
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome photon');
    // });
  });

  it('finds the content "type"', () => {
    cy.origin('https://example.cypress.io', () => {
      cy.visit('/');
      cy.contains('type');
    });
  });

  it('clicks the link "type"', () => {
    cy.origin('https://example.cypress.io', () => {
      cy.visit('/');

      cy.contains('type').click();

      // Should be on a new URL which
      // includes '/commands/actions'
      cy.url().should('include', '/commands/actions');

      // Get an input, type into it
      cy.get('.action-email').type('fake@email.com');

      // Verify that the value has been updated
      cy.get('.action-email').should('have.value', 'fake@email.com');
    });
  });
});
