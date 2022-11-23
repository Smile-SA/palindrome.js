/// <reference types="cypress" />

describe ('Camera Options and Frame', function () { 
    it ("displayFrames | displayFramesLine | displayFramesBackground | displayLabelLine | DocsPage", function () {
    // Iterates over all elements of camera options
    const elements = ["displayFrames", "displayFramesLine", "displayFramesBackground", "displayLabelLine"]
    cy.visit(Cypress.env("theurl"))

    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)
  
    })
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


