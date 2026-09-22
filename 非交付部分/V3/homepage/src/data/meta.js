// 页面级元信息：标题 + 描述 + 分享卡片标签
//
// 为什么要单独写一个模块：
// 1) 单页应用切换「页面」时浏览器不会重新加载 HTML，<title> 不会自己变，
//    读屏软件和浏览器历史都只能看到一个标题 —— 所以每次切路由要手动改（WCAG 2.4.2）。
// 2) 分享到微信 / 群聊时显示的标题与描述由 <head> 里的 og: / twitter: 标签决定，
//    这些标签同样需要跟着页面走。

export const SITE_NAME = '刘博康'
export const SITE_URL = 'https://carrotsoup123456.github.io/homepage/'
export const DEFAULT_TITLE = '刘博康 – 个人主页'
export const DEFAULT_DESC = '刘博康的个人主页 · 计算机科学与技术 · 项目、知识库与联系方式'

// 某个路径对应的完整可分享地址（本站在 GitHub Pages 子路径下，且用的是 hash 路由）
export function urlFor(path = '/') {
  const clean = path.replace(/^\//, '')
  return clean ? `${SITE_URL}#/${clean}` : SITE_URL
}

// <head> 里没有就建、有就改，避免每次切换页面重复插入标签
function upsert(selector, attrs) {
  if (typeof document === 'undefined') return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
  return el
}

/**
 * 写入当前页面的标题与分享信息。
 * @param {{title?: string, desc?: string, path?: string}} opts
 *        title 传页面名即可（会自动拼上站点名）；传空则用默认标题。
 */
export function setPageMeta({ title, desc, path } = {}) {
  if (typeof document === 'undefined') return
  const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE
  const description = desc || DEFAULT_DESC
  const url = urlFor(path)

  document.title = fullTitle

  upsert('meta[name="description"]', { name: 'description', content: description })
  upsert('link[rel="canonical"]', { rel: 'canonical', href: url })

  // Open Graph（微信 / QQ / Facebook 等使用）
  upsert('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
  upsert('meta[property="og:description"]', {
    property: 'og:description',
    content: description,
  })
  upsert('meta[property="og:url"]', { property: 'og:url', content: url })

  // Twitter / X 卡片
  upsert('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
  upsert('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: description,
  })
}
