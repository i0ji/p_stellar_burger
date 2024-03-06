import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './',
    resolve: {
        alias: {
            store: "/src/store",
            components: "/src/components",
            pages: "/src/pages",
            styles: "/src/styles",
            data: "/src/data",
            utils: "/src/utils/",
            images: "/src/images",
            declarations: "/src/declarations",
            constants: "/src/declarations/constants/",
            slices: "/src/services/slices",
            hooks: "/src/hooks",
            modal: "/src/components/Modal",
            services: "/src/services",
            actions: "/src/services/actions",
            reducers: "/src/services/reducers",
            interfaces: "/src/utils/interfaces",
            src: ".",
        }
    },
})