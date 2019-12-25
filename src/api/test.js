import fetch from '@/utils/request'

// 测试 Get 请求
export function getRequest(params, customParams) {
  return fetch({
    url: '/getRequest',
    method: 'get',
    params,
    headers: {
      customParams: {
        ...customParams
      }
    }
  })
}

// 测试 POST 请求
export function postRequest(params, customParams) {
  return fetch({
    url: '/postRequest',
    method: 'post',
    // data: qs.stringify(params),
    data: params,
    headers: {
      customParams: {
        ...customParams
      }
    }
  })
}
