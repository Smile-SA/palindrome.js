/// <reference types="cypress" />

import { controls } from "../../../dev/utils/controls";

describe('[DEV] Display options', () => { 
    beforeEach(() => {
        cy.visit(Cypress.env("dev"));
    });

    it("should toggle display options with correct rendering", () => {
        const elements = [
            "displayLayers", 
            "bicolorDisplay", 
            "displayLayersLines", 
            "displaySides", 
            "displayMetricsLabelsUnit",
            "displayMetricsLabels",
            "displayGrid",
            "displayAllMetricsLabels",
            "displayLayersLabels",
            "displayFrames",
            "displayMetricSpheres",
            "displayFramesLine",
            "displayFramesBackground",
            "displayLabelLine",
            "bicolorDisplay"
            ];
        for(const element of elements) {
            let selector = "#" + element;
            cy.get(selector).eval_click(selector, "dev");
            cy.get(selector).click({force: true});
        }
    })

    it("should change behavior on dcFullMap use case", () => {
        const elements = {
            data: ['dcFullMap'],
            colorsBehavior: ['ranges', 'dynamic', 'static'],
            spheresColorsBehavior: ['ranges', 'dynamic', 'static'],
            displayMode: ['static', 'dynamic'],
            layerDisplayMode: ['static', 'dynamic']
        };

        for (const [select, options] of Object.entries(elements)) {
            let selector = "#" + select;
            for (const option of options) {
                cy.get(selector).select(option, {force: true});
                cy.eval_select(selector, option, "dev");
            }
        }

    })
    
    it("should change state of all toggle fields and render accordingly", () => {
        for (const key of Object.keys(controls)) {
            if(controls[key].control === "boolean") {
                if (key === "mockupData") {
                    cy.get("#" + key).click({force: true});
                }
                else {
                    cy.eval_click("#" + key, "dev");
                }
                cy.get("#" + key).click({force: true}); // turn it back to the default state
            }
        }
    });
  })
  