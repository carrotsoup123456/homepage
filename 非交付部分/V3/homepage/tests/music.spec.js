import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { bgm, drumVideo, wishlist } from '../src/data/music.js'
import MusicView from '../src/views/MusicView.vue'
import { useSiteBgm } from '../src/composables/useSiteBgm.js'

describe('音乐页数据', () => {
  it('BGM 是雨中森林且带音频与封面', () => {
    expect(bgm.src).toMatch(/music\/bgm-rainforest-v2\.mp3$/)
    expect(bgm.cover).toMatch(/covers\/rainforest\.webp$/)
    expect(bgm.title).toContain('雨中森林')
  })

  it('鼓视频带源、封面与说明', () => {
    expect(drumVideo.src).toMatch(/music\/drum-video\.mp4$/)
    expect(drumVideo.poster).toMatch(/covers\/drum\.webp$/)
    expect(drumVideo.desc).toContain('大石碎胸口')
  })

  it('愿望歌单 9 首、每首带原创封面且不带音频（不会误传）', () => {
    expect(wishlist).toHaveLength(9)
    for (const w of wishlist) {
      expect(w.cover).toMatch(/music\/covers\/.+\.webp$/)
      expect(w.src).toBeUndefined()
      expect(w.title).toBeTruthy()
      expect(w.artist).toBeTruthy()
      expect(w.tag).toBeTruthy()
    }
  })

  it('歌单不重复（同歌名同歌手算重复）', () => {
    const keys = wishlist.map((w) => `${w.title}|${w.artist}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('封面两两不同', () => {
    const covers = wishlist.map((w) => w.cover)
    expect(new Set(covers).size).toBe(covers.length)
  })
})

describe('MusicView 渲染与交互', () => {
  it('渲染 9 张封面卡 + 鼓视频 + BGM 播放器（控制台模式，audio 已上移 App 层）', () => {
    const w = mount(MusicView)
    expect(w.findAll('.wish-card')).toHaveLength(9)
    expect(w.find('video.drum-video').exists()).toBe(true)
    // BGM 已全局化：本页不再有 <audio>，只有控制 UI（播放键/音量）
    expect(w.find('audio').exists()).toBe(false)
    expect(w.find('.bgm-controls').exists()).toBe(true)
    expect(w.find('.p-vol input').exists()).toBe(true)
    expect(w.text()).toContain('公开传播权')
    expect(w.text()).toContain('全站')
  })

  it('封面图片全部带 alt（无障碍）', () => {
    const w = mount(MusicView)
    const imgs = w.findAll('.wish-cover img')
    for (const i of imgs) {
      expect(i.attributes('alt')).toBeTruthy()
    }
  })

  it('BGM 全局化：<audio> 挂在 App.vue 且开启 loop（源码断言）', () => {
    // jsdom 下 App.vue 需要 router 才能整体挂载，这里断言源码结构：
    // audio 元素在 App 模板中、绑定全局 bgm.src、loop 常开、preload=auto
    const appSrc = readFileSync(resolve(process.cwd(), 'src/App.vue'), 'utf-8')
    expect(appSrc).toContain('ref="bgmAudioEl"')
    expect(appSrc).toContain(':src="bgm.src"')
    expect(appSrc).toContain('loop')
    expect(appSrc).toContain('preload="auto"')
    expect(appSrc).toContain('useSiteBgm')
  })

  it('useSiteBgm 单例：暂停写 muted 标记，恢复清除', () => {
    const s = useSiteBgm()
    // 初始意愿为播（模块级单例，测试环境未 attach audio）
    expect(typeof s.togglePlay).toBe('function')
    expect(typeof s.videoYield).toBe('function')
    // playing=false 时 togglePlay 走恢复分支：wantPlay=true 且清 muted
    sessionStorage.setItem('homepage-bgm-muted', '1')
    s.togglePlay()
    expect(sessionStorage.getItem('homepage-bgm-muted')).toBe(null)
    expect(s.wantPlay.value).toBe(true)
  })

  it('鼓视频 preload=metadata 且带 poster', () => {
    const w = mount(MusicView)
    const v = w.find('video.drum-video')
    expect(v.attributes('preload')).toBe('metadata')
    expect(v.attributes('poster')).toBeTruthy()
  })
})
