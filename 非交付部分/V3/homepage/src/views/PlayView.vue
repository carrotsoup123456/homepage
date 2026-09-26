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
  width: 100%;
  /* 占满除头部栏与说明外的视口高度，手机上也不留死 */
  height: calc(100dvh - var(--header-h) - 150px);
  min-height: 480px;
  background: #141210;
}
.play-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
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
    height: calc(100dvh - var(--header-h) - 190px);
    min-height: 420px;
  }
}
</style>
