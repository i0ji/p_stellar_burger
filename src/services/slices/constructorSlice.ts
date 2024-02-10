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
        replaceIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
            const {dragIndex, hoverIndex} = action.payload;
            const draggedIngredient = state.addedIngredients[dragIndex];

            const newIngredients = [...state.addedIngredients];
            newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, draggedIngredient);

            return {
                ...state,
                addedIngredients: newIngredients,
            };
        },
        removeIngredient: (state, action) => {
            state.addedIngredients = state.addedIngredients.filter(ingredient => ingredient.id !== action.payload);
        },
    },
});

export const {addIngredient, replaceIngredient, removeIngredient} = constructorSlice.actions;

export default constructorSlice.reducer;