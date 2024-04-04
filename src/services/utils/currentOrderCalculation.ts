import {IIngredient} from "declarations/interfaces";

const ingredientCounts: { [key: string]: number } = {};

export default function currentOrderCalculating({orderIngredientIDs, ingredientsData}: {
    orderIngredientIDs: Array<string>,
    ingredientsData: Array<IIngredient>
}) {

    orderIngredientIDs?.forEach(order => {
            ingredientCounts[order] = (ingredientCounts[order] || 0) + 1;
        }
    )
    ;

    const ingredientsWithQuantity: { ingredient: IIngredient, qty: number }[] = [];

    if (orderIngredientIDs) {
        ingredientsData.forEach(ingredient => {
            if (orderIngredientIDs.includes(ingredient._id as string)) {
                let qty = ingredientCounts[ingredient._id as string];

                if (ingredient.type === 'bun') {
                    qty = 2;
                }

                ingredientsWithQuantity.push({ingredient, qty});
            }
        });
    }

    let totalOrderPrice = 0;

    ingredientsWithQuantity.forEach(item => {

        const itemPrice = item.ingredient.price;

        totalOrderPrice += itemPrice * item.qty;
    });

    return {totalOrderPrice, ingredientsWithQuantity};
}