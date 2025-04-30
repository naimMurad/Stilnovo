Cypress.Commands.add('login', () => {
    cy.log('Ejecutando comando: login');

    const credenciales = {
        username: 'superadmin1@yopmail.com', // Reemplaza con el usuario deseado
        password: '1234'
    };

    cy.visit('https://web-stilnovo.dev2.macamedia.com.ar/?#/login');
    cy.wait(1000);

    cy.get('[placeholder="E-mail"]').clear();
    cy.get('[placeholder="Contraseña"]').clear();

    cy.get('[placeholder="E-mail"]').type(credenciales.username);
    cy.get('[placeholder="Contraseña"]').type(credenciales.password);
    cy.wait(1000);
    cy.get('button[type="button"]:contains("Ingresar")').click();

    cy.log('Comando: login completado');
});