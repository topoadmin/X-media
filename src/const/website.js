/**
 * @author      Azil
 * @version     0.0.4
 * @title       站点配置
 */

export default {
  title: 'X-Media',
  key: 'X-MEDIA', // 配置主键,目前用于存储
  indexTitle: 'X',
  whiteList: ['/login', '/404', '/403', '500'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/403', '500'], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  version: '0.0.4',
  versionTime: '2020-01-08 17:58:17'
}
