import {IIngredient} from "utils/interfaces/interfaces";

export interface IIngredientsListSlice {
    ingredients: IIngredient[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface IngredientsState {
    ingredientsData: IIngredient[];
    bunData: IIngredient[];
}

export interface IBurgerState {
    ingredients: IIngredient[];
    status: string;
    error: string | null;
}

export interface IConstructorState {
    ingredients: IIngredient[],
    totalPrice: number,
    randomIngredients: IIngredientp[]
}