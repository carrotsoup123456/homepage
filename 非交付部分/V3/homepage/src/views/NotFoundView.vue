<script setup>
import { RouterLink, useRoute } from 'vue-router'

// 把用户实际输入的地址显示出来，方便他发现自己是不是打错了字
const route = useRoute()

// 萤火虫已按访客反馈 #2 移除（动效收敛，与首页 Hero 同步处理）。
</script>

<template>
  <div class="container page nf-page">
    <p class="nf-code" aria-hidden="true">404</p>
    <h1 class="page-title">这个页面不存在</h1>
    <p class="page-subtitle">
      地址 <code class="nf-path">{{ route.fullPath }}</code> 没有对应内容，可能打错了字，或者内容已经改名。
    </p>

    <ul class="nf-links">
      <li><RouterLink to="/">← 回到首页</RouterLink></li>
      <li><RouterLink to="/knowledge">去看看知识库</RouterLink></li>
      <li><RouterLink to="/about">了解一下我</RouterLink></li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  padding-top: 72px;
  padding-bottom: 96px;
  max-width: 620px;
  overflow: hidden;
}
/* 文字压在萤火虫上面 */
.page-title,
.page-subtitle,
.nf-code,
.nf-links {
  position: relative;
  z-index: 1;
}
.nf-code {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-border);
  margin-bottom: 8px;
  animation: nf-breathe 6s ease-in-out infinite;
}
/* 404 大字轻微呼吸：像夜里忽明忽暗的轮廓，幅度刻意很小 */
@keyframes nf-breathe {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}
@media (prefers-reduced-motion: reduce) {
  .nf-code {
    animation: none;
  }
}
.nf-path {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 0.9em;
  word-break: break-all;
}
.nf-links {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.nf-links a {
  font-weight: 600;
}
</style>
