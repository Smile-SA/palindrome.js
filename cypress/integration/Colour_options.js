/// <reference types="cypress" />

describe ("statusColorMed | lineColor | mainStaticColor | metricsLabelsColor | layersLabelsColor | frameLineColor", function () { 
  it ('statusColorMed', function () {
    const elements = ["statusColorMed", "lineColor", "mainStaticColor", "metricsLabelsColor", "layersLabelsColor", "frameLineColor" ]
    cy.visit(Cypress.env("theurl"))
    
    elements.forEach(element => {
      var ele = "#control-" + element
      
      if (element == "statusColorMed") {
        cy.get(ele).eval_color_blue(ele)
      }
      else{
        cy.get(ele).eval_color_red(ele)
      }

    })
  })
})
