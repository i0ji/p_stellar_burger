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
    wsMessage as FeedMessageAction,
    wsClose as FeedCloseAction,
    wsDisconnect as FeedDisconnectAction,
    wsError as FeedErrorAction,
} from "services/orderFeed/actions.ts";

import {
    wsUserConnect as UserFeedConnectAction,
    wsUserConnecting as UserFeedConnectionAction,
    wsUserOpen as UserFeedOpenAction,
    wsUserMessage as UserFeedMessageAction,
    wsUserClose as UserFeedCloseAction,
    wsUserDisconnect as UserFeedDisconnectAction,
    wsUserError as UserFeedErrorAction,
} from "services/userOrderFeed/actions.ts";

export const wsActions = {
    wsConnect: FeedConnectAction,
    wsConnecting: FeedConnectionAction,
    wsMessage: FeedMessageAction,
    wsClose: FeedCloseAction,
    wsDisconnect: FeedDisconnectAction,
    wsError: FeedErrorAction,
    onOpen: FeedOpenAction,
}

export const wsUserActions = {
    wsUserConnect: UserFeedConnectAction,
    wsUserConnecting: UserFeedConnectionAction,
    wsUserMessage: UserFeedMessageAction,
    wsUserClose: UserFeedCloseAction,
    wsUserDisconnect: UserFeedDisconnectAction,
    wsUserError: UserFeedErrorAction,
    onOpen: UserFeedOpenAction,
}

const feedMiddleware = socketMiddleware(wsActions, false);
const userFeedMiddleware = socketMiddleware(wsUserActions, checkToken);

export const store = configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(feedMiddleware, userFeedMiddleware)
    }
)