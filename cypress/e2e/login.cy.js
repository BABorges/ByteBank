/// <reference types="cypress"/>

describe('Valida funcionalidades do login', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Valida layout da tela de login', () => {
    cy.get('#root > div > header > div > svg')
      .should('be.visible')
    cy.get('[data-test="botao-cadastro"]')
      .should('be.visible')
      .should('have.text', 'Abrir minha conta')
    cy.get('[data-test="botao-login"]')
      .should('be.visible')
      .should('have.text', 'Já tenho conta')
    cy.get('[data-test="titulo-principal"]')
      .should('be.visible')
      .should('have.text', 'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!')
  })

  it('Valida layout da tela de abertura de conta', () => {
    cy.get('[data-test="botao-cadastro"]')
      .click()

    cy.get('#root > div > header > div > div > div.ModalCadastroUsuario_janela__modal__vjP8I > div > img')
      .should('be.visible')

    cy.get('[for="nome"]')
      .should('be.visible')
      .should('have.text', 'Nome')
    cy.get('[data-test="nome-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite seu nome completo')

    cy.get('[for="email"]')
      .should('be.visible')
      .should('have.text', 'E-mail')
    cy.get('[data-test="email-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite seu email')

    cy.get('[for="senha"]')
      .should('be.visible')
      .should('have.text', 'Senha')
    cy.get('[data-test="senha-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite sua senha')

    cy.get('[data-test="checkbox-input"]')
      .should('be.visible')
      .should('not.be.checked')
    cy.get('#root > div > header > div > div > div.ModalCadastroUsuario_janela__modal__vjP8I > div > form > div > p')
      .should('be.visible')
      .should('have.text', 'Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.')

    cy.get('[data-test="botao-enviar"]')
      .should('be.visible')
      .should('have.text', 'Criar conta')
  })

  it('Valida campos obrigatórios', () => {
    cy.get('[data-test="botao-cadastro"]')
      .click()
    
    cy.get('[data-test="botao-enviar"]')
      .click()
    cy.get('[data-test="mensagem-erro"]')
      .should('be.visible')
      .should('have.text', 'O campo de senha é obrigatório')
    
    cy.get('[data-test="senha-input"]')
      .type('123')
    cy.get('[data-test="botao-enviar"]')
      .click()
    cy.get('[data-test="mensagem-erro"]')
      .should('be.visible')
      .should('have.text', 'O campo email é obrigatório')
    
    cy.get('[data-test="email-input"]')
      .type('teste@teste.com')
    cy.get('[data-test="botao-enviar"]')
      .click()
    cy.get('[data-test="mensagem-erro"]')
      .should('be.visible')
      .should('have.text', 'O campo de nome é obrigatório')
    
    cy.get('[data-test="nome-input"]')
      .type('Teste Cypress')
    cy.get('[data-test="checkbox-input"]')
      .check()
    cy.get('[data-test="botao-enviar"]')
      .click()
    cy.get('[data-test="mensagem-erro"]')
      .should('be.visible')
      .should('have.text', 'E-mail já cadastrado!')
  })

  it('Valida criação de nova conta', () => {
    cy.NovaConta()
  })
  
  it('Valida layout da tela de login', () => {
    cy.get('[data-test="botao-login"]')
      .click()
    cy.get('#root > div > header > div > div > div.ModalLoginUsuario_janela__modal__Pq4Q7 > div > img')
      .should('be.visible')
    cy.get('[for="email"]')
      .should('be.visible')
      .should('have.text', 'E-mail')
    cy.get('[data-test="email-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite seu email')
    cy.get('[for="senha"]')
      .should('be.visible')
      .should('have.text', 'Senha')
    cy.get('[data-test="senha-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite sua senha')
    cy.get('[data-test="botao-enviar"]')
      .should('be.visible')
      .should('have.text', 'Acessar')
    cy.get('a')
      .should('be.visible')
      .should('have.text', 'Esqueci minha senha!')
  })

  it('Valida login do usuário no sistema', () => {
    cy.NovaContaAPI()
    console.log(Cypress.env('email'))
    cy.get('[data-test="botao-login"]')
      .click()
    cy.get('[data-test="email-input"]')
      .type(Cypress.env('email'))
    cy.get('[data-test="senha-input"]')
      .type(Cypress.env('senha'))

    cy.intercept('POST', 'http://localhost:8000/public/login').as('login')

    cy.get('[data-test="botao-enviar"]')
      .click()

    cy.wait('@login').then((xhr) => {

      expect(xhr.response.statusCode).to.be.eq(200)
      expect(xhr.response.body.user).has.property('email')
      expect(xhr.response.body.user.email).to.be.equal(Cypress.env('email'))
      expect(xhr.response.body.user).has.property('id')
      expect(xhr.response.body.user.id).is.not.null
      expect(xhr.response.body.user).has.property('nome')
      expect(xhr.response.body.user.nome).to.be.equal(Cypress.env('nome'))
    })

    cy.get('#root > div > header > div > div > div.Cabecalho_usuario__info__ZlLAe > p')
      .should('be.visible')
      .should('have.text', 'Olá, ' + Cypress.env('nome'))
  })

})