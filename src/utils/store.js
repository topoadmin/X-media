/**
 * @author  				Azil
 * @version	  		  1.0.0
 * @title           本地存储控制
 */

import { validatenull } from '@/utils/validate'
import website from '@/const/website'

const keyName = website.key + '-'

/**
 * @title	存储数据
 * @param	{Object} params
 *  @key type     值为真时，会存储到 sessionStoreage，反之存储到 localStorage
 *  @key name     存储键
 *  @key content  存储内容
 * */
export const setStore = (params = {}) => {
  const type = params.type
  const content = params.content
  const name = keyName + params.name
  const obj = {
    dataType: typeof (content),
    content,
    type,
    datetime: new Date().getTime()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}

/**
 * @title	获取数据
 * @param	{Object} params
 *  @key type     值为真时，会存储到 sessionStoreage，反之存储到 localStorage
 *  @key name     存储键
 *  @key debug    值为真时，获取原始数据
 * */
export const getStore = (params = {}) => {
  const type = params.type
  const name = keyName + params.name
  const debug = params.debug
  let obj = ''
  if (type) {
    obj = window.sessionStorage.getItem(name)
  } else {
    obj = window.localStorage.getItem(name)
  }

  if (validatenull(obj)) return
  try {
    obj = JSON.parse(obj)
  } catch (error) {
    return obj
  }

  if (debug) {
    return obj
  }
  let content
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    // eslint-disable-next-line no-eval
    content = window.eval(obj.content)
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}

/**
 * @title	删除
 * @param	{Object} params
 *  @key type     值为真时，会存储到 sessionStoreage，反之存储到 localStorage
 *  @key name     存储键
 * */
export const removeStore = (params = {}) => {
  const type = params.type
  const name = keyName + params.name
  if (type) {
    window.sessionStorage.removeItem(name)
  } else {
    window.localStorage.removeItem(name)
  }
}

/**
 * @title	获取全部
 * @param	{Object} params
 *  @key type     值为真时，会存储到 sessionStoreage，反之存储到 localStorage
 * */
export const getAllStore = (params = {}) => {
  const list = []
  const type = params.type
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i)
        })
      })
    }
  }
  return list
}

/**
 * @title	清空全部
 * @param	{Object} params
 *  @key type     值为真时，会存储到 sessionStoreage，反之存储到 localStorage
 * */
export const clearStore = (params = {}) => {
  const type = params.type
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}
