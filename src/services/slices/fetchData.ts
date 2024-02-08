import { createSlice } from '@reduxjs/toolkit'
import {IIngredient} from "src/Interfaces";
import {INGREDIENTS_DATA_URL} from "utils/routs.ts";
import {checkResponse} from "utils/check-response.ts";

export const initialState:{ingredients: IIngredient[]} = {
	ingredients: []
}

const fetchDataSlice = createSlice({
	name: "fetchData",
	initialState,
	reducers: {
		getIngredients() {
			return fetch(INGREDIENTS_DATA_URL)
				.then(checkResponse)
				.then(data => data.data);
		}
	}
});
export const { getIngredients } = fetchDataSlice.actions;
export default countSlice.reducer