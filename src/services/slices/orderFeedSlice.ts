import {createSlice} from "@reduxjs/toolkit";
import {IIngredient} from "declarations/interfaces";

interface IOrderFeedSlice {
    ingredients: Array<IIngredient>
}


const initialState: IOrderFeedSlice = {
    ingredients: []
}

const orderFeedSlice = createSlice({
    name: 'orderFeedSlice',
    initialState,
    reducers: {}
})

export default orderFeedSlice.reducer;