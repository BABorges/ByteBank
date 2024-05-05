import { faker } from '@faker-js/faker'
beforeEach(() => {
    let nome = faker.name.fullName()
    Cypress.env('nome', nome)

    let email = faker.internet.email()
    Cypress.env('email', email)

    let senha = faker.internet.password(5)
    Cypress.env('senha', senha)
})



Cypress.Commands.add('NovaConta', () => {
    cy.get('[data-test="botao-cadastro"]')
        .click()
    cy.get('[data-test="nome-input"]')
        .type(Cypress.env('nome'))
    cy.get('[data-test="email-input"]')
        .type(Cypress.env('email'))
    cy.get('[data-test="senha-input"]')
        .type(Cypress.env('senha'))
    cy.get('[data-test="checkbox-input"]')
        .check()
        / cy.get('[data-test="botao-enviar"]')
            .click()
    cy.get('[data-test="mensagem-sucesso"]')
        .should('be.visible')
        .should('have.text', 'Usuário cadastrado com sucesso!')
})

Cypress.Commands.add('NovaContaAPI', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/public/cadastrar',
        body: {
            nome: Cypress.env('nome'),
            email: Cypress.env('email'),
            senha: Cypress.env('senha')
        }
    })
})

Cypress.Commands.add('LoginAPI', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/public/login',
        body: {
            email: Cypress.env('email'),
            senha: Cypress.env('senha')
        }
    })
})