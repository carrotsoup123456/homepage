<script setup>
import { ref, computed } from 'vue'
import { sendToFormSubmit } from '../data/feedback.js'

// ------------------------------------------------------
// 轻量反馈组件：贴在内容末尾，问一句「对你有用吗」。
// 课程要求「收集反馈 → 评估 → 有依据地改进」，
// 这个组件就是「收集」这一环的入口。
// ------------------------------------------------------
const props = defineProps({
  // 反馈归属：'知识库' / 项目标题 / '首页'
  page: { type: String, default: '站点' },
  // 更细的粒度，例如某篇笔记的 id
  item: { type: String, default: '' },
})

const storageKey = computed(() => `homepage-feedback:${props.page}:${props.item}`)

// 之前反馈过就不再追问（只记在本机，不上报）
const remembered = ref(localStorage.getItem(storageKey.value) || '')

// ask → 选了态度后进入 comment → 提交后 done
const stage = ref(remembered.value ? 'done' : 'ask')
const rating = ref(remembered.value || '')
const comment = ref('')
const status = ref('idle') // idle | sending | error
const errorMsg = ref('')

function choose(value) {
  rating.value = value
  stage.value = 'comment'
}

async function submit() {
  status.value = 'sending'
  errorMsg.value = ''
  try {
    const { ok, message } = await sendToFormSubmit({
      _subject: '个人主页 · 内容反馈',
      page: props.page,
      item: props.item || '（整页）',
      rating: rating.value,
      comment: comment.value.trim() || '（未填写）',
      url: window.location.href,
    })

    if (ok) {
      localStorage.setItem(storageKey.value, rating.value)
      stage.value = 'done'
      status.value = 'idle'
    } else {
      status.value = 'error'
      errorMsg.value = message || '提交失败，请稍后再试。'
    }
  } catch (e) {
    status.value = 'error'
    errorMsg.value = '网络异常，请稍后再试。'
  }
}
</script>

<template>
  <aside class="fb" aria-live="polite">
    <!-- 已反馈过 -->
    <template v-if="stage === 'done'">
      <p class="fb-thanks">
        <span aria-hidden="true">✅</span>
        谢谢！你的反馈已收到（{{ remembered || rating }}）。
      </p>
      <p class="fb-thanks-sub">我会把它记录进《用户反馈与改进记录》，并据此改进内容。</p>
    </template>

    <!-- 询问态度 -->
    <template v-else-if="stage === 'ask'">
      <p class="fb-q">这部分内容对你有用吗？</p>
      <div class="fb-actions">
        <button class="fb-btn" @click="choose('有用')">
          <span aria-hidden="true">👍</span> 有用
        </button>
        <button class="fb-btn" @click="choose('还需改进')">
          <span aria-hidden="true">🤔</span> 还需改进
        </button>
      </div>
    </template>

    <!-- 追问一句话（可选） -->
    <template v-else>
      <p class="fb-q">
        你觉得「{{ rating }}」——能再说一句为什么吗？<span class="fb-optional">（选填）</span>
      </p>
      <label class="sr-only" for="fb-comment">补充说明</label>
      <textarea
        id="fb-comment"
        v-model="comment"
        class="fb-textarea"
        rows="3"
        placeholder="例如：例子太少 / 讲得很清楚 / 希望加图示…"
      ></textarea>
      <div class="fb-actions">
        <button class="fb-btn primary" :disabled="status === 'sending'" @click="submit">
          {{ status === 'sending' ? '提交中…' : '提交反馈' }}
        </button>
        <button class="fb-btn ghost" :disabled="status === 'sending'" @click="submit">
          跳过
        </button>
      </div>
      <p v-if="status === 'error'" class="fb-error">{{ errorMsg }}</p>
    </template>
  </aside>
</template>

<style scoped>
.fb {
  margin-top: 32px;
  padding: 22px 24px;
  background: var(--color-bg);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
}
.fb-q {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}
.fb-optional {
  font-weight: 400;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}
.fb-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.fb-btn {
  font: inherit;
  font-size: 0.88rem;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s var(--ease);
}
.fb-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.fb-btn.primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-color: var(--color-primary);
}
.fb-btn.primary:hover:not(:disabled) {
  filter: brightness(1.08);
  color: var(--color-on-primary);
}
.fb-btn.ghost {
  background: transparent;
  color: var(--color-text-muted);
}
.fb-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.fb-textarea {
  width: 100%;
  font: inherit;
  font-size: 0.9rem;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 12px;
  resize: vertical;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.fb-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.fb-thanks {
  font-size: 0.92rem;
  color: var(--color-text);
  font-weight: 600;
}
.fb-thanks-sub {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-top: 4px;
}
.fb-error {
  margin-top: 10px;
  font-size: 0.85rem;
  color: #b4523f;
}
</style>
