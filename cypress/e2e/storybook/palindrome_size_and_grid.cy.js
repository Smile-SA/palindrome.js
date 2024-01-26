/// <reference types="cypress" />
// First run calls each element of Palindrome.js, takes a screenshot, makes changes, takes a new screenshot.
// Second run compares the screenshot to the first run and fails if the difference is greater than 5%
// Unmatched/failed screenshots are saved in cypress/match-screenshots/
const fullscreen = '.sto-1k5e3f'

describe('Palindrome size and Grid', function () {

  beforeEach(() => {
    cy.visit(Cypress.env("storybook"));
  });

  it('Palindrome Size | Metric Magnifier | lineWidth | gridSize | gridDivisions', function () {
    const elements = ["palindromeSize", "metricMagnifier", "lineWidth", "gridSize", "gridDivisions"]     

    elements.forEach(element => {
      var ele = "#control-" + element

      if (element === "gridSize") {
        cy.get(ele).clear()
        cy.get(ele).type(50)

        cy.get('[title="Go full screen [F]"]').click()
        cy.wait(2500)
        cy.matchScreenshot(ele,{
            threshold: 0.0001,
            thresholdType: 'pixel'
        })
        cy.wait(1000)
        cy.get('[title="Exit full screen [F]"]').click()
      }
      else{
        cy.get(ele).eval_type(ele)
      }      
    }) // lineWidth FAILS - make cypress focus on center part of screen
  })
})
  