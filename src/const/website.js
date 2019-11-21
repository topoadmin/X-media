/**
 * @author  Azil
 * @version 0.0.1
 * @title   站点配置
 */

export default {
  title: 'X-media',
  key: 'X-MEDIA', // 配置主键,目前用于存储
  indexTitle: 'X',
  whiteList: ['/404', '/403', '500'], // 配置无权限可以访问的页面
  whiteTagList: ['/404', '/403', '500'], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  version: '0.0.1',
  versionTime: '2019-11-20 15:51:36'
}
