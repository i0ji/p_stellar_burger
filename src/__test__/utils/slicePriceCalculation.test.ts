import {slicePriceCalculation} from "utils/slicePriceCalculation.ts";
import {IIngredient} from "declarations/interfaces";

describe('slicePriceCalculation test', () => {

    it('should give price', async () => {
        const ingredients = [
            {
                price: 400,
                name: 'Spicy sauce',
                type: 'ingredient1'
            },
            {
                price: 500,
                name: 'Hot sauce',
                type: 'ingredient2'
            }
        ]

        const bun = {
            price: 150,
            name: 'Bun',
            type: 'bun'
        };

        expect(slicePriceCalculation(ingredients, bun)).toBe(1200)
    })

    it('should give price w/o buns ', () => {
        const ingredients = [
            {
                price: 400,
                name: 'Spicy sauce',
                type: 'ingredient1'
            },
            {
                price: 500,
                name: 'Hot sauce',
                type: 'ingredient2'
            }
        ];
        expect(slicePriceCalculation(ingredients, null)).toBe(900)
    });

    it('should give price w/o ingredients ', () => {
        const ingredients = [{}] as Array<IIngredient>;
        const bun = {
            price: 150,
            name: 'Bun',
            type: 'bun'
        };
        expect(slicePriceCalculation(ingredients, bun)).toBe(300)
    });

})