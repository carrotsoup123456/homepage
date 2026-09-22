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
  // 最小测试配置（Vitest）：在模拟浏览器环境里跑 tests/ 下的用例。
  // 只影响开发，不进入构建产物。
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.spec.js'],
  },
})
