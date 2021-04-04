import Vue from 'vue'
import Vuex from 'vuex'
import DevModule from './dev'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { DevModule }
})
