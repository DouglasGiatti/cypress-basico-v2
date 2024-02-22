/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatorios e envia o formulario', function() {
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Giatti')
    cy.get('#email').type('douglas_giatti@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    })
    
    it('Este texto ira exibir uma mensagem de erro ao submeter o formulario com um email com formatacao invalida', function() {
        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Giatti')
        cy.get('#email').type('douglas_giatti@hotmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        
        })
        
        it('campo telefone continua vazio quando preenchido com valor nao numerico', function() {
        cy.get('#phone').type('Douglas')
        cy.get('#phone').should('have.value', '')
        })
        
        it('exibe mensagem de erro quando o telefone se torna obrigatorio mas nao e preenchido antes do envio do formmulario', function() {
        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Giatti')
        cy.get('#email').type('douglas_giatti@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
        
        })
        
        it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Douglas')
        .should('have.value', 'Douglas')
        .clear()
        .should('have.value', '')
        
        cy.get('#lastName')
        .type('Giatti')
        .should('have.value', 'Giatti')
        .clear()
        .should('have.value', '')
        
        cy.get('#email')
        .type('douglas_giatti@hotmail.com')
        .should('have.value', 'douglas_giatti@hotmail.com')
        .clear()
        .should('have.value', '')
        
        cy.get('#phone')
        .type('940334478')
        .should('have.value', '940334478')
        .clear()
        .should('have.value', '')
        
        cy.get('#open-text-area')
        .type('Teste')
        .should('have.value', 'Teste')
        .clear()
        .should('have.value', '')
        
        })
        
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        })
        
        it('envia o formulario com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error').should('be.visible')
        })
        
        
        it('seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
        })
        
        it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
        
        })
        
        it('seleciona um produto (Blog) por seu indice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
        
        })
        
        it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
        })
        
        it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
        
        })
        
        })
        
        it('marca ambos checkboxes, depois desmarca o ultimo', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .uncheck()
        .last()
        .should('not.be.checked')
        })
        it('seleciona um arquivo da pasta fixtures', function() {
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')

              }) 
              
        })

        it('seleciona um arquivo simulando um drag-and-drop', function() {
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')

              }) 
        })
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
          cy.fixture('example.json').as('sampleFile')
          cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')

              }) 

        })

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('Talking About Testing').should('be.visible')
})
    
})

  
