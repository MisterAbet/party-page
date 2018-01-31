import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'vue-awesome/icons/check-circle'
import Icon from 'vue-awesome/components/Icon'


import App from './App.vue'
import router from './router'
import store from './app/store/store'
import config from './config'

import 'vuex-toast/dist/vuex-toast.css'
import './styles/styles.scss'

Vue.component('icon', Icon)

Vue.use(VueGoogleMaps, {
  load: {
    key: config.GOOGLE_API_KEY,
    libraries: 'places'
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})
