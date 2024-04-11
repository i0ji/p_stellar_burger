import constructorReducer, {
    initialState,
    addIngredient,
    removeIngredient,
    reorderIngredients,
    resetIngredients
} from 'slices/constructorSlice';

describe('constructorSlice test', () => {

    it('should add bun', () => {
        const bun = {
            name: 'Purple bun',
            _id: 'bun_id',
            type: 'bun',
            price: 5
        };
        const action = addIngredient(bun);
        const state = constructorReducer(initialState, action);
        expect(state.bun).toEqual(bun);
        expect(state.totalPrice).toEqual(10);
    });

    it('should add non-bun', () => {
        const initialIngredient = {_id: 'ingredient_id', type: 'main', price: 2};
        const initialStateWithIngredients = {
            ...initialState,
            addedIngredients: [initialIngredient],
            totalPrice: 2,
        };
        const newIngredient = {
            name: 'Spicy sauce',
            _id: '123abc123abc',
            type: 'main',
            price: 3
        };
        const action = addIngredient(newIngredient);
        const state = constructorReducer(initialStateWithIngredients, action);
        expect(state.addedIngredients).toHaveLength(2);
        expect(state.addedIngredients[1]).toEqual(newIngredient);
        expect(state.totalPrice).toEqual(5);
    });

    it('should remove existing ingredient', () => {
        const initialIngredient = {_id: 'ingredient_id', type: 'main', price: 2};
        const initialStateWithIngredients = {
            ...initialState,
            addedIngredients: [initialIngredient],
            totalPrice: 2,
        };
        const action = removeIngredient('ingredient_id');
        const state = constructorReducer(initialStateWithIngredients, action);
        expect(state.addedIngredients).toHaveLength(0);
        expect(state.totalPrice).toEqual(0);
    });

    it('should remove non-existing ingredient', () => {
        const initialIngredient = {_id: 'ingredient_id', type: 'main', price: 2};
        const initialStateWithIngredients = {
            ...initialState,
            addedIngredients: [initialIngredient],
            totalPrice: 2,
        };
        const action = removeIngredient('non_existing_id');
        const state = constructorReducer(initialStateWithIngredients, action);
        expect(state.addedIngredients).toHaveLength(1);
        expect(state.totalPrice).toEqual(2);
    });

    it('should reorder ingredients', () => {
        const initialStateWithIngredients = {
            ...initialState,
            addedIngredients: [
                {_id: '123abc123abc', type: 'main', price: 2},
                {_id: '456def456def', type: 'bun', price: 3},
            ],
            totalPrice: 5,
        };
        const action = {
            type: reorderIngredients.type,
            payload: {dragIndex: 0, hoverIndex: 1}
        };
        const state = constructorReducer(initialStateWithIngredients, action);
        expect(state.addedIngredients).toEqual([
            {_id: '456def456def', type: 'bun', price: 3},
            {_id: '123abc123abc', type: 'main', price: 2},
        ]);
        expect(state.totalPrice).toEqual(5);
    });

    it('should reset ingredients', () => {
        const initialStateWithIngredients = {
            ...initialState,
            addedIngredients: [{_id: '123abc123abc', type: 'main', price: 2}],
            bun: {_id: '123abc123abc', type: 'bun', price: 5},
            totalPrice: 7,
        };
        const action = {type: resetIngredients.type};
        const state = constructorReducer(initialStateWithIngredients, action);
        expect(state.addedIngredients).toHaveLength(0);
        expect(state.bun).toBeNull();
        expect(state.totalPrice).toEqual(0);
    });
});