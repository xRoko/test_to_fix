import ContactsPages from'../pages/contacts_pages';
import NewContactPages from '../pages/new_contact_pages';
import GeneralLib from '../lib/general_libary';


class ContactsLibary {

    addFirstContact(firma,email) {
        GeneralLib.createStep('push button to add first contact');
        ContactsPages.btnAddFirstContact().click({timeout: 500});
        GeneralLib.createStep('type name of company');
        NewContactPages.inputContactName().type(firma);
        GeneralLib.createStep('choose first item in dropbox of companies');
        NewContactPages.dropDownFirstMatch().click({timeout: 500});
        GeneralLib.createStep('add Nova firma to existing company name');
        NewContactPages.inputContactName().type(' Nova firma', {timeout: 500});
        GeneralLib.createStep('click to Web input');
        NewContactPages.inputWeb().click();
        GeneralLib.createStep('input email address');
        NewContactPages.inputEmail().clear().type(email);
        GeneralLib.createStep('save new contact');
        NewContactPages.btnSave().click({timeout: 1000});
    }

    addContact(firma) {
        GeneralLib.createStep('push button to add contact');
        ContactsPages.btnAddFirstContact().click({timeout: 500});
        GeneralLib.createStep('type name of company');
        NewContactPages.inputContactName().type(firma);
        GeneralLib.createStep('choose first item in dropbox of companies');
        NewContactPages.dropDownFirstMatch().click({timeout: 500});
        GeneralLib.createStep('save new contact');
        NewContactPages.btnSave().click({timeout: 1000});
        GeneralLib.createStep('verification of added contact');
        ContactsPages.tableRow(firma).should('exist').and('be.visible');

    }

    removeContact(companyName) {
        GeneralLib.createStep('click on delete button for mentioned company');
        ContactsPages.btnDeleteRow(companyName).click({force: true}, {timeout: 5000});
        GeneralLib.createStep('click for confirmation button');
        ContactsPages.btnConfirmDelete().click({force: true});
        GeneralLib.createStep('verification of deleted contact');
        ContactsPages.tableRow(companyName).should('not.exist');

    }
}

module.exports = new ContactsLibary();

// ContactsPages.inputSearchContact().type(firma,{timeout:5000});
// ContactsPages.btnDeleteContact().click({force: true},{timeout:5000});