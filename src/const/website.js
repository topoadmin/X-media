/**
 * @author  Azil
 * @version 0.0.2
 * @title   站点配置
 */

export default {
  title: 'X-Media',
  key: 'X-MEDIA', // 配置主键,目前用于存储
  indexTitle: 'X',
  whiteList: ['/login', '/404', '/403', '500'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/403', '500'], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  version: '0.0.2',
  versionTime: '2019-12-18 20:02:36'
}
