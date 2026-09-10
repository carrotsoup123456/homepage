<script setup>
import { ref } from 'vue'
import { contacts } from '../data/site.js'

const form = ref({ name: '', email: '', message: '' })

// 提交状态: idle | sending | success | error
const status = ref('idle')
const submitMsg = ref('')

// 公网版联系表单后端：FormSubmit（无需注册 / 无需邮箱验证循环）。
// 留言会直接发送到下面的邮箱；首次提交会收到一封激活邮件，点击激活后永久生效。
// 也可通过环境变量 VITE_FORM_ENDPOINT 覆盖（便于更换后端）。
const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/carrotsoup@qq.com'

async function handleSubmit() {
  if (!form.value.name.trim() || !form.value.message.trim()) return
  status.value = 'sending'
  submitMsg.value = ''
  try {
    // FormSubmit 的 AJAX 接口：JSON 提交并返回结构化结果
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        // FormSubmit 约定字段
        _replyto: form.value.email || 'no-reply@example.com',
        _subject: '来自个人主页的留言',
        // 关闭 reCAPTCHA，保证 AJAX 静默提交（课程演示用）
        _captcha: 'false',
        _template: 'table',
      }),
    })
    const data = await res.json()
    // FormSubmit 返回 { success: "true" | true, message: "..." }
    const ok = res.ok && (data.success === true || data.success === 'true')
    if (ok) {
      status.value = 'success'
      submitMsg.value = '已收到你的留言！我会尽快回复。'
      form.value = { name: '', email: '', message: '' }
    } else {
      status.value = 'error'
      submitMsg.value = data?.message || '提交失败，请稍后再试。'
    }
  } catch (e) {
    status.value = 'error'
    submitMsg.value = '无法连接表单服务，请稍后再试。'
  }
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
        <button class="btn btn-primary" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? '提交中…' : '提交' }}
        </button>
      </form>

      <p v-if="status === 'success'" class="form-done">✅ {{ submitMsg }}</p>
      <p v-else-if="status === 'error'" class="form-error">⚠️ {{ submitMsg }}</p>
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
.form-error {
  margin-top: 16px;
  color: var(--color-danger, #dc2626);
  font-weight: 600;
}

@media (max-width: 560px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
