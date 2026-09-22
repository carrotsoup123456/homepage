<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { site, skills, projects, experiences, education, contacts } from '../data/site.js'
import FeedbackWidget from '../components/FeedbackWidget.vue'

// 资源路径（兼容 GitHub Pages 的 base 前缀）
const base = import.meta.env.BASE_URL
const heroImg = `${base}art/hero-forest.jpg`
const mossImg = `${base}art/moss-macro.jpg`

// 悬浮注解：展示我的兴趣关键词
const floatTags = ['Python', 'AI 工具应用', '架子鼓 10 级']

// 统计数字（滚动到可视区时从 0 递增到目标值）
const stats = [
  { num: 2, label: '自主项目' },
  { num: 10, label: '架子鼓等级' },
  { num: 3, label: '实践经历' },
  { num: 2026, label: '入学天大' },
]

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const statValues = ref(
  prefersReduced ? stats.map((s) => s.num) : stats.map(() => 0)
)
const statGrid = ref(null)
let statObserver = null

function runCountUp() {
  if (prefersReduced) return
  const targets = stats.map((s) => s.num)
  const duration = 1500
  const startTime = performance.now()
  const tick = (now) => {
    const t = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    statValues.value = targets.map((v) => Math.round(v * eased))
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// 森林萤火虫：随机位置 / 大小 / 漂移 / 时长
const fireflies = Array.from({ length: 22 }, (_, i) => {
  const size = +(4 + Math.random() * 5).toFixed(2)
  return {
    id: i,
    style: {
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 100).toFixed(2)}%`,
      width: `${size}px`,
      height: `${size}px`,
      '--dur': `${(7 + Math.random() * 8).toFixed(2)}s`,
      '--delay': `${(Math.random() * 6).toFixed(2)}s`,
      '--dx': `${((Math.random() - 0.5) * 70).toFixed(1)}px`,
      '--dy': `${(-(24 + Math.random() * 70)).toFixed(1)}px`,
      '--peak': `${(0.7 + Math.random() * 0.3).toFixed(2)}`,
    },
  }
})

// ---- Hero 分层视差 ----
const heroEl = ref(null)
let ticking = false

function updateParallax() {
  const el = heroEl.value
  if (el) {
    const y = window.scrollY
    const limit = el.offsetHeight || 1
    const p = Math.min(y, limit)
    el.style.setProperty('--parallax', `${p * 0.22}px`)
    el.style.setProperty('--portrait-parallax', `${p * -0.07}px`)
  }
  ticking = false
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(updateParallax)
  }
}

// ---- 鼠标跟随柔光（rAF 节流） ----
let lastMove = null
let glowTicking = false

function onHeroMove(e) {
  lastMove = e
  if (!glowTicking) {
    glowTicking = true
    requestAnimationFrame(applyGlow)
  }
}

function applyGlow() {
  const el = heroEl.value
  if (el && lastMove) {
    const rect = el.getBoundingClientRect()
    el.style.setProperty(
      '--mx',
      `${((lastMove.clientX - rect.left) / rect.width) * 100}%`
    )
    el.style.setProperty(
      '--my',
      `${((lastMove.clientY - rect.top) / rect.height) * 100}%`
    )
  }
  glowTicking = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  updateParallax()

  if (statGrid.value && typeof IntersectionObserver !== 'undefined') {
    statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCountUp()
            statObserver.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    statObserver.observe(statGrid.value)
  } else {
    runCountUp()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (statObserver) statObserver.disconnect()
})
</script>

<template>
  <div>
    <!-- ===================== Hero V3 ===================== -->
    <section
      id="hero"
      ref="heroEl"
      class="hero-v3"
      @mousemove="onHeroMove"
      :style="{ '--hero-img': `url(${heroImg})` }"
    >
      <div class="hero-bg" aria-hidden="true"></div>

      <!-- 氛围层：森林萤火虫 + 鼠标柔光 -->
      <div class="fireflies" aria-hidden="true">
        <span v-for="f in fireflies" :key="f.id" :style="f.style"></span>
      </div>
      <div class="hero-glow" aria-hidden="true"></div>

      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="hero-kicker">天津大学深圳学院 · 计算机科学与技术</p>
          <h1 class="hero-title">
            {{ site.name }}<br />
            <span class="accent">Curious</span> Builder
          </h1>
          <p class="hero-tagline-v3">{{ site.bio }}</p>
          <div class="hero-actions-v3">
            <RouterLink class="btn btn-light" to="/about">了解我</RouterLink>
            <RouterLink class="btn btn-ghost" to="/contact">联系我</RouterLink>
          </div>
        </div>

        <div class="hero-portrait-wrap">
          <div class="hero-frame">
            <img v-if="site.avatar" :src="site.avatar" alt="刘博康" />
          </div>
          <span
            v-for="(t, i) in floatTags"
            :key="t"
            class="float-tag"
            :class="`t${i + 1}`"
            >{{ t }}</span
          >
        </div>
      </div>

      <div class="scroll-cue" aria-hidden="true">
        Scroll
        <span></span>
      </div>
    </section>

    <!-- ===================== 技能跑马灯 ===================== -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <template v-for="n in 2" :key="n">
          <span v-for="s in skills" :key="`${n}-${s}`" class="marquee-item">{{
            s
          }}</span>
        </template>
      </div>
    </div>

    <!-- ===================== 宣言（Bayshore 画框） ===================== -->
    <section class="section" v-reveal>
      <div class="container manifesto-inner">
        <div class="manifesto-media">
          <div class="frame-card">
            <img :src="mossImg" alt="苔藓与新芽的微距特写" loading="lazy" />
          </div>
        </div>
        <div class="manifesto-copy">
          <p class="eyebrow">My Approach</p>
          <p class="manifesto-quote">
            以 <em>好奇心</em> 为起点，<br />
            把想法一路做到「可以运行」的现实。
          </p>
          <p class="manifesto-body">
            我相信最好的学习方式是动手：先跑起来，再打磨。从材料预测到股票量化，
            我把课堂上的概念变成一个个能被点击、被验证的原型。
          </p>
          <div class="stat-grid" ref="statGrid" v-reveal-stagger style="margin-top: 36px">
            <div v-for="(s, i) in stats" :key="s.label" class="stat">
              <div class="stat-num">{{ statValues[i] }}</div>
              <div class="stat-label">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 项目（Amperos 左右交替） ===================== -->
    <section id="projects" class="section section-alt">
      <div class="container">
        <div v-reveal>
          <p class="eyebrow">Selected Work</p>
          <h2 class="section-title">项目展示</h2>
          <p class="section-desc">
            从想法到原型的两次完整实践，点击标题可查看详情。
          </p>
        </div>

        <div
          v-for="(p, i) in projects"
          :key="p.id"
          class="feature-row"
          :class="{ reverse: i % 2 === 1 }"
          v-reveal
        >
          <div class="feature-body">
            <div class="feature-index">0{{ i + 1 }} — {{ p.tech }}</div>
            <h3 class="feature-title">
              <RouterLink :to="`/project/${p.id}`" style="color: inherit"
                >{{ p.title }}</RouterLink
              >
            </h3>
            <p class="feature-text" v-html="p.desc"></p>
            <ul class="feature-list" v-reveal-stagger="{ step: 70 }">
              <li v-for="h in p.highlights" :key="h">{{ h }}</li>
            </ul>
            <RouterLink class="btn btn-outline" :to="`/project/${p.id}`"
              >查看详情 →</RouterLink
            >
          </div>
          <div class="feature-media">
            <div class="frame-card">
              <img
                v-if="p.images && p.images.length"
                :src="p.images[0].src"
                :alt="p.images[0].alt"
                loading="lazy"
              />
            </div>
            <span class="media-badge">{{ p.role }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 经历 ===================== -->
    <section id="experience" class="section">
      <div class="container">
        <div v-reveal>
          <p class="eyebrow">Beyond Code</p>
          <h2 class="section-title">经历</h2>
          <p class="section-desc">舞台、商赛与模拟联合国——课堂之外的成长。</p>
        </div>
        <ul class="timeline" v-reveal-stagger>
          <li v-for="e in experiences" :key="e.org + e.period" class="timeline-item">
            <div class="timeline-period">{{ e.period }}</div>
            <div class="timeline-org">{{ e.org }}</div>
            <div class="timeline-role">{{ e.role }}</div>
            <p style="color: var(--color-text-muted)">{{ e.desc }}</p>
            <div v-if="e.images && e.images.length" class="exp-gallery">
              <img
                v-for="img in e.images"
                :key="img.src"
                :src="img.src"
                :alt="img.alt"
                class="exp-img"
                loading="lazy"
              />
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===================== 教育 ===================== -->
    <section id="education" class="section section-alt">
      <div class="container">
        <div v-reveal>
          <p class="eyebrow">Education</p>
          <h2 class="section-title">教育背景</h2>
        </div>
        <ul class="timeline" v-reveal-stagger>
          <li v-for="e in education" :key="e.school" class="timeline-item">
            <div class="timeline-period">{{ e.period }}</div>
            <div class="timeline-org">{{ e.school }}</div>
            <div class="timeline-role">{{ e.major }}</div>
            <p style="color: var(--color-text-muted)">{{ e.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===================== 结尾 CTA ===================== -->
    <section class="section cta" v-reveal>
      <div class="container">
        <h2 class="cta-title">想聊聊技术、项目或音乐？</h2>
        <p class="cta-text">
          欢迎交流合作，也欢迎给我反馈。留言会直接发送到我的邮箱。
        </p>
        <div class="hero-actions-v3" style="justify-content: center">
          <RouterLink class="btn btn-primary" to="/contact">给我留言</RouterLink>
          <a
            v-for="c in contacts.slice(0, 1)"
            :key="c.label"
            class="btn btn-outline"
            :href="c.href"
            >{{ c.icon }} {{ c.label }}</a
          >
        </div>

        <!-- 整站反馈入口（对应课程要求：收集反馈 → 有依据地改进） -->
        <FeedbackWidget page="首页" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.manifesto-media {
  position: relative;
}
</style>
