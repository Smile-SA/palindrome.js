/// <reference types="cypress" />

describe ("lineColor | metricsLabelsColor | layersLabelsColor | frameLineColor", function () { 

  it ('layerColor', function () {
    const elements = [ "lineColor", "metricsLabelsColor", "layersLabelsColor", "frameLineColor" ]
    cy.visit(Cypress.env("theurl"))
    
    elements.forEach(element => {
      var ele = "#control-" + element
      cy.wait(1000)
      cy.get(ele).eval_color_red(ele)
       

    })
  })
})
