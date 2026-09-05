<script setup>
import { ref, provide, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

// ---- 主题切换（浅色 / 深色），localStorage 持久化 ----
const THEME_KEY = 'homepage-theme'
const theme = ref(localStorage.getItem(THEME_KEY) || 'light')

function applyTheme(t) {
  document.documentElement.dataset.theme = t
  localStorage.setItem(THEME_KEY, t)
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
}

onMounted(() => applyTheme(theme.value))

// 提供主题给子组件（Header 的切换按钮）
provide('theme', theme)
provide('toggleTheme', toggleTheme)
</script>

<template>
  <SiteHeader />
  <main class="app-main">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style scoped>
.app-main {
  min-height: 70vh;
}
/* 页面切换过渡 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
