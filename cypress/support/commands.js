// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import './commands'
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const fullscreen = '.sto-1k5e3f'
Cypress.Commands.add('eval_snapshot', ($el) => {
  // Goes fullscreen takes a snapshot with element's name

  cy.get(fullscreen).eq(7).click()
  cy.wait(3000)
  cy.matchScreenshot($el,{
    threshold: 0.0001,
    thresholdType: "pixel"
  })
  cy.get(fullscreen).eq(7).click( )

})


Cypress.Commands.add('eval_click', ($el) => {
  // Clicks first option wrapped around element and calls the eval_snapshot command
    cy.wait(1000)
    cy.get($el).first().click({force: true})
  
    cy.eval_snapshot($el)
  
  })
  
Cypress.Commands.add('eval_type', ($el) => {
  // Clears the element contents, types in 7 and calls the eval_snapshot command
  cy.wait(1000)
  cy.get($el).clear({force: true})
  cy.get($el).type(7) 
  
  cy.eval_snapshot($el)
})

Cypress.Commands.add('eval_color_blue', ($el) => {
  // Clears the element contents, updates the color to blue and calls the eval_snapshot command
  cy.wait(1000)
  cy.get($el).clear()
  cy.get($el).type('#0b40de')

  cy.eval_snapshot($el)
})

Cypress.Commands.add('eval_color_red', ($el) => {
  // Clears the element contents, updates the color to blue and calls the eval_snapshot command
  cy.wait(1000)
  cy.get($el).clear()
  cy.get($el).type('#e52a10')

  cy.eval_snapshot($el)
}) 

Cypress.Commands.add('eval_color_green', ($el) => {
  // Clears the element contents, updates the color to blue and calls the eval_snapshot command
  cy.wait(1000)
  cy.get($el).clear()
  cy.get($el).type('#10e645')

  cy.eval_snapshot($el)
})

export function defaultValues() {
  return {

  }
}

const compareSnapshotCommand = require('cypress-visual-regression/dist/command');

compareSnapshotCommand();

import { register } from 'cypress-match-screenshot';
register();
