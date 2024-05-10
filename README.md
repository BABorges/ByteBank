# PASSO A PASSO DE EXECUÇÃO 

Projeto `ByteBank` para apresentação da discuplica Técnicas de verificação, Validação e Testes de Software do professor Guylerme Velasco.

Consta neste repositório o front, API e testes utilizando o Cypress.

## Subindo a API

Para subir a API do projeto, deve-se abrir um novo terminal:

### `ctrl + shift + '`

Na sequência deve-se executar o seguinte comando:

### `./run.bat`

Este comando executa a bat que irá acessar a pasta /api-bytebank e executar o comando **npm run start-api**

## Subindo o Front

Para subir o front do projeto, deve-se abrir um novo terminal:

### `ctrl + shift + '`

Na sequência deve-se executar o seguinte comando:

### `npm start`

## Executando o Cypress

Ao utilizar o Cypress você pode executar os testes de 2 formas, em Tempo Real, onde você visualiza na tela o teste sendo executados ou em modo Headless, onde você não vizualiza o teste acontecendo e sendo mais rápida sua execução.

### 1. Tempo Real

Para escolher qual teste do projeto deseja visualizar sua execução, deve-se abrir um novo terminal:

### `ctrl + shift + '`

Na sequência deve-se executar o seguinte comando:

### `npm run cypress`

Será aberta a tema do Cypess para você escolher o navegador e em seguida o teste a ser executado.

### 2. Modo Headless

Para escolher qual teste do projeto deseja visualizar sua execução, deve-se abrir um novo terminal:

### `ctrl + shift + '`

Neste modo você poderá executar todos os testes existentes executando o seguinte comando:

### `npx cypress run`

Ou executar um teste em específico executando o seguinte comando por exemplo:

### `npx cypress run --spec cypress/e2e/login.cy.js`

# FIM!