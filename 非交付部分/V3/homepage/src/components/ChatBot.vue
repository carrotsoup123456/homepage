<script setup>
// ======================================================
// 数字分身聊天窗（v2：智能检索引擎版）
// - 匹配逻辑在 src/data/bot.js（纯函数，已单测覆盖）
// - 能力：同义词 / 错别字容错 / did-you-mean 确认 /
//   「第二个·下一个」序数追问 / 智能兜底候选 / 答案带跳转按钮
// - 隐私不变：全部匹配在本机完成，不上传输入，关掉就没
// ======================================================
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { match } from '../data/bot.js'
import {
  botName,
  botQa,
  botFallback,
  botDidYouMean,
  botWelcome,
  PROJECT_ORDER,
} from '../data/bot-qa.js'

// ---- 项目自动带路 ----
// 回答文本里提到某个项目 → 自动在气泡下方附上「详情页链接卡」，
// 词条作者不用逐条手写 links；回答里怎么称呼项目（全名/短名/书名号）都能命中。
const PROJECT_LINKS = [
  { re: /Carbon Brain/i, to: '/project/carbon-brain', icon: '🧠', label: 'Carbon Brain' },
  { re: /股票量化/, to: '/project/stock-quant', icon: '📈', label: '股票量化项目' },
  { re: /\bcarrot\b|agent 软件|二次开发/, to: '/project/carrot-agent', icon: '🥕', label: '自己的 Agent 软件' },
  { re: /为官一方/, to: '/project/weiguan-yifang', icon: '🏯', label: '《为官一方》' },
  { re: /TO-DO Panel/i, to: '/project/todo-panel', icon: '📌', label: 'TO-DO Panel' },
]
function autoProjectLinks(text) {
  return PROJECT_LINKS.filter((p) => p.re.test(text)).map(({ re, ...link }) => link)
}

const open = ref(false)
const input = ref('')
const inputEl = ref(null)
const listEl = ref(null)
const typing = ref(false)

