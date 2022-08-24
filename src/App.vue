<template>
  <div id="app">
    <AdminLayout v-if="isAuthenticated"/>
    <LoginLayout v-else/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AdminLayout from './layouts/AdminLayout'
import LoginLayout from './layouts/LoginLayout'

export default {
  name: 'App',
  components: {
    AdminLayout,
    LoginLayout,
  },
  computed: {
    ...mapState('auth',['isAuthenticated'])
  },
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
