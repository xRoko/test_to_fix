import GeneralLib from '../lib/general_libary';
import NewInvoiceLibary from '../lib/new_invoice_libary';
import NewInvoicePage from '../pages/new_invoice_pages';
import CreatedInvoices from '../pages/created_invoices_pages';
import ContactsLibary from '../lib/contacts_libary';

describe('Please fix me', () => {

  beforeEach(() => {
    GeneralLib.createSession('login', () => GeneralLib.login('testmail@seznam.cz'));
    GeneralLib.urlLoad('https://cy.fakturaonline.cz/faktura');
  });

  it('1.Vytvor vyplnenu dle specifikace _ jmeno fy, splatnost,.. ', () => {
    NewInvoiceLibary.chooseFirstItemDropOdber('vera');
    NewInvoiceLibary.chooseFirstItemDropDodavatel('Simon');
    NewInvoiceLibary.setPaymentPeriod('0');
    NewInvoiceLibary.payMethodBankAccount('7144458721/0300');
    NewInvoiceLibary.setInvoiceNumber(Math.floor((Math.random() * 50000)));
    NewInvoiceLibary.invoiceDetailsItem('20','den', 'SW test fee', '2000', '21');
    GeneralLib.createStep('verification number of invoice');
    NewInvoicePage.inputInvoiceRegNr().invoke('val').then((val) => {
      NewInvoicePage.buttonSaveInvoices().click({timeout: 4000});
      CreatedInvoices.tableRow(val).should('exist');
    });
    GeneralLib.createStep('verification of download');
    GeneralLib.verifyDownload('.pdf')
  });

  it('2.Vytvor kontakt',() => {
    GeneralLib.urlLoad('https://cy.fakturaonline.cz/kontakty');
    ContactsLibary.addFirstContact('Jana', 'kontakt@seznam.cz');
  });

  it.only('3.Vytvoreni invoice pro vytvoreny kontakt,ktery obsahuje v nazvu Nova Firma ', () => {
    GeneralLib.urlLoad('https://cy.fakturaonline.cz/kontakty');
    ContactsLibary.addFirstContact('Sova', 'novaFirma@seznam.cz');
    NewInvoiceLibary.newInvoiceFromContact('Nova', 'Roman', '20', 'den', 'SW testing', '1500', '21');
    GeneralLib.createIntercept('POST', '/api\/send-invoice\/.*/').as('SendInvoiceMail');
    NewInvoicePage.buttonCreateAndSend().click({force:true});
    NewInvoicePage.buttonSendEmailConfirm().click();
    GeneralLib.createStep('Verification of sending to email');
    GeneralLib.proceedIntercept('@SendInvoiceMail', 'Odeslani na email funguje');
  });

  it.only('4.Smazani kontaktu ', () => {
    GeneralLib.createStep('verification loading page')
    GeneralLib.createIntercept('GET', 'api\/contacts\/.*').as('LoadPageContacts');
    GeneralLib.urlLoad('https://cy.fakturaonline.cz/kontakty');
    GeneralLib.proceedIntercept('', 'Page contacts loaded');
    ContactsLibary.addContact('A');
    ContactsLibary.removeContact('A');

  });
});