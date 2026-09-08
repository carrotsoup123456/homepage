// ======================================================
// 全站数据源（V2）
// 所有页面组件共用这一份数据，修改这里即可全站更新。
// 包含：站点信息、技能、项目（含详情）、经历（含图片）、教育、联系、知识库笔记。
// ======================================================

// 资源 base 前缀：兼容本地 dev('/') 与 GitHub Pages('/homepage/')
// import.meta.env.BASE_URL 与 vite.config.js 的 base 保持一致
const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

// ---- 站点信息 ----
export const site = {
  name: '刘博康',
  tagline: '计算机科学与技术学生',
  bio: '你好！我是一名计算机科学与技术的大一新生，兴趣广泛，包括但不限于研究股票、架子鼓演奏、阅读。',
  avatar: asset('avatar.jpg'),
}

// ---- 技能 ----
export const skills = [
  'Python',
  'AI 工具应用能力',
  '架子鼓（10 级）',
  '工程实践能力',
]

// ---- 项目 ----
// 每个项目带完整详情字段，供首页卡片 + 详情页共用
export const projects = [
  {
    id: 'carbon-brain',
    icon: '🧠',
    title: 'Carbon Brain',
    short: '机器学习预测 Polyam-N-Cu<sup>2+</sup> DAC 饱和度',
    desc: '使用机器学习预测 Polyam-N-Cu<sup>2+</sup> DAC 材料的饱和度，并让装置在「吸附」与「再生」两种模式间自动切换，确保持续不断的吸附功能。',
    tech: '机器学习',
    role: '项目组长',
    images: [
      { src: asset('projects/carbon-brain/team.jpg'), alt: 'Carbon Brain 项目团队合影' },
    ],
    long: `使用监督学习模型对 **Polyam-N-Cu<sup>2+</sup> DAC**（双胺基铜位点材料）的吸附饱和度进行预测。系统根据预测结果自动在「吸附模式」与「再生模式」间切换，使材料持续保持高效的吸附能力。

### 我的职责
- 作为 **项目组长** 统筹整体进度与分工
- 负责数据清洗、特征工程与模型选型
- 设计「自动切换」逻辑并参与装置联调`,
    highlights: ['机器学习 预测', '自动模式切换', '连续吸附'],
  },
  {
    id: 'stock-quant',
    icon: '📈',
    title: '基于监督学习的股票量化软件',
    short: '监督学习模型预测股市走向',
    desc: '通过机器学习中的监督学习模型预测股市走向，并实时给出预测结果。',
    tech: 'LightGBM',
    role: '个人项目负责人',
    images: [
      { src: asset('projects/stock/backtest.png'), alt: 'ML 量化回测：策略总收益 112.74%' },
      { src: asset('projects/stock/paper.png'), alt: '模拟盘持仓界面' },
    ],
    long: `基于 **LightGBM** 等监督学习算法构建量化模型，对股票市场的短期走势进行预测，并以可视化方式实时输出预测结果。

### 我的职责
- 独立完成 **个人项目**
- 数据获取、特征构建与模型训练
- 预测结果展示与交互界面设计`,
    highlights: ['LightGBM', '量化交易', '实时预测'],
  },
]

// ---- 经历（含图片，图片放 public/experience/）----
export const experiences = [
  {
    period: '高中阶段',
    org: '中山市中山纪念中学 校管乐团 / 弦乐团',
    role: '架子鼓手',
    desc: '担任校管乐团与弦乐团鼓手，在校期间多次参与展演活动（图1、2、3）。带队参加中山市第六届中小学生艺术展演活动管（弦）乐比赛，校管乐团《La La Land》获三等奖、弦乐团《il vento d\u2019 oro》获二等奖（图4、5）。',
    images: [
      { src: asset('experience/band-1.jpg'), alt: '架子鼓展演' },
      { src: asset('experience/band-2.jpg'), alt: '校管弦乐团演出' },
      { src: asset('experience/band-3.jpg'), alt: '舞台演出' },
      { src: asset('experience/award-2.jpg'), alt: '二等奖获奖证书' },
      { src: asset('experience/award-3.jpg'), alt: '三等奖获奖证书' },
    ],
  },
  {
    period: '高中阶段',
    org: '多校联办青年商赛',
    role: '组长',
    desc: '参与多校联办的青年商赛并担任组长，带领队伍获得比赛二等奖（图6）。',
    images: [
      { src: asset('experience/business.jpg'), alt: '青年商赛现场' },
    ],
  },
  {
    period: '高中阶段',
    org: '第六届星云模拟联合国大会',
    role: '德意志联邦共和国代表',
    desc: '参加第六届星云模拟联合国大会—2015 叙利亚局势会议，担任德意志联邦共和国代表（图7）；签署多份对德贸易合作，带领欧盟建立难民工厂项目，妥善安置叙利亚难民。',
    images: [
      { src: asset('experience/mun.jpg'), alt: '模拟联合国代表胸牌' },
    ],
  },
]

// ---- 教育 ----
export const education = [
  {
    school: '天津大学深圳学院',
    major: '计算机科学与技术',
    period: '2026.09 - 至今',
    desc: '本科在读，计算机科学与技术专业。',
  },
  {
    school: '中山市中山纪念中学',
    major: '初中 / 高中',
    period: '2020.09 - 2026.06',
    desc: '初中、高中就读；期间任校管乐团与弦乐团鼓手。',
  },
]

// ---- 联系 ----
export const contacts = [
  { icon: '📧', label: 'carrotsoup@qq.com', href: 'mailto:carrotsoup@qq.com' },
  { icon: '📞', label: '电话 / 微信 / QQ：13420089540', href: 'tel:13420089540' },
]

// ---- 知识库 / 笔记（示例占位，可替换为真实内容）----
export const notes = [
  {
    id: 'note-1',
    title: 'Vue 3 组合式 API 学习笔记',
    tag: '前端',
    date: '2026-09-05',
    tags: ['Vue', 'Composition API'],
    markdown: `# Vue 3 组合式 API

组合式 API 把**响应式逻辑**组织在同一处，便于复用。

\`\`\`js
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
\`\`\`

> 核心思想：以「逻辑关注点」而非「选项」来组织代码。`,
  },
  {
    id: 'note-2',
    title: '机器学习入门：监督学习 vs 无监督',
    tag: 'AI',
    date: '2026-09-04',
    tags: ['机器学习', '基础'],
    markdown: `# 监督学习 vs 无监督学习

- **监督学习**：带标签数据，学习「输入 → 输出」映射（分类、回归）。
- **无监督学习**：无标签，发掘数据内在结构（聚类、降维）。

本项目 i 使用的股票量化模型属于**监督学习**。`,
  },
  {
    id: 'note-3',
    title: '项目制学习：从想法到原型',
    tag: '方法论',
    date: '2026-09-03',
    tags: ['方法论', '项目'],
    markdown: `# 从想法到可运行原型

把大目标拆成小迭代：需求 → 最小可用版本（MVP）→ 迭代反馈。

关键：**先跑起来，再打磨**，并记录过程中的决策与改进。`,
  },
]
