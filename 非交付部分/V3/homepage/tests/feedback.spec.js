import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FORM_ENDPOINT, sendToFormSubmit } from '../src/data/feedback.js'

// 反馈出口：主页没有自建后端，靠第三方转发服务。
// 这里用假 fetch 验证「发出去的字段对不对」，不发真实网络请求。
describe('反馈出口 sendToFormSubmit', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function mockOk(payload = { success: 'true' }) {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => payload,
    })
  }

  it('提交到配置的端点', async () => {
    mockOk()
    await sendToFormSubmit({ page: '知识库' })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch.mock.calls[0][0]).toBe(FORM_ENDPOINT)
    expect(FORM_ENDPOINT).toContain('formsubmit.co')
  })

  it('自动带上 FormSubmit 的约定字段', async () => {
    mockOk()
    await sendToFormSubmit({ page: '首页' })

    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body._captcha).toBe('false') // 关闭验证码，才能静默提交
    expect(body._subject).toBeTruthy()
    expect(body.page).toBe('首页')
  })

  it('成功时返回 ok: true', async () => {
    mockOk({ success: 'true', message: 'ok' })
    const res = await sendToFormSubmit({})
    expect(res.ok).toBe(true)
  })

  it('服务端返回 success: false 时 ok 为 false 并带上原因', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: 'false', message: '收件地址未激活' }),
    })
    const res = await sendToFormSubmit({})
    expect(res.ok).toBe(false)
    expect(res.message).toBe('收件地址未激活')
  })

  it('HTTP 状态码不是 2xx 时 ok 为 false', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ success: 'true' }),
    })
    const res = await sendToFormSubmit({})
    expect(res.ok).toBe(false)
  })

  it('返回值不是 JSON 时不会抛错', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error('not json')
      },
    })
    const res = await sendToFormSubmit({})
    expect(res.ok).toBe(false)
  })
})
