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
    <!-- 草丛剪影：页脚上沿长出的一排草叶，森林气质的收尾 -->
    <svg class="footer-grass" viewBox="0 0 1200 44" preserveAspectRatio="none" aria-hidden="true">
      <g fill="currentColor">
        <path d="M30,44 C29,33 31,24 36,15 C37,26 34,35 36,44 Z" />
        <path d="M95,44 C93,30 97,18 104,7 C105,20 99,32 103,44 Z" />
        <path d="M160,44 C159,35 161,27 165,19 C166,28 163,36 165,44 Z" />
        <path d="M230,44 C228,29 233,15 240,4 C241,18 234,32 238,44 Z" />
        <path d="M300,44 C299,34 301,25 306,16 C307,27 303,36 306,44 Z" />
        <path d="M375,44 C373,31 378,19 385,9 C386,21 379,33 383,44 Z" />
        <path d="M450,44 C449,36 451,28 455,21 C456,29 453,37 455,44 Z" />
        <path d="M530,44 C528,30 532,17 539,6 C540,19 533,32 537,44 Z" />
        <path d="M605,44 C604,34 606,24 611,14 C612,26 608,35 611,44 Z" />
        <path d="M675,44 C673,31 678,18 685,8 C686,20 679,33 683,44 Z" />
        <path d="M750,44 C749,36 751,27 756,19 C757,28 753,37 756,44 Z" />
        <path d="M825,44 C823,29 828,16 835,5 C836,18 829,32 833,44 Z" />
        <path d="M900,44 C899,33 901,24 906,15 C907,26 903,35 906,44 Z" />
        <path d="M970,44 C968,30 973,17 980,6 C981,19 974,32 978,44 Z" />
        <path d="M1045,44 C1044,35 1046,26 1050,18 C1051,28 1048,36 1050,44 Z" />
        <path d="M1120,44 C1118,31 1123,18 1130,8 C1131,20 1124,33 1128,44 Z" />
        <path d="M1190,44 C1189,33 1191,23 1196,13 C1197,25 1193,35 1196,44 Z" />
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
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
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
