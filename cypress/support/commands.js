// IMPORTA A BIBLIOTECA FAKER JS
import { faker } from '@faker-js/faker'

// REALIZA ANTES DE QUALQUER AÇÃO A CRIAÇÃO DE UM NOME ALEATÓRIO, UM E-MAIL ALEATÓRIO E UMA SENHA ALEATÓRIA
beforeEach(() => {
    let nome = faker.name.fullName()
    Cypress.env('nome', nome)

    let email = faker.internet.email()
    Cypress.env('email', email)

    let senha = faker.internet.password(5)
    Cypress.env('senha', senha)
})

// CRIA O COMANDO PERSONALIZADO "NOVA CONTA"
Cypress.Commands.add('NovaConta', () => {

    // CLICA NO BOTÃO "ABRIR MINHA CONTA"
    cy.get('[data-test="botao-cadastro"]')
        .click()

    // INSERE O NOME ALEATÓRIO
    cy.get('[data-test="nome-input"]')
        .type(Cypress.env('nome'))

    // INSERE O E-MAIL ALEATÓRIO
    cy.get('[data-test="email-input"]')
        .type(Cypress.env('email'))

    // INSERE A SENHA ALEATÓRIA
    cy.get('[data-test="senha-input"]')
        .type(Cypress.env('senha'))

    // MARCA O CHECKBOX
    cy.get('[data-test="checkbox-input"]')
        .check()

    // CLICA NO BOTÃO "CRIAR CONTA"
    cy.get('[data-test="botao-enviar"]')
        .click()

    // VALIDA SE A MENSAGEM DE ALERTA ESTÁ VISÍVEL E POSSUI O TEXTO "USUÁRIO CADASTRADO COM SUCESSO"
    cy.get('[data-test="mensagem-sucesso"]')
        .should('be.visible')
        .should('have.text', 'Usuário cadastrado com sucesso!')
})

// CRIA O COMANDO PERSONALIZADO "NOVA CONTA API"
Cypress.Commands.add('NovaContaAPI', () => {

    /* REALIZA UMA REQUISIÇÃO POST PARA A URL "/CADASTRO" PASSANDO O NOME ALEATÓRIO QUE CONSTA NA ENV, 
    E-MAIL ALEATÓRIO QUE CONSTA NA ENV E SENHA ALEATÓRIA QUE CONSTA NA ENV*/
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

// CRIA O COMANDO PERSONALIZADO "LOGIN API"
Cypress.Commands.add('LoginAPI', () => {

    // REALIZA UMA REQUISIÇÃO POST PARA A URL "/LOGIN" PASSANDDO O E-MAIL ALEATÓRIO  QUE CONSTA NA ENV E A SENHA ALEATÓRIA QUE CONSTA NA ENV
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/public/login',
        body: {
            email: Cypress.env('email'),
            senha: Cypress.env('senha')
        }
    })
})