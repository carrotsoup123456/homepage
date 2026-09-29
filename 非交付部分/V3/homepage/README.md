# 刘博康 · 个人主页

Vue 3 单页应用：首页、关于、知识库、项目、在线试玩、联系，外加一个「数字分身」聊天机器人。部署在 GitHub Pages。

- **在线访问**：<https://carrotsoup123456.github.io/homepage/>
- **技术栈**：Vue 3（Composition API）· Vite · Vue Router · 手写 CSS 设计令牌系统 · Vitest
- **质量**：81 个单元测试全绿 · WCAG 2.1 AA 对比度全量实测 · 无 UI 组件库等额外运行时依赖（仅 marked 渲染笔记）

## 功能一览

| 栏目 | 说明 |
|---|---|
| 首页 | Hero 视差 + 萤火虫氛围动效、统计计数、技能跑马灯、项目卡片（hover 微倾斜）、经历时间线 |
| 关于 | 技能卡片可展开「我拿它做过什么」+ 可核查证据 |
| 知识库 | 10 篇 Markdown 笔记，站内搜索命中 `<mark>` 高亮 |
| 项目 | 每个项目独立详情页（含《为官一方》策划/架构/数值文档） |
| 试玩 | 站内 iframe 嵌入《为官一方》网页版（详见下方游戏构建链） |
| 联系 | 表单 + 反馈组件（评分三态动效，localStorage 记忆） |
| 数字分身 | 右下角悬浮球，77 条问答匹配、打字机效果、7 个快捷问句（横向滚动 + 箭头按钮） |

全站支持深浅色主题：默认跟随系统深浅色、首帧无闪烁；手动切换后记住选择。动效遵循 `prefers-reduced-motion`。

## 本地开发

```bash
npm install
npm run dev     # 开发服务器（会先构建一次游戏部署版）
npm test        # 81 个 Vitest 单元测试
npm run build   # 产出 dist/（gh-pages 部署用）
```

## 游戏构建链（重要）

试玩页内嵌的《为官一方》是**另一个独立项目**，当前为**草稿版本，持续更新中**（玩法与数值仍在迭代，页面有「草稿版」标记）。

- `game-src/weiguan-yifang.html` — **游戏源文件（8.9MB，改游戏改这个）**：单文件、内嵌 60 张 base64 场景图，保持可读可改。
- `scripts/build-game.mjs` — 构建脚本：抽出内嵌图转 WebP（体积约 -50%），生成轻量部署版。
- `public/play/weiguan-yifang.min.html` + `public/play/assets-g/` — **部署版（构建产物，不入库）**：主文件 8.9MB → 180KB，场景图按需加载。图片文件名用内容 hash，没改过的图直接命中浏览器缓存。

改完游戏后无需手动做任何事：`npm run dev` / `npm run build` 都会自动重新生成部署版。

## 目录结构

```
src/
  App.vue            # 根组件（主题、阅读进度条、路由过渡）
  style.css          # 全局样式 + 深/浅两套设计令牌
  views/             # 7 个页面
  components/        # SiteHeader / SiteFooter / ChatBot / FeedbackWidget
  data/              # 站点内容数据（site.js 等 8 个）
  content/notes/     # 知识库 Markdown 笔记
  directives/        # v-reveal 滚入渐显指令
game-src/            # 游戏源文件（见上）
scripts/             # build-game.mjs / gen-image-sizes.mjs
tests/               # Vitest 测试（7 个文件 81 例）
```

## AI 协作说明（哪些是我做的）

本项目为一门「Vibe Coding」课程的作业，开发方式是**人机结对**：

- **我（刘博康）负责**：需求与内容（个人信息、项目素材、10 篇笔记选题）、每一步的方案决策与取舍、真实使用体验验收、迭代方向（三个版本的复盘见知识库《个人主页迭代复盘》）。
- **AI（DeepWorks）负责**：代码实现、样式细节、测试编写、性能与可访问性实测、部署脚本。所有改动均经我确认后合入，验收记录在 `outputs/课程提交材料/测试与验收记录.md`。
- **第三方内容**：框架脚手架来自 `create-vite`（vue 模板）；游戏场景图为 AI 生成后内嵌。

## 部署

`main` 分支为源码；`gh-pages` 分支为 `npm run build` 产物的镜像，由 GitHub Pages 直接服务。
