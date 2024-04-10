import currentIngredientSliceReducer, {updateSelectedIngredient} from "slices/currentIngredientSlice.ts";

jest.mock('utils/api.ts');

describe('currentIngredient test', () => {
    it('should update ingredient', () => {
        const action = {type: updateSelectedIngredient, payload: {ingredient: {}}};
        const state:
        expect(updateSelectedIngredient(action)).toBe(true);
    })
})