

class NewContactPages {

    inputContactName = () => cy.get('[data-test="invoice_attributes_name"]');
    dropDownFirstMatch = () => cy.get('.autocomplete-item').first();
    inputEmail = () => cy.get('[data-test="email"]');
    inputVat = () => cy.get('[data-test="vat"]');
    btnSave = () => cy.get('[data-test="save-contact"]');
    inputWeb = () => cy.get('[data-test="web"]');
}


module.exports = new NewContactPages();