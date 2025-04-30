let localStorageBackup = {};

before(() => {
    cy.login();
    // Espera a que la página de pedidos se cargue completamente
    cy.get('.q-page-container', { timeout: 10000 }).should('be.visible'); // Selector más general
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

describe('Hacer clic en botón precedido por "Pendientes"', () => {
    beforeEach(() => {
        cy.visit('https://web-stilnovo.dev2.macamedia.com.ar/?#/pedidos');
        cy.window().then((win) => {
            Object.keys(localStorageBackup).forEach((key) => {
                win.localStorage.setItem(key, localStorageBackup[key]);
            });
        });
    });    

    it('debería hacer clic en el botón Nuevo"', () => {
        //Una espera
        cy.wait(1000);
        cy.get('button .q-icon.eva.eva-plus-outline').click();
        cy.get('.text-bold.q-mb-sm').contains('Cliente *').parent().find('[aria-label="Buscar"][data-autofocus="true"]').type('Furth');
    });
});