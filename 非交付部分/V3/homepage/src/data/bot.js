// ======================================================
// 数字分身匹配引擎（纯函数，无 DOM 依赖，可单测）
// ------------------------------------------------------
// 设计目标：让访客「换个说法也能被听懂」——
// 1. 归一化：忽略大小写、空格、标点
// 2. 同义词：条目可配 also 词表，与 keys 同等参与匹配
// 3. 错别字容错：≥4 字的关键词允许 1 字不同（汉明距离 ≤1）
// 4. 不确定时不硬答：弱命中走「你是想问 X 吗？」（did-you-mean）
// 5. 兜底不冷场：没命中时按字符重叠度挑最接近的 3 条候选
// 6. 会接话：项目列表语境下支持「第二个 / 下一个」序数追问
// ======================================================

// 归一化：小写、去空白、去常见中英文标点
export function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\s　]+/g, '')
    .replace(/[，。！？、；：""''（）【】《》〈〉…—·~,.!?;:'"()<>[\]{}@#$%^&*+=|/\\-]/g, '')
}

// 一个条目参与匹配的全部词（keys + 同义词 also）
export function entryTerms(entry) {
  return [...(entry.keys || []), ...(entry.also || [])]
}

// 在 t 中滑动等长窗口，判断是否存在与 key 汉明距离 ≤ maxDist 的片段
function hammingAtMost(t, key, maxDist) {
  const n = key.length
  if (t.length < n) return false
  for (let i = 0; i <= t.length - n; i++) {
    let d = 0
    for (let j = 0; j < n; j++) {
      if (t[i + j] !== key[j]) {
        d++
        if (d > maxDist) break
      }
    }
    if (d <= maxDist) return true
  }
  return false
}

// 单条打分：完整命中 >> 错别字容错 > 前缀弱信号
export function scoreEntry(t, entry) {
  let score = 0
  for (const raw of entryTerms(entry)) {
    const key = normalize(raw)
    if (!key) continue
    if (t.includes(key)) {
      score += key.length * 2 // 完整命中，词越长越具体
    } else if (key.length >= 4 && hammingAtMost(t, key, 1)) {
      score += key.length // 错别字容错：只放行 ≥4 字的词，避免短词乱命中
    } else if (t.length >= 2 && key.length >= 3 && key.includes(t)) {
      score += t.length * 0.5 // 输入是关键词的一部分（弱信号，进 did-you-mean 区）
    }
  }
  return score
}

// 序数追问：「第二个 / 第2个 / 下一个 / 再下一个 / 上一个」
// 返回 0-4 的序号，或 'next' / 'prev'；不匹配返回 null
export function matchOrdinal(t) {
  const m = t.match(/^第?([一二三四五1-5])(个|项|条|篇)?/)
  if (m) {
    const map = { 一: 0, 二: 1, 三: 2, 四: 3, 五: 4, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 }
    return map[m[1]]
  }
  if (/^(下一个|再下一个|下个|然后呢|还有呢|继续)/.test(t)) return 'next'
  if (/^上一个/.test(t)) return 'prev'
  return null
}

// 常见疑问词：算兜底候选前去掉，避免「怎么/什么」这类万能词污染相关度
const STOPWORDS = ['怎么', '什么', '为什么', '请问', '一下', '可以', '能不能', '有没有', '是不是', '的', '了', '吗', '呢', '吧', '啊']
export function stripStopwords(t) {
  let s = t
  for (const w of STOPWORDS) s = s.split(w).join('')
  return s
}

// 兜底候选：输入（去停用词）与条目词表的 2-gram（两字片段）重叠度，挑最接近的 n 条
function bigramScore(t, entry) {
  if (t.length < 2) return 0
  const hay = entryTerms(entry).map(normalize).join('')
  let s = 0
  for (let i = 0; i < t.length - 1; i++) {
    if (hay.includes(t.slice(i, i + 2))) s++
  }
  return s
}

export function pickCandidates(t, lib, n = 3) {
  const core = stripStopwords(t)
  return lib
    .map((e) => ({ e, s: bigramScore(core, e) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.e)
}

// 主入口：给一句输入，决定分身怎么接
// context：{ type?: 'projects', idx?: number, projectIds?: string[] }
// 返回 { kind: 'empty' | 'answer' | 'did-you-mean' | 'fallback', ... }
export function match(text, lib, context = {}) {
  const t = normalize(text)
  if (!t) return { kind: 'empty' }

  // ---- 序数追问（仅在项目列表语境下生效）----
  const ord = matchOrdinal(t)
  if (ord !== null) {
    if (context.type === 'projects' && Array.isArray(context.projectIds)) {
      const ids = context.projectIds
      const idx =
        ord === 'next' ? (context.idx ?? 0) + 1 : ord === 'prev' ? (context.idx ?? 0) - 1 : ord
      if (idx >= 0 && idx < ids.length) {
        const entry = lib.find((e) => e.id === ids[idx])
        if (entry) {
          return {
            kind: 'answer',
            entry,
            contextUpdate: { type: 'projects', idx },
          }
        }
      }
      // 越界（如「第六个」）：老实说没有了
      return { kind: 'out-of-range', total: ids.length }
    }
    // 非项目语境的序数：落到常规流程（通常没命中 → 兜底）
  }

  // ---- 常规打分 ----
  let best = null
  let bestScore = 0
  let second = null
  let secondScore = 0
  for (const entry of lib) {
    const s = scoreEntry(t, entry)
    if (s > bestScore) {
      second = best
      secondScore = bestScore
      best = entry
      bestScore = s
    } else if (s > secondScore) {
      second = entry
      secondScore = s
    }
  }

  if (bestScore >= 4) {
    const out = { kind: 'answer', entry: best }
    // 多意图：另一条也强命中，作为「你可能还想问」带出去
    if (second && secondScore >= 4 && second.id !== best.id) out.also = second
    out.contextUpdate =
      best.context === 'projects' ? { type: 'projects', idx: 0 } : { type: 'topic' }
    return out
  }
  if (bestScore >= 2 && best) {
    return { kind: 'did-you-mean', candidates: [best, second].filter(Boolean) }
  }
  return { kind: 'fallback', candidates: pickCandidates(t, lib) }
}
