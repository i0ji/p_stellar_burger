import constructorReducer, {
    initialState,
    addIngredient,
    removeIngredient,
    reorderIngredients,
    resetIngredients
} from 'slices/constructorSlice';

describe('constructorSlice test', () => {
    it('should add ingredient', () => {
        const bun = {_id: '123abc123abc', type: 'bun', price: 5};
        const action = {type: addIngredient.type, payload: bun};
        const state = constructorReducer(initialState, action);
        expect(state.bun).toEqual(bun);
        expect(state.totalAmount).toEqual(10); // 5 * 2
    });

    it('should remove ingredient', () => {
        const initialStateWithIngredient = {
            ...initialState,
            addedIngredients: [{_id: '123abc123abc', type: 'main', price: 2}],
            totalAmount: 2,
        };
        const action = {type: removeIngredient.type, payload: '123abc123abc'};
        const state = constructorReducer(initialStateWithIngredient, action);
        expect(state.addedIngredients).toHaveLength(0);
        expect(state.totalAmount).toEqual(0);
    });

    it('should reorder ingredients', () => {
        const initialStateWithIngredients = {
            ...initialState,
            addedIngredients: [
                {_id: '123abc123abc', type: 'main', price: 2},
                {_id: '456def456def', type: 'bun', price: 3},
            ],
            totalAmount: 5,
        };
        const action = {type: reorderIngredients.type, payload: {dragIndex: 0, hoverIndex: 1}};
        const state = constructorReducer(initialStateWithIngredients, action);
        expect(state.addedIngredients).toEqual([
            {_id: '456def456def', type: 'bun', price: 3},
            {_id: '123abc123abc', type: 'main', price: 2},
        ]);
        expect(state.totalAmount).toEqual(5);
    });

    it('should reset ingredients', () => {
        const initialStateWithIngredients = {
            ...initialState,
            addedIngredients: [{_id: '123abc123abc', type: 'main', price: 2}],
            bun: {_id: '123abc123abc', type: 'bun', price: 5},
            totalAmount: 7,
        };
        const action = {type: resetIngredients.type};
        const state = constructorReducer(initialStateWithIngredients, action);
        expect(state.addedIngredients).toHaveLength(0);
        expect(state.bun).toBeNull();
        expect(state.totalAmount).toEqual(0);
    });
});