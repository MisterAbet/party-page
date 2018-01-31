<template>
  <ul class="select-list">
    <li v-for="(item, index) in items" :class="{selected: isSelected(item.id)}" :key="index" @click="toggle(item.id)">
      <contact-item :item="item" :selected="isSelected(item.id)"></contact-item>
    </li>
  </ul>
</template>

<script>
import ContactItem from './contact-item'

export default {
  name: 'select-list',
  components:{ContactItem},
  props:['items', 'selected'],
  methods:{
    toggle(id){
      let pos = (this.selected || []).indexOf(id)
      if(pos == -1)
        this.selected.push(id)
      else
        this.selected.splice(pos, 1)
    },
    isSelected(id){
      return (this.selected || []).indexOf(id) !== -1
    }
  }
}
</script>

<style lang="scss">
  @import './../../styles/colors.scss';

  .select-list{
    list-style-type: none;
    padding: 0;
    border: 1px solid $text-color;
    border-radius: 3px;
    li{
        display: block;
        cursor: pointer;
        &.selected{
          background-color: $selected-contact-background;
        }
    }
  }

</style>



