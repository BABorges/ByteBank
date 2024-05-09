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

        // ACESSA A URL "/SERVICOS"
        cy.visit('/home/servicos')
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

        // VALIDA SE A 3ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "SERVIÇOS", COR VERDE E LINK PARA A URL "/HOME/SERVICOS"
        cy.get('#root > div > main > nav > div:nth-child(3) > a')
            .should('have.text', 'Serviços')
            .should('have.css', 'color', 'rgb(71, 161, 56)')
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

        // VALIDA SE NA SEÇÃO INFERIOR POSSUI 6 OPÇÕES
        cy.get('main > div > section:nth-child(2) > div:nth-child(2)')
            .children().should('have.length', 6)
            .should('be.visible')

        // VALIDA SE A 1ª OPÇÃO ESTA VISÍVEL, POSSUI O ENDEREÇO CORRETO DA IMAGEM E POSSUI O TEXTO "EMPRESTIMO"
        cy.get('main > div > section:nth-child(2) > div:nth-child(2) > div:nth-child(1)')
            .should('be.visible')
            .should('have.text', 'Empréstimo')
            .find('img')
            .should('have.attr', 'src', '/imagens/icones/emprestimo.svg')

        // VALIDA SE A 2ª OPÇÃO ESTA VISÍVEL, POSSUI O ENDEREÇO CORRETO DA IMAGEM E POSSUI O TEXTO "MEUS CARTÕES"
        cy.get('main > div > section:nth-child(2) > div:nth-child(2) > div:nth-child(2)')
            .should('be.visible')
            .should('have.text', 'Meus cartões')
            .find('img')
            .should('have.attr', 'src', '/imagens/icones/cartao.svg')

        // VALIDA SE A 3ª OPÇÃO ESTA VISÍVEL, POSSUI O ENDEREÇO CORRETO DA IMAGEM E POSSUI O TEXTO "DOAÇÕES"
        cy.get('main > div > section:nth-child(2) > div:nth-child(2) > div:nth-child(3)')
            .should('be.visible')
            .should('have.text', 'Doações')
            .find('img')
            .should('have.attr', 'src', '/imagens/icones/doacao.svg')

        // VALIDA SE A 4ª OPÇÃO ESTA VISÍVEL, POSSUI O ENDEREÇO CORRETO DA IMAGEM E POSSUI O TEXTO "PIX"
        cy.get('main > div > section:nth-child(2) > div:nth-child(2) > div:nth-child(4)')
            .should('be.visible')
            .should('have.text', 'Pix')
            .find('img')
            .should('have.attr', 'src', '/imagens/icones/pix.svg')

        // VALIDA SE A 5ª OPÇÃO ESTA VISÍVEL, POSSUI O ENDEREÇO CORRETO DA IMAGEM E POSSUI O TEXTO "SEGUROS"
        cy.get('main > div > section:nth-child(2) > div:nth-child(2) > div:nth-child(5)')
            .should('be.visible')
            .should('have.text', 'Seguros')
            .find('img')
            .should('have.attr', 'src', '/imagens/icones/seguro.svg')

        // VALIDA SE A 4ª OPÇÃO ESTA VISÍVEL, POSSUI O ENDEREÇO CORRETO DA IMAGEM E POSSUI O TEXTO "RECARGA CELULAR"
        cy.get('main > div > section:nth-child(2) > div:nth-child(2) > div:nth-child(6)')
            .should('be.visible')
            .should('have.text', 'Recarga celular')
            .find('img')
            .should('have.attr', 'src', '/imagens/icones/recarga.svg')
    })
})