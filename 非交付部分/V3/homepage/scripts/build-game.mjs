#!/usr/bin/env env node
/**
 * 游戏部署版构建脚本
 *
 * 源文件：game-src/weiguan-yifang.html（8.9MB 单文件，内嵌 60 张 base64 JPEG）
 *   —— 这是「可编辑的源」，改游戏剧情/数值/文案直接改它，永远保持可读。
 *
 * 产物：public/play/weiguan-yifang.min.html + public/play/assets-g/*.webp
 *   —— base64 图提取成外部 WebP（ffmpeg 质量 75，体积约 -50%），
 *      文件名用内容 hash：图没改就命中浏览器缓存，改了才换新文件。
 *
 * 用法：npm run build:game（npm run build / npm run dev 会自动先跑这一步）
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'game-src/weiguan-yifang.html')
const OUT_HTML = join(root, 'public/play/weiguan-yifang.min.html')
const ASSET_DIR = join(root, 'public/play/assets-g')
const FFMPEG = process.env.FFMPEG || '/Users/liubokang/.deepworks/tools/ffmpeg'

const html = readFileSync(SRC, 'utf-8')
const srcMB = (html.length / 1048576).toFixed(1)

// ---- 1. 抽出所有 base64 JPEG（PREVIEW_IMGS / START_BG / CSS 背景通用） ----
const RE = /data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/g
const seen = new Map() // base64 -> hash12
mkdirSync(ASSET_DIR, { recursive: true })
const keep = new Set()

let out = html.replace(RE, (_, b64) => {
  const hash = createHash('sha1').update(b64).digest('hex').slice(0, 12)
  const file = `img-${hash}.webp`
  keep.add(file)
  const path = join(ASSET_DIR, file)
  if (!existsSync(path)) {
    // 还没转过：写临时 jpg → ffmpeg 转 WebP q75（视觉近无损，体积约一半）
    const tmpJpg = join(tmpdir(), `bg-${hash}.jpg`)
    writeFileSync(tmpJpg, Buffer.from(b64, 'base64'))
    execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', tmpJpg, '-q:v', '75', path])
    unlinkSync(tmpJpg)
  }
  // 相对路径基于 play/weiguan-yifang.min.html，img.src 与 CSS url() 都适用
  return `assets-g/${file}`
})

// ---- 2. 清理源文件里已不存在的旧图（增量构建不残留垃圾） ----
let removed = 0
for (const f of readdirSync(ASSET_DIR)) {
  if (f.endsWith('.webp') && !keep.has(f)) {
    unlinkSync(join(ASSET_DIR, f))
    removed++
  }
}

writeFileSync(OUT_HTML, out)
const outKB = (Buffer.byteLength(out) / 1024).toFixed(0)
const files = readdirSync(ASSET_DIR).filter((f) => f.endsWith('.webp'))
const webpMB = (files.reduce((s, f) => s + statSync(join(ASSET_DIR, f)).size, 0) / 1048576).toFixed(1)
console.log(`✓ 游戏部署版已生成`)
console.log(`  源文件    ${srcMB} MB（game-src/，改游戏改这个）`)
console.log(`  部署 HTML ${outKB} KB（public/play/weiguan-yifang.min.html）`)
console.log(`  图片      ${files.length} 张 Webp 共 ${webpMB} MB → public/play/assets-g/`)
