<script setup>
import { ref } from 'vue'
import { site, skillDetails, projects, education, contacts } from '../data/site.js'

// 技能卡片：点击展开「我拿它做过什么」。同一时间只展开一张，避免页面被撑得过长。
const openId = ref(null)
function toggle(id) {
  openId.value = openId.value === id ? null : id
}

// 「现在在做什么」——真实在推进的三件事
const nowList = [
  {
    icon: '🏯',
    title: '打磨一款模拟游戏',
    text: '《为官一方》的立项文档与可玩原型都已完成，正在做数值平衡校准与美术替换。',
  },
  {
    icon: '🧪',
    title: '把实验室的数据跑通',
    text: 'Carbon Brain 项目负责数据清洗与模型训练，目前跨日期泛化还是难题，正在补物理参数核对。',
  },
  {
    icon: '🛠️',
    title: '把重复劳动变成流程',
    text: '给日常用到的工具写技能与子 agent：改前先备份、改完必须验证，把踩过的坑固化成步骤。',
  },
]

// 我的工作方式——每条都是踩坑之后总结出来的
const principles = [
  {
    title: '先跑起来，再打磨',
    text: '不追求一次做到最好，先做出一个能运行的最小版本，再基于真实反馈迭代。',
  },
  {
    title: '数字要经得起追问',
    text: '写进简历的每个数字都要能说出它在什么区间、什么口径下产生。做不到或做失败的，也照实写。',
  },
  {
    title: '改前先备份，改后要验证',
    text: '动别人的代码前留好备份，改完必须用测试或实测数据证明真的对了，不靠感觉下结论。',
  },
  {
    title: '卡住了就换路',
    text: '同一个办法试两遍还不行就换一条完全不同的路，而不是硬耗——这是给自己定的硬规矩。',
  },
]
</script>

