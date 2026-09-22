// ======================================================
// 知识库内容管线
// ------------------------------------------------------
// 数据来源：src/content/notes/*.md（纯文本 Markdown）
// 每个 md 文件头部有一段 frontmatter：
//
//   ---
//   title: 标题
//   date: 2026-09-20
//   tags: [前端, Vue]
//   summary: 一句话摘要
//   ---
//   正文（Markdown）
//
// 加载方式：Vite 的 import.meta.glob 在「构建时」把文件内容打包进来，
// 因此新增笔记 = 往 src/content/notes/ 丢一个 .md 文件，无需改任何代码。
// 这也是本课程 5%「最终扩展：知识库」的核心实现。
// ======================================================

// eager: true → 构建时一次性读入全部文本
// query: '?raw' → 拿到原始字符串（而不是当作模块执行）
const modules = import.meta.glob('../content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/**
 * 解析 frontmatter（只支持本文件约定用到的简单语法）。
 * 支持：`key: value`、`key: [a, b]`、`key: "带:冒号的值"`
 */
function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, '')
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)

  if (!match) {
    return { data: {}, body: text.trim() }
  }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const idx = trimmed.indexOf(':')
    if (idx === -1) continue

    const key = trimmed.slice(0, idx).trim()
    let value = trimmed.slice(idx + 1).trim()

    // 去掉包裹引号
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    // [a, b, c] → 数组
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      data[key] = value
    }
  }

  return { data, body: text.slice(match[0].length).trim() }
}

/** 粗算阅读时长：按中文 350 字/分钟估算 */
function estimateMinutes(body) {
  const chars = body.replace(/\s/g, '').length
  return Math.max(1, Math.round(chars / 350))
}

/** 取正文摘要：优先用 frontmatter 的 summary，否则截正文前 70 字 */
function fallbackSummary(body, title) {
  const plain = body
    .replace(/```[\s\S]*?```/g, ' ') // 去代码块
    .replace(/[#>*`\-|[\]()]/g, ' ') // 去 Markdown 记号
    .replace(/\s+/g, ' ')
    .trim()
  return plain.length > 70 ? `${plain.slice(0, 70)}…` : plain || title
}

/** 从文件路径取 id：'../content/notes/vue-basics.md' → 'vue-basics' */
function idFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

export const notes = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    const id = idFromPath(path)
    const title = data.title || id
    const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : []

    return {
      id,
      title,
      date: data.date || '',
      tags,
      summary: data.summary || fallbackSummary(body, title),
      body,
      minutes: estimateMinutes(body),
    }
  })
  // 按日期倒序（新的在前）；日期缺失的排最后
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

/** 全部标签（去重，按出现频次倒序） */
export const allTags = (() => {
  const freq = new Map()
  for (const n of notes) {
    for (const t of n.tags) freq.set(t, (freq.get(t) || 0) + 1)
  }
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t)
})()

/**
 * 按关键词 + 标签检索。
 * @param {string} keyword 关键词（空字符串表示不过滤）
 * @param {string} tag     标签（'全部' 或空表示不过滤）
 */
export function searchNotes(keyword = '', tag = '全部') {
  const kw = keyword.trim().toLowerCase()

  return notes.filter((n) => {
    const tagOk = !tag || tag === '全部' || n.tags.includes(tag)
    if (!tagOk) return false
    if (!kw) return true

    return [n.title, n.summary, n.body, n.tags.join(' ')]
      .join('\n')
      .toLowerCase()
      .includes(kw)
  })
}
