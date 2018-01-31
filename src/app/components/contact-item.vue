<template>
  <div class="contact-item">
    <div class="logo">
      <img v-if="item.photo" :src="item.photo" alt="">
    </div>
    <div class="name">
      {{item.displayName || item.email}}
    </div>
    <div v-if="selected" class="ok">
      <icon name="check-circle"></icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact-item',
  props:['item', 'selected']
}
</script>

<style lang="scss">
  .contact-item{
    display: flex;
    flex: 1;
    >div{
      display: inline-block;
      line-height: 64px;
    }
    .logo{
      width: 64px;
      height: 64px;
      img{
        width: 100%;
        height: 100%;
        resize: both;
      }
    }
    .name{
      flex:1;
      padding-left: 10px;
    }
    .ok{
      width: 64px;
      height: 64px;
      font-size: 44px;
      text-align: center;
      color: #FFFFFF;
      .fa-icon {
        width: auto;
        height: 1em;
        max-width: 100%;
        max-height: 100%;
        padding-top: 10px;
      }
    }
  }
</style>

