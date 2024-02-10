import {createSlice} from "@reduxjs/toolkit";

const constructorSlice = createSlice({
    name: 'constructorSlice',
    initialState: {
        randomIngredients: [],
        totalAmount: 0,
    },
    reducers: {
        setRandomIngredients: (state, action) => {
            state.randomIngredients = action.payload;
        },
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload;
        },
    },
});

export const {
    setRandomIngredients,
    setTotalAmount,
} = constructorSlice.actions;

export default constructorSlice.reducer;