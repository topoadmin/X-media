/**
 * @author    Azil
 * @version   0.0.1
 * @title     页面状态管理
 */
import website from '@/const/website'

const state = {
  appKey: Date.now(),
  website: website,
  selfTop: window.self === window.top
}

const mutations = {
  RELOAD_APP: state => {
    state.appKey = 'APP-' + Date.now()
  }
}

const actions = {
  reloadApp: ({ commit }) => {
    commit('RELOAD_APP')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
