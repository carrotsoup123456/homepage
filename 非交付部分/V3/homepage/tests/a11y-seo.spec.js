import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from '../src/App.vue'
import router, { routes } from '../src/router/index.js'
import { setPageMeta, SITE_URL, DEFAULT_TITLE } from '../src/data/meta.js'
import ProjectDetailView from '../src/views/ProjectDetailView.vue'
import FeedbackWidget from '../src/components/FeedbackWidget.vue'
import reveal, { revealStagger } from '../src/directives/reveal.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')

// jsdom 没实现这两个浏览器 API，组件会用到，这里补最小的替身
beforeEach(() => {
  if (!window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      addEventListener() {},
      removeEventListener() {},
    })
  }
  document.head.querySelectorAll('[data-test-meta]').forEach((el) => el.remove())
})

afterEach(() => {
  vi.restoreAllMocks()
})

// 挂载整个应用（用真实路由表，才能在真地址下检查页面）
async function mountApp() {
  const r = createRouter({ history: createWebHashHistory(), routes })
  const w = mount(App, {
    // 挂到真实 document 上：否则元素不在文档里，focus() 不生效，测不了焦点
    attachTo: document.body,
    global: { plugins: [r], directives: { reveal, 'reveal-stagger': revealStagger } },
  })
  await r.isReady()
  return { w, router: r }
}

describe('页面标题与分享信息', () => {
  it('每个页面都配了标题，且标题互不重复（WCAG 2.4.2 页面要有标题）', () => {
    const titles = []
    for (const route of routes) {
      // 首页用站点默认标题，可以不写
      if (route.name !== 'home') {
        expect(route.meta?.title, `${route.path} 缺标题`).toBeTruthy()
      }
      expect(route.meta?.desc, `${route.path} 缺页面描述`).toBeTruthy()
      const t = route.meta?.title
      if (t) titles.push(t)
    }
    // 标题重复 = 用户/读屏分不清自己到了哪个页面
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('切换页面会同时更新标题、描述与分享标签', () => {
    setPageMeta({ title: '关于我', desc: '这是关于页', path: '/about' })

    expect(document.title).toBe('关于我 · 刘博康')
    expect(document.head.querySelector('meta[name="description"]').content).toBe('这是关于页')
    expect(document.head.querySelector('meta[property="og:title"]').content).toBe(
      '关于我 · 刘博康'
    )
    expect(document.head.querySelector('meta[name="twitter:title"]').content).toBe(
      '关于我 · 刘博康'
    )
    expect(document.head.querySelector('meta[property="og:url"]').content).toBe(
      `${SITE_URL}#/about`
    )
    expect(document.head.querySelector('link[rel="canonical"]').href).toBe(`${SITE_URL}#/about`)
  })

  it('反复切换页面不会重复往 <head> 里塞标签', () => {
    setPageMeta({ title: '关于我', path: '/about' })
    setPageMeta({ title: '联系我', path: '/contact' })
    setPageMeta({ title: '知识库', path: '/knowledge' })

    expect(document.head.querySelectorAll('meta[property="og:title"]').length).toBe(1)
    expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1)
    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1)
  })

  it('不传标题时退回站点默认标题（首页就是这样）', () => {
    setPageMeta({ title: '', path: '/' })
    expect(document.title).toBe(DEFAULT_TITLE)
  })

  it('实际访问每个页面后，浏览器标题确实变了（不只是配置写了）', async () => {
    const { router } = await mountApp()

    await router.push('/knowledge')
    expect(document.title).toContain('知识库')

    await router.push('/project/weiguan-yifang')
    expect(document.title).toContain('为官一方')

    await router.push('/about')
    expect(document.title).toContain('关于我')

    // 两个项目之间来回切换，标题要跟着换（不能停在上一篇）
    await router.push('/project/carbon-brain')
    expect(document.title).toContain('Carbon Brain')
  })
})

