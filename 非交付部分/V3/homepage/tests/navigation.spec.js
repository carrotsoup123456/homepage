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

describe('v6.27 移动端体验完善', () => {
  it('汉堡按钮左侧带引导注释（含箭头符号）', async () => {
    const { default: SiteHeader } = await import('../src/components/SiteHeader.vue')
    const router = makeRouter()
    const w = mount(SiteHeader, { global: { plugins: [router] } })
    const hint = w.find('.nav-hint')
    expect(hint.exists()).toBe(true)
    expect(hint.text()).toContain('点此处可以了解更多信息')
    expect(hint.text()).toContain('→')
  })

  it('v6.33：移动端菜单为两行三列按钮网格，点按直达', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener() {}, removeEventListener() {} }))
    const { default: SiteHeader } = await import('../src/components/SiteHeader.vue')
    const router = makeRouter()
    const w = mount(SiteHeader, { global: { plugins: [router] } })
    await flushPromises()
    expect(w.find('.nav-grid').exists()).toBe(true)
    expect(w.find('.nav-links').exists()).toBe(false) // 桌面版列表不出
    const btns = w.findAll('.grid-btn')
    expect(btns.length).toBe(6) // 六个栏目 = 两行三列（布局由 CSS grid 承担）
    expect(btns[0].text()).toContain('首页')
    expect(btns[5].text()).toContain('联系')
    await w.find('.nav-toggle').trigger('click')
    await flushPromises()
    // 当前页（首页）高亮
    expect(btns[0].classes()).toContain('active')
    // 点「音乐」直达并收起菜单
    await btns[3].trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/music')
    expect(w.vm.$.setupState.menuOpen).toBe(false)
    vi.unstubAllGlobals()
  })

  it('v6.29：主题圆形扩散在不支持 VT 的环境退回普通切换', async () => {
    const { default: SiteHeader } = await import('../src/components/SiteHeader.vue')
    const { ref } = await import('vue')
    const router = makeRouter()
    const themeRef = ref('light')
    const w = mount(SiteHeader, {
      global: {
        plugins: [router],
        provide: {
          theme: themeRef,
          toggleTheme: () => {
            themeRef.value = themeRef.value === 'dark' ? 'light' : 'dark'
          },
        },
      },
    })
    await flushPromises()
    const btn = w.findAll('.theme-toggle')[0]
    expect(themeRef.value).toBe('light')
    await btn.trigger('click')
    await flushPromises()
    expect(themeRef.value).toBe('dark') // fallback 直接切换成功
  })

  it('v6.29：数字分身带小标，向下滚动收成圆、向上滚动展开', async () => {
    const { default: ChatBot } = await import('../src/components/ChatBot.vue')
    const w = mount(ChatBot, { attachTo: document.body })
    const label = w.find('.bot-fab-label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('我的数字分身')
    expect(label.classes()).toContain('on') // 初始展开
    // 向下滚 100px：收缩
    window.scrollY = 100
    window.dispatchEvent(new Event('scroll'))
    await flushPromises()
    expect(label.classes()).not.toContain('on')
    // 向上滚回：展开
    window.scrollY = 20
    window.dispatchEvent(new Event('scroll'))
    await flushPromises()
    expect(label.classes()).toContain('on')
    w.unmount()
  })

  it('项目图随段落：carrot 各小节图入位，图集区只留未认领的', async () => {
    const { default: ProjectDetailView } = await import('../src/views/ProjectDetailView.vue')
    const router = makeRouter()
    await router.push('/project/carrot-agent')
    const w = mount(ProjectDetailView, { global: { plugins: [router] } })
    await flushPromises()
    // 5 张图全部按锚点入段
    expect(w.findAll('.chunk-gallery .gallery-item').length).toBe(6)
    // 兜底图集为空 → 不渲染
    expect(w.find('.detail-gallery').exists()).toBe(false)
    // fork 段落带 2 张图（drift + toolbox）
    const secs = w.findAll('.md-chunk')
    const forkSec = secs.find((sec) => sec.text().includes('fork 漂移'))
    expect(forkSec?.element.nextElementSibling?.querySelectorAll('.gallery-item').length).toBe(2)
  })

  it('项目页「返回首页」走 back 语义（回到来的地方）', async () => {
    const { default: ProjectDetailView } = await import('../src/views/ProjectDetailView.vue')
    const router = makeRouter()
    await router.push('/')
    await router.push('/project/carrot-agent')
    const back = vi.spyOn(router, 'back')
    const w = mount(ProjectDetailView, { global: { plugins: [router] } })
    await flushPromises()
    expect(w.find('.back-link').text()).toContain('返回首页')
    await w.find('.back-link').trigger('click')
    expect(back).toHaveBeenCalled()
  })

  it('访客反馈#1：亮点前置到标题下方 + 目录条分节跳转', async () => {
    const { default: ProjectDetailView } = await import('../src/views/ProjectDetailView.vue')
    const router = makeRouter()
    await router.push('/project/carrot-agent')
    const w = mount(ProjectDetailView, { global: { plugins: [router] } })
    await flushPromises()
    // ① 亮点区在 hero 之后、长文 body 之前（DOM 顺序）
    const hero = w.find('.detail-hero')
    const highlights = w.find('.detail-highlights')
    expect(highlights.exists()).toBe(true)
    expect(hero.element.nextElementSibling).toBe(highlights.element)
    expect(
      highlights.element.nextElementSibling.classList.contains('detail-toc') ||
        highlights.element.nextElementSibling.classList.contains('detail-body')
    ).toBe(true)
    // ② 目录条：可见 chip 数 = 有标题的分节数（无标题引导段被 v-show 隐藏）
    const chips = w.findAll('.toc-chip').filter((c) => c.isVisible())
    expect(chips.length).toBe(6)
    expect(chips[0].text()).toContain('第一步')
    expect(chips.some((c) => c.text().includes('踩的坑'))).toBe(true)
    // ③ 点击 chip：平滑滚动到对应节并高亮（jsdom 没有 scrollIntoView，stub 记录）
    const calls = []
    Element.prototype.scrollIntoView = function (opts) {
      calls.push({ el: this, opts })
    }
    try {
      // 过滤后的 chip[5]（"我学到的"）对应 sections[6]（第 0 块是无标题引导段）
      await chips[5].trigger('click')
      expect(calls.length).toBe(1)
      expect(calls[0].el.id).toBe('sec-6')
      expect(calls[0].opts.behavior).toBe('smooth')
      expect(chips[5].classes()).toContain('active')
    } finally {
      delete Element.prototype.scrollIntoView
    }
    w.unmount()
  })

  it('访客反馈#2-#5：动效收敛 + 兴趣四宫格 + carbon-brain 流程图', async () => {
    // HomeView 的视差 / 动效开关依赖 matchMedia，jsdom 没有实现
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }))
    try {
    // ===== 反馈 #2：萤火虫层已移除（首页不再渲染 .fireflies） =====
    const { default: HomeView } = await import('../src/views/HomeView.vue')
    const router = makeRouter()
    await router.push('/')
    const home = mount(HomeView, { global: { plugins: [router] } })
    await flushPromises()
    expect(home.find('.fireflies').exists()).toBe(false)
    // ===== 反馈 #4：兴趣四宫格——4 张卡、链接指向对应栏目 =====
    const cards = home.findAll('.interest-card')
    expect(cards.length).toBe(4)
    const hrefs = cards.map((c) => c.attributes('href'))
    expect(hrefs).toEqual(
      expect.arrayContaining(['#/music', '#/project/stock-quant', '#/play', '#/knowledge'])
    )
    // 素材真实性：架子鼓卡写的是 10 级（数据源 site.js）
    const drum = cards.find((c) => c.text().includes('架子鼓'))
    expect(drum.text()).toContain('10 级')
    home.unmount()

    // ===== 反馈 #3：carbon-brain 技术路线节配流程图（5 节点） =====
    const { default: ProjectDetailView } = await import('../src/views/ProjectDetailView.vue')
    await router.push('/project/carbon-brain')
    const detail = mount(ProjectDetailView, { global: { plugins: [router] } })
    await flushPromises()
    const flow = detail.find('.flow-diagram')
    expect(flow.exists()).toBe(true)
    expect(detail.findAll('.flow-node').length).toBe(5)
    const flowText = flow.text()
    expect(flowText).toContain('XGBoost')
    expect(flowText).toContain('18 维')
    expect(flowText).toContain('饱和度')
    // 流程图应出现在「技术路线」节内（紧跟 md-chunk 之前、且该 chunk 标题是技术路线）
    const diagramEl = flow.element
    const chunk = diagramEl.nextElementSibling
    expect(chunk.classList.contains('md-chunk')).toBe(true)
    expect(chunk.textContent).toContain('技术路线')
    detail.unmount()
    } finally {
      vi.unstubAllGlobals()
    }
  })

})
