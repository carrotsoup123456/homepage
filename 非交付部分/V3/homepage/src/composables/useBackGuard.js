// ======================================================
// 微信内浏览器的「滑动退出」防护
// ------------------------------------------------------
// 背景：站内页面是 hash 路由，第二层页面（笔记详情、项目详情）
// 可以正常逐级返回；但访客在第一层页面误滑（iOS 边缘手势）时，
// 历史栈已到栈底，微信会直接退出整个网页——体验很突兀。
// 做法：进站时在历史栈底压一条「哨兵」记录；滑到栈底时先拦
// 一次并提示「再滑一次退出网页」，2.2 秒内再滑才真正关闭
// （调微信 JSBridge 的 closeWindow；桥不可用则放行原生行为）。
// 仅微信 UA 启用，普通浏览器保持原生行为。
// ======================================================
import { onMounted, onUnmounted } from 'vue'

const GUARD_KEY = '__wb' // history.state 上的哨兵标记
const DOUBLE_GAP = 2200 // 「再滑一次」的判定窗口（毫秒）

export function useBackGuard() {
  let ready = false
  let installed = false
  let lastBlock = 0
  let toastEl = null
  let hideTimer = null

  const isWechat = () =>
    typeof navigator !== 'undefined' && /MicroMessenger/i.test(navigator.userAgent)

  function showToast() {
    try {
      if (!toastEl) {
        toastEl = document.createElement('div')
        toastEl.className = 'wechat-exit-toast'
        toastEl.setAttribute('role', 'status')
        toastEl.textContent = '再滑一次退出网页'
        document.body.appendChild(toastEl)
      }
      toastEl.classList.add('show')
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => toastEl?.classList.remove('show'), 2000)
    } catch {
      /* ignore */
    }
  }

  // 在当前位置之上压一条同 URL 的哨兵（保留 router 已有的 state 字段，hash 不变不触发路由）
  function pushSentinel() {
    try {
      history.pushState({ ...history.state, [GUARD_KEY]: 2 }, '', location.href)
    } catch {
      /* ignore */
    }
  }

  function onPopState(e) {
    // 只拦「栈底」那条（__wb:1）；正常路由返回（router 自己的 state 或 __wb:2）不受影响
    if (!e.state || e.state[GUARD_KEY] !== 1) return
    const now = Date.now()
    if (now - lastBlock < DOUBLE_GAP) {
      // 短时间内第二次滑：真的想走 → 让微信关掉网页
      try {
        window.WeixinJSBridge?.call?.('closeWindow')
      } catch {
        /* ignore */
      }
      return // 桥不可用时不再压哨兵：这次滑动自然生效（原生退出）
    }
    lastBlock = now
    pushSentinel()
    showToast()
  }

  function setup() {
    if (ready || !isWechat()) return
    ready = true
    try {
      // 栈底那条打上 __wb:1；其上的哨兵是 __wb:2
      history.replaceState({ ...history.state, [GUARD_KEY]: 1 }, '', location.href)
      pushSentinel()
      window.addEventListener('popstate', onPopState)
      installed = true
    } catch {
      /* ignore */
    }
  }

  onMounted(() => {
    // 微信 JSBridge 的注入时机不定：能等就等；等不到 800ms 后也照常启用
    try {
      document.addEventListener('WeixinJSBridgeReady', setup, { once: true })
    } catch {
      /* ignore */
    }
    setTimeout(setup, 800)
  })

  onUnmounted(() => {
    if (installed) window.removeEventListener('popstate', onPopState)
  })
}
