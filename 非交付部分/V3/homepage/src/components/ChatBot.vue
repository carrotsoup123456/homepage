<script setup>
// ======================================================
// 数字分身聊天窗（v2：智能检索引擎版）
// - 匹配逻辑在 src/data/bot.js（纯函数，已单测覆盖）
// - 能力：同义词 / 错别字容错 / did-you-mean 确认 /
//   「第二个·下一个」序数追问 / 智能兜底候选 / 答案带跳转按钮
// - 隐私不变：全部匹配在本机完成，不上传输入，关掉就没
// ======================================================
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { match } from '../data/bot.js'
import {
  botName,
  botQa,
  botFallback,
  botDidYouMean,
  botWelcome,
  PROJECT_ORDER,
} from '../data/bot-qa.js'

const open = ref(false)
const input = ref('')
const inputEl = ref(null)
const listEl = ref(null)
const typing = ref(false)

// 输入框上方的固定问题栏：能力目录 + 访客最感兴趣 + 八卦类（一行横滚）
// 横滚对触摸天然友好；桌面滚轮在横向有滚动余地时转成横向滚动，不会滚不动。
const quickQuestions = [
  '我可以问什么问题？',
  '他做过哪些项目？',
  '有什么可以试玩的？',
  '他未来有什么打算？',
  '他有什么兴趣爱好？',
  '他有对象吗？',
  '你喜欢什么类型的？',
]
const quickRef = ref(null)
function onQuickWheel(e) {
  const el = quickRef.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  if (max <= 0) return
  e.preventDefault()
  el.scrollLeft += e.deltaY || e.deltaX
}

// 对话上下文：接住「第二个 / 下一个」这类追问
const context = ref({ type: 'none', idx: 0, projectIds: PROJECT_ORDER })

// 消息：{ from:'bot'|'me', text, suggest?, candidates?, links?, fullText? }
const messages = ref([{ from: 'bot', text: botWelcome.a, suggest: botWelcome.suggest }])

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let typeTimer = null
function stopTyping() {
  if (typeTimer) {
    clearInterval(typeTimer)
    typeTimer = null
  }
  typing.value = false
}

// 打字机效果：逐字出现；reduced-motion、页面不可见（后台标签定时器被冻结）或打断时直接给全文
function typewrite(msg, done) {
  const pageHidden = typeof document !== 'undefined' && document.hidden
  if (reducedMotion || pageHidden) {
    msg.text = msg.fullText
    finishType(msg)
    done?.()
    return
  }
  typing.value = true
  let i = 0
  const step = 2 // 每次吐出 2 字
  typeTimer = setInterval(() => {
    i += step
    if (i >= msg.fullText.length) {
      msg.text = msg.fullText
      stopTyping()
      finishType(msg)
      done?.()
    } else {
      msg.text = msg.fullText.slice(0, i)
      scrollToEnd()
    }
  }, 24)
}

// 打完后才显示追问 chip 和按钮（避免用户点错半截内容）
function finishType(msg) {
  msg.ready = true
  scrollToEnd()
}

function reply(rawText) {
  const r = match(rawText, botQa, context.value)
  if (r.contextUpdate) context.value = { ...context.value, ...r.contextUpdate }

  if (r.kind === 'empty') return

  if (r.kind === 'answer') {
    const suggest = [...(r.entry.suggest || [])]
    if (r.also) suggest.push(r.also.q) // 多意图：另一个强命中作为追问
    const msg = {
      from: 'bot',
      text: '',
      fullText: r.entry.a,
      suggest: suggest.length ? suggest : undefined,
      links: r.entry.links,
      ready: false,
    }
    messages.value.push(msg)
    scrollToEnd()
    typewrite(msg)
    return
  }

  if (r.kind === 'out-of-range') {
    const msg = {
      from: 'bot',
      text: '',
      fullText: `一共就 ${r.total} 个项目，都介绍完啦。想再听哪个，说序号或名字都行。`,
      suggest: ['第一个', '第三个', '哪个项目最难？'],
      ready: false,
    }
    messages.value.push(msg)
    scrollToEnd()
    typewrite(msg)
    return
  }

  if (r.kind === 'did-you-mean') {
    const msg = {
      from: 'bot',
      text: '',
      fullText: botDidYouMean,
      candidates: r.candidates.map((e) => e.q),
      ready: false,
    }
    messages.value.push(msg)
    scrollToEnd()
    typewrite(msg)
    return
  }

  // fallback：动态候选（引擎挑最接近的），挑不出就用保底建议
  const cands = (r.candidates || []).map((e) => e.q)
  const msg = {
    from: 'bot',
    text: '',
    fullText: r.candidates?.length ? botFallback.a : '这个我还没学会答……换个说法，或者试试这些：',
    candidates: cands.length ? cands : botFallback.suggest,
    ready: false,
  }
  messages.value.push(msg)
  scrollToEnd()
  typewrite(msg)
}

