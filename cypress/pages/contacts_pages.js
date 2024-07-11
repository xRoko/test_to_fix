

class ContactsPages {

    btnAddFirstContact = () => cy.get('[data-test="add-contact-button"]').first();
    btnAddInvoiceToContact = () => cy.get('[data-test="new-invoice"]').first();
    inputSearchContact = () => cy.get('[data-test="search_query"]');
    btnDeleteContact = () => cy.get('[data-test="delete_contact"]').first();
    btnConfirmDelete = () => cy.get('[data-test="dialog_confirm"]');

    tableRow = (companyName) => cy.contains('.el-table__row', companyName);
    btnDeleteRow = (companyName) => this.tableRow(companyName).find('[data-test="delete_contact"]');
    btnAddInvoiceRow = (companyName) => this.tableRow(companyName).find('[data-test="new-invoice"]');

}

module.exports = new ContactsPages();