import { defaultValues } from "../../../stories/controls/defaultControls";
import { controls } from "../../../dev/utils/controls";


describe('[DEV] Sidebar values', function () {
    beforeEach(() => {
        cy.visit(Cypress.env("dev"));
    });
    it("should respect all default values", () => {
        const defaultValuesObject = defaultValues();
        for (const control of Object.keys(controls)) {
            let selector = "#" + control;
            if (controls[control].control === "boolean") {
                cy.get(selector).should(defaultValuesObject[control] ? 'be.checked' : 'not.be.checked');
            }
        }
    })
})