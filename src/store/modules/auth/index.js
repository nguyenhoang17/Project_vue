import router from "../../../router";
export default {
    namespaced: true,
    state: {
      accessToken:"",
      isAuthenticated: false,
      authUser: {},
    },
    getters: {
      // Khai báo getters
    },
    mutations: {
      updateLoginStatus(state, isAuthenticated) {
        state.isAuthenticated= isAuthenticated
      },

      updateAccessToken (state, token) {
        console.log(token);
        state.accessToken = token
      },
      updateAuthUser (state, authUser) {
        state.authUser = authUser
       },
    },

    actions: {
        logout ({commit}) {
            commit('updateLoginStatus', false)
            commit('updateAuthUser', {})
            commit('updateAccessToken', '')
            return router.push({name: 'Login'})
        }
    }
  }