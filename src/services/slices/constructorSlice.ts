import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ConstructorState} from 'interfaces/sliceInterfaces'
import {IIngredient} from "interfaces/interfaces";

const initialState: ConstructorState = {
    totalAmount: 0,
    ingredients: [],
    addedIngredients: [],
    bun: null,
};

const constructorSlice = createSlice({
    name: 'constructorSlice',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<IIngredient>) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload;
            } else {
                // Используйте Set для уникальных ингредиентов
                state.addedIngredients = Array.from(new Set([...state.addedIngredients, action.payload]));
            }
            state.totalAmount = calculateTotalAmount(state.addedIngredients, state.bun);
        },
        removeIngredient: (state, action: PayloadAction<number>) => {
            const ingredientToRemove = state.addedIngredients.find((ingredient) => ingredient.id === action.payload);
            if (ingredientToRemove) {
                state.addedIngredients = state.addedIngredients.filter((ingredient) => ingredient.id !== action.payload);
            }
            state.totalAmount = calculateTotalAmount(state.addedIngredients, state.bun);
        },
        reorderIngredients: (state, action) => {
            const {from, to} = action.payload;
            const ingredients = [...state.ingredients];

            const [movedIngredient] = ingredients.splice(from, 1);
            ingredients.splice(to, 0, movedIngredient);

            state.ingredients = ingredients;
        },
    },
});

const calculateTotalAmount = (addedIngredients: IIngredient[], bun: IIngredient | null): number => {
    const ingredientsTotal = addedIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    const bunTotal = bun ? bun.price : 0;

    return ingredientsTotal + (bunTotal * 2);
};

export const {addIngredient, removeIngredient, reorderIngredients} = constructorSlice.actions;

export default constructorSlice.reducer;