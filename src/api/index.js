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
        url: 'auth/me'
    })
  },
  logout(){
    return apiAxios({
        method: 'post',
        url: 'auth/logout',
    })
  },
    //User
    changePass(data){
      return apiAxios({
          method:'put',
          url:'users/password',
          data: data
      })
    },
    changInfo(data){
      return apiAxios({
          method:'post',
          url:'users',
          data: data
      })
    },

    //Danh sách
    getList(){
      return apiAxios({
          method:'get',
          url:'directories'
      })
    },
    createList(data){
      return apiAxios({
          method: 'post',
          url:'directories',
          data:data
      })
    },
    updateList(data, id){
        return apiAxios({
            method: 'put',
            url:'directories/' + id,
            data:data
        })
    },
    deleteList(id){
        return apiAxios({
            method: 'delete',
            url:'directories/' + id,
        })
    },
    //Thẻ
    createCard(data){
      return apiAxios({
          method: 'post',
          url: 'cards',
          data: data
      })
    },
    updateCard(data, id){
        return apiAxios({
            method: 'put',
            url: 'cards/' + id,
            data: data
        })
    },
    deleteCard(id){
        return apiAxios({
            method: 'delete',
            url: 'cards/' + id,
        })
    },
    detailCard(id){
        return apiAxios({
            method: 'get',
            url: 'cards/' + id,
        })
    },
    createCheckList(data){
      return apiAxios({
          method: 'post',
          url: 'check-lists',
          data: data
      })
    },
    updateWork(data, id){
        return apiAxios({
            method: 'put',
            url: 'check-lists/' + id,
            data: data
        })
    },
    deleteWork(id){
        return apiAxios({
            method: 'delete',
            url: 'check-lists/' + id,
        })
    },
    createWorkChil(data){
      return apiAxios({
          method: 'post',
          url: 'check-list-childs',
          data:data
      })
    },
    deleteWorkChil(id){
        return apiAxios({
            method: 'delete',
            url: 'check-list-childs/' + id,

        })
    },
    updateWorkChil(data, id){
        return apiAxios({
            method: 'put',
            url: 'check-list-childs/' + id,
            data: data
        })
    },

}