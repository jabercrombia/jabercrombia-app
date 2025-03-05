describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
   
      // Find a link with an href attribute containing "web" and click it
      cy.get('nav a[href*="web"]').click()
   
      // The new url should include "/web"
      cy.url().should('include', '/web')
   
      // The new page should contain an h1 with "Web"
      cy.get('h1').contains('web')
    })
  })