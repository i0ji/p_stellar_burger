import {configureStore} from "@reduxjs/toolkit";
import {orderFeedReducer} from "services/orederFeed/reducers.ts";
import {socketMiddleware} from "utils/socketMiddleware.ts";

import {wsActions} from "services/orederFeed/actions.ts";

const withTokenRefresh = false;
export const store = configureStore({
    reducer: orderFeedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(wsActions, withTokenRefresh)),
});