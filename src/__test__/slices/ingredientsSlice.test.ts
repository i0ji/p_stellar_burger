import ingredientsListReducer from 'slices/ingredientsSlice';
import {getIngredients} from 'utils/api.ts';

describe('ingredientsListSlice reducer', () => {
    it('should handle getIngredients.pending', () => {
        const state = ingredientsListReducer(undefined, {type: getIngredients.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should handle getIngredients.fulfilled', () => {
        const ingredients = [{id: 1, name: 'Ingredient 1'}, {id: 2, name: 'Ingredient 2'}];
        const action = {type: getIngredients.fulfilled.type, payload: ingredients};
        const state = ingredientsListReducer(undefined, action);
        expect(state.status).toEqual('succeeded');
        expect(state.ingredients).toEqual(ingredients);
    });

    it('should handle getIngredients.rejected', () => {
        const errorMessage = 'Error fetching ingredients';
        const action = {type: getIngredients.rejected.type, error: {message: errorMessage}};
        const state = ingredientsListReducer(undefined, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual(errorMessage);
    });
});