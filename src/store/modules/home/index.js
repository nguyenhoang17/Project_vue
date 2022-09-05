export default {
    namespaced: true,
    state: {
      // Khai báo state
        directory:{}
    },
    getters: {
      // Khai báo getters
    },
    mutations: {
      // Khai báo mutations
        getDirectories (state, directory) {
            state.directory = directory
        },
    },
  }