import axios from 'axios'
import store from "../store";
import router from "../router";

const baseUrl = 'http://vuecourse.zent.edu.vn';

export const apiAxios = axios.create({
  baseURL:`${baseUrl}/api`,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
})

apiAxios.interceptors.request.use(config => {
  let token = store.state.auth.accessToken
  if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
},
error => {
  return Promise.reject(error)
})

apiAxios.interceptors.response.use(undefined, (error) => {
if (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
      store.commit('auth/updateLoginStatus', false)
      store.commit('auth/updateAuthUser', {})
      store.commit('auth/updateAccessToken', '')
      // if (error.response.data.error[0]) {
      //     return router.push({ name: 'Login' ,params:{'is_lock_off':'true'}})
      // }
      return router.push({ name: 'Login' })
  }
}
return Promise.reject(error);
})


export default {
  register(data){
    return apiAxios({
        method: 'post',
        url: 'auth/register',
        data: data
    })
  },

  login(data){
    return apiAxios({
        method: 'post',
        url: 'auth/login',
        data: data
    })
   },
   
   getAuthUser() {
    return apiAxios({
        method: 'get',
        url: 'admin/auth/me'
    })
  },
  logout(){
    return apiAxios({
        method: 'post',
        url: 'auth/logout',
    })
  },
}