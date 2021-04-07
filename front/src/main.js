import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$devsApi = axios.create({
  baseURL: 'https://606888f50add490017340250.mockapi.io/api',
  timeout: 1000
})

Vue.prototype.$githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 1000
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
