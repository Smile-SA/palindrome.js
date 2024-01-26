import { localLiveMonitoring } from "../../../src/webCollectors/local_live_monitoring";
import { getWeatherData } from "../../../src/webCollectors/api.open-meteo.com";
import { defaultValues } from "../../../stories/controls/defaultControls";

/// <reference types="cypress" />

describe('[DEV] Remote data sources', () => { 
    beforeEach(() => {
        cy.visit(Cypress.env("dev"));
    });

    it('should monitor livedata use case each remoteDataFetchPace ms', () => {
        cy.get('#data').select('localLiveMonitoring', {force: true});
        cy.intercept('GET', 'http://localhost:3000/dataSys').as('monitoring');
        cy.get('#liveData').click({force: true});
        
        for (let i = 0; i < 2; i++) {
            cy.wait('@monitoring', { timeout: defaultValues().remoteDataFetchPace + 3000 }).should('have.property', 'request');
        }

        cy.get('#liveData').click({force: true});
    });

    it("should render remote data sources use cases", () => {
        const elements = [
            "api.open-meteo.com", 
            "localLiveMonitoring",
        ];

        for(const element of elements) {
            let selector = "#data";
            cy.get(selector).select(element, {force: true});
            if (element === "api.open-meteo.com") {
                cy.wait(20000);
            }
            cy.get('#remote-data-source-loader').should('not.exist');
        }
    });

    it("should retrieve well shaped data when requesting a remote data sources", () => {
        cy.wrap(localLiveMonitoring()).should('be.an', 'object');
        const monitoringLayers = ['systemMetrics', 'qosMetrics'];
        for (const layer of monitoringLayers) {
            cy.wrap(localLiveMonitoring())
            .should('have.property', layer)
            .and('have.all.keys', 'layer', 'metrics');
        }
        cy.wrap(getWeatherData(), { timeout: 20000 }).should('be.an', 'object');
        const weatherLayers = ['France', 'Tunisia', 'USA', 'China', 'Australia'];
        for (const layer of weatherLayers) {
            cy.wrap(getWeatherData(), { timeout: 20000 })
            .should('have.property', layer)
            .should('have.all.keys', 'layer', 'metrics');
        }
        
    });

  })
  