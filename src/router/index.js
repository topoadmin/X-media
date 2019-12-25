import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '@/layout'
// import NullLayout from '@/layout/null-layout'

/**
 * hidden: true                   是否在导航栏中隐藏该项
 * redirect: noRedirect           如果设置 noRedirect，则不会在面包屑中重定向,
 * name:'router-name'             名称由<keep-alive>使用(必须设置且不能重复!!)
 * meta : {
    title: 'title'               导航和面包屑显示的名称
    icon: 'svg-name'             导航栏显示的图标
    redirect: false              如果设置 redirect 无法缓存当前路由，需要自行处理
    noCache: false               如果设置为true，页面将不会被缓存(默认为false)，TODO: 如果存在 redirect 则失效，vue-router 问题
    shortcut: false              如果设置为true,就是快捷菜单
    actionMenu: 'menu'           高亮导航（比 name 优先级高）
    parentNoCache: false         设置 true 不开启父级路由缓存, 目前依赖 actionMenu（TODO: 父级开启了 redirect 就必须设置， 否则父级无法被缓存，因为开启 redirect $route 监听不到进入了父级路由）
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
    redirect: '/home',
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

// 用户页面导航栏
import sidebar from '@/layout/components/Sidebar'

// 动态权限菜单
export const asyncRoutes = [
  {
    path: '/media',
    component: Layout,
    name: 'Media',
    meta: {
      title: '产品中心',
      icon: 'education'
    },
    redirect: '/media/list',
    children: [{
      path: 'list',
      components: {
        default: () => import('@/views/media/list'),
        sidebar
      },
      name: 'MediaList',
      redirect: '/media/list/toutiao',
      meta: {
        title: '资源中心'
      },
      children: [{ // 三级路由测试
        path: 'toutiao',
        component: () => import('@/views/media/list/toutiao'),
        name: 'MediaListToutiao',
        meta: {
          title: '头条资源',
          activeMenu: 'MediaList'
        }
      }, {
        path: 'baijiahao',
        component: () => import('@/views/media/list/baijiahao'),
        name: 'MediaListBaijiahao',
        meta: {
          title: '百家号资源',
          noCache: true,
          activeMenu: 'MediaList'
        }
      }, {
        path: 'weibo',
        component: () => import('@/views/media/list/weibo'),
        name: 'MediaListWeibo',
        meta: {
          title: '微博资源',
          activeMenu: 'MediaList'
        }
      }]
    }]
  },
  {
    path: '/article',
    component: Layout,
    name: 'Article',
    meta: {
      title: '我要发布',
      icon: 'education'
    },
    redirect: '/article/add',
    children: [{
      path: 'add',
      components: {
        default: () => import('@/views/article/add'),
        sidebar
      },
      name: 'ArticleAdd',
      meta: {
        title: '新闻发布'
      }
    }]
  },
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    meta: {
      title: '会员订单',
      icon: 'education'
    },
    redirect: '/order/list',
    children: [{
      path: 'list',
      components: {
        default: () => import('@/views/order/list'),
        sidebar
      },
      redirect: '/order/list/toutiao',
      name: 'OrderList',
      meta: {
        title: '我的稿件'
      },
      children: [{ // 三级路由测试
        path: 'toutiao',
        component: () => import('@/views/order/list/toutiao'),
        name: 'OrderListToutiao',
        meta: {
          title: '头条稿件',
          activeMenu: 'OrderList',
          parentNoCache: true
        }
      }, {
        path: 'baijiahao',
        component: () => import('@/views/order/list/baijiahao'),
        name: 'OrderListBaijiahao',
        meta: {
          title: '百家号稿件',
          activeMenu: 'OrderList',
          parentNoCache: true
        }
      }, {
        path: 'weibo',
        component: () => import('@/views/order/list/weibo'),
        name: 'OrderListWeibo',
        meta: {
          title: '微博稿件',
          activeMenu: 'OrderList',
          parentNoCache: true
        }
      }]
    }, {
      path: 'work',
      components: {
        default: () => import('@/views/order/work'),
        sidebar
      },
      name: 'OrderWork',
      meta: {
        title: '工单信息'
      }
    }]
  }
]
