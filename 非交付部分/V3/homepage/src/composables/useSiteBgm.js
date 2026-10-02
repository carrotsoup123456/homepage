// ======================================================
// 全站背景音乐（雨中森林）—— App 级单例
// ------------------------------------------------------
// <audio> 挂在 App.vue，路由切换不销毁 → 全站每个页面都有配乐。
// 音乐页（MusicView）是它的「控制台」：播放/暂停、音量。
//
// 行为规则（与音乐页版一致，只是作用域扩大到全站）：
// 1. 进站自动尝试播放；直接输 URL 无手势被拦时，
//    访客首次任意点击/按键（全局一次性捕获）把 BGM 带起来。
// 2. loop 一直循环，只有暂停键能真正停（wantPlay=false）。
// 3. 鼓视频出声 → BGM 让路；视频停 → wantPlay 时自动接回。
// 4. 明确暂停后写 sessionStorage：本会话内（含刷新）不自动复活，
//    关闭标签页重新打开才恢复自动播放（尊重不想被打扰的访客）。
// ======================================================
import { ref } from 'vue'

const VOL_KEY = 'homepage-music-volume'
const MUTED_KEY = 'homepage-bgm-muted'

// 模块级单例状态：所有组件共享同一份
const audioEl = ref(null)
const playing = ref(false)
const wantPlay = ref(true)
const volume = ref(0.55)
const progress = ref(0)
const timeCur = ref(0)
const timeDur = ref(0)

// 防御式 play：jsdom / 自动播放被拒时安静返回
function tryPlay() {
  const a = audioEl.value
  if (!a) return
  const r = a.play?.()
  if (r && typeof r.catch === 'function') r.catch(() => (playing.value = false))
}

function togglePlay() {
  if (playing.value) {
    wantPlay.value = false
    audioEl.value?.pause()
    try {
      sessionStorage.setItem(MUTED_KEY, '1')
    } catch {
      /* 隐私模式等场景忽略 */
    }
  } else {
    wantPlay.value = true
    try {
      sessionStorage.removeItem(MUTED_KEY)
    } catch {
      /* ignore */
    }
    tryPlay()
  }
}

function setVolume(v) {
  volume.value = v
  if (audioEl.value) audioEl.value.volume = v
  try {
    localStorage.setItem(VOL_KEY, String(v))
  } catch {
    /* ignore */
  }
}

function onTimeUpdate() {
  const a = audioEl.value
  if (a && a.duration > 0) progress.value = (a.currentTime / a.duration) * 100
  timeCur.value = a?.currentTime || 0
  timeDur.value = a?.duration || 0
}

// ---- 鼓视频联动：视频出声让路，视频停接回 ----
function videoYield() {
  if (playing.value) audioEl.value?.pause()
}
function videoResume() {
  if (wantPlay.value && !playing.value) tryPlay()
}

// ---- 自动播放兜底：首次任意交互启动（一次性监听） ----
function firstGesturePlay() {
  if (wantPlay.value && !playing.value) tryPlay()
  window.removeEventListener('pointerdown', firstGesturePlay, true)
  window.removeEventListener('keydown', firstGesturePlay, true)
  window.removeEventListener('touchstart', firstGesturePlay, true)
}

/**
 * App.vue onMounted 时调用，把全局 <audio> 元素接进来并启动。
 * @param {HTMLAudioElement} el App.vue 模板里的 <audio ref>
 */
function attach(el) {
  if (!el) return
  audioEl.value = el
  el.loop = true
  el.addEventListener('playing', () => (playing.value = true))
  el.addEventListener('pause', () => (playing.value = false))

  // 音量恢复（跨会话记忆）
  let vv = NaN
  try {
    vv = parseFloat(localStorage.getItem(VOL_KEY) || '')
  } catch {
    /* ignore */
  }
  if (!Number.isNaN(vv)) volume.value = vv
  el.volume = volume.value

  // 本会话明确静音过 → 不自动复活，等用户手动点播放
  let muted = false
  try {
    muted = sessionStorage.getItem(MUTED_KEY) === '1'
  } catch {
    /* ignore */
  }
  if (!muted) {
    wantPlay.value = true
    tryPlay()
    window.addEventListener('pointerdown', firstGesturePlay, true)
    window.addEventListener('keydown', firstGesturePlay, true)
    window.addEventListener('touchstart', firstGesturePlay, true)
  } else {
    wantPlay.value = false
  }
}

export function useSiteBgm() {
  return {
    // 状态
    playing,
    wantPlay,
    volume,
    progress,
    timeCur,
    timeDur,
    // 方法
    attach,
    togglePlay,
    setVolume,
    onTimeUpdate,
    videoYield,
    videoResume,
  }
}
