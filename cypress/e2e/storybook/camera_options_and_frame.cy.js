/// <reference types="cypress" />

describe ('Camera Options and Frame', function () { 

  beforeEach(() => {
    cy.visit(Cypress.env("storybook"));
  });

  it('should render object with fit, flat or top camera options', () => {
    const cameraOptions = ['control-cameraOptions-0', 'control-cameraOptions-1', 'control-cameraOptions-2']; // fit, top, flat
    for (const cameraOption of cameraOptions) {
      const selector = '#' + cameraOption;
      cy.eval_click(selector);
    }
  });

  it('should rotate layer 45° on flat camera mode', () => {
    const cameraOptions = ['control-cameraOptions-1', 'control-cameraOptions-2']; // fit, top, flat
    for (const cameraOption of cameraOptions) {
      const selector = '#' + cameraOption;
      cy.get(selector).click({force: true});
    }

    const rotationAngleInputSelector = '#control-rotatedMetricsAngle';
    cy.eval_type(rotationAngleInputSelector, 45);
  });

  it('should merge metrics names on flat camera mode', () => {
    const cameraOptions = ['control-cameraOptions-1', 'control-cameraOptions-2']; // fit, top, flat
    for (const cameraOption of cameraOptions) {
      const selector = '#' + cameraOption;
      cy.get(selector).click({force: true});
    }

    const mergeMetricsToggleSelector = '#control-mergedMetricsNames';
    cy.eval_click(mergeMetricsToggleSelector);
  });

  it ("displayFrames | displayFramesLine | displayFramesBackground | displayLabelLine | DocsPage", function () {
    // Iterates over all elements of camera options
    const elements = ["displayFrames", "displayFramesLine", "displayFramesBackground", "displayLabelLine"]    
    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_click(ele)
  
    })
  })
  
  it ('frameLineWidth | frameDashLineSize', function () { 
    const elements = ['frameLineWidth','frameDashLineSize']
    elements.forEach(element => {
      var ele = "#control-" + element
      cy.get(ele).eval_type(ele)
    })
  
  })
})


