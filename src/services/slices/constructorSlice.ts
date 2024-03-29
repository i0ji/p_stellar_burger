import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IConstructorSlice} from 'declarations/sliceInterfaces'
import {IIngredient} from "declarations/interfaces";

const initialState: IConstructorSlice = {
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
				state.addedIngredients = Array.from(new Set([...state.addedIngredients, action.payload]));
			}
			state.totalAmount = calculateTotalAmount(state.addedIngredients, state.bun);
		},
		removeIngredient: (state, action: PayloadAction<string | undefined>) => {
			const idToRemove = action.payload;
			const ingredientIndex = state.addedIngredients.findIndex(ingredient => ingredient._id === idToRemove);
			if (ingredientIndex !== -1) {
				state.addedIngredients.splice(ingredientIndex, 1);
			}
			state.totalAmount = calculateTotalAmount(state.addedIngredients, state.bun);
		},
		reorderIngredients: (state, action) => {
			const {dragIndex, hoverIndex} = action.payload;
			const addedIngredients = [...state.addedIngredients];
			
			const [movedIngredient] = addedIngredients.splice(dragIndex, 1);
			addedIngredients.splice(hoverIndex, 0, movedIngredient);
			
			state.addedIngredients = addedIngredients;
		},
		resetIngredients: (state) => {
			state.addedIngredients = [];
			state.bun = null;
			state.totalAmount = 0;
		}
	},
});

const calculateTotalAmount = (addedIngredients: IIngredient[], bun: IIngredient | null): number => {
	
	const ingredientsTotal = addedIngredients?.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0) || 0;
	const bunTotal = bun?.price || 0;
	
	return ingredientsTotal + (bunTotal * 2);
};

export const {
	addIngredient,
	removeIngredient,
	reorderIngredients,
	resetIngredients
} = constructorSlice.actions;

export default constructorSlice.reducer;