import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import website from '@/const/website'
import store from '@/store'
// import { getStore } from '@/utils/store'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (store.getters.username) { // 判断是否登录
    if (!store.getters.leftMenu.length) { // 生成用户权限菜单
      const leftMenu = await store.dispatch('user/getLeftMenu')
      router.addRoutes(await store.dispatch('permission/generateRoutes', leftMenu))
      next({ ...to })
    } else {
      next()
    }
  } else {
    if (website.whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      store.dispatch('user/logout')
      next('/login')
    }
    NProgress.done()
  }
})

// 记录下系统已关闭加载loading，防止重复查询节点
let loadingStatus = true
router.afterEach(to => {
  if (loadingStatus) {
    const _loading = document.querySelector('#loading')
    if (_loading) {
      window.setTimeout(() => {
        _loading.classList.remove('animated')
        _loading.classList.add('animated')
        _loading.classList.add('fadeOut')
        _loading.addEventListener('animationend', function() {
          _loading.remove()
        })
        _loading.addEventListener('webkitAnimationEnd', function() {
          _loading.remove()
        })
        loadingStatus = false
      }, 333)
    }
  }
  NProgress.done()
  const title = to.meta.title
  document.title = title + ' | ' + website.title
})
