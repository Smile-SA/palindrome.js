/// <reference types="cypress" />
// First run calls each element of Palindrome.js, takes a screenshot, makes changes, takes a new screenshot.
// Second run compares the screenshot to the first run and fails if the difference is greater than 5%
// Unmatched/failed screenshots are saved in cypress/match-screenshots/

describe('Palindrome size and Grid', function () {

  it('Palindrome Size | Metric Magnifier | lineWidth | gridSize | gridDivisions', function () {
    const elements = ["palindromeSize", "metricMagnifier", "lineWidth", "gridSize", "gridDivisions"] 
    cy.visit(Cypress.env("theurl"))

    elements.forEach(element => {
      var ele = "#control-" + element

      if (element === "gridSize") {
        cy.get(ele).clear()
        cy.get(ele).type(50)

        cy.get('.css-18i2ql3 > .css-xddykm > .css-ha8kg').click({force: true})
        cy.wait(2000)
        cy.matchScreenshot(ele,{
            threshold: 0.0001,
            thresholdType: 'pixel'
        })
        cy.get('.css-18i2ql3 > .css-xddykm > .css-ha8kg').click({force: true})
      }
      else{
        cy.get(ele).eval_type(ele)
      }      
    }) // lineWidth FAILS - make cypress focus on center part of screen
  })
})
  