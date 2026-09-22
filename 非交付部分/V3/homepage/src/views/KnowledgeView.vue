<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { allTags, searchNotes } from '../data/notes.js'
import FeedbackWidget from '../components/FeedbackWidget.vue'

// 关键词 + 标签筛选（这两个是「输入」，不放进地址栏）
const keyword = ref('')
const tagFilter = ref('全部')

// 检索结果（纯函数，见 src/data/notes.js）
const filtered = computed(() => searchNotes(keyword.value, tagFilter.value))

// 当前选中的笔记放到地址栏 ?note=id → 可以分享链接、可以用浏览器后退
const route = useRoute()
const router = useRouter()

const activeId = computed(() => {
  const q = route.query.note
  if (typeof q === 'string' && filtered.value.some((n) => n.id === q)) return q
  return filtered.value[0]?.id ?? null
})

const activeNote = computed(
  () => filtered.value.find((n) => n.id === activeId.value) ?? filtered.value[0] ?? null
)

const rendered = computed(() =>
  activeNote.value ? marked.parse(activeNote.value.body) : ''
)

function selectNote(id) {
  router.push({ query: { ...route.query, note: id } })
}

function resetAll() {
  keyword.value = ''
  tagFilter.value = '全部'
}

// 切换标签时，如果当前选中的笔记被筛掉了，就自动跳到第一条
watch(filtered, (list) => {
  if (!list.length) return
  const q = route.query.note
  if (typeof q !== 'string' || !list.some((n) => n.id === q)) {
    router.replace({ query: { ...route.query, note: list[0].id } })
  }
})
</script>

<template>
  <div class="container page">
    <section v-reveal>
      <h1 class="page-title">知识库 · 笔记</h1>
      <p class="page-subtitle">
        我的学习笔记与技术复盘，共 {{ filtered.length }} 篇 —— 支持关键词搜索与标签筛选。
      </p>

      <!-- 搜索框 -->
      <div class="kb-search">
        <label class="sr-only" for="kb-search-input">搜索笔记</label>
        <input
          id="kb-search-input"
          v-model="keyword"
          type="search"
          class="search-input"
          placeholder="搜索标题、正文或标签，例如：Vite、机器学习…"
          autocomplete="off"
        />
        <button v-if="keyword || tagFilter !== '全部'" class="search-clear" @click="resetAll">
          清空
        </button>
      </div>
    </section>

    <template v-if="filtered.length">
      <div class="kb-layout" v-reveal>
        <!-- 左侧：标签 + 笔记列表 -->
        <aside class="kb-list">
          <div class="kb-filters">
            <button
              class="filter-chip"
              :class="{ active: tagFilter === '全部' }"
              :aria-pressed="tagFilter === '全部'"
              @click="tagFilter = '全部'"
            >
              全部
            </button>
            <button
              v-for="t in allTags"
              :key="t"
              class="filter-chip"
              :class="{ active: tagFilter === t }"
              :aria-pressed="tagFilter === t"
              @click="tagFilter = t"
            >
              {{ t }}
            </button>
          </div>

          <ul>
            <li v-for="n in filtered" :key="n.id">
              <button
                class="kb-item"
                :class="{ active: activeId === n.id }"
                :aria-current="activeId === n.id ? 'true' : undefined"
                @click="selectNote(n.id)"
              >
                <span class="kb-item-date">{{ n.date }}</span>
                <span class="kb-item-title">{{ n.title }}</span>
                <span class="kb-item-summary">{{ n.summary }}</span>
                <span class="kb-item-meta">
                  <span v-for="t in n.tags" :key="t" class="kb-item-tag">#{{ t }}</span>
                  <span class="kb-item-min">{{ n.minutes }} 分钟</span>
                </span>
              </button>
            </li>
          </ul>
        </aside>

        <!-- 右侧：正文 -->
        <article v-if="activeNote" class="kb-body">
          <header class="kb-head">
            <h2 class="kb-title">{{ activeNote.title }}</h2>
            <p class="kb-meta">
              {{ activeNote.date }}
              <span v-for="t in activeNote.tags" :key="t" class="kb-tag">#{{ t }}</span>
              · 约 {{ activeNote.minutes }} 分钟阅读
            </p>
          </header>
          <div class="markdown" v-html="rendered"></div>
          <FeedbackWidget page="知识库" :item="activeNote.id" />
        </article>
      </div>
    </template>

    <!-- 空状态 -->
    <div v-else class="empty">
      <p class="empty-title">没有匹配的笔记</p>
      <p class="empty-desc">换个关键词，或者点下面的按钮看看全部内容。</p>
      <button class="btn btn-outline" @click="resetAll">查看全部笔记</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 48px;
  padding-bottom: 64px;
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

