/// <reference types="cypress" />

describe("statusColorMed | lineColor | mainStaticColor | metricsLabelsColor | layersLabelsColor | frameLineColor", function () {

  beforeEach(() => {
    cy.visit(Cypress.env("storybook"));
  });

  it('statusColorMed', function () {
    const elements = ["statusColorMed", "lineColor", "mainStaticColor", "metricsLabelsColor", "layersLabelsColor", "frameLineColor"]
    elements.forEach(element => {
      var ele = "#control-" + element

      if (element == "statusColorMed") {
        cy.eval_color_blue(ele)
      }
      else {
        cy.eval_color_red(ele)
      }

    })
  })
})
