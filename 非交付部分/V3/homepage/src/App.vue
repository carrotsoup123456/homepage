<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { setPageMeta } from './data/meta.js'

// ---- 页面标题与分享信息 ----
// 放在最外层组件而不是路由钩子里：它总是存在，
// 而且会在子页面渲染「之前」先写好通用标题，子页面再按自己的数据覆盖成更具体的。
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    setPageMeta({ title: route.meta?.title, desc: route.meta?.desc, path: route.path })
  },
  { immediate: true }
)

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

// ---- 「跳到主要内容」 ----
// 本站在用 hash 路由（地址形如 #/about），如果让链接真的跳 #main，
// 浏览器会改地址、路由会以为要切到 /main 页面。
// 所以这里拦掉默认行为，直接把键盘焦点交给主内容区。
const mainEl = ref(null)
function skipToMain(e) {
  e.preventDefault()
  mainEl.value?.focus()
  // 测试环境（jsdom）没有实现 scrollIntoView，加可选调用避免测试里报错
  mainEl.value?.scrollIntoView?.({ block: 'start' })
}
</script>

<template>
  <a class="skip-link" href="#main" @click="skipToMain">跳到主要内容</a>
  <SiteHeader />
  <main id="main" ref="mainEl" class="app-main" tabindex="-1">
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
/* 焦点是被程序移进来的，不画外框；用户自己按 Tab 过来时仍然有可见焦点 */
.app-main:focus {
  outline: none;
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
