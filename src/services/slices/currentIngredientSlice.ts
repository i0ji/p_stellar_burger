import {createSlice} from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
    name: 'currentIngredientSlice',
    initialState: {
        selectedIngredient: {},
    },
    reducers: {
        updateSelectedIngredient: (state, action) => {
            state.selectedIngredient = action.payload;
        },
        resetSelectedIngredient: (state) => {
            state.selectedIngredient = null;
        },
    },
});

export const {updateSelectedIngredient, resetSelectedIngredient} = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;