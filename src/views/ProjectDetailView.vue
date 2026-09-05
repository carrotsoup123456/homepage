<script setup>
import { computed } from 'vue'
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
