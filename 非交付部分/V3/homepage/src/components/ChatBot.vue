<script setup>
// ======================================================
// 数字分身聊天窗（第一版：纯前端检索式问答）
// - 右下角悬浮按钮 + 面板；匹配逻辑全在本机，不上传输入
// - 无障碍：aria 标注、Esc 关面板、面板打开时输入框自动聚焦
// ======================================================
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { botName, botQa, botFallback, botWelcome } from '../data/bot-qa.js'

const open = ref(false)
const input = ref('')
const inputEl = ref(null)
const listEl = ref(null)

// 消息列表：{ from: 'bot' | 'me', text, suggest?: string[] }
const messages = ref([{ from: 'bot', text: botWelcome.a, suggest: botWelcome.suggest }])

// 关键词匹配：命中越长的关键词得分越高（长词更具体）
function match(text) {
  const t = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const item of botQa) {
    let score = 0
    for (const k of item.keys) {
      const key = k.toLowerCase()
      if (t.includes(key)) score += key.length * 2 // 完整命中关键词
      else if (key.length >= 2 && key.includes(t) && t.length >= 2) score += t.length // 输入是关键词前缀
    }
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }
  return bestScore >= 2 ? best : null
}

function reply(text) {
  const hit = match(text)
  const ans = hit || botFallback
  messages.value.push({ from: 'bot', text: ans.a, suggest: ans.suggest })
  scrollToEnd()
}

function send() {
  const text = input.value.trim()
  if (!text) return
  messages.value.push({ from: 'me', text })
  input.value = ''
  scrollToEnd()
  // 模拟「正在输入」的停顿，太快返回会显得像弹报错
  setTimeout(() => reply(text), 350)
}

function askSuggestion(q) {
  messages.value.push({ from: 'me', text: q })
  scrollToEnd()
  setTimeout(() => reply(q), 350)
}

async function scrollToEnd() {
  await nextTick()
  if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
}

async function toggle() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    inputEl.value?.focus()
  }
}

function onKeydown(e) {
  if (e.key === 'Escape' && open.value) open.value = false
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <!-- 悬浮按钮 -->
  <button
    type="button"
    class="bot-fab"
    :aria-expanded="open"
    aria-controls="bot-panel"
    :aria-label="open ? '关闭数字分身对话' : '和数字分身聊聊'"
    @click="toggle"
  >
    <span aria-hidden="true">{{ open ? '✕' : '💬' }}</span>
  </button>

  <!-- 对话面板 -->
  <Transition name="bot-pop">
    <section
      v-if="open"
      id="bot-panel"
      class="bot-panel"
      role="dialog"
      :aria-label="`与${botName}对话`"
    >
      <header class="bot-head">
        <span class="bot-avatar" aria-hidden="true">🥕</span>
        <div>
          <p class="bot-name">{{ botName }}</p>
          <p class="bot-tag">检索式分身 · 对话不上传</p>
        </div>
      </header>

      <div ref="listEl" class="bot-list" aria-live="polite">
        <div
          v-for="(m, i) in messages"
          :key="i"
          class="bot-msg"
          :class="m.from === 'me' ? 'from-me' : 'from-bot'"
        >
          <p class="bot-bubble">{{ m.text }}</p>
          <div v-if="m.suggest && m.suggest.length" class="bot-suggest">
            <button
              v-for="q in m.suggest"
              :key="q"
              type="button"
              class="bot-chip"
              @click="askSuggestion(q)"
            >
              {{ q }}
            </button>
          </div>
        </div>
      </div>

      <form class="bot-input" @submit.prevent="send">
        <input
          ref="inputEl"
          v-model="input"
          type="text"
          placeholder="问点什么…"
          aria-label="输入想问的问题"
          maxlength="100"
        />
        <button type="submit" class="bot-send" aria-label="发送">➤</button>
      </form>
    </section>
  </Transition>
</template>

<style scoped>
.bot-fab {
  position: fixed;
  right: 24px;
  bottom: 92px; /* 回顶按钮在 28px，分身叠在它上方 */
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: var(--color-green);
  color: #fff;
  font-size: 1.35rem;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(46, 125, 79, 0.4);
  z-index: 90;
  transition: transform 0.15s;
}
.bot-fab:hover {
  transform: translateY(-3px);
}
.bot-panel {
  position: fixed;
  right: 24px;
  bottom: 158px;
  z-index: 95;
  width: min(380px, calc(100vw - 32px));
  height: min(520px, calc(100dvh - 200px));
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.bot-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-2);
}
.bot-avatar {
  font-size: 1.5rem;
}
.bot-name {
  font-weight: 700;
  font-size: 0.95rem;
}
.bot-tag {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}
.bot-list {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bot-msg {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 88%;
}
.from-me {
  align-self: flex-end;
  align-items: flex-end;
}
.from-bot {
  align-self: flex-start;
}
.bot-bubble {
  margin: 0;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 0.92rem;
  line-height: 1.7;
  white-space: pre-wrap;
}
.from-me .bot-bubble {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-bottom-right-radius: 4px;
}
.from-bot .bot-bubble {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-bottom-left-radius: 4px;
}
.bot-suggest {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.bot-chip {
  border: 1px solid var(--color-green);
  color: var(--color-green);
  background: none;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  min-height: 32px;
}
.bot-chip:hover {
  background: color-mix(in srgb, var(--color-green) 12%, transparent);
}
.bot-input {
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid var(--color-border);
}
.bot-input input {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 0.92rem;
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 44px;
}
.bot-send {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: var(--color-green);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  flex-shrink: 0;
}
.bot-pop-enter-active,
.bot-pop-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.bot-pop-enter-from,
.bot-pop-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
@media (max-width: 768px) {
  .bot-fab {
    right: 16px;
    bottom: 92px;
  }
  .bot-panel {
    right: 16px;
    bottom: 156px;
    width: calc(100vw - 32px);
    height: min(480px, calc(100dvh - 190px));
  }
}
</style>
