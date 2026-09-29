<template>
  <!-- 点击涟漪像素波：全屏氛围层，不挡任何交互 -->
  <canvas ref="cv" class="pixel-wave" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ---- 参数（克制为上）----
const CELL = 18 // 网格步长：波经过的方块都对齐这张网格，才有"像素场"的整齐感
const BLOCK = 14 // 方块边长（留 4px 缝隙，点阵感而不是实心圆环）
const SPEED = 280 // 扩散速度 px/s：配合 220px 半径，单波寿命约 0.8s
const R_MAX = 220 // 到这个半径完全消失：参考常见点击涟漪的克制尺度，
  // 点击点周围一小圈就散掉，不惊动页面其他内容
const PEAK = 0.4 // 峰值透明度：颜色不深，但要有存在感
// 三道波带：主波最亮，两条尾波渐弱——有层次而不是一根孤零零的线
const BANDS = [
  { off: 0, amp: 1.0 },
  { off: -30, amp: 0.55 },
  { off: -60, amp: 0.28 },
]
const SIGMA = 11 // 每道波带的宽度（高斯包络），配小波更精致
const MAX_WAVES = 6 // 并发上限，狂点也不刷屏

const cv = ref(null)
let ctx = null
let waves = []
let raf = 0
let green = '#4a8a5c'

function spawnAt(x, y) {
  waves.push({ x, y, t0: performance.now() })
  if (waves.length > MAX_WAVES) waves.shift()
  if (!raf) raf = requestAnimationFrame(draw)
}

// ---- 持续接触连发 ----
// 手指/鼠标按住不放：每单位时间在「当前接触位置」续一个波。
// 这样手机上滑动时不是原地一个孤波，而是一路点过去一路涟漪。
const HOLD_EVERY = 300 // ms：接触期间每 300ms 一个新波
let holdTimer = null
let lastX = 0
let lastY = 0

function onDown(e) {
  // 触屏不走这套：滑动时浏览器会 pointercancel（接管滚动），连发会被掐断——
  // 触屏有专门的 touch 通道（passive，不与滚动打架）
  if (e.pointerType === 'touch') return
  lastX = e.clientX
  lastY = e.clientY
  spawnAt(lastX, lastY)
  clearInterval(holdTimer)
  holdTimer = setInterval(() => spawnAt(lastX, lastY), HOLD_EVERY)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onHoldEnd)
  window.addEventListener('pointercancel', onHoldEnd)
}

function onMove(e) {
  // 只更新接触点位置，出波节奏交给定时器——移动快时波距自然拉开
  lastX = e.clientX
  lastY = e.clientY
}

function onHoldEnd() {
  clearInterval(holdTimer)
  holdTimer = null
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onHoldEnd)
  window.removeEventListener('pointercancel', onHoldEnd)
}

// ---- 触屏通道：touch 事件即使页面正在滚动也会持续派发 touchmove ----
// 所以滑动时波能跟着手指一路冒，而不是在按下的原位留一个孤波。
function onTouchStart(e) {
  const t = e.changedTouches[0]
  if (!t) return
  lastX = t.clientX
  lastY = t.clientY
  spawnAt(lastX, lastY)
  clearInterval(holdTimer)
  holdTimer = setInterval(() => spawnAt(lastX, lastY), HOLD_EVERY)
}

function onTouchMove(e) {
  const t = e.changedTouches[0]
  if (!t) return
  lastX = t.clientX
  lastY = t.clientY
}

function onTouchEnd(e) {
  // 多指时等最后一根抬起才停（简化：波跟最后按下/移动的那根手指）
  if (e.touches.length === 0) {
    clearInterval(holdTimer)
    holdTimer = null
  }
}

function draw() {
  raf = 0
  if (!ctx) return
  const w = window.innerWidth
  const h = window.innerHeight
  ctx.clearRect(0, 0, w, h)
  const now = performance.now()
  waves = waves.filter((wv) => ((now - wv.t0) / 1000) * SPEED < R_MAX)
  if (waves.length === 0) return

  ctx.fillStyle = green
  for (const wv of waves) {
    const r = ((now - wv.t0) / 1000) * SPEED
    const fade = 1 - r / R_MAX // 距离越远越淡，到 R_MAX 归零
    if (fade <= 0) continue
    // 只遍历波带附近的格子（r±90px 的外接范围）
    const i0 = Math.floor((wv.x - r - 70) / CELL)
    const i1 = Math.ceil((wv.x + r + 70) / CELL)
    const j0 = Math.floor((wv.y - r - 70) / CELL)
    const j1 = Math.ceil((wv.y + r + 70) / CELL)
    for (let i = i0; i <= i1; i++) {
      const cx = i * CELL + CELL / 2
      const dx = cx - wv.x
      for (let j = j0; j <= j1; j++) {
        const cy = j * CELL + CELL / 2
        const dy = cy - wv.y
        const d = Math.sqrt(dx * dx + dy * dy)
        // 三道波带的高斯包络叠加
        let a = 0
        for (const b of BANDS) {
          const t = (d - (r + b.off)) / SIGMA
          a += b.amp * Math.exp(-t * t)
        }
        a *= PEAK * fade
        if (a < 0.015) continue
        ctx.globalAlpha = a
        ctx.fillRect(cx - BLOCK / 2, cy - BLOCK / 2, BLOCK, BLOCK)
      }
    }
  }
  ctx.globalAlpha = 1
  raf = requestAnimationFrame(draw)
}

function onResize() {
  if (!cv.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  cv.value.width = window.innerWidth * dpr
  cv.value.height = window.innerHeight * dpr
  // jsdom 等无 canvas 实现的环境里 getContext 返回 null——整个组件休眠
  ctx = cv.value.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  onResize()
  if (!ctx) return
  green = getComputedStyle(document.documentElement).getPropertyValue('--wave-color').trim() || green
  window.addEventListener('resize', onResize)
  window.addEventListener('pointerdown', onDown)
  // 触屏三件套全部 passive：不 preventDefault，页面滚动完全不受影响
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
})

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  onHoldEnd()
  clearInterval(holdTimer)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>

<style scoped>
.pixel-wave {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  /* 内容之上、界面（导航/对话面板/回到顶部）之下：波从 UI 底下过，不穿透界面 */
  z-index: 99;
  pointer-events: none;
}
</style>
