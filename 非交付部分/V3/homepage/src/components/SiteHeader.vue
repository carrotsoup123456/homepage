<script setup>
import { ref, computed, inject, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

// 移动端导航开关
const menuOpen = ref(false)
const toggleBtn = ref(null)
const route = useRoute()
const router = useRouter()

// ---- 移动端导航菜单（仅 <=768px；桌面保持原布局）----
// 两行三列按钮网格：点按直达页面，当前页高亮。不做轮播——简单可靠。
const isMobile = ref(false)
let mq = null
function onMqChange(e) {
  isMobile.value = e.matches
}
onMounted(() => {
  if (typeof window.matchMedia === 'function') {
    mq = window.matchMedia('(max-width: 768px)')
    isMobile.value = mq.matches
    mq.addEventListener?.('change', onMqChange)
  }
})
onBeforeUnmount(() => {
  mq?.removeEventListener?.('change', onMqChange)
})
// 网格按钮点按：进页面 + 收菜单
function openNav(to) {
  menuOpen.value = false
  router.push(to)
}

// 访客足迹（v6.35）：与页脚共用同一计数徽章（同 page_id，SVG 不受 ORB 影响）
const visitVisible = ref(false)
const BADGE_URL =
  'https://visitor-badge.laobi.icu/badge?page_id=carrotsoup-homepage'

// 主题切换（由 App.vue 注入，见 provide/inject）；
// 默认值兜底：测试/独立挂载等没有父级 provide 的场合不至于点击报错
const theme = inject('theme', ref('light'))
const toggleTheme = inject('toggleTheme', () => {})

// 主题切换的「圆形扩散 / 原路收回」动画（View Transitions API）：
// 亮→暗：新主题从开关位置圆形扩散覆盖全屏；
// 暗→亮：旧主题（暗色）从全屏圆形收回开关位置，露出下面的亮色。
// 不支持 VT 的浏览器自动退回为普通切换（App.vue 里原有 350ms 颜色过渡兜底）。
function toggleThemeReveal(e) {
  const btn = e?.currentTarget || null
  const r = btn ? btn.getBoundingClientRect() : null
  const x = r ? r.left + r.width / 2 : window.innerWidth - 30
  const y = r ? r.top + r.height / 2 : 40
  const darkNow = theme.value === 'dark'
  if (typeof document.startViewTransition !== 'function') {
    toggleTheme()
    return
  }
  const html = document.documentElement
  html.classList.remove('vt-reveal', 'vt-retract')
  const vt = document.startViewTransition(() => {
    toggleTheme()
  })
  vt.ready.then(() => {
    const endR = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    html.classList.add(darkNow ? 'vt-retract' : 'vt-reveal')
    if (darkNow) {
      // 暗→亮：暗色画面（旧）原路收回
      html.animate(
        { clipPath: [`circle(${endR}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`] },
        { duration: 560, easing: 'ease-in-out', pseudoElement: '::view-transition-old(root)' }
      )
    } else {
      // 亮→暗：新主题从开关位置扩散
      html.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endR}px at ${x}px ${y}px)`] },
        { duration: 560, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      )
    }
  }).catch(() => {})
  vt.finished.finally(() => html.classList.remove('vt-reveal', 'vt-retract'))
}

// ---- 全站背景音乐开关（audio 挂在 App.vue，单例状态）----
import { useSiteBgm } from '../composables/useSiteBgm.js'
import { bgm } from '../data/music.js'
const { playing, togglePlay } = useSiteBgm()

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
      <!-- 汉堡按钮的小注释：告诉第一次来的访客这里能展开栏目（仅移动端显示） -->
      <span class="nav-hint" aria-hidden="true">点此处可以了解更多信息 →</span>
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
      <!-- 移动端：两行三列按钮网格 -->
      <ul v-if="isMobile" id="primary-nav" class="nav-grid" :class="{ open: menuOpen }">
        <li v-for="item in navItems" :key="item.to">
          <button
            type="button"
            class="grid-btn"
            :class="{ active: isActive(item) }"
            :aria-current="isActive(item) ? 'page' : undefined"
            @click="openNav(item.to)"
          >
            <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path v-for="(d, j) in item.icon" :key="j" :d="d" />
            </svg>
            <span>{{ item.label }}</span>
          </button>
        </li>
      </ul>
      <!-- 移动端：音乐/主题开关独立一行（不混进轮播序列） -->
      <div v-if="isMobile" class="wheel-extras" :class="{ open: menuOpen }">
        <!-- CD 机：唱片=背景音乐封面（播放时旋转），播音杆播放时搭上、停止时摆开 -->
        <span class="cd-player" :class="{ playing: playing }">
          <button
            type="button"
            class="bgm-toggle cd"
            :class="{ 'is-playing': playing }"
            data-testid="bgm-toggle"
            @click="togglePlay"
            :aria-label="playing ? '暂停背景音乐' : '播放背景音乐'"
            :aria-pressed="playing"
          >
            <img class="cd-disc" :src="bgm.cover" width="44" height="44" alt="" aria-hidden="true" />
            <span class="cd-hole" aria-hidden="true"></span>
          </button>
          <span class="tonearm" aria-hidden="true"></span>
        </span>
        <span v-show="visitVisible" class="visitor-chip">
          👣
          <img
            class="visit-badge"
            :src="BADGE_URL"
            alt="本站累计访问次数"
            @load="visitVisible = true"
            @error="visitVisible = false"
          />
        </span>
        <button
          class="theme-toggle"
          type="button"
          data-testid="theme-toggle"
          @click="toggleThemeReveal($event)"
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
            <path v-for="(d, i) in icons.moon" :key="i" :d="d" />
          </svg>
        </button>
      </div>

      <!-- 桌面端：原有横向链接布局 -->
      <ul v-else id="primary-nav" class="nav-links" :class="{ open: menuOpen }">
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
            type="button"
            class="bgm-toggle"
            :class="{ 'is-playing': playing }"
            data-testid="bgm-toggle"
            @click="togglePlay"
            :aria-label="playing ? '暂停背景音乐（雨中森林）' : '播放背景音乐（雨中森林）'"
            :aria-pressed="playing"
            :title="playing ? '暂停背景音乐' : '播放背景音乐'"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </button>
          <button
            class="theme-toggle"
            type="button"
            data-testid="theme-toggle"
            @click="toggleThemeReveal($event)"
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
