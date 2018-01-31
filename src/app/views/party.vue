<template src='./party.template.html'></template>

<script>
  import Vue from 'vue'
  import Datepicker from 'vuejs-datepicker'

  import utils from './../shared/utils'
  import ContactsSelect from './../components/contacts-select'

  export default {
      name: 'party-page',
      components:{ContactsSelect, Datepicker},
      data: () => {
          return {
            mapZoom: 1
          }
      },
      computed:{
        yesterday(){
          let rval = new Date()
          rval.setDate(rval.getDate() - 1)
          return rval
        },
        calendars(){
          return this.$store.state.calendars
        },
        calendar:{
          get(){
            return this.$store.state.selectedCalendar
          },
          set(cal){
            this.$store.commit('selectedCalendar', {
              calendar: cal
            })
          }
        },
        contacts(){
          return this.$store.state.contacts
        },
        selectedContactsIds(){
          return this.$store.state.selectedContacts.map(c => c.id)
        },
        selectedContacts(){
          return this.$store.state.selectedContacts
        },
        partyName:{
          get(){
            return this.$store.state.partyName
          },
          set(val){
            this.$store.commit('partyName', val)
          }
        },
        place:{
          get(){
            return this.$store.state.place
          },
          set(val){
            let address = utils.parseGoogleAddress(val)
            this.$store.commit('place', address)
          }
        },
        date:{
          get(){
            return this.$store.getters.partyDate
          },
          set(val){
            this.$store.commit('partyDate', val)
          }
        },
        isAuthenticated(){
          return this.$store.state.isAuthenticated
        },
        existEvent(){
          return !!this.$store.state.partyId
        }
      },
      methods:{
        selectContacts(){
          this.$refs.con.show()
        },
        onSelectContacts(ids){
          this.$store.commit('selectedContacts', {
              contacts: ids
          })
        },
        saveToCalendar(){
          this.$store.dispatch('createEvent')
        },
        updateToCalendar(){
          this.$store.dispatch('updateEvent')
        },
        setPlace(place) {
          this.place = place
          if (this.place)
            this.mapZoom = 10
        }
      }
  }
</script>

<style lang="scss">

  .contact-name{
    // margin: 5px;
    &:not(:last-child):after{
      content:", ";
    }
    // line-height: 28px;
    // background-color: #7A8C93;
    // color: #FFFFFF;
  }
</style>


