<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 返回顶部：监听滚动，超过阈值显示按钮
const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 400
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <footer class="site-footer">
    <p>© 2026 刘博康 · 个人主页 V2</p>

    <!-- 返回顶部按钮 -->
    <Transition name="fade">
      <button
        v-if="showTop"
        class="back-to-top"
        aria-label="返回顶部"
        @click="window.scrollTo({ top: 0, behavior: 'smooth' })"
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
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  transition: transform 0.15s, background 0.2s;
  z-index: 50;
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
