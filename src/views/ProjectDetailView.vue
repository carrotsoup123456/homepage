<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { marked } from 'marked'
import { projects } from '../data/site.js'

const route = useRoute()

// 根据路由 id 查找项目
const project = computed(() => projects.find((p) => p.id === route.params.id))

// 渲染 Markdown 为 HTML（含化学式 sup 保留）
const rendered = computed(() => {
  if (!project.value) return ''
  return marked.parse(project.value.long || '')
})

// 图片灯箱：当前放大的图片
const viewer = ref(null)
function openImage(img) {
  viewer.value = img
}
function closeImage() {
  viewer.value = null
}
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
          <figure v-for="(img, i) in project.images" :key="img.src + i" class="gallery-item" @click="openImage(img)">
            <img :src="img.src" :alt="img.alt" loading="lazy" />
            <figcaption v-if="img.alt">{{ img.alt }}</figcaption>
          </figure>
        </div>
      </section>

      <!-- 图片灯箱 -->
      <transition name="fade">
        <div v-if="viewer" class="lightbox" @click.self="closeImage">
          <button class="lightbox-close" @click="closeImage" aria-label="关闭">✕</button>
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
    </template>

    <template v-else>
      <p class="not-found">项目不存在。</p>
      <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
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
  cursor: zoom-in;
}
.gallery-item img {
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: top;
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
