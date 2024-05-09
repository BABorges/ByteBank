/// <reference types="cypress"/>

describe('Valida funcionalidades da Serviços', () => {

    // REALIZA ANTES DE QUALQUER AÇÃO UMA REQUISIÇÃO POST PARA A URL "/LOGIN" PASSANDO E-MAIL E SENHA DE ACESSO
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/public/login',
            body: {
                email: 'cypress@teste.com',
                senha: '123'
            }
        })

        // ACESSA A URL "/INVESTIMENTOS"
        cy.visit('/home/investimentos')
    })

    it('Valida tela do Cartões', () => {

        // VALIDA SE O MENU LATERAL ESQUERDO CONTEM 4 OPÇÕES E SE ESTÃO VISÍVEIS
         cy.get('#root > div > main > nav')
             .children().should('have.length', 4)
             .should('be.visible')
 
         // VALIDA SE A 1ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "INÍCIO", COR PRETO E LINK PARA A URL "/HOME"
         cy.get('#root > div > main > nav > div:nth-child(1) > a')
             .should('have.text', 'Início')
             .should('have.css', 'color', 'rgb(17, 17, 17)')
             .should('have.attr', 'href', '/home')
 
         // VALIDA SE A 2ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "CARTÕES", COR PRETO E LINK PARA A URL "/HOME/CARTOES"
         cy.get('#root > div > main > nav > div:nth-child(2) > a')
             .should('have.text', 'Cartões')
             .should('have.css', 'color', 'rgb(17, 17, 17)')
             .should('have.attr', 'href', '/home/cartoes')
 
         // VALIDA SE A 3ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "SERVIÇOS", COR PRETO E LINK PARA A URL "/HOME/SERVICOS"
         cy.get('#root > div > main > nav > div:nth-child(3) > a')
             .should('have.text', 'Serviços')
             .should('have.css', 'color', 'rgb(17, 17, 17)')
             .should('have.attr', 'href', '/home/servicos')
 
         // VALIDA SE A 4ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "INVESTIMENTOS", COR VERDE E LINK PARA A URL "/HOME/INVESTIMENTOS"
         cy.get('#root > div > main > nav > div:nth-child(4) > a')
             .should('have.text', 'Investimentos')
             .should('have.css', 'color', 'rgb(71, 161, 56)')
             .should('have.attr', 'href', '/home/investimentos')
 
         // CHAMA O COMANDO PERSONALIZADO "VALIDA EXTRATO"
         cy.ValidaExtrato()
 
         // CHAMA O COMANDO PERSONALIZADO "VALIDA SEÇÃO SUPERIOR"
         cy.ValidaSeçãoSuperior()

        // VALIDA SE NA SEÇÃO INFERIOR O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "INVESTIMENTOS"
        cy.get('main > div > section > div > div > h2')
            .should('be.visible')
            .should('have.text', 'Investimentos')

        // VALIDA SE POSSUI O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "TOTAL: R$ 1.000.000,00"
        cy.get('main > div > section:nth-child(2) > div > div > p')
            .should('be.visible')
            .should('have.text', 'Total: R$ 1.000.000,00')

        // VALIDA SE POSSUI O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "RENDA FIXA"
        cy.get('main > div > section:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > p')
            .should('be.visible')
            .should('have.text', 'Renda Fixa')

        // VALIDA SE POSSUI O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "R$ 300.000,00"
        cy.get('main > div > section:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > h3')
            .should('be.visible')
            .should('have.text', 'R$ 300.000,00')

        // VALIDA SE POSSUI O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "RENDA VARIÁVEL"
        cy.get('main > div > section:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > p')
            .should('be.visible')
            .should('have.text', 'Renda variável')

        // VALIDA SE POSSUI O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "R$ 700.000,00"
        cy.get('main > div > section:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > h3')
            .should('be.visible')
            .should('have.text', 'R$ 700.000,00')

        // VALIDA SE NA SEÇÃO INFERIOR O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "ESTATÍSTICAS"
        cy.get('main > div > section:nth-child(2) > div > h3')
            .should('be.visible')
            .should('have.text', 'Estatísticas')

        // VALIDA SE A IMAGEM DAS ESTATÍSTICAS ESTA VISÍVEL E POSSUI O ENDEREÇO CORRETO
        cy.get('main > div > section:nth-child(2) > div > div:nth-child(4')
            .should('be.visible')
            .find('img')
            .should('have.attr', 'src', '/static/media/grafico.71e275945c3ba6b669ce4a041561acb1.svg')
    })
})