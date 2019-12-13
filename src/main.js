import 'babel-polyfill'
import 'classlist-polyfill'
import Vue from 'vue'
import App from './App'
import './permission' // 权限
import './error' // 日志
import router from './router'
import store from './store'
import './styles/common.scss'

import './icons' // icon

import '@/directive/waves'

// 引入avue的包
// import Avue from '@smallwei/avue/lib/index.js'
// import Avue from '@smallwei/avue'
// 引入avue的样式文件

// Vue.prototype.$ELEMENT = { size: 'small' }

// Vue.use(Avue, { menuType: 'text' })

Vue.config.devtools = true

Vue.config.productionTip = false

Vue.use(router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
