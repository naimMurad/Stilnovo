let localStorageBackup = {};

before(() => {
    cy.login();
    // Espera a que la página de pedidos se cargue completamente
    cy.get('.q-page-container', { timeout: 10000 }).should('be.visible'); // Selector más general
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

describe('Nuevo pedido', () => {
    beforeEach(() => {
        cy.visit('https://web-stilnovo.dev2.macamedia.com.ar/?#/pedidos');
        cy.window().then((win) => {
            Object.keys(localStorageBackup).forEach((key) => {
                win.localStorage.setItem(key, localStorageBackup[key]);
            });
        });
    });    

    it('Crear nuevo pedido', () => {
        cy.wait(750);
        cy.get('button .q-icon.eva.eva-plus-outline').click();
        cy.wait(750);
        cy.get('.text-bold.q-mb-sm').contains('Cliente *').parent().find('[aria-label="Buscar"][data-autofocus="true"]').click();
        cy.wait(750);
        cy.get('.q-menu .q-item').eq(1).click(); //  Mejorar este selector si es posible
        cy.wait(750);
        const randomNumber = Math.floor(100000 + Math.random() * 900000); // Genera un número aleatorio de 6 dígitos
        cy.get('[placeholder="Ej: 00000288"]').type(randomNumber.toString()).should('have.value', randomNumber.toString());
        cy.wait(750);
        cy.get('[placeholder="DD/MM/AAAA"]').type('10/01/2001').should('have.value', '10/01/2001');
        cy.wait(750);
        cy.get('.text-bold.q-mb-sm').contains('Prioridad *').parent().find('[aria-label="Seleccionar"]').click();
        cy.wait(750);
        cy.get('.q-menu .q-item').eq(0).click(); // Mejorar este selector si es posible
        cy.wait(750);
        cy.get('.q-mt-md.q-mb-md').find('.q-field__input.q-placeholder.col').click();
        cy.wait(750);
        cy.get('.q-menu .q-item').eq(0).click();
        cy.wait(750);
        cy.get('input.q-field__native.q-placeholder[placeholder="Cantidad"][type="number"]').type('5').should('have.value', '5');
        cy.wait(750);
        cy.get('button .q-icon.eva.eva-plus-outline').eq(1).click();
        cy.wait(750);
        cy.get('.q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--rectangle.q-btn--actionable.q-focusable.q-hoverable.boton-principal').click();
    });
});