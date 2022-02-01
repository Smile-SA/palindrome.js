/// <reference types="cypress" />

describe ('Metrics', function () { 

it ('metricsLabelsStructure: Name | Type | Value | Unit', function () {    
    const elements = ["metricsLabelsStructure-0", "metricsLabelsStructure-1", "metricsLabelsStructure-2", "metricsLabelsStructure-3"]
    cy.visit(Cypress.env("theurl"))
    
    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)  
    })
    
  })
 
  it ('metricsLabelsBold | metricsLabelsItalic | displaysMetricsLabelsUnit | displayMetricsLabels | displayAllMetricsLabels', function() {
    const elements = ["metricsLabelsBold", "metricsLabelsItalic", "displaysMetricsLabelsUnit", "displayMetricsLabels", "displayAllMetricsLabels"]
    cy.visit(Cypress.env("theurl"))

    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)

    })
  })  
})