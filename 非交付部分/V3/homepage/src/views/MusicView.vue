<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { demoTracks, wishlist } from '../data/music.js'
import SectionBand from '../components/SectionBand.vue'

// ---- 播放器状态 ----
const audio = ref(null) // <audio> 元素
const currentId = ref(demoTracks[0].id)
const playing = ref(false)
const shuffle = ref(false)
const volume = ref(0.6)
const progress = ref(0) // 0~100
const LOOP_KEY = 'homepage-music-shuffle'
const VOL_KEY = 'homepage-music-volume'

const current = computed(() => demoTracks.find((t) => t.id === currentId.value) || demoTracks[0])

// 随机/顺序切歌。随机时避开当前曲（只有一首时除外）
function nextTrack(auto = false) {
  const idx = demoTracks.findIndex((t) => t.id === currentId.value)
  let n
  if (shuffle.value && demoTracks.length > 1) {
    do {
      n = Math.floor(Math.random() * demoTracks.length)
    } while (n === idx)
  } else {
    n = (idx + 1) % demoTracks.length
  }
  currentId.value = demoTracks[n].id
  // 手动切歌立即播；自动切歌（ended）保持播放状态
  if (!auto || playing.value) play()
}

function prevTrack() {
  const idx = demoTracks.findIndex((t) => t.id === currentId.value)
  const p = (idx - 1 + demoTracks.length) % demoTracks.length
  currentId.value = demoTracks[p].id
  play()
}

function togglePlay() {
  if (playing.value) {
    audio.value?.pause()
  } else {
    play()
  }
}

function play() {
  audio.value?.play().catch(() => {
    // 浏览器自动播放策略或文件加载失败：安静回到暂停态，不打断页面
    playing.value = false
  })
}

function selectTrack(id) {
  if (id === currentId.value) {
    togglePlay()
  } else {
    currentId.value = id
    play()
  }
}

function onTimeUpdate() {
  const a = audio.value
  if (a && a.duration > 0) progress.value = (a.currentTime / a.duration) * 100
  timeCur.value = a?.currentTime || 0
  timeDur.value = a?.duration || 0
}

function toggleShuffle() {
  shuffle.value = !shuffle.value
  localStorage.setItem(LOOP_KEY, shuffle.value ? '1' : '0')
}

function setVolume(e) {
  volume.value = Number(e.target.value)
  if (audio.value) audio.value.volume = volume.value
  localStorage.setItem(VOL_KEY, String(volume.value))
}

