<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// 移动端导航开关
const menuOpen = ref(false)

// 主题切换（由 App.vue 注入，见 provide/inject）
import { inject } from 'vue'
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')

// 导航菜单（使用 RouterLink 实现路由页面跳转）
const navItems = [
  { label: '首页', to: '/', active: '/', exact: true },
  { label: '关于', to: '/about' },
  { label: '知识库', to: '/knowledge' },
  { label: '联系', to: '/contact' },
]
</script>

<template>
  <header class="site-header">
    <div class="container nav">
      <RouterLink to="/" class="nav-brand" @click="menuOpen = false">
        {{ '刘博康' }}
      </RouterLink>
      <button class="nav-toggle" aria-label="菜单" @click="menuOpen = !menuOpen">
        ☰
      </button>
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li v-for="item in navItems" :key="item.to">
          <RouterLink
            :to="item.to"
            @click="menuOpen = false"
            :class="{ active: $route.path === item.to }"
          >{{ item.label }}</RouterLink>
        </li>
        <li>
          <button
            class="theme-toggle"
            data-testid="theme-toggle"
            @click="toggleTheme"
            :aria-label="theme === 'dark' ? '切换为浅色模式' : '切换为深色模式'"
          >
            {{ theme === 'dark' ? '☀️' : '🌙' }}
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* 主题切换按钮样式见全局 style.css 的 .theme-toggle */
</style>
