<template>
  <transition name="move">
    <div v-show="showFlag" class="foodDetail" ref="foodDetail">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image"/>
          <div class="back" @click="hide">
            <i class="icon-back"></i>
          </div>
        </div>
        <div class="content clearfix">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
             <span class="now">¥{{food.price}}</span>
              <span class="old" v-if="food.oldPrice"><del>¥{{food.oldPrice}}</del></span>
          </div>
          <div class="cartcontrol-wrap"  v-show="!food.count===0 || food.count">
            <v-cartcontrol @add="addFood" :food="food"></v-cartcontrol>
          </div>
          <transition name="fade">
             <div class="buy"  @click.stop.prevent="addFirst" v-show="food.count===0 || !food.count">加入购物车</div>
          </transition>
        </div>
        <div class="split-wrap" v-show="food.info">
          <split></split>
        </div>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <P class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rate">
          <h1 class="title">商品评价</h1>
          <ratingselect  @select="selectRating" @toggle="toggleContent"  :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
        </div>
        <div class="rate-wrap">
           <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span><img class="avater" width="12px" height="12px" :src="rating.avatar"/>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span class="icon" :class="{'icon-up':rating.rateType === 0,'icon-down': rating.rateType === 1}"></span>
                {{rating.text}}</p>
              </li>
           </ul>
           <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
           </div>
        </div>

      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import {formatDate} from 'common/js/formatDate'
  const ALL = 2
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
        show() {
          this.showFlag = true
          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.foodDetail, {
                 click: true
              })
              }else {
                this.scroll.refresh()
              }
          })
        },
        hide() {
          this.showFlag = false
        },
        addFirst(event) {
          if(!event._constructed) {
            return
          }
          this.$emit('add', event.target)
          Vue.set(this.food, 'count', 1)
        },
         addFood(target) {
            this.$emit('add', target)
          },
        needShow(type, text) {
          if(this.onlyContent && !text) {
            return false
          }
          if(this.selectType === ALL) {
             return true
          }else {
            return type === this.selectType
          }
        },
        selectRating(type) {
          this.selectType = type
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        },
        toggleContent() {
          this.onlyContent = !this.onlyContent
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        }
    },
      filters: {
        formatDate(time) {
          let date = new Date(time)
          return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
      },
      components: {
        'v-cartcontrol': cartcontrol,
        split,
        ratingselect
      }
  }
</script>
<style lang="stylus" ref="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .foodDetail
    position: fixed
    top: 0
    left: 0
    bottom: .47rem
    background: #fff
    z-index: 30
    width: 100%
    &.move-enter-active,&.move-leave-active
      transition: all .2s linear
    &.move-enter,&.move-leave-active
      transform: translate3d(100%,0,0)
    .img-header
      height: 3.75rem
      img
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 0
        width: .2rem
        height: .2rem
        .icon-back
          width: 100%
          height: 100%
        .icon-back:after
          font-family: 'iconfont'
          content: '\e60b'
          color: #fff
    .content
      padding-left: .18rem
      .title
        padding: .18rem 0
        font-size: .14rem
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        padding-bottom: .18rem
        font-size: .1rem
        color: rgb(147,153,159)
      .price
        padding-bottom: .18rem
        float: left
        .now
          color: rgb(240,20,20)
        .old
          color: rgb(147,153,159)
      .cartcontrol-wrap
        float: right
        margin-right: .18rem
      .buy
        position: absolute
        right: .18rem
        width: .74rem
        line-height: 2
        text-align: center
        color: #fff
        border-radius: .12rem
        background: #00a0dc
        font-size: .1rem
        opacity: 1
        &.fade-enter-active,&.fade-leave-active
          transition: all .2s
        &.fade-enter,&.fade-leave-active
          opacity: 0
    .info
      padding: .18rem
      .title
        padding-bottom: .06rem
        font-weight: 200
        line-height: 1
        font-size: .14rem
      .text
        padding-left: .08rem
        font-size: 0.12rem
        line-height: .24rem
    .rate
      .title
        padding: .18rem 0 0 .18rem
        font-size: .14rem
    .rate-wrap
      .rating-item
        padding: .16rem 0
        margin: 0 .18rem
        border-1px(rgba(7,17,27,0.1))
        .user
          float: right
          color: rgb(147,153,159)
          .name
            padding-right: .06rem
            vertical-align: middle
          .avater
            border-radius: 50%
        .time
          color: rgb(147,153,159)
        .text
          font-size: .12rem
          .icon
            &.icon-up:after
              font-family: 'iconfont'
              content: '\e60f'
              vertical-align: top
              color: rgb(0,160,220)
            &.icon-down:after
              font-family: 'iconfont'
              content: '\e60f'
              vertical-align: top
              color: rgb(147,153,159)
              display:inline-block
              transform: rotate(180deg)
      .no-rating
        padding: .16rem
        font-size: .12rem
        color: #93999f
</style>
