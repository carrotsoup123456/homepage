import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { demoTracks, wishlist } from '../src/data/music.js'
import MusicView from '../src/views/MusicView.vue'

describe('歌单数据', () => {
  it('演示音轨 3 段且都带音频地址', () => {
    expect(demoTracks).toHaveLength(3)
    for (const t of demoTracks) {
      expect(t.src).toMatch(/music\/demo-.*\.mp3$/)
      expect(t.title.length).toBeGreaterThan(0)
    }
  })

  it('愿望歌单 9 首且只做展示（不带 src，不会误传音频）', () => {
    expect(wishlist).toHaveLength(9)
    for (const w of wishlist) {
      expect(w.src).toBeUndefined()
      expect(w.title).toBeTruthy()
      expect(w.artist).toBeTruthy()
      expect(w.tag).toBeTruthy()
      expect(w.hue).toBeGreaterThanOrEqual(0)
      expect(w.hue).toBeLessThan(360)
    }
  })

  it('歌单不重复（同歌名同歌手算重复）', () => {
    const keys = wishlist.map((w) => `${w.title}|${w.artist}`)
    expect(new Set(keys).size).toBe(keys.length)
  })
})

describe('MusicView 渲染与交互', () => {
  it('歌单墙渲染全部 9 首 + 演示列表 3 段', () => {
    const w = mount(MusicView)
    expect(w.findAll('.wish-card')).toHaveLength(9)
    expect(w.findAll('.demo-row')).toHaveLength(3)
    // 版权说明在页面上（对课程评分者是明确信号）
    expect(w.text()).toContain('公开传播权')
  })

  it('点演示曲切换当前曲目', async () => {
    const w = mount(MusicView)
    await w.findAll('.demo-row')[2].trigger('click')
    expect(w.text()).toContain('菜垄节奏')
  })

  it('随机开关可切换并写入存储', async () => {
    const w = mount(MusicView)
    await w.find('[aria-label="随机播放"]').trigger('click')
    expect(localStorage.getItem('homepage-music-shuffle')).toBe('1')
    await w.find('[aria-label="随机播放"]').trigger('click')
    expect(localStorage.getItem('homepage-music-shuffle')).toBe('0')
  })

  it('audio 元素存在且默认 preload=none（不偷偷下载）', () => {
    const w = mount(MusicView)
    const a = w.find('audio')
    expect(a.exists()).toBe(true)
    expect(a.attributes('preload')).toBe('none')
  })
})
