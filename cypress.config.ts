import {defineConfig} from 'cypress'

// Noinspection JSUnusedGlobalSymbols
export default defineConfig({
        component: {
            devServer: {
                framework: 'react',
                bundler: 'vite',
            },
        },
        e2e: {
            /*
             * SetupNodeEvents(on, config) {
             * },
             */
            baseUrl: 'http://localhost:5173',
        },
        viewportWidth: 1400,
        viewportHeight: 860,
    },
)
