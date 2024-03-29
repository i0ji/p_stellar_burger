import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {orderFeedReducer} from "services/orderFeed/reducers.ts";
import {socketMiddleware} from "utils/socketMiddleware.ts";

import {wsActions} from "services/orderFeed/actions.ts";

import {
    authSlice,
    currentIngredientSlice,
    orderSlice,
    ingredientsSlice,
    constructorSlice,
} from "slices/index.ts"

export const rootReducers = combineReducers({
    ingredients: ingredientsSlice,
    constructorSlice: constructorSlice,
    currentIngredientSlice: currentIngredientSlice,
    orderSlice: orderSlice,
    authSlice: authSlice,
    orderFeed: orderFeedReducer,
})

const checkToken = !!(localStorage.getItem('accessToken'));

export const store = configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socketMiddleware(wsActions, checkToken))
    }
)