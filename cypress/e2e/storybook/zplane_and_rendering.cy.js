/// <reference types="cypress" />

describe('Z plane and rendering modes', function () {

  beforeEach(() => {
    cy.visit(Cypress.env("storybook"));
  });

  it('Zplane', function () {
    const elements = ["zPlaneInitial", "zPlaneHeight", "zPlaneMultilayer"]

    elements.forEach(element => {
      var ele = "#control-" + element

      if (ele === "#control-zPlaneMultilayer") {
        cy.get(ele).clear()
        cy.get(ele).type(-25)
      }
      else {
        cy.get(ele).clear()
        cy.get(ele).type(20)
      }

    })
    cy.get('[title="Go full screen [F]"]').click()
    cy.wait(2000)
    cy.matchScreenshot("Zplane", {
      threshold: 0.0001,
      thresholdType: 'pixel'
    })
    cy.wait(1000)
    cy.get('[title="Exit full screen [F]"]').click()
  })

  it('metricsLabelsRenderingMode | layersLabelsRenderingMode | metricsLabelsRenderingFormat', () => {
    const elements = ["metricsLabelsRenderingMode", "layersLabelsRenderingMode", "metricsLabelsRenderingFormat"]

    elements.forEach(element => {
      var ele = "#control-" + element

      if (element === "metricsLabelsRenderingFormat") {
        cy.get(ele).select('Table')
      }

      else {
        cy.get(ele).select('2D')
      }

      cy.get('[title="Go full screen [F]"]').click()
      cy.wait(1500)
      cy.matchScreenshot(ele, {
        threshold: 0.0001,
        thresholdType: 'pixel'
      })
      cy.wait(1000)
      cy.get('[title="Exit full screen [F]"]').click()

    })

  })

})