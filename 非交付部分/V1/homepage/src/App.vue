<script setup>
import { ref } from 'vue'

// 移动端导航开关
const menuOpen = ref(false)

// ---------------- 站点信息（已填充真实信息） ----------------
// 这些数据集中管理，后续只需修改这里即可更新主页
const site = {
  name: '刘博康',          // 姓名
  tagline: '计算机科学与技术学生',
  bio: '你好！我是一名计算机科学与技术的大一新生，兴趣广泛，包括但不限于研究股票、架子鼓演奏、阅读。',
  avatar: '/avatar.jpg',   // 头像图片路径
}

// 技能模块
const skills = [
  'Python',
  'AI 工具应用能力',
  '架子鼓（10 级）',
  '工程实践能力',
]

// 项目经历
const projects = [
  {
    icon: '🧠',
    title: 'Carbon Brain',
    desc: '使用机器学习预测 Polyam-N-Cu<sup>2+</sup> DAC 材料的饱和度，并让装置在「吸附」与「再生」两种模式间自动切换，确保持续不断的吸附功能。',
    tech: '机器学习',
    role: '项目组长',
  },
  {
    icon: '📈',
    title: '基于监督学习的股票量化软件',
    desc: '通过机器学习中的监督学习模型预测股市走向，并实时给出预测结果。',
    tech: 'LightGBM',
    role: '个人项目负责人',
  },
]

// 经历（实际经历，含图片；图片存放在 public/experience/）
const experiences = [
  {
    period: '高中阶段',
    org: '中山市中山纪念中学 校管乐团 / 弦乐团',
    role: '架子鼓手',
    desc: '担任校管乐团与弦乐团鼓手，在校期间多次参与展演活动（图1、2、3）。带队参加中山市第六届中小学生艺术展演活动管（弦）乐比赛，校管乐团《La La Land》获三等奖、弦乐团《il vento d\u2019 oro》获二等奖（图4、5）。',
    images: [
      { src: '/experience/band-1.jpg', alt: '架子鼓展演' },
      { src: '/experience/band-2.jpg', alt: '校管弦乐团演出' },
      { src: '/experience/band-3.jpg', alt: '舞台演出' },
      { src: '/experience/award-2.jpg', alt: '二等奖获奖证书' },
      { src: '/experience/award-3.jpg', alt: '三等奖获奖证书' },
    ],
  },
  {
    period: '高中阶段',
    org: '多校联办青年商赛',
    role: '组长',
    desc: '参与多校联办的青年商赛并担任组长，带领队伍获得比赛二等奖（图6）。',
    images: [
      { src: '/experience/business.jpg', alt: '青年商赛现场' },
    ],
  },
  {
    period: '高中阶段',
    org: '第六届星云模拟联合国大会',
    role: '德意志联邦共和国代表',
    desc: '参加第六届星云模拟联合国大会—2015 叙利亚局势会议，担任德意志联邦共和国代表（图7）；签署多份对德贸易合作，带领欧盟建立难民工厂项目，妥善安置叙利亚难民。',
    images: [
      { src: '/experience/mun.jpg', alt: '模拟联合国代表胸牌' },
    ],
  },
]

// 教育（学校/专业/时间）
const education = [
  {
    school: '天津大学深圳学院',
    major: '计算机科学与技术',
    period: '2026.09 - 至今',
    desc: '本科在读，计算机科学与技术专业。',
  },
  {
    school: '中山市中山纪念中学',
    major: '初中 / 高中',
    period: '2020.09 - 2026.06',
    desc: '初中、高中就读；期间任校管乐团与弦乐团鼓手。',
  },
]

// 联系方式（邮箱 + 电话）
const contacts = [
  { icon: '📧', label: 'carrotsoup@qq.com', href: 'mailto:carrotsoup@qq.com' },
  { icon: '📞', label: '电话 / 微信 / QQ：13420089540', href: 'tel:13420089540' },
]

