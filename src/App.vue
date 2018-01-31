<template>
  <div id="app">
    <div class="row">
        <a class="flex-to-right" v-if="!isAuthenticated" @click="authenticate('google')">Sign In</a>
        <a class="flex-to-right" v-if="isAuthenticated" @click="logout()">Sign Out</a>
    </div>
    <router-view></router-view>
    <toast position="ne"></toast>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vuex-toast'
// import store from './app/store/auth.store'

export default {
    name: 'app',
    components:{Toast},
    computed: {
      isAuthenticated(){
        return this.$store.state.isAuthenticated
      }
    },
    methods:{
      authenticate(provider){
        this.$store.dispatch('login', {provider})
      },
      logout(){
        this.$store.dispatch('logout', {})
      }
    },
    mounted(){
      this.$store.dispatch('updateContacts')
      this.$store.dispatch('updateCalendars')
    }
  }
</script>

<style lang="scss">
</style>
