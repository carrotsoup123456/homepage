// 本文件由 scripts/gen-image-sizes.mjs 自动生成，请勿手改。
// 用途：给 <img> 提供 width/height，让浏览器提前知道宽高比，避免图片加载造成的布局跳动（CLS）。
// 重新生成： node scripts/gen-image-sizes.mjs
export const imageSizes = {
  "art/hero-forest.webp": {
    "w": 1326,
    "h": 944
  },
  "art/moss-macro.webp": {
    "w": 824,
    "h": 944
  },
  "avatar.webp": {
    "w": 828,
    "h": 1242
  },
  "experience/award-2.webp": {
    "w": 480,
    "h": 640
  },
  "experience/award-3.webp": {
    "w": 480,
    "h": 640
  },
  "experience/band-1.webp": {
    "w": 480,
    "h": 320
  },
  "experience/band-2.webp": {
    "w": 480,
    "h": 319
  },
  "experience/band-3.webp": {
    "w": 480,
    "h": 640
  },
  "experience/business.webp": {
    "w": 480,
    "h": 319
  },
  "experience/mun.webp": {
    "w": 480,
    "h": 640
  },
  "favicon.svg": {
    "w": 48,
    "h": 46
  },
  "icons.svg": {
    "w": 16,
    "h": 17
  },
  "projects/carbon-brain/card.webp": {
    "w": 1100,
    "h": 687
  },
  "projects/claude-code/card.webp": {
    "w": 1100,
    "h": 687
  },
  "projects/claude-code/tools.webp": {
    "w": 1200,
    "h": 749
  },
  "projects/claude-code/workspace.webp": {
    "w": 1200,
    "h": 1022
  },
  "projects/stock/backtest.webp": {
    "w": 1200,
    "h": 2062
  },
  "projects/stock/card.webp": {
    "w": 1100,
    "h": 687
  },
  "projects/stock/paper.webp": {
    "w": 1200,
    "h": 1171
  },
  "projects/todo-panel/card.webp": {
    "w": 1100,
    "h": 687
  },
  "projects/todo-panel/home.webp": {
    "w": 1200,
    "h": 772
  },
  "projects/todo-panel/todo.webp": {
    "w": 1200,
    "h": 775
  },
  "projects/weiguan-yifang/bg.webp": {
    "w": 1200,
    "h": 1800
  },
  "projects/weiguan-yifang/card.webp": {
    "w": 1100,
    "h": 687
  },
  "projects/weiguan-yifang/cover.webp": {
    "w": 1200,
    "h": 2508
  },
  "projects/weiguan-yifang/event.webp": {
    "w": 1200,
    "h": 2508
  }
}

/**
 * 取某个图片路径的宽高。
 * 线上地址会多一级 base 前缀（/homepage/avatar.jpg），本地开发时没有（/avatar.jpg），
 * 两种写法都要能查到同一张图。
 * 查不到时返回空对象，组件退化为不输出 width/height —— 不会渲染出错。
 */
export function imgSize(src) {
  if (!src) return {}
  const clean = String(src)
    .replace(/^https?:\/\/[^/]+/, '') // 去掉域名
    .split('?')[0]
    .replace(/^\//, '') // 去掉开头的斜杠

  // 依次尝试「原样」和「去掉第一段」。不能总是去掉第一段：
  // /experience/band-1.jpg 的第一段是真实目录名，去掉就查不到了。
  const hit = imageSizes[clean] || imageSizes[clean.replace(/^[^/]+\//, '')]
  return hit ? { width: hit.w, height: hit.h } : {}
}
