// 全局自定义指令 v-reveal：元素进入视口时添加 .revealed 类实现渐入
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
