import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {orderFeedReducer} from "services/orederFeed/reducers.ts";
import {socketMiddleware} from "utils/socketMiddleware.ts";

import {wsActions} from "services/orederFeed/actions.ts";

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

const checkTokenValidity = !!(localStorage.getItem('accessToken'));

export const store = configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socketMiddleware(wsActions, checkTokenValidity))
    }
)