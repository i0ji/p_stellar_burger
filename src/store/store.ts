import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {orderFeedReducer} from "services/orederFeed/reducers.ts";
import {socketMiddleware} from "utils/socketMiddleware.ts";

import {wsActions} from "services/orederFeed/actions.ts";

const withTokenRefresh = false;

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

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(wsActions, withTokenRefresh)),
});