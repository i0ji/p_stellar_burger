import {TwsActions} from "declarations/types";
import {Middleware} from "@reduxjs/toolkit";
import {RootState} from "declarations/rootState.ts";
import {refreshToken} from "utils/api.ts";
import {wsOpen} from "services/orderFeed/actions.ts";
import {TAppAction} from "declarations/actionTypes.ts";


export const socketMiddleware = (
    wsActions: TwsActions,
    withTokenRefresh: boolean
): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url: string | null = null;
        const {
            wsConnect,
            wsDisconnect,
            onOpen,
            onMessage,
            onClose,
            onError,
        }:TwsActions = wsActions;

        return (next) => (action) => {
            const {dispatch} = store;
            const {type, payload}:TAppAction = action;

            if (type === wsOpen) {
                socket = new WebSocket(payload);
                url = payload;
                socket.onopen = (event) => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = (event) => {
                    dispatch({type: onError, payload: event});
                };

                socket.onmessage = (event) => {
                    console.log(event);
                    const {data} = event;
                    const parsedData = JSON.parse(data);

                    if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                        refreshToken().then((refreshData) => {
                            const wssUrl = new URL(url!);
                            wssUrl.searchParams.set(
                                "token",
                                refreshData.accessToken.replace("Bearer ", "")
                            );
                            dispatch({type: wsConnect, payload: wssUrl});
                        });
                    } else {
                        dispatch({
                            type: onMessage,
                            payload: parsedData
                        });
                    }
                };

                socket.onclose = (event) => {
                    dispatch({type: onClose, payload: event});
                };
            }

            if (wsDisconnect && type === wsDisconnect && socket) {
                socket.close();
            }

            next(action);
        };
    };
};