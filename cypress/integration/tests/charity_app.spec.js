/* eslint-disable no-undef */
describe('Charity', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Lahjoitukset yhteensä')
    cy.contains('Kohdentamattomat varat')
  })

  it('assign form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Kohdenna varoja').click()
  })

  it('user can assign funds', function() {
    cy.contains('Kohdenna varoja').click()
    cy.get('#project-name').click()
    cy.get('li:first').click()
    cy.get('#amount').type('100')
    cy.get('#assign').click()

    cy.contains('Palauta varat')
  })
})