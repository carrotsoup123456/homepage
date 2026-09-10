<script setup>
import { site, skills, contacts } from '../data/site.js'
</script>

<template>
  <div class="container page">
    <section class="about-hero" v-reveal>
      <img v-if="site.avatar" :src="site.avatar" class="about-avatar" alt="头像" />
      <div>
        <h1 class="page-title">{{ site.name }}</h1>
        <p class="page-subtitle">{{ site.tagline }}</p>
        <p class="page-text">{{ site.bio }}</p>
      </div>
    </section>

    <section class="about-block" v-reveal>
      <h2 class="section-title">专业技能</h2>
      <div class="skill-tags">
        <span v-for="s in skills" :key="s" class="skill-tag">{{ s }}</span>
      </div>
    </section>

    <section class="about-block" v-reveal>
      <h2 class="section-title">联系我</h2>
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
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 48px;
  padding-bottom: 48px;
}
.about-hero {
  display: flex;
  gap: 32px;
  align-items: center;
  margin-bottom: 48px;
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
.about-block {
  margin-bottom: 40px;
}
.about-block .contact-links {
  justify-content: flex-start;
}

@media (max-width: 640px) {
  .about-hero {
    flex-direction: column;
    text-align: center;
  }
}
</style>
