import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import FeedbackWidget from '../src/components/FeedbackWidget.vue'

// 反馈组件：贴在内容末尾的那句「对你有用吗」。
describe('反馈组件 FeedbackWidget', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    localStorage.clear()
  })

  function okFetch() {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ success: 'true' }) })
  }

  function mountWidget() {
    return mount(FeedbackWidget, { props: { page: '测试页', item: 'note-x' } })
  }

  it('第一次访问时询问「对你有用吗」，给出两个选项', () => {
    const w = mountWidget()
    expect(w.text()).toContain('对你有用吗')
    expect(w.text()).toContain('有用')
    expect(w.text()).toContain('还需改进')
    expect(w.find('.fb-textarea').exists()).toBe(false)
  })

  it('选择态度后才出现「补充说明」输入框', async () => {
    const w = mountWidget()
    await w.findAll('button')[0].trigger('click') // 👍 有用

    expect(w.text()).toContain('有用')
    expect(w.find('.fb-textarea').exists()).toBe(true)
  })

  it('提交后显示感谢，并调用一次接口', async () => {
    okFetch()
    const w = mountWidget()
    await w.findAll('button')[0].trigger('click')

    await w.find('.fb-textarea').setValue('例子再多一点就好')
    const submitBtn = w.findAll('button').find((b) => b.text().includes('提交反馈'))
    await submitBtn.trigger('click')
    await flushPromises()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(w.text()).toContain('谢谢')
  })

  it('提交时把页面、评分、留言一起发出去', async () => {
    okFetch()
    const w = mount(FeedbackWidget, { props: { page: '知识库', item: 'vite-build-deploy' } })
    await w.findAll('button')[1].trigger('click') // 🤔 还需改进
    await w.find('.fb-textarea').setValue('希望加图示')
    await w.findAll('button').find((b) => b.text().includes('提交反馈')).trigger('click')
    await flushPromises()

    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.page).toBe('知识库')
    expect(body.item).toBe('vite-build-deploy')
    expect(body.rating).toBe('还需改进')
    expect(body.comment).toBe('希望加图示')
    expect(body.url).toBeTruthy()
  })

  it('本机反馈过就不再重复追问', async () => {
    localStorage.setItem('homepage-feedback:测试页:note-x', '有用')
    const w = mountWidget()

    expect(w.text()).toContain('谢谢')
    expect(w.text()).not.toContain('对你有用吗')
  })

  it('接口失败时给出提示，且不会假装成功', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: 'false', message: '收件地址未激活' }),
    })
    const w = mountWidget()
    await w.findAll('button')[0].trigger('click')
    await w.findAll('button').find((b) => b.text().includes('提交反馈')).trigger('click')
    await flushPromises()

    expect(w.text()).toContain('收件地址未激活')
    expect(w.text()).not.toContain('谢谢')
  })

  it('网络异常时也能兜住（不白屏）', async () => {
    fetch.mockRejectedValue(new Error('offline'))
    const w = mountWidget()
    await w.findAll('button')[0].trigger('click')
    await w.findAll('button').find((b) => b.text().includes('提交反馈')).trigger('click')
    await flushPromises()

    expect(w.text()).toContain('网络异常')
  })
})
