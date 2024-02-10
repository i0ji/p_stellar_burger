import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IIngredient} from 'interfaces/interfaces';

interface ConstructorState {
    totalAmount: number;
    ingredients: IIngredient[];
    addedIngredients: IIngredient[];
    topBun: IIngredient | null;
    bottomBun: IIngredient | null;
}

const initialState: ConstructorState = {
    totalAmount: 0,
    ingredients: [],
    addedIngredients: [],
    topBun: null,
    bottomBun: null,
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
        updateBun: (state, action: PayloadAction<{ bunType: 'topBun' | 'bottomBun'; bun: IIngredient }>) => {
            const { bunType, bun } = action.payload;
            state[bunType] = bun;
        },
    },
});

export const {addIngredient,updateBun, removeIngredient} = constructorSlice.actions;

export default constructorSlice.reducer;