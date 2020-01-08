/**
 * @author  				Azil
 * @version	  		  1.0.0
 * @title           请求控制中心
 */
import axios from 'axios'
import NProgress from 'nprogress'

import { interceptorsRequest, interceptorsResponse, errorHandler } from './axiosHandler.js'

// 创建axios实例
const service = axios.create({
  // maxRedirects: 5, // 是否解析301请求
  maxContentLength: Infinity, // 请求内容允许无限大
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000 // 请求超时时间
})

// 请求前拦截器
service.interceptors.request.use(async(config) => {
  NProgress.start()
  try {
    await interceptorsRequest(config)
    config.headers['Content-Type'] = config.contentType || 'application/x-www-form-urlencoded'
    return config
  } catch (err) {
    setTimeout(() => {
      // TODO: 调用 axios.cacel 的关闭为异步操作，interceptors 内的 error 钩子比此处执行慢，进度条会被关闭
      NProgress.start()
    }, 0)

    return Promise.reject(err)
  }
}, error => {
  errorHandler()
  NProgress.done()
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    NProgress.done()

    interceptorsResponse(response.config)

    if (response.status === 200) {
      const data = response.data || {} // 获取请求返回数据
      if (data.code) {
        if (data.code === 200) {
          return data
        } else {
          return Promise.reject(data.msg)
          // throw new Error(data.msg)
        }
      } else {
        return data
      }
    } else {
      return Promise.reject(response.statusText)
      // throw new Error(response.statusText)
    }
  },
  error => {
    errorHandler()
    NProgress.done()
    return Promise.reject(error)
  }
)

export default service
