Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Giatti')
    cy.get('#email').type('douglas_giatti@hotmail,com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
