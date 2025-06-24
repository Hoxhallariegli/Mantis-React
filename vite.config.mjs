import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import path from 'path';

export default defineConfig({
    server: {
        open: true,
        port: 3000,
        host: true
    },
    preview: {
        open: true,
        host: true
    },
    define: {
        global: 'window'
    },
    // base: '/pos/', // URL që përdor Laravel për të hyrë në React
    build: {
        outDir: path.resolve(__dirname, '../../../public/pos'), // ← output direkt në public/pos
        emptyOutDir: true // fshin automatikisht çfarë ka brenda pos/ para build-it
    },
    plugins: [react(), jsconfigPaths()]
});
