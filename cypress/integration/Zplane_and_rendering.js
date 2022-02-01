/// <reference types="cypress" />

describe ('Z plane and rendering modes', function () { 

  it ('Zplane', function () {
      const elements = ["zPlaneInitial", "zPlaneHeight", "zPlaneMultilayer" ]
      cy.visit(Cypress.env("theurl"))

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
      cy.get('.css-18i2ql3 > .css-xddykm > .css-ha8kg').click({force: true})
      cy.wait(2000)
      cy.matchScreenshot("Zplane",{
          threshold: 0.0001,
          thresholdType: 'pixel'
      })
      cy.get('.css-18i2ql3 > .css-xddykm > .css-ha8kg').click({force: true})
    })

    it('metricsLabelsRenderingMode | layersLabelsRenderingMode | metricsLabelsRenderingFormat', () => {
      const elements = ["metricsLabelsRenderingMode", "layersLabelsRenderingMode" , "metricsLabelsRenderingFormat"]
      cy.visit(Cypress.env("theurl"))

      elements.forEach(element => {
        var ele = "#control-" + element

        if (element === "metricsLabelsRenderingFormat") {
          cy.get(ele).select('Table') 
        }

        else{
          cy.get(ele).select('2D') 
        }

        cy.get('.css-18i2ql3 > .css-xddykm > .css-ha8kg').click({force: true})
        cy.wait(1500)
        cy.matchScreenshot(ele,{
        threshold: 0.0001,
        thresholdType: 'pixel'
        })    
        cy.get('.css-18i2ql3 > .css-xddykm > .css-ha8kg').click({force: true})

     })

    })

})