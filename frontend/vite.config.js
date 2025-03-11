import { defineConfig } from "vite";

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        sourcemap: true,
    },
    server: {
        port: 3000,
        open: false,
        cors: true,
    },
})