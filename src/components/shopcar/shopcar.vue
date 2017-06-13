<template>
  <div>
  <div class="shopcar">
      <div class="content" @click="toggleList">
          <div class="content-left">
              <div class="logo-wrap">
                <div class="logo" :class="{highlight:totalCount>0}">
                  <span class="logo-icon" :class="{highlight:totalCount>0}" ></span>
                </div>
                <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{highlight:totalCount>0}">{{totalPrice}}元</div>
              <div class="desc" v-show="totalPrice<minPrice">另需配送费¥{{deliveryPrice}}元</div>
              <div class="desc1" v-show="totalPrice>=minPrice">免配送费</div>
          </div>
          <div class="content-right" @click.stop.prevent="pay" :class="{highlight:totalPrice >= minPrice}">{{payDesc}}</div>
      </div>
      <div class="ball-container">
        <div v-for="(ball, index) in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcar-list" v-show="listShow">
          <div class="list-header clearfix">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
              <ul>
                 <li class="food" v-for="food in selectFoods">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                      <span>¥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartcontrol-wrap">
                      <v-cartcontrol @add="addFood" :food="food"></v-cartcontrol>
                    </div>
                 </li>
              </ul>
          </div>
        </div>
      </transition>
   </div>
   <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
   </transition>
   </div>
</template>
<script type="text/ecmascript-6">
import cartcontrol from 'components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
  export default {
    name: 'shopcar',
    props: {
      selectFoods: {
        type: Array,
        default() {
        return [
          {
            price: 10,
            count: 2
          }
         ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ],
          dropBalls: [],
          fold: true
        }
      },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
         return count
      },
      payDesc() {
        if(this.totalPrice < this.minPrice) {
          let diff = this.minPrice-this.totalPrice
          return '还差¥' + diff + '起送'
        }else if(this.totalPrice >= 20) {
          return '去结算'
        }else if(this.totalPrice === 0) {
          return '¥'+this.minPrice+'起送'
        }
      },
      listShow() {
        if(!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if(show) {
          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            }else{
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
        drop(el) {
          for(let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i]
            if (!ball.show) {
              ball.show = true
              ball.el = el
              console.log(ball.el)
              this.dropBalls.push(ball)
              return
            }
          }
        },
        addFood(target) {
          this.drop(target)
        },
        toggleList() {
          if(!this.totalCount) {
            return
          }
          this.fold = !this.fold
        },
        empty() {
          this.selectFoods.forEach((food) => {
            food.count = 0
          })
        },
        pay() {
          if(this.totalPrice < this.minPrice){
            return
          }
          window.alert(`需支付${this.totalPrice}元`)
        },
        hideList() {
          this.fold = true
        },
        beforeDrop(el) {
              let count = this.balls.length
              while(count--) {
                let ball = this.balls[count]
                if(ball.show) {
                  let rect = ball.el.getBoundingClientRect()
                  let x = rect.left - 32
                  let y = -(window.innerHeight - rect.top - 22)
                  el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                  el.style.transform = `translate3d(0, ${y}px, 0)`
                  let inner = el.getElementsByClassName('inner-hook')[0];
                  inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                  inner.style.transform = `translate3d(${x}px,0,0)`
                }
              }
            },
        dropping(el, done) {
           let rf = el.offsetHeight
          console.log(rf)
           this.$nextTick(() => {
              el.style.webkitTransform = 'translate3d(0, 0, 0)'
              el.style.transform = 'translate3d(0, 0, 0)'
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(0,0,0)`
              inner.style.transform = `translate3d(0,0,0)`
              el.addEventListener('transitionend', done)
           })
        },
        afterDrop(el) {
          let ball = this.dropBalls.shift()
          if(ball) {
            ball.show = false
            el.style.display = 'none'
          }
        }
      },
      components: {
        'v-cartcontrol': cartcontrol
      }
  }
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixin"
  .shopcar
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    height: .47rem
    width: 100%
    .content
      display: flex
      .content-left
        flex: 1
        font-size: 0
        background: #141c27
        .logo-wrap
          display: inline-block
          position: relative
          top: -.1rem
          margin: 0 .12rem
          padding: .06rem
          width: .56rem
          height: .56rem
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141c27
          .num
            position: absolute
            top: 0
            right: 0
            text-align: center
            line-height: .16rem
            font-size: .12rem
            color: #fff
            width: .24rem
            height: .16rem
            border-radius: .08rem
            background: #ee1412
          .logo
            width: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            line-height:1.85
            &.highlight
              background: #00a0dc
            .logo-icon
              &.highlight:after
                font-family: 'iconfont'
                content:'\e6b5'
                color: #fff
                font-size: .24rem
            .logo-icon:after
              font-family: 'iconfont'
              content:'\e6b5'
              color: #80858a
              font-size: .24rem
        .price
          display: inline-block
          padding-right:.12rem
          font-weight:700
          font-size: .16rem
          color: rgba(255,255,255,.1)
          border-right: 1px solid rgba(255,255,255,.4)
          &.highlight
            color: #fff
        .desc ,.desc1
          display: inline-block
          padding-left: .12rem
          line-height: .47rem
          font-size: .16rem
          color: rgba(255,255,255,.4)
        .desc1
          color: #fff
      .content-right
        flex: 0 0 1.05rem
        text-align: center
        line-height: .47rem
        font-size: .12rem
        font-weight: 700
        color: rgba(255,255,255,.4)
        background: #2b333b
        &.highlight
          background: #00a0dc
          color: #fff
    .ball-container
      .ball
        position: fixed
        left: .32rem
        bottom: .22rem
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: .16rem
          height: .16rem
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcar-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0,-100%,0)
      &.fold-enter-active, &.fold-leave-active
        transition: all .5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0,0,0)
      .list-header
        line-height: .4rem
        padding: 0 .18rem
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: .14rem
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: .12rem
          color: rgb(0, 160, 220)
    .list-content
      padding: 0 .18rem
      max-height: 2.17rem
      overflow: hidden
      background: #fff
      .food
        position: relative
        padding: .12rem 0
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height: .24rem
          font-size: .14rem
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: .90rem
          bottom: .12rem
          line-height: .24rem
          font-size: .14rem
          font-weight: 700
          color: rgb(240, 20, 20)
        .cartcontrol-wrap
          position: absolute
          right: 0
          bottom: .12rem
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7,17,27,.6)
    &.fade-enter-active,&.fade-leave-active
      transition: all .5s
    &.fade-enter,&.fade-leave-active
      opacity: 0
      background: rgba(7,17,27,0)
</style>

