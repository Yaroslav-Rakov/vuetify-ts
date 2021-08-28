import router from '@/router'
import api from '../api'
import { getAccessToken, setAccessToken } from '../auth'

const userModule = {
    state: {
      token: getAccessToken(),
      userAuthData: []
    },
    mutations: {
        SET_AUTH_DATA(state: any, authData: Array<any>) {
        state.userAuthData = authData
      },
      SET_TOKEN(state:any, token:string) {
        state.token = token
        setAccessToken(token)
  
        console.log('SET_TOKEN state', state);
      }
    },
    getters: {
      GET_AUTH_DATA(state: any) {
        console.log(state.userAuthData);
        return state.userAuthData;
      },
    },
    actions: {
        ACTION_REGISTER_DATA(commit: any, user: Array<any>) {
        return new Promise((resolve, reject) => {
          commit = null;
          api
            .post("users", user)
            .then((response) => {
              (console.log(response.data))
              resolve({ name: 'Login' });
            }).catch((error) => {
              console.error("There was an error!", error);
              reject(error);
            });
        });
      },
  
        ACTION_LOGIN({ commit }: any, user: Array<any>) {
        return new Promise((resolve, reject) => {
          api
            .post("auth", user)
            .then((response) => {
              commit('SET_TOKEN', response.data.token);
              resolve({ name: 'Dashboard' });
            })
            .catch((error) => {
              console.error("There was an error!", error);
              reject(error);
            });
        });
  
      },
        ACTION_AUTH_DATA({ commit }:any) {
       return new Promise((resolve, reject) => {
        console.log('ACTION_AUTH_DATA works');
        if (getAccessToken()) {
          api.get('auth/user', {
            headers: { authorization: getAccessToken() },
          }).then(response => {
              commit('SET_AUTH_DATA', response.data);
              console.log('Router path from AUTH_DATA: '+router.currentRoute.path);
              if(router.currentRoute.path === '/my-posts'){
                resolve('ACTION_POSTS');
              } else if (router.currentRoute.path === '/post') {
                resolve('ACTION_POST_DATA');
              }
          })
              .catch((error) => {
                  console.error("There was an error!", error);
                  reject(error);
              });
           }
       });

      },
    }
  }

  export default userModule
