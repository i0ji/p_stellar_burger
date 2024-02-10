import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IIngredient} from 'interfaces/interfaces';

interface ConstructorState {
    totalAmount: number;
    ingredients: IIngredient[];
    addedIngredients: IIngredient[];
}

const initialState: ConstructorState = {
    totalAmount: 0,
    ingredients: [],
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
        removeIngredient: (state, action) => {
            state.addedIngredients = state.addedIngredients.filter(ingredient => ingredient.id !== action.payload);
        },
    },
});

export const {addIngredient, removeIngredient} = constructorSlice.actions;

export default constructorSlice.reducer;