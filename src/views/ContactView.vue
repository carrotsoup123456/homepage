<script setup>
import { ref } from 'vue'
import { contacts } from '../data/site.js'

const form = ref({ name: '', email: '', message: '' })
const submitted = ref(false)

// 本地提交：模拟发送（不真正发邮件），记录反馈便于后续复用
function handleSubmit() {
  if (!form.value.name || !form.value.message) return
  submitted.value = true
  // 这里可将数据存 localStorage 或后续接入后端
  console.log('反馈收到：', JSON.stringify(form.value))
}
</script>

<template>
  <div class="container page">
    <section v-reveal>
      <h1 class="page-title">联系我</h1>
      <p class="page-subtitle">欢迎交流与合作，也可以给我反馈意见</p>
    </section>

    <!-- 联系方式 -->
    <section class="contact-card" v-reveal>
      <div class="contact-links left">
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

    <!-- 反馈表单 -->
    <section class="form-card" v-reveal>
      <h2 class="form-title">留言 / 反馈</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-field">
            <label>你的称呼</label>
            <input v-model="form.name" type="text" required placeholder="怎么称呼你？" />
          </div>
          <div class="form-field">
            <label>邮箱（选填）</label>
            <input v-model="form.email" type="email" placeholder="you@example.com" />
          </div>
        </div>
        <div class="form-field">
          <label>内容</label>
          <textarea v-model="form.message" required rows="5" placeholder="想对我说什么？"></textarea>
        </div>
        <button class="btn btn-primary" type="submit">提交</button>
      </form>

      <p v-if="submitted" class="form-done">✅ 已收到你的留言！这只是本地演示，尚未真正发出。</p>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 48px;
  padding-bottom: 48px;
  max-width: 720px;
}
.page-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 6px;
}
.page-subtitle {
  color: var(--color-text-muted);
  margin-bottom: 32px;
}
.contact-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  margin-bottom: 24px;
}
.contact-links.left {
  justify-content: flex-start;
}
.form-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--shadow);
}
.form-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.form-field label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
.form-field input,
.form-field textarea {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 12px;
  font-size: 0.95rem;
  color: var(--color-text);
  font-family: inherit;
  transition: border-color 0.2s;
}
.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}
.form-done {
  margin-top: 16px;
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 560px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
