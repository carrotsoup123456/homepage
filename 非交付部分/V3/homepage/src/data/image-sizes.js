// 本文件由 scripts/gen-image-sizes.mjs 自动生成，请勿手改。
// 用途：给 <img> 提供 width/height，让浏览器提前知道宽高比，避免图片加载造成的布局跳动（CLS）。
// 重新生成： node scripts/gen-image-sizes.mjs
export const imageSizes = {
  "art/hero-forest.jpg": {
    "w": 1326,
    "h": 944
  },
  "art/moss-macro.jpg": {
    "w": 824,
    "h": 944
  },
  "avatar.jpg": {
    "w": 1280,
    "h": 1920
  },
  "experience/award-2.jpg": {
    "w": 900,
    "h": 1200
  },
  "experience/award-3.jpg": {
    "w": 750,
    "h": 1000
  },
  "experience/band-1.jpg": {
    "w": 1200,
    "h": 800
  },
  "experience/band-2.jpg": {
    "w": 1200,
    "h": 799
  },
  "experience/band-3.jpg": {
    "w": 900,
    "h": 1200
  },
  "experience/business.jpg": {
    "w": 1200,
    "h": 798
  },
  "experience/mun.jpg": {
    "w": 900,
    "h": 1200
  },
  "favicon.svg": {
    "w": 48,
    "h": 46
  },
  "icons.svg": {
    "w": 16,
    "h": 17
  },
  "projects/carbon-brain/team.jpg": {
    "w": 1706,
    "h": 1279
  },
  "projects/claude-code/skills.jpg": {
    "w": 1500,
    "h": 937
  },
  "projects/claude-code/tools.jpg": {
    "w": 1500,
    "h": 937
  },
  "projects/claude-code/workspace.jpg": {
    "w": 1500,
    "h": 1278
  },
  "projects/stock/backtest.png": {
    "w": 1280,
    "h": 2200
  },
  "projects/stock/paper.png": {
    "w": 1280,
    "h": 1250
  },
  "projects/todo-panel/home.jpg": {
    "w": 1500,
    "h": 965
  },
  "projects/todo-panel/todo.jpg": {
    "w": 1500,
    "h": 969
  },
  "projects/weiguan-yifang/bg.jpg": {
    "w": 1500,
    "h": 2250
  },
  "projects/weiguan-yifang/cover.jpg": {
    "w": 1500,
    "h": 3136
  },
  "projects/weiguan-yifang/event.jpg": {
    "w": 1500,
    "h": 3136
  },
  "projects/weiguan-yifang/icon.png": {
    "w": 512,
    "h": 512
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
