<script setup>
import { ref, inject, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// 移动端导航开关
const menuOpen = ref(false)
const toggleBtn = ref(null)

// 主题切换（由 App.vue 注入，见 provide/inject）
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')

// 导航菜单（使用 RouterLink 实现路由页面跳转）
const navItems = [
  { label: '首页', to: '/', exact: true },
  { label: '关于', to: '/about' },
  { label: '知识库', to: '/knowledge' },
  { label: '联系', to: '/contact' },
]

const route = useRoute()

// 当前页高亮：既用于样式（.active），也用于读屏（aria-current）
function isActive(item) {
  return item.exact ? route.path === item.to : route.path.startsWith(item.to)
}

// 按 Esc 关掉移动端菜单，并把焦点还回触发它的按钮
// （键盘用户关掉菜单后如果焦点丢在页面里，会找不到自己在哪）
function onKeydown(e) {
  if (e.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    toggleBtn.value?.focus()
  }
}

// 切页面后自动收起菜单，避免新页面上盖着一层菜单
watch(() => route.fullPath, () => { menuOpen.value = false })

// 2026-09-26 起：菜单改为「推挤式」——在文档流里把页面往下推，
// 头部栏和选项栏是一整块、随页面一体滚动，不再需要锁背景滚动
// （此前 fixed 覆盖 + 锁 body，用户反馈"头部栏锁定在顶部、不跟选项栏一起动"）。
</script>

<template>
  <header class="site-header" @keydown="onKeydown">
    <div class="container nav">
      <RouterLink to="/" class="nav-brand">{{ '刘博康' }}</RouterLink>
      <button
        ref="toggleBtn"
        class="nav-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-nav"
        :aria-label="menuOpen ? '收起导航菜单' : '展开导航菜单'"
        @click="menuOpen = !menuOpen"
      >
        ☰
      </button>
      <ul id="primary-nav" class="nav-links" :class="{ open: menuOpen }">
        <li v-for="item in navItems" :key="item.to">
          <RouterLink
            :to="item.to"
            :class="{ active: isActive(item) }"
            :aria-current="isActive(item) ? 'page' : undefined"
          >{{ item.label }}</RouterLink>
        </li>
        <li>
          <button
            class="theme-toggle"
            type="button"
            data-testid="theme-toggle"
            @click="toggleTheme"
            :aria-label="theme === 'dark' ? '切换为浅色模式' : '切换为深色模式'"
          >
            <span aria-hidden="true">{{ theme === 'dark' ? '☀️' : '🌙' }}</span>
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* 主题切换按钮样式见全局 style.css 的 .theme-toggle */
</style>
