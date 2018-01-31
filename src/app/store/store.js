import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'
import { createModule } from 'vuex-toast'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

import GoogleApi from './../api/google'
import utils from './../shared/utils'
import config from './../../config'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  providers: {
    google: {
      responseType: 'token',
      clientId: config.GOOGLE_CLIENT_ID,
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/contacts.readonly', 'https://www.googleapis.com/auth/calendar'],
    }
  }
})

export default new Vuex.Store({
    plugins: [createPersistedState()],

    modules:{
      toast: createModule({
        dismissInterval: 8000
      })
    },

    state: {
      isAuthenticated: vueAuth.isAuthenticated(),
      contacts: [],
      calendars: [],
      selectedCalendar: null,
      selectedContacts: [],
      partyName: '',
      place: {
        name: '',
        position:{
          lat: 0,
          lng: 0
        }
      },
      partyId: null,
      partyDate: new Date()
    },

    getters: {
      isAuthenticated () {
        return vueAuth.isAuthenticated()
      },
      partyDate(state){
        return new Date(state.partyDate)
      }
    },

    mutations: {
      isAuthenticated: (state, payload) => {
        state.isAuthenticated = payload.isAuthenticated
      },
      contacts: (state, payload) => {
        state.contacts = payload.contacts
      },
      calendars:(state, payload) => {
        state.calendars = payload.calendars
        let calendarIds = state.calendars.map( c => c.id)
        if(!state.selectedCalendar || calendarIds.indexOf(state.selectedCalendar) == -1){
          let primaries = state.calendars.filter( c => c.primary)
          state.selectedCalendar = primaries.length ? primaries[0].id: null
        }
      },
      selectedCalendar: (state, payload) =>{
        state.selectedCalendar = payload.calendar
      },
      selectedContacts: (state, payload) => {
        let contacts = state.contacts.filter(c => payload.contacts.indexOf(c.id) !== -1)
        state.selectedContacts = contacts
        console.log('selected contacts', state.selectedContacts.slice())
      },
      partyId: (state, payload) => {
        state.partyId = payload.partyId
      },
      partyName: (state, payload) => {
        state.partyName = payload
      },
      place: (state, payload) => {
        state.place = payload
        console.log('party location', payload)
      },
      partyDate: (state, payload) => {
        state.partyDate = payload
      }
    },

    actions: {
      login: (context, payload) => {
        vueAuth.authenticate(payload.provider).then((result) => {
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            })
            context.dispatch('updateContacts')
            context.dispatch('updateCalendars')
        }).catch(error => {
          context.dispatch(ADD_TOAST_MESSAGE,{
            text: 'Fail to sign into Google Account',
            type: 'danger',
            dismissAfter: 10000
          })
        })
      },
      logout: (context, payload) => {
        vueAuth.logout().then(() => {
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            })
            context.dispatch('updateContacts')
            context.dispatch('updateCalendars')
        })
      },
      updateContacts: (context, payload) =>{
        if(vueAuth.isAuthenticated()){
          GoogleApi.getContacts(vueAuth.getToken()).then((result) =>{
            context.commit('contacts',{ contacts: result.data.connections.filter(c => !!c.emailAddresses).map(
              (con)=>{
                return utils.parseGoogleContact(con)
              })
            })
          }).catch( (error) => {
            if(error.response && error.response.status == 401)
              context.dispatch('logout')
            else
              throw error
          })
        }
        else{
          context.commit('contacts',{ contacts: []})
        }
      },
      updateCalendars:(context, payload) => {
        if(vueAuth.isAuthenticated()){
          GoogleApi.getCalendarList(vueAuth.getToken()).then((result) =>{
            context.commit('calendars',{ calendars: result.data.items.filter((cal) => cal.accessRole == "owner").map(
              (cal)=>{
                return {
                  id: cal.id,
                  name: cal.summary,
                  primary: !!cal.primary
                }
              })
            })
          })
        }
        else{
          context.commit('calendars',{ calendars: []})
        }
      },
      createEvent:(context, payload) => {
        if(vueAuth.isAuthenticated()){
          GoogleApi.createCalendarEvent(
            vueAuth.getToken(),
            context.state.selectedCalendar,
            context.state.partyName,
            context.state.place.title,
            context.getters.partyDate,
            context.state.selectedContacts
          )
            .then((result) => {
              context.commit('partyId', { partyId: result.data.id })
              context.dispatch(ADD_TOAST_MESSAGE,{
                text: 'Party added to Google Calendar',
                type: 'success',
                dismissAfter: 10000
              })
            })
            .catch((error) => {
              context.dispatch(ADD_TOAST_MESSAGE,{
                text: 'Fail to add party into Google Calendar',
                type: 'danger',
                dismissAfter: 10000
              })
            })
        }
      },
      updateEvent:(context, payload) => {
        if(vueAuth.isAuthenticated()){
          if(context.state.partyId){
            GoogleApi.updateCalendarEvent(
              vueAuth.getToken(),
              context.state.selectedCalendar,
              context.state.partyId,
              context.state.partyName,
              context.state.place.title,
              context.getters.partyDate,
              context.state.selectedContacts
            )
              .then((result) => {
                context.dispatch(ADD_TOAST_MESSAGE,{
                  text: 'Party synced with Google Calendar',
                  type: 'success',
                  dismissAfter: 10000
                })
              })
              .catch((error) => {
                context.dispatch(ADD_TOAST_MESSAGE,{
                  text: 'Fail to synced party with Google Calendar',
                  type: 'danger',
                  dismissAfter: 10000
                })
              })
          }
          else
              context.dispatch('createEvent', payload)
        }
      }
    }
  })