<template>
  <div class="container page">
    <section class="about-hero" v-reveal>
      <img
        v-if="site.avatar"
        :src="site.avatar"
        class="about-avatar"
        alt="刘博康的头像"
        width="120"
        height="120"
      />
      <div>
        <h1 class="page-title">{{ site.name }}</h1>
        <p class="page-subtitle">{{ site.tagline }}</p>
        <p class="page-text">{{ site.bio }}</p>
        <p class="page-text">
          我最感兴趣的是<strong>把课堂上的概念变成能跑起来、能被验证的东西</strong>——不管是实验室里的
          材料数据，还是一台只在纸上见过的模拟游戏。
        </p>
      </div>
    </section>

    <!-- ===================== 现在在做什么 ===================== -->
    <section class="about-block" v-reveal>
      <p class="eyebrow">Right Now</p>
      <h2 class="section-title">现在在做什么</h2>
      <div class="now-grid">
        <div v-for="item in nowList" :key="item.title" class="now-card">
          <div class="now-icon" aria-hidden="true">{{ item.icon }}</div>
          <h3 class="now-title">{{ item.title }}</h3>
          <p class="now-text">{{ item.text }}</p>
        </div>
      </div>
    </section>

    <!-- ===================== 专业技能（可展开） ===================== -->
    <section class="about-block" v-reveal>
      <p class="eyebrow">Skills</p>
      <h2 class="section-title">专业技能</h2>
      <p class="block-hint">点击任意一项，展开我具体拿它做过什么。</p>

      <div class="skill-tags">
        <button
          v-for="s in skillDetails"
          :key="s.id"
          type="button"
          class="skill-tag"
          :class="{ active: openId === s.id }"
          :aria-expanded="openId === s.id ? 'true' : 'false'"
          @click="toggle(s.id)"
        >
          <span>{{ s.name }}</span>
          <span class="skill-caret" aria-hidden="true">＋</span>
        </button>
      </div>

      <div
        v-for="s in skillDetails"
        v-show="openId === s.id"
        :key="`panel-${s.id}`"
        class="skill-panel"
      >
        <div class="skill-panel-head">
          <h3 class="skill-panel-title">{{ s.name }}</h3>
          <span class="skill-level">{{ s.level }}</span>
        </div>
        <p class="skill-panel-summary">{{ s.summary }}</p>
        <ul class="skill-points">
          <li v-for="p in s.points" :key="p">{{ p }}</li>
        </ul>
        <p class="skill-evidence">
          <span class="evidence-label">可以在这些项目里看到：</span>
          <span v-for="e in s.evidence" :key="e" class="evidence-chip">{{ e }}</span>
        </p>
      </div>
    </section>

    <!-- ===================== 项目索引 ===================== -->
    <section class="about-block" v-reveal>
      <p class="eyebrow">Selected Work</p>
      <h2 class="section-title">我做过的东西</h2>
      <ul class="work-list">
        <li v-for="p in projects" :key="p.id" class="work-item">
          <span class="work-icon" aria-hidden="true">{{ p.icon }}</span>
          <div class="work-body">
            <RouterLink class="work-title" :to="`/project/${p.id}`">{{ p.title }}</RouterLink>
            <p class="work-text">{{ p.short }}</p>
          </div>
          <span class="work-role">{{ p.role }}</span>
        </li>
      </ul>
      <p class="work-note">
        其中 TO-DO Panel 与 Claude Code 桌面版属于<strong>对他人的开源 / 成品软件做本地二次开发</strong>，
        详情页里已注明上游来源，不主张原创。
      </p>
    </section>

    <!-- ===================== 我的工作方式 ===================== -->
    <section class="about-block" v-reveal>
      <p class="eyebrow">How I Work</p>
      <h2 class="section-title">我的工作方式</h2>
      <div class="principle-grid">
        <div v-for="(item, i) in principles" :key="item.title" class="principle-card">
          <span class="principle-index">0{{ i + 1 }}</span>
          <h3 class="principle-title">{{ item.title }}</h3>
          <p class="principle-text">{{ item.text }}</p>
        </div>
      </div>
    </section>

    <!-- ===================== 教育经历 ===================== -->
    <section class="about-block" v-reveal>
      <p class="eyebrow">Education</p>
      <h2 class="section-title">教育经历</h2>
      <ul class="edu-list">
        <li v-for="e in education" :key="e.school">
          <span class="edu-year">{{ e.period }}</span>
          <div>
            <strong>{{ e.school }}</strong>
            <span class="edu-major">{{ e.major }}</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="about-block" v-reveal>
      <h2 class="section-title">联系我</h2>
      <div class="contact-links">
        <a
          v-for="c in contacts"
          :key="c.label"
          :href="c.href || '#'"
          :target="c.href ? '_blank' : '_self'"
          rel="noopener"
        >
          <span aria-hidden="true">{{ c.icon }}</span>
          <span>{{ c.label }}</span>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 48px;
  padding-bottom: 64px;
}
.about-hero {
  display: flex;
  gap: 32px;
  align-items: center;
  margin-bottom: 56px;
}
.about-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-surface-2);
  box-shadow: var(--shadow);
  flex-shrink: 0;
}
.page-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 6px;
}
.page-subtitle {
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 12px;
}
.page-text {
  color: var(--color-text-muted);
  max-width: 640px;
}
.page-text + .page-text {
  margin-top: 10px;
}
.about-block {
  margin-bottom: 56px;
}
.block-hint {
  color: var(--color-text-muted);
  font-size: 0.92rem;
  margin-bottom: 18px;
}

