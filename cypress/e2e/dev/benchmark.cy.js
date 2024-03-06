// /// <reference types="cypress" />

// import { defaultValues } from "../../../stories/controls/defaultControls";

// describe('[DEV] Benchmark', () => {

//     beforeEach(() => {
//         cy.visit(Cypress.env("dev") + "?data=dcBasicConfiguration&benchmark=Active");
//     });

//     it("should block user interaction with the Palindrome while benchmarking", () => {
//         const benchmarkInteractionBlocker = 'benchmarkInteractionBlocker';
//         cy.get('#' + benchmarkInteractionBlocker).should('exist');
//     });

//     it("should display results modal on the end of benchmark", () => {
//         const benchmarkDurationTime = defaultValues().testDuration;
//         cy.wait(benchmarkDurationTime * 60 * 1000 * 2 + 1000); // wait until benchmark finishes
//         const benchmarkModal = 'benchmarkModal';
//         cy.get('#' + benchmarkModal).should('exist');
//         const basicVersion = 'table-Basic';
//         cy.get('#' + basicVersion).should('exist');
//         const webWorkersVersion = 'table-Web workers';
//         cy.get(`[id='${webWorkersVersion}']`).should('exist');
//     });

//     it("should expect actual fps and ms values not to be undefined nor NaN", () => {

//         const benchmarkDurationTime = defaultValues().testDuration;
//         cy.wait(benchmarkDurationTime * 60 * 1000 * 2 + 1000);
//         const basicVersion = 'table-Basic';
//         cy.get(`#${basicVersion} tr:nth-child(2) td:nth-child(1)`).then((cell) => {
//             cy.log(cell.text());
//             const cellValue = parseFloat(cell.text());
//             expect(cellValue).to.not.be.undefined;
//             expect(cellValue).to.not.be.NaN;
//         });
//         cy.get(`#${basicVersion} tr:nth-child(2) td:nth-child(2)`).then((cell) => {
//             cy.log(cell.text());
//             const cellValue = parseFloat(cell.text());
//             expect(cellValue).to.not.be.undefined;
//             expect(cellValue).to.not.be.NaN;
//         });

//         const webWorkersVersion = 'table-Web workers';
//         cy.get(`[id='${webWorkersVersion}'] tr:nth-child(2) td:nth-child(2)`).then((cell) => {
//             cy.log(cell.text());
//             const cellValue = parseFloat(cell.text());
//             expect(cellValue).to.not.be.undefined;
//             expect(cellValue).to.not.be.NaN;
//         });
//         cy.get(`[id='${webWorkersVersion}'] tr:nth-child(2) td:nth-child(1)`).then((cell) => {
//             cy.log(cell.text());
//             const cellValue = parseFloat(cell.text());
//             expect(cellValue).to.not.be.undefined;
//             expect(cellValue).to.not.be.NaN;
//         });
//     });
// })
