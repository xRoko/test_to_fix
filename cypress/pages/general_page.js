class GeneralPage {

    inputEmail = () => cy.get('[data-test="get_trial_email"]');
    btnTryLogin = () => cy.get('[data-test="get_trial"]');
    btnMyAccount = () => cy.get('[data-test="my_account"]');

    btnReports = () => cy.get('.navbar-navigation__item').contains('Reporty');

}

module.exports = new GeneralPage();

