<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link slot="search" to="/search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link slot="login" :to="userInfo._id?'/userinfo':'/login'" class="header_login">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cs,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c,index2) in cs" :key="index2">
              <div class="food_container">
                <img :src="imgBaseUrl+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import HeaderTop from "../../components/HeaderTop/HeaderTop";
  import ShopList from "../../components/ShopList/ShopList";
  import store from "../../store";
  export default {
    data:function(){
      return{
        imgBaseUrl:'https://fuss10.elemecdn.com'
      }
    },
    mounted() {
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    computed:{
      ...mapState(['address','categorys','userInfo']),
      categorysArr(){
        const arr = []
        const {categorys} = this
        let smallArr = []
        categorys.forEach((c,index) => {
          if(smallArr.length===8){
            smallArr = []
          }
          if(smallArr.length===0){
            arr.push(smallArr)
          }
          smallArr.push(c)
        })
        return arr
      }
    },
    watch:{
      categorys(value){
        /*异步显示轮播图
        通过vuex获取foodCategorys数组(发请求, 读取)
        对数据进行整合计算(一维变为特定的二维数组)
        使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
          1). 使用回调+$nextTick()
          2). 使用watch+$nextTick()*/
        this.$nextTick(() => {
          new Swiper('.swiper-container',{
            pagination:{
              el:'.swiper-pagination'
            },
            loop:true
          })
        })
      }
    },
    components:{
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  &.msite  //首页
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
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
