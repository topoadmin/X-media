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

Vue.config.devtools = true

Vue.config.productionTip = false

import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
