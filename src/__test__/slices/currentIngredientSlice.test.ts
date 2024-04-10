import currentIngredientReducer, { updateSelectedIngredient } from 'slices/currentIngredientSlice';

describe('currentIngredientSlice reducer', () => {
    it('should handle updateSelectedIngredient', () => {
        const ingredient = { id: 1, name: 'Ingredient' };
        const action = { type: updateSelectedIngredient.type, payload: ingredient };
        const state = currentIngredientReducer(undefined, action);
        expect(state.selectedIngredient).toEqual(ingredient);
    });
});