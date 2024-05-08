/// <reference types="cypress"/>

describe('Valida funcionalidades do login', () => {

  beforeEach(() => {

    // ACESSA ANTES DE QUALQUER AÇÃO A URL "/"
    cy.visit('/')
  })

  it('Valida layout da tela de login', () => {

    // VALIDA SE O LOGO "BYTEBANK" ESTÁ VISÍVEL
    cy.get('#root > div > header > div > svg')
      .should('be.visible')

    // VALIDA SE O BOTÃO TEM O TEXTO "ABRIR MINHA CONTA" E ESTÁ VISÍVEL  
    cy.get('[data-test="botao-cadastro"]')
      .should('be.visible')
      .should('have.text', 'Abrir minha conta')

    // VALIDA SE O BOTÃO TEM O TEXTO "JÁ TENHO CONTA" E E ESTA VISÍVEL  
    cy.get('[data-test="botao-login"]')
      .should('be.visible')
      .should('have.text', 'Já tenho conta')

    // VALIDA SE O BANNER POSSUI O TEXTO "EXPERIMENTE MAIS LIBERDADE NO CONTROLE DA SUA VIDA FINANCEIRA. CRIE SUA CONTA COM A GENTE" E SE ESTA VISÍVEL  
    cy.get('[data-test="titulo-principal"]')
      .should('be.visible')
      .should('have.text', 'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!')
  })

  it('Valida layout da tela de abertura de conta', () => {

    // CLICA NO BOTÃO "ABRIR MINHA CONTA"
    cy.get('[data-test="botao-cadastro"]')
      .click()


    // VALIDA SE A IMAGEM DA MODAL ACIMA DO TEXTO "PREENCHA OS CAMPOS ABAIXO PARA CRIAR SUA CONTA CORRENTE" ESTÁ VISÍVEL
    cy.get('#root > div > header > div > div > div.ModalCadastroUsuario_janela__modal__vjP8I > div > img')
      .should('be.visible')

    // VALIDA SE O TÍTULO POSSUI O TEXTO "NOME" E SE ESTÁ VISÍVEL
    cy.get('[for="nome"]')
      .should('be.visible')
      .should('have.text', 'Nome')

    // VALIDA SE O IMPUT ESTÁ VISÍVEL, VAZIO E POSSUI O PLACEHOLDER "DIGITE SEU NOME COMPLETO"  
    cy.get('[data-test="nome-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite seu nome completo')

    // VALIDA SE O TÍTULO POSSUI O TEXTO "E-MAIL" E SE ESTÁ VISÍVEL
    cy.get('[for="email"]')
      .should('be.visible')
      .should('have.text', 'E-mail')

    // VALIDA SE O IMPUT ESTÁ VISÍVEL, VAZIO E POSSUI O PLACEHOLDER "DIGITE SEU EMAIL" 
    cy.get('[data-test="email-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite seu email')

    // VALIDA SE O TÍTULO POSSUI O TEXTO "SENHA" E SE ESTÁ VISÍVEL
    cy.get('[for="senha"]')
      .should('be.visible')
      .should('have.text', 'Senha')

    // VALIDA SE O IMPUT ESTÁ VISÍVEL, VAZIO E POSSUI O PLACEHOLDER "DIGITE SUA SENHA" 
    cy.get('[data-test="senha-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite sua senha')

    // VALIDA SE O CHECKBOX ESTÁ VISÍVEL E DESMARCADO
    cy.get('[data-test="checkbox-input"]')
      .should('be.visible')
      .should('not.be.checked')

    /* VALIDA SE O CHECKBOX POSSUI O TEXTO "LI E ESTOU CIENTE QUANTO ÀS CONDIÇÕES DE TRATAMENTO DOS MEUS DADOS CONFORME DESCRITO NA POLÍTICA DE 
    PRIVACIADDE DO BANCO" E SE ESTÁ VISÍVEL*/
    cy.get('#root > div > header > div > div > div.ModalCadastroUsuario_janela__modal__vjP8I > div > form > div > p')
      .should('be.visible')
      .should('have.text', 'Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.')

    // VALIDA SE O BOTÃO ESTÃO VISÍVEL E POSSUI O TEXTO "CRIAR CONTA"
    cy.get('[data-test="botao-enviar"]')
      .should('be.visible')
      .should('have.text', 'Criar conta')
  })

  it('Valida campos obrigatórios', () => {

    // CLICA NO BOTÃO "ABRIR MINHA CONTA"
    cy.get('[data-test="botao-cadastro"]')
      .click()

    // CLICA NO BOTÃO "CRIAR CONTA"
    cy.get('[data-test="botao-enviar"]')
      .click()

    // VALIDA SE A MENSAGEM DE ALERTA ESTÁ VISÍVEL E POSSUI O TEXTO "O CAMPO SENHA É OBRIGATÓRIO"
    cy.get('[data-test="mensagem-erro"]')
      .should('be.visible')
      .should('have.text', 'O campo de senha é obrigatório')

    // PREENCHE O CAMPO SENHA COM A INFORMAÇÃO "123"
    cy.get('[data-test="senha-input"]')
      .type('123')

    // CLICA NO BOTÃO "CRIAR CONTA"
    cy.get('[data-test="botao-enviar"]')
      .click()

    // VALIDA SE A MENSAGEM DE ALERTA ESTÁ VISÍVEL E POSSUI O TEXTO "O CAMPO EMAIL É OBRIGATÓRIO"
    cy.get('[data-test="mensagem-erro"]')
      .should('be.visible')
      .should('have.text', 'O campo email é obrigatório')

    // PREENCHE O CAMPO E-MAIL COM A INFORMAÇÃO "TESTE@TESTE.COM"
    cy.get('[data-test="email-input"]')
      .type('teste@teste.com')

    // CLICA NO BOTÃO "CRIAR CONTA"
    cy.get('[data-test="botao-enviar"]')
      .click()

    // VALIDA SE A MENSAGEM DE ALERTA ESTÁ VISÍVEL E POSSUI O TEXTO "O CAMPO NOME É OBRIGATÓRIO"
    cy.get('[data-test="mensagem-erro"]')
      .should('be.visible')
      .should('have.text', 'O campo de nome é obrigatório')

    // PREENCHE O CAMPO NOME COM A INFORMAÇÃO "TESTE CYPRESS"
    cy.get('[data-test="nome-input"]')
      .type('Teste Cypress')

    // MARCA O CHECKBOX
    cy.get('[data-test="checkbox-input"]')
      .check()

    // CLICA NO BOTÃO "CRIAR CONTA"
    cy.get('[data-test="botao-enviar"]')
      .click()

    // VALIDA SE A MENSAGEM DE ALERTA ESTÁ VISÍVEL E POSSUI O TEXTO "E-MAIL JÁ CADASTRADO"
    cy.get('[data-test="mensagem-erro"]')
      .should('be.visible')
      .should('have.text', 'E-mail já cadastrado!')
  })

  it('Valida criação de nova conta', () => {

    // CHAMA O COMANDO PERSONALIZADO "NOVA CONTA"
    cy.NovaConta()
  })

  it('Valida layout da tela de login', () => {

    // CLICA NO BOTÃO "JÁ TENHO CONTA"
    cy.get('[data-test="botao-login"]')
      .click()

    // VALIDA SE A IMAGEM DA MODAL ACIMA DO TÍTULO "LOGIN" ESTÁ VISÍVEL
    cy.get('#root > div > header > div > div > div.ModalLoginUsuario_janela__modal__Pq4Q7 > div > img')
      .should('be.visible')

    // VALIDA SE O TÍTULO POSSUI O TEXTO "E-MAIL" E SE ESTÁ VISÍVEL
    cy.get('[for="email"]')
      .should('be.visible')
      .should('have.text', 'E-mail')

    // VALIDA SE O IMPUT ESTÁ VISÍVEL, VAZIO E POSSUI O PLACEHOLDER "DIGITE SEU EMAIL"
    cy.get('[data-test="email-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite seu email')

    // VALIDA SE O TÍTULO POSSUI O TEXTO "SENHA" E SE ESTÁ VISÍVEL
    cy.get('[for="senha"]')
      .should('be.visible')
      .should('have.text', 'Senha')

    // VALIDA SE O IMPUT ESTÁ VISÍVEL, VAZIO E POSSUI O PLACEHOLDER "DIGITE SUA SENHA"
    cy.get('[data-test="senha-input"]')
      .should('be.visible')
      .should('be.empty')
      .should('have.attr', 'placeholder', 'Digite sua senha')

    // VALIDA SE O BOTÃO ESTÁ VISÍVEL E POSSUI O TEXTO "ACESSAR"
    cy.get('[data-test="botao-enviar"]')
      .should('be.visible')
      .should('have.text', 'Acessar')

    // VALIDA SE O LINK ABAIXO DO BOTÃO ESTÁ VISÍVEL E POSSUI O TEXTO "ESQUECI MIHA SENHA"
    cy.get('a')
      .should('be.visible')
      .should('have.text', 'Esqueci minha senha!')
  })

  it('Valida login do usuário no sistema', () => {

    // CHAMA O COMANDO PERSONALIZADO NOVA CONTA API
    cy.NovaContaAPI()
    
    // CLICA NO BOTÃO "JÁ TENHO CONTA"
    cy.get('[data-test="botao-login"]')
      .click()

    // INSERE O E-MAIL ALEATÓRIO CRIADO QUE CONSTA NA ENV
    cy.get('[data-test="email-input"]')
      .type(Cypress.env('email'))

    // INSERE A SENHA ALEATÓRIA CRIADA QUE CONSTA NA ENV
    cy.get('[data-test="senha-input"]')
      .type(Cypress.env('senha'))

    // INTERCEPTA A REQUISIÇÃO POST REALIZADA PARA A URL "/LOGIN"
    cy.intercept('POST', 'http://localhost:8000/public/login').as('login')

    // CLICA NO BOTÃO "ACESSAR"
    cy.get('[data-test="botao-enviar"]')
      .click()

    // AGUARDA O RETORNO DA REQUISIÇÃO DO TIPO XHR
    cy.wait('@login').then((xhr) => {

      // VALIDA SE O STATUS CODE É 200
      expect(xhr.response.statusCode).to.be.eq(200)

      // VALIDA QUE O USER DO BODY POSSUI A PROPRIEDADE "EMAIL"
      expect(xhr.response.body.user).has.property('email')

      // VALIDA QUE O EMAIL DO BODY É IGUAL AO EMAIL ALEATÓRIO QUE CONSTA NA ENV
      expect(xhr.response.body.user.email).to.be.equal(Cypress.env('email'))

      // VALIDA QUE O USER ID DO BODY POSSUI A PROPRIEDADE "ID"
      expect(xhr.response.body.user).has.property('id')

      // VALIDA QUE O USER ID DO BODY NÃO É NULO
      expect(xhr.response.body.user.id).is.not.null

      // VALIDA QUE O USER DO BODY POSSUI A PROPRIEDADE "NOME"
      expect(xhr.response.body.user).has.property('nome')

      // VALIDA QUE O NOME DO BODY É IGUAL AO NOME ALEATÓRIO QUE CONSTA NA ENV
      expect(xhr.response.body.user.nome).to.be.equal(Cypress.env('nome'))
    })

    // VALIDA QUE O NOME EXIBIDO NO HEADER ESTA VISÍVEL, É O NOME ALEATÓRIO QUE CONSTA NA ENV E POSSUI ANTES A INFORMAÇÃO "OLÁ, "
    cy.get('#root > div > header > div > div > div.Cabecalho_usuario__info__ZlLAe > p')
      .should('be.visible')
      .should('have.text', 'Olá, ' + Cypress.env('nome'))
  })

  it('Valida login do usuário no sistema via API', () => {

    // CHAMA O COMANDO PERSONALIZADO "NOVA CONTA API"
    cy.NovaContaAPI()

    // CHAMA O COMANDO PERSONALIZADO "LOGIN API"
    cy.LoginAPI()

    // ACESSA A URL "/HOME"
    cy.visit('/home')

    // VALIDA SE NA SEÇÃO SUPERIOR CONSTA O TEXTO "BEM VINDO DE VOLTA!" E SE ESTÁ VISÍVEL
    cy.get('h1')
      .should('be.visible')
      .should('have.text', 'Bem vindo de volta!')
  })
})