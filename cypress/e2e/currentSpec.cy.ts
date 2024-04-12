describe('Happy path spec', () => {
    beforeEach(() => {
        cy.intercept("GET", "api/auth/user", {fixture: "user.json"});
        cy.intercept("POST", "api/orders", {fixture: "order.json"}).as("postOrder");

        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );
        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-accessToken")
        );


    });


    it('should assemble order', () => {

        const dataTransfer = new DataTransfer();
        const randomBun = Math.round(Math.random());
        const randomSauce = Math.round(Math.random() * 3);
        const randomMain = Math.round(Math.random() * 8);


        cy.visit('/')

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
        cy.wait(2000);
        cy.get('[data-testid=constructor_button_checkout]').contains('Оформить заказ')
        cy.get('[data-testid=constructor_button_checkout]').click();
        cy.get("[data-testid=order_acceptance]").contains("123").should("exist");
        cy.wait(2000);
        cy.get('body').type('{esc}');

    });


    afterEach(function () {
        cy.clearLocalStorage();
    })
})