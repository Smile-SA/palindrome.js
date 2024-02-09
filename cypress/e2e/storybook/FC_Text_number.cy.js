//This file integrates defaultControls storybook into cypress testing environment
/// <reference types="cypress" />

import { defaultControls, defaultValues } from '/stories/controls/defaultControls.js';

var controls = Array.from(Object.keys(defaultControls()))

describe('Functional testing for Controls ', function () {
  beforeEach(() => {
    cy.visit(Cypress.env("storybook"));
  });

  it("Asserts all controls with input types: text | number | color", function () {
    // Iterates over all elements of camera options    

    controls.forEach(element => {
      var ele = "#control-" + element
      if (defaultControls()[element].control == 'number' |
        defaultControls()[element].type == 'text') {
        cy.get(ele).wait(1000).should('have.value', defaultValues()[element])
      }
    })
  })
})

