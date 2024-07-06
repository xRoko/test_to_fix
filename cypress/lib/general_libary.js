import GeneralPage from '../pages/general_page';


class GeneralLib {

    login(username) {
        cy.clearCookies();  /*login funkce*/
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('https://cy.fakturaonline.cz/prihlaseni');
        let random = Math.floor((Math.random() * 205));
        GeneralPage.inputEmail().type(`${random}${username}`);
        cy.intercept('GET', /api\/invoices\/new\/.*/).as('LoadMainPage')
        GeneralPage.btnTryLogin().click({timeout:4000});
        cy.url().should('contain', '/faktura');
        GeneralPage.btnMyAccount().should('exist').and('be.visible');
    };

    urlLoad(url){
        cy.visit(url);
    }
    verifyDownload(element){   //pro plug/in verif//
        cy.verifyDownload(element, {contains:true});
    }

    createIntercept(method, url) {
        return cy.intercept(method, url);
    }

    proceedIntercept(alias, log) {
        cy.wait(alias).then(() => {
            cy.log(log);
        });
    }

    createStep(stepname) {
        cy.step(stepname);
    }

    createSession(sessionId, setUpFunkce) {
        cy.session(sessionId, setUpFunkce)
    }

}

module.exports = new GeneralLib();