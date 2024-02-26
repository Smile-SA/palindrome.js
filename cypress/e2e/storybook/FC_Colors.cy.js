//This file integrates defaultControls storybook into cypress testing environment
/// <reference types="cypress" />
const CustomConfigpalindrome = "#use-cases-palindrome-data-center-example--custom-configuration"
import { CustomConfiguration } from '/stories/dc.stories.js';

var controls = Array.from(Object.keys(CustomConfiguration.args))

describe('Color', function () {

  beforeEach(() => {
    cy.visit(Cypress.env("storybook"));
  });

  it("Asserts all controls with input types:color", function () {
    // Iterates over all elements of custom colour configurations    
    cy.get(CustomConfigpalindrome).click({ force: true });

    controls.forEach(element => {
      if (element != 'data') {
        let ele = "#control-" + element
        cy.get(ele).wait(1000).should('have.value', CustomConfiguration.args[element])
      }
    }
    )
  })
})

