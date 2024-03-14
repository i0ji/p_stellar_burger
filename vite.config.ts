import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './',
    resolve: {
        alias: {
            store: "/src/store",
            components: "/src/components",
            common: "/src/components/common/",
            pages: "/src/pages",
            styles: "/src/styles",
            utils: "/src/utils/",
            images: "/src/images",
            slices: "/src/services/slices",
            hooks: "/src/hooks",
            modal: "/src/components/Modal",
            services: "/src/services",
            interfaces: "/src/utils/interfaces",
            declarations: "/src/declarations",
            src: ".",
        }
    },
})