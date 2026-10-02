<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import ChatBot from './components/ChatBot.vue'
import PixelWave from './components/PixelWave.vue'
import { setPageMeta } from './data/meta.js'
import { bgm } from './data/music.js'
import { useSiteBgm } from './composables/useSiteBgm.js'

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

// ---- 主题（浅色 / 深色）----
// 优先级：手动选择（localStorage）> 系统深浅色。
// - 没手动选过的人：默认跟随系统，系统切换时页面实时跟着变（index.html 的
//   内联脚本负责首帧就定好，避免先白屏再变色）。
// - 手动点过切换按钮：锁定选择，之后不再跟系统变。
// 手动选择才写 localStorage——首访用户不被写成固定值，否则永远跟不了系统。
const THEME_KEY = 'homepage-theme'
const storedTheme = (() => {
  try {
    return localStorage.getItem(THEME_KEY)
  } catch {
    return null
  }
})()
const prefersDark =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = ref(storedTheme || (prefersDark ? 'dark' : 'light'))

function applyTheme(t, persist) {
  document.documentElement.dataset.theme = t
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, t)
    } catch {
      /* 隐私模式下 localStorage 不可用，忽略 */
    }
  }
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value, true)
  flashThemeTransition()
}

// 手动切换时挂一个短暂的「全站颜色过渡」class，350ms 后摘掉：
// 背景/卡片/边框一起平滑变色，但不会常驻过渡拖慢滚动性能。
let themeTransTimer = null
function flashThemeTransition() {
  document.documentElement.classList.add('theme-transition')
  clearTimeout(themeTransTimer)
  themeTransTimer = setTimeout(
    () => document.documentElement.classList.remove('theme-transition'),
    380
  )
}

onMounted(() => {
  applyTheme(theme.value, false)
  // 没手动选过的人：跟随系统深浅色实时变化
  if (window.matchMedia) {
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)')
    sysDark.addEventListener('change', (e) => {
      if (!storedTheme) {
        theme.value = e.matches ? 'dark' : 'light'
        applyTheme(theme.value, false)
      }
    })
  }
  window.addEventListener('scroll', onBarScroll, { passive: true })
  window.addEventListener('resize', onBarScroll, { passive: true })
  updateProgress()
  // 全站 BGM：进站自动尝试播放（含首次交互兜底），详见 useSiteBgm.js
  attachBgm(bgmAudioEl.value)
})

// 提供主题给子组件（Header 的切换按钮）
provide('theme', theme)
provide('toggleTheme', toggleTheme)

// ---- 「跳到主要内容」 ----
// 本站在用 hash 路由（地址形如 #/about），如果让链接真的跳 #main，
// 浏览器会改地址、路由会以为要切到 /main 页面。
// 所以这里拦掉默认行为，直接把键盘焦点交给主内容区。
// ---- 全站背景音乐（雨中森林）----
// <audio> 挂在 App 层：路由切换不销毁，全站每个页面都有配乐。
// 控制（播放/暂停/音量）在音乐页；行为规则见 composables/useSiteBgm.js。
const bgmAudioEl = ref(null)
const { attach: attachBgm, onTimeUpdate: onBgmTimeUpdate } = useSiteBgm()

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
    <PixelWave />
  <!-- 全站背景音乐：雨声森林（音乐页可控制） -->
  <audio
    ref="bgmAudioEl"
    :src="bgm.src"
    loop
    preload="auto"
    @timeupdate="onBgmTimeUpdate"
    aria-label="全站背景音乐：雨中森林"
  ></audio>
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