/* 仅屏幕阅读器可见 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ---- 搜索 ---- */
.kb-search {
  display: flex;
  gap: 10px;
  max-width: 560px;
}
.search-input {
  flex: 1;
  font: inherit;
  font-size: 0.95rem;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 11px 20px;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.search-input::placeholder {
  color: var(--color-text-muted);
}
.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.search-clear {
  font: inherit;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0 18px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.search-clear:hover {
  color: var(--color-text);
  border-color: var(--color-primary);
}

/* ---- 两栏布局 ---- */
.kb-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  margin-top: 28px;
}
.kb-list {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow-soft);
  align-self: start;
  position: sticky;
  top: 92px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}
.kb-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.filter-chip {
  font: inherit;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s var(--ease);
}
.filter-chip:hover {
  color: var(--color-text);
  border-color: var(--color-primary);
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
  gap: 5px;
  width: 100%;
  text-align: left;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  font: inherit;
  cursor: pointer;
  transition: background 0.2s var(--ease), border-color 0.2s var(--ease);
}
.kb-item:hover {
  background: var(--color-bg);
}
.kb-item.active {
  background: var(--accent-soft);
  border-color: var(--color-primary);
}
.kb-item-date {
  font-size: 0.74rem;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}
.kb-item-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.45;
}
.kb-item-summary {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.kb-item-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
}
.kb-item-tag {
  font-size: 0.72rem;
  color: var(--color-green);
  font-weight: 600;
}
.kb-item-min {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

/* ---- 正文 ---- */
.kb-body {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 36px 40px;
  box-shadow: var(--shadow-soft);
  min-width: 0;
}
.kb-head {
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}
.kb-title {
  font-size: 1.55rem;
  margin-bottom: 8px;
}
.kb-meta {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}
.kb-tag {
  color: var(--color-green);
  font-weight: 600;
  margin-left: 8px;
}

/* Markdown 排版 */
.markdown {
  color: var(--color-text-muted);
  line-height: 1.85;
}
.markdown :deep(h1) {
  font-size: 1.35rem;
  color: var(--color-text);
  margin: 28px 0 12px;
}
.markdown :deep(h1:first-child) {
  margin-top: 0;
}
.markdown :deep(h2) {
  font-size: 1.1rem;
  color: var(--color-text);
  margin: 26px 0 10px;
}
.markdown :deep(h3) {
  font-size: 1rem;
  color: var(--color-text);
  margin: 20px 0 8px;
}
.markdown :deep(p) {
  margin: 10px 0;
}
.markdown :deep(ul),
.markdown :deep(ol) {
  margin: 10px 0 10px 22px;
}
.markdown :deep(li) {
  margin: 4px 0;
}
.markdown :deep(strong) {
  color: var(--color-text);
}
.markdown :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}
.markdown :deep(blockquote) {
  border-left: 3px solid var(--color-green);
  padding: 4px 0 4px 16px;
  margin: 14px 0;
  color: var(--color-text-muted);
  font-style: italic;
}
.markdown :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 0.9rem;
  display: block;
  overflow-x: auto;
}
.markdown :deep(th),
.markdown :deep(td) {
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  text-align: left;
}
.markdown :deep(th) {
  background: var(--color-bg);
  color: var(--color-text);
  font-weight: 600;
}
.markdown :deep(pre) {
  background: var(--color-bg);
  padding: 16px 18px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid var(--color-border);
}
.markdown :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.88em;
  background: var(--color-bg);
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
}
.markdown :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
}

/* ---- 空状态 ---- */
.empty {
  margin-top: 40px;
  padding: 56px 24px;
  text-align: center;
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
}
.empty-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
}
.empty-desc {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

@media (max-width: 860px) {
  .kb-layout {
    grid-template-columns: 1fr;
  }
  .kb-list {
    position: static;
    max-height: none;
  }
  .kb-body {
    padding: 24px 20px;
  }
}
</style>
