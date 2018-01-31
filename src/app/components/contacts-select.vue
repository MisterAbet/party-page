<template>
  <modal v-if="showModal" @cancel="onCancel" @ok="onOk" okText="Invite">
    <select-list :items="contacts" :selected="selectedIds" slot="body"></select-list>
  </modal>
</template>

<script>
import Vue from 'vue'
import Modal from './modal'
import SelectList from './select-list'

export default {
    name: 'contacts-select',
    props:['contacts', 'selected'],
    components: { Modal, SelectList },
    data: () => {
        return {
          selectedIds: [],
          showModal: false
        }
    },
    methods:{
      show(){
        this.selectedIds = this.selected.slice()
        this.showModal = true
      },
      hide(){
        this.showModal = false
      },
      onCancel(){
        this.selectedIds = this.selected.slice()
        this.showModal = false
      },
      onOk(){
        this.$emit('ok', this.selectedIds)
        this.showModal = false
      }
    }
}
</script>

<style lang="scss">
</style>
