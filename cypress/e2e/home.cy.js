/// <reference types="cypress"/>

describe('Valida funcionalidades da Home', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it.only('Valida tela do Home', () => {
        cy.NovaContaAPI()
    })
})