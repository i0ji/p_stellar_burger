require('cypress/typescript-support');

describe('service is available', function() {
    it('should be online', function() {
        cy.visit('http://localhost:5137');
    });
});