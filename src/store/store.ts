// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })


import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/userModule.ts'
import postsModule from './modules/postsModule.ts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    postsModule
  }
})

