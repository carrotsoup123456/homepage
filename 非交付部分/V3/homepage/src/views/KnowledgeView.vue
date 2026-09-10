<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { notes } from '../data/site.js'

// 当前选中的笔记
const activeId = ref(notes[0]?.id)

const activeNote = computed(() => notes.find((n) => n.id === activeId.value) || notes[0])

const rendered = computed(() => {
  if (!activeNote.value) return ''
  return marked.parse(activeNote.value.markdown || '')
})

// 标签筛选
const tagFilter = ref('全部')
const allTags = computed(() => ['全部', ...new Set(notes.flatMap((n) => n.tags))])
const filteredNotes = computed(() =>
  tagFilter.value === '全部'
    ? notes
    : notes.filter((n) => n.tags.includes(tagFilter.value))
)
</script>

<template>
  <div class="container page">
    <section v-reveal>
      <h1 class="page-title">知识库 · 笔记</h1>
      <p class="page-subtitle">我的学习笔记与技术积累（建设中，点击查看）</p>
      <div class="wip-banner">
        <span class="wip-badge">⏳ 建设中</span>
        当前为示例占位内容，后续将陆续导入我的真实学习笔记与项目复盘。
      </div>
    </section>

    <div v-if="filteredNotes.length" class="kb-layout" v-reveal>
      <!-- 左侧：笔记列表 -->
      <aside class="kb-list">
        <div class="kb-filters">
          <button
            v-for="t in allTags"
            :key="t"
            class="filter-chip"
            :class="{ active: tagFilter === t }"
            @click="tagFilter = t"
          >{{ t }}</button>
        </div>
        <ul>
          <li
            v-for="n in filteredNotes"
            :key="n.id"
            class="kb-item"
            :class="{ active: activeId === n.id }"
            @click="activeId = n.id"
          >
            <span class="kb-item-tag">#{{ n.tag }}</span>
            <span class="kb-item-title">{{ n.title }}</span>
            <span class="kb-item-date">{{ n.date }}</span>
          </li>
        </ul>
      </aside>

      <!-- 右侧：正文 -->
      <article class="kb-body">
        <h2 class="kb-title">{{ activeNote.title }}</h2>
        <div class="markdown" v-html="rendered"></div>
      </article>
    </div>

    <p v-else class="empty">暂无笔记。</p>
  </div>
</template>

<style scoped>
.page {
  padding-top: 48px;
  padding-bottom: 48px;
}
.page-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 6px;
}
.page-subtitle {
  color: var(--color-text-muted);
  margin-bottom: 20px;
}
.wip-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: var(--color-text);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 28px;
}
.wip-badge {
  flex-shrink: 0;
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}
.kb-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
}
.kb-list {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
  align-self: start;
}
.kb-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.filter-chip {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-chip.active {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-color: var(--color-primary);
}
.kb-list ul {
  list-style: none;
}
.kb-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.kb-item:hover {
  background: var(--color-bg);
}
.kb-item.active {
  background: rgba(37, 99, 235, 0.08);
}
.kb-item-tag {
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 600;
}
.kb-item-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}
.kb-item-date {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}
.kb-body {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--shadow);
}
.kb-title {
  font-size: 1.4rem;
  margin-bottom: 16px;
}
.markdown h1 { font-size: 1.4rem; margin-bottom: 12px; }
.markdown h2 { margin: 18px 0 8px; font-size: 1.1rem; }
.markdown p { margin: 8px 0; color: var(--color-text-muted); }
.markdown ul { margin: 8px 0 8px 22px; color: var(--color-text-muted); }
.markdown pre {
  background: var(--color-bg);
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 12px 0;
  border: 1px solid var(--color-border);
}
.markdown code { background: var(--color-bg); padding: 2px 6px; border-radius: 6px; border: 1px solid var(--color-border); font-size: 0.9em; }
.empty {
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .kb-layout {
    grid-template-columns: 1fr;
  }
}
</style>