// 首访引导：呼吸小点在点开一次前常驻；气泡提示「进站 8 秒窗口 + 悬停/聚焦再现」，
// 点开过一次（localStorage 记住）后整套不再出现——不再全程盖着正文。
const HINT_KEY = 'homepage-bot-seen'
const hintSeen = ref(localStorage.getItem(HINT_KEY) === '1')
const hintWindow = ref(true)
const fabHover = ref(false)
let hintTimer = null
const showBubble = computed(() => !open.value && !hintSeen.value && (hintWindow.value || fabHover.value))
const showHint = computed(() => !open.value && !hintSeen.value)

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
// 左右箭头状态：只在有横向滚动余地时显示；到边禁用对应箭头
const quickOverflow = ref(false)
const canLeft = ref(false)
const canRight = ref(false)
function updateQuickArrows() {
  const el = quickRef.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  quickOverflow.value = max > 2
  canLeft.value = el.scrollLeft > 2
  canRight.value = el.scrollLeft < max - 2
}
function onQuickScroll() {
  updateQuickArrows()
}
function onQuickWheel(e) {
  const el = quickRef.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  if (max <= 0) return
  e.preventDefault()
  el.scrollLeft += e.deltaY || e.deltaX
  // scrollLeft 直接赋值不会触发 scroll 事件，这里手动同步箭头状态
  updateQuickArrows()
}
function quickScroll(dir) {
  const el = quickRef.value
  if (!el) return
  const step = Math.max(160, Math.round(el.clientWidth * 0.8))
  el.scrollBy({ left: dir * step, behavior: 'smooth' })
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
    // 链接 = 词条手写 links + 自动识别的项目卡（去重，手动优先）
    const manual = r.entry.links || []
    const seen = new Set(manual.map((l) => l.to))
    const links = [...manual, ...autoProjectLinks(r.entry.a).filter((l) => !seen.has(l.to))]
    const msg = {
      from: 'bot',
      text: '',
      fullText: r.entry.a,
      suggest: suggest.length ? suggest : undefined,
      links: links.length ? links : undefined,
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
  if (!hintSeen.value) {
    hintSeen.value = true
    try {
      localStorage.setItem(HINT_KEY, '1')
    } catch {
      /* 隐私模式下 localStorage 可能不可用，忽略 */
    }
  }
  if (open.value) {
    await nextTick()
    updateQuickArrows()
    inputEl.value?.focus()
  } else {
    stopTyping()
  }
}

function onKeydown(e) {
  if (e.key === 'Escape' && open.value) open.value = false
}
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  hintTimer = setTimeout(() => {
    hintWindow.value = false
  }, 8000)
})
onBeforeUnmount(() => {
  clearTimeout(hintTimer)
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
    @mouseenter="fabHover = true"
    @mouseleave="fabHover = false"
    @focus="fabHover = true"
    @blur="fabHover = false"
  >
    <span aria-hidden="true">{{ open ? '✕' : '💬' }}</span>
    <!-- 首访呼吸引导点 -->
    <span v-if="showHint" class="bot-fab-dot" aria-hidden="true"></span>
  </button>

  <!-- 首访气泡提示（8 秒窗口/悬停再现；点开一次后不再出现） -->
  <Transition name="bot-tip">
    <div v-if="showBubble" class="bot-tip" role="status">
      点我聊聊数字分身 🥕
      <span class="bot-tip-arrow" aria-hidden="true"></span>
    </div>
  </Transition>

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

          <!-- 站内跳转链接卡（打完字才显示）：提到项目时自动带路 -->
          <div v-if="m.ready && m.links && m.links.length" class="bot-links">
            <RouterLink
              v-for="l in m.links"
              :key="l.to"
              :to="l.to"
              class="bot-link-btn"
              @click="open = false"
              ><span class="bot-link-icon" aria-hidden="true">{{ l.icon || '🔗' }}</span
              >{{ l.label }}<span class="bot-link-arrow" aria-hidden="true">→</span></RouterLink
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

      <!-- 固定问题栏：点一下直接发问（左右箭头/滚轮/触摸均可横滑） -->
      <div class="bot-quick-wrap">
        <button
          v-if="quickOverflow"
          type="button"
          class="quick-arrow"
          :disabled="!canLeft"
          aria-label="向左滚动更多问题"
          @click="quickScroll(-1)"
        >‹</button>
        <div ref="quickRef" class="bot-quick" aria-label="预设问题" role="group" @wheel="onQuickWheel" @scroll="onQuickScroll">
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
        <button
          v-if="quickOverflow"
          type="button"
          class="quick-arrow"
          :disabled="!canRight"
          aria-label="向右滚动更多问题"
          @click="quickScroll(1)"
        >›</button>
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
/* 首访呼吸引导点：小圆点缓慢扩散两圈，点开一次后消失 */
.bot-fab-dot {
  position: absolute;
  top: 3px;
  right: 2px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #ffd166;
  border: 2px solid #fff;
  animation: fabPulse 2.4s var(--ease) infinite;
  pointer-events: none;
}
@keyframes fabPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 209, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(255, 209, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 209, 102, 0);
  }
}
/* 首访气泡：FAB 左侧的小提示，带指向箭头 */
.bot-tip {
  position: fixed;
  right: 92px;
  bottom: 108px;
  z-index: 90;
  max-width: 210px;
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: var(--shadow-soft);
}
.bot-tip-arrow {
  position: absolute;
  right: -7px;
  top: 50%;
  width: 12px;
  height: 12px;
  transform: translateY(-50%) rotate(45deg);
  background: var(--color-surface-2);
  border-top: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}
.bot-tip-enter-active,
.bot-tip-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.bot-tip-enter-from,
.bot-tip-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
@media (prefers-reduced-motion: reduce) {
  .bot-fab-dot {
    animation: none;
  }
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
  border-radius: 12px;
  padding: 7px 12px;
  font-size: 0.8rem;
  text-decoration: none;
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  transition: border-color 0.15s, color 0.15s, transform 0.15s;
}
.bot-link-btn:hover {
  border-color: var(--color-green);
  color: var(--color-green);
  transform: translateY(-1px);
}
.bot-link-icon {
  font-size: 0.95rem;
  line-height: 1;
}
.bot-link-arrow {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  transition: color 0.15s;
}
.bot-link-btn:hover .bot-link-arrow {
  color: var(--color-green);
}
.bot-quick-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 12px 0;
}
.quick-arrow {
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-surface-2, #fff);
  color: var(--color-text);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.15s, border-color 0.15s, color 0.15s;
}
.quick-arrow:hover:not(:disabled) {
  border-color: var(--color-green);
  color: var(--color-green);
}
.quick-arrow:disabled {
  opacity: 0.3;
  cursor: default;
}
.bot-quick {
  flex: 1;
  min-width: 0;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  padding: 0 2px 2px;
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
