//This file integrates defaultControls storybook into cypress testing environment
/// <reference types="cypress" />
const CustomConfigpalindrome = ".sto-1utb4xs"
import { CustomConfiguration } from '/stories/dc.stories.js';

var controls = Array.from(Object.keys(CustomConfiguration.args))

describe ('Color', function () { 
  it ("Asserts all controls with input types:color", function () {
  // Iterates over all elements of custom colour configurations
  cy.visit(Cypress.env("theurl"))
  cy.get(CustomConfigpalindrome).eq(1).click()

  controls.forEach(element => {
    if(element!='data'){
    let ele = "#control-" + element
      cy.get(ele).wait(1000).should('have.value', CustomConfiguration.args[element])
    }
  }
  )
}) 
})

