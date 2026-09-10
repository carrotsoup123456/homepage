<script setup>
import { RouterLink } from 'vue-router'
import { site, skills, projects, experiences, education, contacts } from '../data/site.js'
</script>

<template>
  <div>
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
        <RouterLink class="btn btn-primary" to="/about">了解我</RouterLink>
        <RouterLink class="btn btn-outline" to="/contact">联系我</RouterLink>
      </div>
    </section>

    <!-- 技能 -->
    <section id="skills" class="section">
      <div class="container" v-reveal>
        <h2 class="section-title">专业技能</h2>
        <p class="section-desc">我掌握的主要技术方向</p>
        <div class="skill-tags">
          <span v-for="s in skills" :key="s" class="skill-tag">{{ s }}</span>
        </div>
      </div>
    </section>

    <!-- 项目 -->
    <section id="projects" class="section section-alt" v-reveal>
      <div class="container">
        <h2 class="section-title">项目展示</h2>
        <p class="section-desc">点击项目卡片查看详情</p>
        <div class="card-grid grid-2">
          <RouterLink
            v-for="p in projects"
            :key="p.id"
            :to="`/project/${p.id}`"
            class="card project-card"
          >
            <div class="card-icon">{{ p.icon }}</div>
            <h3>{{ p.title }}</h3>
            <p v-html="p.short"></p>
            <div class="card-meta">
              <span v-if="p.tech" class="meta-tag">{{ p.tech }}</span>
              <span v-if="p.role" class="meta-tag meta-role">👤 {{ p.role }}</span>
            </div>
            <span class="card-more">查看详情 →</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 经历 -->
    <section id="experience" class="section" v-reveal>
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
    <section id="education" class="section section-alt" v-reveal>
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
  </div>
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

/* 交替背景的区块 */
.section-alt {
  background: var(--color-surface);
}

/* 项目卡片：作为链接，去掉默认下划线 */
.project-card {
  display: flex;
  flex-direction: column;
  color: inherit;
}

.card-more {
  margin-top: auto;
  padding-top: 16px;
  font-size: 0.9rem;
  color: var(--color-primary);
  font-weight: 600;
}

/* 项目卡片的元信息标签 */
.card-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}
</style>
