import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {socketMiddleware} from "utils/socketMiddleware.ts";
import {orderFeedReducer} from "services/orderFeed/reducers.ts";

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
});

import {
    wsConnect as FeedConnectAction,
    wsConnecting as FeedConnectionAction,
    wsOpen as FeedOpenAction,
    wsMessage as FeedMessageAction,
    wsClose as FeedCloseAction,
    wsDisconnect as FeedDisconnectAction,
    wsError as FeedErrorAction,
    onOpen as FeedOnOpenAction,
    onError as FeedOnErrorAction,
    onClose as FeedOnCloseAction
} from "services/orderFeed/actions.ts";

export const wsActions = {
    wsOpen: FeedOpenAction,
    wsConnect: FeedConnectAction,
    wsConnecting: FeedConnectionAction,
    wsMessage: FeedMessageAction,
    wsClose: FeedCloseAction,
    wsDisconnect: FeedDisconnectAction,
    wsError: FeedErrorAction,
    onOpen: FeedOnOpenAction,
    onError: FeedOnErrorAction,
    onClose: FeedOnCloseAction,
};


const checkToken = !!(localStorage.getItem('accessToken'));

export const store = configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socketMiddleware(wsActions, checkToken))
    }
)