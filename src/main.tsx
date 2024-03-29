import React from 'react'
import ReactDOM from 'react-dom/client'

import store from "src/store/store.ts";

import App from './App.tsx'

import './index.scss'

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)