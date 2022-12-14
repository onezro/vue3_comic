import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  Components({
    resolvers: [VantResolver()],
  }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.kuaikanmanhua.com', // 实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      '/apione': {
        target: 'http://m.kuaikanmanhua.com', // 实际请求地址
        changeOrigin: true,
        ws:true,
        rewrite: (path) => path.replace(/^\/apione/, ""),
      },
    },
  },
});
