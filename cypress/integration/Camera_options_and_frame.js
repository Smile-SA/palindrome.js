/// <reference types="cypress" />

describe ('Camera Options and Frame', function () { 
    it ("displayFrames | displayFramesLine | displayFramesBackground | displayFramesArrow | DocsPage", function () {
    // Iterates over all elements of camera options
    const elements = ["displayFrames", "displayFramesLine", "displayFramesBackground", "displayFramesArrow"]
    cy.visit(Cypress.env("theurl"))

    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)
  
    })

    cy.get('.css-1xonygc').last().click()

  })
  
  it ('frameLineWidth | frameDashLineSize', function () { 
    const elements = ['frameLineWidth','frameDashLineSize']
  
    cy.visit(Cypress.env("theurl"))
  
    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_type(ele)
    })
  
  })
})


