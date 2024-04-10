import ingredientsListReducer from 'slices/ingredientsSlice';
import {getIngredients} from 'utils/api.ts';

describe('ingredientsListSlice test', () => {
    it('should get ingredients: pending', () => {
        const state = ingredientsListReducer(undefined, {type: getIngredients.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should get ingredients: fulfilled', () => {
        const ingredients = [
            {id: 1, name: 'Hot sauce'},
            {id: 2, name: 'Spicy sauce'}
        ];
        const action = {
            type: getIngredients.fulfilled.type,
            payload: ingredients
        };
        const state = ingredientsListReducer(undefined, action);
        expect(state.status).toEqual('succeeded');
        expect(state.ingredients).toEqual(ingredients);
    });

    it('should get ingredients: rejected with error message', () => {
        const errorMessage = 'Error fetching ingredients';
        const action = {
            type: getIngredients.rejected.type,
            error: {message: errorMessage}
        };
        const state = ingredientsListReducer(undefined, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual(errorMessage);
    });

    it('should handle get ingredients: rejected without error message', () => {
        const action = {
            type: getIngredients.rejected.type,
            error: {}
        };
        const state = ingredientsListReducer(undefined, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toBeNull();
    });
});