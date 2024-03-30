import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {socketMiddleware} from "utils/socketMiddleware.ts";
import {orderFeedReducer} from "services/orderFeed/reducers.ts";
import {userOrderFeedReducer} from "services/userOrderFeed/reducers.ts";

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
    userOrderFeed: userOrderFeedReducer,
});

const checkToken = !!(localStorage.getItem('accessToken'));

import {
    wsConnect as FeedConnectAction,
    wsConnecting as FeedConnectionAction,
    wsOpen as FeedOpenAction,
    wsMessage as FeedMessageError,
    wsClose as FeedCloseAction,
    wsDisconnect as FeedDisconnectAction,
    wsError as FeedErrorAction,
} from "services/orderFeed/actions.ts";

import {
    wsUserConnect as UserFeedConnectAction,
    wsUserConnecting as UserFeedConnectionAction,
    wsUserOpen as UserFeedOpenAction,
    wsUserMessage as UserFeedMessageError,
    wsUserClose as UserFeedCloseAction,
    wsUserDisconnect as UserFeedDisconnectAction,
    wsUserError as UserFeedErrorAction,
} from "services/userOrderFeed/actions.ts";

export const wsActions = {
    wsConnect: FeedConnectAction,
    wsConnecting: FeedConnectionAction,
    wsOpen: FeedOpenAction,
    wsMessage: FeedMessageError,
    wsClose: FeedCloseAction,
    wsDisconnect: FeedDisconnectAction,
    wsError: FeedErrorAction,
    onOpen: () => {
    },
    onMessage: () => {
    },
    onClose: () => {
    },
    onError: () => {
    }
}

export const wsUserActions = {
    wsUserConnect: UserFeedConnectAction,
    wsUserConnecting: UserFeedConnectionAction,
    wsUserOpen: UserFeedOpenAction,
    wsUserMessage: UserFeedMessageError,
    wsUserClose: UserFeedCloseAction,
    wsUserDisconnect: UserFeedDisconnectAction,
    wsUserError: UserFeedErrorAction,
    onUserOpen: () => {
    },
    onUserMessage: () => {
    },
    onUserClose: () => {
    },
    onUserError: () => {
    }
}

const feedMiddleware = socketMiddleware(wsActions, false);
const userFeedMiddleware = socketMiddleware(wsUserActions, checkToken);

export const store = configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(feedMiddleware, userFeedMiddleware)
    }
)