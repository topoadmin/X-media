import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import website from '@/const/website'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

// 记录下系统已关闭加载loading，防止重复查询节点
let loadingStatus = true
router.afterEach((to) => {
  if (loadingStatus) {
    const _loading = document.querySelector('#loading')
    if (_loading) {
      _loading.classList.remove('animated')
      _loading.classList.add('animated')
      _loading.classList.add('fadeOut')
      _loading.addEventListener('animationend', function() {
        _loading.remove()
      })
      _loading.addEventListener('webkitAnimationEnd', function() {
        _loading.remove()
      })
    }
    loadingStatus = false
  }
  NProgress.done()
  const title = to.meta.title
  document.title = title + ' | ' + website.title
})
