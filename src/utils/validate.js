/**
 * @author  				Azil
 * @version	  		  1.0.0
 * @title           输入数据验证
 */

// 是否为超链接
/**
 * @title	生成随机 len 位数字
 * @param {Number} len 长度
 * @param {Date} date 时间
 * @return {Number}
 * */
export function isExternal(path) {
  return /^(http?:|https?:|mailto:|tel:)/.test(path)
}

// 是否包含特殊字符
export function vEspecial(str) {
  var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  return reg.test(str)
}

// 是否包含特殊字符（elementUI版本）
export function validateEspecial(rule, value, callback) {
  if (typeof value !== 'object' && !value.trim()) { // 为空
    return callback(new Error('输入内容不能空'))
  }
  let status = false
  value.split('').forEach(item => {
    if (vEspecial(item)) {
      status = true
    }
  })
  if (status) {
    callback(new Error(rule.message || '输入内容不能包含特殊字符'))
  } else {
    callback()
  }
}

// 验证端口
export function vPort(port) {
  return port >= 10 && port <= 65535
}

// 验证端口（elementUI 版本）
export function validatePort(rule, value, callback) {
  const required = rule.required || false
  if (required) {
    if (!value.trim()) {
      return callback('端口不能为空')
    }
    if (!validateNumber(value)) {
      return callback(new Error('端口只能为数字'))
    }
    if (vPort(value)) {
      callback()
    } else {
      return callback(new Error(rule.message || '请输入正确的端口地址格式'))
    }
  } else {
    callback()
  }
}

// 合法uri
export function validateURL(str) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return str ? reg.test(str) : false
}

// 数字类型
export function validateNumber(str) {
  const reg = /^\d+$/
  return str ? reg.test(str) : false
}

// 小写字母
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return str ? reg.test(str) : false
}

// 大写字母
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return str ? reg.test(str) : false
}

// 大小写字母
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return str ? reg.test(str) : false
}

// 验证下拉框值为 Object
export function validateSelectObject(rule, value, callback) {
  const keys = Object.keys(value)
  if (!keys.length) {
    return callback(new Error(rule.message || '至少选择一项'))
  } else {
    callback()
  }
}

// 验证ip
export function vIp(ip) {
  const exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return ip ? ip.match(exp) != null : false
}

// 验证ip（elementUI版本）
export function validateIP(rule, value, callback) {
  const required = rule.required || false
  if (required) {
    if (!value.trim()) {
      return callback(new Error('IP 不能为空'))
    } else {
      if (vIp(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的 IP 地址格式'))
      }
    }
  } else {
    callback()
  }
}

// 验证email
export function vEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return email ? re.test(email) : false
}

// 验证email（elementUI版本）
export function validateEmail(rule, value, callback) {
  const required = rule.required || false
  if (required) {
    if (!value.trim()) {
      return callback(new Error('邮箱地址不能为空'))
    } else {
      if (vEmail(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的邮箱地址'))
      }
    }
  } else {
    callback()
  }
}

// 验证多邮箱输入
export function validateMoreEmail(rule, value, callback) {
  const required = rule.required || false
  if (required) {
    if (!value.trim()) {
      return callback(new Error('邮箱地址不能为空'))
    }
    let error = false
    value.split('\n').forEach(item => {
      if (!vEmail(item)) {
        error = true
      }
    })
    if (error) {
      return callback(new Error('请输入正确的邮箱地址'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 验证密码强度
export function vPassword(value) {
  let modes = 0
  if (value.length < 8) return 0
  // 数字
  if (/\d/.test(value)) modes++
  // 小写
  if (/[a-z]/.test(value)) modes++
  // 大写
  if (/[A-Z]/.test(value)) modes++
  // 特殊字符
  if (/\W/.test(value)) modes++
  return modes
}

// 验证密码强度（elementUI版本）
export function validatePassword(rule, value, callback) {
  const required = rule.required || false
  if (required) {
    if (!value.trim()) {
      return callback(new Error('密码不能为空'))
    }
    if (value === rule.defaultValue) {
      callback()
    } else {
      const modes = vPassword(value)
      if (modes > 2) {
        callback()
      } else {
        return callback(new Error('密码强度不够'))
      }
    }
  } else {
    callback()
  }
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}
