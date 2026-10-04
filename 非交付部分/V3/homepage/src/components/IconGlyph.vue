<script setup>
// 全站统一的手绘线条图标：与 SiteHeader 的导航图标同套气质——
// 24 网格、1.8px 圆头线条、fill none、currentColor 随文字变色。
// 数据层（site.js 的 project.icon / contacts.icon、AboutView 的 nowList.icon）
// 存的是名字字符串（如 'carrot'），渲染处统一用 <IconGlyph :name="..."/>。
// 尺寸按 1em 继承父级字号：now-icon(1.6rem) / work-icon(1.4rem) /
// detail-icon(3rem) / 联系人链接 自动适配，无需各自写宽高。
const props = defineProps({
  name: { type: String, required: true },
})

const glyphs = {
  // 胡萝卜（carrot 项目本命）
  carrot: [
    'M12 8 C11 5.5 9.5 4.5 7.5 4',
    'M12 8 C12 5 12 3.5 12 2.5',
    'M12 8 C13 5.5 14.5 4.5 16.5 4',
    'M12 8 C9 8 7.5 11 7.8 15 L12 20.5 L16.2 15 C16.5 11 15 8 12 8 Z',
    'M9.6 13 C10.8 13.6 13.2 13.6 14.4 13',
    'M9 16 C10.6 16.6 13.4 16.6 15 16',
  ],
  // 大脑（Carbon Brain）
  brain: [
    'M9 4.5 H14.5 C18.5 4.5 20.5 7.5 20.5 11 C20.5 15 17.5 19.5 12 19.5 C6.5 19.5 3.5 15 3.5 11 C3.5 7.5 5.5 4.5 9 4.5 Z',
    'M12 5.5 V19',
    'M7.5 9.5 C9 10.5 11 10.5 12 9.5',
    'M7.5 13 C9 14 11 14 12 13',
    'M16.5 9.5 C15 10.5 13 10.5 12 9.5',
    'M16.5 13 C15 14 13 14 12 13',
  ],
  // 折线上升（股票量化）
  chart: [
    'M4 4 V20 H20',
    'M7 15.5 L11 10.5 L14 13 L19 6',
    'M7 15.5 V17.5 M11 10.5 V12.5 M14 13 V15 M19 6 V8',
  ],
  // 城楼（《为官一方》古风县令）
  castle: [
    'M4 20 V9 H20 V20',
    'M8 9 V4.5 H11 V7.5 H13 V4.5 H16 V9',
    'M10.5 20 V15 H13.5 V20',
  ],
  // 定位图钉（TO-DO Panel）
  pin: [
    'M12 3 C15.2 3 17.5 5.5 17.5 9 C17.5 13.5 12 20.5 12 20.5 C12 20.5 6.5 13.5 6.5 9 C6.5 5.5 8.8 3 12 3 Z',
    'M12 11.5 A2.5 2.5 0 1 0 12 6.5 A2.5 2.5 0 1 0 12 11.5 Z',
  ],
  // 信封（邮箱，与 SiteHeader 同款）
  mail: ['M4 6.5 H20 V17.5 H4 Z', 'M4.5 8 L12 13.5 L19.5 8'],
  // 手机（电话 / 微信 / QQ）
  phone: [
    'M7 3 H17 A2 2 0 0 1 19 5 V19 A2 2 0 0 1 17 21 H7 A2 2 0 0 1 5 19 V5 A2 2 0 0 1 7 3 Z',
    'M9.5 6.5 H14.5',
    'M11 18 H13',
  ],
  // 烧瓶（实验室数据）
  flask: [
    'M9 3 H15',
    'M10.5 3 V7.5 L7 13.5 C6.2 15 6 17 8 19 C10 21 14 21 16 19 C18 17 17.8 15 17 13.5 L13.5 7.5 V3',
    'M9.2 15.5 H14.8',
  ],
  // 齿轮（把重复劳动变成流程 / 自动化）
  gear: [
    'M12 8.5 A3.5 3.5 0 1 0 12 15.5 A3.5 3.5 0 1 0 12 8.5 Z',
    'M12 2.5 V4.5 M12 19.5 V21.5 M2.5 12 H4.5 M19.5 12 H21.5',
    'M5.3 5.3 L6.7 6.7 M17.3 17.3 L18.7 18.7 M18.7 5.3 L17.3 6.7 M6.7 17.3 L5.3 18.7',
  ],
}
</script>

<template>
  <svg
    class="icon-glyph"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, i) in glyphs[name] || glyphs.pin" :key="i" :d="d" />
  </svg>
</template>

<style scoped>
.icon-glyph {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  /* 与相邻文字基线对齐：svg 是 inline 元素，默认贴基线会偏高 */
  vertical-align: -0.125em;
}
</style>
