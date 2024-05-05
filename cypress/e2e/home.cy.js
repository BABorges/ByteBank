/// <reference types="cypress"/>

describe('Valida funcionalidades da Home', () => {

    it.only('Valida tela do Home', () => {
        cy.NovaContaAPI()
        cy.LoginAPI()

        cy.visit('/home')

        cy.get('#root > div > main > nav')
            .children().should('have.length', 4)
            .should('be.visible')
        cy.get('#root > div > main > nav > div:nth-child(1) > a')
            .should('have.text', 'Início')
            .should('have.css', 'color', 'rgb(71, 161, 56)')
            .should('have.attr', 'href', '/home')
        cy.get('#root > div > main > nav > div:nth-child(2) > a')
            .should('have.text', 'Cartões')
            .should('have.css', 'color', 'rgb(17, 17, 17)')
            .should('have.attr', 'href', '/home/cartoes')
        cy.get('#root > div > main > nav > div:nth-child(3) > a')
            .should('have.text', 'Serviços')
            .should('have.css', 'color', 'rgb(17, 17, 17)')
            .should('have.attr', 'href', '/home/servicos')
        cy.get('#root > div > main > nav > div:nth-child(4) > a')
            .should('have.text', 'Investimentos')
            .should('have.css', 'color', 'rgb(17, 17, 17)')
            .should('have.attr', 'href', '/home/investimentos')

        cy.get('#root > div > main > section > h2')
            .should('be.visible')
            .should('have.text', 'Extrato')
            .should('have.css', 'font-weight', '800')

        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/transacoes',
        }).then((response) => {
            expect(response.status).to.equal(200)
            let transacoesAPI = response.body.length;
            Cypress.env('transacoesAPI', transacoesAPI)

            cy.get('[data-test="lista-transacoes"] > li')
                .then((transacoes) => {
                    let transacoesFront = transacoes.length
                    Cypress.env('transacoesFront', transacoesFront)
                    expect(Cypress.env('transacoesAPI')).to.be.equal(Cypress.env('transacoesFront'))
                })

            for (let i = 0; i < response.body.length; i++) {
                cy.get('#root > div > main > section > ul > li').eq([i]).each(($li) => {
                    cy.wrap($li).find('p').eq(0)
                        .then(($mes) => {
                            Cypress.env("mesTransacaoFront", $mes.text().trim())
                        })
                    cy.wrap($li).find('[data-testid="tipoTransacao"]')
                        .then(($tipo) => {
                            Cypress.env("tipoTransacaoFront", $tipo.text().trim())
                        })
                    cy.wrap($li).find('span').eq(0)
                        .then(($data) => {
                            Cypress.env("dataTransacaoFront", $data.text().trim())
                        })
                    cy.wrap($li).find('[data-testid="valorTransacao"]')
                        .then(($valor) => {
                            let textoValor = $valor.text();
                            let matchValor = textoValor.match(/\d+.\d+/);
                            console.log(matchValor)
                            let valor = parseFloat(matchValor[0])
                            let valorFormatado = valor.toFixed(2)
                            Cypress.env("valorTransacaoFront", valorFormatado);
                        })

                    cy.request({
                        method: 'GET',
                        url: 'http://localhost:8000/transacoes',
                    }).then((response) => {
                        let dataTransacaoAPI = response.body[i].data
                        let mesTransacaoAPI = response.body[i].mes
                        let tipoTransacaoAPI = response.body[i].transacao
                        let valorTransacaoAPI = response.body[i].valor
                        Cypress.env("dataTransacaoAPI", dataTransacaoAPI)
                        Cypress.env("mesTransacaoAPI", mesTransacaoAPI)
                        Cypress.env("tipoTransacaoAPI", tipoTransacaoAPI)
                        Cypress.env("valorTransacaoAPI", valorTransacaoAPI)

                        expect(Cypress.env('dataTransacaoAPI')).to.equal(Cypress.env('dataTransacaoFront'))
                        expect(Cypress.env('mesTransacaoAPI')).to.equal(Cypress.env('mesTransacaoFront'))
                        expect(Cypress.env('tipoTransacaoAPI')).to.equal(Cypress.env('tipoTransacaoFront'))
                        expect(Cypress.env('valorTransacaoAPI')).to.eq(Cypress.env('valorTransacaoFront'))

                        console.log(Cypress.env('valorTransacaoAPI'))
                        console.log(Cypress.env('valorTransacaoFront'))
                    })
                })
            }


        })
    })
})

