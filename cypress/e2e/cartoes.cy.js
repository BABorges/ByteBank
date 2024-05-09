/// <reference types="cypress"/>

describe('Valida funcionalidades da Home', () => {

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

        // ACESSA A URL "/CARTOES"
        cy.visit('/home/cartoes')
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

        // VALIDA SE A 2ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "CARTÕES", COR VERDE E LINK PARA A URL "/HOME/CARTOES"
        cy.get('#root > div > main > nav > div:nth-child(2) > a')
            .should('have.text', 'Cartões')
            .should('have.css', 'color', 'rgb(71, 161, 56)')
            .should('have.attr', 'href', '/home/cartoes')

        // VALIDA SE A 3ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "SERVIÇOS", COR PRETO E LINK PARA A URL "/HOME/SERVICOS"
        cy.get('#root > div > main > nav > div:nth-child(3) > a')
            .should('have.text', 'Serviços')
            .should('have.css', 'color', 'rgb(17, 17, 17)')
            .should('have.attr', 'href', '/home/servicos')

        // VALIDA SE A 4ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "INVESTIMENTOS", COR PRETO E LINK PARA A URL "/HOME/INVESTIMENTOS"
        cy.get('#root > div > main > nav > div:nth-child(4) > a')
            .should('have.text', 'Investimentos')
            .should('have.css', 'color', 'rgb(17, 17, 17)')
            .should('have.attr', 'href', '/home/investimentos')

        // CHAMA O COMANDO PERSONALIZADO "VALIDA EXTRATO"
        cy.ValidaExtrato()

        // CHAMA O COMANDO PERSONALIZADO "VALIDA SEÇÃO SUPERIOR"
        cy.ValidaSeçãoSuperior()

        // VALIDA SE NA SEÇÃO INFERIOR CONSTA O TEXTO "MEUS CARTÕES" E SE ESTA VISÍVEL
        cy.get('[data-test="titulo-cartoes"]')
            .should('be.visible')
            .should('have.text', 'Meus cartões')

        // VALIDA SE O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "CARTÃO FÍSICO"
        cy.get('section > div > p:nth-child(2)')
            .should('be.visible')
            .should('have.text', 'Cartão físico')

        // VALIDA SE HÁ A IMAGEM DO CARTÃO FÍSICO ESTÁ VISÍVEL E SE POSSUI O ENDEREÇO CORRETO DA IMAGEM
        cy.get('section > div > :nth-child(3) > img')
            .should('be.visible')
            .should('have.attr', 'src', '/static/media/fisico.e4d87359ddde72deebc0154e71dfd679.svg')

        // VALIDA SE O BOTÃO ESTÁ VISÍVEL, POSSUI O TEXTO "CONFIGURAR" E POSSUI A COR VERDE
        cy.get('section > div > :nth-child(3) > div > button:nth-child(1)')
            .should('be.visible')
            .should('have.text', 'Configurar')
            .should('have.css', 'background-color', 'rgb(71, 161, 56)')

        // VALIDA SEO BOTÃO ESTá VISÍVEL, POSSUI O TEXTO "BLOQUEAR", E SE É TRANSPARENTE COM A BORDA VERMELHA
        cy.get('section > div > :nth-child(3) > div > button:nth-child(2)')
            .should('be.visible')
            .should('have.text', 'Bloquear')
            .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
            .should('have.css', 'border', '2px solid rgb(191, 19, 19)')

        // VALIDA SE O TÍTULO ESTÁ VISÍVEL E SE POSSUI O TEXTO "FUNÇÃO: DÉBITO/CRÉDITO"
        cy.get('section > div > :nth-child(3) > div > span')
            .should('be.visible')
            .should('have.text', 'Função: Débito/Crédito')

        // VALIDA SE O TÍTULO ESTÁ VISÍVEL E POSSUI O TEXTO "CARTÃO DIGITAL"
        cy.get('section > div > p:nth-child(4)')
            .should('be.visible')
            .should('have.text', 'Cartão digital')

        // VALIDA SE HÁ A IMAGEM DO CARTÃO DIGITAL ESTÁ VISÍVEL E SE POSSUI O ENDEREÇO CORRETO DA IMAGEM
        cy.get('section > div > :nth-child(5) > img')
            .should('be.visible')
            .should('have.attr', 'src', '/static/media/digital.b7d8e69dff234d11b8a8cad4a349ae10.svg')

        // VALIDA SE O BOTÃO ESTÁ VISÍVEL, POSSUI O TEXTO "CONFIGURAR" E POSSUI A COR VERDE
        cy.get('section > div > :nth-child(5) > div > button:nth-child(1)')
            .should('be.visible')
            .should('have.text', 'Configurar')
            .should('have.css', 'background-color', 'rgb(71, 161, 56)')

        // VALIDA SEO BOTÃO ESTá VISÍVEL, POSSUI O TEXTO "BLOQUEAR", E SE É TRANSPARENTE COM A BORDA VERMELHA
        cy.get('section > div > :nth-child(5) > div > button:nth-child(2)')
            .should('be.visible')
            .should('have.text', 'Bloquear')
            .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
            .should('have.css', 'border', '2px solid rgb(191, 19, 19)')

        // VALIDA SE O TÍTULO ESTÁ VISÍVEL E SE POSSUI O TEXTO "FUNÇÃO: DÉBITO"
        cy.get('section > div > :nth-child(5) > div > span')
            .should('be.visible')
            .should('have.text', 'Função: Débito')
    })
})