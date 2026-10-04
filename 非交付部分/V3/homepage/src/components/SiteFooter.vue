<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 返回顶部：监听滚动，超过阈值显示按钮
const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 400
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  loadBusuanzi()
})

// 访客足迹：不蒜子计数服务（GitHub Pages 纯静态站的标准做法，免自建后端）。
// 脚本加载失败（服务不可用/被拦截）时把整行藏起来，不显示破相的"—"。
const visitVisible = ref(false)
function loadBusuanzi() {
  const el = document.createElement('script')
  el.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
  el.async = true
  el.onload = () => {
    // 不蒜子值是异步回填到 span 里的，等它填出数字再显示整行
    const timer = setInterval(() => {
      const uv = document.getElementById('busuanzi_value_site_uv')
      if (uv && /^\d+$/.test(uv.textContent.trim())) {
        visitVisible.value = true
        clearInterval(timer)
      }
    }, 300)
    setTimeout(() => clearInterval(timer), 8000)
  }
  document.head.appendChild(el)
}
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// 注意：Vue 模板表达式里访问不到 window 全局对象，
// 原来写成 @click="window.scrollTo(...)" 时 window 是 undefined，点击直接报错，
// 所以按钮此前从未真正生效（所有设备都一样）。滚动逻辑必须放在方法里。
function toTop() {
  // iOS Safari < 15.4 不认识 { behavior } 对象参数，做个兜底
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch {
    window.scrollTo(0, 0)
  }
}
</script>

<template>
  <footer class="site-footer">
    <!-- 胡萝卜坑：页脚上沿的一排土坑，坑里露出一根根胡萝卜头（carrotsoup 本命） -->
    <svg class="footer-carrots" viewBox="0 0 1200 44" preserveAspectRatio="none" aria-hidden="true">
<g transform="translate(42.0,0) rotate(2.9,0,44) scale(1.02)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 -7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="15.6" cy="43.2" r="1.1" fill="#4a3b26"/>
        <circle cx="-15.6" cy="43.5" r="1.3" fill="#4a3b26"/>
      </g>
      <g transform="translate(154.9,0) rotate(-1.0,0,44) scale(0.92)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="12.4" cy="43.2" r="1.7" fill="#4a3b26"/>
        <circle cx="-13.4" cy="43.5" r="1.1" fill="#4a3b26"/>
      </g>
      <g transform="translate(243.1,0) rotate(-1.0,0,44) scale(0.86)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="16.0" cy="43.2" r="1.5" fill="#4a3b26"/>
        <circle cx="-13.8" cy="43.5" r="1.6" fill="#4a3b26"/>
      </g>
      <g transform="translate(353.9,0) rotate(0.5,0,44) scale(0.94)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="15.0" cy="43.2" r="1.3" fill="#4a3b26"/>
        <circle cx="-17.2" cy="43.5" r="1.4" fill="#4a3b26"/>
      </g>
      <g transform="translate(452.9,0) rotate(-3.6,0,44) scale(0.99)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 -7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="13.1" cy="43.2" r="1.0" fill="#4a3b26"/>
        <circle cx="-13.8" cy="43.5" r="0.9" fill="#4a3b26"/>
      </g>
      <g transform="translate(566.9,0) rotate(0.9,0,44) scale(0.95)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="11.5" cy="43.2" r="1.4" fill="#4a3b26"/>
        <circle cx="-15.6" cy="43.5" r="0.9" fill="#4a3b26"/>
      </g>
      <g transform="translate(664.5,0) rotate(0.0,0,44) scale(0.93)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="13.2" cy="43.2" r="1.7" fill="#4a3b26"/>
        <circle cx="-17.9" cy="43.5" r="1.0" fill="#4a3b26"/>
      </g>
      <g transform="translate(769.4,0) rotate(-2.1,0,44) scale(0.90)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 -7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="14.2" cy="43.2" r="1.0" fill="#4a3b26"/>
        <circle cx="-15.7" cy="43.5" r="1.5" fill="#4a3b26"/>
      </g>
      <g transform="translate(880.5,0) rotate(0.4,0,44) scale(1.08)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 -7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="15.4" cy="43.2" r="1.1" fill="#4a3b26"/>
        <circle cx="-16.9" cy="43.5" r="1.5" fill="#4a3b26"/>
      </g>
      <g transform="translate(992.1,0) rotate(-1.9,0,44) scale(1.05)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="16.3" cy="43.2" r="0.9" fill="#4a3b26"/>
        <circle cx="-13.2" cy="43.5" r="1.1" fill="#4a3b26"/>
      </g>
      <g transform="translate(1099.2,0) rotate(4.7,0,44) scale(1.01)">
        <ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26"/>
        <ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114"/>
        <path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e"/>
        <path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
        <path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74"/>
        <path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a"/>
        <path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74"/>
        <circle cx="16.9" cy="43.2" r="1.3" fill="#4a3b26"/>
        <circle cx="-15.5" cy="43.5" r="1.3" fill="#4a3b26"/>
      </g>
    </svg>
    <p>© 2026 刘博康 · 个人主页 V3</p>
    <p v-show="visitVisible" class="visit-count">
      👣 第 <span id="busuanzi_value_site_uv"></span> 位访客 · 累计
      <span id="busuanzi_value_site_pv"></span> 次访问
    </p>

    <!-- 返回顶部按钮 -->
    <Transition name="fade">
      <button
        v-if="showTop"
        class="back-to-top"
        aria-label="返回顶部"
        @click="toTop"
      >
        ↑
      </button>
    </Transition>
  </footer>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 28px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(60, 84, 104, 0.3);
  transition: transform 0.15s, background 0.2s;
  z-index: 50;
}
.visit-count {
  margin-top: 6px;
  font-size: 0.8rem;
  /* footer 是固定深底（两个主题都 #14130e/#070a06），不能用主题 muted——
     浅色主题下 #6e685b 在深底上只有 3.35:1。固定浅次要色：两底色上 7.6/8.1:1 */
  color: #ada595;
}
.back-to-top:hover {
  transform: translateY(-3px);
  background: var(--color-primary-dark);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
