import { asyncRoutes, constantRoutes } from '@/router'

/**
 * @title 通过authority判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */
function hasPermission(auths, route) {
  if (route.auth === '*') {
    return true
  }
  return auths.includes(route.path.trim().replace(/[&\/\|\\\*^%$#@\-]/g, ''))
}

/**
 * @title 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 */
function filterAsyncRouter(asyncRouterMap, auths) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(auths, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, auths)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * @title 已授权树形数据扁平化
 * @param menus
 */
function flattenDeep(menus) {
  const res = []
  menus.forEach(menu => {
    if (menu.children.length) {
      res.push(...flattenDeep(menu.children))
    }
    res.push(menu.path.trim().replace(/[&\/\|\\\*^%$#@\-]/g, ''))
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = asyncRoutes

      accessedRoutes.push({
        path: '*',
        redirect: '/404',
        hidden: true
      })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
