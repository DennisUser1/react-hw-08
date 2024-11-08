import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/genderapi': {
        target: 'https://api.genderapi.io/api',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/genderapi/, ''),
      },
    },
  },
  resolve: {
    alias: {
      components: '/src/components',
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  optimizeDeps: {
    include: ['react-icons'], 
  },
});
