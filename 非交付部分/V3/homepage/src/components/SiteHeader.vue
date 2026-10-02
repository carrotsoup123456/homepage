<script setup>
import { ref, inject, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// 移动端导航开关
const menuOpen = ref(false)
const toggleBtn = ref(null)

// 主题切换（由 App.vue 注入，见 provide/inject）
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')

// 导航图标：手绘 1.8px 线条小图（24 网格），随文字颜色变色（currentColor）。
// 统一圆头线帽，与全站圆润气质一致。
const icons = {
  home: ['M4 11.5 L12 4.5 L20 11.5', 'M6.5 10 V19.5 H17.5 V10', 'M10 19.5 V14.5 H14 V19.5'],
  // 关于 = 递出的名片（ID 卡：人像 + 两行信息）
  card: [
    'M4.5 5.5 H19.5 A1.5 1.5 0 0 1 21 7 V17 A1.5 1.5 0 0 1 19.5 18.5 H4.5 A1.5 1.5 0 0 1 3 17 V7 A1.5 1.5 0 0 1 4.5 5.5 Z',
    'M10.1 9.2 A1.9 1.9 0 1 1 6.3 9.2 A1.9 1.9 0 1 1 10.1 9.2',
    'M5.5 16.4 C5.5 14.2 6.8 13.2 8.2 13.2 C9.6 13.2 10.9 14.2 10.9 16.4',
    'M13.5 9 H18.3 M13.5 12 H16.6',
  ],
  book: [
    'M12 6.4 C10.2 4.9 7.4 4.3 4.2 4.3 V19 C7.4 19 10.2 19.6 12 21 C13.8 19.6 16.6 19 19.8 19 V4.3 C16.6 4.3 13.8 4.9 12 6.4 V21',
  ],
  // 歌单 = 八分音符（符干 + 两个符头）
  note: ['M9.5 17.5 V4.5 L19 3 V15.5', 'M9.5 17.5 A2.8 2.8 0 1 1 6.7 14.7 A2.8 2.8 0 1 1 9.5 17.5', 'M19 15.5 A2.8 2.8 0 1 1 16.2 12.7 A2.8 2.8 0 1 1 19 15.5'],
  game: ['M7.5 8 H16.5 C19 8 21 10 21 12.5 C21 15 19 17 16.5 17 H7.5 C5 17 3 15 3 12.5 C3 10 5 8 7.5 8 Z', 'M8 10.5 V14.5 M6 12.5 H10'],
  mail: ['M4 6.5 H20 V17.5 H4 Z', 'M4.5 8 L12 13.5 L19.5 8'],
  sun: ['M12 8 A4 4 0 1 0 12 16 A4 4 0 1 0 12 8', 'M12 3 V5 M12 19 V21 M3 12 H5 M19 12 H21 M5.6 5.6 L7 7 M17 17 L18.4 18.4 M18.4 5.6 L17 7 M7 17 L5.6 18.4'],
  moon: ['M20 14.5 A8 8 0 1 1 10.5 4 A6.5 6.5 0 0 0 20 14.5 Z'],
}

// 导航菜单（使用 RouterLink 实现路由页面跳转）
const navItems = [
  { label: '首页', to: '/', exact: true, icon: icons.home },
  { label: '关于', to: '/about', icon: icons.card },
  { label: '知识库', to: '/knowledge', icon: icons.book },
  { label: '音乐', to: '/music', icon: icons.note },
  { label: '试玩', to: '/play', icon: icons.game },
  { label: '联系', to: '/contact', icon: icons.mail },
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
          >
            <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path v-for="(d, i) in item.icon" :key="i" :d="d" />
            </svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
        <li>
          <button
            class="theme-toggle"
            type="button"
            data-testid="theme-toggle"
            @click="toggleTheme"
            :aria-label="theme === 'dark' ? '切换为浅色模式' : '切换为深色模式'"
            :aria-pressed="theme === 'dark'"
          >
            <svg
              v-if="theme === 'dark'"
              class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"
            >
              <path v-for="(d, i) in icons.sun" :key="i" :d="d" />
            </svg>
            <svg
              v-else
              class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
            >
              <path :d="icons.moon[0]" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* 主题切换按钮样式见全局 style.css 的 .theme-toggle */
</style>
