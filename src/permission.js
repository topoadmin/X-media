/**
 * 全站权限配置
 *
 */
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/util/get-page-title'

NProgress.configure({ showSpinner: false })

window.__ajaxPending = []

/**
 * 导航守卫，相关内容可以参考:
 * https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // TODO: 全部跳转到登录页面
  if (to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

// 记录下系统已关闭加载loading，防止重复查询节点
let loadingStatus = true
router.afterEach((to) => {
  if (loadingStatus) {
    const _loading = document.querySelector('#loading')
    if (_loading) {
      // TODO: 模拟个加载时长
      setTimeout(function() {
        _loading.classList.remove('animated')
        _loading.classList.add('animated')
        _loading.classList.add('fadeOut')
        _loading.addEventListener('animationend', function() {
          _loading.remove()
        })
        _loading.addEventListener('webkitAnimationEnd', function() {
          _loading.remove()
        })
      }, 1333)
    }
    loadingStatus = false
  }
  NProgress.done()
})
