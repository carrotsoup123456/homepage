<template>
  <!-- 点击涟漪像素波：全屏氛围层，不挡任何交互 -->
  <canvas ref="cv" class="pixel-wave" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ---- 参数（克制为上）----
const CELL = 18 // 网格步长：波经过的方块都对齐这张网格，才有"像素场"的整齐感
const BLOCK = 14 // 方块边长（留 4px 缝隙，点阵感而不是实心圆环）
const SPEED = 420 // 扩散速度 px/s：从点击处到 620px 约 1.5s，不急不躁
const R_MAX = 620 // 到这个半径完全消失：波不会横扫整屏
const PEAK = 0.4 // 峰值透明度：颜色不深，但要有存在感
// 三道波带：主波最亮，两条尾波渐弱——有层次而不是一根孤零零的线
const BANDS = [
  { off: 0, amp: 1.0 },
  { off: -38, amp: 0.55 },
  { off: -76, amp: 0.28 },
]
const SIGMA = 13 // 每道波带的宽度（高斯包络）
const MAX_WAVES = 6 // 并发上限，狂点也不刷屏

const cv = ref(null)
let ctx = null
let waves = []
let raf = 0
let green = '#4a8a5c'

function spawn(e) {
  waves.push({ x: e.clientX, y: e.clientY, t0: performance.now() })
  if (waves.length > MAX_WAVES) waves.shift()
  if (!raf) raf = requestAnimationFrame(draw)
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
    const i0 = Math.floor((wv.x - r - 90) / CELL)
    const i1 = Math.ceil((wv.x + r + 90) / CELL)
    const j0 = Math.floor((wv.y - r - 90) / CELL)
    const j1 = Math.ceil((wv.y + r + 90) / CELL)
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
  window.addEventListener('pointerdown', spawn)
})

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointerdown', spawn)
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
