// 读取 public/ 下所有图片的真实像素尺寸，生成 src/data/image-sizes.js
// 目的：给 <img> 提供 width/height，让浏览器在图片下载完成前就知道宽高比，避免布局跳动（CLS）。
// 零依赖：手动解析 PNG / JPEG / SVG 的文件头。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const outFile = path.join(root, 'src/data/image-sizes.js')

// ---- PNG：宽高在 IHDR 里，字节固定在第 16-24 位 ----
function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
}

// ---- JPEG：需要逐段扫描，遇到 SOFn 段（C0-CF，排除 C4/C8/CC）即为尺寸 ----
function jpegSize(buf) {
  let i = 2 // 跳过 FFD8
  while (i < buf.length - 1) {
    if (buf[i] !== 0xff) { i++; continue }
    const marker = buf[i + 1]
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue }
    const len = buf.readUInt16BE(i + 2)
    const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
    if (isSOF) return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) }
    i += 2 + len
  }
  throw new Error('找不到 JPEG 的 SOF 段')
}

// ---- SVG：优先用 width/height，只有 viewBox 时退回 viewBox ----
function svgSize(text) {
  const w = text.match(/\bwidth\s*=\s*"([\d.]+)/)
  const h = text.match(/\bheight\s*=\s*"([\d.]+)/)
  const vb = text.match(/\bviewBox\s*=\s*"([^"]+)"/)
  if (w && h) return { w: Number(w[1]), h: Number(h[1]) }
  if (vb) {
    const p = vb[1].trim().split(/[\s,]+/).map(Number)
    if (p.length === 4) return { w: p[2], h: p[3] }
  }
  return { w: 0, h: 0 }
}

function size(absPath) {
  const ext = path.extname(absPath).toLowerCase()
  if (ext === '.svg') return svgSize(fs.readFileSync(absPath, 'utf8'))
  const buf = fs.readFileSync(absPath)
  if (ext === '.png') return pngSize(buf)
  if (ext === '.jpg' || ext === '.jpeg') return jpegSize(buf)
  throw new Error('不支持的格式: ' + ext)
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name)
    if (e.isDirectory()) walk(abs, out)
    else if (/\.(png|jpe?g|svg)$/i.test(e.name)) out.push(abs)
  }
  return out
}

const sizes = {}
for (const abs of walk(publicDir).sort()) {
  const key = path.relative(publicDir, abs).split(path.sep).join('/')
  const { w, h } = size(abs)
  sizes[key] = { w, h }
}

const body = `// 本文件由 scripts/gen-image-sizes.mjs 自动生成，请勿手改。
// 用途：给 <img> 提供 width/height，让浏览器提前知道宽高比，避免图片加载造成的布局跳动（CLS）。
// 重新生成： node scripts/gen-image-sizes.mjs
export const imageSizes = ${JSON.stringify(sizes, null, 2)}

/**
 * 取某个图片路径的宽高。
 * 线上地址会多一级 base 前缀（/homepage/avatar.jpg），本地开发时没有（/avatar.jpg），
 * 两种写法都要能查到同一张图。
 * 查不到时返回空对象，组件退化为不输出 width/height —— 不会渲染出错。
 */
export function imgSize(src) {
  if (!src) return {}
  const clean = String(src)
    .replace(/^https?:\\/\\/[^/]+/, '') // 去掉域名
    .split('?')[0]
    .replace(/^\\//, '') // 去掉开头的斜杠

  // 依次尝试「原样」和「去掉第一段」。不能总是去掉第一段：
  // /experience/band-1.jpg 的第一段是真实目录名，去掉就查不到了。
  const hit = imageSizes[clean] || imageSizes[clean.replace(/^[^/]+\\//, '')]
  return hit ? { width: hit.w, height: hit.h } : {}
}
`
fs.writeFileSync(outFile, body)
console.log(`已写入 ${path.relative(root, outFile)}，共 ${Object.keys(sizes).length} 张图`)
for (const [k, v] of Object.entries(sizes)) console.log(`  ${k}  ${v.w}x${v.h}`)
