import NewInvoicePage from '../pages/new_invoice_pages';
import ContactsPages from '../pages/contacts_pages';
import GeneralLib from '../lib/general_libary';

class NewInvoiceLibary {

    chooseFirstItemDropOdber(jmeno) {
        GeneralLib.createStep('enter Buyer to new invoice');
        NewInvoicePage.inputBuyerCompanyName().clear().type(jmeno);
        GeneralLib.createStep('choose first item in list of buyers');
        NewInvoicePage.dropdownMenuBuyer().click({timeout: 2000});
    }

    chooseFirstItemDropDodavatel(jmeno) {
        GeneralLib.createStep('enter Seller to new invoice');
        NewInvoicePage.inputSellerCompanyName().clear().type(jmeno);
        GeneralLib.createStep('choose first item in list of buyers');
        NewInvoicePage.dropdownMenuBuyer().click({timeout: 2000});
    }

    setPaymentPeriod(date) {
        GeneralLib.createStep('click to set due date');
        NewInvoicePage.inputDueDate().click();
        GeneralLib.createStep('choose from dropdown menu days for payment');
        NewInvoicePage.dropDueDate().contains(date).click({timeout: 2000});
    }

    setInvoiceNumber(invoiceNumber) {
        GeneralLib.createStep('type invoice number ');
        NewInvoicePage.inputInvoiceNr().clear().type(invoiceNumber);
        NewInvoicePage.inputInvoiceRegNr().then(() => {   //vstup do jQuery
            if (Cypress.$('.el-popconfirm').length > 0) {
                cy.get('[data-test="sequence_popover_cancel_button"]').click({force: true});
            }
        })
    }

    writeNote(eq) {
        NewInvoicePage.inputDueDate().click();
        NewInvoicePage.dropDueDate().contains(eq).click({timeout: 2000});
    }

    payMethodBankAccount(acountNr) {
        GeneralLib.createStep('click to select payment method');
        NewInvoicePage.inputPaymentMethod().click({timeout: 1000});
        GeneralLib.createStep('choose from dropdown menu bank transfer ');
        NewInvoicePage.dropdownBankAcountPayment().click({timeout: 1000});
        GeneralLib.createStep('write bank account');
        NewInvoicePage.inputBankAccount().clear().type(acountNr);
    }


    invoiceDetailsItem(nrOfItems, unit, item, pricePerUnit, tax) {
        GeneralLib.createStep('type nr. of units in 1 item');
        NewInvoicePage.inputNrInvoices().clear().type(nrOfItems);
        GeneralLib.createStep('select unit');
        NewInvoicePage.inputUnitType().contains(unit).click({timeout: 500});
        GeneralLib.createStep('type description of item');
        NewInvoicePage.inputDescription().type(item);
        GeneralLib.createStep('type price per unit');
        NewInvoicePage.inputPrice().type(pricePerUnit);
        GeneralLib.createStep('choose tax from dropdown');
        NewInvoicePage.inputVATRate().contains(tax).click({timeout: 500});
    }

    newInvoiceFromContact(companyName, jmeno, nrOfItems, unit, item, pricePerUnit, tax) {
        GeneralLib.createStep('click to add invoice to this contact');
        ContactsPages.btnAddInvoiceRow(companyName).click({force: true}, {timeout: 1000});
        this.chooseFirstItemDropDodavatel(jmeno)
        this.invoiceDetailsItem(nrOfItems, unit, item, pricePerUnit, tax)
    };

    createSaveItem(text, price) {
        GeneralLib.createStep('click to open window for saved items');
        GeneralLib.createIntercept('POST', /api\/1529498\/envelope\/.*/).as('OpenWindow');
        NewInvoicePage.inputAddSavedItem().click({timeout: 3000});
        GeneralLib.proceedIntercept('@OpenWindow', 'window for add new item is open');
        GeneralLib.createStep('click to add new item');
        NewInvoicePage.buttonAddNewItemSaved().click({timeout: 7000});
        GeneralLib.createStep('Type description of item');
        NewInvoicePage.inputNewItemDescription().clear().type(text);
        GeneralLib.createStep('Choose unit of item');
        NewInvoicePage.dropdownUnitChoice().click({force: true}, {timeout: 5000});
        NewInvoicePage.buttonUnitChoicePcs().click({force: true}, {timeout: 5000});
        GeneralLib.createStep('Type price per unit');
        NewInvoicePage.inputPriceValue().clear().type(price, {timeout: 5000});
        GeneralLib.createStep('choose vat value 10');
        NewInvoicePage.dropdownDPH().click({force: true}, {timeout: 5000});
        NewInvoicePage.buttonVatChoice10().click({force: true}, {timeout: 5000});
        NewInvoicePage.buttonSaveItem().click({timeout: 5000});
        GeneralLib.createStep('select item in list');
        NewInvoicePage.buttonChoose(text).click({force: true});
    }
}


module.exports = new NewInvoiceLibary();