import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {INGREDIENTS_DATA_URL} from 'utils/routs';
import {checkResponse} from 'utils/check-response';
import {IIngredientsListSlice} from "interfaces/sliceInterfaces";

export const fetchIngredients = createAsyncThunk('ingredientsListSlice/fetchIngredients', async () => {
    const response = await fetch(INGREDIENTS_DATA_URL);
    const data = await checkResponse(response);
    return data.data;
});

const ingredientsListSlice = createSlice({
    name: 'ingredientsListSlice',
    initialState: {
        ingredients: [],
        status: 'idle',
        error: null
    } as IIngredientsListSlice,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message !== undefined ? action.error.message : null;
            });
    },
});

export default ingredientsListSlice.reducer;