let localStorageBackup = {};

before(() => {
    cy.login();
    // Espera a que la página de usuarios se cargue completamente
    cy.get('.q-page-container', { timeout: 10000 }).should('be.visible'); // Selector más general
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

describe('Realizar seguimiento del pedido', () => {
    beforeEach(() => {
        cy.visit('https://web-stilnovo.dev2.macamedia.com.ar/?#/configuracion/usuarios');
        cy.window().then((win) => {
            Object.keys(localStorageBackup).forEach((key) => {
                win.localStorage.setItem(key, localStorageBackup[key]);
            });
        });
    });

    it('Debería permitir realizar seguimiento del pedido', () => {
        // Primero se configura el usuario con el primer Rol
        cy.wait(750);
        cy.get('.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-center.row')
            .find('i.q-icon.eva.eva-edit-outline')
            .click();
        cy.wait(750);
        cy.get('.q-field.row.no-wrap.items-start.q-field--borderless.q-select.q-field--auto-height.q-select--without-input.q-select--without-chips.q-select--single.q-field--float.q-field--labeled.q-field--dense.text')
            .eq(1)
            .click();
        cy.wait(750);
        cy.get('.q-virtual-scroll__content .q-item__label').eq(0).click({ force: true }); // Selecciona el primer elemento de la lista
        cy.wait(750);
        cy.get('.block').contains('Guardar').click();
        cy.wait(750);

        // Visitar la página de seguimiento de pedidos
        cy.visit('https://web-stilnovo.dev2.macamedia.com.ar/?#/seguimiento');
        cy.wait(750);        
    });    
});