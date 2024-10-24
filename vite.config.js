import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import fs from 'fs'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: 'dev.yigee.cn',
    port: 5173,
    https: {
      key: fs.readFileSync('./cert/yigee.cn.key'),
      cert: fs.readFileSync('./cert/yigee.cn.pem'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'npmYigeeLogin',
      fileName: 'npm-yigee-login',
    },
    rollupOptions: {
      external: [
        'vue',
        'pinia',
        'axios',
        'crypto-js',
        'element-plus',
        'universal-cookie',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
