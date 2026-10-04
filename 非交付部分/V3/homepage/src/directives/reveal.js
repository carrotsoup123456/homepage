// 全局自定义指令 v-reveal：元素进入视口时添加 .revealed 类实现渐入。
// 手机端例外：进入页面即全部显示（v6.34 用户反馈：下方内容要下滑/点按才出现）。
const skipReveal =
  (typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(max-width: 768px)').matches) ||
  (typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches)

const observer = typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
  : null

export default {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (skipReveal) {
      el.classList.add('revealed') // 手机端：直接显示，不等滚动
      return
    }
    // 支持自定义延迟
    if (binding.value) {
      el.style.transitionDelay = `${binding.value}ms`
    }
    if (observer) {
      observer.observe(el)
    } else {
      el.classList.add('revealed')
    }
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  },
}

// v-reveal-stagger：容器进入视口后，其子元素按顺序错峰渐入
// 用法：v-reveal-stagger 或 v-reveal-stagger="{ step: 120 }"
export const revealStagger = {
  mounted(el, binding) {
    const step = (binding.value && binding.value.step) || 90
    const children = Array.from(el.children)
    children.forEach((child, i) => {
      child.classList.add('reveal')
      child.style.transitionDelay = `${i * step}ms`
    })

    const revealAll = () =>
      children.forEach((child) => child.classList.add('revealed'))

    if (skipReveal || typeof IntersectionObserver === 'undefined') {
      revealAll()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealAll()
            io.disconnect()
          }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    el._revealIO = io
  },
  unmounted(el) {
    if (el._revealIO) el._revealIO.disconnect()
  },
}
