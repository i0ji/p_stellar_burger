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
        replaceIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number; ingredient: IIngredient }>) => {
            const { dragIndex, hoverIndex, ingredient } = action.payload;
            const newIngredients = [...state.addedIngredients];

            // Убедитесь, что hoverIndex не выходит за пределы массива
            const adjustedHoverIndex = Math.min(Math.max(hoverIndex, 0), newIngredients.length);

            // Если ингредиент перемещается в конец, добавьте его в конец массива
            if (adjustedHoverIndex === newIngredients.length) {
                newIngredients.push(ingredient);
            } else {
                // Вставьте ингредиент в нужное место массива
                newIngredients.splice(dragIndex, 1);
                newIngredients.splice(adjustedHoverIndex, 0, ingredient);
            }

            state.addedIngredients = newIngredients;
        },
        removeIngredient: (state, action) => {
            state.addedIngredients = state.addedIngredients.filter(ingredient => ingredient.id !== action.payload);
        },
    },
});

export const {addIngredient, replaceIngredient, removeIngredient} = constructorSlice.actions;

export default constructorSlice.reducer;