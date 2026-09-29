<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import ChatBot from './components/ChatBot.vue'
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

// ---- 顶部阅读进度条（所有页面通用，rAF 节流） ----
const progress = ref(0)
let barTicking = false
function updateProgress() {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
  barTicking = false
}
function onBarScroll() {
  if (!barTicking) {
    barTicking = true
    requestAnimationFrame(updateProgress)
  }
}

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

onMounted(() => {
  applyTheme(theme.value)
  window.addEventListener('scroll', onBarScroll, { passive: true })
  window.addEventListener('resize', onBarScroll, { passive: true })
  updateProgress()
})

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
  <div class="reading-bar" aria-hidden="true"><span :style="{ width: progress + '%' }"></span></div>
  <SiteHeader />
  <main id="main" ref="mainEl" class="app-main" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <ChatBot />
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
/* 顶部阅读进度条：细线随滚动填充，指针不拦截点击 */
.reading-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 1200;
  pointer-events: none;
}
.reading-bar span {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--color-green), var(--color-primary));
  transition: width 0.12s linear;
}
@media (prefers-reduced-motion: reduce) {
  .reading-bar span {
    transition: none;
  }
}
</style>
