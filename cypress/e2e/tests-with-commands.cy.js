/// <reference types="cypress" />

describe ('Testes funcionais com comandos personalizados - Login', () => {
    
    beforeEach(() => {
        cy.visit('/')   // insert a baseUrl and beforeEach
        cy.title().should('be.equal', 'React App')
    })
    it('CT001.1 - Fazer login com dados validos', () => {
       cy.login(Cypress.env('email'), Cypress.env('senha'))
       cy.apareceMensagem('Bem vindo,')
    })
    it('CT001.2 - Fazer login com email invalido', () => {
       cy.login('marcelo@', Cypress.env('senha'))
       cy.apareceMensagem('Error')
    })
    it('CT001.3 - Fazer login com senha invalida', () => {
       cy.login(Cypress.env('email'), 'sen3')
       cy.apareceMensagem('Error')
    })
    it('CT001.4 -  Fazer login com campo email e senha vazio', () => {
       cy.get('.btn').click()
       cy.apareceMensagem('!')
    })
})

describe('Testes funcionais com comandos personalizados - Conta',() => {
    beforeEach(()=>{
        cy.visit('/')
        cy.title().should('be.equal', 'React App')
        cy.login(Cypress.env('email'), Cypress.env('senha'))
        cy.resetar()

    })
    it('CT002.1 - Inserir uma conta', () => {
        cy.menuContas()
        cy.campoContas('Conta CT002.1')
        cy.get('.btn').click()
        cy.apareceMensagem('Conta inserida com sucesso!')
    })
    it('CT002.2 - Alterar nome da conta', () => {
        cy.menuContas()
        cy.btnEditarConta('Conta para alterar').click()
        cy.campoContas('CT002').clear()
        cy.campoContas('CT002.2')
        cy.get('.btn').click()
        //cy.btnClick()
        cy.apareceMensagem('Conta atualizada com sucesso!')
    })
    it('CT002.3 - Inserir conta com mesmo nome', () => {
        cy.menuContas()
        cy.campoContas('Conta mesmo nome')
        cy.get('.btn').click()
        //cy.btnClick()
        cy.apareceMensagem('Error')
    })
    it('CT002.4 - Excluir conta', () => {
        cy.menuContas()
        cy.btnExcluirConta('Conta para alterar').click()
        cy.apareceMensagem('Conta excluída com sucesso!')
    })
    it('CT003.1 - Inserir movimentação', () => {
        cy.inserirMoviment('descricao CT003', 'interessado', 10)
        cy.apareceMensagem('Movimentação inserida com sucesso!')
    })
    it('CT003.2 - Excluir movimentacao', () => {
        cy.excluirMoviment('Movimentacao para exclusao')
        cy.apareceMensagem('Movimentação removida com sucesso!')
    })
    it('CT003.3 - Editar movimentacao', () => {
        cy.editarMoviment('Movimentacao para extrato')
        cy.apareceMensagem('Movimentação alterada com sucesso!')
    })
    it('CT004.1 - Fazer logout', () =>  {
        cy.logout()
        cy.apareceMensagem('Até Logo!')
    })
    it('CT004.2 - Fazer reset', () => {
        cy.resetar()
        cy.apareceMensagem('Dados resetados com sucesso!')
    })
})
