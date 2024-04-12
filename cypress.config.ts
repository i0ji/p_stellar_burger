import {defineConfig} from 'cypress'



// noinspection JSUnusedGlobalSymbols
export default defineConfig({
        component: {
            devServer: {
                framework: 'react',
                bundler: 'vite',
            },
        },
        e2e: {
            // setupNodeEvents(on, config) {
            // },
            baseUrl: 'http://localhost:5173',
        },
    },
)
