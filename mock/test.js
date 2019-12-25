import Mock from 'mockjs'

export default [
  {
    url: '/getRequest',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          name: Mock.mock('@ctitle')
        }
      }
    }
  },
  {
    url: '/postRequest',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: {
          name: Mock.mock('@ctitle')
        }
      }
    }
  }
]
