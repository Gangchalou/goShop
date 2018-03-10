<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {

  mounted () {
    // 通过action获取地址信息address
    this.$store.dispatch('getAddress')
    //通过action获取用户信息
    this.$store.dispatch('getUserInfo')
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
