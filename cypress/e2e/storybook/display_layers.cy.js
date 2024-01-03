/// <reference types="cypress" />

describe ('Display layers', function () { 
  it ("displayLayers | layerStatusControl | displaySides | displayGrid", function () {
    const elements = [ "displayLayers" , "lineOpacity" , "displaySides" , "displayGrid"]
    cy.visit(Cypress.env("theurl"))

    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)
  
    })
  })

  it ('layersLabelsItalic | layersLabelsBold | displayLayersLabels', function() {
    const elements = ["layersLabelsItalic", "layersLabelsBold", "displayLayersLabels"]
    cy.visit(Cypress.env("theurl"))

    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)
  
    })
  })

})
