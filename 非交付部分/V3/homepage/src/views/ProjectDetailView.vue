<script setup>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { goBack } from '../composables/goBack.js'
import { marked } from 'marked'
import { projects } from '../data/site.js'
import { setPageMeta } from '../data/meta.js'
import { imgSize } from '../data/image-sizes.js'
import FeedbackWidget from '../components/FeedbackWidget.vue'
import BackBar from '../components/BackBar.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const router = useRouter()

// 返回首页 = 回到访客来的地方（首页滚动位置也由 savedPosition 恢复）
function backHome() {
  goBack(router, '/')
}

// 根据路由 id 查找项目
const project = computed(() => projects.find((p) => p.id === route.params.id))

// 渲染 Markdown 为 HTML，并按 <h3> 小节拆开：
// 带 anchor 的图插到对应小节的文字后面（图随段落走，不再全部堆一个图集），
// 没配 anchor / 匹配不上的图留在页面底部的「项目展示」区兜底。
const sections = computed(() => {
  if (!project.value) return []
  const html = marked.parse(project.value.long || '')
  const chunks = html.split(/(?=<h3)/).filter((c) => c.trim())
  return chunks.map((chunk) => {
    const h3 = (chunk.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || ''
    const plain = h3.replace(/<[^>]+>/g, '')
    const imgs = (project.value.images || []).filter((im) => {
      if (!im.anchor) return false
      if (!h3) return im.anchor === 'intro'
      return plain.includes(im.anchor)
    })
    return { html: chunk, title: plain, imgs }
  })
})

// ---- 目录跳转（访客反馈 #1：长文加标题导航）----
// 注意不能用 location.hash 锚点：站点本身是 hash 路由（#/project/xx），
// 改 hash 会被 vue-router 吃掉导致跳页。用 JS 滚动。
const secEls = []
const activeSec = ref(-1)

function setSecRef(el, i) {
  if (el) secEls[i] = el
}

function jumpTo(i) {
  const el = secEls[i]
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeSec.value = i
}

// 滚动时高亮当前所在节（jsdom 没有 IntersectionObserver，测试环境跳过）
let tocObserver = null
onMounted(() => {
  if (typeof IntersectionObserver === 'undefined' || !secEls.length) return
  tocObserver = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          const i = secEls.indexOf(en.target)
          if (i >= 0) activeSec.value = i
        }
      }
    },
    // 视口上 1/3 处的一条"感应线"：标题滚过这条线就算"当前节"
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  )
  secEls.forEach((el) => el && tocObserver.observe(el))
})
onBeforeUnmount(() => tocObserver?.disconnect())

