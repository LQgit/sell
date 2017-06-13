<template>
  <div class="header">
     <div class="content-wrapper">
      <div class="avatar">
        <img width="64"  height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="supports-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
     </div>
     <div class="bulletin-wrapper" @click="showDetail">
       <span class="bulletin-title"></span>
       <span class="bulletin-text">{{seller.bulletin}}</span>
       <span class="icon-keyboard_arrow_right"></span>
     </div>
     <div class="bg">
       <img :src="seller.avatar" width="100%" height="100%"/>
     </div>
     <transition name="fade">
     <div v-show="detailShow" class="detail" >
      <div class="detail-wrap clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrap">
            <v-star :size="48" :score="seller.score"></v-star>
          </div>
          <div class="cut">
            <div class="cut-line"></div>
            <div class="news">优惠信息</div>
            <div class="cut-line"></div>
          </div>
          <ul v-if="seller.supports" class="support">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="cut">
            <div class="cut-line"></div>
            <div class="news">商家公告</div>
            <div class="cut-line"></div>
          </div>
          <div class="bulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="detail-close" @click="hiddenDetail">
        <i class="icon-close"></i>
      </div>
     </div>
     </transition>


  </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star'

  export default{
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hiddenDetail() {
         this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'invoice', 'special', 'guarantee']
    },
    components: {
       'v-star': star

    }
  }
   </script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7,17,27,0.5)
    .content-wrapper
      position: relative
      padding: .24rem .12rem .18rem .24rem
      font-size: 0
      .avatar
        display: inline-block
       img
         border-radius: .01rem
       .content
        display: inline-block
        font-size: .14rem
        margin-left: .16rem
        .title
          padding-top: .02rem
          .brand
            display: inline-block
            vertical-align: top
            width: .3rem
            height: .18rem
            bg-image('brand')
            background-repeat: no-repeat
            background-size: 100% 100%
          .name
              font-size: .16rem
         .description
          padding: .08rem 0 .1rem 0
         .support
          font-size:.1rem
          .icon
            display: inline-block
            background-repeat: no-repeat
            background-size: 100%
            width: .12rem
            height: .12rem
            vertical-align: middle
            margin-bottom: .01rem
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
            &.guarantee
              bg-image('guarantee_1')
    .supports-count
      position :absolute
      right: .12rem
      bottom: .14rem
      padding: 0 .08rem
      height: .24rem
      line-height: .24rem
      border-radius: .14rem
      background-color: rgba(0,0,0,0.2)
      text-align: center
      .count
        font-size: .1rem
       .icon-keyboard_arrow_right:after
          font-family: 'iconfont'
          content: '\e687'
          font-size: .1rem
    .bulletin-wrapper
      position: relative
      padding: 0 .11rem 0 .12rem
      white-space: nowrap
      text-overflow: ellipsis
      overflow:hidden
      line-height: 2
      background-color: rgba(7,17,27,0.2)
      .bulletin-title
        display: inline-block
        width: .22rem
        height: .12rem
        bg-image('bulletin')
        background-repeat: no-repeat
        background-size: 100%
        vertical-align: middle
      .bulletin-text
        font-size: .1rem
      .icon-keyboard_arrow_right
        position: absolute
        right: 0
        &:after
          font-family: 'iconfont'
          content: '\e687'
          font-size: .1rem
    .bg
     position: absolute
     top: 0
     left: 0
     width: 100%
     height: 100%
     filter: blur(.05rem)
     z-index: -1
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7,17,27,0.8)
      backdrop-filter: blur(.05rem)
      &.fade-enter-active, &.fade-leave-active
       transition: all .5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7,17,27,0)
      .detail-wrap
        min-height:100%
        .detail-main
          padding: .64rem 0 .64rem 0
          .name
            text-align: center
            line-height:.6
            font-weight: 700
            font-size: .16rem
          .star-wrap
            text-align: center
            padding: .16rem 0 .28rem 0
          .cut
            display: flex
            width: 80%
            margin:  0 auto
            .cut-line
              flex:1
              position: relative;
              top: -.1rem;
              border-bottom:1px solid rgba(255,255,255,.2)
            .news
              padding: 0 .12rem
              font-weight: 700
          .support
           padding: .24rem 0 .22rem 0
           margin: 0 auto
           width: 80%
           .support-item
            padding-bottom: .06rem
            font-size: 0
            .icon
              display: inline-block
              margin-right: .06rem
              margin-top: .02rem
              vertical-align: top
              width: .16rem
              height: .16rem
              background-size: 100%
              background-repeat:no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
              &.guarantee
                bg-image('guarantee_2')
            .text
              font-size: .12rem
          .bulletin
            box-sizing:border-box
            margin: 0 auto
            padding:.24rem .12rem 0 .12rem
            width: 80%
            line-height: 1.5
            font-size: .12rem
      .detail-close
        width: .32rem
        height: .32rem
        margin: -.54rem auto 0 auto
        .icon-close
          &:after
            font-family: 'iconfont'
            content: '\e618'











</style>
