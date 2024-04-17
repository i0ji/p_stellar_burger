import React from 'react'
import ReactDOM from 'react-dom/client'

import {store} from "src/store/store.ts";

import App from './App.tsx'

import './index.scss'

import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {motion} from "framer-motion";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                {/*<motion.div*/}
                {/*    initial={{opacity: 0}}*/}
                {/*    animate={{opacity: 1, scale: 1}}*/}
                {/*    transition={{*/}
                {/*        duration: .8,*/}
                {/*        delay: 0.5,*/}
                {/*        ease: [0, 0.71, 0.2, 1.01]*/}
                {/*    }}*/}
                {/*>*/}
                    <App/>
                {/*</motion.div>*/}
            </Provider>
        </HashRouter>
    </React.StrictMode>
    ,
)