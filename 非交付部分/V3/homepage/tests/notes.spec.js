import { describe, it, expect } from 'vitest'
import { notes, allTags, searchNotes } from '../src/data/notes.js'

// 知识库内容管线：确保「丢一个 md 进去就能被读到」这条链路不出错。
describe('知识库内容管线', () => {
  it('能加载到笔记，且每篇都有必需的字段', () => {
    expect(notes.length).toBeGreaterThanOrEqual(6)

    for (const n of notes) {
      expect(n.id).toBeTruthy()
      expect(n.title).toBeTruthy()
      expect(n.body.length).toBeGreaterThan(0)
      expect(n.minutes).toBeGreaterThanOrEqual(1)
      expect(Array.isArray(n.tags)).toBe(true)
    }
  })

  it('frontmatter 里的 tags 被解析成数组（不是一整串字符串）', () => {
    const withTags = notes.filter((n) => n.tags.length > 0)
    expect(withTags.length).toBeGreaterThan(0)
    for (const n of withTags) {
      expect(n.tags.every((t) => typeof t === 'string' && t.length > 0)).toBe(true)
    }
  })

  it('笔记按日期倒序排列（新的在前）', () => {
    const dated = notes.filter((n) => n.date)
    const sorted = [...dated].sort((a, b) => b.date.localeCompare(a.date))
    expect(dated.map((n) => n.id)).toEqual(sorted.map((n) => n.id))
  })

  it('标签来自笔记本身，且不重复', () => {
    expect(allTags.length).toBeGreaterThan(0)
    expect(new Set(allTags).size).toBe(allTags.length)
    for (const t of allTags) {
      expect(notes.some((n) => n.tags.includes(t))).toBe(true)
    }
  })

  it('不加条件时返回全部笔记', () => {
    expect(searchNotes()).toHaveLength(notes.length)
    expect(searchNotes('', '全部')).toHaveLength(notes.length)
  })

  it('按标签筛选时，结果都带该标签', () => {
    const tag = allTags[0]
    const result = searchNotes('', tag)
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((n) => n.tags.includes(tag))).toBe(true)
  })

  it('按关键词能搜到正文里的内容', () => {
    const hit = searchNotes('LightGBM')
    expect(hit.length).toBeGreaterThan(0)
    expect(hit.some((n) => n.id.includes('lightgbm'))).toBe(true)
  })

  it('搜不到时返回空数组（不会报错）', () => {
    expect(searchNotes('这个词肯定不存在zzz')).toEqual([])
  })

  it('关键词 + 标签是「同时满足」的关系', () => {
    const tag = allTags[0]
    const result = searchNotes('这个词肯定不存在zzz', tag)
    expect(result).toEqual([])
  })
})
