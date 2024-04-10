import currentIngredientReducer, {updateSelectedIngredient} from 'slices/currentIngredientSlice';

describe('currentIngredientSlice reducer', () => {
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
        expect(state.selectedIngredient).toEqual(ingredient);
    });
});