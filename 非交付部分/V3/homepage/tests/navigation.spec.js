import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import { defineComponent, h } from 'vue'
import { routes } from '../src/router/index.js'
import BackBar from '../src/components/BackBar.vue'
import NoteView from '../src/views/NoteView.vue'
import { useBackGuard } from '../src/composables/useBackGuard.js'

// 知识库列表 → 笔记独立页 → 返回：整条移动端阅读动线
function makeRouter() {
  return createRouter({ history: createWebHashHistory(), routes })
}

beforeEach(() => {
  // 各用例独立的历史栈
  window.history.replaceState(null, '', '#/')
  window.history.state && delete window.history.state.__wb
})

describe('禁双指缩放', () => {
  it('viewport 声明 user-scalable=no（微信/安卓生效的主通道）', () => {
    const html = require('fs').readFileSync('index.html', 'utf-8')
    expect(html).toContain('user-scalable=no')
    expect(html).toContain('maximum-scale=1.0')
  })
})

describe('BackBar 底部返回按钮', () => {
  it('有来路时点击真的回上一页', async () => {
    const router = makeRouter()
    await router.push('/knowledge')
    await router.push('/knowledge/note/reading-nawal')
    const back = vi.spyOn(router, 'back')
    const w = mount(BackBar, { global: { plugins: [router] } })
    await w.find('.back-bar-btn').trigger('click')
    expect(back).toHaveBeenCalled()
  })

  it('直接打开分享链接（无来路）回指定列表页', async () => {
    const router = makeRouter()
    await router.push('/knowledge/note/reading-nawal') // 直接进入，无来路
    // 清掉 router 写入的 state.back（模拟微信里直接点开链接）
    window.history.replaceState({}, '', location.href)
    const push = vi.spyOn(router, 'push')
    const w = mount(BackBar, { props: { to: '/knowledge' }, global: { plugins: [router] } })
    await w.find('.back-bar-btn').trigger('click')
    expect(push).toHaveBeenCalledWith('/knowledge')
  })
})

describe('笔记独立页 NoteView', () => {
  it('渲染笔记标题、正文与底部返回按钮', async () => {
    const router = makeRouter()
    await router.push('/knowledge/note/reading-nawal')
    const w = mount(NoteView, { props: { id: 'reading-nawal' }, global: { plugins: [router] } })
    await flushPromises()
    expect(w.find('.kb-title').text()).toContain('纳瓦尔')
    expect(w.find('.kb-body .markdown').exists()).toBe(true)
    expect(w.find('.back-bar-btn').text()).toContain('返回笔记列表')
    expect(w.find('.note-crumb a').attributes('href')).toBe('#/knowledge')
  })

  it('链接写错（无效 id）回知识库列表', async () => {
    const router = makeRouter()
    await router.push('/knowledge/note/no-such-note')
    mount(NoteView, { global: { plugins: [router] } })
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('knowledge')
  })
})

describe('微信左滑退出防护 useBackGuard', () => {
  it('非微信浏览器不启用（不压哨兵）', async () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 Macintosh Safari' })
    const Host = defineComponent({ setup() { useBackGuard() }, render: () => h('div') })
    mount(Host)
    await new Promise((r) => setTimeout(r, 900))
    expect(window.history.state?.__wb).toBeUndefined()
    vi.unstubAllGlobals()
  })

  it('微信里进站压哨兵：栈底标记 + 上方哨兵', async () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 iPhone MicroMessenger' })
    const Host = defineComponent({ setup() { useBackGuard() }, render: () => h('div') })
    mount(Host)
    await new Promise((r) => setTimeout(r, 900))
    // 当前在哨兵位（__wb:2）
    expect(window.history.state?.__wb).toBe(2)
    vi.unstubAllGlobals()
  })

  it('微信里滑到栈底：先拦一次并提示，再滑才放行', async () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 iPhone MicroMessenger' })
    const Host = defineComponent({ setup() { useBackGuard() }, render: () => h('div') })
    mount(Host)
    await new Promise((r) => setTimeout(r, 900))
    // 模拟滑到栈底（popstate 回到 __wb:1 那条）
    window.dispatchEvent(new PopStateEvent('popstate', { state: { __wb: 1 } }))
    await new Promise((r) => setTimeout(r, 50))
    expect(document.querySelector('.wechat-exit-toast')?.classList.contains('show')).toBe(true)
    expect(window.history.state?.__wb).toBe(2) // 哨兵重新压上（没退出）
    document.querySelector('.wechat-exit-toast')?.remove()
    vi.unstubAllGlobals()
  })
})
