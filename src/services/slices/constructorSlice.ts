import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IIngredient} from 'interfaces/interfaces';

interface ConstructorState {
    totalAmount: number;
    ingredients: IIngredient[]; // Замените any на тип вашего массива ингредиентов
    addedIngredients: IIngredient[]; // Уточните тип, если это возможно
}

const initialState: ConstructorState = {
    totalAmount: 0,
    ingredients: [], // Замените на начальное значение, если требуется
    addedIngredients: [],
};

const constructorSlice = createSlice({
    name: 'constructorSlice',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<IIngredient>) => {
            return {
                ...state,
                addedIngredients: [...state.addedIngredients, action.payload],
            };
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                addedIngredients: state.addedIngredients.filter(
                    (ingredient) => ingredient._id !== action.payload
                ),
            };
        },
    },
});

export const {addIngredient, removeIngredient} = constructorSlice.actions;

export default constructorSlice.reducer;