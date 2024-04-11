describe('template spec', () => {

    // const email = 'Ozymandias@test.ru';
    // const password = 'KingOfKings';

    beforeEach(() => {
        cy.intercept('GET', 'ingredients', {fixture: 'ingredients.json'}).as('getIngredients');
        cy.visit('/');
    });

    it('should load ingredients', () => {
        cy.get('[data-testid=ingredient_item]').should('exist');
    })


    // it('should login', () => {
    //     cy.get('[data-testid=nav_button_profile]').click();
    //     cy.get('[data-testid=login_page_input_email]').type(`${email}`);
    //     cy.get('[data-testid=login_page_input_password]').type(`${password}`);
    //     cy.get('[data-testid=login_page_button_submit]').click();
    //     cy.intercept('GET', 'me', {fixture: 'me.json'});
    //     cy.intercept('POST', 'signin', {fixture: "login.json"});
    //     cy.get('[data-testid=nav_button_profile]').click();
    //     cy.get('[data-testid=profile_section]').should('exist');
    //
    //
    //     window.localStorage.setItem(
    //         'refreshToken',
    //         JSON.stringify('test-refreshToken')
    //     );
    //     console.log('REFRESH TOKEN: ', localStorage.getItem('refreshToken'));
    // })


// it('should show email error', () => {
//     cy.visit('/#/profile');
//     cy.get('[data-testid=login_page_input_email]').type('test@.ry');
//     cy.get('[data-testid=login_page_button_submit]').click();
//     cy.get('[data-testid=login_page_error_email]').should('exist');
// })
//
// it('should show pwd error', () => {
//     cy.visit('/#/profile');
//     cy.get('[data-testid=login_page_input_email]').type(`${email}`);
//     cy.get('[data-testid=login_page_input_password]').type('44444');
//     cy.get('[data-testid=login_page_button_submit]').click();
//     cy.get('[data-testid=login_page_error_password]').should('exist');
// })


    afterEach(function () {
        cy.clearLocalStorage();
        cy.visit('/');
    })

})