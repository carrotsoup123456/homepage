import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { bgm, drumVideo, wishlist } from '../src/data/music.js'
import MusicView from '../src/views/MusicView.vue'

describe('音乐页数据', () => {
  it('BGM 是雨中森林且带音频与封面', () => {
    expect(bgm.src).toMatch(/music\/bgm-rainforest\.mp3$/)
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
  it('渲染 9 张封面卡 + 鼓视频 + BGM 播放器', () => {
    const w = mount(MusicView)
    expect(w.findAll('.wish-card')).toHaveLength(9)
    expect(w.find('video.drum-video').exists()).toBe(true)
    expect(w.find('audio').exists()).toBe(true)
    expect(w.text()).toContain('公开传播权')
  })

  it('封面图片全部带 alt（无障碍）', () => {
    const w = mount(MusicView)
    const imgs = w.findAll('.wish-cover img')
    for (const i of imgs) {
      expect(i.attributes('alt')).toBeTruthy()
    }
  })

  it('BGM audio 开启 loop 自动循环', () => {
    const w = mount(MusicView)
    // jsdom 不渲染 loop 属性到 attributes，用 DOM 属性断言
    expect(w.find('audio').element.loop).toBe(true)
  })

  it('鼓视频 preload=metadata 且带 poster', () => {
    const w = mount(MusicView)
    const v = w.find('video.drum-video')
    expect(v.attributes('preload')).toBe('metadata')
    expect(v.attributes('poster')).toBeTruthy()
  })
})
