/**
 * @author    Azil
 * @version   0.0.1
 * @title     用户状态管理
 */
import { setStore, getStore, removeStore } from '@/utils/store'

const state = {
  username: getStore({ name: 'username' })
}

const mutations = {
  SET_USERNAME: (state, username) => {
    state.username = username
    setStore({
      name: 'username',
      content: username
    })
  }
}

const actions = {
  setUsername: ({ commit }, username) => {
    commit('SET_USERNAME', username)
  },
  logout: ({ commit }) => {
    removeStore({ name: 'username' })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
