import {IIngredient} from "interfaces/interfaces";

export function getIngredient(id: string, ingredients: IIngredient[]) {
    return ingredients.find((ingredient: IIngredient) => ingredient._id === id);
}