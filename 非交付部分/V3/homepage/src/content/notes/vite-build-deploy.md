---
title: Vite 构建与 GitHub Pages 部署：一条命令背后的四件事
date: 2026-09-17
tags: [前端, 部署, Vite]
summary: npm run build 到底做了什么；为什么部署到 /homepage/ 子路径要改 base；为什么用 hash 路由。
---

# 从源码到线上网页

## `npm run build` 做了什么

```
npm run build
  ↓
dist/index.html      ← 一个几乎空的壳
dist/assets/index-<哈希>.js   ← 全部组件 + 路由 + 业务代码，打包成一个文件
dist/assets/index-<哈希>.css  ← 全部样式，打包成一个文件
dist/<public 里的所有文件>     ← 图片等静态资源原样搬过来
```

三个关键点：

1. **`src/` 下的东西会被编译、合并、压缩**，最后变成带哈希的一两个文件。
2. **`public/` 下的东西不动，原样复制**到 `dist/` 根目录。
3. **文件名里的哈希**由内容算出来。内容一变，哈希就变 → 浏览器的旧缓存自动失效。

## 为什么线上路径要对不上

GitHub Pages 的项目站点地址形如：

```
https://carrotsoup123456.github.io/homepage/
```

注意末尾的 `/homepage/`——网站不在域名根目录，而在一个子目录里。
如果代码里写死 `/assets/xxx.js`，浏览器会去 `.../assets/xxx.js` 找，404。

解决办法是在 `vite.config.js` 里声明前缀：

```js
export default defineConfig({
  base: process.env.VITE_BASE || '/homepage/',
  plugins: [vue()],
})
```

代码里引用 `public/` 资源时，再用 `import.meta.env.BASE_URL` 拼出来：

```js
const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`
```

## 为什么用 hash 路由（地址里的 `#`）

我用的路由模式是 `createWebHashHistory()`，地址长这样：

```
https://carrotsoup123456.github.io/homepage/#/about
```

`#` 后面的内容**浏览器不会发给服务器**。这样做的好处是：

- 服务器永远只被请求 `index.html`，不需要为每个路径都准备一个文件。
- 刷新 `/about` 不会出现 "404 Not Found"。

代价是地址里多了个 `#`，略微不好看。对静态托管来说，这是最省心的选择。

## 部署流程

```bash
npm run build                 # 产出 dist/
git subtree push --prefix dist origin gh-pages
```

把 `dist/` 推到 `gh-pages` 分支，GitHub 就会把它当成网站发布。源码留在 `main` 分支。

## 一句话总结

**构建 = 把上百个源文件压成两个带指纹的文件；部署 = 把 `dist/` 搬到服务器的子目录里，所以路径前缀必须提前声明。**
