import {Middleware} from "redux";
import {RootState} from "declarations/rootState.ts";
import {TAppAction} from "declarations/actionTypes.ts";
import {TwsActionTypes} from "declarations/types";

import {refreshToken} from "utils/api.ts";

export const socketMiddleware = (
    wsActions: TwsActionTypes,
    withTokenRefresh: boolean
): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url: string | null = null;
        const {
            // wsConnect,
            wsDisconnect,
            // onOpen,
            // wsMessage,
            // onClose,
            // onError,
        }: TwsActionTypes = wsActions;

        return (next) => (action) => {
            const {dispatch} = store;
            const {type, payload}: TAppAction = action;

            console.log('CURRENT ACTION TYPE: ', type);
            if (type === 'ORDER_FEED_WS_CONNECT') {
                //console.log('CONDITION START: ', type);
                socket = new WebSocket(payload);
                url = payload;
                // console.log('SOCKET: ', socket);
                // console.log('PAYLOAD: ', payload);
                socket.onopen = () => {
                    dispatch({
                        type: 'ORDER_FEED_ON_OPEN',
                    });
                };
                //console.log('ONERROR: ', socket.onerror);
                socket.onerror = (event) => {
                    dispatch({
                        type: 'ORDER_FEED_ON_ERROR',
                        payload: event,
                    });
                };

                socket.onmessage = (event) => {
                    //console.log('EVENT.DATA:', event.data);
                    const {data} = event;
                    const parsedData = JSON.parse(data);

                    if (withTokenRefresh && parsedData.message === "Токен неверный или отсутствует!") {
                        refreshToken().then((refreshData) => {
                            const wssUrl = new URL(url!);
                            wssUrl.searchParams.set(
                                "token",
                                refreshData.accessToken.replace("Bearer ", "")
                            );
                            dispatch({
                                type: 'ORDER_FEED_WS_CONNECT',
                                payload: wssUrl,
                            });
                        });
                    } else {
                        dispatch({
                            type: 'ORDER_FEED_WS_MESSAGE',
                            payload: parsedData,
                        });
                    }
                };

                socket.onclose = () => {
                    dispatch({type: 'ORDER_FEED_ON_CLOSE'});
                };
            }

            if (wsDisconnect && type === wsDisconnect && socket) {
                socket.close();
            }

            next(action);
        };
    };
};