// 导航菜单（根据实际存在的区块动态生成，定义在所有数据之后）
const navLinks = [
  { label: '首页', href: '#hero', show: true },
  { label: '技能', href: '#skills', show: skills.length > 0 },
  { label: '项目', href: '#projects', show: projects.length > 0 },
  { label: '经历', href: '#experience', show: experiences.length > 0 },
  { label: '教育', href: '#education', show: education.length > 0 },
  { label: '联系', href: '#contact', show: contacts.length > 0 },
].filter((item) => item.show)
</script>

<template>
  <!-- 顶部导航 -->
  <header class="site-header">
    <div class="container nav">
      <span class="nav-brand">{{ site.name }}</span>
      <button class="nav-toggle" aria-label="菜单" @click="menuOpen = !menuOpen">
        ☰
      </button>
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" @click="menuOpen = false">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </header>

  <main>
    <!-- 首页 / Hero -->
    <section id="hero" class="hero container">
      <img
        v-if="site.avatar"
        :src="site.avatar"
        class="hero-avatar"
        alt="头像"
      />
      <div v-else class="hero-avatar placeholder">👤</div>
      <h1 class="hero-name">{{ site.name }}</h1>
      <p class="hero-tagline">{{ site.tagline }}</p>
      <p class="hero-bio">{{ site.bio }}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#projects">查看我的项目</a>
        <a class="btn btn-outline" href="#contact">联系我</a>
      </div>
    </section>

    <!-- 技能 -->
    <section id="skills" class="section">
      <div class="container">
        <h2 class="section-title">专业技能</h2>
        <p class="section-desc">我掌握的主要技术方向</p>
        <div class="skill-tags">
          <span v-for="s in skills" :key="s" class="skill-tag">{{ s }}</span>
        </div>
      </div>
    </section>

    <!-- 项目 -->
    <section id="projects" class="section" style="background: var(--color-surface);">
      <div class="container">
        <h2 class="section-title">项目展示</h2>
        <p class="section-desc">我参与或完成的项目</p>
        <div class="card-grid grid-2">
          <div v-for="p in projects" :key="p.title" class="card">
            <div class="card-icon">{{ p.icon }}</div>
            <h3>{{ p.title }}</h3>
            <p v-html="p.desc"></p>
            <div class="card-meta">
              <span v-if="p.tech" class="meta-tag">{{ p.tech }}</span>
              <span v-if="p.role" class="meta-tag meta-role">👤 {{ p.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 经历 -->
    <section id="experience" class="section" v-if="experiences.length">
      <div class="container">
        <h2 class="section-title">经历</h2>
        <p class="section-desc">我的实践与活动经历</p>
        <ul class="timeline">
          <li v-for="e in experiences" :key="e.org + e.period" class="timeline-item">
            <div class="timeline-period">{{ e.period }}</div>
            <div class="timeline-org">{{ e.org }}</div>
            <div class="timeline-role">{{ e.role }}</div>
            <p>{{ e.desc }}</p>
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

    <!-- 教育 -->
    <section id="education" class="section" style="background: var(--color-surface);" v-if="education.length">
      <div class="container">
        <h2 class="section-title">教育背景</h2>
        <p class="section-desc">我的学习经历</p>
        <ul class="timeline">
          <li v-for="e in education" :key="e.school" class="timeline-item">
            <div class="timeline-period">{{ e.period }}</div>
            <div class="timeline-org">{{ e.school }}</div>
            <div class="timeline-role">{{ e.major }}</div>
            <p>{{ e.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="section" v-if="contacts.length">
      <div class="container">
        <h2 class="section-title">联系我</h2>
        <p class="section-desc">欢迎交流与合作</p>
        <div class="contact-links">
          <a
            v-for="c in contacts"
            :key="c.label"
            :href="c.href || '#'"
            :target="c.href ? '_blank' : '_self'"
          >
            <span>{{ c.icon }}</span>
            <span>{{ c.label }}</span>
          </a>
        </div>
      </div>
    </section>
  </main>

  <!-- 页脚 -->
  <footer class="site-footer">
    <p>© 2026 {{ site.name }} · 个人主页 V1</p>
  </footer>
</template>

<style scoped>
/* Hero 头像占位样式 */
.hero-avatar.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-text-muted);
}

/* 项目卡片的元信息标签 */
.card-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
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
</style>
