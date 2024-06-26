import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './', // Set your source folder as the root
    build: {
        outDir: './build' // Set your desired output directory
    },
    resolve: {
        alias: {
            store: "/src/store",
            components: "/src/components",
            common: "/src/components/common/",
            pages: "/src/pages",
            styles: "/src/styles",
            utils: "/src/services/utils/",
            images: "/src/images",
            slices: "/src/services/slices",
            hooks: "/src/services/hooks",
            modal: "/src/components/Modal",
            services: "/src/services",
            interfaces: "/src/utils/interfaces",
            declarations: "/src/services/declarations",
            profile: "/src/pages/ProfilePage",
            src: ".",
            ingredients: "/src/pages/IngredientDetailsPage",
            orders: "/src/pages/OrderDetailsPage",
        }
    },
})