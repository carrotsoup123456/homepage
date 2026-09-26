<script setup>
import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { marked } from 'marked'
import { projects } from '../data/site.js'
import { setPageMeta } from '../data/meta.js'
import { imgSize } from '../data/image-sizes.js'
import FeedbackWidget from '../components/FeedbackWidget.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()

// 根据路由 id 查找项目
const project = computed(() => projects.find((p) => p.id === route.params.id))

// 渲染 Markdown 为 HTML（含化学式 sup 保留）
const rendered = computed(() => {
  if (!project.value) return ''
  return marked.parse(project.value.long || '')
})

// 标签页标题跟着项目走。
// flush:'post' 表示等这个组件渲染完再写，这样它会覆盖路由里那个通用的「项目详情」。
watch(
  project,
  (p) => {
    if (!p) {
      // 地址里的项目 id 不存在（例如项目已经撤下）：这里也要说清楚，
      // 否则标签页会一直挂着通用的「项目详情」，看起来像页面坏了。
      setPageMeta({ title: '页面不存在', desc: '这个地址没有对应内容。', path: route.path })
      return
    }
    setPageMeta({
      title: p.title,
      desc: `${p.title}：${p.role || ''}${p.tech ? ' · ' + p.tech : ''}`.trim(),
      path: `/project/${p.id}`,
    })
  },
  { immediate: true, flush: 'post' }
)

// ---- 图片灯箱 ----
const viewer = ref(null)
const lightboxClose = ref(null)
let lastFocused = null

function openImage(img, event) {
  lastFocused = event?.currentTarget ?? null
  viewer.value = img
  // 等弹出层渲染出来再把焦点移进关闭按钮（键盘用户才能直接按 Enter 关掉）
  nextTick(() => lightboxClose.value?.focus())
}

function closeImage() {
  viewer.value = null
  // 关闭后焦点还给刚才那张图，不然键盘焦点会掉到页面顶部
  lastFocused?.focus?.()
  lastFocused = null
}

// 灯箱开着时按 Esc 关闭
function onKeydown(e) {
  if (e.key === 'Escape' && viewer.value) closeImage()
}
watch(viewer, (v) => {
  if (typeof document === 'undefined') return
  if (v) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="container page">
    <template v-if="project">
      <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
      <section class="detail-hero" v-reveal>
        <div class="detail-icon">{{ project.icon }}</div>
        <div>
          <h1 class="page-title">{{ project.title }}</h1>
          <div class="detail-tags">
            <span v-if="project.tech" class="meta-tag">{{ project.tech }}</span>
            <span v-if="project.role" class="meta-tag meta-role">👤 {{ project.role }}</span>
          </div>
        </div>
      </section>

      <section class="detail-body" v-reveal>
        <!-- Markdown 渲染：v-html 需信任数据（本项目数据为本地硬编码，安全） -->
        <div class="markdown" v-html="rendered"></div>
      </section>

      <!-- 《为官一方》专属：站内试玩入口 -->
      <section class="detail-action" v-reveal v-if="project.id === 'weiguan-yifang'">
        <RouterLink to="/play" class="btn btn-primary">🏯 在线试玩（无需下载）</RouterLink>
      </section>

      <!-- 演示链接按钮（如有在线演示） -->
      <section class="detail-action" v-reveal v-if="project.link">
        <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          🔗 {{ project.linkText || '查看在线演示' }}
        </a>
      </section>

      <!-- 项目展示图 -->
      <section class="detail-gallery" v-reveal v-if="project.images && project.images.length">
        <h2 class="section-title">项目展示</h2>
        <p class="gallery-hint">点击图片可查看完整大图</p>
        <div class="gallery-grid">
          <figure v-for="(img, i) in project.images" :key="img.src + i" class="gallery-item">
            <!-- 图片本身用 <button> 包起来：这样键盘用户 Tab 得到、也能按回车打开，
                 单纯给 <figure> 加 @click 只有鼠标能用 -->
            <button
              type="button"
              class="gallery-btn"
              :aria-label="`放大查看：${img.alt}`"
              @click="openImage(img, $event)"
            >
              <img :src="img.src" :alt="img.alt" loading="lazy" v-bind="imgSize(img.src)" />
            </button>
            <figcaption v-if="img.alt">{{ img.alt }}</figcaption>
          </figure>
        </div>
      </section>

      <!-- 图片灯箱 -->
      <transition name="fade">
        <div
          v-if="viewer"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="viewer.alt || '查看大图'"
          @click.self="closeImage"
        >
          <button ref="lightboxClose" class="lightbox-close" @click="closeImage" aria-label="关闭大图">
            ✕
          </button>
          <img :src="viewer.src" :alt="viewer.alt" class="lightbox-img" />
          <p v-if="viewer.alt" class="lightbox-caption">{{ viewer.alt }}</p>
        </div>
      </transition>

      <section class="detail-highlights" v-reveal v-if="project.highlights.length">
        <h2 class="section-title">亮点</h2>
        <div class="skill-tags">
          <span v-for="h in project.highlights" :key="h" class="skill-tag">{{ h }}</span>
        </div>
      </section>

      <FeedbackWidget page="项目详情" :item="project.id" />
    </template>

    <template v-else>
      <!-- 找不到这个项目：复用全站同一个 404 页面，不要另做一套长相 -->
      <NotFoundView />
    </template>
  </div>
</template>

<style scoped>
.page {
  padding-top: 48px;
  padding-bottom: 48px;
  max-width: 760px;
}
.back-link {
  display: inline-block;
  margin-bottom: 24px;
  color: var(--color-text-muted);
  font-weight: 500;
}
.detail-hero {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 32px;
}
.detail-icon {
  font-size: 3rem;
}
.page-title {
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 12px;
}
.detail-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.meta-tag {
  background: rgba(37, 99, 235, 0.1);
  color: var(--color-primary-dark);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
}
.meta-role {
  background: rgba(15, 23, 42, 0.06);
  color: var(--color-text-muted);
}
.detail-body {
  margin-bottom: 32px;
  color: var(--color-text);
}
.detail-action {
  margin-bottom: 32px;
}
.detail-action .btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
}
.detail-gallery {
  margin-top: 8px;
}
.gallery-hint {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin-top: 4px;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.gallery-item {
  margin: 0;
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
/* 包住图片的按钮：清掉浏览器默认按钮外观，只保留「可点」的提示 */
.gallery-btn {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
}
.gallery-item img {
  display: block;
  width: 100%;
  height: 240px;
  /* 完整显示整幅图（cover 会把长截图裁得只剩顶部一条，用户反馈"只露角落"），
     两侧留空处用深色底衬，点击仍可开灯箱看原尺寸。 */
  object-fit: contain;
  background: #0d1117;
}
.gallery-item figcaption {
  padding: 10px 12px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* 图片灯箱 */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
}
.lightbox-img {
  max-width: 92vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
}
.lightbox-caption {
  color: #ddd;
  margin-top: 14px;
  font-size: 0.9rem;
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.markdown h2 {
  margin: 24px 0 8px;
  font-size: 1.2rem;
}
.markdown h3 {
  margin: 16px 0 6px;
}
.markdown p {
  margin: 8px 0;
  color: var(--color-text-muted);
}
.markdown ul {
  margin: 8px 0 8px 22px;
  color: var(--color-text-muted);
}
.markdown code {
  background: var(--color-surface);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.9em;
  border: 1px solid var(--color-border);
}
.markdown pre {
  background: var(--color-surface);
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  margin: 12px 0;
}
.not-found {
  color: var(--color-text-muted);
  margin-bottom: 16px;
}
</style>
