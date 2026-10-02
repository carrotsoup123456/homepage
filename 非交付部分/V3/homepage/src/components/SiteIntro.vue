<script setup>
// ======================================================
// 进站开场动画：云层 → 点击进入 → 镜头下拉穿云 →
// 树冠俯瞰 → 推进定格在首页森林背景
// ------------------------------------------------------
// 两个作用：
// 1. 进站仪式感（运镜参考 Valley 落地页：云 → 树冠 → 森林）
// 2. 「点击进入」= 访客首次交互手势 → 全局 BGM（圆舞曲）
//    借此合法解锁浏览器自动播放限制（useSiteBgm 的
//    firstGesturePlay 在 window 捕获层监听 pointerdown）。
// 每个会话只出现一次（sessionStorage）；本会话已明确
// 关闭过 BGM 的访客点击后不会自动响音乐。
// prefers-reduced-motion：跳过动画直接进站。
// ======================================================
import { ref, onMounted } from 'vue'

const INTRO_KEY = 'homepage-intro-done'
const base = import.meta.env.BASE_URL
// 三层运镜图（内联 style 绑定：v-bind 裸字符串不会生成 url() 包裹）
const cloudUrl = `url(${base}intro/cloud.webp)`
const canopyUrl = `url(${base}intro/canopy.webp)`
const forestUrl = `url(${base}art/hero-forest.webp)`

const show = ref(false)
// 状态机：cloud(等待点击) → dive(云散+树冠显现) → settle(推进定格森林) → fade(整体淡出) → done
const phase = ref('cloud')

onMounted(() => {
  try {
    if (sessionStorage.getItem(INTRO_KEY) === '1') return
  } catch {
    /* 隐私模式忽略，照常显示 */
  }
  if (typeof window.matchMedia === 'function') {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  }
  show.value = true
})

function enter() {
  if (phase.value !== 'cloud') return
  // 点击本身就是 user gesture：全局 firstGesturePlay（capture）
  // 会自动尝试起播 BGM，这里只负责推进动画。
  phase.value = 'dive'
  setTimeout(() => {
    phase.value = 'settle'
  }, 1500)
  setTimeout(() => {
    phase.value = 'fade'
  }, 3100)
  setTimeout(() => {
    phase.value = 'done'
    show.value = false
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* ignore */
    }
  }, 4000)
}
</script>

<template>
  <div
    v-if="show"
    class="site-intro"
    :class="`intro-${phase}`"
    role="button"
    tabindex="0"
    aria-label="点击进入个人主页（进入后播放背景音乐）"
    @click="enter"
    @keydown.enter="enter"
  >
    <!-- 三层运镜：云层（起点）/ 树冠（中段）/ 森林（定格=首页背景） -->
    <div class="intro-layer intro-cloud" :style="{ backgroundImage: cloudUrl }" aria-hidden="true"></div>
    <div class="intro-layer intro-canopy" :style="{ backgroundImage: canopyUrl }" aria-hidden="true"></div>
    <div class="intro-layer intro-forest" :style="{ backgroundImage: forestUrl }" aria-hidden="true"></div>

    <!-- 云写的「点击进入」 -->
    <div class="intro-cta" aria-hidden="true">
      <span class="cta-text">点击进入</span>
      <span class="cta-sub">进入后将播放背景音乐</span>
    </div>
  </div>
</template>

<style scoped>
.site-intro {
  position: fixed;
  inset: 0;
  z-index: 3000;
  overflow: hidden;
  cursor: pointer;
  background: #d8d2c4;
}
.intro-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  will-change: transform, opacity;
}
.intro-cloud {
  transform: scale(1.06);
  animation: intro-breathe 8s ease-in-out infinite;
}
.intro-canopy {
  opacity: 0;
  transform: scale(1.3) translateY(10%);
}
.intro-forest {
  opacity: 0;
  transform: scale(1.35);
}

/* ---- 阶段 1：云层上等待点击 ---- */
.intro-cta {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  transition: opacity 0.4s ease;
}
.cta-text {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: clamp(30px, 6vw, 58px);
  font-weight: 600;
  letter-spacing: 0.38em;
  text-indent: 0.38em; /* 抵消末字距，视觉居中 */
  color: #fff;
  text-shadow:
    0 0 16px rgb(255 255 255 / 85%),
    0 0 42px rgb(255 255 255 / 50%),
    0 4px 28px rgb(150 145 130 / 45%);
  animation:
    cta-emerge 1.3s ease-out 0.35s both,
    cta-drift 5.5s ease-in-out 1.8s infinite;
}
@keyframes cta-emerge {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}
.cta-sub {
  font-size: 13px;
  letter-spacing: 0.2em;
  color: rgb(255 255 255 / 78%);
  text-shadow: 0 1px 12px rgb(120 115 100 / 50%);
}
@keyframes cta-drift {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes intro-breathe {
  0%, 100% { transform: scale(1.06); }
  50% { transform: scale(1.1); }
}

/* ---- 阶段 2：dive——云向上散去（镜头下拉），树冠从下方显现 ---- */
.intro-dive .intro-cloud {
  animation: none;
  transform: scale(1.22);
  opacity: 0;
  transition: transform 1.5s cubic-bezier(0.45, 0, 0.55, 1), opacity 1.5s ease;
}
.intro-dive .intro-canopy {
  opacity: 1;
  transform: scale(1.16);
  transition: transform 1.5s cubic-bezier(0.45, 0, 0.55, 1) 0.25s, opacity 1.25s ease 0.25s;
}
.intro-dive .intro-cta,
.intro-settle .intro-cta,
.intro-fade .intro-cta {
  opacity: 0;
}

/* ---- 阶段 3：settle——树冠继续推近，森林（首页背景）淡入定格 ---- */
.intro-settle .intro-cloud {
  opacity: 0;
  transform: scale(1.22);
}
.intro-settle .intro-canopy {
  opacity: 1;
  transform: scale(1.3);
  transition: transform 1.6s cubic-bezier(0.4, 0.1, 0.5, 1);
}
.intro-settle .intro-forest {
  opacity: 1;
  transform: scale(1.08);
  transition: transform 1.6s cubic-bezier(0.4, 0.1, 0.5, 1) 0.4s, opacity 1.3s ease 0.4s;
}

/* ---- 阶段 4：fade——整体淡出，露出（背景同图的）首页 ---- */
.intro-fade {
  opacity: 0;
  transition: opacity 0.9s ease;
}
.intro-fade .intro-canopy,
.intro-fade .intro-cloud {
  opacity: 0;
}
.intro-fade .intro-forest {
  opacity: 1;
  transform: scale(1.04);
  transition: transform 0.9s ease;
}

/* 无动画偏好像：直接可用 */
@media (prefers-reduced-motion: reduce) {
  .site-intro { display: none; }
}
</style>
