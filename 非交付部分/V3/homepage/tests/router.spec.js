import { describe, it, expect } from 'vitest'
import router from '../src/router/index.js'

// 路由表：地址与页面（房间）的对应关系，是单页应用的骨架。
describe('路由表', () => {
  it('五个页面路由都存在', () => {
    const names = router.getRoutes().map((r) => r.name)
    for (const n of ['home', 'about', 'project', 'knowledge', 'contact']) {
      expect(names).toContain(n)
    }
  })

  it('/project/xxx 能把 id 传给页面', () => {
    const resolved = router.resolve('/project/carbon-brain')
    expect(resolved.name).toBe('project')
    expect(resolved.params.id).toBe('carbon-brain')
  })

  it('每个页面都能解析出组件（不会白屏）', () => {
    for (const path of ['/', '/about', '/knowledge', '/contact']) {
      expect(router.resolve(path).matched.length).toBeGreaterThan(0)
    }
  })

  it('未知地址会被兜底规则接住（不报错）', () => {
    const resolved = router.resolve('/this-page-does-not-exist')
    // 兜底规则：redirect 到首页
    expect(resolved.matched.length).toBeGreaterThan(0)
  })
})
