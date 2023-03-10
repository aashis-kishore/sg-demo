/* eslint-disable max-len */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  console.log(`username: ${username}, password: ${password}`);
  // cy.visit('/login');

  // cy.get('input[name=username]').type(username);

  // {enter} causes the form to submit
  // cy.get('input[name=password]').type(`${password}{enter}`, {log: false});

  // we should be redirected to /dashboard
  // cy.url().should('include', '/dashboard');

  // our auth cookie should be present
  // cy.getCookie('your-session-cookie').should('exist');

  // UI should reflect this user being logged in
  // cy.get('h1').should('contain', username);


  // with session
  // cy.session(username, () => {
  //   cy.visit('/login');
  //   cy.get('input[name=username]').type(username);
  //   cy.get('input[name=password]').type(`${password}{enter}`, {log: true});
  //   cy.url().should('include', '/dashboard');
  //   cy.get('h1').should('contain', username);
  // }, {
  //   validate: () => {
  //     cy.getCookie('your-session-cookie').should('exist');
  //   },
  // });
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
