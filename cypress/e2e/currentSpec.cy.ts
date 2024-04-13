describe('Happy path spec', () => {

    beforeEach(() => {

        cy.intercept("GET", "api/auth/user", {fixture: "user.json"});
        cy.intercept("POST", "api/orders", {fixture: "order.json"}).as("postOrder");
        cy.visit('/');

        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );
        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-accessToken")
        );
    });


    //--------------- SHOW INGREDIENTS ---------------

//     it('should show ingredients', () => {
//         cy.visit('/');
//         cy.get('[data-testid=ingredient_item]').should('exist');
//         cy.get('[data-testid=ingredients_group_bun] > div > a').should('have.length', 2);
//         cy.get('[data-testid=ingredients_group_sauce] > div > a').should('have.length', 4);
//         cy.get('[data-testid=ingredients_group_main] > div > a').should('have.length', 9);
//     })


    // --------------- SHOULD ASSEMBLE BURGER ---------------

    it('should assemble order', () => {
        const dataTransfer = new DataTransfer();
        const randomQty = (number: number): number => {
            return Math.round(Math.random() * number);
        }


        // --------------- ADD BUN
        cy.get(`[data-testid=ingredient_item]`).eq(randomQty(1)).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list]>div:first-child').trigger('drop', {
            data: dataTransfer,
        });
        // --------------- ADD SAUCE
        cy.get('[data-testid=scroll_area]').scrollTo(0, 350);
        cy.get('[data-testid=ingredients_group_sauce]>div>a').eq(randomQty(3)).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list]>div:nth-child(2)').trigger('drop', {
            data: dataTransfer,
        });
        // --------------- ADD MAIN
        cy.get('[data-testid=scroll_area]').scrollTo(0, 350);
        cy.get('[data-testid=ingredients_group_main]>div>a').eq(randomQty(8)).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list]>div:nth-child(2)').trigger('drop', {
            data: dataTransfer,
        });
        cy.get('[data-testid=ingredients_group_main]>div>a').eq(randomQty(8)).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list]>div:nth-child(2)').trigger('drop', {
            data: dataTransfer,
        });
        cy.get('[data-testid=ingredients_group_main]>div>a').eq(randomQty(8)).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list]>div:nth-child(2)').trigger('drop', {
            data: dataTransfer,
        });
        // --------------- REORDER INGREDIENTS
        cy.get('[data-testid=constructor_list_item]').should("have.length", 4);
        cy.get('[data-testid=constructor_list_item]').eq(3).trigger('dragstart', {
            dataTransfer
        });
        cy.get('[data-testid=constructor_list_item]').eq(0).trigger('drop', {
            data: dataTransfer,
        });
        // --------------- DELETE INGREDIENTS
        cy.get('[data-testid=constructor_list_item]').should("have.length", 4);
        cy.get('[data-testid=constructor_list_item]>div>span>span:last-child>svg').eq(randomQty(3)).click();
        cy.get('[data-testid=constructor_list_item]').should("have.length", 3);
        // --------------- ACCEPT ORDER
        cy.get('[data-testid=constructor_button_checkout]').contains('Оформить заказ')
        cy.get('[data-testid=constructor_button_checkout]').click();
        cy.get("[data-testid=order_acceptance]").contains("123").should("exist");
        cy.get('body').type('{esc}');
    });
//
//
//     // --------------- SHOULD SHOW FEED ---------------
//
//     it('should visit feed', () => {
//         cy.visit('/')
//         cy.get('[data-testid=nav_button_feed]').click();
//         cy.get('[data-testid="section_feed"]').should('exist');
//         cy.wait(5000)
//     });
//
//     // --------------- SHOULD SHOW LOGIN ERRORS ---------------
//
//     it('should show email error', () => {
//         cy.clearLocalStorage();
//         cy.visit('/profile#/login');
//         cy.get('[data-testid=profile_quit_button]').should('not.exist');
//         cy.get('[data-testid=login_page_input_email]').type('test@.ry');
//         cy.get('[data-testid=login_page_button_submit]').click();
//         cy.get('[data-testid=login_page_error_email]').should('exist');
//     })
//
//     it('should show password error', () => {
//         cy.clearLocalStorage();
//         cy.visit('/profile#/login');
//         cy.get('[data-testid=profile_quit_button]').should('not.exist');
//         cy.get('[data-testid=login_page_input_email]').type('test@test.ru');
//         cy.get('[data-testid=login_page_input_password]').type('44444');
//         cy.get('[data-testid=login_page_button_submit]').click();
//         cy.get('[data-testid=login_page_error_password]').should('exist');
//     })
//
//
//     afterEach(function () {
//         cy.clearLocalStorage();
//     })
// })
})