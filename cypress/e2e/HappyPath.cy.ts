describe('Happy path spec', () => {
    const email = 'Ozymandias@test.ru';
    const password = 'KingOfKings';
    const refreshToken = 'c0b273a35d15575e5c6a186f93d5ed062d983da4b73b5d983da4b73b5ddddddddddddddc1b182b61';
    const accessToken = 'Bearer eyJhbGciOi9.eyJpZCI6IjY1ZGIxYzBhOTdlZGUwMDAxZDA1ZTJkNiIsImlhdCI6MTJIUzI1NiIsInR5cCI6IkpXVCJcxMjkyOTM4NiwiZXhwIjoxNzEyOTMwNTg2fQ.ri3hsvktHSOd9n3yLdh-j5pJV6TqRKaYZwXrp4r-UUg';

    // --------------- BEFORE EACH ---------------

    beforeEach(() => {
        cy.visit('/');
        cy.intercept('GET', 'ingredients', {fixture: 'ingredients.json'});
    });


    // --------------- SHOW INGREDIENTS ---------------

    // it('should show ingredients', () => {
    //     cy.visit('/');
    //     cy.get('[data-testid=ingredient_item]').should('exist');
    //     cy.get('[data-testid=ingredients_group_bun] > div > a').should('have.length', 2);
    //     cy.get('[data-testid=ingredients_group_sauce] > div > a').should('have.length', 4);
    //     cy.get('[data-testid=ingredients_group_main] > div > a').should('have.length', 9);
    // })


    // --------------- SHOULD LOGIN AND ASSEMBLE BURGER ---------------

    it('should assemble order', () => {
        const dataTransfer = new DataTransfer();
        const randomBun = Math.round(Math.random());
        const randomSauce = Math.round(Math.random() * 3);
        const randomMain = Math.round(Math.random() * 8);

        // --------------- LOGIN
        cy.get('[data-testid=nav_button_profile]').click();
        cy.get('[data-testid=login_page_input_email]').type(`${email}`);
        cy.get('[data-testid=login_page_input_password]').type(`${password}`);
        cy.get('[data-testid=login_page_button_submit]').click();
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {fixture: 'userData.json'}).as('authUser');

        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify(refreshToken)
        )

        window.localStorage.setItem(
            'accessToken',
            JSON.stringify(accessToken)
        )

        cy.log(window.localStorage.getItem('accessToken'));

        cy.visit('/');
        // --------------- ADD BUN
        cy.get(`[data-testid=ingredient_item]`).eq(randomBun).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list]>div:first-child').trigger('drop', {
            data: dataTransfer,
        })
        // --------------- ADD SAUCE
        cy.get('[data-testid=scroll_area]').scrollTo(0, 350);
        cy.get('[data-testid=ingredients_group_sauce]>div>a').eq(randomSauce).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list]>div:nth-child(2)').trigger('drop', {
            data: dataTransfer,
        });
        // --------------- ADD MAIN
        cy.get('[data-testid=scroll_area]').scrollTo(0, 350);
        cy.get('[data-testid=ingredients_group_main]>div>a').eq(randomMain).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list]>div:nth-child(2)').trigger('drop', {
            data: dataTransfer,
        });

        // --------------- ACCEPT ORDER
        cy.get('[data-testid=constructor_button_checkout]').click();

        cy.wait(4000);

        cy.get('body').type('{esc}');
        cy.get('[data-testid=nav_button_feed]').click();
    })


    // --------------- SHOULD SHOW FEED ---------------

    // it('should visit feed', () => {
    //     cy.get('[data-testid=nav_button_feed]').click();
    //     cy.get('[data-testid="section_feed"]').should('exist');
    //     cy.wait(5000)
    // });
    //
    //
    // // --------------- SHOULD SHOW LOGIN ERRORS ---------------
    //
    // it('should show email error', () => {
    //     cy.visit('/#/profile');
    //     cy.get('[data-testid=login_page_input_email]').type('test@.ry');
    //     cy.get('[data-testid=login_page_button_submit]').click();
    //     cy.get('[data-testid=login_page_error_email]').should('exist');
    // })
    //
    // it('should show password error', () => {
    //     cy.visit('/#/profile');
    //     cy.get('[data-testid=login_page_input_email]').type(`${email}`);
    //     cy.get('[data-testid=login_page_input_password]').type('44444');
    //     cy.get('[data-testid=login_page_button_submit]').click();
    //     cy.get('[data-testid=login_page_error_password]').should('exist');
    // })


    // --------------- AFTER EACH  ---------------

    // afterEach(function () {
    //     cy.clearLocalStorage();
    // })
})