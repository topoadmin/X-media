/**
 * @author    Azil
 * @version   0.0.1
 * @title     用户状态管理
 */
import { setStore, getStore, removeStore } from '@/utils/store'
import { asyncRoutes } from '@/router'
const state = {
  username: getStore({ name: 'username' }),
  leftMenu: []
}

const mutations = {
  SET_USERNAME: (state, username) => {
    state.username = username
    setStore({
      name: 'username',
      content: username
    })
  },
  SET_LEFT_MENU: (state, leftMenu) => {
    state.leftMenu = leftMenu
  }
}

const actions = {
  setUsername: ({ commit }, username) => {
    commit('SET_USERNAME', username)
  },
  logout: ({ commit }) => {
    removeStore({ name: 'username' })
  },
  getLeftMenu: ({ commit }) => { // 获取权限菜单
    return new Promise(resolve => {
      commit('SET_LEFT_MENU', asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
