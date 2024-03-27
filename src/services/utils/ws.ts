import {WS_URL} from "declarations/routs.ts";

let ws: WebSocket;

export const initWebSocket = () => {

    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        console.log('WebSocket подключение установлено');
    };

    ws.onmessage = (event) => {
        console.log('Получено сообщение:', event.data);
    };


    ws.onclose = () => {
        console.log('WebSocket соединение закрыто.');
    };

    ws.onerror = (error) => {
        console.error('WebSocket ошибка:', error);
    };
};

export const closeWebSocket = () => {
    if (ws) {
        ws.close();
    }
};