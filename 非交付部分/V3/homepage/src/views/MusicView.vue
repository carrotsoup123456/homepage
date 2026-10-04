<script setup>
import { computed } from 'vue'
import { bgm, drumVideo, wishlist } from '../data/music.js'
import SectionBand from '../components/SectionBand.vue'
import { useSiteBgm } from '../composables/useSiteBgm.js'

// ---- 背景音乐（全站常驻，本页是控制台）----
// <audio> 挂在 App.vue，切页面不断；播放/暂停/音量的状态与行为
// 全部来自 useSiteBgm 单例（行为规则见该文件）。
const {
  playing,
  volume,
  progress,
  timeCur,
  timeDur,
  togglePlay,
  setVolume,
  videoYield,
  videoResume,
} = useSiteBgm()

// 鼓视频联动：视频出声 → BGM 让路；视频停/播完 → 自动接回
const onVideoPlay = videoYield
const onVideoStop = videoResume

function fmt(s) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${String(r).padStart(2, '0')}`
}
const cur = computed(() => fmt(timeCur.value))
const dur = computed(() => fmt(timeDur.value))
</script>

<template>
  <div class="music-page">
    <SectionBand seed="playlist" class="music-hero-band">
      <template #label>音乐</template>
      <template #title>我喜欢的歌</template>
      <template #desc>
        写代码时的循环列表，还有一段我自己的鼓。全站背景音是一首开放授权的管弦圆舞曲（本页可控制播放与音量）；
        下面这九首是我的真实歌单——歌能上榜，音频和真实专辑封面不能上站，原因写在页脚。
      </template>
    </SectionBand>

    <!-- 背景音乐 -->
    <section class="bgm-card" aria-label="背景音乐播放器">
      <img class="bgm-cover" :src="bgm.cover" width="120" height="120" alt="圆舞曲插画封面：金色舞厅与水晶吊灯" loading="lazy">
      <div class="bgm-body">
        <div class="bgm-head">
          <span class="bgm-kicker">背景音乐 · 全站常驻</span>
          <h2 class="bgm-title">{{ bgm.title }}</h2>
          <p class="bgm-note">{{ bgm.note }}</p>
        </div>
        <div class="bgm-controls" role="group" aria-label="BGM 播放控制">
          <button
            class="p-btn p-main"
            :aria-label="playing ? '暂停背景音乐' : '播放背景音乐'"
            @click="togglePlay"
          >
            {{ playing ? '❚❚' : '▶' }}
          </button>
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
      </div>
    </section>

    <!-- 我的鼓 -->
    <section class="drum-section" aria-label="我的架子鼓演奏">
      <h2 class="sec-title">架子鼓训练视频</h2>
      <figure class="drum-fig">
        <video
          ref="videoEl"
          class="drum-video"
          :src="drumVideo.src"
          :poster="drumVideo.poster"
          controls
          playsinline
          preload="metadata"
          @play="onVideoPlay"
          @pause="onVideoStop"
          @ended="onVideoStop"
        ></video>
        <figcaption class="drum-caption">
          {{ drumVideo.desc }}
        </figcaption>
      </figure>
    </section>

    <!-- 歌单小标题 -->
    <section class="wish-head" v-reveal>
      <p class="eyebrow">My Playlist</p>
      <h2 class="section-title">我的歌单</h2>
      <p class="section-desc">九首真实在循环的歌；封面是按我对每首歌的私人意象画的原创插画，不指向任何真实专辑。</p>
    </section>

    <!-- 歌单墙 -->
    <section class="wish-grid" aria-label="我的歌单，仅文字与原创封面展示">
      <article v-for="w in wishlist" :key="w.id" class="wish-card">
        <div class="wish-cover">
          <img :src="w.cover" :alt="`「${w.title}」的原创意象封面插画`" width="640" height="640" loading="lazy">
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
      关于音频与封面：流行音乐录音和官方专辑封面的公开传播权都在唱片公司手里，个人主页（尤其是课程公开链接）放不了；
      歌单墙的封面是按我对每首歌的私人意象生成的原创插画，不指向任何真实专辑——喜欢歌本身请去正版平台。
      背景音乐 Victory Waltz 来自 Pixabay（Pixabay License：免费商用、无需署名）；鼓视频是本人录制、音频经现场感处理。
      浏览器不允许页面自动出声，所有声音都是你点了才播。
    </p>
  </div>
</template>

<style scoped>
.music-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* ---- BGM 卡片 ---- */
.bgm-card {
  display: flex;
  gap: 20px;
  padding: 18px;
  border: 1.5px solid var(--line);
  border-radius: 16px;
  background: var(--panel);
  box-shadow: 0 6px 22px rgb(20 40 24 / 7%);
  align-items: center;
}
.bgm-cover {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  flex: 0 0 auto;
}
.bgm-body {
  flex: 1;
  min-width: 0;
}
.bgm-kicker {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-weight: 700;
}
.bgm-title {
  margin: 2px 0 0;
  font-size: 19px;
  color: var(--ink);
}
.bgm-note {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: var(--ink-soft);
}
.bgm-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
}
.p-btn {
  min-width: 40px;
  height: 40px;
  border-radius: 11px;
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
.p-main {
  background: var(--accent);
  border-color: var(--accent);
  /* 主色底上的文字用专用变量：深色主题主色偏亮（亮蓝），白字对比度不够 */
  color: var(--color-on-primary);
  font-size: 14px;
}
.p-progress {
  flex: 1;
  min-width: 100px;
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

/* ---- 鼓视频 ---- */
.sec-title {
  margin: 46px 0 16px;
  font-size: 22px;
  color: var(--ink);
}
.drum-fig {
  margin: 0;
}
.drum-video {
  width: 100%;
  max-width: 760px;
  border-radius: 14px;
  border: 1.5px solid var(--line);
  background: #000;
  display: block;
  aspect-ratio: 16 / 9;
}
.drum-caption {
  margin: 12px 2px 0;
  font-size: 13px;
  line-height: 1.8;
  color: var(--ink-soft);
  max-width: 760px;
}

/* ---- 歌单墙 ---- */
.wish-grid {
  margin-top: 40px;
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
  height: 130px;
  overflow: hidden;
}
.wish-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.wish-card:hover .wish-cover img {
  transform: scale(1.05);
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
  .bgm-card {
    flex-direction: column;
    align-items: stretch;
  }
  .bgm-cover {
    width: 100%;
    height: 150px;
  }
  .p-progress {
    order: 9;
    flex-basis: 100%;
  }
}
</style>
