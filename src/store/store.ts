import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '@/store/modules/userModule'
import postsModule from '@/store/modules/postsModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
   // postsModule
  }
})

