---
title: Vue 3 组合式 API：为什么逻辑要按「关注点」组织
date: 2026-09-18
tags: [前端, Vue]
summary: 从「选项式」到「组合式」，把同一件事的代码放在一起，而不是按 data / methods / computed 拆散。
---

# Vue 3 组合式 API

## 一句话理解

**选项式 API** 是按「代码类型」分格子：数据放 `data`、方法放 `methods`、计算放 `computed`。
**组合式 API** 是按「业务关注点」分格子：同一个功能相关的数据、方法、计算放在同一块。

页面一复杂，第一种写法会让人在上百行里来回跳；第二种写法则像「把同一件事装进一个盒子」。

## 三个最常用的东西

```js
import { ref, computed, onMounted } from 'vue'

const count = ref(0) // 响应式的基本单元
const doubled = computed(() => count.value * 2) // 派生出来的值

onMounted(() => console.log('组件挂载完成'))
```

- `ref`：包一个值，读写要 `.value`（模板里会自动解包）。
- `computed`：依赖变化时自动重算，并且有缓存。
- `onMounted` 等生命周期钩子：直接当函数调用，不用再记 `mounted() {}` 选项名。

## 我在个人主页里的实际用法

主题切换是典型的「一个关注点」——把它整块放进 `App.vue`：

```js
const theme = ref(localStorage.getItem('homepage-theme') || 'light')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
}

provide('theme', theme)
provide('toggleTheme', toggleTheme)
```

子组件（顶部导航栏）用 `inject` 取用，不用一层层传 props：

```js
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')
```

## 遇到的一个坑

`provide` 的值如果是 `ref`，`inject` 拿到的也是 `ref`，在 JS 里必须写 `theme.value`。
但在 `<template>` 里可以直接写 `theme`，Vue 会自动解包——这两处行为不一样，容易看错。

## 一句话总结

组合式 API 不是「新语法」，而是**换了一种组织代码的思路：按事分块，而不是按类型分块**。
