import React from 'react'
import ReactDOM from 'react-dom/client'

import {store} from "src/store/store.ts";

import App from './App.tsx'

import './index.scss'

import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </React.StrictMode>
    ,
)