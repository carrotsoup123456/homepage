import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base = GitHub Pages 子路径（仓库名 homepage）。
// 用环境变量 VITE_BASE 可覆盖（本地 dev 默认 '/'）。
export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE || '/homepage/',
  server: {
    port: 5174,
    host: true,
  },
})
