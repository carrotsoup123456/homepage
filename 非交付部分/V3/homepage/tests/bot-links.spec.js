import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ChatBot from '../src/components/ChatBot.vue'

// 回答内嵌项目链接卡：回答文本里提到项目 → 气泡下方自动出现详情页链接卡
// （词条没手写 links 也能自动带路；手写过的不会重复）。
describe('ChatBot 项目自动链接卡', () => {
  function mountBot() {
    return mount(ChatBot, {
      global: {
        // RouterLink 替身：把 to 透传成 href，方便断言
        stubs: {
          RouterLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    })
  }

  // 快进打字机：把 setInterval 计时全部走完
  async function askAndFinish(w, question) {
    await w.find('.bot-fab').trigger('click')
    await flushPromises()
    await w.find('form.bot-input input').setValue(question)
    await w.find('form.bot-input').trigger('submit')
    vi.advanceTimersByTime(60_000)
    await flushPromises()
  }

  it('提到《为官一方》但没手写 links 的回答，自动附上项目链接卡', async () => {
    vi.useFakeTimers()
    const w = mountBot()
    // 「这个网站怎么逛？」词条提到游戏但没配 links → 自动带路
    await askAndFinish(w, '这个网站怎么逛')

    const cards = w.findAll('.bot-link-btn')
    const hrefs = cards.map((c) => c.attributes('href'))
    expect(hrefs).toContain('/project/weiguan-yifang')
    const game = cards.find((c) => c.attributes('href') === '/project/weiguan-yifang')
    expect(game.text()).toContain('为官一方')
    vi.useRealTimers()
  })

  it('词条手写的 links 保留，自动链接不与之重复', async () => {
    vi.useFakeTimers()
    const w = mountBot()
    // 「第四个：《为官一方》是什么？」手写 link 已指向 /project/weiguan-yifang → 自动卡去重
    await askAndFinish(w, '第四个：《为官一方》是什么')

    const hrefs = w.findAll('.bot-link-btn').map((c) => c.attributes('href'))
    const dupes = hrefs.filter((h, i) => hrefs.indexOf(h) !== i)
    expect(dupes).toEqual([]) // 无重复
    expect(hrefs).toContain('/project/weiguan-yifang') // 手写那条保留
    vi.useRealTimers()
  })

  it('没提到项目的回答不多附链接卡', async () => {
    vi.useFakeTimers()
    const w = mountBot()
    await askAndFinish(w, '你的联系方式是什么')

    const hrefs = w.findAll('.bot-link-btn').map((c) => c.attributes('href'))
    // 联系方式回答不含项目名，不应出现任何 /project/ 卡
    expect(hrefs.some((h) => h.startsWith('/project/'))).toBe(false)
    vi.useRealTimers()
  })
})
