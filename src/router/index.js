import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '@/layout'
// import NullLayout from '@/layout/null-layout'

/**
 * 注意:子菜单只在路由子菜单时出现。长度> = 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   是否在导航栏中隐藏该项
 * redirect: noRedirect           如果设置 noRedirect，则不会在面包屑中重定向
 * name:'router-name'             名称由<keep-alive>使用(必须设置且不能重复!!)
 * meta : {
    title: 'title'               导航和面包屑显示的名称
    icon: 'svg-name'             导航栏显示的图标
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    affix: true                 如果设置为true，则标记将固定在面包屑上
  }
 */

/**
 * constantRoutes
 * 没有权限的基本页，所有人员都可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  }, {
    path: '/404',
    component: () => import('@/components/error-page/404'),
    name: '404',
    hidden: true
  }, {
    path: '/403',
    component: () => import('@/components/error-page/403'),
    name: '403',
    hidden: true
  }, {
    path: '/500',
    component: () => import('@/components/error-page/500'),
    name: '500',
    hidden: true
  }, {
    path: '/',
    redirect: '/login',
    noDropdown: true,
    hidden: true
  }, {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login',
    meta: {
      title: '登录'
    },
    hidden: true
  }, {
    path: '/home',
    component: Layout,
    name: 'Home',
    children: [{
      path: '/',
      component: () => import('@/views/home/index'),
      name: 'HomeIndex',
      meta: {
        title: '首页'
      }
    }]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

export const asyncRoutes = [
]
