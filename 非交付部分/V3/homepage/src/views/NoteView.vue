<script setup>
// ======================================================
// 笔记独立页：从知识库列表点进来单开一页读全文
// ------------------------------------------------------
// 为什么单开一页：原先知识库是「列表 + 正文」同页两栏，
// 移动端两栏上下堆叠，点完笔记列表跳到顶、正文在最底下，
// 还得自己滚过去；现在点笔记直接进独立页面——
// 微信/浏览器返回键、左滑手势（history 天然支持）、底部
// 返回按钮三种方式都能回列表，标题也独立可分享。
// ======================================================
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { notes } from '../data/notes.js'
import { setPageMeta } from '../data/meta.js'
import { notesQa } from '../data/notes-qa.js'
import FeedbackWidget from '../components/FeedbackWidget.vue'
import BackBar from '../components/BackBar.vue'

const props = defineProps({ id: String })
const route = useRoute()
const router = useRouter()

const note = computed(() => notes.find((n) => n.id === props.id))
const qa = computed(() => (note.value ? notesQa[note.value.id] || [] : []))
const rendered = computed(() => (note.value ? marked.parse(note.value.body) : ''))

// 标签页标题跟着这篇笔记走；链接写错（找不到笔记）回列表
watch(
  () => note.value,
  (n) => {
    if (!n) {
      router.replace('/knowledge')
      return
    }
    setPageMeta({
      title: `${n.title} · 知识库`,
      desc: `笔记：${n.title}${n.tags?.length ? '｜标签：' + n.tags.join('、') : ''}`,
    })
  },
  { immediate: true }
)

// 兼容旧版收藏链接：知识库老地址用 ?note=id 选中笔记 → 跳到独立页
watch(
  () => route.query.note,
  (q) => {
    if (typeof q === 'string' && q) {
      router.replace({ name: 'note', params: { id: q } })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="note" class="page note-page" v-reveal>
    <!-- 面包屑：回知识库列表 -->
    <p class="note-crumb">
      <RouterLink to="/knowledge">‹ 知识库</RouterLink>
      <span class="note-crumb-sep" aria-hidden="true">/</span>
      <span class="note-crumb-cat">{{ note.category === 'reading' ? '读书笔记' : '项目知识' }}</span>
    </p>

    <article class="kb-body">
      <header class="kb-head">
        <h2 class="kb-title">{{ note.title }}</h2>
        <p class="kb-meta">
          {{ note.date }}
          <span v-for="t in note.tags" :key="t" class="kb-tag">#{{ t }}</span>
          · 约 {{ note.minutes }} 分钟阅读
        </p>
      </header>
      <div class="markdown" v-html="rendered"></div>

      <!-- 评论式问答：站长预写的「你可能想问」，不是真实访客留言 -->
      <section v-if="qa.length" class="note-qa" aria-label="关于本篇的常见问题">
        <h3 class="note-qa-title">关于这篇，你可能想问</h3>
        <p class="note-qa-hint">以下为站长预写的常见问答；真实反馈请用底部的反馈按钮。</p>
        <details v-for="item in qa" :key="item.q" class="note-qa-item">
          <summary>{{ item.q }}</summary>
          <p>{{ item.a }}</p>
        </details>
      </section>

      <FeedbackWidget page="知识库" :item="note.id" />
    </article>

    <!-- 读到底顺手就能回去，不用滚回顶部 -->
    <BackBar to="/knowledge" label="返回笔记列表" />
  </div>
</template>

<style scoped>
.note-page {
  max-width: 860px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 30px;
}
.note-crumb {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.note-crumb a {
  color: var(--color-green);
  text-decoration: none;
  font-weight: 600;
}
.note-crumb-sep {
  opacity: 0.5;
}

/* ---- 以下样式自知识库页搬来（kb-body 全套 + 问答） ---- */
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
  .kb-body {
    padding: 24px 20px;
  }
}
.note-qa {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}
.note-qa-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  margin-bottom: 4px;
}
.note-qa-hint {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}
.note-qa-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
  background: var(--color-surface);
}
.note-qa-item summary {
  cursor: pointer;
  padding: 13px 16px;
  font-weight: 600;
  font-size: 0.95rem;
  list-style: none;
  display: flex;
  align-items: center;
  min-height: 44px;
  gap: 8px;
}
.note-qa-item summary::before {
  content: '›';
  color: var(--color-green);
  font-weight: 700;
  transition: transform 0.2s;
}
.note-qa-item[open] summary::before {
  transform: rotate(90deg);
}
.note-qa-item p {
  padding: 0 16px 14px 40px;
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--color-text-muted);
}
</style>
