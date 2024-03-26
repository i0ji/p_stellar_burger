import {TwsActions} from "declarations/types";
import {RootState} from "declarations/rootState.ts";
import {refreshToken} from "utils/api.ts";
import {Middleware} from "@reduxjs/toolkit";

export const socketMiddleware = (
    wsActions: TwsActions,
    withTokenRefresh: boolean
): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url: string | null = null;
        const {
            wsInit,
            wsClose,
            wsSendMessage,
            onOpen,
            onClose,
            onError,
            onMessage,
        } = wsActions;

        return (next) => (action) => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === wsInit) {
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
                            dispatch({type: wsInit, payload: wssUrl});
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

            if (wsClose && type === wsClose && socket) {
                socket.close();
            }

            if (wsSendMessage && type === wsSendMessage && socket) {
                socket.send(JSON.stringify(payload));
            }

            next(action);
        };
    };
};