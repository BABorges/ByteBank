/// <reference types="cypress"/>

describe('Validação no formato BDD', () => {

    it('Validar o login no formato BDD', () => {

        //DADO que acesso a tela de login
        cy.visit('/')

        //E clico no botão "Já tenho conta"
        cy.get('[data-test="botao-login"]').click()

        //QUANDO insiro as credenciais válidas de acesso
        cy.get('[data-test="email-input"]').type('cypress@teste.com')
        cy.get('[data-test="senha-input"]').type('123')

        //E clico no botão Acessar
        cy.get('[data-test="botao-enviar"]').click()

        //ENTÃO o sistema exibe o texto 'Bem vindo de volta!' na tela home
        cy.url().should('include', '/home')
        cy.contains('Bem vindo de volta!').should('be.visible')
    })
})