//This file integrates defaultControls storybook into cypress testing environment
/// <reference types="cypress" />

import { defaultControls, defaultValues } from '/stories/controls/defaultControls.js';

var controls = Array.from(Object.keys(defaultControls()))

describe ('Functional testing for Controls ', function () { 
  it ("Asserts all controls with input types: text | number | color", function () {
  // Iterates over all elements of camera options
  cy.visit(Cypress.env("theurl"))

  controls.forEach(element => {
    var ele = "#control-" + element
    if (defaultControls()[element].control == 'number' | 
        defaultControls()[element].type == 'text' ) {
      cy.get(ele).wait(1000).should('have.value', defaultValues()[element])
    }
  })
  }) 
})

