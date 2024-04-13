import currentIngredientReducer, {updateSelectedIngredient} from 'slices/currentIngredientSlice';

describe('currentIngredientSlice test', () => {


    // --------------- UPDATE INGREDIENT
    it('should update selected ingredient', () => {
        const ingredient = {
            id: 1,
            name: 'Spicy sauce'
        };
        const action = {
            type: updateSelectedIngredient.type,
            payload: ingredient
        };
        const state = currentIngredientReducer(undefined, action);
        expect(state.selectedIngredient).toBe(ingredient);
    });
    // --------------- INVALID ACTION TYPE
    it('should return initial state due to an invalid action', () => {
        const action = {
            type: 'invalid action type',
        };
        const initialState = {
            selectedIngredient: {}
        }
        const state = currentIngredientReducer(initialState, action);
        expect(state.selectedIngredient).toEqual(initialState.selectedIngredient);
    })
});