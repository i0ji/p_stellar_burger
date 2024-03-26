import {configureStore} from "@reduxjs/toolkit";
import {orderFeedReducer} from "services/orederFeed/reducers.ts";
import {socketMiddleware} from "utils/socketMiddleware.ts";

export const store = configureStore({
        reducer: orderFeedReducer,
        middleware: () => socketMiddleware,
    }
)