// 秒 → m:ss
const fmt = (s) => {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${String(r).padStart(2, '0')}`
}
// 秒 → m:ss（时间存 ref：currentTime 属性变化不触发 computed 重算）
const timeCur = ref(0)
const timeDur = ref(0)
const cur = computed(() => fmt(timeCur.value))
const dur = computed(() => fmt(timeDur.value))

// 播放中给当前条目加呼吸点动画的开关
onMounted(() => {
  const a = audio.value
  if (!a) return
  a.volume = volume.value
  const sv = localStorage.getItem(LOOP_KEY)
  if (sv === '1') shuffle.value = true
  const vv = parseFloat(localStorage.getItem(VOL_KEY) || '')
  if (!Number.isNaN(vv)) {
    volume.value = vv
    a.volume = vv
  }
  // 播放/暂停状态以事件为准（play() 被策略拒绝时不会触发 playing）
  a.addEventListener('playing', () => (playing.value = true))
  a.addEventListener('pause', () => (playing.value = false))
})

onBeforeUnmount(() => {
  audio.value?.pause()
})
</script>

<template>
  <div class="music-page">
    <SectionBand seed="playlist" class="music-hero-band">
      <template #label>歌单</template>
      <template #title>我喜欢的歌</template>
      <template #desc>
        写代码时的循环列表。左边三段是程序合成的演示音轨（先听个响，交互全开着）；
        右边这九首是我的真实歌单——歌能上榜，音频不能上站，原因写在页脚。
      </template>
    </SectionBand>

    <!-- 播放器 + 演示音轨 -->
    <section class="music-demos" aria-label="演示音轨播放器">
      <div class="player-bar" role="group" aria-label="BGM 播放控制">
        <button
          class="p-btn p-main"
          :aria-label="playing ? '暂停' : '播放'"
          @click="togglePlay"
        >
          {{ playing ? '❚❚' : '▶' }}
        </button>
        <button class="p-btn" aria-label="上一首" @click="prevTrack">⏮</button>
        <button class="p-btn" aria-label="下一首" @click="nextTrack(false)">⏭</button>
        <button
          class="p-btn"
          :class="{ on: shuffle }"
          :aria-pressed="shuffle"
          aria-label="随机播放"
          title="随机播放"
          @click="toggleShuffle"
        >
          🔀
        </button>
        <div class="p-info">
          <span class="p-title">{{ current.title }}</span>
          <span class="p-artist">{{ current.artist }}</span>
        </div>
        <div class="p-progress" aria-hidden="true">
          <div class="p-progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="p-time">{{ cur }} / {{ dur }}</span>
        <label class="p-vol">
          <span aria-hidden="true">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            :value="volume"
            :aria-valuetext="`音量 ${Math.round(volume * 100)}%`"
            aria-label="音量"
            @input="setVolume"
          />
        </label>
      </div>

      <ol class="demo-list">
        <li
          v-for="t in demoTracks"
          :key="t.id"
          :class="{ active: t.id === currentId, playing: t.id === currentId && playing }"
        >
          <button class="demo-row" @click="selectTrack(t.id)">
            <span class="demo-idx">{{ t.id === currentId && playing ? '♪' : '·' }}</span>
            <span class="demo-name">{{ t.title }}</span>
            <span class="demo-note">{{ t.note }}</span>
            <span class="demo-tag">{{ t.tag }}</span>
          </button>
        </li>
      </ol>

      <audio
        ref="audio"
        :src="current.src"
        preload="none"
        @ended="nextTrack(true)"
        @timeupdate="onTimeUpdate"
      ></audio>
    </section>

    <!-- 歌单墙 -->
    <section class="wish-grid" aria-label="我喜欢的歌，仅文字展示">
      <article v-for="w in wishlist" :key="w.id" class="wish-card">
        <div class="wish-cover" :style="{ background: `hsl(${w.hue} 32% 26%)` }" aria-hidden="true">
          <span class="wish-glyph">♪</span>
        </div>
        <div class="wish-meta">
          <h3 class="wish-title">{{ w.title }}</h3>
          <p class="wish-artist">{{ w.artist }}</p>
          <p class="wish-tag">「{{ w.tag }}」</p>
          <p class="wish-flag" title="音频未获得传播授权，站内不提供播放">未上站</p>
        </div>
      </article>
    </section>

    <p class="music-legal">
      关于音频：流行音乐录音的公开传播权在唱片公司手里，个人主页（尤其是课程公开链接）放不了。
      歌单墙只展示歌名与歌手——喜欢请去正版平台听。演示音轨由 ffmpeg
      程序合成（正弦波叠加，无版权负担），日后的正式 BGM 只会上自创作、CC
      授权或已购授权的音频。浏览器也不允许页面自动出声，所以永远是你点了才播。
    </p>
  </div>
</template>

<style scoped>
.music-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* ---- 播放器条 ---- */
.player-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 14px 16px;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  background: var(--panel);
  box-shadow: 0 4px 18px rgb(20 40 24 / 6%);
}
.p-btn {
  min-width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1.5px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.p-btn:hover {
  transform: translateY(-1px);
  border-color: var(--accent);
}
.p-btn.on {
  border-color: var(--accent);
  color: var(--accent);
}
.p-main {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-size: 14px;
}
.p-info {
  display: flex;
  flex-direction: column;
  min-width: 130px;
}
.p-title {
  font-weight: 700;
  font-size: 14px;
  color: var(--ink);
}
.p-artist {
  font-size: 12px;
  color: var(--ink-soft);
}
.p-progress {
  flex: 1;
  min-width: 90px;
  height: 6px;
  border-radius: 3px;
  background: var(--line);
  overflow: hidden;
}
.p-progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.3s linear;
}
.p-time {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--ink-soft);
}
.p-vol {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}
.p-vol input {
  width: 80px;
  accent-color: var(--accent);
}

/* ---- 演示列表 ---- */
.demo-list {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
}
.demo-list li {
  border-bottom: 1px dashed var(--line);
}
.demo-list li:last-child {
  border-bottom: 0;
}
.demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 11px 8px;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  color: var(--ink);
}
.demo-row:hover .demo-name {
  color: var(--accent);
}
.demo-idx {
  width: 18px;
  text-align: center;
  color: var(--ink-soft);
}
li.active .demo-idx {
  color: var(--accent);
  animation: beat 1s ease-in-out infinite;
}
li.playing .demo-idx {
  font-weight: 700;
}
@keyframes beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.35); }
}
.demo-name {
  font-size: 14px;
  font-weight: 600;
  flex: 0 0 auto;
}
.demo-note {
  flex: 1;
  font-size: 12px;
  color: var(--ink-soft);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.demo-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 8px;
  border: 1px solid var(--line);
  color: var(--ink-soft);
}

/* ---- 歌单墙 ---- */
.wish-grid {
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 18px;
}
.wish-card {
  border: 1.5px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: var(--panel);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.wish-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgb(20 40 24 / 10%);
}
.wish-cover {
  height: 96px;
  display: grid;
  place-items: center;
}
.wish-glyph {
  font-size: 30px;
  color: rgb(255 255 255 / 82%);
  text-shadow: 0 2px 8px rgb(0 0 0 / 25%);
}
.wish-meta {
  padding: 12px 14px 14px;
}
.wish-title {
  margin: 0;
  font-size: 15px;
  color: var(--ink);
}
.wish-artist {
  margin: 3px 0 0;
  font-size: 12.5px;
  color: var(--ink-soft);
}
.wish-tag {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--accent);
}
.wish-flag {
  display: inline-block;
  margin: 10px 0 0;
  font-size: 10.5px;
  padding: 1px 7px;
  border-radius: 7px;
  border: 1px solid var(--line);
  color: var(--ink-soft);
  cursor: help;
}

.music-legal {
  margin-top: 40px;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--ink-soft);
  border-top: 1px solid var(--line);
  padding-top: 16px;
}

@media (max-width: 640px) {
  .demo-note {
    display: none;
  }
  .p-progress {
    order: 9;
    flex-basis: 100%;
  }
}
</style>
