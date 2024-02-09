import {IIngredient} from "utils/interfaces/interfaces";

export interface IIngredientsListSlice {
    ingredients: IIngredient[]; // Замените any на фактический тип ваших ингредиентов
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


export interface IngredientsState {
    ingredientsData: IIngredient[];
    bunData: IIngredient[];
}