function send() {
  sendText(input.value)
}

// 固定问题栏点击：等同在输入框里发问
function askQuick(q) {
  sendText(q)
}

function sendText(text) {
  const t = text.trim()
  if (!t || typing.value) return
  stopTyping()
  messages.value.push({ from: 'me', text: t })
  input.value = ''
  scrollToEnd()
  setTimeout(() => reply(t), 300)
}

// 点 chip（追问/候选）：等同输入该问句
function askSuggestion(q) {
  if (typing.value) return
  stopTyping()
  // chip 上显示的是问句（如「第二个：股票量化软件是什么？」），
  // 直接拿去匹配可能受冒号前缀影响——先剥掉「第N个：」前缀
  const cleaned = q.replace(/^第[一二三四五1-5]个[:：]/, '')
  messages.value.push({ from: 'me', text: q })
  scrollToEnd()
  setTimeout(() => reply(cleaned), 300)
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
  } else {
    stopTyping()
  }
}

function onKeydown(e) {
  if (e.key === 'Escape' && open.value) open.value = false
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  stopTyping()
})
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
          <p class="bot-bubble">
            {{ m.text }}<span v-if="m.fullText && !m.ready" class="bot-caret" aria-hidden="true">▍</span>
          </p>

          <!-- 站内跳转按钮（打完字才显示） -->
          <div v-if="m.ready && m.links && m.links.length" class="bot-links">
            <RouterLink
              v-for="l in m.links"
              :key="l.to"
              :to="l.to"
              class="bot-link-btn"
              @click="open = false"
              >{{ l.label }} →</RouterLink
            >
          </div>

          <!-- 追问 chip / 候选 chip -->
          <div v-if="m.ready && m.suggest && m.suggest.length" class="bot-suggest">
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
          <div v-if="m.ready && m.candidates && m.candidates.length" class="bot-suggest">
            <button
              v-for="q in m.candidates"
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

      <!-- 固定问题栏：点一下直接发问（横滚；滚轮/触摸均可） -->
      <div ref="quickRef" class="bot-quick" aria-label="预设问题" role="group" @wheel="onQuickWheel">
        <button
          v-for="q in quickQuestions"
          :key="q"
          type="button"
          class="bot-chip bot-quick-chip"
          :class="{ 'bot-quick-main': q === '我可以问什么问题？' }"
          :disabled="typing"
          @click="askQuick(q)"
        >
          {{ q }}
        </button>
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
.bot-caret {
  color: var(--color-green);
  animation: caret-blink 0.8s steps(2) infinite;
}
@keyframes caret-blink {
  50% {
    opacity: 0;
  }
}
.bot-suggest,
.bot-links {
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
.bot-link-btn {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.8rem;
  text-decoration: none;
  min-height: 32px;
  display: inline-flex;
  align-items: center;
}
.bot-link-btn:hover {
  border-color: var(--color-green);
  color: var(--color-green);
}
.bot-quick {
  display: flex;
  gap: 6px;
  padding: 10px 12px 0;
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.bot-quick::-webkit-scrollbar {
  display: none;
}
.bot-quick-chip {
  flex-shrink: 0;
  white-space: nowrap;
}
.bot-quick-main {
  background: var(--color-green);
  color: #fff;
}
.bot-quick-main:hover {
  background: var(--color-green);
  color: #fff;
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
