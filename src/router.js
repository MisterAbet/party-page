import Vue from 'vue'
import Router from 'vue-router'
import PartyPage from './app/views/party'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PartyPage',
      component: PartyPage
    }
  ]
})
