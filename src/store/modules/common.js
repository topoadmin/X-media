/**
 * @author    Azil
 * @version   0.0.1
 * @title     页面状态管理
 */
import website from '@/const/website'

const state = {
  appKey: Date.now(),
  website: website,
  selfTop: window.self === window.top,
  mainLoading: false,
  twoCachedViews: [] // 二级路由缓存
}

const mutations = {
  SET_MAIN_LOADING: (state, loading) => {
    state.mainLoading = loading
  },
  RELOAD_APP: state => {
    state.appKey = 'APP-' + Date.now()
  },
  ADD_TWO_CACHED_VIEW: (state, view) => {
    if (state.twoCachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.twoCachedViews.push(view.name)
    }
  },
  DEL_TWO_CACHED_VIEW: (state, view) => {
    for (const i of state.twoCachedViews) {
      if (i === view.name) {
        const index = state.twoCachedViews.indexOf(i)
        state.twoCachedViews.splice(index, 1)
        break
      }
    }
  },
  DEL_ALL_TWO_CACHED_VIEWS: state => {
    state.twoCachedViews = []
  }
}

const actions = {
  setMainLoading: ({ commit }, loading) => {
    commit('SET_MAIN_LOADING', loading)
  },
  reloadApp: ({ commit }) => {
    commit('RELOAD_APP')
  },
  addTwoCachedView({ commit }, view) {
    commit('ADD_TWO_CACHED_VIEW', view)
  },
  delTwoCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_TWO_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  delAllTwoCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_TWO_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
