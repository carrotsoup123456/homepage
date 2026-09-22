import { describe, it, expect } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import { site, skills, skillDetails, projects, contacts } from '../src/data/site.js'

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

  it('项目都写了首页卡片需要的字段', () => {
    for (const p of projects) {
      expect(p.icon, `${p.id} 缺 icon`).toBeTruthy()
      expect(p.short, `${p.id} 缺 short`).toBeTruthy()
      expect(p.desc, `${p.id} 缺 desc`).toBeTruthy()
      expect(p.tech, `${p.id} 缺 tech`).toBeTruthy()
      expect(p.role, `${p.id} 缺 role`).toBeTruthy()
      expect(Array.isArray(p.highlights), `${p.id} 的 highlights 必须是数组`).toBe(true)
      expect(p.highlights.length, `${p.id} 的 highlights 不能为空`).toBeGreaterThan(0)
      expect(Array.isArray(p.images), `${p.id} 的 images 必须是数组`).toBe(true)
    }
  })

  it('二次开发类项目必须写明上游来源（防止把别人的成品说成自己的）', () => {
    const thirdParty = ['todo-panel', 'claude-code-custom']
    for (const id of thirdParty) {
      const p = projects.find((x) => x.id === id)
      expect(p, `缺少项目 ${id}`).toBeTruthy()
      const text = `${p.role} ${p.long}`
      expect(/上游|开源|第三方|MIT/.test(text), `${id} 未注明上游来源`).toBe(true)
      expect(/不主张|非原创|不是我原创|不是原创/.test(text), `${id} 未声明不主张原创`).toBe(true)
    }
  })

  it('「关于」页的技能详情与首页跑马灯一一对应', () => {
    expect(Array.isArray(skillDetails)).toBe(true)
    expect(skillDetails.length).toBeGreaterThan(0)

    const ids = skillDetails.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)

    for (const s of skillDetails) {
      expect(s.id).not.toMatch(/\s/)
      expect(s.name).toBeTruthy()
      expect(s.level).toBeTruthy()
      expect(s.summary).toBeTruthy()
      expect(Array.isArray(s.points)).toBe(true)
      expect(s.points.length).toBeGreaterThan(0)
      expect(Array.isArray(s.evidence)).toBe(true)
      expect(s.evidence.length).toBeGreaterThan(0)
    }

    // 每个技能都应该能在首页的 skills 简写列表里找到对应项
    expect(skillDetails.length).toBe(skills.length)
    for (const s of skillDetails) {
      const hit = skills.some((k) => k.includes(s.name) || s.name.includes(k.replace(/（.*）/, '')))
      expect(hit, `技能「${s.name}」在首页 skills 里没有对应项`).toBe(true)
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

  it('项目的本地图片路径都带上了 base 前缀（否则 GitHub Pages 会 404）', () => {
    for (const p of projects) {
      for (const img of p.images || []) {
        if (img.src.startsWith('http')) continue
        expect(img.src.startsWith('/'), `${img.src} 缺少 base 前缀`).toBe(true)
        expect(img.src.endsWith('.png') || img.src.endsWith('.jpg') || img.src.endsWith('.jpeg') || img.src.endsWith('.webp') || img.src.endsWith('.svg'), `${img.src} 不是图片后缀`).toBe(true)
      }
    }
  })

  it('项目的图片文件真的存在（防止改了格式却忘了改引用路径）', () => {
    // 只在能读到 public/ 时校验；打包环境自动跳过。
    const publicDir = path.resolve(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) return

    const missing = []
    for (const p of projects) {
      for (const img of p.images || []) {
        if (img.src.startsWith('http')) continue
        // 去掉 base 前缀（如 /homepage/），从 projects/ 开始还原成 public/ 下的相对路径
        const i = img.src.indexOf('projects/')
        if (i < 0) continue
        const file = path.join(publicDir, img.src.slice(i))
        if (!fs.existsSync(file)) missing.push(`${p.id}: ${img.src} 找不到对应文件`)
      }
    }
    expect(missing, missing.join('\n')).toEqual([])
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
