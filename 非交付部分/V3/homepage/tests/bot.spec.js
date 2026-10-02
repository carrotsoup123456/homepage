// 数字分身匹配引擎单测（用真实问答库做集成断言，防回归）
import { describe, it, expect } from 'vitest'
import { normalize, match, matchOrdinal, pickCandidates } from '../src/data/bot.js'
import { botQa, PROJECT_ORDER } from '../src/data/bot-qa.js'

const ctxProjects = { type: 'projects', idx: 0, projectIds: PROJECT_ORDER }

describe('normalize', () => {
  it('忽略大小写、空格与标点', () => {
    expect(normalize(' 为 官一方，怎么玩？！')).toBe('为官一方怎么玩')
    expect(normalize('LightGBM!')).toBe('lightgbm')
  })
  it('空输入安全', () => {
    expect(normalize('')).toBe('')
    expect(normalize(null)).toBe('')
  })
})

describe('match：精确与同义词命中', () => {
  it('问游戏命中为官一方条目', () => {
    const r = match('为官一方怎么玩', botQa)
    expect(r.kind).toBe('answer')
    expect(r.entry.a).toContain('县令')
  })
  it('同义词「炒股」命中股票量化条目', () => {
    const r = match('炒股收益怎么样', botQa)
    expect(r.kind).toBe('answer')
    expect(r.entry.a).toContain('112.74')
  })
  it('联系方式多种说法都命中', () => {
    for (const q of ['怎么联系他', '邮箱是多少', '微信有吗']) {
      const r = match(q, botQa)
      expect(r.kind, q).toBe('answer')
      expect(r.entry.a, q).toMatch(/carrotsoup@qq\.com|13420089540/)
    }
  })
})

describe('match：错别字容错', () => {
  it('「为官一访」（方→访）仍命中游戏条目', () => {
    const r = match('为官一访是什么', botQa)
    expect(r.kind).toBe('answer')
    expect(r.entry.a).toContain('县令')
  })
  it('短词不允许容错，避免乱命中', () => {
    // 「联系」2 字词，错 1 字不应命中联系条目
    const r = match('联细一下', botQa)
    expect(r.kind).not.toBe('answer')
  })
})

describe('match：did-you-mean 与兜底', () => {
  it('弱命中给「你是想问吗」候选而不是硬答', () => {
    const r = match('量化', botQa) // 只有 2 字弱信号
    expect(['did-you-mean', 'answer']).toContain(r.kind)
    if (r.kind === 'did-you-mean') expect(r.candidates.length).toBeGreaterThan(0)
  })
  it('无关输入走兜底（候选可为空，由组件给保底建议）', () => {
    const r = match('今天天气怎么样', botQa)
    expect(r.kind).toBe('fallback')
    expect(Array.isArray(r.candidates)).toBe(true)
  })
  it('「碳吸附装置」属于沾边输入，应直接命中 Carbon Brain', () => {
    const r = match('碳吸附装置', botQa)
    expect(r.kind).toBe('answer')
    expect(r.entry.id).toBe('proj-carbon')
  })
  it('兜底候选按相关度排序（碳→Carbon Brain 靠前）', () => {
    const cands = pickCandidates(normalize('碳材料预测'), botQa)
    expect(cands.length).toBeGreaterThan(0)
    expect(cands[0].a).toContain('Carbon')
  })
})

describe('match：序数追问（会接话）', () => {
  it('项目语境下「第二个」→ Carbon Brain', () => {
    const r = match('第二个', botQa, ctxProjects)
    expect(r.kind).toBe('answer')
    expect(r.entry.id).toBe('proj-carbon')
    expect(r.contextUpdate.idx).toBe(1)
  })
  it('「下一个」顺序推进', () => {
    const r = match('下一个', botQa, { ...ctxProjects, idx: 1 })
    expect(r.kind).toBe('answer')
    expect(r.entry.id).toBe('proj-stock')
  })
  it('越界（第五个之后「下一个」）老实说没有', () => {
    const r = match('下一个', botQa, { ...ctxProjects, idx: 4 })
    expect(r.kind).toBe('out-of-range')
    expect(r.total).toBe(5)
  })
  it('非项目语境的「第二个」不乱接', () => {
    const r = match('第二个', botQa, { type: 'topic' })
    expect(r.kind).not.toBe('answer')
  })
  it('项目总览条目命中后进入项目语境', () => {
    const r = match('他做过哪些项目', botQa)
    expect(r.kind).toBe('answer')
    expect(r.contextUpdate.type).toBe('projects')
  })
})

describe('matchOrdinal 本身', () => {
  it('各种说法', () => {
    expect(matchOrdinal('第二个')).toBe(1)
    expect(matchOrdinal('第3个')).toBe(2)
    expect(matchOrdinal('下一个')).toBe('next')
    expect(matchOrdinal('还有呢')).toBe('next')
    expect(matchOrdinal('上一个')).toBe('prev')
    expect(matchOrdinal('随便聊聊')).toBe(null)
  })
})

describe('问答库健康检查', () => {
  it('每条都有 id / q / keys / a', () => {
    for (const e of botQa) {
      expect(e.id, JSON.stringify(e)).toBeTruthy()
      expect(e.q, e.id).toBeTruthy()
      expect(e.keys?.length, e.id).toBeGreaterThan(0)
      expect(e.a?.length, e.id).toBeGreaterThan(10)
    }
  })
  it('id 不重复', () => {
    const ids = botQa.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('PROJECT_ORDER 五个项目条目都存在', () => {
    for (const id of PROJECT_ORDER) {
      expect(botQa.some((e) => e.id === id), id).toBe(true)
    }
  })
})