// 兜底图集：没被任何小节认领的图
const galleryImages = computed(() => {
  if (!project.value) return []
  const claimed = new Set(sections.value.flatMap((sec) => sec.imgs.map((i) => i.src)))
  return (project.value.images || []).filter((im) => !claimed.has(im.src))
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
      <button type="button" class="back-link" @click="backHome">← 返回首页</button>
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

      <!-- 亮点速览（访客反馈 #1：从页尾前置到标题下，第一屏可见） -->
      <section class="detail-highlights" v-reveal v-if="project.highlights.length">
        <div class="skill-tags">
          <span v-for="h in project.highlights" :key="h" class="skill-tag">✨ {{ h }}</span>
        </div>
      </section>

      <!-- 目录条（访客反馈 #1：长文按标题跳转；不用 hash 锚点，hash 被 vue-router 占用） -->
      <nav
        class="detail-toc"
        v-reveal
        v-if="sections.filter((s) => s.title).length > 1"
        aria-label="本页目录"
      >
        <span class="toc-label">📑 目录</span>
        <div class="toc-chips">
          <button
            v-for="(sec, i) in sections"
            v-show="sec.title"
            :key="i"
            type="button"
            class="toc-chip"
            :class="{ active: activeSec === i }"
            @click="jumpTo(i)"
          >
            {{ sec.title }}
          </button>
        </div>
      </nav>

      <section class="detail-body" v-reveal>
        <!-- 按小节渲染；每节后紧跟属于它的图（图随段落走） -->
        <template v-for="(sec, i) in sections" :key="i">
          <!-- 访客反馈 #3「希望加图示」：carbon-brain 技术路线节配流程图 -->
          <div
            v-if="project.id === 'carbon-brain' && sec.title && sec.title.includes('技术路线')"
            class="flow-diagram"
            role="img"
            aria-label="技术路线流程图：传感器原始数据经物理换算得到吸附量，构造 18 维特征后用 XGBoost 回归估算吸附饱和度，输出吸附/再生切换时机"
          >
            <div class="flow-node">
              <span class="flow-emoji" aria-hidden="true">📥</span>
              <span class="flow-name">传感器原始数据</span>
              <span class="flow-note">时间/温度/湿度/CO₂/流量 · 单文件最大 2.5 万行</span>
            </div>
            <span class="flow-arrow" aria-hidden="true">→</span>
            <div class="flow-node">
              <span class="flow-emoji" aria-hidden="true">⚗️</span>
              <span class="flow-name">物理换算</span>
              <span class="flow-note">理想气体定律 → 摩尔流率 → 物料衡算 · 积分</span>
            </div>
            <span class="flow-arrow" aria-hidden="true">→</span>
            <div class="flow-node">
              <span class="flow-emoji" aria-hidden="true">🧮</span>
              <span class="flow-name">特征工程</span>
              <span class="flow-note">原始量 + 滚动均值/标准差 · 共 18 维</span>
            </div>
            <span class="flow-arrow" aria-hidden="true">→</span>
            <div class="flow-node">
              <span class="flow-emoji" aria-hidden="true">🌲</span>
              <span class="flow-name">XGBoost 回归</span>
              <span class="flow-note">约 3 万行样本参与训练</span>
            </div>
            <span class="flow-arrow" aria-hidden="true">→</span>
            <div class="flow-node flow-node-out">
              <span class="flow-emoji" aria-hidden="true">🎯</span>
              <span class="flow-name">饱和度估算</span>
              <span class="flow-note">回答「什么时候切换」：吸附 ⇄ 再生</span>
            </div>
          </div>
          <!-- v-html 需信任数据（本项目数据为本地硬编码，安全） -->
          <div class="markdown md-chunk" :id="'sec-' + i" :ref="(el) => setSecRef(el, i)" v-html="sec.html"></div>
          <div v-if="sec.imgs.length" class="chunk-gallery" :class="{ wide: sec.imgs.length > 1 }">
            <figure v-for="(img, j) in sec.imgs" :key="img.src + j" class="gallery-item">
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
        </template>
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

      <!-- 项目展示图（兜底：只有没被小节认领的图才落在这里） -->
      <section class="detail-gallery" v-reveal v-if="galleryImages.length">
        <h2 class="section-title">项目展示</h2>
        <p class="gallery-hint">点击图片可查看完整大图</p>
        <div class="gallery-grid">
          <figure v-for="(img, i) in galleryImages" :key="img.src + i" class="gallery-item">
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

      <FeedbackWidget page="项目详情" :item="project.id" />

    <!-- 读完不用滚回顶部：底部返回 -->
    <BackBar to="/" label="返回上一页" />
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
  background: var(--accent-soft);
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
/* 前置亮点：去掉旧大标题，胶囊行紧贴 hero */
.detail-highlights {
  margin-bottom: 24px;
}
.detail-highlights .skill-tags {
  gap: 8px;
}
/* 目录条：横向滑动 chip，移动端友好 */
.detail-toc {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 24px;
  padding: 12px 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
}
.toc-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-muted);
  white-space: nowrap;
  line-height: 30px;
}
.toc-chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}
.toc-chip {
  flex: 0 0 auto;
  border: 1px solid var(--color-border);
  background: var(--bg);
  color: var(--color-text-muted);
  border-radius: 999px;
  padding: 5px 13px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}
.toc-chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.toc-chip.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
/* 目录跳转目标：留出顶栏高度，标题不被遮 */
.md-chunk {
  scroll-margin-top: 84px;
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

/* ===== 技术路线流程图（访客反馈 #3「希望加图示」）===== */
.flow-diagram {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 6px;
  margin: 4px 0 22px;
}
.flow-node {
  flex: 1 1 150px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 12px 10px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}
.flow-node-out {
  border-color: color-mix(in srgb, var(--color-accent) 40%, var(--color-border));
  background: color-mix(in srgb, var(--color-accent) 7%, var(--color-surface-2));
}
.flow-emoji {
  font-size: 1.25rem;
  line-height: 1;
}
.flow-name {
  font-size: 0.88rem;
  font-weight: 700;
}
.flow-note {
  font-size: 0.74rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}
.flow-arrow {
  align-self: center;
  flex: 0 0 auto;
  color: var(--color-text-muted);
  font-size: 1rem;
  padding: 0 2px;
}
/* 窄屏自动换行成竖排：箭头转向 */
@media (max-width: 640px) {
  .flow-arrow {
    transform: rotate(90deg);
    padding: 4px 0;
  }
}
</style>
