/// <reference types="cypress"/>

// IMPORTA A BIBLIOTECA FAKER JS PARA GERAÇÃO DE DADOS ALEATÓRIOS
import { faker } from '@faker-js/faker'

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

        // ACESSA A URL "/HOME"
        cy.visit('/home')
    })

    it('Valida tela do Home', () => {

        // VALIDA SE O MENU LATERAL ESQUERDO CONTEM 4 OPÇÕES E SE ESTÃO VISÍVEIS
        cy.get('#root > div > main > nav')
            .children().should('have.length', 4)
            .should('be.visible')

        // VALIDA SE A 1ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "INÍCIO", COR VERDE E LINK PARA A URL "/HOME"
        cy.get('#root > div > main > nav > div:nth-child(1) > a')
            .should('have.text', 'Início')
            .should('have.css', 'color', 'rgb(71, 161, 56)')
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

        // VALIDA SE A 4ª OPÇÃO DO MENU LATERAL ESQUEDO TEM O TEXTO "INVESTIMENTOS", COR PRETO E LINK PARA A URL "/HOME/INVESTIMENTOS"
        cy.get('#root > div > main > nav > div:nth-child(4) > a')
            .should('have.text', 'Investimentos')
            .should('have.css', 'color', 'rgb(17, 17, 17)')
            .should('have.attr', 'href', '/home/investimentos')

        // CHAMA O COMANDO PERSONALIZADO "VALIDA EXTRATO"
        cy.ValidaExtrato()

        // CHAMA O COMANDO PERSONALIZADO "VALIDA SEÇÃO SUPERIOR"
        cy.ValidaSeçãoSuperior()

        // VALIDA SE NA SEÇÃO INFERIOR CONSTA O TEXTO "NOVA TRANSAÇÃO" E SE ESTA VISÍVEL
        cy.get('form > div:nth-child(1) > h3')
            .should('be.visible')
            .should('have.text', 'Nova Transação')

        // VALIDA SE O COMBOBOX POSSUI O TEXTO "SELECIONE UM TIPO DE TRANSAÇÃO", SE ESTA VISÍVEL E HABILITADO
        cy.get('[data-test="select-opcoes"]')
            .should('be.visible')
            .should('be.enabled')
            .should('have.value', 'Selecione um tipo de transação')
            .children('option')

            // VALIDA SE O COMBOBOX POSSUI AS OPÇÕES "DEPÓSITO" E "TRANSFERÊNCIA"
            .each(($option) => {
                let opcao = $option.text().trim()
                expect(opcao).to.satisfy((texto) => {
                    return texto === 'Selecione um tipo de transação' ||
                        texto === 'Depósito' ||
                        texto === 'Transferência';
                });
            })

        // VALIDA SE CONSTA O TEXTO "VALOR" E SE ESTA VISÍVEL
        cy.get('form > div > label')
            .should('be.visible')
            .should('have.text', 'Valor')

        // VALIDA SE O INPUT ESTA VISÍVEL, VAZIO E POSSUI O PLACEHOLDER COM O TEXTO "DIGITE UM VALOR"
        cy.get('[data-test="form-input"]')
            .should('be.visible')
            .should('be.empty')
            .should('have.attr', 'placeholder', 'Digite um valor')

        // VALIDA SE O BOTÃO ESTA VISÍVEL, HABILITADO E POSSUI O TEXTO "REALIZAR TRANSAÇÃO"
        cy.get('[data-test="realiza-transacao"]')
            .should('be.visible')
            .should('be.enabled')
            .should('have.text', 'Realizar transação')

    })

    it('Valida nova transação realizada', () => {

        // GUARDA O ARRAY CONTENDO "DEPÓSITO" E "TRANSFERÊNCIA" EM UMA VARIÁVEL
        let transacoes = ['Depósito', 'Transferência'];

        // FUNÇÃO PARA REALIZAR A TRANSAÇÃO
        function executarTransacoes() {
            transacoes.forEach(transacao => {

                // SELECIONA UMA OPÇÃO DO ARRAY
                cy.get('[data-test="select-opcoes"]')
                    .select(transacao);

                let valor

                // SE A OPÇÃO DO ARRAY FOR "DEPÓSITO" GERA UM VALOR ENTRE 1 E 9999
                if (transacao === 'Depósito') {
                    valor = faker.number.float({ min: 1, max: 9999 }).toFixed(2);

                    // SE A OPÇÃO DO ARRAY FOR "TRANSFERÊNCIA" GERA UM VALOR ENTRE 1 E 999
                } else {
                    valor = faker.number.float({ min: 1, max: 999 }).toFixed(2);
                }

                // INSERE O VALOR GERADO
                cy.get('[data-test="form-input"]')
                    .type(valor);

                // CLICA NO BOTÃO "REALZIAR TRANSAÇÃO"
                cy.get('[data-test="realiza-transacao"]')
                    .click();

                // VALIDA ASE APÓS CLICAR NO BOTÃO O CAMPO FICOU VAZIO
                cy.get('[data-test="form-input"]')
                    .should('be.empty');

                // PEGA A ÚLTIMA TRASANÇÃO DO EXTRATO
                cy.get('#root > div > main > section > ul > li').last().then($li => {

                    // LOCALIZA O ÚLTIMO MÊS NA LISTA E GUARDA EM UMA ENV
                    cy.wrap($li).find('p').eq(0)
                        .then(($mes) => {
                           Cypress.env("mesTransacao", $mes.text())
                        });

                    // LOCALIZA O ÚLTIMO TIPO NA LISTA E GUARDA EM UMA ENV
                    cy.wrap($li).find('[data-testid="tipoTransacao"]')
                        .then(($tipo) => {
                            Cypress.env("tipoTransacao", $tipo.text())
                        });

                    // LOCALIZA A ÚLTIMA DATA NA LISTA E GUARDA EM UMA ENV
                    cy.wrap($li).find('span').eq(0)
                        .then(($data) => {
                            Cypress.env("dataTransacao", $data.text())
                        });

                    // LOCALIZA O ÚLTIMO VALOR NA LISTA E GUARDA EM UMA ENV
                    cy.wrap($li).find('[data-testid="valorTransacao"]')
                        .then(($valor) => {
                            let textoValor = $valor.text();
                            let matchValor = textoValor.match(/\d+.\d+/);
                            let valor = parseFloat(matchValor[0])
                            let valorFormatado = valor.toFixed(2)
                            Cypress.env("valorTransacao", valorFormatado);
                        })

                    // REALIZA UMA REQUISIÇÃO GET PARA A URL "/SALDO"
                    cy.request({
                        method: 'GET',
                        url: 'http://localhost:8000/transacoes',
                    }).then((response) => {

                        // VALIDA O ÚLTIMO DADO DO BODY E GUARDA EM UMA VARIÁVEL
                        const ultimoItem = response.body[response.body.length - 1];

                        // VALIDA A DATA DOO ÚLTIMO DADO DO BODY E GUARDA EM UMA VARIÁVEL
                        let dataTransacaoAPI = ultimoItem.data;

                        // VALIDA O MÊS DO ÚLTIMO DADO DO BODY E GUARDA EM UMA VARIÁVEL
                        let mesTransacaoAPI = ultimoItem.mes;

                        // VALIDA O TIPO DO ÚLTIMO DADO DO BODY E GUARDA EM UMA VARIÁVEL
                        let tipoTransacaoAPI = ultimoItem.transacao;

                        // VALIDA O VALOR DO ÚLTIMO DADO DO BODY E GUARDA EM UMA VARIÁVEL
                        let valorTransacaoAPI = ultimoItem.valor;

                        // VALIDAR SE O VALOR DO ÚLTIMO ITEM DO EXTRATO É IGUAL AO VALOR DO ÚLTIMO ITEM DO BODY
                        expect(Cypress.env("valorTransacao")).to.eq(valorTransacaoAPI);
                        
                        // VALIDAR SE A DATA DO ÚLTIMO ITEM DO EXTRATO É IGUAL A DATA DO ÚLTIMO ITEM DO BODY
                        expect(Cypress.env("dataTransacao")).to.eq(dataTransacaoAPI);

                        // VALIDAR SE O TIPO DO ÚLTIMO ITEM DO EXTRATO É IGUAL AO TIPO DO ÚLTIMO ITEM DO BODY
                        expect(Cypress.env("tipoTransacao")).to.eq(tipoTransacaoAPI);

                        // VALIDAR SE O MÊS DO ÚLTIMO ITEM DO EXTRATO É IGUAL AO MÊS DO ÚLTIMO ITEM DO BODY
                        expect(Cypress.env("mesTransacao")).to.eq(mesTransacaoAPI);
                    });
                });
            })
        }

        // CHAMA A FUNÇÃO "EXECUTAR TRANSACAO"
        executarTransacoes()
    })
})
