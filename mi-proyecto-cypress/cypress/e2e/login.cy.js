describe('Automatización de login', () => {
    beforeEach(() => {
        // Visitar la página web antes de cada prueba
        cy.visit('https://web-stilnovo.dev2.macamedia.com.ar/?#/login');
    });

    it('Ingreso de credenciales de login y verificación exitosa', () => {
        // Parámetros de login
        const credenciales = {
            username: 'superadmin1@yopmail.com',
            password: '1234'
        };

        cy.get('[placeholder="E-mail"]').clear().type(credenciales.username);
        cy.get('[placeholder="Contraseña"]').clear().type(credenciales.password);
        cy.get('button[type="button"]:contains("Ingresar")').click();

        cy.url().should('eq', 'https://web-stilnovo.dev2.macamedia.com.ar/?#/');
    });
});