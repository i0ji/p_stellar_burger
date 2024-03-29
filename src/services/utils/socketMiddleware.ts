import {TwsActions} from "declarations/types";
import {Middleware} from "@reduxjs/toolkit";
import {RootState} from "declarations/rootState.ts";
import {refreshToken} from "utils/api.ts";

export const socketMiddleware = (
    wsActions: TwsActions,
    withTokenRefresh: boolean
): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url: string | null = null;
        const {
            wsClose,
            wsOpen,
            onClose,
            onError,
            onMessage,
        } = wsActions;

        return (next) => (action) => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === wsOpen) {
                socket = new WebSocket(payload);
                url = payload;
                socket.onopen = (event) => {
                    dispatch({type: wsOpen, payload: event});
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
                            dispatch({type: wsOpen, payload: wssUrl});
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

            next(action);
        };
    };
};