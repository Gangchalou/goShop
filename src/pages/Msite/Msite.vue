<template>
  <div class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link slot="search" to="/search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link slot="login" to="/login" class="header_login">
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(types, index) in foodTypesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(type, index2) in types" :key="index2">
              <div class="food_container">
                <img :src="imgBaseUrl+type.image_url">
              </div>
              <span>{{type.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

export default {
  data () {
    return {
      imgBaseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getShops')
    this.$store.dispatch('getFoodTypes')
  },
  watch: {
    foodTypes () {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true
        })
      })
    }
  },
  computed: {
    ...mapState(['address', 'foodTypes']),

    foodTypesArr () {
      const arr = []  // 大数组
      const {foodTypes} = this
      let tempArr = [] // 小数组
      // 遍历foodTypes并生成n个小数组(max为8), 并添加到arr
      foodTypes.forEach(type => {
        // 还没有一个数据前, 先将小数组保存到大数组中
        if(tempArr.length===0) {
          arr.push(tempArr)
        }
        // type是否需要添加到当前的小数组
        if(tempArr.length<8) {
          // 保存type到小数组
          tempArr.push(type)
        } else {
          // 创建一个新的小数组
          tempArr = []
          // 保存type到小数组
          tempArr.push(type)
          // 将小数组保存到大数组中
          arr.push(tempArr)
        }
      })
      console.log(arr)
      return arr
    }
  },
  components: {
    HeaderTop,
    ShopList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0 10px
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
