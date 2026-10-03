<script setup>
import { ref, inject, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

// 移动端导航开关
const menuOpen = ref(false)
const toggleBtn = ref(null)
const route = useRoute()
const router = useRouter()

// ---- 移动端横向吸附轮播菜单（仅 <=768px；桌面保持原布局）----
// 交互：scroll-snap 强制把一个按钮吸附到屏幕水平中心；中心项放大高亮，
// 两侧缩小变淡；一次滑动只切换一项（scroll-snap-stop: always）。
// 点非中心项=把它滚到中心选中；点中心项=跳转页面。
const isMobile = ref(false)
let mq = null
const activeIdx = ref(0)
const wheelEl = ref(null)
const itemEls = ref([])

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
  if (wheelRaf) cancelAnimationFrame(wheelRaf)
})

// 打开菜单时：把当前页对应的项滚到中心（不加动画，直接落位）
watch(menuOpen, async (open) => {
  if (!open || !isMobile.value) return
  await nextTick()
  const idx = navItems.findIndex((it) => isActive(it))
  if (idx >= 0) centerItem(idx, false)
})

function centerItem(idx, smooth = true) {
  const el = itemEls.value[idx]
  const box = wheelEl.value
  if (!el || !box) return
  box.scrollTo({
    left: el.offsetLeft + el.offsetWidth / 2 - box.clientWidth / 2,
    behavior: smooth ? 'smooth' : 'auto',
  })
  activeIdx.value = idx
}

// 滚动中实时找离中心最近的项 = 激活态（rAF 节流）
let wheelRaf = 0
function onWheelScroll() {
  if (wheelRaf) return
  wheelRaf = requestAnimationFrame(() => {
    wheelRaf = 0
    const box = wheelEl.value
    if (!box) return
    const center = box.scrollLeft + box.clientWidth / 2
    let best = 0
    let bestD = Infinity
    itemEls.value.forEach((el, i) => {
      if (!el) return
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
      if (d < bestD) {
        bestD = d
        best = i
      }
    })
    activeIdx.value = best
  })
}

// 点非中心项：滚到中心选中；点中心项：进入该页面
function tapItem(idx, item) {
  if (activeIdx.value === idx) {
    menuOpen.value = false
    router.push(item.to)
  } else {
    centerItem(idx)
  }
}

// 主题切换（由 App.vue 注入，见 provide/inject）
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')

// ---- 全站背景音乐开关（audio 挂在 App.vue，单例状态）----
import { useSiteBgm } from '../composables/useSiteBgm.js'
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
      <!-- 移动端：横向吸附轮播菜单（点非中心项=选中滚到中心；点中心项=进入） -->
      <ul
        v-if="isMobile"
        id="primary-nav"
        ref="wheelEl"
        class="nav-wheel"
        :class="{ open: menuOpen }"
        @scroll.passive="onWheelScroll"
      >
        <li
          v-for="(item, i) in navItems"
          :key="item.to"
          :ref="(el) => (itemEls[i] = el)"
          class="wheel-item"
          :class="{ center: activeIdx === i }"
        >
          <button type="button" class="wheel-btn" :aria-current="activeIdx === i ? 'true' : undefined" @click="tapItem(i, item)">
            <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path v-for="(d, j) in item.icon" :key="j" :d="d" />
            </svg>
            <span>{{ item.label }}</span>
          </button>
        </li>
      </ul>
      <!-- 移动端：音乐/主题开关独立一行（不混进轮播序列） -->
      <div v-if="isMobile" class="wheel-extras" :class="{ open: menuOpen }">
        <button
          type="button"
          class="bgm-toggle"
          :class="{ 'is-playing': playing }"
          data-testid="bgm-toggle"
          @click="togglePlay"
          :aria-label="playing ? '暂停背景音乐' : '播放背景音乐'"
          :aria-pressed="playing"
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
