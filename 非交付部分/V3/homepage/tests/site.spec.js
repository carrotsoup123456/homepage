import { describe, it, expect } from 'vitest'
import { site, projects, contacts } from '../src/data/site.js'

// 站点数据完整性：数据是各页面渲染的唯一来源，坏了页面就空白。
describe('站点数据', () => {
  it('站点基本信息齐全', () => {
    expect(site.name).toBeTruthy()
    expect(site.tagline).toBeTruthy()
    expect(site.bio).toBeTruthy()
  })

  it('每个项目都有 id / 标题 / 正文，且 id 不重复', () => {
    expect(projects.length).toBeGreaterThanOrEqual(2)

    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)

    for (const p of projects) {
      expect(typeof p.id).toBe('string')
      expect(p.id).not.toMatch(/\s/) // id 不能带空格，否则路由匹配不到
      expect(p.title).toBeTruthy()
      expect(p.long).toBeTruthy()
    }
  })

  it('项目详情里的图片都写了 alt（无障碍与 SEO 需要）', () => {
    for (const p of projects) {
      for (const img of p.images || []) {
        expect(img.src).toBeTruthy()
        expect(img.alt).toBeTruthy()
      }
    }
  })

  it('项目的外链都是 https 开头', () => {
    for (const p of projects) {
      if (p.link) expect(p.link.startsWith('https://')).toBe(true)
    }
  })

  it('联系方式里包含邮箱', () => {
    expect(contacts.length).toBeGreaterThan(0)
    expect(contacts.some((c) => String(c.href || '').includes('mailto:'))).toBe(true)
  })
})
