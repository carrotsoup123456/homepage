import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import SiteIntro from '../src/components/SiteIntro.vue'

// 本环境 onMounted 在微任务后触发：mount 后统一 flushPromises 再断言
const mountIntro = async (opts) => {
  const w = mount(SiteIntro, opts)
  await flushPromises()
  return w
}

describe('SiteIntro 进站开场动画', () => {
  beforeEach(() => {
    sessionStorage.removeItem('homepage-intro-done')
  })

  it('首次进站显示云层等待点击', async () => {
    const w = await mountIntro({ attachTo: document.body })
    expect(w.find('.site-intro').exists()).toBe(true)
    expect(w.find('.cta-text').text()).toBe('点击进入')
    w.unmount()
  })

  it('本会话看过一次后不再出现', () => {
    sessionStorage.setItem('homepage-intro-done', '1')
    const w = mount(SiteIntro)
    expect(w.find('.site-intro').exists()).toBe(false)
  })

  it('点击进入推进动画并标记会话', async () => {
    vi.useFakeTimers()
    const w = await mountIntro({ attachTo: document.body })
    await w.find('.site-intro').trigger('click')
    await vi.advanceTimersByTimeAsync(0)
    expect(w.find('.intro-dive').exists()).toBe(true)
    await vi.advanceTimersByTimeAsync(1600)
    expect(w.find('.intro-settle').exists()).toBe(true)
    await vi.advanceTimersByTimeAsync(2500)
    expect(sessionStorage.getItem('homepage-intro-done')).toBe('1')
    vi.useRealTimers()
    w.unmount()
  })

  it('运镜三层图齐全（云/树冠/森林=首页背景）', async () => {
    const w = await mountIntro()
    expect(w.find('.intro-cloud').exists()).toBe(true)
    expect(w.find('.intro-canopy').exists()).toBe(true)
    expect(w.find('.intro-forest').exists()).toBe(true)
    w.unmount()
  })
})
