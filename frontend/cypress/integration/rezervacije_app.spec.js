	
describe('Rezervacije aplikacija', () => {
    it('naslovna stranica se otvara', () => {
      cy.visit('http://localhost:3000')
      cy.contains('Hairdresser salon - online booking')
      cy.contains('"Beauty"')
    })
  })