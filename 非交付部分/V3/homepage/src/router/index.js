import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import KnowledgeView from '../views/KnowledgeView.vue'
import ContactView from '../views/ContactView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// 路由表。
// meta.title / meta.desc 是这个页面在浏览器标签页与分享卡片上显示的文字；
// 列表页之外的动态页面（项目详情、某篇笔记）会在自己的组件里覆盖成更具体的标题。
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '', // 首页用站点默认标题
      desc: '刘博康的个人主页 · 计算机科学与技术 · 项目、知识库与联系方式',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: '关于我', desc: '刘博康的个人介绍、在做什么、以及我做项目的方式。' },
  },
  {
    path: '/project/:id',
    name: 'project',
    component: ProjectDetailView,
    props: true,
    meta: { title: '项目详情', desc: '项目背景、我负责的部分与运行截图。' },
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    component: KnowledgeView,
    meta: { title: '知识库', desc: '我的学习笔记与技术复盘，支持关键词搜索与标签筛选。' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: '联系我', desc: '通过邮件或表单联系刘博康。' },
  },
  // 兜底：地址写错时给出明确的「找不到」页面，而不是悄悄跳回首页
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: '页面不存在', desc: '这个地址没有对应内容。' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
export { routes }
