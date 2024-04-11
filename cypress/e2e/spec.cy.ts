describe('template spec', () => {
    beforeEach(()=> {
        let email = 'Ozymandias@test.ru';
        let password = 'kingofkings';
    })

    it('passes', () => {


        const email = 'Ozymandias@test.ru';
        const password = 'kingofkings';


        cy.visit('/');
        // cy.get('[data-testid=list_bun_elem]:first').click();
        cy.get('[data-testid=nav_button_profile]').click();
        cy.wait(2000);
        cy.get('[data-testid=login_page_input_email]').type(`${email}`)
        cy.get('[data-testid=login_page_input_email]').type(`${password}`)
        cy.get('[data-testid=login_page_button_submit]').click();
        cy.intercept('GET', 'me', 'me.json');
        cy.wait(3000);
        cy.get('[data-testid=nav_button_main]').click();
        cy.intercept('POST', 'signin',{fixture: "login.json"}).as('postLogin');
        // cy.wait(3000);
        // cy.get('[data-testid=constructor_page_button_checkout]');
    })
})

// cy.intercept('GET', 'cards',{fixture: "card.json"});
// cy.intercept('GET', 'me',{fixture: "login.json"});
// cy.intercept('POST', 'signin',{fixture: "login.json"}).as('postLogin');

// it('passes', () => {
//   cy.visit('/');
//   cy.get('[data-testid=header_feed_link').click();
//   cy.get('p').should('have.text', 'Сегодня');
// })