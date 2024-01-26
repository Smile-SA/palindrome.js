/// <reference types="cypress" />

describe ('Metrics', function () { 

  beforeEach(() => {
    cy.visit(Cypress.env("storybook"));
  });

  it('should display absolute, percent and normalized values', () => {
    const metricsUnits = ['control-layerMetricsUnits-0', 'control-layerMetricsUnits-1', 'control-layerMetricsUnits-2'];

    for(const unit of metricsUnits) {
      const unitSelector = '#' + unit;
      cy.eval_click(unitSelector);
    }
  }); 

  it ('metricsLabelsStructure: Name | Type | Value | Unit', function () {    
    const elements = ["metricsLabelsStructure-0", "metricsLabelsStructure-1", "metricsLabelsStructure-2", "metricsLabelsStructure-3"]
    
    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)  
    })
    
  })
 
  it ('metricsLabelsBold | metricsLabelsItalic | displayMetricsLabelsUnit | displayMetricsLabels | displayAllMetricsLabels', function() {
    const elements = ["metricsLabelsBold", "metricsLabelsItalic", "displayMetricsLabelsUnit", "displayMetricsLabels", "displayAllMetricsLabels"]    

    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)

    })
  })  
})