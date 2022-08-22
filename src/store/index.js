import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import auth from './modules/auth'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  modules: {
    home,
    auth
  },
  plugins: [createPersistedState({paths: ['auth']})]
})

export default store