describe('键盘可达', () => {
  it('页面开头有「跳到主要内容」，且目标 main 存在、能被聚焦', async () => {
    const { w } = await mountApp()

    const skip = w.find('.skip-link')
    expect(skip.exists()).toBe(true)
    expect(skip.attributes('href')).toBe('#main')

    const main = w.find('main#main')
    expect(main.exists()).toBe(true)
    expect(main.attributes('tabindex')).toBe('-1')
  })

  it('点「跳到主要内容」不会把路由带偏（hash 路由的坑）', async () => {
    const { w, router: r } = await mountApp()
    await r.push('/about')
    expect(r.currentRoute.value.path).toBe('/about')

    await w.find('.skip-link').trigger('click')

    // 普通链接跳 #main 会让路由以为要切到 /main，这里必须是原页面不动
    expect(r.currentRoute.value.path).toBe('/about')
    expect(document.activeElement).toBe(w.find('main#main').element)
  })

  it('移动端菜单按钮告诉读屏软件「现在是开着还是关着」', async () => {
    const { w } = await mountApp()

    const btn = w.find('.nav-toggle')
    expect(btn.attributes('aria-expanded')).toBe('false')
    expect(btn.attributes('type')).toBe('button')
    // aria-controls 指向的容器必须真的存在
    const controlled = btn.attributes('aria-controls')
    expect(w.find(`#${controlled}`).exists()).toBe(true)

    await btn.trigger('click')
    expect(btn.attributes('aria-expanded')).toBe('true')
  })

  it('导航当前项用 aria-current 标出来（不只靠颜色）', async () => {
    const { w, router: r } = await mountApp()
    await r.push('/about')
    await w.vm.$nextTick()

    const marked = w.findAll('[aria-current="page"]')
    expect(marked.length).toBe(1)
    expect(marked[0].text()).toBe('关于')
  })

  it('项目图用按钮包着，键盘能打开大图、按 Esc 能关掉', async () => {
    const r = createRouter({ history: createWebHashHistory(), routes })
    r.push('/project/weiguan-yifang')
    await r.isReady()

    document.body.innerHTML = ''
    const w = mount(ProjectDetailView, {
      attachTo: document.body,
      global: {
        plugins: [r],
        directives: { reveal, 'reveal-stagger': revealStagger },
        stubs: { FeedbackWidget: true },
      },
    })

    const btn = w.find('.gallery-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.element.tagName).toBe('BUTTON') // 不是只有 @click 的 <figure>
    expect(btn.attributes('aria-label')).toContain('放大查看')

    await btn.trigger('click')
    expect(w.find('.lightbox').exists()).toBe(true)
    expect(document.activeElement).toBe(w.find('.lightbox-close').element)

    // 按 Esc 关闭，并把焦点还给刚才那张图
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await w.vm.$nextTick()
    expect(w.find('.lightbox').exists()).toBe(false)
    expect(document.activeElement).toBe(btn.element)
  })

  it('全局样式给键盘焦点画了可见外框', () => {
    const css = fs.readFileSync(path.join(root, 'src/style.css'), 'utf8')
    expect(css).toContain(':focus-visible')
    expect(css).toContain('.skip-link')
  })

  it('只有读屏能看到的小字提示写在全局样式里（各组件不用各写一遍）', () => {
    const css = fs.readFileSync(path.join(root, 'src/style.css'), 'utf8')
    expect(css).toContain('.sr-only')
  })
})

describe('找不到的地址', () => {
  it('走错地址进的是「页面不存在」，而不是被悄悄送回首页', () => {
    const resolved = router.resolve('/this-page-does-not-exist')
    expect(resolved.name).toBe('not-found')
    expect(resolved.meta.title).toBe('页面不存在')

    // 光看路由名字不够：把兜底改成 redirect:'/' 时名字还是 not-found，但页面已经不会渲染了。
    // 所以要确认这条规则真的挂着一个组件，而不是一个「转头跳走」的重定向。
    expect(resolved.matched.length).toBe(1)
    expect(resolved.matched[0].components?.default).toBeTruthy()

    const record = routes.find((r) => r.name === 'not-found')
    expect(record.redirect, '兜底路由不能改成重定向').toBeUndefined()
    expect(record.component).toBeTruthy()
  })

  it('404 页面会回显用户输错的地址，并给出回去的路', async () => {
    const r = createRouter({ history: createWebHashHistory(), routes })
    r.push('/no-such-page')
    await r.isReady()

    const NotFound = (await import('../src/views/NotFoundView.vue')).default
    const w = mount(NotFound, { attachTo: document.body, global: { plugins: [r] } })

    expect(w.text()).toContain('这个页面不存在')
    expect(w.text()).toContain('/no-such-page')
    expect(w.findAll('a').length).toBeGreaterThanOrEqual(3)
  })

  it('项目 id 不存在时也进同一个「页面不存在」页，并且标签页标题跟着改', async () => {
    const r = createRouter({ history: createWebHashHistory(), routes })
    r.push('/project/cc' + 'switch') // 已撤下、不再展示的项目，旧链接会走到这里
    await r.isReady()

    document.body.innerHTML = ''
    const w = mount(ProjectDetailView, {
      attachTo: document.body,
      global: {
        plugins: [r],
        directives: { reveal, 'reveal-stagger': revealStagger },
        stubs: { FeedbackWidget: true },
      },
    })
    await w.vm.$nextTick()

    // 不能是一个没有标题的空壳：要真的渲染出 404 页面，并且给一个说得清的标题
    expect(w.text()).toContain('这个页面不存在')
    expect(w.find('h1').text()).toBe('这个页面不存在')
    expect(document.title).toContain('页面不存在')
    expect(document.title).not.toContain('项目详情')
  })
})

describe('搜索引擎与社交分享（静态文件）', () => {
  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8')

  it('index.html 带齐分享卡片标签', () => {
    for (const tag of [
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'twitter:card',
      'rel="canonical"',
      'name="description"',
    ]) {
      expect(indexHtml, `index.html 缺 ${tag}`).toContain(tag)
    }
  })

  it('robots.txt 与 sitemap.xml 都在，且指向同一个正式地址', () => {
    const robots = fs.readFileSync(path.join(publicDir, 'robots.txt'), 'utf8')
    const sitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8')

    expect(robots).toContain('Sitemap:')
    expect(robots).toContain(SITE_URL)
    expect(sitemap).toContain(`<loc>${SITE_URL}</loc>`)
    // 三处地址必须一致：改域名时最容易漏改其中一个
    expect(indexHtml).toContain(SITE_URL)
    expect(fs.readFileSync(path.join(root, 'src/data/meta.js'), 'utf8')).toContain(SITE_URL)
  })

  it('sitemap 里的每条地址都排在正式站点下（不会写出本地地址）', () => {
    const sitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8')
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    expect(locs.length).toBeGreaterThan(0)
    for (const loc of locs) {
      expect(loc.startsWith('https://')).toBe(true)
      expect(loc).not.toContain('localhost')
      expect(loc).not.toContain('127.0.0.1')
    }
  })

  it('手输错路径时有兜底页，且兜底页能自己回到主页', () => {
    const html = fs.readFileSync(path.join(publicDir, '404.html'), 'utf8')
    expect(html).toContain('/homepage/')
    expect(html).toContain('<a href="/homepage/">') // 脚本失效时的兜底链接
    expect(html).toContain('http-equiv="refresh"')
  })
})

describe('图片不会造成页面跳动', () => {
  it('全局样式里图片高度是自适应的（否则加宽高属性反而会压扁图片）', () => {
    const css = fs.readFileSync(path.join(root, 'src/style.css'), 'utf8')
    expect(css).toMatch(/img\s*\{[^}]*height:\s*auto/)
  })
})
