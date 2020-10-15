describe('Forms App'), () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')  
    })

    const nameInput = () => cy.get('input[name="name"]')
    const emailInput = () => cy.get('input[email="email"]')
    const passInput = () =>cy.get('input[password="password"]')


    it('Type!!', () => {
        nameInput()
            .should('have.value', '')
            .type('Ramsha')
            .should('have.value', 'Ramsha')
        emailInput()
            .should('have.value', '')
            .type('ramsha@gmail.com')
            .should('have.value', 'ramsha@gmail.com')
        passInput()
        .should('have.value', '')
            .type('R6769Sha')
            .should('have.value', 'R6769Sha')
        
    })
}