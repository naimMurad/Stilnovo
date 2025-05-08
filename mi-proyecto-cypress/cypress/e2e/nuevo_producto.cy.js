let localStorageBackup = {};

before(() => {
    cy.login();
    // Espera a que la página de productos se cargue completamente
    cy.get('.q-page-container', { timeout: 10000 }).should('be.visible'); // Selector más general
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

describe('Nuevo producto', () => {
    beforeEach(() => {
        cy.visit('https://web-stilnovo.dev2.macamedia.com.ar/?#/productos');
        cy.window().then((win) => {
            Object.keys(localStorageBackup).forEach((key) => {
                win.localStorage.setItem(key, localStorageBackup[key]);
            });
        });
    });

    it('Debería permitir cargar un nuevo producto', () => {
        // Hacer clic en el botón para agregar un nuevo producto
        cy.wait(750);
        cy.get('i.q-icon.eva.eva-plus-outline').click();
        cy.wait(750);
        const randomNumber = Math.floor(1000 + Math.random() * 9000) // Genera un número aleatorio de 4 dígitos
            .toString()
            .split('')
            .join('.'); // Agrega puntos entre cada dígito
        cy.get('[placeholder="Ej: 1324"]').type(randomNumber.toString()).should('have.value', randomNumber.toString());
        cy.wait(750);
        const randomText = `Producto de Prueba de Automatización ${Math.floor(100 + Math.random() * 900)}`; // Genera un texto con un número aleatorio de 3 dígitos
        cy.get('[placeholder="Ej: Silla Tokyo"]').type(randomText).should('have.value', randomText);
        cy.wait(750);
        const randomText2 = 'Descripción de Producto de prueba de Automatización'; // Texto fijo sin número aleatorio
        cy.get('[placeholder="Ej: Silla ergonómica postural reclinable con apoyacabezas, apoyo lumbar y brazos regulablesSoporta hasta 150 kg"]').type(randomText2).should('have.value', randomText2);
        cy.wait(750);
        const randomText3 = Math.floor(10 + Math.random() * 90).toString(); // Genera un número aleatorio de 2 dígitos
        cy.get('[placeholder="Ej: 10"]').type(randomText3).should('have.value', randomText3);
        cy.wait(750);
        cy.get('.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-center.row')
            .contains('Guardar')
            .click();
        cy.wait(750);
        cy.get('.q-field__native[placeholder="Buscar"]').type(`${randomText}{enter}`);
        cy.wait(750);
        cy.get('tr').contains('td.q-td.text-left', randomNumber).parent('tr').within(() => {
            cy.get('td.q-td.text-right')
            .find('i.q-icon.eva.eva-settings-outline')
            .click();
        });
        cy.wait(750);
        cy.get('.container-areas').find('.q-checkbox__indet').each(($checkbox, index) => {
            if (index < 5) {
            cy.wrap($checkbox).click({ force: true });
            }
        });
        cy.wait(750);  
        cy.get('.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-center.row')
            .contains('Siguiente')
            .click();
        cy.wait(750);       
        // Selecciona la primera opción de la lista
        cy.contains('i', 'keyboard_arrow_down').eq(0).click(); // Hacer clic en el primer desplegable
        cy.wait(750);
        cy.contains('span', 'Materia prima').eq(1).click(); // Selecciona la opción "Materia prima"
        cy.wait(750);
        cy.get('input[aria-expanded="true"]').eq(0).click(); // Hacer clic en el primer desplegable
        cy.wait(750);
        cy.contains('span', 'Materia prima testing 1').click(); // Selecciona la opción "Materia prima testing 1"
        cy.wait(750);
        cy.get('label.q-field--float input').click().type('1');
        cy.wait(750);
        cy.contains('span', ' Agregar').eq(0).click(); // Hacer clic en el botón "Agregar" del primer desplegable
        cy.wait(750);
        cy.contains('span', 'Producto intermedio').eq(1).click(); // Selecciona la opción "Producto intermedio"
        cy.wait(750);
        cy.get('input[aria-expanded="true"]').eq(1).click(); // Hacer clic en el segundo desplegable
        cy.wait(750);
        cy.contains('span', 'Prod. Intermedio de prueba de automatización 1').click(); // Selecciona la opción "Prod. Intermedio de prueba de automatización 1"
        cy.wait(750);
        cy.get('label.q-field--focused input').eq(1).click().type('1'); // Hacer clic en el campo de cantidad del segundo desplegable
        cy.wait(750);
        cy.contains('span', ' Agregar').eq(0).click(); // Hacer clic en el botón "Agregar" del segundo desplegable
        cy.wait(750);
        cy.get('i.q-icon.eva.eva-chevron-down-outline.q-select__dropdown-icon').eq(0).click();
        cy.wait(750);
        // Selecciona la segunda opción de la lista
        cy.get('.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable')
            .contains('Soldado')
            .click();
        cy.wait(750);
        cy.get('.block').contains('Producto intermedio').click({ force: true });
        cy.wait(750);        
        cy.get('i.q-icon.eva.eva-chevron-down-outline.q-select__dropdown-icon').eq(1).click({ force: true });
        cy.wait(750);        
        cy.get('.q-item__label').contains('Prod. Intermedio de prueba de automatización 2').click();
        cy.wait(750);
                cy.get('.q-field__native[placeholder="0"]').eq(1)
                    .click()
                    .type('1');
        cy.wait(750);
        cy.get('.q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--rectangle.q-btn--actionable.q-focusable.q-hoverable.boton-principal')
            .contains('Agregar')
            .click();
        cy.wait(750);
        // Selecciona la tercera opción de la lista
        cy.get('.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable')
            .contains('Cocinado')
            .click();
        cy.wait(750);    
        cy.get('.block').contains('Producto intermedio').click({ force: true });
        cy.wait(750);        
        cy.get('i.q-icon.eva.eva-chevron-down-outline.q-select__dropdown-icon').eq(2).click({ force: true });
        cy.wait(750);        
        cy.get('.q-item__label').contains('Prod. Intermedio de prueba de automatización 3').click();
        cy.wait(750);
                cy.get('.q-field__native[placeholder="0"]').eq(2)
                    .click()
                    .type('1');
        cy.wait(750);
        cy.get('.q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--rectangle.q-btn--actionable.q-focusable.q-hoverable.boton-principal')
            .contains('Agregar')
            .click();
        cy.wait(750);
        // Selecciona la cuarta opción de la lista
        cy.get('.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable')
            .contains('Carpintería')
            .click();
        cy.wait(750);
        cy.get('.block').contains('Producto intermedio').click({ force: true });
        cy.wait(750);        
        cy.get('i.q-icon.eva.eva-chevron-down-outline.q-select__dropdown-icon').eq(3).click({ force: true });
        cy.wait(750);        
        cy.get('.q-item__label').contains('Prod. Intermedio de prueba de automatización 4').click();
        cy.wait(750);
                cy.get('.q-field__native[placeholder="0"]').eq(3)
                    .click()
                    .type('1');
        cy.wait(750);
        cy.get('.q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--rectangle.q-btn--actionable.q-focusable.q-hoverable.boton-principal')
            .contains('Agregar')
            .click();
        cy.wait(750);
        // Selecciona la quinta opción de la lista
        cy.get('.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable')
            .contains('Ensamblado')
            .click();
        cy.wait(750);
        cy.get('.block').contains('Producto intermedio').click({ force: true });
        cy.wait(750);        
        cy.get('i.q-icon.eva.eva-chevron-down-outline.q-select__dropdown-icon').eq(4).click({ force: true });
        cy.wait(750);        
        cy.get('.q-item__label').contains('Prod. Intermedio de prueba de automatización 5').click();
        cy.wait(750);
                cy.get('.q-field__native[placeholder="0"]').eq(4)
                    .click()
                    .type('1');
        cy.wait(750);
        cy.get('.q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--rectangle.q-btn--actionable.q-focusable.q-hoverable.boton-principal')
            .contains('Agregar')
            .click();
        cy.wait(750);
        //Hacer clic en el botón "Siguiente"
        cy.get('.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-center.row')
            .contains('Siguiente')
            .click();
        cy.wait(750);
        // Hacer clic en el botón "Finalizar"
        cy.get('.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-center.row')
            .contains('Finalizar')
            .click();
    });
});