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

// CRIA COMANDO PERSONALIZADO "VALIDA EXTRATO"
Cypress.Commands.add('ValidaExtrato', () => {

    // VALIDA SE NA SEÇÃO DIREITA DO FRONT CONTÉM O TEXTO "EXTRAT0", EM NEGRITO E SE ESTA VISÍVEL
    cy.get('#root > div > main > section > h2')
        .should('be.visible')
        .should('have.text', 'Extrato')
        .should('have.css', 'font-weight', '800')

    // REALIZA UMA REQUISIÇÃO GET PARA A URL "/TRANSACOES" VALIDANDO SE O STATUS CODE É 200 E GUARDANDO EM UMA ENV O TAMANHO DO BODY
    cy.request({
        method: 'GET',
        url: 'http://localhost:8000/transacoes',
    }).then((response) => {
        expect(response.status).to.equal(200)
        let transacoesAPI = response.body.length;
        Cypress.env('transacoesAPI', transacoesAPI)

        // GUARDA EM UMA ENV O TAMANHO DA LISTA DA SEÇÃO DIREITA DO FRONT E COMPARA COM O TAMANHO DO BODY 
        cy.get('[data-test="lista-transacoes"] > li')
            .then((transacoes) => {
                let transacoesFront = transacoes.length
                Cypress.env('transacoesFront', transacoesFront)
                expect(Cypress.env('transacoesAPI')).to.be.equal(Cypress.env('transacoesFront'))
            })

        // LAÇO DE REPETIÇÃO QUE VALIDA O TAMANHO DO BODY PARA EXECUTAR
        for (let i = 0; i < response.body.length; i++) {
            cy.get('#root > div > main > section > ul > li').eq([i]).each(($li) => {

                // LOCALIZA O MÊS NA LISTA E GUARDA EM UMA ENV
                cy.wrap($li).find('p').eq(0)
                    .then(($mes) => {
                        Cypress.env("mesTransacaoFront", $mes.text().trim())
                    })

                // LOCALIZA O TIPO NA LISTA E GUARDA EM UMA ENV
                cy.wrap($li).find('[data-testid="tipoTransacao"]')
                    .then(($tipo) => {
                        Cypress.env("tipoTransacaoFront", $tipo.text().trim())
                    })

                // LOCALIZA A DATA NA LISTA E GUARDA EM UMA ENV
                cy.wrap($li).find('span').eq(0)
                    .then(($data) => {
                        Cypress.env("dataTransacaoFront", $data.text().trim())
                    })

                // LOCALIZA O VALOR NA LISTA E GUARDA EM UMA ENV
                cy.wrap($li).find('[data-testid="valorTransacao"]')
                    .then(($valor) => {
                        let textoValor = $valor.text();
                        let matchValor = textoValor.match(/\d+.\d+/);
                        let valor = parseFloat(matchValor[0])
                        let valorFormatado = valor.toFixed(2)
                        Cypress.env("valorTransacaoFront", valorFormatado);
                    })

                // REALIZA UMA REQUISIÇÃO GET PARA A URL "/TRANSACOES"
                cy.request({
                    method: 'GET',
                    url: 'http://localhost:8000/transacoes',
                }).then((response) => {

                    // GUARDA A DATA DO BODY EM UMA ENV
                    let dataTransacaoAPI = response.body[i].data
                    Cypress.env("dataTransacaoAPI", dataTransacaoAPI)

                    // GUARDA O MÊS DO BODY EM UMA ENV
                    let mesTransacaoAPI = response.body[i].mes
                    Cypress.env("mesTransacaoAPI", mesTransacaoAPI)

                    // GUARDA O TIPO DO BODY EM UMA ENV
                    let tipoTransacaoAPI = response.body[i].transacao
                    Cypress.env("tipoTransacaoAPI", tipoTransacaoAPI)

                    // GUARDA O VALOR DO BODY EM UMA ENV
                    let valorTransacaoAPI = response.body[i].valor
                    Cypress.env("valorTransacaoAPI", valorTransacaoAPI)

                    // COMPARA SE A DATA DO BODY É IGUAL A DATA DA LISTA
                    expect(Cypress.env('dataTransacaoAPI')).to.equal(Cypress.env('dataTransacaoFront'))

                    // COMPARA SE O MÊS DO BODY É IGUAL AO MÊS DA LISTA
                    expect(Cypress.env('mesTransacaoAPI')).to.equal(Cypress.env('mesTransacaoFront'))

                    // COMPARA SE O TIPO DO BODY É IGUAL AO TIPO DA LISTA
                    expect(Cypress.env('tipoTransacaoAPI')).to.equal(Cypress.env('tipoTransacaoFront'))

                    // COMPARA SE O VALOR DO BODY É IGUAL AO VALOR DA LISTA
                    expect(Cypress.env('valorTransacaoAPI')).to.eq(Cypress.env('valorTransacaoFront'))
                })
            })
        }
    })
})

// CRIA COMANDO PERSONALIZADO "VALIDA SEÇÃO SUPERIOR"
Cypress.Commands.add('ValidaSeçãoSuperior', () => {

    // VALIDA SE NA SEÇÃO SUPERIOR CONSTA O TEXTO "BEM VINDO DE VOLTA!" E SE ESTÁ VISÍVEL
    cy.get('h1')
        .should('have.text', 'Bem vindo de volta!')
        .should('be.visible')

    // FUNÇÃO PARA OBTER O DIA DA SEMANA E DATA ATUAL
    function obterDataAtual() {
        let dataAtual = new Date();
        let diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        let diaDaSemana = diasDaSemana[dataAtual.getDay()];
        let dia = String(dataAtual.getDate()).padStart(2, '0');
        let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        let ano = dataAtual.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
        return `${diaDaSemana}, ${dataFormatada}`;
    }

    // VALIDA SE O DIA DA SEMANA E DATA ESTA VISÍVEL E É IGUAL A ATUAL
    cy.get('[data-testid="data-atual"]')
        .should('be.visible')
        .invoke('text')
        .then((texto) => {
            expect(texto.trim()).to.equal(obterDataAtual());
        });

    // REALIZA UMA REQUISIÇÃO GET PARA A URL "/SALDO"
    cy.request({
        method: 'GET',
        url: 'http://localhost:8000/saldo'
    }).then((response) => {

        // GUARDA O VALOR DO BODY EM UMA VARIÁVEL
        let saldoAPI = response.body.valor

        // AGUARDA 1 SEGUNDO PARA CONTINUAR
        cy.wait(1000)

        // VALIDA SE O SALDO ESTA VISÍVEL
        cy.get('[data-testid="saldo"]')
            .should('be.visible')
            .invoke('text')
            .then((saldo) => {

                // GUARDA SOMENTE O FLOAT DO SALDO EM UMA VARIÁVEL
                let saldoFront = parseInt(saldo.match(/\d+/)[0]);

                // VALIDA SE O SALDO É IGUAL AO SALDO DO BODY
                expect(saldoFront).to.equal(saldoAPI)
            })
    })
})