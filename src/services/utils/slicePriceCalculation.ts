import {IIngredient} from "declarations/interfaces";

export const slicePriceCalculation = (
    addedIngredients: IIngredient[],
    bun: IIngredient | null,
): number => {
    const ingredientsTotal =
            addedIngredients?.reduce(
                (acc, ingredient) => acc + (ingredient?.price || 0),
                0,
            ) || 0,
        bunTotal = bun?.price || 0;

    return ingredientsTotal + bunTotal * 2;
};
