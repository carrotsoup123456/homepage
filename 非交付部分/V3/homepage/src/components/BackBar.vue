<script setup>
// ======================================================
// 第二界面（笔记详情、项目详情）底部的「返回上一页」大按钮
// ------------------------------------------------------
// 为什么需要：详情页读完在页面底部，移动端要一路滚回顶部
// 才能找到返回入口；微信里左滑虽能返回，但新访客不一定知道。
// 点击行为：有来路（vue-router 会把来路记在 history.state.back）
// 就真的回上一页；直接打开分享链接（无来路）则回指定列表页。
// ======================================================
import { useRouter } from 'vue-router'

const props = defineProps({
  to: { type: String, default: '/' }, // 无来路时的兜底去向
  label: { type: String, default: '返回上一页' },
})

const router = useRouter()

function go() {
  if (window.history.state?.back) {
    router.back()
  } else {
    router.push(props.to)
  }
}
</script>

<template>
  <nav class="back-bar" aria-label="返回导航">
    <button class="back-bar-btn" type="button" @click="go">
      <span class="back-bar-arrow" aria-hidden="true">‹</span>
      {{ label }}
    </button>
  </nav>
</template>
