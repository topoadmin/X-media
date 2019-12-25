/**
 * @author          Azil
 * @version	  		  1.0.0
 * @title           Axios 请求的各种处理
 */
import axios from 'axios'
import qs from 'qs'
import { Loading } from 'element-ui'
import store from '@/store'

import NProgress from 'nprogress' // progress bar

import { randomLenNum } from '@/utils'

let httpRecord = []
let myLoadingBody

// customParams 请求自定义参数以及说明
export const CUSTOM_PARAMS = {
  loading: false, // {Boolean}          开启二级路由内显示加载框
  bodyLoading: false, // {Boolean}      开启全局加载框
  closeOtherPage: false, // {Boolean}   开启跳转页面后自动关闭非跳转页请求
  repeat: false, // {Boolean}           不允许发起重复请求,不同参数的请求不会被关闭
  closeRepeat: false, // {Boolean}      开启自动关闭重复请求,不同参数的请求不会被关闭
  repeatParams: false // {Boolean}      开启后不同参数请求会被认同为同一个请求,开启此参数需先开启 repeat 或 closeRepeat
}

/**
 * @title	接收 requestUrl 删除请求记录
 * @param	{String}  requestUrl 需要关闭的去请求地址
 * @param	{Boolean} match 模糊匹配地址
 */
export const inPathDelete = (requestUrl, match = false) => {
  httpRecord = httpRecord.filter(item => {
    // 第一个判断：自定义模糊清理
    // 第二个判断：参数配置或请求结束自动清理
    if ((match && item.requestUrl.includes(requestUrl)) || item.requestUrl === requestUrl) {
      item.cancel('my-auto-close:cancel')
      item = null
    }
    return item
  })
  window.httpRecord = httpRecord
}

function NoRepeat() {
  this.message = 'my-auto-close:no-repeat'
}
NoRepeat.prototype.toString = function toString() {
  return 'NoRepeat' + (this.message ? ': ' + this.message : '')
}
const myNoRepeat = new NoRepeat()

/**
 * @title	请求发起前的处理
 * @param	{Object} config axios 的 config 配置
 */
export const interceptorsRequest = (config) => {
  const customParams = {
    ...CUSTOM_PARAMS,
    ...config.headers.customParams || {}
  }
  return new Promise((resolve, reject) => {
    let configUrl = config.url
    if (config.method === 'get' && config.params) {
      configUrl = configUrl + '?' + qs.stringify(config.params)
    } else if (config.method === 'post') { // TODO: 请求数据相对复杂，这里只做了简单处理
      if (typeof config.data === 'string') {
        configUrl = configUrl + '?' + config.data
      } else {
        configUrl = configUrl + '?' + qs.stringify(config.data)
      }
    }

    let requestUrl
    if (customParams.repeatParams) { // 不同参数认为是同一请求，但是 repeat 与 closeRepeat 不会互相影响
      requestUrl = configUrl.split('?')[0] + '&' + config.method + '&myRepeatParams'
    } else {
      requestUrl = configUrl + '&' + config.method
      if (customParams.repeat) {
        requestUrl = requestUrl + '&myRepeat'
      } else if (customParams.closeRepeat) {
        requestUrl = requestUrl + '&myCloseRepeat'
      }
    }

    if (customParams.repeat) { // 不允许发起重复请求
      if (httpRecord.find(item => item.requestUrl === requestUrl)) {
        return reject(myNoRepeat)
      }
    } else if (customParams.closeRepeat) { // 允许发起重复请求，但是关闭历史重复请求，只保留最新的一个
      inPathDelete(requestUrl)
      setTimeout(() => {
        // TODO: 调用 axios.cacel 的关闭为异步操作，interceptors 内的 error 钩子比此处执行慢，进度条会被关闭
        NProgress.start()
      }, 0)
    }

    // TODO: 如果没有自定义的关闭，就添加一个随机数，防止请求结束时被自动关闭
    if (!customParams.repeat && !customParams.closeRepeat && !customParams.repeatParams) {
      requestUrl = requestUrl + '&' + randomLenNum()
    }
    config.cancelToken = new axios.CancelToken(cancel => {
      customParams.requestUrl = requestUrl
      config.headers.customParams = customParams
      httpRecord.push({
        closeOtherPage: customParams.closeOtherPage,
        requestUrl,
        cancel
      })
    })

    // 判断是否需要打开加载数据遮罩
    if (customParams.bodyLoading) { // 全屏遮罩
      myLoadingBody = Loading.service({
        lock: true,
        body: true,
        customClass: 'my-loading-body',
        text: customParams.bodyLoading || '数据加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
    } else if (customParams.loading) { // 当前路由遮罩
      store.dispatch('common/setMainLoading', customParams.loading)
    }
    resolve(httpRecord)
  })
}

/**
 * @title	请求结束后的处理
 * @param	{Object} config axios 的 config 配置
 */
export const interceptorsResponse = (config) => {
  const customParams = config.headers.customParams
  inPathDelete(customParams.requestUrl)
  if (customParams.loading) {
    store.dispatch('common/setMainLoading', false)
  }
  if (myLoadingBody) {
    myLoadingBody.close()
    myLoadingBody = undefined
  }
}

/**
 * @title	请求错误时关闭弹窗
 */
export const errorHandler = () => {
  store.dispatch('common/setMainLoading', false)
  if (myLoadingBody) {
    myLoadingBody.close()
    myLoadingBody = undefined
  }
}

export const routerBeforeEach = () => {
  // 关闭上一页的请求列表
  // TODO:请求遮罩关闭存在无法打开的问题（遇到过一次，目前无法复现）
  if (httpRecord.length) {
    httpRecord.forEach((requestItem, index) => {
      if (requestItem.closeOtherPage) {
        requestItem.cancel()
        httpRecord.splice(index, 1)
        errorHandler()
      }
    })
  }
}
