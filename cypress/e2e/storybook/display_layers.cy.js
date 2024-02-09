/// <reference types="cypress" />

describe('Display layers', function () {
  beforeEach(() => {
    cy.visit(Cypress.env("storybook"));
  });

  it("displayLayers | layerStatusControl | displaySides | displayGrid", function () {
    const elements = ["displayLayers", "lineOpacity", "displaySides", "displayGrid"]

    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)

    })
  })

  it('layersLabelsItalic | layersLabelsBold | displayLayersLabels', function () {
    const elements = ["layersLabelsItalic", "layersLabelsBold", "displayLayersLabels"]

    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)

    })
  })

})
