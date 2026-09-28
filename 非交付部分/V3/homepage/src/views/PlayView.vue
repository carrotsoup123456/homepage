<script setup>
// ======================================================
// 试玩栏目：把《为官一方》最新单文件网页版直接嵌进站内
// 游戏本体是零外部依赖的单 HTML（public/play/weiguan-yifang.html），
// 用 iframe 隔离，互不干扰。
// ======================================================
import { ref, computed, onMounted } from 'vue'
import { setPageMeta } from '../data/meta.js'

const base = import.meta.env.BASE_URL
const gameUrl = computed(() => `${base}play/weiguan-yifang.html`)

const loading = ref(true)
function onLoaded() {
  loading.value = false
}

onMounted(() => {
  setPageMeta({
    title: '在线试玩',
    desc: '《为官一方》古风县令治理模拟·站内网页试玩版，无需下载。',
  })
})
</script>

<template>
  <div class="play-page">
    <header class="play-head container">
      <div>
        <h1 class="play-title">🏯 《为官一方》· 在线试玩</h1>
        <p class="play-sub">
          你是青阳县令：平衡银库、粮仓、民心、治安、官声、人口，治县三载，考课定前程。
          本站嵌入的是<strong>最新单文件网页版</strong>，无需下载、点开即玩（进度存在本机浏览器）。
        </p>
      </div>
      <a class="btn btn-outline play-open" :href="gameUrl" target="_blank" rel="noopener">
        新标签页全屏玩 ↗
      </a>
    </header>

    <div class="play-stage">
      <!-- 加载提示：游戏文件约 9MB，慢网需要等一会 -->
      <div v-if="loading" class="play-loading" aria-live="polite">
        <span class="play-spinner" aria-hidden="true"></span>
        游戏加载中…（文件约 9MB，慢网请稍候）
      </div>
      <!-- 游戏本体是竖屏手机布局（内部 #game 固定 430px 宽、100dvh 高）。
           给 iframe 一个同比例的「手机竖屏」视口，游戏就能像在手机上一样完整展开，
           不会被宽桌面窗口横向拉扁。 -->
      <iframe
        class="play-frame"
        :src="gameUrl"
        title="《为官一方》网页试玩版"
        allow="autoplay"
        @load="onLoaded"
      ></iframe>
    </div>

    <p class="play-foot container">
      想深入了解这个项目（策划、架构、数值工具链）？
      <RouterLink to="/project/weiguan-yifang">看项目详情 →</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.play-page {
  padding-bottom: 40px;
}
.play-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  padding-top: 28px;
  padding-bottom: 16px;
}
.play-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 6px;
}
.play-sub {
  color: var(--color-text-muted);
  font-size: 0.92rem;
  max-width: 640px;
  line-height: 1.7;
}
.play-open {
  flex-shrink: 0;
}
.play-stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0 32px;
  background: #141210;
}
.play-frame {
  /* 手机竖屏比例：与游戏内部 #game 的 430px 宽 + 100dvh 高保持一致 */
  display: block;
  width: min(430px, 92vw);
  aspect-ratio: 9 / 16;
  height: auto;
  border: 4px solid #2c2c2c;
  border-radius: 20px;
  background: #f4ecd8;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
}
.play-loading {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #d8cfae;
  font-size: 0.95rem;
  background: #141210;
  pointer-events: none;
}
.play-spinner {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(216, 207, 174, 0.3);
  border-top-color: #d8cfae;
  animation: play-spin 0.9s linear infinite;
}
@keyframes play-spin {
  to {
    transform: rotate(360deg);
  }
}
.play-foot {
  padding-top: 14px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
.play-foot a {
  color: var(--color-primary);
}
@media (max-width: 768px) {
  .play-head {
    padding-top: 18px;
  }
  .play-stage {
    padding-top: 14px;
  }
}
</style>