/* ---------- 现在在做什么 ---------- */
.now-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 24px;
}
.now-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 22px;
}
.now-icon {
  font-size: 1.6rem;
  margin-bottom: 10px;
}
.now-title {
  font-size: 1.02rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.now-text {
  color: var(--color-text-muted);
  font-size: 0.92rem;
  line-height: 1.7;
}

/* ---------- 技能标签（可展开） ---------- */
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}
.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font: inherit;
  font-size: 0.95rem;
  padding: 9px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    border-color 0.25s var(--ease),
    color 0.25s var(--ease),
    background 0.25s var(--ease);
}
.skill-tag:hover {
  border-color: var(--color-green);
  color: var(--color-green);
  background: var(--color-green-soft);
}
.skill-tag.active {
  border-color: var(--color-green);
  color: var(--color-green);
  background: var(--color-green-soft);
}
.skill-caret {
  font-size: 0.85rem;
  line-height: 1;
  transition: transform 0.25s var(--ease);
}
.skill-tag.active .skill-caret {
  transform: rotate(45deg);
}
.skill-panel {
  margin-top: 22px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-green);
  border-radius: 14px;
  padding: 24px 26px;
}
.skill-panel-head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.skill-panel-title {
  font-size: 1.1rem;
  font-weight: 700;
}
.skill-level {
  font-size: 0.76rem;
  letter-spacing: 0.04em;
  color: var(--color-green);
  background: var(--color-green-soft);
  border-radius: 999px;
  padding: 3px 10px;
}
.skill-panel-summary {
  color: var(--color-text-muted);
  margin-bottom: 14px;
}
.skill-points {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  display: grid;
  gap: 9px;
}
.skill-points li {
  position: relative;
  padding-left: 18px;
  font-size: 0.95rem;
  line-height: 1.7;
}
.skill-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-green);
}
.skill-evidence {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.86rem;
}
.evidence-label {
  color: var(--color-text-muted);
}
.evidence-chip {
  background: var(--color-surface-2);
  border-radius: 999px;
  padding: 3px 11px;
}

/* ---------- 项目索引 ---------- */
.work-list {
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
  display: grid;
  gap: 12px;
}
.work-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px 20px;
}
.work-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}
.work-body {
  flex: 1;
  min-width: 0;
}
.work-title {
  font-weight: 700;
  color: var(--color-text);
}
.work-title:hover {
  color: var(--color-green);
}
.work-text {
  color: var(--color-text-muted);
  font-size: 0.88rem;
  margin-top: 3px;
}
.work-role {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 4px 11px;
  flex-shrink: 0;
}
.work-note {
  margin-top: 16px;
  font-size: 0.86rem;
  color: var(--color-text-muted);
  line-height: 1.7;
}

/* ---------- 工作方式 ---------- */
.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 24px;
}
.principle-card {
  border-top: 2px solid var(--color-green);
  padding-top: 16px;
}
.principle-index {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-green);
}
.principle-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 6px 0 8px;
}
.principle-text {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.75;
}

/* ---------- 教育经历 ---------- */
.edu-list {
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
  display: grid;
  gap: 14px;
}
.edu-list li {
  display: flex;
  gap: 18px;
  align-items: baseline;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px 20px;
}
.edu-year {
  color: var(--color-text-muted);
  font-size: 0.86rem;
  flex-shrink: 0;
}
.edu-major {
  color: var(--color-text-muted);
  margin-left: 10px;
  font-size: 0.92rem;
}

.about-block .contact-links {
  justify-content: flex-start;
}

/* 键盘可达：焦点必须看得见 */
.skill-tag:focus-visible,
.work-title:focus-visible,
.contact-links a:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 3px;
  border-radius: 999px;
}

@media (max-width: 640px) {
  .about-hero {
    flex-direction: column;
    text-align: center;
  }
  /* 工作项改成两行：第一行「图标 + 标题/说明」，第二行角色标签独占整行。
     起因：标签写了 flex-shrink: 0（不许压缩，最长一条自己就 366px 宽），
     文字块写了 flex: 1 + min-width: 0（可以被压到 0），两者相加超过手机宽度就装不下，
     表现为横向溢出、标题被挤成"一个字一行"的竖排。
     原来打算用 flex-wrap: wrap 解决，但它救不了：文字块的初始宽度是 0，"永远装得下"，
     浏览器找不到换行的理由。所以这里换成网格，让标签明确占一整行。 */
  .work-item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 12px;
    align-items: center;
  }
  .work-icon {
    grid-area: 1 / 1;
  }
  .work-body {
    grid-area: 1 / 2;
  }
  .work-role {
    grid-area: 2 / 1 / 3 / 3;
    justify-self: start;
    margin-left: 0;
  }
}
</style>
